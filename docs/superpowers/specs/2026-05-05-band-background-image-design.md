# Band Background Image Update Design
Date: 2026-05-05

## Summary
Replace the "On the ground in Bangladesh" band image with a new local WebP asset, set as a CSS background for the band section, and remove the overlay gradient. Preserve layout and copy.

## Goals
- Use local asset at /public/images/band-on-ground.webp.
- Set the .band section background with cover and center; remove the old <img> element.
- Remove the .band::after overlay.
- Keep existing band layout, spacing, and text.

## Non-goals
- No changes to typography, spacing, or copy.
- No parallax or scroll-speed effects.
- No changes to other sections.

## Approach (Recommended)
- Copy the provided WebP from Downloads into public/images/band-on-ground.webp.
- Update .band in app/globals.css to use background-image, background-size: cover, background-position: center, and background-repeat: no-repeat, while keeping the fallback background color.
- Remove the image markup from app/components/sections/PhotoBand.tsx and drop the band-plane/band-media wrappers so no overlay layer remains.
- Remove band-plane, band-media, and band-img rules from app/globals.css.
- Remove public/bangladesh-on-the-ground-logistics.jpeg if no longer referenced.

## Files and Locations
- Asset: public/images/band-on-ground.webp
- Component markup: app/components/sections/PhotoBand.tsx
- Styles: app/globals.css

## Data Flow
- Static asset served by Next.js from /public; no runtime data flow changes.

## Error Handling and Fallback
- If the image fails to load, the existing .band background color (#111) provides a safe fallback.

## Testing and Verification
- Open the page and confirm the band section shows the new image with no overlay.
- Verify the image fills the section without distortion (cover and center).
- Confirm no console errors and no missing asset requests.

## Rollback
- Restore the prior <img class="band-img"> with the external URL and re-enable the .band::after gradient.
