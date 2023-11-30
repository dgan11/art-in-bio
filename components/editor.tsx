import React, { useEffect, useRef, useState, ChangeEvent, FormEvent } from "react";
import ReactDOM from 'react-dom';

import EditLinkModal from "./edit-link-modal";
import SaveBar from "./save-bar";

import { FaInstagram, FaTwitter, FaYoutube, FaSpotify, FaTiktok, FaUser , FaAmilia, FaAmazon, FaAngellist, FaAppStoreIos, FaBitcoin, FaDiscord, FaEnvira, FaEtsy, FaFacebook, FaGithub, FaGoodreadsG, FaHackerNews, FaMailchimp, FaReddit, FaBone, FaBomb, FaBook, FaBookmark, FaBowlingBall, FaCar, FaFutbol, FaGuitar  } from "react-icons/fa";
import { IconType } from 'react-icons';

import generateComponentFromConfig from "./generateComponentFromConfig";

export type Socials = {
  instagram: string;
  twitter: string;
  youtube: string;
  spotify: string;
  tiktok: string;
};

export type CustomLink = {
  text: string;
  url: string;
  primary: boolean;
  icon: string;
};

export type Album = {
  name: string;
  links: string[];
};

export type ArtistInfo = {
  name: string;
  description: string;
  imageUrl: string;
};

export type ManifoldWidgets = {
  connectWidget: {
    enabled: boolean;
    networkId: string;
  };
  marketplaceWidget: {
    enabled: boolean;
    listingId: string;
    networkId: string;
  };
  miniClaimWidget: {
    enabled: boolean;
  };
  miniMarketplaceWidget: {
    enabled: boolean;
  };
}

const icons: {[key: string]: IconType} = {
  FaUser , FaAmilia, FaAmazon, FaAngellist, FaAppStoreIos, FaBitcoin, FaDiscord, FaEnvira, FaEtsy, FaFacebook, FaGithub, FaGoodreadsG, FaHackerNews, FaMailchimp, FaReddit, FaBone, FaBomb, FaBook, FaBookmark, FaBowlingBall, FaCar, FaFutbol, FaGuitar,
}

export default function EditorContainer({ html, email, editLink, config }) {
  const [_html, setHtml] = useState(html || "");
  const [_email, setEmail] = useState(email);
  const [_config, setConfig] = useState(config || {});
  const [dialogOpen, setDialogOpen] = useState(false);
  console.log('🍰🍰🍰🍰 editor.tsx component | config: ', config)


  useEffect(() => {
    // setGeneratedComponent(generateComponentFromConfig(config));
    console.log('👀 _config: ', _config)
  }, [config, _config]);

  return (
    <div className="root-editor-container">
      <EditLinkModal
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        email={_email}
        setEmail={setEmail}
        editLink={editLink}
      />
      <div className="editor-container">
        <Editor
          html={_html}
          email={_email}
          config={_config}
          setHtml={setHtml}
          setDialogOpen={setDialogOpen}
          setConfig={setConfig}
        />
      </div>
      <div className="output-container">
        {/* <OutputContainer content={_html} /> */}
        {/* <OutputContainer content={generatedComponent} /> */}
        <OutputContainer config={_config} />
      </div>

      <style jsx>{`
        .root-editor-container {
          display: flex;
          height: calc(100% - 30px);
          width: 100%;
          margin: 0;
        }
        .editor-container {
          height: 100%;
          width: 100%;
          flex: 1 0 50%;
          background: #22222;
        }
        .output-container {
          flex: 1 0 50%;
          height: 100%;
          width: 100%;
          -webkit-overflow-scrolling: touch;
          overflow-y: scroll;
        }
        @media (max-width: 500px) {
          .root-editor-container {
            flex-direction: column;
          }
          .editor-container {
            flex: 1 0 50%;
            height: 50%;
            order: 1;
          }
          
        }
      `}</style>
    </div>
  );
}

