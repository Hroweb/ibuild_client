"use client"
import { useState, useEffect } from "react";
import BlogCatRow from "@/components/(Site)/(Pages)/(BlogMain)/BlogCat/BlogCatRow";
import styles from "@/components/(Site)/(Pages)/(BlogMain)/Banner/Banner.module.scss";
import RecentNews from "@/components/(Site)/(Pages)/(BlogMain)/RecentNews/RecentNews";
import TopNews from "@/components/(Site)/(Pages)/(BlogMain)/TopNews/TopNews";
import OtherNews from "@/components/(Site)/(Pages)/(BlogMain)/OtherNews/OtherNews";
import {getOtherArticles} from "@/hooks/helpers";

const Articles = ({posts, cats, meta}) => {
    const [selectedCategory, setSelectedCategory] = useState({ id: '', name: '' });
    const [postsToShow, setPostsToShow] = useState(4);
    const [isLoading, setIsLoading] = useState(false);
    const categories = cats?.data && cats?.data.length > 0 ? cats.data : [];
    const BlogArticles = posts?.data ?? [];

    // load blog posts loading animation if posts are still loading
    if(isLoading) return 'Loading...';

    // filter posts based on selected category
    const filteredPosts = selectedCategory.id
        ? BlogArticles.filter((post) => post.categories.some(category => category.id === selectedCategory.id))
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
                    <RecentNews title={`${meta?.['recent_news_ttile']?.['meta_value'] ?? 'Recent News'}`} posts={BlogArticles} />
                    <TopNews title={`${meta?.['top_news_ttile']?.['meta_value'] ?? 'Top News'}`} posts={BlogArticles} />
                </>
            )}
            <OtherNews title={(selectedCategory.name === 'All Posts') ? meta?.['other_news_ttile']?.['meta_value'] : selectedCategory.name} posts={(selectedCategory.name === 'All Posts') ? getOtherArticles(BlogArticles) : filteredPosts} postsToShow={postsToShow} handleLoadMore={handleLoadMore} />
        </div>
    )
}

export default Articles