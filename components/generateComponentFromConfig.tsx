import React from 'react';
import { Socials, CustomLink, ArtistInfo, Album } from '../components/editor';
import Connect from '../components/blocks/Connect';
import Listing from '../components/blocks/Listing';
import MiniListing from '../components/blocks/MiniListing';
import MiniClaim from '../components/blocks/MiniClaim';
import AlbumComp from '../components/blocks/AlbumComp';
import SocialLinkButton from '../components/blocks/SocialLinkButton'
import CustomLinkButton from '../components/blocks/CustomLinkButton'

import { FaInstagram, FaTwitter, FaYoutube, FaSpotify, FaTiktok, FaUser, FaAmilia, FaAmazon, FaAngellist, FaAppStoreIos, FaBitcoin, FaDiscord, FaEnvira, FaEtsy, FaFacebook, FaGithub, FaGoodreadsG, FaHackerNews, FaMailchimp, FaReddit, FaBone, FaBomb, FaBook, FaBookmark, FaBowlingBall, FaCar, FaFutbol, FaGuitar  } from "react-icons/fa";
import { IconType } from 'react-icons';


const socialIcons: {[key: string]: IconType} = {
  instagram: FaInstagram,
  twitter: FaTwitter,
  youtube: FaYoutube,
  spotify: FaSpotify,
  tiktok: FaTiktok,
};

// const customIcons: {[key: string]: IconType} = {
//   FaUser , FaAmilia, FaAmazon, FaAngellist, FaAppStoreIos, FaBitcoin, FaDiscord, FaEnvira, FaEtsy, FaFacebook, FaGithub, FaGoodreadsG, FaHackerNews, FaMailchimp, FaReddit, FaBone, FaBomb, FaBook, FaBookmark, FaBowlingBall, FaCar, FaFutbol, FaGuitar,
// }

const customIcons: {[key: string]: IconType} = {
  FaUser: FaUser, 
  FaAmilia: FaAmilia,
  FaAmazon: FaAmazon,
  FaAngellist: FaAngellist,
  FaAppStoreIos: FaAppStoreIos,
  FaBitcoin: FaBitcoin,
  FaDiscord: FaDiscord,
  FaEnvira: FaEnvira,
  FaEtsy: FaEtsy,
  FaFacebook: FaFacebook,
  FaGithub: FaGithub,
  FaGoodreadsG: FaGoodreadsG,
  FaHackerNews: FaHackerNews,
  FaMailchimp: FaMailchimp,
  FaReddit: FaReddit,
  FaBone: FaBone,
  FaBomb: FaBomb,
  FaBook: FaBook,
  FaBookmark: FaBookmark,
  FaBowlingBall: FaBowlingBall,
  FaCar: FaCar,
  FaFutbol: FaFutbol,
  FaGuitar: FaGuitar,
};

export default function generateComponentFromConfig(config) {
  if (!config.artistInfo?.name) {
    return (<div>Please add an Artist Name</div>)
  }
  // console.log('🔺🔺🔺🔺 generateComp config: ', config)
  return (
    <div className="flex flex-col items-center justify-center py-2 bg-gray-100">
        <div className="flex flex-col bg-white shadow-md rounded-lg max-w-lg mx-auto p-4">

        <h1 className="mb-4 text-2xl font-bold text-center">
          {config.artistInfo && config.artistInfo.name ? config.artistInfo.name : "Artist's Profile"}
        </h1>
        <img 
          className='object-cover rounded-md content-center w-64 h-64 mx-auto'
          src={config.artistInfo && config.artistInfo.imageUrl ? config.artistInfo.imageUrl : "https://media.istockphoto.com/id/1316420668/vector/user-icon-human-person-symbol-social-profile-icon-avatar-login-sign-web-user-symbol.jpg?s=612x612&w=0&k=20&c=AhqW2ssX8EeI2IYFm6-ASQ7rfeBWfrFFV4E87SaFhJE="} alt={config.artistInfo && config.artistInfo.name ? config.artistInfo.name : "Artist"} 
        />
        <p className="mt-4 text-center">{config.artistInfo && config.artistInfo.description ? config.artistInfo.description : ""}</p>
        

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
            {/* if config.manifoldWidgets.enabled is true */}
            { config.manifoldWidgets.connectWidget.enabled && <Connect networkId={config.manifoldWidgets.connectWidget.networkId}/>}

            {/* ~~ Add Marketplace Widget component ~~ */}
            {/* <Listing /> */}
            { config.manifoldWidgets.marketplaceWidget.enabled && <Listing networkId={config.manifoldWidgets.marketplaceWidget.networkId} listingId={config.manifoldWidgets.marketplaceWidget.listingId}/>}

            {/* <MiniClaim /> */}
            { config.manifoldWidgets.miniClaimWidget.enabled &&  <MiniClaim />}

            {/* <MiniListing /> */}
            { config.manifoldWidgets.miniMarketplaceWidget.enabled &&  <MiniListing />}
          </div>
        </div>
      </div>
  )
}