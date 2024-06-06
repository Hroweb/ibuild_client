import {
    getPageData,
    getGallery,
    getTeamMembers,
    getCollaborate,
    getEventLogos,
    getTestimonials, getTestimonial, getClients, getServices
} from "@/utils/api/requests";
import {getAllBlogCats, getAllBlogPosts, getCasesCategories, getSingleCaseInfo} from "@/utils/api/(admin)/get";


async function getPageModuleData(page, excludePageData = false, params = {}) {
    try {
        let pageData;
        if (!excludePageData) {
            const data = await getPageData(page);
            pageData = data?.data;
        }
        let additionalData = {};

        switch (page) {
            case 'home':
                additionalData = {
                    // Add other home specific data fetches here if needed
                };
                break;
            case 'about-us':
                additionalData = {
                    // Add other about-us specific data fetches here if needed
                };
                break;
            case 'gallery':
                additionalData = {
                    gallery: await getGallery(),
                }
                break;
            case 'team':
                additionalData = {
                    team: await getTeamMembers(),
                }
                break;
            case 'services':
                additionalData = {
                    list: await getServices()
                    // Add other services specific data fetches here if needed
                };
                break;
            case 'portfolio':
                additionalData = {
                    // Add other portfolio specific data fetches here if needed
                };
                break;
            case 'blog':
                additionalData = {
                    posts: await getAllBlogPosts(10),
                    categories: await getAllBlogCats()
                    // Add other blog specific data fetches here if needed
                };
                break;
            case 'processes':
                additionalData = {
                    process: await getCollaborate()
                };
                break;
            case 'logos':
                additionalData = {
                    logos: await getEventLogos()
                };
                break;
            case 'testimonials':
                const req = params.id ? await getTestimonial(params.id) : await getTestimonials(params.num || null, params.rand || false);
                additionalData = {
                    testimonials: req
                };
                break;
            case 'clients':
                additionalData = {
                    clients: await getClients()
                };
                break;
            //not actual pages
            case 'cases_new':
                additionalData = {
                    services_full: await getServices(),
                    categories: await getCasesCategories(),
                    testimonials: await getTestimonials(15, false)
                }
                break;
            case 'cases_edit':
                additionalData = {
                    services_full: await getServices(),
                    categories: await getCasesCategories(),
                    testimonials: await getTestimonials(params.testimonial.num, params.testimonial.rand),
                    caseSingleInfo: await getSingleCaseInfo(params.case.id)
                }
                break;
            case 'contact-us':
            case 'privacy-policy':
            case 'cookie-policy':
            case 'terms-and-conditions':
                additionalData = {
                    // Add other policy specific data fetches here if needed
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