'use client'
import styles from './BlogSingle.module.scss'
import BlogBanner from './BlogBanner';
import { useParams } from 'next/navigation';
import {convertBlogDate, estimateReadingTime, getBlogPostBySlug, getRecentNews} from '@/context/Blog';
import BlogContent from './BlogContent';
import SingleRecentNews from "@/components/(Site)/(Pages)/(BlogMain)/BlogSingle/SingleRecentNews";

const  BlogSingle = ({post, recentNews}) => {
    const blogPost = post?.data || null;
    if (!blogPost) {
        return <div>Post not found</div>;
    }
    return (
        <>
            <BlogBanner
                src={blogPost.image}
                title={blogPost.title}
                minutes={`${estimateReadingTime(blogPost.content)}`}
                date={convertBlogDate(blogPost.created_at)}
            />
            <BlogContent
                post = {blogPost}
            />
            <SingleRecentNews title="Recent News" posts={recentNews} />
        </>
    );
}

export default BlogSingle;
