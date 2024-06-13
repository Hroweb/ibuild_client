import React, { useState } from 'react';
import styles from './LoadMore.module.scss';
import LoadingAnim from '@/components/(Site)/(Animations)/LoadingAnim/LoadingAnim';

const LoadMore = ({handleLoadMore, year = false, isLoading = false}) => {
    const eventHandler = year ? () => handleLoadMore(year) : handleLoadMore;

    return (
        <div className={`${styles['lm-btn-row']} fx fx-jc`}>
            <a className={`${styles['lm-btn']} ${isLoading ? '' : styles['lm-btn-hidden']} fx fx-ac fx-jc`} onClick={eventHandler}>
                <span>{isLoading ? "" : "Load More"}</span>
                <LoadingAnim />
            </a>
        </div>
    );
}

export default LoadMore;