/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.gstatic.com" },
      { protocol: "https", hostname: "pictures.abebooks.com" },
      { protocol: "https", hostname: "www.planetadelibros.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "miro.medium.com" },
      { protocol: "https", hostname: "acosa.com.hn" },
      { protocol: "https", hostname: "m.media-amazon.com" },
      { protocol: "https", hostname: "www.steren.com.sv" },
      { protocol: "https", hostname: "i.dell.com" },
      { protocol: "https", hostname: "i5.walmartimages.cl" },
      { protocol: "https", hostname: "promart.vteximg.com.br" },
      { protocol: "https", hostname: "sutoasv.com" },
      { protocol: "https", hostname: "www.officedepot.com.sv" },
      { protocol: "https", hostname: "www.feeslybag.com" },
      { protocol: "https", hostname: "tech.com.sv" },
      { protocol: "https", hostname: "resources.sears.com.mx" },
      { protocol: "https", hostname: "tiendaintelmax.net" },
      { protocol: "https", hostname: "es.thermaltake.com" },
      { protocol: "https", hostname: "garminelsalvador.com" },
    ],
  },
};

export default nextConfig;