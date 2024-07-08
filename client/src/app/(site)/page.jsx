import {HpBanner, IntroVideo, Projects, EventLogos, Services, Blog, Clients, ContactBar, Testimonials} from '@/components/(Site)'
import { Suspense } from 'react';
import {getPageModuleData} from "@/utils/api/main";
import Loading from "@/app/loading";


export const metadata = {
    title: 'Home',
    description: "Elevate your exhibition experience with IPOINT Build. From booth conceptualisation to post-event marketing, we’re your one-stop shop for success.",
    keywords: "Exhibition stands, Booth conceptualisation, Branding and graphic design, Project management, Booth construction, Concierge services, Post-event marketing",
    openGraph:{
        title: 'Home | IPOINT Build | Dynamic Event Solutions',
        description: 'Elevate your exhibition experience with IPOINT Build. From booth conceptualisation to post-event marketing, we’re your one-stop shop for success.',
        url: 'https://www.build.events/',
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

export default async function Home() {
    try {
        const { pageData, projects, eventLogos, anim, services, posts, clients, testimonials } = await getPageModuleData('home');
        const pageMeta = pageData?.data?.pageMeta;
//console.log(projects);return false;
        return (

                <main>
                    <Loading />
                    <HpBanner
                        data={pageMeta?.banner}
                        anim={anim}
                    />
                    <IntroVideo data={pageMeta.video} />
                    <Projects data={pageMeta?.projects} projects={projects} />
                    <EventLogos data={eventLogos} />
                    <Services
                        title="Services"
                        themeColor="dark"
                        text="Let us take care of your exhibition from start to finish, and beyond, so you can focus on more pressing matters."
                        data={pageMeta?.services}
                        servicesList={services?.data || null}
                    />
                    <Blog data={pageMeta?.blog} posts={posts?.data || null} />
                    <Clients data={pageMeta?.clients} list={clients} />
                    <ContactBar />
                    <Testimonials list={testimonials} />
                </main>

        );
    } catch (error) {
        console.error('Error loading homepage:', error);
        return <div>Error loading homepage</div>;
    }
}