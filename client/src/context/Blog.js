import {Post1, Post2, Post3} from "./BlogPosts";

export const BlogArticles = [
    {
        id: 1,
        title: 'From Vision to Reality: Building Stands That Impress at Conferences',
        slug: 'from-vision-to-reality-building-stands-that-impress-at-conferences',
        short_desc: 'Discover the art of building stands that impress at conferences. From vision to reality, unlock the secrets to creating impactful displays.',
        ovw_text: 'Crafting an impressive conference stand demands a blend of creativity, practicality, and attention to detail. Understanding your vision, thoughtful design, material selection, and precise execution is crucial for leaving a lasting impression.',
        keywords: 'Building Stands That Impress at Conferences',
        category: [
            {
                id: 1,
                title: 'All Posts',
                slug: 'all-posts'
            },
            {
                id: 2,
                title: 'Exhibition Stand Design',
                slug: 'exhibition-stand-design'
            },
        ],
        image: '/blog/from-vision-to-reality-building-stands-that-impress-at-conferences-v2.webp',
        top_news: 1,
        created_at: '1699358727529',
        updated_at: '1699358727529',
        content: Post1
    },
    {
        id: 2,
        title: 'The Future of Conference Stand Design: Trends and Predictions',
        slug: 'the-future-of-conference-stand-design-trends-and-predictions',
        short_desc: 'Explore the future of conference stand design, uncovering trends and predictions revolutionising business engagement at events through innovative concepts.',
        ovw_text: 'Embrace interactive, sustainable, and adaptable conference stand designs. Leverage technology like AI and AR for personalised experiences. Prepare for hybrid events, seamlessly blending physical and virtual engagement for maximum impact.',
        keywords: 'Conference stand design',
        category: [
            {
                id: 1,
                title: 'All Posts',
                slug: 'all-posts'
            },
            {
                id: 3,
                title: 'Exhibition Stand Trends',
                slug: 'exhibition-stand-trends'
            },
        ],
        image: '/blog/the-future-of-conference-stand-design-v2.webp',
        top_news: 1,
        created_at: '1699445523967',
        updated_at: '1699445523967',
        content: Post2
    },
    {
        id: 3,
        title: 'Conference Exhibiting 101: A Step-by-Step Guide to Success',
        slug: 'conference-exhibiting-101-s-step-by-Step-guide-to-success',
        short_desc: 'Master the art of successful conference exhibiting with this comprehensive guide, learning essential strategies to maximise impact and achieve exhibition goals.',
        ovw_text: 'Define clear objectives, choose the right conference and booth location, design an engaging stand, create compelling content, train your team, implement effective lead capture, engage attendees, leverage technology, and evaluate performance for exhibition success.',
        keywords: 'Conference exhibiting',
        category: [
            {
                id: 1,
                title: 'All Posts',
                slug: 'all-posts'
            },
            {
                id: 4,
                title: 'Project Management',
                slug: 'project-management'
            },
        ],
        image: '/blog/step-by-step-guide-to-success-v2.webp',
        top_news: 1,
        created_at: '1699618349655',
        updated_at: '1699618349655',
        content: Post3
    }
]

// get posts by slug
export const getBlogPostBySlug = (slug) => {
    return BlogArticles.find((post) => post.slug === slug);
};


// Convert date to February 12.2023
export function convertBlogDate(inputDate) {
    const timestamp = typeof inputDate === 'string' ? parseInt(inputDate, 10) : inputDate;

    const date = new Date(inputDate);

    // Define an array of month names
    const monthNames = [
        'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
        'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
    ];

    // Extract the day, month, and year components
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    // Format the date string
    return `${month} ${day}, ${year}`;
}

export function estimateReadingTime(content) {
    // Remove extra spaces and line breaks
    content = content.replace(/\s+/g, ' ').trim();

    // Split the content into words by space
    const words = content.split(' ');

    const wordsPerMinute = 250; // Adjust this value as needed
    const wordCount = words.length;

    // Calculate the reading time in minutes
    return Math.ceil(wordCount / wordsPerMinute);
}

// get unique categories from Articles object
export function getUniqueCategories() {
    const uniqueCategories = new Set();

    BlogArticles.forEach(article => {
        article.category.forEach(category => {
            uniqueCategories.add(JSON.stringify(category));
        });
    });

    return Array.from(uniqueCategories).map(category => JSON.parse(category));
}

export function getRecentNews(count = 3, excludeId = false) {
    const sortedArticles = [...BlogArticles].sort((a, b) => new Date(b.date) - new Date(a.date));
    if (excludeId) {
        // Find the index of the article with the specified ID
        const excludedIndex = sortedArticles.findIndex((article) => article.id === excludeId);

        // If the article with the specified ID is found, remove it from the sortedArticles array
        if (excludedIndex !== -1) {
            sortedArticles.splice(excludedIndex, 1);
        }
    }
    // Get the last 3 news articles
    return sortedArticles.slice(0, count);

}

export function getTopNewsArticles(count = 3) {
    // Filter the articles to include only those with top_news: true
    const topNewsArticles = BlogArticles.filter((article) => article.top_news);

    // Return the first 'count' articles from the filtered list
    return topNewsArticles.slice(0, count);
}

export function getOtherArticles() {
    // Filter the articles to include only those with top_news: true
    return BlogArticles.filter((article) => article.top_news === false || article.top_news === 0);
}

// generate keywords for posts
export function generateKeywords(content, numKeywords = 5) {
    // Define common stopwords to filter out
    const stopWords = [
        'a', 'an', 'the', 'in', 'on', 'at', 'to', 'for', 'by', 'with',
        'and', 'or', 'of', 'is', 'are', 'was', 'were', 'it', 'that',
        'as', 'from', 'but', 'not', 'he', 'she', 'they', 'we', 'you',
    ];

    // Remove punctuation and split content into words
    const words = content
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
        .toLowerCase()
        .split(' ');

    // Count word frequency
    const wordFrequency = {};

    words.forEach(word => {
        if (!stopWords.includes(word)) {
            wordFrequency[word] = (wordFrequency[word] || 0) + 1;
        }
    });

    // Sort words by frequency in descending order
    const sortedWords = Object.keys(wordFrequency).sort((a, b) => wordFrequency[b] - wordFrequency[a]);

    // Return the top N keywords
    return sortedWords.slice(0, numKeywords);
}