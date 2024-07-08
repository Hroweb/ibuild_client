import dynamic from 'next/dynamic'
import styles from '@/app/index.scss'
import {QuoteModalProvider} from "@/providers/QuoteModalContext"
import Loading from "@/app/loading";

const Header = dynamic(() => import('@/components/(Site)/Header/Header'), { suspense: true });
const Footer = dynamic(() => import('@/components/(Site)/Footer/Footer'), { suspense: true });
const CookieBar = dynamic(() => import('@/components/(Site)/CookieBar/CookieBar'), { suspense: true });

export default function SiteLayout({ children }) {
    return (
        <QuoteModalProvider>
            <Header />
            <Loading />
            {children}
            <CookieBar text="Click &quot;Accept Cookies&quot; to add a sprinkle of digital sweetness and your browsing experience – no real cookies were harmed in the making!"/>
            <Footer />
        </QuoteModalProvider>
    )
}