function Editor({ html, config, email, setHtml, setDialogOpen, setConfig }) {
  const [saveState, setSaveState] = useState('');
  const [showEditLink, setShowEditLink] = useState(false);

  function onChange(e) {
    e.preventDefault();

    // setHtml(e.target.value);

    if (saveState === "SUCCESS") {
      setSaveState("DEFAULT");
    }
  }

  // useRef - value does not change everytime the component re-renders
  const initialSocials = useRef<Socials>({
    instagram: 'https://www.instagram.com/davidgan__',
    twitter: 'https://twitter.com/davidgan__',
    youtube: '',
    spotify: '',
    tiktok: 'https://www.tiktok.com/@dgan11'
  });

  const initialArtistInfo = useRef<ArtistInfo>({
    name: "Creator X",
    description: "Artist and Creator",
    imageUrl: "https://pbs.twimg.com/profile_images/994592419705274369/RLplF55e_400x400.jpg",
  });

  const initialCustomLinks = useRef<CustomLink[]>([
    { text: 'my custom link', url: 'https://davidgan.xyz/', primary: true, icon: 'FaUser' },
  ]);
  const initialAlbums = useRef<Album[]>([
    { name: 'Album 1', links: ['https://i.ytimg.com/vi/STiUV6XXG4E/maxresdefault.jpg', 'https://i.ytimg.com/vi/aSQUg-h8G4s/maxresdefault.jpg', 'https://i.ytimg.com/vi/6x_b11Kyrco/hqdefault.jpg'] },
  ]);

  const initialManifoldWidgets = useRef<ManifoldWidgets>({
    connectWidget: {
      enabled: false,
      networkId: '',
    },
    marketplaceWidget: {
      enabled: false,
      listingId: '',
      networkId: '',
    },
    miniClaimWidget: {
      enabled: true
    },
    miniMarketplaceWidget: {
      enabled: true
    },
  });
  


  const [socials, setSocials] = useState<Socials>(() => initialSocials.current);
  const [customLinks, setCustomLinks] = useState<CustomLink[]>(() => initialCustomLinks.current);
  const [artistInfo, setArtistInfo] = useState<ArtistInfo>(() => initialArtistInfo.current);
  const [albums, setAlbums] = useState<Album[]>(() => initialAlbums.current);
  const [manifoldWidgets, setManifoldWidgets] = useState<ManifoldWidgets>(() => initialManifoldWidgets.current);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const configuration = { socials, customLinks, artistInfo, albums, manifoldWidgets};
    setConfig(configuration);
    console.log('📦 configuration: ', configuration);
  }, [socials, customLinks, artistInfo, albums, manifoldWidgets]); // dependencies

   // After component mounts (in the browser environment), load saved data from local storage
   useEffect(() => {

    /**
     * When the client side React code takes over, this is called hydration. 
     * This is crucial because the localStorage API is only available in the browser
     */
    const hydrate = async () => {
      if (typeof window !== 'undefined') {
        console.log('💦 HYDRATE: ', config)
        // const savedConfiguration = JSON.parse(localStorage.getItem('configuration') || '{}');

        if (config.artistInfo && JSON.stringify(config.artistInfo) !== JSON.stringify(artistInfo)) {
          setArtistInfo(config.artistInfo);
        }
  
        if (config.socials && JSON.stringify(config.socials) !== JSON.stringify(socials)) {
          setSocials(config.socials);
        }
    
        if (config.customLinks && JSON.stringify(config.customLinks) !== JSON.stringify(customLinks)) {
          setCustomLinks(config.customLinks);
        }

        if (config.albums && JSON.stringify(config.albums) !== JSON.stringify(albums)) {
          setAlbums(config.albums);
        }

        if (config.manifoldWidgets && JSON.stringify(config.manifoldWidgets) !== JSON.stringify(manifoldWidgets)) {
          setManifoldWidgets(config.manifoldWidgets);
        }
  
        setIsLoading(false);
      }
    }
  
    hydrate();
  }, []);

  const handleSocialChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as keyof typeof socials;
    setSocials({ ...socials, [name]: e.target.value });
  };

  const handleCustomLinkChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const newCustomLinks = [...customLinks];
    const name = e.target.name as keyof CustomLink;
    if (name === 'primary') {
      newCustomLinks[index][name] = e.target.checked;
    } else {
      newCustomLinks[index][name] = e.target.value;
    }

    setCustomLinks(newCustomLinks);
};

  const handleIconChange = (iconName: string, index: number) => {
    const newCustomLinks = [...customLinks];
    newCustomLinks[index].icon = iconName;
    setCustomLinks(newCustomLinks);
  };

  const addCustomLink = () => {
    setCustomLinks([...customLinks, { text: 'my custom link', url: 'https://davidgan.xyz/', primary: true, icon: 'FaUser' }]);
  };

  const deleteCustomLink = (index: number) => {
    const newCustomLinks = [...customLinks];
    newCustomLinks.splice(index, 1);
    setCustomLinks(newCustomLinks);
  };

  const handleAlbumChange = (e:any, albumIndex:number, linkIndex:number) => {
    const { value } = e.target;
    setAlbums(prev => {
      return prev.map((album, ai) => {
        if (ai === albumIndex) {
          if (linkIndex === -1) {
            // Updating album name
            return { ...album, name: value };
          } else {
            // Updating album link
            return { 
              ...album, 
              links: album.links.map((link, li) => li === linkIndex ? value : link) 
            };
          }
        }
        return album;
      });
    });
  };

  const addAlbum = () => {
    setAlbums([...albums, { name: '', links: [''] }]);
  };

  const addLinkToAlbum = (albumIndex: number) => {
    const newAlbums = [...albums];
    newAlbums[albumIndex].links.push('');
    setAlbums(newAlbums);
  };

  const deleteAlbum = (index: number) => {
    const newAlbums = [...albums];
    newAlbums.splice(index, 1);
    setAlbums(newAlbums);
  };

  const deleteLinkFromAlbum = (albumIndex: number, linkIndex: number) => {
    const newAlbums = [...albums];
    newAlbums[albumIndex].links.splice(linkIndex, 1);
    setAlbums(newAlbums);
  };

  // const handleManifoldWidgetChange = (e: ChangeEvent<HTMLInputElement>, widget: keyof ManifoldWidgets, field?: keyof ManifoldWidgets[keyof ManifoldWidgets]) => {
  //   if (field) {
  //     setManifoldWidgets({ ...manifoldWidgets, [widget]: { ...manifoldWidgets[widget], [field]: e.target.value } });
  //   } else {
  //     setManifoldWidgets({ ...manifoldWidgets, [widget]: { ...manifoldWidgets[widget], enabled: e.target.checked } });
  //   }
  // };
  function handleManifoldWidgetChange(e, widgetName, field = 'enabled') {
    const isChecked = e.target.checked;
  
    if(field === 'enabled'){
      setManifoldWidgets((prevWidgets) => {
        return {
          ...prevWidgets,
          [widgetName]: {
            ...prevWidgets[widgetName],
            enabled: isChecked,
          },
        };
      });
    } else {
      // You can also apply the functional update pattern here if necessary.
      setManifoldWidgets({
        ...manifoldWidgets,
        [widgetName]: {
          ...manifoldWidgets[widgetName],
          [field]: e.target.value
        }
      });
    }
  }

  // render a loading spinner or similar while the data is loading
  if (isLoading) {
    return <div>Loading...</div>; 
  }

  return (
    <div>
      <SaveBar
        setDialogOpen={setDialogOpen}
        html={html}
        config={config}
        saveState={saveState}
        setSaveState={setSaveState}
        showEditLink={showEditLink}
        setShowEditLink={setShowEditLink}
      />
      {/* <textarea className="bg-gray-300" value={html} onChange={onChange} spellCheck={false} /> */}

      <div className="min-h-screen py-4 px-4 sm:px-6 lg:px-8" style={{ background: '#C2DFFF'}}>
        <div className="max-w-md mx-auto">
          <div className="bg-slate-50 py-8 px-4 shadow rounded-lg sm:px-10" onChange={onChange}>
            <h1 className="text-2xl font-bold text-gray-900">Configure Your Page</h1>
            <p className="mt-2 mb-2 text-red-500">You must hit save to claim your page!</p>

            <div className="mt-5 flex flex-col">
              <label>Artist Name:</label>
              <input type="text" value={artistInfo.name} onChange={(e) => setArtistInfo({...artistInfo, name: e.target.value})} />
            </div>
            <div className="pt-2 flex flex-col">
              <label>Description:</label>
              <textarea className="pl-2" value={artistInfo.description} onChange={(e) => setArtistInfo({...artistInfo, description: e.target.value})} />
            </div>
            <div className="pt-2 flex flex-col">
              <label>Profile Image URL:</label>
              <input type="text" value={artistInfo.imageUrl} onChange={(e) => setArtistInfo({...artistInfo, imageUrl: e.target.value})} />
            </div>

            <h2 className='mt-5 text-lg font-bold text-gray-700'>Social Media Links</h2>
            {Object.keys(socials).map((social) => (
              <div key={social} className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  {social.charAt(0).toUpperCase() + social.slice(1)} URL:
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name={social}
                    value={socials[social as keyof typeof socials]}
                    onChange={handleSocialChange}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            ))}

            <h2 className='mt-5 text-lg font-bold text-gray-700'>Custom Links</h2>
              {customLinks.map((link, index) => (
                <div key={index} className="mt-4">
                  <div className="border-b border-gray-200 pb-4 mb-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-sm font-medium text-gray-700">Link #{index + 1}</h3>
                      <button onClick={() => deleteCustomLink(index)} className="text-red-500 text-sm">Delete</button>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Text:
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="text"
                          value={link.text}
                          onChange={(e) => handleCustomLinkChange(e, index)}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700">
                        URL:
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="url"
                          value={link.url}
                          onChange={(e) => handleCustomLinkChange(e, index)}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    {/* <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Primary Call to Action?:
                      </label>
                      <div className="mt-1">
                        <input
                          type="checkbox"
                          name="primary"
                          checked={link.primary}
                          onChange={(e) => handleCustomLinkChange(e, index)}
                          className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                      </div>
                    </div> */}
                    <div>
                      Icon:
                      <div>
                        {Object.keys(icons).map((iconName) => (
                          <button
                            key={iconName}
                            onClick={() => handleIconChange(iconName, index)}
                            className={link.icon === iconName ? 'bg-yellow-400' : ''}  // highlight selected icon
                          >
                            {React.createElement(icons[iconName])}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <button onClick={addCustomLink} className="mt-2 text-indigo-600 hover:underline">Add Custom Link</button>

            <h2 className='mt-5 text-lg font-bold text-gray-700'>Albums</h2>
                {albums.map((album, albumIndex) => (
                  <div key={albumIndex} className="mt-4">
                    <div className="border-b border-gray-200 pb-4 mb-4">
                      <div className="flex justify-between items-center mb-4">
                      <h3 className="text-sm font-medium text-gray-700">Album {albumIndex + 1}</h3>
                      {albums.length > 1 && <button onClick={() => deleteAlbum(albumIndex)} className="text-xs text-red-500 hover:underline">Delete Album</button>}
                    </div>
                    <label htmlFor={`album-name-${albumIndex}`} className="block text-sm font-medium text-gray-700">Name</label>
                    <input id={`album-name-${albumIndex}`} name={`album-name-${albumIndex}`} type="text" required className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder="Album Name" value={album.name} onChange={(e) => handleAlbumChange(e, albumIndex, -1)} />
                    <div className="mt-4">
                      {album.links.map((link, linkIndex) => (
                        <div key={linkIndex} className="mb-4">
                          <div className="flex justify-between items-center mb-1">
                            <label htmlFor={`album-${albumIndex}-link-${linkIndex}`} className="block text-sm font-medium text-gray-700">Link {linkIndex + 1}</label>
                            {album.links.length > 1 && <button onClick={() => deleteLinkFromAlbum(albumIndex, linkIndex)} className="text-xs text-red-500 hover:underline">Delete Link</button>}
                          </div>
                          <input id={`album-${albumIndex}-link-${linkIndex}`} name={`album-${albumIndex}-link-${linkIndex}`} type="url" required className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder="https://example.com" value={link} onChange={(e) => handleAlbumChange(e, albumIndex, linkIndex)} />
                        </div>
                      ))}
                      <button onClick={() => addLinkToAlbum(albumIndex)} className="mt-2 text-indigo-600 hover:underline">Add another link</button>
                    </div>
                  </div>
                </div>
              ))}
              <button onClick={addAlbum} className="mt-2 text-indigo-600 hover:underline">Add another album</button>

              <div>
                <h2 className='mt-5 text-lg font-bold text-gray-700'>Manifold Widgets</h2>
                
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Connect Widget:
                  </label>
                  <input
                    type="checkbox"
                    onChange={(e) => handleManifoldWidgetChange(e, 'connectWidget')}
                    checked={manifoldWidgets.connectWidget.enabled}
                  />
                  {/* {manifoldWidgets.connectWidget.enabled &&
                    <div className="flex flex-col">
                      <label>networkId:</label>
                      <input type="text" value={manifoldWidgets.connectWidget.networkId} onChange={(e) => handleManifoldWidgetChange(e, 'connectWidget', 'networkId')} />
                    </div>
                  } */}
                </div>

                {/* <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Marketplace Widget:
                  </label>
                  <input
                    type="checkbox"
                    onChange={(e) => handleManifoldWidgetChange(e, 'marketplaceWidget')}
                    checked={manifoldWidgets.marketplaceWidget.enabled}
                  />
                  {manifoldWidgets.marketplaceWidget.enabled &&
                    <div className="flex flex-col">
                      <label>networkId:</label>
                      <input type="text" value={manifoldWidgets.marketplaceWidget.networkId} onChange={(e) => handleManifoldWidgetChange(e, 'marketplaceWidget', 'networkId')} />
                      <label>listingId:</label>
                      <input type="text" value={manifoldWidgets.marketplaceWidget.listingId} onChange={(e) => handleManifoldWidgetChange(e, 'marketplaceWidget', 'listingId')} />
                    </div>
                  }
                </div> */}

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Mini Claim Widget:
                  </label>
                  <input
                    type="checkbox"
                    onChange={(e) => handleManifoldWidgetChange(e, 'miniClaimWidget')}
                    checked={manifoldWidgets.miniClaimWidget.enabled}
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Mini Marketplace Widget:
                  </label>
                  <input
                    type="checkbox"
                    onChange={(e) => handleManifoldWidgetChange(e, 'miniMarketplaceWidget')}
                    checked={manifoldWidgets.miniMarketplaceWidget.enabled}
                  />
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function OutputContainer({ config }) {
  const component = generateComponentFromConfig(config);
  
  return (
    <div className="h-full w-full border-0">
      {component}
    </div>
  );
}
