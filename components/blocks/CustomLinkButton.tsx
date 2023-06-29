import React from "react";

export default function CustomLinkButton({ link, customIcons }) {
  return (
    <a
      href={link.url.startsWith('https') ? link.url : `https://${link.url}`}
      target='_blank'
      rel='noopener noreferrer'
      className={`mt-2 text-center flex items-center justify-center px-4 py-2 rounded w-full text-white ${link.primary ? 'bg-emerald-400 hover:bg-emerald-500' : 'bg-gray-500 hover:bg-gray-600'}`}
    >
      {React.createElement(customIcons[link.icon], { className: "mr-2" })}
      {link.text}
    </a>
  )
}
