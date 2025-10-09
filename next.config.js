/** @type {import('next').NextConfig} */
const nextConfig = {
    
    // swcPlugins:[
    //     ["next-superjson-plugin", {}]
    // ],
    images: {
        domains: [
            "res.cloudinary.com",
            "avatars.githubusercontent.com",
            "lh3.googleusercontent.com"
        ]
    },
    webpack: (config) => {
        config.externals.push('encoding');
        return config;
    }
//   experimental: {
//     optimizeFonts: false,
//   }

    
}

module.exports = nextConfig
