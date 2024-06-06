import styles from '@/components/(Site)/(Pages)/(Home)/Blog/Blog.module.scss';
import NewsItem from '../TopNews/NewsItem';
//import OtherNewsPosts from '@/context/OtherNewsPosts';
import LoadMore from '../../LoadMore/LoadMore';

const OtherNews = ({ title, posts, postsToShow, handleLoadMore }) => {
    return (
        <section className={`pg-section ${styles['other-news']} bg-light`}>
            <div className="container">
                <h2> { title }</h2>
                <div className={`${styles['other-news-list']} fx fx-wrap`}>
                    {
                        Array.isArray(posts) && posts.length > 0 ? (
                            posts.slice(0, postsToShow).map((post, index) => (
                                <div key={post.id} className={`${styles['news-post']}`}>
                                    <NewsItem
                                        key={index}
                                        post={post}
                                    />
                                </div>
                            ))
                        ) : (
                            <p>No posts were found</p>
                        )
                    }
                </div>
                {posts.length > postsToShow && (
                    <LoadMore handleLoadMore={handleLoadMore} />
                )}
            </div>
        </section>
    );
}

export default OtherNews;