import RightBar from "@/components/(Admin)/RightBar/RightBar";
import {getPageModuleData} from '@/utils/api/(admin)/main'
import {noDataPages} from "@/utils/api/(admin)/helpers";

export default async function BlogPage () {
    const data = noDataPages('Blog');
    const {posts, categories} = await getPageModuleData('blog', true)
    /*const posts = await getAllBlogPosts();
    const categories = await getAllBlogCats();*/
    /*const data = {data: {}};
    data.data.title = 'blog';*/

    const mergedData = {
        ...data,
        posts: posts,
        categories: categories
    };

    return (
        <RightBar activePage='blog/posts' data={mergedData} button={{title: 'Add New Article', url: '/admin/blog/posts/new'}} />
    )
}