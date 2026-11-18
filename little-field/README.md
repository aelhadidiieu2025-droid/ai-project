# Little Field · Field Rover 01

A two-page interactive AI explainer with a playful orchard introduction and a concept product experience. Built for a general audience with plain HTML, CSS and JavaScript, no build step and no API keys.

## Open locally

Open `index.html`, or run `python3 -m http.server 8000` in this directory and visit http://localhost:8000. All assets use relative paths and are included.

## Interactions

- The rover rolls into the orchard on entry. “Follow the apple” plays the tree bump, apple fall and roll, then navigates to `rover.html`.
- Numbered buttons describe six proposed hardware roles. All controls work with a keyboard.
- “Build your rover” opens an accessible native dialog. Choose a crop and scouting focus, then save a text summary. This is a demo: no orders, payments or messages are sent.
- Reduced-motion preferences skip the story; a direct link always opens the rover page. Decorative motion can be paused.

## Accuracy and authorship

The machine image is supplied by the user, adapted into a transparent cutout with AI image generation. The hardware capabilities are concept proposals, not manufacturer specifications. The apple-tree collision is a fictional animation, not a real operating procedure. Original SVG illustrations provide the tractor, tree, apple and farm landscape.

AI content explains benefits, risks, oversight, access and energy. Links to UF/IFAS, NIST, FAO and IEA appear beside relevant claims. The process note acknowledges ChatGPT assistance and image generation. The student should review the wording and be able to explain the code and design choices before submission.

## Publish

The folder is self-contained and can be served from a repository root or a GitHub Pages subdirectory. No external fonts, analytics or script dependencies are used.
