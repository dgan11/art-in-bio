import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import Head from "next/head";

export function RenderStaticLayout({ html }) {
  // This state is used to hold the hydrated HTML content fetched from the Pusher event
  const [newHtml, setNewHtml] = useState();

  // This function sets the received HTML from Pusher to state
  function hydrateHtml(html) {
    setNewHtml(html);
  }

  // This effect runs once when the component is first mounted
  useEffect(() => {
    let host = window.location.host;
    let isDev = host.includes("localhost");
    let splitHost = host.split(".");

    let pageName;

    // If the environment is development and the host has 2 parts
    // Or if the environment is production and the host has 3 parts
    if (
      (isDev && splitHost.length === 2) ||
      (!isDev && splitHost.length === 3)
    ) {
      // Get the first part of the host which is the subdomain
      pageName = splitHost[0];

      // If the pageName exists
      if (pageName) {
        // Create a new Pusher instance with your app key
        const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
          cluster: "us3"
        });

        // Subscribe to a channel named after the subdomain
        const channel = pusher.subscribe(pageName);

        // Bind the "hydrate-html" event to the hydrateHtml function
        // When a "hydrate-html" event is received, the hydrateHtml function will be called with the HTML payload
        channel.bind("hydrate-html", hydrateHtml);
      }
    }
  }, []);

  return (
    <>
      <Head>
        <title>Static Fun</title>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      {/* If the newHtml state is set (i.e., if we've received HTML from Pusher), use it, otherwise use the initial HTML */}
      <main dangerouslySetInnerHTML={{ __html: newHtml || html }}></main>
      <style jsx>{`
        main {
          width: 100%;
          height: 100%;
        }
      `}</style>
    </>
  );
}