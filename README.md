# Mirelly & Lucas — Wedding Invitation

Static wedding invitation website, ready to publish on GitHub Pages.

## Structure

```
wedding invite/
├── index.html      # Invitation page (PT/EN)
├── css/style.css   # Styles
├── js/main.js      # Language, countdown and RSVP
└── assets/
    ├── ceremony-sketch.png   # Ceremony illustration (hero)
    └── venue.webp            # Venue photo (Chácara Florestal)
```

## Publishing to GitHub Pages

1. Create a GitHub repository and push these files to the `main` branch:

   ```bash
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
   git push -u origin main
   ```

2. In the repository, go to **Settings → Pages**.
3. In **Source**, choose **Deploy from a branch**, branch `main`, folder `/ (root)` and save.
4. The site will be available at `https://YOUR-USERNAME.github.io/YOUR-REPO/`.

## Notes

- The RSVP form displays confirmation only on the screen — it **does not send data to any server** (same behavior as the original project). To receive responses, connect it to a service like Formspree or Google Forms.
- The gift list points to `https://noivos.casar.com/lucas-e-mirelly` and the map to Google Maps — edit the links in `index.html` if needed.
