import {ContactBar, Testimonials, HeroBanner} from "@/components/(Site)";
import CasesGeneral from '@/components/(Site)/(Pages)/(Cases)/CasesGeneral/CasesGeneral'
import {getPageModuleData} from "@/utils/api/main";
import Loading from "@/app/loading";

export const metadata = {
    title: 'Our Projects',
    description: "Experience some of our best exhibition stands. Discover captivating designs carefully crafted for a memorable display.",
    keywords: "Exhibition stands, IPOINT Build stands, booth designs, craftsmanship, Memorable displays, Precision in design",
    openGraph:{
        title: 'Our Projects | IPOINT Build | Dynamic Event Solutions',
        description: 'Experience some of our best exhibition stands. Discover captivating designs carefully crafted for a memorable display.',
        url: 'https://www.build.events/portfolio',
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

const Page = async () => {
    try {
        const { pageData, anim, testimonials, events, event_cats } = await getPageModuleData('portfolio');
        const pageMeta = pageData?.data?.pageMeta;

        return(
                <main>
                    <Loading />
                    <HeroBanner
                        themeColor="white"
                        title={pageMeta?.['banner']?.['pf_banner_title']?.['meta_value'] ?? ''}
                        src="/banners/portfolio-page-banner.svg"
                        alt="portfolio graphic"
                        width="335"
                        height="335"
                        align="fx-as"
                        additionalClass="page-intro-banner"
                        additionalClass2="cst-space"
                        data={pageMeta?.banner}
                        page={`portfolio`}
                        animated={true}
                        anim={anim}
                    />
                    <CasesGeneral events={events} categories={event_cats} />
                    <ContactBar />
                    <Testimonials list={testimonials} />
                </main>
        )
    } catch (error) {
        console.error('Error loading page:', error);
        return <div>Error loading page</div>;
    }
}

export default Page