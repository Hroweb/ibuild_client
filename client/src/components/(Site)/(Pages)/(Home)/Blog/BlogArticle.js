import useCursorTracker from "@/hooks/TrackCursor";
import CursorAnimation from "@/components/(Site)/(Animations)/CursorAnimation/CursorAnimation";
import Link from "next/link";
import st from './Blog.module.scss';
import {convertBlogDate, estimateReadingTime} from '@/context/Blog';

const BlogArticle = ({post}) => {

    const {
        cursorX,
        cursorY,
        isHovered,
        handleMouseEnter,
        handleMouseLeave,
    } = useCursorTracker();

    const postImg = post.image ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/blog/${post.id}/${post.image}` : '/images/blog-sample.jpg';

    const backgroundStyle = {
        backgroundImage: `url(${postImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat'
    };
    return (
        <article>
            <div className={st['blog-slide']}>
                <div
                    className={st['blog-thumb']}
                    //style={backgroundStyle}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <Link href={`/blog/${post?.slug}`}>
                        <CursorAnimation
                            cursorClass={`blog-cursor`}
                            cursorX={cursorX}
                            cursorY={cursorY}
                            isHovered={isHovered}
                            styles={st}
                            cursorText="Discover"
                        />
                    </Link>
                    <div className={st['blog-thumb-pic']} style={backgroundStyle}></div>
                </div>
                <div className={st['blog-info']}>
                    <div className={`${st['blog-tags']} fx fx-wrap`}>
                        {post.categories.map((cat) => {
                            if (cat.slug !== 'all-posts') {
                                return <a key={cat.id}>{cat.title}</a>;
                            }
                            return null; // Return null for 'all-posts'
                        })}
                    </div>
                    <h4>{post.title}</h4>
                    <div className={st['blog-btm']}>
                        <span className="blg-lgt">{estimateReadingTime(post.content)} mins read</span>
                        <span className="blg-date">{convertBlogDate(post.created_at)}</span>
                    </div>
                </div>
            </div>
        </article>

    );
}

export default BlogArticle;