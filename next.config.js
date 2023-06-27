// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// }

// module.exports = nextConfig
// // 

module.exports = {
  async rewrites() {
    return [
      {
        source: '/:subdomain',
        destination: '/linkPage',
      },
    ];
  },
};
