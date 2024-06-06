import {ContactBar} from "@/components/(Site)";
import CaseSingle from "@/components/(Site)/(Pages)/(Cases)/CaseSingle/CaseSingle"
import {getPostBySlug} from '@/context/Cases'

export async function generateMetadata({params, searchParams}, parent){
    const slug = params.slug;
    const casePost = getPostBySlug(slug);

    return {
        title: casePost.title,
        description: casePost.meta_desc,
        keywords: casePost.keywords,
        openGraph: {
            title: `${casePost.title} | IPOINT Build | Dynamic Event Solutions`,
            description: casePost.meta_desc,
            url: `https://www.build.events/portfolio/case-study/${casePost?.slug}`,
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
}

const CaseSinglePage = () => {
    return(
        <>
            <main>
                <CaseSingle />
                <ContactBar render='cases' />
            </main> 
        </>
    )
}

export default CaseSinglePage;