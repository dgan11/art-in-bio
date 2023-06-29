import { Html, Head, Main, NextScript } from "next/document";

export default function Document(props) {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="claim any subdomain and have fun!" />
        <meta property="og:title" content="Static Fun" />
        <meta
          property="og:description"
          content="claim any subdomain and have fun!"
        />
        <meta
          property="og:image"
          content="https://www.artin.bio/twitter-card.png"
        />
        <meta property="og:url" content="https://www.artin.bio" />
        <meta name="twitter:card" content="summary_large_image" />

        {/* Note: add manifold widgets */}
        <link rel="stylesheet" href="https://connect.manifoldxyz.dev/2.2.4/connect.css" />
        <script src="https://connect.manifoldxyz.dev/2.2.4/connect.umd.js" async></script>

        <script src="https://identity.manifoldxyz.dev/2.1.0/walletIdentity.umd.min.js"></script>
        <link rel="stylesheet" href="https://identity.manifoldxyz.dev/2.1.0/walletIdentity.css" />

        <script src="https://restrictedtoken.manifoldxyz.dev/0.1.0/restrictedToken.umd.min.js"></script>
        <link rel="stylesheet" href="https://restrictedtoken.manifoldxyz.dev/0.1.0/restrictedToken.css" />

        <link rel="stylesheet" href="https://marketplace.manifoldxyz.dev/3.3.7/marketplace.css" />
        <script src="https://marketplace.manifoldxyz.dev/3.3.7/marketplace.umd.js" async></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
