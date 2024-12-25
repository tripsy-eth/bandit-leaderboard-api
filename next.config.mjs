/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/leaderboard/:path*',
                destination: 'https://app.bandit.network/apps/leaderboard/:path*'
            }
        ]
    }
}

export default nextConfig;