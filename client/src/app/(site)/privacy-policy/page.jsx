import Content from '@/components/(Site)/(Pages)/(Privacy)/Content/Content'
import Banner from '@/components/(Site)/(Pages)/(Privacy)/Banner/Banner'
import Loading from "@/app/loading";
import {getPageModuleData} from "@/utils/api/main";

export const metadata = {
    title: 'Privacy Policy',
    description: "Discover our comprehensive privacy policy, safeguarding your data and ensuring a secure browsing experience.",
    keywords: "Privacy Policy",
    openGraph:{
        title: 'Privacy Policy | IPOINT Build | Dynamic Event Solutions',
        description: 'Discover our comprehensive privacy policy, safeguarding your data and ensuring a secure browsing experience.',
        url: 'https://www.build.events/privacy-policy',
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

const PrivacyPage = async () => {
    try {
        const { pageData } = await getPageModuleData('privacy-policy');
        const pageMeta = pageData?.data?.pageMeta;

        return (
                <main>
                    <Loading />
                    <Banner
                        themeColor="black"
                        title={pageMeta?.['info']?.['title']?.['meta_value']}
                    />
                    <Content
                        date="12 December 2023"
                        text={pageMeta?.['info']?.['content']?.['meta_value']}
                    />
                </main>
        );
    } catch (error) {
        console.error('Error loading page:', error);
        return <div>Error loading page</div>;
    }
}

export default PrivacyPage;