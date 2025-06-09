# Widia Font Installation Instructions

## Steps to add the Widia font to your project:

1. **Download the Widia font from 1001fonts.com:**
   - Go to: https://www.1001fonts.com/widia-font.html
   - Download the font files (usually comes as .ttf, .otf, or .zip)

2. **Extract and place font files:**
   - Extract the downloaded files if they're in a .zip
   - Copy the font files to: `f:\portfolio\new_port\public\fonts\`
   - Rename the files to match these names:
     - `widia.ttf` (regular weight)
     - `widia-bold.ttf` (bold weight, if available)

3. **Convert fonts to web formats (optional but recommended):**
   - Use an online font converter like convertio.co or cloudconvert.com
   - Convert .ttf files to .woff and .woff2 formats for better web performance
   - Place all formats in the `/public/fonts/` directory

4. **Expected file structure:**
   ```
   f:\portfolio\new_port\public\fonts\
   ├── widia.ttf
   ├── widia.woff
   ├── widia.woff2
   ├── widia-bold.ttf (if available)
   ├── widia-bold.woff (if available)
   └── widia-bold.woff2 (if available)
   ```

## What I've already set up:

✅ Created `/public/fonts/` directory
✅ Added font-face declarations in `src/app/fonts.css`
✅ Imported fonts.css in layout.tsx
✅ Added 'widia' to Tailwind config
✅ Updated Hero component to use `font-widia` class

## Fallback:

If you can't get the exact Widia font, the system will fall back to:
- Arial Black (similar wide, bold style)
- Default sans-serif

The Hero component is now ready to use the Widia font once you place the font files in the `/public/fonts/` directory!
