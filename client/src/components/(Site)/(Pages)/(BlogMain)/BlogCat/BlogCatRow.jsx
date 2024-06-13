"use client"
import { useEffect } from "react"
import BlogCat from "./BlogCat"
import styles from "@/components/(Site)/(Pages)/(BlogMain)/Banner/Banner.module.scss";

const BlogCatRow = ({categories, setSelectedCategory, selectedCategory, allPosts, setPostsToShow}) => {
    // calculate count of posts for each category
    const countPostsForCategory = (categoryId) => {
        if (Array.isArray(allPosts)) {
            // Filter articles that belong to the category with the specified categoryId
            const categoryPosts = allPosts.filter((post) => post.categories.some((cat) => cat.id === categoryId));
            return categoryPosts.length;
        }
        return 0; // Return 0 if allPosts is not an array or no articles match the category.
    };

    useEffect(() => {
        // Update the selectedCategory state and save it in localStorage when it changes
        localStorage.setItem('selectedCategory', selectedCategory);
    }, [selectedCategory]);

    return (
        <div className="cat-sort-row">
            <div className="container">
                <div className="cat-row cat-row-blog fx fx-wrap">
                    {
                        Array.isArray(categories) && categories.length > 0 ? (
                            categories.map((blogCat) => (
                                    <BlogCat
                                        key={blogCat.id}
                                        category={blogCat}
                                        selectedCategory={selectedCategory}
                                        setSelectedCategory={setSelectedCategory}
                                        countPostsForCategory={countPostsForCategory}
                                        setPostsToShow={setPostsToShow}
                                    />
                            ))
                        ) : (
                            <p>No categories were found</p>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default BlogCatRow;