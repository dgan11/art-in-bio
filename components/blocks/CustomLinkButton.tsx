import React from "react";

export default function CustomLinkButton({ link, customIcons }) {
  console.log('🌈 customIcons[link.icon]: ', customIcons[link.icon])

  const IconComponent = customIcons[link.icon];

  if (!IconComponent) {
    console.log(`❌ Icon not found: ${link.icon}`);
    return (
      <a
        href={link.url.startsWith('https') ? link.url : `https://${link.url}`}
        target='_blank'
        rel='noopener noreferrer'
        className={`mt-2 text-center flex items-center justify-center px-4 py-2 rounded w-full text-white ${link.primary ? 'bg-emerald-400 hover:bg-emerald-500' : 'bg-gray-500 hover:bg-gray-600'}`}
      >
        {link.text}
      </a>
    )
  } else {
    return (
      <a
        href={link.url.startsWith('https') ? link.url : `https://${link.url}`}
        target='_blank'
        rel='noopener noreferrer'
        className={`mt-2 text-center flex items-center justify-center px-4 py-2 rounded w-full text-white ${link.primary ? 'bg-emerald-400 hover:bg-emerald-500' : 'bg-gray-500 hover:bg-gray-600'}`}
      >
        <IconComponent className="mr-2" />
        {link.text}
      </a>
    )
  }
}
