import fetchClient from "@/utils/client";

async function updatePageData(page, newData, token=false) {
    return await fetchClient(`/api/pages/${page}`, {
        method: 'POST',
        headers: {},
        body: newData
    });
}

async function updateTeamMembers(data) {
    return await fetchClient(`/api/team`, {
        method: 'POST',
        headers: {},
        body: data
    })
}

async function storeGalleryPhotos(data) {
    return await fetchClient(`/api/gallery`, {
        method: 'POST',
        headers: {},
        body: data
    })
}

async function deleteGalleryPhoto(photoId) {
    return await fetchClient(`/api/gallery/${photoId}`, {
        method: 'DELETE',
        headers: {},
    });
}

async function storeServices(data) {
    return await fetchClient(`/api/services`, {
        method: 'POST',
        headers: {},
        body: data
    })
}

async function deleteService(id) {
    return await fetchClient(`/api/services/${id}`, {
        method: 'DELETE',
        headers: {},
        //body: JSON.stringify({id: id})
    });
}

async function storeTestimonial(data) {
    return await fetchClient(`/api/testimonial`, {
        method: 'POST',
        headers: {},
        body: data
    })
}

async function deleteTestimonial(id) {
    return await fetchClient(`/api/testimonial/${id}`, {
        method: 'DELETE',
        headers: {}
    });
}

async function deleteClients(id) {
    return await fetchClient(`/api/clients/${id}`, {
        method: 'DELETE',
        headers: {},
    });
}

async function updateClients(data) {
    return await fetchClient(`/api/clients`, {
        method: 'POST',
        headers: {},
        body: data
    })
}

async function deleteEventLogo(id) {
    return await fetchClient(`/api/logos/${id}`, {
        method: 'DELETE',
        headers: {},
    });
}

async function updateEventLogos(data) {
    return await fetchClient(`/api/logos`, {
        method: 'POST',
        headers: {},
        body: data
    })
}

async function updateProcesses(data) {
    return await fetchClient(`/api/process`, {
        method: 'POST',
        headers: {},
        body: data
    })
}

async function storePost(data){
    return await fetchClient(`/api/blog/posts/edit`, {
        method: 'POST',
        headers: {},
        body: data
    });
}

async function deletePost(id){
    return await fetchClient(`/api/blog/post/${id}`, {
        method: 'DELETE',
        headers: {},
    });
}

async function saveCategoryToApi(data){
    return await fetchClient(`/api/categories`, {
        method: 'POST',
        headers: {},
        body: data
    })
}

async function delCategoryFromApi(id){
    return await fetchClient(`/api/categories/delete`, {
        method: 'POST',
        headers: {},
        body: {id: id}
    });
}

async function deleteEvent(id){
    return await fetchClient(`/api/event/case_study/${id}`, {
        method: 'DELETE',
        headers: {},
    });
}

async function storeEvent(data){
    return await fetchClient(`/api/event/case_study/edit`, {
        method: 'POST',
        headers: {},
        body: data
    });
}

async function deleteEventGallery(type, eventID, photoID){
    return await fetchClient(`/api/event/case_study/${type}/${eventID}/${photoID}`, {
        method: 'DELETE',
        headers: {}
    })
}

async function deleteTemplate(templateId){
    return await fetchClient(`/api/event/${templateId}`, {
        method: 'DELETE',
        headers: {}
    });
}

export {
    updatePageData,
    updateTeamMembers,
    storeGalleryPhotos,
    deleteGalleryPhoto,
    storeServices,
    deleteService,
    storeTestimonial,
    deleteTestimonial,
    updateClients,
    deleteClients,
    updateEventLogos,
    deleteEventLogo,
    updateProcesses,
    storePost,
    deletePost,
    saveCategoryToApi,
    delCategoryFromApi,
    deleteEvent,
    storeEvent,
    deleteEventGallery,
    deleteTemplate
}