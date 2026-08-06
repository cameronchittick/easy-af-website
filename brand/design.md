# Design

One-line purpose: fixes the visual language before any skill picks one,
so the site looks like this brand instead of the model's default taste.

> **Skills MUST NOT run against an unfilled template.** Fill every section
> below before any skill reads this tenant.

## Protocol

Which single skill in `.agents/skills/` governs visual work here. They
contradict each other by design, so name exactly one and never blend.

## Vibe words

2-4 concrete adjectives for how the site should look. Not how it sounds,
which is voice.md. (e.g. "restrained, editorial, warm")

## References

Real URLs or product names anchoring the aesthetic, and what to take
from each one.

## Brand tokens

Primary and accent colors. Type stack with weights, noting which faces
need self-hosting. Logo treatment and clear space. Corner radii.
Anything already in use stays recognisable rather than restyled away.

## Imagery

Photography or illustration direction, whether real assets exist, and
what the images must never look like.

## Dials

DESIGN_VARIANCE, MOTION_INTENSITY, VISUAL_DENSITY, each 1-10. Leave
blank to let the protocol infer them from the vibe words.

## Hard constraints

Accessibility, regulated or trust-first requirements, and whether the
site is light, dark or dual mode. These override aesthetic preference.

## Avoid

Patterns this brand must never ship, beyond the protocol's own bans.
(e.g. "no purple gradients, no stock handshakes")
