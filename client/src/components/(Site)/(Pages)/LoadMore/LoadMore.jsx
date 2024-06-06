import styles from './LoadMore.module.scss'
import Image from "next/image"

const LoadMore = ({handleLoadMore, year = false, isLoading = false}) => {
    const eventHandler = year ? () => handleLoadMore(year) : handleLoadMore;
    return (
        <div className={`${styles['lm-btn-row']} fx fx-jc`}>
            <a className={`${styles['lm-btn']} ${isLoading ? '' : styles['lm-btn-hidden']} fx fx-ac fx-jc`} onClick={eventHandler}>
                <span>
                    Load More
                    <Image className={`${styles['loader']} hidden`} src="/spinner.gif" alt="loader" width="50" height="50" />
                </span>
            </a>
        </div>
    );
}

export default LoadMore;