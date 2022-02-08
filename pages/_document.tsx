import Document, { Html, Head, Main, NextScript } from 'next/document'

class TwelveProductsDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preload" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin=""
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Outfit&family=Roboto:wght@300;400;500;700&display=swap"
            rel="stylesheet"
          />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default TwelveProductsDocument
