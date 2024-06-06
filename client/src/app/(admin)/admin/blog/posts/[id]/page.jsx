import {getAllBlogCats, getSingleBlogPost} from '@/utils/api/(admin)/get';
import RightBar from '@/components/(Admin)/RightBar/RightBar';

export default async function BlogSinglePageInfo({params}) {
    const blogSingleInfo = await getSingleBlogPost(params.id);
    const categories = await getAllBlogCats();

    const mergedData = {
        ...blogSingleInfo,
        categories: categories
    };

    return ( <RightBar activePage='blog/single' data={mergedData} button={{title: 'go back', url: './', class: 'btn-back'}} /> )
}