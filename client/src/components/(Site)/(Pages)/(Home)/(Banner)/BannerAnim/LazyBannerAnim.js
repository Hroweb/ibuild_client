import React, { Suspense } from 'react';

const LazyBannerAnim = React.lazy(
    () => import('./BannerAnim')
)

export default LazyBannerAnim;