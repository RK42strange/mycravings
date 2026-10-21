# Dish images

Drop local food photos in this folder using the dish ID as the filename, for example:

- `butter-chicken.webp`
- `pani-puri.webp`
- `manchurian.webp`

The app checks `/images/dishes/<dish-id>.webp` first and falls back to the current Unsplash photo if a local file is not present. Supported browser image formats include WebP, JPG, PNG, and AVIF; if you use another extension, update the image path in the menu data in `src/App.tsx`.
