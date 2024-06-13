import fetchClient from "@/utils/client";
import {getFeaturedCases, getRecentNews, getRelatedCases, getServicesFeaturedCases} from "@/hooks/helpers";

async function getPageData(page) {
    return await fetchClient(`/api/pages/${page}`, {
        method: 'GET',
    });
}

async function getAnimation(page, title) {
    return await fetchClient(`/uploads/${page}/${title}`, {
        method: 'GET',
    });
}

async function getEventLogos() {
    return await fetchClient(`/api/logos/`, {
        method: 'GET',
    });
}

async function getClients(orderBy = 'asc'){
    return await fetchClient(`/api/clients/?orderBy=${orderBy}`, {
        method: 'GET',
    });
}

async function getTestimonials(num = 3, rand = true){
    const endPoint = !rand ? `/api/testimonials`  : `/api/testimonials/?rand=${num}`;
    return await fetchClient(endPoint, {
        method: 'GET',
    });
}

async function getTestimonial(id){
    return await fetchClient(`/api/testimonial/${id}`, {
        method: 'GET',
    });
}

async function getCollaborate(){
    return await fetchClient(`/api/process/`, {
        method: 'GET',
    });
}

async function getServices(){
    return await fetchClient(`/api/services/`, {
        method: 'GET',
    });
}

async function getBlogPosts(per_page, params = {}){
    let endpoint = per_page ? `/api/blog/posts/${per_page}` : '/api/blog/posts';

    const posts = await fetchClient(endpoint, {
        method: 'GET',
    });

    if (params.recent_news) {
        return getRecentNews(params.num ?? 3, posts?.data || [], params.exclude);
    }

    return posts;
}

async function getSinglePost(slug){
    return await fetchClient(`/api/blog/post/${slug}`, {
        method: 'GET',
    });
}

async function getSingleEvent(slug){
    return await fetchClient(`/api/event/case_study/${slug}`, {
        method: 'GET',
    });
}

async function getCases(per_page, params = {}) {
    // Determine the endpoint based on whether per_page is provided
    let endpoint = per_page ? `/api/events/case_studies/${per_page}` : '/api/events/case_studies';

    // Append orderBy to the endpoint if it exists in params
    if (params.orderBy) {
        endpoint += `?orderBy=${params.orderBy}`;
    }

    // Fetch the cases data using fetchClient
    const cases = await fetchClient(endpoint, {
        method: 'GET',
    });

    // Process the fetched cases based on the params provided
    if (params.featured) {
        return getFeaturedCases(params.num ?? 6, cases?.data || []);
    }
    if (params.last) {
        return getServicesFeaturedCases(params.num ?? 3, cases?.data || []);
    }
    if (params.related) {
        return getRelatedCases(params.num ?? 3, cases?.data || [], params.exclude);
    }

    // Return the fetched cases if no additional processing is needed
    return cases;
}

async function getTeamMembers() {
    return await fetchClient(`/api/team`, {
        method: 'GET',
    });
}

async function getGallery() {
    return await fetchClient(`/api/gallery/`, {
        method: 'GET',
    });
}

export {
    getPageData,
    getAnimation,
    getEventLogos,
    getClients,
    getTestimonials,
    getTestimonial,
    getCollaborate,
    getServices,
    getBlogPosts,
    getSinglePost,
    getCases,
    getSingleEvent,
    getTeamMembers,
    getGallery
}