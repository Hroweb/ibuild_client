import styles from './RecentNews.module.scss'
import Image from "next/image";
import {convertBlogDate, estimateReadingTime} from "@/context/Blog";
import Link from "next/link";

const RecentNewsSlide = ({ post }) => {
    const postImage = post.image ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/blog/${post.id}/${post.image}` : '/images/blog-sample.jpg'
    return (
        <div className={`${styles['rcn-slide']}`}>
            <Link href={`/blog/${post?.slug}`}> 
                <div className={`${styles['rcn-pic']}`}>
                    <Image src={postImage} alt={post.title} width={998} height={524} />
                </div>
                <div className={`${styles['rcn-info-pp']}`}>
                    <div className={`${styles['rcn-info-wrap']} fx fx-ae fx-jb`}>
                        <div className={`${styles['rcn-pp-lcol']}`}>
                            <h3>{ post.title }</h3>
                            <p>{ post.short_desc }</p>
                        </div>
                        <div className="fx fx-ac">
                            <div className={`${styles['rcn-pp-txt']} ${styles['rcn-pp-min']}`}>
                                <span>{ estimateReadingTime(post.content) } mins read</span>
                            </div>
                            <div className={`${styles['rcn-pp-txt']}`}>
                                <span>{ convertBlogDate(post.created_at) }</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default RecentNewsSlide;