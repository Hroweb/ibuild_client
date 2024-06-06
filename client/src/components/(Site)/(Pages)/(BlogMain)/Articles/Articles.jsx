"use client"
import { useState, useEffect } from "react";
import {BlogArticles, getUniqueCategories, getRecentNews, getTopNewsArticles, getOtherArticles} from "@/context/Blog";
import BlogCatRow from "@/components/(Site)/(Pages)/(BlogMain)/BlogCat/BlogCatRow";
import styles from "@/components/(Site)/(Pages)/(BlogMain)/Banner/Banner.module.scss";
import RecentNews from "@/components/(Site)/(Pages)/(BlogMain)/RecentNews/RecentNews";
import TopNews from "@/components/(Site)/(Pages)/(BlogMain)/TopNews/TopNews";
import OtherNews from "@/components/(Site)/(Pages)/(BlogMain)/OtherNews/OtherNews";

const Articles = () => {
    const [selectedCategory, setSelectedCategory] = useState({ id: '', name: '' });
    const [postsToShow, setPostsToShow] = useState(4);
    const [isLoading, setIsLoading] = useState(false);
    const categories = getUniqueCategories();

    // load blog posts loading animation if posts are still loading
    if(isLoading) return 'Loading...';

    // filter posts based on selected category
    const filteredPosts = selectedCategory.id
        ? BlogArticles.filter((post) => post.category.some(category => category.id === selectedCategory.id))
        : BlogArticles;

    // When the "Load More" button is clicked, increase the number of posts to display
    const handleLoadMore = () => {
        setPostsToShow(postsToShow + 4);
    };

    // Define the effect to set the default category to "All posts"
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if (!selectedCategory.id && categories.length > 0) {
            const allCategoriesCategory = categories.find((category) => category.slug === 'all-posts');
            if (allCategoriesCategory) {
                setSelectedCategory({
                    id: allCategoriesCategory.id,
                    name: allCategoriesCategory.title,
                });
            }
        }
    }, [selectedCategory, categories]);

    return (
        <div className={`${styles['banner-bg-white']}`}>
            <BlogCatRow
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                allPosts={BlogArticles}
                setPostsToShow={setPostsToShow}
            />
            {selectedCategory.name === 'All Posts' && (
                <>
                    <RecentNews title="Recent News" posts={getRecentNews()} />
                    <TopNews title="Top News" posts={getTopNewsArticles()} />
                </>
            )}
            <OtherNews title={(selectedCategory.name === 'All Posts') ? 'Other News' : selectedCategory.name} posts={(selectedCategory.name === 'All Posts') ? getOtherArticles() : filteredPosts} postsToShow={postsToShow} handleLoadMore={handleLoadMore} />
        </div>
    )
}

export default Articles