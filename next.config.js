/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "bregnballe-portfolio.s3.eu-central-1.amazonaws.com",
				port: "",
				pathname: "**",
			},
		],
	},
};
