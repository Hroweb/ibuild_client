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
				gtag('config', 'G-W25S3RRHLL');

				const adStorageConsent = getCookie('gc_ads') === 'true' ? 'granted' : 'denied';
				const analyticsConsent = getCookie('gc_analytics') === 'true' ? 'granted' : 'denied';
				const functionalityConsent = getCookie('gc_functional') === 'true' ? 'granted' : 'denied';

				if (!adStorageConsent && !analyticsConsent && !functionalityConsent) {
					gtag('consent', 'default', {
						'ad_storage': 'denied',
						'ad_user_data': 'denied',
						'ad_personalization': 'denied',
						'analytics_storage': 'denied',
						'functionality_storage': 'denied',
						'personalization_storage': 'denied',
						'security_storage': 'granted',
						'wait_for_update': 500
					});
				}

				gtag('set', 'ads_data_redaction', false);
            	gtag('set', 'url_passthrough', true);
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