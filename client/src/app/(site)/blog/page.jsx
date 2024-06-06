import Banner from "@/components/(Site)/(Pages)/(BlogMain)/Banner/Banner";
import Articles from "@/components/(Site)/(Pages)/(BlogMain)/Articles/Articles";

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

const BlogPage = () => {
    return (
        <>
            <main>
                <Banner 
                    title="Fresh Updates"
                    desc="Stay updated with our latest blog articles on Building exhibition booths, tips, and industry insights."
                />
                <Articles />
            </main>
        </>
    )
}

export default BlogPage;