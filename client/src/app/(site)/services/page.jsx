import {HeroBanner, ProcessItems, ContactBar, Testimonials, Services} from '@/components/(Site)'
import LatestCases from "@/components/(Site)/(Pages)/(Cases)/LatestCases/LatestCases"
import {getPageModuleData} from "@/utils/api/main";
import Loading from "@/app/loading";

export const metadata = {
    title: 'Services',
    description: "Elevate your exhibition with tailored services including booth conceptualisation, branding, project management, construction, and post-event marketing.",
    keywords: "Exhibition solutions, Booth design, Branding strategy, Event management services, Booth construction planning Concierge support, IPOINT Build, IPOINT INT",
    openGraph:{
        title: 'Services | IPOINT Build | Dynamic Event Solutions',
        description: 'Elevate your exhibition with tailored services including booth conceptualisation, branding, project management, construction, and post-event marketing.',
        url: 'https://www.build.events/services',
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

const ServicesPage = async () => {
    try {
        const { pageData, services, collaborate, testimonials, projects } = await getPageModuleData('services');
        const pageMeta = pageData?.data?.pageMeta;

        return (
            <main>
                <Loading />
                <HeroBanner
                    themeColor="black"
                    title={pageMeta?.['banner']?.['banner_title']?.['meta_value'] ?? ''}
                    src="/banners/services-page-banner.svg"
                    alt="services graphic"
                    width="335"
                    height="335"
                    align="fx-ac"
                    additionalClass="page-intro-banner"
                    additionalClass2="service-page-banner"
                    data={pageMeta?.banner}
                    page={`services`}
                />
                <Services
                    themeColor="light"
                    isGeneral="Yes"
                    title="Services"
                    servicesList={services?.data || null}
                />
                <ProcessItems
                    data={pageMeta?.collaborate}
                    list={collaborate}
                />
                <LatestCases
                    data={pageMeta?.cases}
                    cases={projects}
                />
                <ContactBar />
                <Testimonials list={testimonials} />
            </main>
        );
    } catch (error) {
        console.error('Error loading page:', error);
        return <div>Error loading page</div>;
    }
}

export default ServicesPage;