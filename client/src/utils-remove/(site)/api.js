// utils/(site)/api.js
import {getAnimation, getHomeCases, getHomeLogos, getHomePosts, getHomeServices} from "@/utils/(site)/home/api";
import {getTeam} from "@/utils/(site)/about-us/api";
import {getGallery} from "@/utils/(admin)/gallery/api";

async function getPageData(page) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/pages/${page}`, {
            headers: {
                'Accept': 'application/json',
                'Origin': process.env.SITE_URL
            },
            cache: 'no-store'
        });

        if (!response.ok) {
            return Promise.reject(Error(`HTTP error! Status: ${response.status}`));
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

async function getClients(orderBy = 'asc'){
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/clients/?orderBy=${orderBy}`, {
            headers: {
                'Accept': 'application/json',
                'Origin': process.env.SITE_URL
            },
            cache: 'no-store'
        });

        //const data = await response.json(); || for client side sorting
        // If the server does not handle sorting, sort the data on the client side
        /*if (orderBy === 'asc') {
            data.data.sort((a, b) => a.id - b.id);
        } else {
            data.data.sort((a, b) => b.id - a.id);
        }*/

        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // rethrow the error to be caught by the caller
    }
}

async function getTestimonials(num = 3){
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/testimonials/?rand=${num}`, {
            headers: {
                'Accept': 'application/json',
                'Origin': process.env.SITE_URL
            },
            cache: 'no-store'
        });

        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // rethrow the error to be caught by the caller
    }
}

async function getCollaborate(){
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/process/', {
            headers: {
                'Accept': 'application/json',
                'Origin': process.env.SITE_URL
            },
            cache: 'no-store'
        });

        return await response.json()
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // rethrow the error to be caught by the caller
    }
}

async function getPageModuleData(page) {
    try {
        const pageData = await getPageData(page);
        let additionalData = {};

        switch (page) {
            case 'home':
                additionalData = {
                    eventLogos: await getHomeLogos(),
                    anim: await getAnimation('home', pageData?.data?.pageMeta?.banner?.banner_animation?.meta_value),
                    services: await getHomeServices(),
                    posts: await getHomePosts(),
                    clients: await getClients(),
                    testimonials: await getTestimonials(),
                    projects: await getHomeCases(3)
                    // Add other home-specific data fetches here if needed
                };
                break;
            case 'about-us':
                // Fetch about page specific data
                additionalData = {
                    process: await getCollaborate(),
                    team: await getTeam(),
                    gallery: await getGallery(),
                    clients: await getClients(),
                    testimonials: await getTestimonials(),
                };
                break;
            case 'services':
                // Fetch services page specific data
                additionalData = {
                    services: await getHomeServices(),
                    collaborate: await getCollaborate(),
                    testimonials: await getTestimonials(),
                };
                break;
            case 'portfolio':
                additionalData = {
                    anim: await getAnimation('portfolio', pageData?.data?.pageMeta?.banner?.pf_banner_anim?.meta_value),
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
                throw new Error(`Unknown page type: ${page}`);
        }

        return {
            pageData,
            ...additionalData,
        };
    } catch (error) {
        console.error('Failed to fetch page data:', error);
        throw new Error('Failed to fetch page data');
    }
}

export { getPageModuleData };