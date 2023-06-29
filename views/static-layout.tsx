import React, { useEffect, useState } from "react";
import Pusher from "pusher-js";
import Head from "next/head";

import { FaInstagram, FaTwitter, FaYoutube, FaSpotify, FaTiktok, FaUser, FaAmilia, FaAmazon, FaAngellist, FaAppStoreIos, FaBitcoin, FaDiscord, FaEnvira, FaEtsy, FaFacebook, FaGithub, FaGoodreadsG, FaHackerNews, FaMailchimp, FaReddit, FaBone, FaBomb, FaBook, FaBookmark, FaBowlingBall, FaCar, FaFutbol, FaGuitar  } from "react-icons/fa";
import { IconType } from 'react-icons';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Socials, CustomLink, ArtistInfo, Album } from '../components/editor';
import Connect from '../components/blocks/Connect';
import Listing from '../components/blocks/Listing';
import MiniListing from '../components/blocks/MiniListing';
import MiniClaim from '../components/blocks/MiniClaim';
import AlbumComp from '../components/blocks/AlbumComp';
import SocialLinkButton from '../components/blocks/SocialLinkButton'
import CustomLinkButton from '../components/blocks/CustomLinkButton'

const socialIcons: {[key: string]: IconType} = {
  instagram: FaInstagram,
  twitter: FaTwitter,
  youtube: FaYoutube,
  spotify: FaSpotify,
  tiktok: FaTiktok,
};

const customIcons: {[key: string]: IconType} = {
  FaUser , FaAmilia, FaAmazon, FaAngellist, FaAppStoreIos, FaBitcoin, FaDiscord, FaEnvira, FaEtsy, FaFacebook, FaGithub, FaGoodreadsG, FaHackerNews, FaMailchimp, FaReddit, FaBone, FaBomb, FaBook, FaBookmark, FaBowlingBall, FaCar, FaFutbol, FaGuitar,
}


export function RenderStaticLayout({ html, config }) {
  // This state is used to hold the hydrated HTML content fetched from the Pusher event
  const [newHtml, setNewHtml] = useState();
  const [newConfig, setNewConfig] = useState({});

  // This function sets the received HTML from Pusher to state
  function hydrateHtml(html) {
    setNewHtml(html);
  }

  function hydrateConfig(config) {
    setNewConfig(config);
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
        channel.bind("hydrate-config", hydrateConfig);
      }
    }
  }, []);

  if (!config) {
    return <div>Loading...</div>
  }

  console.log('⛄️ config: ', config )

  return (
    <>
      <Head>
        <title>{config.artistInfo.name}'s page</title>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      {/* If the newHtml state is set (i.e., if we've received HTML from Pusher), use it, otherwise use the initial HTML */}
      {/* <main dangerouslySetInnerHTML={{ __html: newHtml || html }}></main>
      <style jsx>{`
        main {
          width: 100%;
          height: 100%;
        }
      `}</style> */}

      <div className="flex flex-col items-center justify-center py-2">
        <div className="flex flex-col bg-white shadow-md rounded-lg max-w-lg mx-auto p-4">

        <h1 className="mb-4 text-2xl font-bold text-center">
          {config.artistInfo && config.artistInfo.name ? config.artistInfo.name + "'s Profile" : "Artist's Profile"}
        </h1>
        <img 
          className='object-cover rounded-md content-center w-64 h-64 mx-auto'
          src={config.artistInfo && config.artistInfo.imageUrl ? config.artistInfo.imageUrl : "default-image-url"} alt={config.artistInfo && config.artistInfo.name ? config.artistInfo.name : "Artist"} 
        />
        <p className="mt-4 text-center">{config.artistInfo && config.artistInfo.description ? config.artistInfo.description : "Artist Description"}</p>
        

          {/* <h1 className="mb-4 text-center text-2xl font-bold">{artist}'s Profile</h1> */}
          {Object.keys(config.socials).map((social, index) => {
            const socialUrl = config.socials[social as keyof Socials];

            // Dont render the social link if it is not provided
            if (!socialUrl) {
              return null;
            }
            console.log('-- socialUrl: ', socialUrl)

            return <SocialLinkButton key={index} social={social} socialUrl={socialUrl} socialIcons={socialIcons} />;
          })}
          {config.customLinks.map((link, index) => {
            console.log('** link: ', link);
            return <CustomLinkButton key={index} link={link} customIcons={customIcons} />;
          })}   

          {config.albums.map((album, index) => (
            <AlbumComp key={index} album={album} />
          ))}

          <div className='mt-8 content-center'>
            {/* Manifold Stuff */}
            {/* -- Add Connect Widget -- */}
            <Connect/>

            {/* ~~ Add Marketplace Widget component ~~ */}
            <Listing />

            <MiniListing />
            <MiniClaim />
          </div>
        </div>
      </div>

    </>
  );
}