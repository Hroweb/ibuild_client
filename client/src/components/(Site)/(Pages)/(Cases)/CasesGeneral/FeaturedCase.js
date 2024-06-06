import styles from './FeaturedCase.module.scss'
import Image from "next/image"
import Link from "next/link"
import Button from '@/components/(Site)/Button/Button'

const FeaturedCase = ({ title, desc, post }) => {
    return (
        <div className={`${styles['cs-ft-wrap']}`}>
            <div className={`fx fx-jb fx-wrap`}>
                <div className={`${styles['cs-lcol']}`}>
                    <h2>{title}</h2>
                </div>
                <div className={`${styles['cs-rcol']}`}>
                    <p>{desc}</p>
                </div>
            </div>
            <div className={`${styles['cs-ft-post']}`}>
                <div className={`${styles['cs-ft-post-img']}`}>
                    <Link href={`/portfolio/case-study/${post?.slug}`} className="fx">
                        <Image src={post.image} alt={post.title} width={post.imageWidth} height={post.imageHeight}/>
                    </Link>
                </div>
                <div className={`${styles['cs-ft-post-info']} fx fx-ae fx-jb`}>
                    <div className={`${styles['cs-ft-lcol']}`}>
                        <h3>{post.title}</h3>
                        <div className={`${styles['cs-ft-post-cats']} fx fx-ac`}>
                            <Link href="#">
                                {post.stand_size[0].name}
                            </Link>
                            <Link href="#">
                                {post.event_cat[1].name}
                            </Link>
                            <Link href="#">
                                {post.event_year[0].name}
                            </Link>
                        </div>
                    </div>
                    <div className={`${styles['cs-ft-rcol']}`}>
                        <Button 
                            classList="btn-primary btn-primary-red fx fx-ac fx-jc"
                            link={`/portfolio/case-study/${post?.slug}`}
                            buttonText="Discover"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FeaturedCase;