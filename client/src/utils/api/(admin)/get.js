import fetchClient from "@/utils/client";

async function getAllBlogCats() {
    return await fetchClient(`/api/blog/categories/`, {
        method: 'GET',
    });
}

async function getAllBlogPosts(per_page) {
    return await fetchClient(`/api/blog/posts/${per_page}`, {
        method: 'GET',
    });
}

async function getSingleBlogPost(id){
    return await fetchClient(`/api/blog/post/${id}`, {
        method: 'GET',
    });
}

async function getSingleCaseInfo(id){
    return await fetchClient(`/api/event/case_study/${id}`, {
        method: 'GET',
    });
}

async function getCasesCategories(name = null){
    const url = name ? `/api/events/categories/${name}` : `/api/events/categories`;
    const res = await fetchClient(url, {
        method: 'GET',
    });

    //console.log(res); return false

    return res;
}

export {getAllBlogCats, getAllBlogPosts, getSingleBlogPost, getCasesCategories, getSingleCaseInfo}