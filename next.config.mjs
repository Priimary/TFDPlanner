/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'open.api.nexon.com',
                port: '',
                pathname: '/static/tfd/img/**',
            },
        ],
    },
};

export default nextConfig;
