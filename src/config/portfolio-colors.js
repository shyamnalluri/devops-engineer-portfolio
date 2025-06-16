// ===========================================
// 🎨 PORTFOLIO COLOR CONTROL CENTER 🎨
// ===========================================
// 
// 📝 INSTRUCTIONS FOR CHANGING COLORS:
// 1. Find the color you want to change below
// 2. Replace the text inside quotes with your preferred color
// 3. Save this file and refresh your website
// 4. That's it! The change will apply everywhere automatically
//
// 🎯 COLOR NAME FORMAT: 
// Use format: "colorname-number" 
// Examples: "blue-500", "red-400", "gray-700", "purple-600"
// Numbers range from 50 (lightest) to 950 (darkest)
//
// 🌈 AVAILABLE COLORS:
// gray, slate, zinc, neutral, stone, red, orange, amber, yellow, 
// lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose
//
// ===========================================

export const PORTFOLIO_COLORS = {
  
  // ===========================================
  // 🌟 MAIN WEBSITE APPEARANCE 🌟
  // ===========================================
  
  // Main background (the dark color behind everything)
  MAIN_BACKGROUND: "teal-800",              // Dark background color for the entire site

    // ===========================================
  // ✨ BACKGROUND DECORATION EFFECTS ✨
  // ===========================================
  
  // Floating background blobs (decorative elements)
  DECORATION_BLOB_1: "blue-500",            // First floating color blob
  DECORATION_BLOB_2: "purple-500",          // Second floating color blob
  DECORATION_BLOB_3: "emerald-500",         // Third floating color blob
  
  // Background blob transparency
  BLOB_TRANSPARENCY: "20",                  // How visible blobs are (5-50 recommended)
    // Grid pattern
  GRID_COLOR: "slate-400",                  // Color of background grid lines
  GRID_TRANSPARENCY: "0",                   // How visible grid is (5-20 recommended, 0 = hidden)
  
  // Ambient glows (soft lighting effects)
  GLOW_TOP: "blue-400",                     // Top glow color
  GLOW_BOTTOM: "purple-400",                // Bottom glow color
  GLOW_TRANSPARENCY: "10",                  // How strong glows are (5-20 recommended)
  
  
  // ===========================================
  // 📦 CARD/CONTAINER COLORS 📦
  // ===========================================
  
  // Background colors for all cards, boxes, and containers
  CARD_BACKGROUND_START: "gray-700",        // Starting color of gradient
  CARD_BACKGROUND_END: "gray-600",          // Ending color of gradient
  CARD_TRANSPARENCY: "90",                  // How solid cards are (10-100, higher = more solid)
  
  // Card borders (the lines around cards)
  CARD_BORDER: "orange-500",                // Normal border color
  CARD_BORDER_TRANSPARENCY: "70",           // How visible borders are (10-100)
  
  // Card hover effects (when you move mouse over cards)
  CARD_HOVER_BORDER: "orange-500",          // Border color when hovering
  CARD_HOVER_TRANSPARENCY: "10",            // Border transparency when hovering
  
  
  // ===========================================
  // 🎨 ACCENT & HIGHLIGHT COLORS 🎨
  // ===========================================
  
  // Primary accent (main highlight color used throughout site)
  PRIMARY_ACCENT: "orange-500",             // Main brand color
  PRIMARY_ACCENT_LIGHT: "orange-400",       // Lighter version
  PRIMARY_ACCENT_DARK: "orange-600",        // Darker version
  
  // Secondary accent (second highlight color)
  SECONDARY_ACCENT: "red-500",              // Secondary brand color  
  SECONDARY_ACCENT_LIGHT: "red-400",        // Lighter version
  
  // Additional accent colors
  SUCCESS_COLOR: "green-500",               // For success messages, checkmarks
  WARNING_COLOR: "yellow-500",              // For warnings, important notes
  ERROR_COLOR: "red-500",                   // For errors, alerts
  INFO_COLOR: "blue-500",                   // For information, links
  
  
  // ===========================================
  // 📝 TEXT COLORS 📝
  // ===========================================
  
  // Main text colors
  TEXT_PRIMARY: "gray-200",                 // Main text color (brightest)
  TEXT_SECONDARY: "gray-300",               // Secondary text (slightly dimmer)
  TEXT_MUTED: "gray-400",                   // Muted text (dates, labels)
  TEXT_DISABLED: "gray-500",                // Disabled text (least visible)
  
  // Special text colors
  TEXT_ACCENT: "orange-400",                // Highlighted text
  TEXT_LINK: "blue-400",                    // Links and clickable text
  TEXT_SUCCESS: "green-400",                // Success messages
  TEXT_ERROR: "red-400",                    // Error messages
  
  
  // ===========================================
  // 🏷️ TECHNOLOGY TAGS & BADGES 🏷️
  // ===========================================
  
  // Technology skill tags
  TAG_BACKGROUND: "gray-800",               // Background of skill tags
  TAG_BORDER: "gray-600",                   // Border of skill tags
  TAG_TEXT: "gray-200",                     // Text color in tags
  TAG_TRANSPARENCY: "60",                   // Tag background transparency
  
  // Special category colors
  TAG_FRONTEND: "blue-500",                 // Frontend technology tags
  TAG_BACKEND: "green-500",                 // Backend technology tags
  TAG_DEVOPS: "orange-500",                 // DevOps technology tags
  TAG_DATABASE: "purple-500",               // Database technology tags
  
  
  // ===========================================
  // 🎯 BUTTON & INTERACTIVE ELEMENTS 🎯
  // ===========================================
  
  // Buttons
  BUTTON_PRIMARY: "orange-500",             // Primary button background
  BUTTON_PRIMARY_HOVER: "orange-600",       // Primary button when hovering
  BUTTON_PRIMARY_TEXT: "white",             // Primary button text
  
  BUTTON_SECONDARY: "gray-700",             // Secondary button background
  BUTTON_SECONDARY_HOVER: "gray-600",       // Secondary button when hovering
  BUTTON_SECONDARY_TEXT: "gray-200",        // Secondary button text
  
  // Form elements
  INPUT_BACKGROUND: "gray-800",             // Text input backgrounds
  INPUT_BORDER: "gray-600",                 // Text input borders
  INPUT_BORDER_FOCUS: "orange-500",         // Text input borders when typing
  INPUT_TEXT: "gray-200",                   // Text color in inputs
  
    // ===========================================
  // 🚀 ANIMATION & EFFECTS 🚀
  // ===========================================
  
  // Transparency levels
  TRANSPARENCY_LIGHT: "20",                 // Light transparency (20%)
  TRANSPARENCY_MEDIUM: "40",                // Medium transparency (40%)
  TRANSPARENCY_HEAVY: "60",                 // Heavy transparency (60%)
  
  // Shadow colors
  SHADOW_PRIMARY: "orange-500",             // Primary shadow color
  SHADOW_SECONDARY: "gray-900",             // Secondary shadow color
  
  // Transparency levels for various effects
  TRANSPARENCY_LIGHT: "20",                 // Light transparency
  TRANSPARENCY_MEDIUM: "40",                // Medium transparency
  TRANSPARENCY_HEAVY: "60",                 // Heavy transparency
  TRANSPARENCY_SOLID: "90",                 // Almost solid
  
};

