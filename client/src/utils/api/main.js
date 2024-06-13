import {
    getEventLogos,
    getPageData,
    getServices,
    getAnimation,
    getBlogPosts,
    getClients,
    getTestimonials,
    getCases,
    getCollaborate, getTeamMembers, getGallery, getSingleEvent, getSinglePost,
} from "@/utils/api/requests";
import {getAllBlogCats, getCasesCategories} from "@/utils/api/(admin)/get";

async function getPageModuleData(page, excludePageData = false, params= {}) {
    try {
        let pageData;
        if (false === excludePageData) {
            pageData = await getPageData(page);
        }
        //console.log(pageData); return false;
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
                    projects: await getCases(false, {
                        featured:true,
                        num: 6
                    })
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
                    projects: await getCases(false, {
                        last:true,
                        num: 3
                    })
                    // Add other services specific data fetches here if needed
                };
                break;
            case 'portfolio':
                additionalData = {
                    anim: await getAnimation('portfolio', metaData?.['banner']?.['pf_banner_anim']?.['meta_value']),
                    testimonials: await getTestimonials(),
                    events: await getCases(false, {'orderBy': 'ASC'}),
                    event_cats: await getCasesCategories('event_cat'),
                };
                break;
            case 'blog':
                additionalData = {
                    posts: await getBlogPosts(false),
                    categories: await getAllBlogCats()
                }
                break;
            case 'single_case':
                additionalData = {
                    case_study: await getSingleEvent(params.slug),
                    related: await getCases(false, {
                        related:true,
                        num: 3,
                        exclude: params.slug || false
                    })
                };
                break;
            case 'single_blog':
                additionalData = {
                    post: await getSinglePost(params.slug),
                    recent: await getBlogPosts(false, {
                        recent_news:true,
                        num: 3,
                        exclude: params.slug || false
                    })
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