import fetchClient from "@/utils/client";

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

async function getBlogPosts(num = 3){
    return await fetchClient(`/api/blog/posts/${num}`, {
        method: 'GET',
    });
}

async function getSinglePost(slug){
    return await fetchClient(`/api/blog/post/${slug}`, {
        method: 'GET',
    });
}

async function getCases(per_page = 6) {
    return await fetchClient(`/api/events/case_studies/${per_page}`, {
        method: 'GET',
    });
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
    getTeamMembers,
    getGallery
}