// ===========================================
// 🌈 PRESET COLOR THEMES 🌈
// ===========================================
// Copy and paste any of these complete themes to quickly change your entire website

export const PRESET_THEMES = {
  
  // Current orange theme (default)
  ORANGE_PROFESSIONAL: {
    PRIMARY_ACCENT: "orange-500",
    SECONDARY_ACCENT: "red-500", 
    CARD_BACKGROUND_START: "gray-700",
    CARD_BACKGROUND_END: "gray-600",
    TEXT_ACCENT: "orange-400"
  },
  
  // Blue corporate theme
  BLUE_CORPORATE: {
    PRIMARY_ACCENT: "blue-500",
    SECONDARY_ACCENT: "blue-600",
    CARD_BACKGROUND_START: "slate-700", 
    CARD_BACKGROUND_END: "slate-600",
    TEXT_ACCENT: "blue-400"
  },
  
  // Purple creative theme
  PURPLE_CREATIVE: {
    PRIMARY_ACCENT: "purple-500",
    SECONDARY_ACCENT: "violet-500",
    CARD_BACKGROUND_START: "purple-900",
    CARD_BACKGROUND_END: "purple-800", 
    TEXT_ACCENT: "purple-400"
  },
  
  // Green tech theme
  GREEN_TECH: {
    PRIMARY_ACCENT: "green-500",
    SECONDARY_ACCENT: "emerald-500",
    CARD_BACKGROUND_START: "gray-800",
    CARD_BACKGROUND_END: "gray-700",
    TEXT_ACCENT: "green-400"
  },
  
  // Red bold theme  
  RED_BOLD: {
    PRIMARY_ACCENT: "red-500",
    SECONDARY_ACCENT: "rose-500",
    CARD_BACKGROUND_START: "red-950",
    CARD_BACKGROUND_END: "red-900",
    TEXT_ACCENT: "red-400"
  }
  
};

