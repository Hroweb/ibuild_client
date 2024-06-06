import {
    getEventLogos,
    getPageData,
    getServices,
    getAnimation,
    getBlogPosts,
    getClients,
    getTestimonials,
    getCases,
    getCollaborate, getTeamMembers, getGallery,
} from "@/utils/api/requests";

async function getPageModuleData(page) {
    try {
        const pageData = await getPageData(page);
        const metaData = pageData?.data?.['pageMeta'];
        let additionalData = {};

        switch (page) {
            case 'home':
                additionalData = {
                    eventLogos: await getEventLogos(),
                    anim: await getAnimation('home', metaData?.['banner']?.['banner_animation']?.['meta_value']),
                    services: await getServices(),
                    posts: await getBlogPosts(),
                    clients: await getClients(),
                    testimonials: await getTestimonials(),
                    projects: await getCases()
                    // Add other home specific data fetches here if needed
                };
                break;
            case 'about-us':
                additionalData = {
                    process: await getCollaborate(),
                    team: await getTeamMembers(),
                    gallery: await getGallery(),
                    clients: await getClients(),
                    testimonials: await getTestimonials(),
                    // Add other about-us specific data fetches here if needed
                };
                break;
            case 'services':
                additionalData = {
                    services: await getServices(),
                    collaborate: await getCollaborate(),
                    testimonials: await getTestimonials(),
                    // Add other services specific data fetches here if needed
                };
                break;
            case 'portfolio':
                additionalData = {
                    anim: await getAnimation('portfolio', metaData?.['banner']?.['pf_banner_anim']?.['meta_value']),
                    testimonials: await getTestimonials(),
                };
                break;
            case 'contact-us':
            case 'privacy-policy':
            case 'cookie-policy':
            case 'terms-and-conditions':
                additionalData = {

                };
                break;
            default:
                console.warn(`Unknown page type: ${page}`);
                return { error: `Unknown page type: ${page}` };
        }

        return {
            pageData,
            ...additionalData,
        };
    } catch (error) {
        console.error('Failed to fetch page data:', error);
        throw error;
    }
}

export {getPageModuleData}