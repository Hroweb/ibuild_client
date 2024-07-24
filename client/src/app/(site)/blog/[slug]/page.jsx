import BlogSingle from "@/components/(Site)/(Pages)/(BlogMain)/BlogSingle/BlogSingle";
import {getSinglePost} from "@/utils/api/requests";
import {getPageModuleData} from "@/utils/api/main";
import {replaceImageExtension} from "@/hooks/helpers";

export async function generateMetadata({params, searchParams}, parent){
    const slug = params.slug;
    const req = await getSinglePost(slug);
    const blogPost = req?.data || [];

    return {
        title: blogPost.title,
        description: blogPost.short_desc,
        keywords: blogPost.keywords,
        openGraph: {
            title: `${blogPost.title} | IPOINT Build | Dynamic Event Solutions`,
            description: blogPost.short_desc,
            url: `https://www.build.events/blog/${blogPost?.slug}`,
            type: 'website',
            images: [
                {
                    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/blog/${blogPost.id}/${replaceImageExtension(blogPost.image, 'jpg')}`,
                    width: 1200,
                    height: 630,
                }
            ],
        }
    }
}

const BlogSinglePage = async ({params}) => {
    const slug = params.slug;
    const {post, recent} = await getPageModuleData('single_blog', true, {slug})

    return (
        <>
            <main>
                <BlogSingle post={post} recentNews={recent} />
            </main>
        </>
    )
}

export default BlogSinglePage;