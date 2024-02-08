export default `
html {
  color: #111827;
  background-color: white;
}

html.dark {
  color: #f3f4f6;
  background-color: #111827;
}

*,
::before,
::after {
  border-color: #e5e7eb;
}

.dark *,
.dark ::before,
.dark ::after {
  border-color: #374151;
}

:root {
  --font-family-sans: "IBM Plex Sans", "Helvetica Neue", arial, sans-serif;
  --font-family-mono: "IBM Plex Mono", "Menlo", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", courier, monospace;
  --border-color: 226, 232, 240;
  --primary-color-50: 236, 253, 245;
  --primary-color-100: 209, 250, 229;
  --primary-color-200: 167, 243, 208;
  --primary-color-300: 110, 231, 183;
  --primary-color-400: 52, 211, 153;
  --primary-color-500: 16, 185, 129;
  --primary-color-600: 5, 150, 105;
  --primary-color-700: 4, 120, 87;
  --primary-color-800: 6, 95, 70;
  --primary-color-900: 6, 78, 59;
  --primary-color-950: 2, 44, 34;
  --secondary-color-50: 248, 250, 252;
  --secondary-color-100: 241, 245, 249;
  --secondary-color-200: 226, 232, 240;
  --secondary-color-300: 203, 213, 225;
  --secondary-color-400: 148, 163, 184;
  --secondary-color-500: 100, 116, 139;
  --secondary-color-600: 71, 85, 105;
  --secondary-color-700: 51, 65, 85;
  --secondary-color-800: 30, 41, 59;
  --secondary-color-900: 15, 23, 42;
  --secondary-color-950: 2, 6, 23;
  --success-color-50: 240, 253, 244;
  --success-color-100: 220, 252, 231;
  --success-color-200: 187, 247, 208;
  --success-color-300: 134, 239, 172;
  --success-color-400: 74, 222, 128;
  --success-color-500: 34, 197, 94;
  --success-color-600: 22, 163, 74;
  --success-color-700: 21, 128, 61;
  --success-color-800: 22, 101, 52;
  --success-color-900: 20, 83, 45;
  --success-color-950: 5, 46, 22;
  --warning-color-50: 254, 252, 232;
  --warning-color-100: 254, 249, 195;
  --warning-color-200: 254, 240, 138;
  --warning-color-300: 253, 224, 71;
  --warning-color-400: 250, 204, 21;
  --warning-color-500: 234, 179, 8;
  --warning-color-600: 202, 138, 4;
  --warning-color-700: 161, 98, 7;
  --warning-color-800: 133, 77, 14;
  --warning-color-900: 113, 63, 18;
  --warning-color-950: 66, 32, 6;
  --error-color-50: 254, 242, 242;
  --error-color-100: 254, 226, 226;
  --error-color-200: 254, 202, 202;
  --error-color-300: 252, 165, 165;
  --error-color-400: 248, 113, 113;
  --error-color-500: 239, 68, 68;
  --error-color-600: 220, 38, 38;
  --error-color-700: 185, 28, 28;
  --error-color-800: 153, 27, 27;
  --error-color-900: 127, 29, 29;
  --error-color-950: 69, 10, 10;
}
`
