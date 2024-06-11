import {ContactBar} from "@/components/(Site)";
import CaseSingle from "@/components/(Site)/(Pages)/(Cases)/CaseSingle/CaseSingle"
import {getCases, getSingleEvent} from "@/utils/api/requests";
import {getPageModuleData} from "@/utils/api/main";

export async function generateMetadata({params, searchParams}, parent){
    const slug = params.slug;
    const req = await getSingleEvent(slug);
    const casePost = req?.data || [];
    //const casePost = getPostBySlug(slug);

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

const CaseSinglePage = async ({params}) => {
    /*const slug = params.slug;
    const req = await getSingleEvent(slug);
    const relatedCases = await getCases(false, {
        related:true,
        num: 3
    })*/
    const slug = params.slug;
    const {case_study, related} = await getPageModuleData('single_case', true, {slug})
    //console.log(related); return false;
    return(
        <>
            <main>
                <CaseSingle caseStudy={case_study?.data || []} related={related?.data || []} />
                <ContactBar render='cases' />
            </main> 
        </>
    )
}

export default CaseSinglePage;