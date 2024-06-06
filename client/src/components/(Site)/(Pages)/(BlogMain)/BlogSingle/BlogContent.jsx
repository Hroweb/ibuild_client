import styles from './BlogSingle.module.scss'
import {Facebook, Linkedin, Twitter } from '@/components/svgs/index'
import Link from "next/link";
import SingleRecentNews from './SingleRecentNews';
import {getRecentNews} from "@/context/Blog";

const BlogContent = ({ post }) => {
    //const siteName = process.env.SITE_URL;

    const blogPostUrl = 'https://www.build.events/blog/'+post.slug;
    const blogPostTitle = post.title;
    const blogPostDescription = post.short_desc;
    //console.log(blogPostUrl);

    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(blogPostUrl)}`;
    const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(blogPostUrl)}`;
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(blogPostUrl)}&text=${encodeURIComponent(`${blogPostTitle}: ${blogPostDescription}`)}`;
    
    return (
        <>
            <div className={`${styles['blog-ct-wrap']} bg-white`}>
                <div className="container">
                    <div className={`${styles['blog-details']} fx fx-wrap fx-jb`}>
                        <div className={`${styles['blog-ct-lcol']}`}>
                            <h2>Overview</h2>
                            <div className={`${styles['blog-share']}`}>
                                <h6>Share</h6>
                                <div className={`${styles['blog-social']} fx fx-ac`}>
                                    <Link href={linkedInShareUrl} target="_blank" rel="noopener noreferrer" className={`${styles['linkedin-share']}`}>
                                        <Linkedin/>
                                    </Link>
                                    <Link href={facebookShareUrl} target="_blank" rel="noopener noreferrer" className={`${styles['fb-share']}`}>
                                        <Facebook/>
                                    </Link>
                                    <Link href={twitterShareUrl} target="_blank" rel="noopener noreferrer" className={`${styles['tw-share']}`}>
                                        <Twitter/>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className={`${styles['blog-ct-rcol']}`}>
                            <div className={`${styles['blog-ov-txt']}`}>
                                <h3>{ post.ovw_text }</h3>
                                <div
                                    className={`${styles['blog-content']}`}
                                    dangerouslySetInnerHTML={{ __html: post.content }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BlogContent;