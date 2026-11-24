"use client";

import {
  cloneElement,
  isValidElement,
  useMemo,
  useRef,
  type ReactElement,
  type ReactNode,
} from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useReducedMotion } from "./use-reduced-motion";

type AsTag = "div" | "p" | "h2" | "h3" | "h4";

type ScrollRevealProps = {
  children: ReactNode;
  as?: AsTag;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  enableBlur?: boolean;
  className?: string;
};

type WordOptions = {
  progress: MotionValue<number>;
  baseOpacity: number;
  blurStrength: number;
  enableBlur: boolean;
  reduce: boolean;
};

type WalkState = { count: number; total: number };

const motionTags = {
  div: motion.div,
  p: motion.p,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
} as const;

function countWords(node: ReactNode): number {
  if (typeof node === "string") {
    return node.split(/\s+/).filter(Boolean).length;
  }
  if (Array.isArray(node)) {
    return node.reduce<number>((sum, child) => sum + countWords(child), 0);
  }
  if (isValidElement(node)) {
    const inner = (node.props as { children?: ReactNode })?.children;
    return inner == null ? 0 : countWords(inner);
  }
  return 0;
}

function renderTree(
  node: ReactNode,
  state: WalkState,
  options: WordOptions,
  keyHint: string
): ReactNode {
  if (typeof node === "string") {
    return node.split(/(\s+)/).map((part, i) => {
      if (!part) return null;
      if (/^\s+$/.test(part)) return part;
      const index = state.count++;
      return (
        <Word
          key={`${keyHint}-w-${index}-${i}`}
          index={index}
          total={state.total}
          options={options}
        >
          {part}
        </Word>
      );
    });
  }
  if (Array.isArray(node)) {
    return node.map((child, i) => renderTree(child, state, options, `${keyHint}-${i}`));
  }
  if (isValidElement(node)) {
    const element = node as ReactElement<{ children?: ReactNode }>;
    const inner = element.props?.children;
    // Arrays built with .map() are not treated as static children, so every element needs a key.
    const config = { key: element.key ?? keyHint };
    if (inner == null) return cloneElement(element, config);
    return cloneElement(element, config, renderTree(inner, state, options, keyHint));
  }
  return node;
}

function Word({
  index,
  total,
  options,
  children,
}: {
  index: number;
  total: number;
  options: WordOptions;
  children: ReactNode;
}) {
  const { progress, baseOpacity, blurStrength, enableBlur, reduce } = options;
  const denom = Math.max(total - 1, 1);
  const start = 0.15 + (index / denom) * 0.55;
  const end = Math.min(start + 0.2, 1);
  const opacity = useTransform(progress, [start, end], [baseOpacity, 1]);
  const blur = useTransform(progress, [start, end], [blurStrength, 0]);
  const filter = useTransform(blur, (v) => `blur(${v}px)`);
  return (
    <motion.span
      style={{
        display: "inline-block",
        opacity: reduce ? 1 : opacity,
        filter: reduce ? "none" : enableBlur ? filter : undefined,
        willChange: "opacity, filter",
      }}
    >
      {children}
    </motion.span>
  );
}

export function ScrollReveal({
  children,
  as = "div",
  baseOpacity = 0.15,
  baseRotation = 3,
  blurStrength = 4,
  enableBlur = true,
  className = "",
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "center 50%"],
  });

  const total = useMemo(() => Math.max(countWords(children), 1), [children]);
  const tree = useMemo(
    () =>
      renderTree(
        children,
        { count: 0, total },
        {
          progress: scrollYProgress,
          baseOpacity,
          blurStrength,
          enableBlur,
          reduce,
        },
        "sr"
      ),
    [children, total, scrollYProgress, baseOpacity, blurStrength, enableBlur, reduce]
  );

  const rotate = useTransform(scrollYProgress, [0, 0.45], [baseRotation, 0]);

  const Tag = motionTags[as];
  return (
    <Tag
      ref={ref as never}
      className={className}
      style={{ rotate: reduce ? 0 : rotate, transformOrigin: "0% 50%" }}
    >
      {tree}
    </Tag>
  );
}
