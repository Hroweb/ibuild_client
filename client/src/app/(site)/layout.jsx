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
            <CookieBar text={
                "We use cookies on our website to give you the most relevant experience by remembering your preferences and repeat visits. If you click on 'Accept All', you consent to the use of ALL the cookies. " +
                "<br />" +
                "Please click on 'Customize' to provide a controlled consent and view details of each cookie and to provide specific consent."
            }
            />
            <Footer />
        </QuoteModalProvider>
    )
}