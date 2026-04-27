'use client';

import { cn } from '@/lib/utils';
import {
  AnimatePresence,
  motion,
  Variants,
} from 'motion/react';
import React, { useEffect, useRef, useState } from 'react';

type PresetType = 'blur' | 'shake' | 'scale' | 'fade' | 'slide';

type VariantDef = {
  transition?: {
    staggerChildren?: number;
    staggerDirection?: number;
    delayChildren?: number;
    duration?: number;
    [key: string]: unknown;
  };
  [key: string]: unknown;
};

type TextEffectProps = {
  children: string;
  per?: 'word' | 'char' | 'line';
  as?: keyof React.JSX.IntrinsicElements;
  variants?: {
    container?: Variants;
    item?: Variants;
  };
  className?: string;
  style?: React.CSSProperties;
  preset?: PresetType;
  delay?: number;
  trigger?: boolean;
  scrollReveal?: boolean;
  onAnimationComplete?: () => void;
  segmentWrapperClassName?: string;
};

const defaultStaggerTimes: Record<'char' | 'word' | 'line', number> = {
  char: 0.03,
  word: 0.05,
  line: 0.1,
};

const defaultContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
  exit: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const defaultItemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const presetVariants: Record<PresetType, { container: Variants; item: Variants }> = {
  blur: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, filter: 'blur(8px)' },
      visible: {
        opacity: 1,
        filter: 'blur(0px)',
        transition: { duration: 0.45, ease: [0.25, 0, 0, 1] },
      },
      exit: { opacity: 0, filter: 'blur(8px)' },
    },
  },
  shake: {
    container: defaultContainerVariants,
    item: {
      hidden: { x: 0 },
      visible: { x: [-5, 5, -5, 5, 0], transition: { duration: 0.5 } },
      exit: { x: 0 },
    },
  },
  scale: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, scale: 0 },
      visible: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0 },
    },
  },
  fade: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
      exit: { opacity: 0 },
    },
  },
  slide: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 20 },
    },
  },
};

const AnimationComponent: React.FC<{
  segment: string;
  variants: Variants;
  per: 'line' | 'word' | 'char';
  segmentWrapperClassName?: string;
}> = React.memo(({ segment, variants, per, segmentWrapperClassName }) => {
  const content =
    per === 'line' ? (
      <motion.span variants={variants} className='block'>
        {segment}
      </motion.span>
    ) : per === 'word' ? (
      <motion.span
        aria-hidden='true'
        variants={variants}
        className='inline-block whitespace-pre'
      >
        {segment}
      </motion.span>
    ) : (
      <motion.span className='inline-block whitespace-pre'>
        {segment.split('').map((char, charIndex) => (
          <motion.span
            key={`char-${charIndex}`}
            aria-hidden='true'
            variants={variants}
            className='inline-block whitespace-pre'
          >
            {char}
          </motion.span>
        ))}
      </motion.span>
    );

  if (!segmentWrapperClassName) {
    return content;
  }

  const defaultWrapperClassName = per === 'line' ? 'block' : 'inline-block';

  return (
    <span className={cn(defaultWrapperClassName, segmentWrapperClassName)}>
      {content}
    </span>
  );
});

AnimationComponent.displayName = 'AnimationComponent';

export function TextEffect({
  children,
  per = 'word',
  as = 'p',
  variants,
  className,
  style,
  preset,
  delay = 0,
  trigger = true,
  scrollReveal = false,
  onAnimationComplete,
  segmentWrapperClassName,
}: TextEffectProps) {
  let segments: string[];
  if (per === 'line') {
    segments = children.split('\n');
  } else if (per === 'word') {
    segments = children.split(/(\s+)/);
  } else {
    segments = children.split('');
  }

  const scrollRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!scrollReveal) return;
    const el = scrollRef.current;
    if (!el) return;

    const reveal = () => setInView(true);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || el.classList.contains('is-inview')) {
      reveal();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          reveal();
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.14, rootMargin: '0px 0px -60px 0px' }
    );

    io.observe(el);

    const observer = new MutationObserver(() => {
      if (!el.classList.contains('is-inview')) return;
      setInView(true);
      observer.disconnect();
      io.disconnect();
    });

    observer.observe(el, { attributes: true, attributeFilter: ['class'] });

    return () => {
      observer.disconnect();
      io.disconnect();
    };
  }, [scrollReveal]);

  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  const selectedVariants = preset
    ? presetVariants[preset]
    : { container: defaultContainerVariants, item: defaultItemVariants };
  const containerVariants = variants?.container || selectedVariants.container;
  const itemVariants = variants?.item || selectedVariants.item;
  const ariaLabel = per === 'line' ? undefined : children;
  const stagger = defaultStaggerTimes[per];

  const delayedContainerVariants: Variants = {
    hidden: containerVariants.hidden,
    visible: {
      ...containerVariants.visible,
      transition: {
        ...(containerVariants.visible as VariantDef)?.transition,
        staggerChildren:
          (containerVariants.visible as VariantDef)?.transition?.staggerChildren ?? stagger,
        delayChildren: delay,
      },
    },
    exit: containerVariants.exit,
  };

  const segmentNodes = segments.map((segment, index) => (
    <AnimationComponent
      key={`${per}-${index}-${segment}`}
      segment={segment}
      variants={itemVariants}
      per={per}
      segmentWrapperClassName={segmentWrapperClassName}
    />
  ));

  if (scrollReveal) {
    return (
      <MotionTag
        ref={scrollRef as React.RefObject<HTMLDivElement>}
        data-scroll
        data-scroll-class='is-inview'
        initial='hidden'
        animate={inView ? 'visible' : 'hidden'}
        aria-label={ariaLabel}
        variants={delayedContainerVariants}
        className={cn('whitespace-pre-wrap', className)}
        style={style}
        onAnimationComplete={onAnimationComplete}
      >
        {segmentNodes}
      </MotionTag>
    );
  }

  return (
    <AnimatePresence mode='popLayout'>
      {trigger && (
        <MotionTag
          initial='hidden'
          animate='visible'
          exit='exit'
          aria-label={ariaLabel}
          variants={delayedContainerVariants}
          className={cn('whitespace-pre-wrap', className)}
          style={style}
          onAnimationComplete={onAnimationComplete}
        >
          {segmentNodes}
        </MotionTag>
      )}
    </AnimatePresence>
  );
}