// ===========================================
// 🛠️ HELPER FUNCTIONS (Don't change these)
// ===========================================

// Comprehensive Tailwind to CSS color mapping
export const TAILWIND_TO_CSS = {
  // Basic colors
  'black': '#000000',
  'white': '#ffffff',
  
  // Grays
  'gray-50': '#f9fafb', 'gray-100': '#f3f4f6', 'gray-200': '#e5e7eb', 'gray-300': '#d1d5db',
  'gray-400': '#9ca3af', 'gray-500': '#6b7280', 'gray-600': '#4b5563', 'gray-700': '#374151',
  'gray-800': '#1f2937', 'gray-900': '#111827', 'gray-950': '#030712',
  
  // Slate
  'slate-50': '#f8fafc', 'slate-100': '#f1f5f9', 'slate-200': '#e2e8f0', 'slate-300': '#cbd5e1',
  'slate-400': '#94a3b8', 'slate-500': '#64748b', 'slate-600': '#475569', 'slate-700': '#334155',
  'slate-800': '#1e293b', 'slate-900': '#0f172a', 'slate-950': '#020617',
  
  // Blue
  'blue-50': '#eff6ff', 'blue-100': '#dbeafe', 'blue-200': '#bfdbfe', 'blue-300': '#93c5fd',
  'blue-400': '#60a5fa', 'blue-500': '#3b82f6', 'blue-600': '#2563eb', 'blue-700': '#1d4ed8',
  'blue-800': '#1e40af', 'blue-900': '#1e3a8a', 'blue-950': '#172554',
  
  // Purple
  'purple-50': '#faf5ff', 'purple-100': '#f3e8ff', 'purple-200': '#e9d5ff', 'purple-300': '#d8b4fe',
  'purple-400': '#c084fc', 'purple-500': '#a855f7', 'purple-600': '#9333ea', 'purple-700': '#7c3aed',
  'purple-800': '#6b21a8', 'purple-900': '#581c87', 'purple-950': '#3b0764',
  
  // Emerald
  'emerald-50': '#ecfdf5', 'emerald-100': '#d1fae5', 'emerald-200': '#a7f3d0', 'emerald-300': '#6ee7b7',
  'emerald-400': '#34d399', 'emerald-500': '#10b981', 'emerald-600': '#059669', 'emerald-700': '#047857',
  'emerald-800': '#065f46', 'emerald-900': '#064e3b', 'emerald-950': '#022c22',
  
  // Orange
  'orange-50': '#fff7ed', 'orange-100': '#ffedd5', 'orange-200': '#fed7aa', 'orange-300': '#fdba74',
  'orange-400': '#fb923c', 'orange-500': '#f97316', 'orange-600': '#ea580c', 'orange-700': '#c2410c',
  'orange-800': '#9a3412', 'orange-900': '#7c2d12', 'orange-950': '#431407',
  
  // Red
  'red-50': '#fef2f2', 'red-100': '#fee2e2', 'red-200': '#fecaca', 'red-300': '#fca5a5',
  'red-400': '#f87171', 'red-500': '#ef4444', 'red-600': '#dc2626', 'red-700': '#b91c1c',
  'red-800': '#991b1b', 'red-900': '#7f1d1d', 'red-950': '#450a0a',
  
  // Green
  'green-50': '#f0fdf4', 'green-100': '#dcfce7', 'green-200': '#bbf7d0', 'green-300': '#86efac',
  'green-400': '#4ade80', 'green-500': '#22c55e', 'green-600': '#16a34a', 'green-700': '#15803d',
  'green-800': '#166534', 'green-900': '#14532d', 'green-950': '#052e16',
  
  // Yellow
  'yellow-50': '#fefce8', 'yellow-100': '#fef3c7', 'yellow-200': '#fde68a', 'yellow-300': '#fcd34d',
  'yellow-400': '#fbbf24', 'yellow-500': '#f59e0b', 'yellow-600': '#d97706', 'yellow-700': '#b45309',
  'yellow-800': '#92400e', 'yellow-900': '#78350f', 'yellow-950': '#451a03'
};

