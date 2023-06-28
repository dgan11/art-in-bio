import React, { useEffect, useRef, useState, ChangeEvent, FormEvent } from "react";

import EditLinkModal from "./edit-link-modal";
import SaveBar from "./save-bar";

import { FaInstagram, FaTwitter, FaYoutube, FaSpotify, FaTiktok, FaUser , FaAmilia, FaAmazon, FaAngellist, FaAppStoreIos, FaBitcoin, FaDiscord, FaEnvira, FaEtsy, FaFacebook, FaGithub, FaGoodreadsG, FaHackerNews, FaMailchimp, FaReddit, FaBone, FaBomb, FaBook, FaBookmark, FaBowlingBall, FaCar, FaFutbol, FaGuitar  } from "react-icons/fa";
import { IconType } from 'react-icons';

export default function EditorContainer({ html, email, editLink }) {
  const [_html, setHtml] = useState(html || "");
  const [_email, setEmail] = useState(email);
  const [_config, setConfig] = useState({} as any);
  const [dialogOpen, setDialogOpen] = useState(false);
  console.log('🍰 editor.tsx component')

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
          setHtml={setHtml}
          setDialogOpen={setDialogOpen}
        />
      </div>
      <div className="output-container">
        <OutputContainer content={_html} />
      </div>

      <style jsx>{`
        .root-editor-container {
          display: flex;
          height: calc(100% - 500px);
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
          font-size: 0;
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
          .output-container {
            flex: 1 0 50%;
            height: 50%;
            order: 0;
          }
        }
      `}</style>
    </div>
  );
}

function Editor({ html, email, setHtml, setDialogOpen }) {
  const [saveState, setSaveState] = useState('');
  const [showEditLink, setShowEditLink] = useState(false);

  function onChange(e) {
    setHtml(e.target.value);
    if (saveState === "SUCCESS") {
      setSaveState("DEFAULT");
    }
  }
  return (
    <div>
      <SaveBar
        setDialogOpen={setDialogOpen}
        html={html}
        saveState={saveState}
        setSaveState={setSaveState}
        showEditLink={showEditLink}
        setShowEditLink={setShowEditLink}
      />
      <textarea className="bg-gray-300" value={html} onChange={onChange} spellCheck={false} />
      <h1>YOOO</h1>
      {/* <style jsx>{`
        div {
          width: 100%;
          height: 100%;
        }
        textarea {
          -webkit-appearance: none;
          width: 100%;
          height: calc(100% - 800px);
          background: #222222;
          color: #fff;
          font-family: Menlo, monospace;
          font-size: 16px;
          padding: 24px;
          border: none;
          border-radius: 0;
          resize: none;
          -webkit-touch-callout: none;
          -khtml-user-select: none;
          -webkit-tap-highlight-color: transparent;
          -webkit-overflow-scrolling: touch;
        }
        @media (max-width: 500px) {
          textarea {
            font-size: 12px;
          }
          div {
            z-index: 1000;
          }
        }
      `}</style> */}
      <Configure />
    </div>
  );
}


function OutputContainer({ content }) {
  const iframeRef = useRef<HTMLIFrameElement>();

  useEffect(() => {
    updateIframe();
  }, [content]);

  function updateIframe() {
    const document = iframeRef.current.contentDocument;
    const head = document.getElementsByTagName("head")[0];
    document.body.innerHTML = content || "";
  }

  return (
    <iframe ref={iframeRef} title="html-output">
      <style jsx>{`
        iframe {
          height: 100%;
          width: 100%;
          border: none;
        }
      `}</style>
    </iframe>
  );
}

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

const icons: {[key: string]: IconType} = {
  FaUser , FaAmilia, FaAmazon, FaAngellist, FaAppStoreIos, FaBitcoin, FaDiscord, FaEnvira, FaEtsy, FaFacebook, FaGithub, FaGoodreadsG, FaHackerNews, FaMailchimp, FaReddit, FaBone, FaBomb, FaBook, FaBookmark, FaBowlingBall, FaCar, FaFutbol, FaGuitar,
}

