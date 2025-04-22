/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i0.wp.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'chocolate-mantis-537121.hostingersite.com',
                pathname: '/wp-content/uploads/**',
            },
        ],
    },
};

export default nextConfig;
