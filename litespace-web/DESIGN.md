# Design System Strategy: The Luminous Workspace

## 1. Overview & Creative North Star
**Creative North Star: "The Aerostat Collective"**
This design system moves away from the static, boxed-in nature of traditional office software. Instead, it treats the interface as a series of buoyant, interconnected modules. We are not building a "dashboard"; we are building an atmosphere. The "LITE" philosophy is achieved through **Soft Minimalism**—an intentional use of hyper-rounded forms and "air" (whitespace) that makes a high-density virtual office feel breathable and weightless.

By utilizing high-contrast typography scales (the "Editorial Anchor") against extremely soft, layered backgrounds, we create a professional startup aesthetic that feels premium, bespoke, and human-centric.

---

## 2. Colors & Tonal Depth
The color palette is anchored in a high-energy `primary` (#0058bb) blue, supported by a sophisticated range of architectural grays and atmospheric sky tones.

### The "No-Line" Rule
**Strict Mandate:** Designers are prohibited from using 1px solid borders to section content. Layout boundaries must be defined exclusively through background color shifts.
*   **Example:** A `surface-container-low` (#eef1f3) card sitting on a `surface` (#f5f7f9) background. 
*   **The Goal:** To remove "visual noise" and let the content breathe without the mechanical feel of boxes.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of semi-transparent layers. Use the surface-container tiers to define importance:
*   **Backdrop:** `surface` (#f5f7f9)
*   **Primary Containers:** `surface-container-lowest` (#ffffff) for high-focus cards.
*   **Nested Content:** Use `surface-container` (#e5e9eb) inside a white card to define sub-sections like "Team Members" or "Settings Groups."

### The "Glass & Gradient" Rule
To inject "soul" into the tech-focused UI, use **Signature Textures**:
*   **Hero/CTAs:** Use a linear gradient from `primary` (#0058bb) to `primary-container` (#6c9fff) at a 135-degree angle.
*   **Floating Navigation:** Apply `surface-container-lowest` with a 70% opacity and a `24px` backdrop-blur to create a "frosted glass" effect that keeps the user grounded in their workspace.

---

## 3. Typography: The Editorial Anchor
The system pairs two distinct sans-serifs to balance startup energy with professional authority.

*   **The Voice (Display & Headlines):** *Plus Jakarta Sans*. A modern, geometric face with high legibility. Large scales (e.g., `display-lg` at 3.5rem) should be used to create clear entry points and a "magazine-style" hierarchy.
*   **The Engine (Body & Labels):** *Manrope*. A high-performance typeface designed for digital interfaces. It maintains clarity at the smallest scales (`label-sm` at 0.6875rem) while feeling warmer than standard system fonts.

**Hierarchy Strategy:** 
Always lean into extremes. Use `display-md` for page titles and skip directly to `body-md` for descriptions. This high-contrast jump creates an intentional, high-end editorial feel that avoids the "generic" medium-text look.

---

## 4. Elevation & Depth
In this design system, depth is a function of light and layering, not artificial construction.

### The Layering Principle (Tonal Lift)
Avoid shadows where possible. Achieve lift by stacking:
1.  **Level 0 (Base):** `surface` (#f5f7f9)
2.  **Level 1 (Section):** `surface-container-low` (#eef1f3)
3.  **Level 2 (Interactive Component):** `surface-container-lowest` (#ffffff)

### Ambient Shadows
When a component must "float" (e.g., a Modal or a Hovering Tooltip), use an **Ambient Shadow**:
*   **Color:** Tinted with `on-surface` (#2c2f31) at 6% opacity.
*   **Blur:** Minimum `40px` to `80px`.
*   **X/Y Offset:** `0px` X, `12px` Y.
*   *Note:* Avoid dark grey "drop shadows." Shadows should look like soft light passing through the element.

### The "Ghost Border" Fallback
If a border is required for accessibility (e.g., Input Fields), use a "Ghost Border": `outline-variant` (#abadaf) at **15% opacity**. It should be felt, not seen.

---

## 5. Components & Primitives

### Buttons: The "Soft-Touch" Interaction
*   **Primary:** `primary` (#0058bb) background with `on-primary` (#f0f2ff) text. Corner radius: `full` (9999px) for a friendly, approachable vibe.
*   **Secondary:** `secondary-container` (#93dbff) background.
*   **Hover State:** A subtle transition to `primary-dim` (#004ca4) with a slight "lift" (Y-offset -2px).

### Input Fields: The "Quiet" Input
*   **Background:** `surface-container-lowest` (#ffffff).
*   **Border:** Ghost Border (15% opacity `outline-variant`).
*   **Radius:** `md` (1.5rem).
*   **Active State:** Transition border to `primary` (#0058bb) at 100% opacity. No "glow."

### Cards & Lists: The Separation Strategy
**Forbid the use of divider lines.**
*   **Cards:** Use `lg` (2rem) or `xl` (3rem) corner radius. This large radius is a signature visual of the "LITE" philosophy.
*   **Lists:** Separate items using `spacing-3` (1rem) of vertical whitespace or a background shift to `surface-container-low` on hover.

### Featured Component: "The Presence Node"
For a virtual office, use a custom "Presence Node" to show who is online. A `surface-container-lowest` pill with a `tertiary` (#6d5a00) dot accent, utilizing `rounded-full` and a subtle pulse animation.

---

## 6. Do’s and Don’ts

### Do:
*   **Do** embrace massive whitespace. If you think there’s enough space, add 20% more. Use `spacing-16` (5.5rem) and `spacing-20` (7rem) to separate major sections.
*   **Do** use `tertiary` (#6d5a00) sparingly as a "Gold" accent for premium features or achievement notifications.
*   **Do** use asymmetrical layouts. A card on the left does not always need a twin on the right; use the void to guide the eye.

### Don't:
*   **Don’t** use 100% black. Ever. Use `on-surface` (#2c2f31) for maximum readability and a premium feel.
*   **Don’t** use sharp corners. Any radius under `0.5rem` (sm) is prohibited unless it is a 1px pixel-perfect detail.
*   **Don’t** use dark yellow for large surfaces. It is an accent tool, not a background color.
*   **Don’t** use standard "box-shadow" presets. They look heavy and "default." Always hand-tune the blur and opacity for an atmospheric effect.