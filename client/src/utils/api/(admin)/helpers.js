export function formatDate(isoDate) {
    const date = new Date(isoDate);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

/*
export function noDataPages(title, params = {}){
    const data = {pageData: {}};
    data.pageData.title = title;
    data.pageData.params = ...;
    return data;
}*/

export function noDataPages(title, params = {}, keyName = 'pageData') {
    return {
        [keyName]: {
            title,
            ...params
        }
    };
}