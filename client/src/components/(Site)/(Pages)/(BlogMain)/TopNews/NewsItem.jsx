"use client"
import useCursorTracker from "@/hooks/TrackCursor";
import CursorAnimation from "@/components/(Site)/(Animations)/CursorAnimation/CursorAnimation";
import Link from "next/link";
import styles from '@/components/(Site)/(Pages)/(Home)/Blog/Blog.module.scss'
import {convertBlogDate, estimateReadingTime} from "@/context/Blog";

const NewsItem = ({post}) => {

    const {
        cursorX,
        cursorY,
        isHovered,
        handleMouseEnter,
        handleMouseLeave,
    } = useCursorTracker();

    const postImage = `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/blog/${post.id}/${post.image}`;

    const backgroundStyle = {
        backgroundImage: `url(${post.image ? postImage : '/images/blog-sample.jpg'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat'
    };

    return (
        <article>
            <div className={styles['blog-slide']}>
                <div
                    className={`${styles['blog-thumb']}`}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <Link href={`/blog/${post?.slug}`}>
                        <CursorAnimation
                            cursorClass={'blog-cursor'}
                            cursorX={cursorX}
                            cursorY={cursorY}
                            isHovered={isHovered}
                            styles={styles}
                        />
                    </Link>
                    <div className={styles['blog-thumb-pic']} style={backgroundStyle}></div>
                </div>
                <div className={styles['blog-info']}>
                    <div className={`${styles['blog-top']}`}>
                        <h3>{ post.title }</h3>
                        <div className={styles['blog-dt']}>
                            <span className="blg-lgt">{ estimateReadingTime(post.content) } min read</span>
                            <span className="blg-date">{ convertBlogDate(post.created_at) }</span>
                        </div>
                    </div>
                    <p>{ post.short_desc }</p>
                    <div className={`${styles['blog-tags']} ${styles['blog-tags-tp']} fx fx-wrap`}>
                        {post.categories.map((cat) => {
                            if (cat.slug !== 'all-posts') {
                                return <a key={cat.id}>{cat.title}</a>;
                            }
                            return null; // Return null for 'all-posts'
                        })}
                    </div>
                </div>
            </div>
        </article>

    );
}

export default NewsItem;