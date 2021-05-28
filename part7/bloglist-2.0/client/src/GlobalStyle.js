import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  :root {
    --font-family: Futura, apple-system, sans-serif;

    --metallic-seaweed: #177e89ff;
    --midnight-green-eagle-green: #084c61ff;
    --cg-red: #db3a34ff;
    --maximum-yellow-red: #ffc857ff;
    --jet: #323031ff;

    --font-weight-medium: 500;

    --color-text: hsl(222deg, 22%, 5%);
    --color-background: hsl(0deg, 0%, 100%);
    --color-primary: hsl(245deg, 100%, 60%);
    --color-secondary: hsl(333deg, 100%, 45%);
    --color-tertiary: hsl(255deg, 85%, 30%);
    --color-decorative: hsl(200deg, 75%, 65%);
    --color-muted: hsl(210deg, 55%, 92%);
    --color-info: hsl(245deg, 100%, 60%);
    --color-success: hsl(160deg, 100%, 40%);
    --color-success-background: hsla(160deg, 100%, 40%, 0.1);
    --color-error: hsl(340deg, 95%, 50%);
    --color-error-background: hsla(340deg, 95%, 43%, 0.1);
    --color-alert: hsl(37deg, 100%, 50%);
    --color-alert-background: hsla(52deg, 100%, 50%, 0.25);
    --color-subtle-background: hsl(225deg, 25%, 95%);
    --color-subtle-floating: hsl(0deg, 0%, 100%);
    --color-homepage-light: hsl(204deg, 67%, 85%);
    --color-homepage-dark: hsl(202deg, 71%, 90%);
    --color-homepage-bg: hsl(204deg, 67%, 85%);
    --color-gray-100: hsl(225deg, 25%, 95%);
    --color-gray-200: hsl(225deg, 16%, 90%);
    --color-gray-300: hsl(225deg, 8%, 80%);
    --color-gray-400: hsl(225deg, 8%, 70%);
    --color-gray-500: hsl(225deg, 7%, 60%);
    --color-gray-600: hsl(225deg, 15%, 50%);
    --color-gray-700: hsl(225deg, 12%, 40%);
    --color-gray-900: hsl(225deg, 25%, 20%);
    --color-gray-1000: hsl(225deg, 15%, 15%);
  }

  * {
    margin: 0;
  }

  body {
    font-family: var(--font-family);
    color: var(--jet)
  }

  h2 {
    margin-bottom: 0.5em;
    font-variant: small-caps;
  }
`

export default GlobalStyle
