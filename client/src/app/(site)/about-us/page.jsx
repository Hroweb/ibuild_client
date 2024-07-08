import Gallery from '@/components/(Site)/(Pages)/(About)/Gallery/Gallery';
import Team from '@/components/(Site)/(Pages)/(About)/Team/Team';
import LetsGrow from '@/components/(Site)/(Pages)/(About)/LetsGrow/LetsGrow';
import {getPageModuleData} from "@/utils/api/main";
import Loading from "@/app/loading";
import {Clients, ContactBar, HeroBanner, IntroText, ProcessItems, Testimonials} from "@/components/(Site)";

export async function generateStaticParams() {
    return [{}]; // Return an empty object because there's no dynamic routing
}

export async function generateMetadata() {
    return {
        title: 'Get to Know Us',
        description: "Meet the brilliant minds behind IPOINT Build - your dedicated team for exceptional exhibition experiences. Get to know our event experts!",
        keywords: "exhibition experts, IPOINT Build team, meet the team, about us, about the company, team members",
        openGraph: {
            title: 'Get to Know Us | IPOINT Build | Dynamic Event Solutions',
            description: 'Meet the brilliant minds behind IPOINT Build - your dedicated team for exceptional exhibition experiences. Get to know our event experts!',
            url: 'https://www.build.events/about-us',
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
}

const AboutPage = async () => {
    try {
        const { pageData, process, gallery, team, clients, testimonials } = await getPageModuleData('about-us');
        const pageMeta = pageData?.data?.pageMeta;
//console.log(gallery)
        return (

                <main>
                    <Loading />
                    <HeroBanner
                        themeColor="grey"
                        title={pageMeta?.['banner']?.['cp_title']?.['meta_value'] ?? ''}
                        src="/banners/about-page-banner.svg"
                        alt="about graphic"
                        width="335"
                        height="335"
                        align="fx-ac"
                        isAboutPage="Yes"
                        additionalClass="page-banner"
                        data={pageMeta?.banner}
                        page={`about-us`}
                    />
                    <IntroText data={pageMeta?.intro} />
                    <ProcessItems
                        data={pageMeta?.process}
                        list={process}
                    />
                    <Gallery
                        data={pageMeta?.gallery}
                        list={gallery}
                    />
                    <Team
                        data={pageMeta?.team}
                        list={team}
                    />
                    <Clients data={pageMeta?.clients} list={clients} />
                    <LetsGrow
                        data={pageMeta?.grow}
                    />
                    <ContactBar />
                    <Testimonials list={testimonials} />
                </main>
        );
    } catch (error) {
        console.error('Error loading page:', error);
        return <div>Error loading page</div>;
    }
};

export default AboutPage;