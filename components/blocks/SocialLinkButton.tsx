import React from "react"

export default function SocialLinkButton({ social, socialUrl, socialIcons }) {
  return (
    <a
      href={socialUrl.startsWith('https') ? socialUrl : `https://${socialUrl}`}
      target='_blank'
      rel='noopener noreferrer'
      className="mt-2 text-center flex items-center justify-center px-4 py-2 rounded w-full text-white bg-blue-500 hover:bg-blue-600"
    >
      {React.createElement(socialIcons[social], { className: "mr-2" })}
      {social.charAt(0).toUpperCase() + social.slice(1)}
    </a>
  )
}