// Function to convert Tailwind color name to CSS hex color
export function getTailwindColor(colorName) {
  return TAILWIND_TO_CSS[colorName] || colorName;
}

// Function to convert transparency percentage to hex alpha
export function transparencyToHex(transparency) {
  const alpha = Math.round(parseInt(transparency) * 2.55);
  return alpha.toString(16).padStart(2, '0');
}

// Function to get color with transparency as hex
export function getColorWithTransparency(colorName, transparency) {
  const color = getTailwindColor(colorName);
  const alpha = transparencyToHex(transparency);
  return `${color}${alpha}`;
}

// Function to get color with transparency
export function getColorWithOpacity(colorName, opacity) {
  return `${colorName}/${opacity}`;
}

// Function to get gradient
export function getGradient(startColor, endColor, direction = "to-br") {
  return `bg-gradient-${direction} from-${startColor} to-${endColor}`;
}

// Function to apply preset theme
export function applyPresetTheme(themeName) {
  const theme = PRESET_THEMES[themeName];
  if (theme) {
    Object.assign(PORTFOLIO_COLORS, theme);
  }
}

// ===========================================
// 📖 USAGE EXAMPLES 📖  
// ===========================================
/*

// In your components, you would use colors like this:

// Card background:
className={`bg-gradient-to-br from-${PORTFOLIO_COLORS.CARD_BACKGROUND_START}/${PORTFOLIO_COLORS.CARD_TRANSPARENCY} to-${PORTFOLIO_COLORS.CARD_BACKGROUND_END}/${PORTFOLIO_COLORS.CARD_TRANSPARENCY}`}

// Card border:
className={`border border-${PORTFOLIO_COLORS.CARD_BORDER}/${PORTFOLIO_COLORS.CARD_BORDER_TRANSPARENCY}`}

// Accent text:
className={`text-${PORTFOLIO_COLORS.TEXT_ACCENT}`}

// Primary button:
className={`bg-${PORTFOLIO_COLORS.BUTTON_PRIMARY} hover:bg-${PORTFOLIO_COLORS.BUTTON_PRIMARY_HOVER} text-${PORTFOLIO_COLORS.BUTTON_PRIMARY_TEXT}`}

*/
