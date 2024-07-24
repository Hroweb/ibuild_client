export function getFeaturedCases(count, cases, excludeId = false) {
    const resp = {success: true}
    const sortedArticles = [...cases].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    const featuredArticles = sortedArticles.filter((article) => article.featured === '1');
    //console.log(sortedArticles); return false;
    if (excludeId) {
        // Find the index of the article with the specified ID
        const excludedIndex = featuredArticles.findIndex((article) => article.id === excludeId);

        // If the article with the specified ID is found, remove it from the sortedArticles array
        if (excludedIndex !== -1) {
            featuredArticles.splice(excludedIndex, 1);
        }
    }
    resp.data = featuredArticles.slice(0, count);

    return resp;

}

export function getServicesFeaturedCases(count, cases) {
    const resp = {success: true}
    const sortedArticles = [...cases].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    const featuredArticles = sortedArticles.filter((article) => article.featured === '1');

    const shuffledCases = [...featuredArticles].sort(() => 0.5 - Math.random()); // Shuffle the array randomly
    // Get the last 3 news articles
    resp.data = shuffledCases.slice(0, count);
//console.log(resp)
    return resp;
}

export function getRelatedCases(count, cases, excludeId = false) {
    const resp = {success: true}
    const sortedArticles = [...cases].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    if (excludeId) {
        // Find the index of the article with the specified ID
        const excludedIndex = sortedArticles.findIndex((article) => article.slug === excludeId);

        // If the article with the specified ID is found, remove it from the sortedArticles array
        if (excludedIndex !== -1) {
            sortedArticles.splice(excludedIndex, 1);
        }
    }
    const shuffledPosts = [...sortedArticles].sort(() => 0.5 - Math.random()); // Shuffle the array randomly
    // Get the last 3 news articles
    resp.data = shuffledPosts.slice(0, count);

    return resp;
}

export function casesGroupedByYear(cases) {
    const groupedData = {
        'Pre-2020': {
            title: 'Pre-2020',
            desc: 'Discover meticulously crafted stands predating 2020, each representing our attention to detail and commitment to quality.',
            events: [],
        },
    };

    cases.forEach(post => {
        const year = post.event_year[0].title;

        if (!groupedData[year]) {
            if (year >= 2020) {
                groupedData[year] = {
                    title: year,
                    desc: post.event_year[0].desc,
                    events: [],
                };
            }
        }

        (year < 2020) ? groupedData['Pre-2020'].events.push(post) : groupedData[year].events.push(post);
    });

    // Sort the years in descending order (most recent year first)
    const sortedYears = Object.keys(groupedData)
        .map(year => {
            const parsedYear = parseInt(year);
            return isNaN(parsedYear) ? Number.NEGATIVE_INFINITY : parsedYear;
        })
        .sort((a, b) => b - a)
        .map(year => year === Number.NEGATIVE_INFINITY ? 'Pre-2020' : year);

    // Create the final ordered data as an array with descriptions
    return  sortedYears.map(year => groupedData[year.toString()]);
}

export function getPrimaryCase(cases) {
    const sortedArticles = [...cases].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    const primaryArticle = sortedArticles.filter((article) => article.chosen === '1');

    return primaryArticle.slice(0, 1);
}

export function getRecentNews(count = 3, posts, excludeId = false) {
    const sortedArticles = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));

    if (excludeId) {
        // Find the index of the article with the specified ID
        const excludedIndex = sortedArticles.findIndex((article) => article.slug === excludeId);

        // If the article with the specified ID is found, remove it from the sortedArticles array
        if (excludedIndex !== -1) {
            sortedArticles.splice(excludedIndex, 1);
        }
    }

    // Get the last 3 news articles
    return sortedArticles.slice(0, count);
}

export function getTopNewsArticles(count = 3, posts) {
    // Filter the articles to include only those with top_news: true
    const topNewsArticles = posts.filter((article) => article.top_news);

    // Return the first 'count' articles from the filtered list
    return topNewsArticles.slice(0, count);
}

export function getOtherArticles(posts) {
    // Filter the articles to include only those with top_news: true
    return posts.filter((article) => article.top_news === false || article.top_news === 0);
}

export function splitTextIntoParagraphs(text, br = false) {
    if (br) {
        return text.split('\n').flatMap((line, index) => (
            index > 0 ? [<br key={`br-${index}`} />, line] : [line]
        ));
    } else {
        return text.split('\n').map((paragraph, index) => (
            <p key={index}>
                {paragraph}
            </p>
        ));
    }
}

export function replaceImageExtension(url, newExtension){
    if (!url) return '';
    return url.replace(/\.\w+$/, `.${newExtension}`);
}