function Configure() {

  // useRef - value does not change everytime the component re-renders
  const initialSocials = useRef<Socials>({
    instagram: '',
    twitter: '',
    youtube: '',
    spotify: '',
    tiktok: ''
  });

  const initialArtistInfo = useRef<ArtistInfo>({
    name: "",
    description: "",
    imageUrl: "",
  });

  const initialCustomLinks = useRef<CustomLink[]>([]);
  const initialAlbums = useRef<Album[]>([]);


  const [socials, setSocials] = useState<Socials>(() => initialSocials.current);
  const [customLinks, setCustomLinks] = useState<CustomLink[]>(() => initialCustomLinks.current);
  const [artistInfo, setArtistInfo] = useState<ArtistInfo>(() => initialArtistInfo.current);
  const [albums, setAlbums] = useState<Album[]>(() => initialAlbums.current);
  const [isLoading, setIsLoading] = useState(true);

   // After component mounts (in the browser environment), load saved data from local storage
   useEffect(() => {

    /**
     * When the client side React code takes over, this is called hydration. 
     * This is crucial because the localStorage API is only available in the browser
     */
    const hydrate = async () => {
      if (typeof window !== 'undefined') {
        // console.log('🤝1 get localStorage: ', localStorage.getItem('configuration'))
        // const savedConfiguration = JSON.parse(localStorage.getItem('configuration') || '{}');

        // if (savedConfiguration.artistInfo && JSON.stringify(savedConfiguration.artistInfo) !== JSON.stringify(artistInfo)) {
        //   setArtistInfo(savedConfiguration.artistInfo);
        // }
  
        // // only set the state if the saved data is different from the initial state
        // if (savedConfiguration.socials && JSON.stringify(savedConfiguration.socials) !== JSON.stringify(socials)) {
        //   console.log('🤝2 actually set socials')
        //   setSocials(savedConfiguration.socials);
        // }
    
        // if (savedConfiguration.customLinks && JSON.stringify(savedConfiguration.customLinks) !== JSON.stringify(customLinks)) {
        //   setCustomLinks(savedConfiguration.customLinks);
        // }

        // if (savedConfiguration.albums && JSON.stringify(savedConfiguration.albums) !== JSON.stringify(albums)) {
        //   setAlbums(savedConfiguration.albums);
        // }
  
        setIsLoading(false);
      }
    }
  
    hydrate();
  }, []);

  // When the socials or customLinks states change, save the new data to local storage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // const configuration = { artistInfo, socials, customLinks, albums };
      // console.log('👾 configuration to set: ', configuration)
      // localStorage.setItem('configuration', JSON.stringify(configuration));
    }
  }, [artistInfo, socials, customLinks, albums]);

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
    setCustomLinks([...customLinks, { text: '', url: '', primary: false, icon: '' }]);
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

  // const saveConfiguration = (e: FormEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   const configuration = { socials, customLinks, artistInfo, albums };
  //   console.log('📦 save configuration: ', configuration);
  // };

  // render a loading spinner or similar while the data is loading
  if (isLoading) {
    return <div>Loading...</div>; 
  }

  return (
    // <div className="bg-gradient-to-r from-orange-300 via-yellow-200 to-blue-300 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
    <div className="bg-green-300 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-slate-50 py-8 px-4 shadow rounded-lg sm:px-10">
          <h1 className="text-2xl font-bold text-gray-900">Configure your profile</h1>

          <div className="mt-5">
            <label>Artist Name:</label>
            <input type="text" value={artistInfo.name} onChange={(e) => setArtistInfo({...artistInfo, name: e.target.value})} />
          </div>
          <div className="mt-2">
            <label>Description:</label>
            <textarea className="pl-2" value={artistInfo.description} onChange={(e) => setArtistInfo({...artistInfo, description: e.target.value})} />
          </div>
          <div>
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
                  <div className="mt-4">
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
                  </div>
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

          <div className="mt-4">
            <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500" onClick={saveConfiguration}>Save Configuration</button>
          </div>
        </div>
      </div>
    </div>
  );
}
