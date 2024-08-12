import Script from "next/script";
import React from "react";
import { Space_Grotesk, Inter } from "next/font/google";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ConsentProvider } from "@/context/ConsentContext";

const spaceGrotesk = Space_Grotesk({
	weight: ['300', '400', '500', '600', '700'],
	subsets: ['latin'],
	display: 'swap',
});

const inter = Inter({
	weight: ['500', '700'],
	subsets: ['latin'],
	display: 'swap',
});
const siteName = process.env.NEXT_PUBLIC_SITE_NAME
export const metadata = {
	title: {
		template: "%s " + siteName,
		default: siteName,
	},
	description: siteName+ " description",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
		<head>
			<link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png"/>
			<link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png"/>
			<link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png"/>
			<link rel="manifest" href="/favicon/site.webmanifest"/>
			<link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5"/>
			<meta name="msapplication-TileColor" content="#da532c"/>
			<meta name="theme-color" content="#ffffff"/>
			<meta name="robots" content="index, follow" />
			<Script src="https://www.googletagmanager.com/gtag/js?id=G-W25S3RRHLL" strategy="afterInteractive" />
			<Script id="google-consent" strategy="afterInteractive">
				{`
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());

					// Set the default consent mode
					gtag('consent', 'default', {
						'ad_storage': 'denied',
						'ad_user_data': 'denied',
						'ad_personalization': 'denied',
						'analytics_storage': 'denied',
						'functionality_storage': 'denied',
						'personalization_storage': 'denied',
						'wait_for_update': 500
					});

					// Custom function to update gtag based on user consent
					function updateGtagConsent() {
						const ad_storage = getCookie('gc_ads') === 'true' ? 'granted' : 'denied';
						const analytics_storage = getCookie('gc_analytics') === 'true' ? 'granted' : 'denied';
						const functionality_storage = getCookie('gc_functional') === 'true' ? 'granted' : 'denied';

						gtag('consent', 'update', {
							'ad_storage': ad_storage,
							'analytics_storage': analytics_storage,
							'functionality_storage': functionality_storage
						});

						// Trigger page_view only if analytics consent is granted
						if (analytics_storage === 'granted') {
							gtag('config', 'G-W25S3RRHLL', {
								'page_path': window.location.pathname
							});
						}
					}

					updateGtagConsent();
				`}
			</Script>
		</head>
		<body className={`${spaceGrotesk.className}`}>
			<ConsentProvider>
				{children}
			</ConsentProvider>
			<SpeedInsights />
		</body>
		</html>
	)
}
