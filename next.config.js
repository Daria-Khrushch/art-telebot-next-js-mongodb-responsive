/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "shapka-youtube.ru",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "prostomac.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "kultura.rayon.in.ua",
        port: "",
        pathname: "/**",
          },
         {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
        port: "",
        pathname: "/**",
          },
            {
        protocol: "https",
        hostname: "play-lh.googleusercontent.com",
        port: "",
        pathname: "/**",
          },
               {
        protocol: "https",
        hostname: "dev.ua",
        port: "",
        pathname: "/**",
          },
                  {
        protocol: "https",
        hostname: "*",
        port: "",
        pathname: "/**",
          },
    //                  {
    //     protocol: "https",
    //     hostname: "",
    //     port: "",
    //     pathname: "/**",
    //   },
    ],
  },
};

module.exports = nextConfig;
