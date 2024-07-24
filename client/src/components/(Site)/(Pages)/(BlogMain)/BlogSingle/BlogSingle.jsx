'use client'
import styles from './BlogSingle.module.scss'
import BlogBanner from './BlogBanner';
import {convertBlogDate, estimateReadingTime} from '@/context/Blog';
import BlogContent from './BlogContent';
import SingleRecentNews from "@/components/(Site)/(Pages)/(BlogMain)/BlogSingle/SingleRecentNews";
import { notFound } from 'next/navigation';

const  BlogSingle = ({post, recentNews}) => {
    const blogPost = post?.data || null;
    if (!blogPost) {
        notFound();
        return null;
    }
    const blogImg = blogPost?.image ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/blog/${blogPost.id}/${blogPost.image}` : '';

    return (
        <>
            <BlogBanner
                src={blogImg}
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
