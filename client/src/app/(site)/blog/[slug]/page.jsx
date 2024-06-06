import BlogSingle from "@/components/(Site)/(Pages)/(BlogMain)/BlogSingle/BlogSingle";
import {getBlogPostBySlug} from "@/context/Blog";
import {getSinglePost} from "@/utils/api/requests";
import blog from "@/components/(Site)/(Pages)/(Home)/Blog/Blog";


export async function generateMetadata({params, searchParams}, parent){
    const slug = params.slug;
    const blogPost = await getSinglePost(slug);

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
                    url: `https://www.build.events${blogPost.image}`,
                    width: 1200,
                    height: 630,
                }
            ],
        }
    }
}

const BlogSinglePage = async ({params}) => {
    const slug = params.slug;
    const blogPost = await getSinglePost(slug);
    return (
        <>
            <main>
                <BlogSingle post={blogPost} />
            </main>
        </>
    )
}

export default BlogSinglePage;