import Content from '@/components/(Site)/(Pages)/(Privacy)/Content/Content'
import Banner from '@/components/(Site)/(Pages)/(Privacy)/Banner/Banner'
import Loading from "@/app/loading";
import {Suspense} from "react";
import {getPageModuleData} from "@/utils/api/main";

export const metadata = {
    title: 'Terms and Conditions',
    description: "Explore IPOINT Build's Terms and Conditions, covering our services, subscription offerings, privacy commitments, and more.",
    keywords: "Terms and Conditions",
    openGraph:{
        title: 'Terms and Conditions | IPOINT Build | Dynamic Event Solutions',
        description: "Explore IPOINT Build's Terms and Conditions, covering our services, subscription offerings, privacy commitments, and more.",
        url: 'https://www.build.events/terms-and-conditions',
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

const TermsPage = async () => {
    try {
        const { pageData } = await getPageModuleData('terms-and-conditions');
        const pageMeta = pageData?.data?.pageMeta;

        return (
            <Suspense fallback={<Loading />}>
                <main>
                    <Banner
                        themeColor="black"
                        title={pageMeta?.['info']?.['title']?.['meta_value']}
                    />
                    <Content
                        date="12 December 2023"
                        text={pageMeta?.['info']?.['content']?.['meta_value']}
                    />
                </main>
            </Suspense>
        );
    } catch (error) {
        console.error('Error loading page:', error);
        return <div>Error loading page</div>;
    }
}

export default TermsPage;