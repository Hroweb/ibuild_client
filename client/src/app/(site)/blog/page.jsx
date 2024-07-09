import Banner from "@/components/(Site)/(Pages)/(BlogMain)/Banner/Banner";
import Articles from "@/components/(Site)/(Pages)/(BlogMain)/Articles/Articles";
import {getPageModuleData} from "@/utils/api/main";
import Loading from "@/app/loading";


export const metadata = {
    title: 'Fresh Updates',
    description: "Stay updated with our latest blog articles on Building exhibition booths, tips, and industry insights.",
    keywords: "Exhibition booth tips, Industry insights, Latest updates Exhibition blog, Building booths, Exhibition industry trends",
    openGraph:{
        title: 'Fresh Updates | IPOINT Build | Dynamic Event Solutions',
        description: 'Stay updated with our latest blog articles on Building exhibition booths, tips, and industry insights.',
        url: 'https://www.build.events/blog',
        type: 'website',
        images: [
            {
                url: 'https://www.build.events/images/social-thumb.jpg',
                width: 1200,
                height: 630,
            }
        ],
    }
};

const BlogPage = async () => {
    try {
        const {pageData, posts, categories} = await getPageModuleData('blog');
        const pageMeta = pageData?.['data']?.['pageMeta'];

        return (
                <main>
                    <Loading />
                    <Banner
                        title={`${pageMeta?.['banner']?.['banner_title']?.['meta_value'] ?? 'Fresh Updates'}`}
                        desc={`${pageMeta?.['banner']?.['banner_desc']?.['meta_value'] ?? 'Stay updated with our latest blog articles on Building exhibition booths, tips, and industry insights.'}`}
                    />
                    <Articles posts={posts} cats={categories} meta={pageMeta?.['sections']} />
                </main>
        )
    } catch (error) {
        console.error('Error loading page:', error);
        return <div>Error loading page</div>;
    }
}

export default BlogPage;