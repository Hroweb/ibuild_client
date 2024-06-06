import RightBar from '@/components/(Admin)/RightBar/RightBar';
import {getPageModuleData} from '@/utils/api/(admin)/main'

export default async function BlogPageInfo() {
    const pageData = await getPageModuleData('blog');
    return (
        <RightBar activePage='blog' data={pageData} button={{title: 'Add New Article', url: '/admin/blog/posts/new'}} />
    )
}