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
    --color-success: hsl(160deg, 100%, 40%);
    --color-success-background: hsla(160deg, 100%, 40%, 0.1);
    --color-error: hsl(340deg, 95%, 50%);
    --color-error-background: hsla(340deg, 95%, 43%, 0.1);
    --color-gray-100: hsl(225deg, 25%, 95%);
    --color-gray-200: hsl(225deg, 16%, 90%);
    --color-gray-300: hsl(225deg, 8%, 80%);
  }

  * {
    margin: 0;
  }

  body {
    font-family: var(--font-family);
    color: var(--jet)
  }

  h2 {
    font-variant: small-caps;
  }
`

export default GlobalStyle
