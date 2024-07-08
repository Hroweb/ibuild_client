import {HeroBanner} from '@/components/(Site)'
import ContactForm from '@/components/(Site)/(Pages)/(Contact)/ContactForm/ContactForm'
import {getPageModuleData} from "@/utils/api/main"
import Loading from "@/app/loading";

export const metadata = {
    title: 'Contact Us',
    description: "Connect with IPOINT BUILD for exceptional exhibition experiences. Let's bring your vision to life together.",
    keywords: "Exhibition services contact, Get in touch with IPOINT BUILD, Collaborate on events, Contact for booth design, Event planning consultation, Exhibition project inquiry, IPOINT BUILD contact details, Inquiry for collaboration, Event management consultation",
    openGraph:{
        title: 'Contact Us | IPOINT Build | Dynamic Event Solutions',
        description: 'Connect with IPOINT BUILD for exceptional exhibition experiences. Let’s bring your vision to life together.',
        url: 'https://www.build.events/contact-us',
        type: 'website',
        images: [
            {
                url: 'https://www.build.events/images/social-thumb.jpg',
                width: 1200,
                height: 630,
            }
        ],
    }
};

const ContactPage = async () => {
    try {
        const {pageData} = await getPageModuleData('contact-us');
        const pageMeta = pageData?.data?.pageMeta;

        return (
                <main>
                    <Loading />
                    <HeroBanner
                        themeColor="black"
                        title={pageMeta?.['banner']?.['banner_title']?.['meta_value'] ?? ''}
                        text={pageMeta?.['banner']?.['banner_text']?.['meta_value'] ?? ''}
                        src="/banners/contact-page-banner.svg"
                        alt="contact-page-banner"
                        width="335"
                        height="335"
                        align="fx-ac"
                        additionalClass="page-intro-banner"
                        additionalClass2="cst-pad"
                        data={pageMeta?.banner}
                        page={`contact-us`}
                    />
                    <ContactForm data={pageMeta?.info} />
                </main>
        );
    } catch (error) {
        console.error('Error loading page:', error);
        return <div>Error loading page</div>;
    }
}

export default ContactPage;