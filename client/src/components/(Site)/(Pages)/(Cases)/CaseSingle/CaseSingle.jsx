"use client"
import styles from "./CaseSingle.module.scss"
import CaseIntro from './CaseIntro'
import FeaturedImage from "./FeauturedImage"
import CaseOverview from "./CaseOverview"
import CaseContent from "./CaseContent"
import CaseGallery from "./CaseGallery"
import RelatedStudies from "@/components/(Site)/(Pages)/(Cases)/RelatedStudies/RelatedStudies";
import {Testimonials} from "@/components/(Site)";

const CaseSingle = ({caseStudy, related}) => {
    if (!caseStudy) {
        return <div>Case Study not found</div>;
    }
    const banner = `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/portfolio${caseStudy.image}`;
    caseStudy.imageWidth = 1600;
    caseStudy.imageHeight = 576;

    const testimonialProps = caseStudy.testimonials && caseStudy.testimonials.length !== 0 ? { post: caseStudy.testimonials } : {};

    return (
        <>
            <CaseIntro 
                title={caseStudy.title}
                desc={caseStudy.desc}
                bgColor={caseStudy.bannerColor}
                standSize={caseStudy.stand_size[0].title}
                eventCat={caseStudy.event_cat[1].title}
                eventYear={caseStudy.event_year[0].title}
            />
            <FeaturedImage
                src={banner}
                alt={caseStudy.title}
                width={caseStudy.imageWidth}
                height={caseStudy.imageHeight}
            />
            <CaseOverview
                ovw_text={caseStudy.overview}
                sv_list={caseStudy.services}
            />
            <CaseContent
                post = {caseStudy}
            />
            {caseStudy.gallery && (
                <CaseGallery
                    gallery={caseStudy.gallery}
                />
            )}
            {caseStudy.testimonials && caseStudy.testimonials.length > 0 && (
                <Testimonials 
                    singleTestimonial="Yes"
                    {...testimonialProps}
                />
            )}
            <RelatedStudies
                title="Related Case Studies" 
                excludeID={caseStudy.id} 
                additionalClass={caseStudy.testimonials && caseStudy.testimonials.length > 0 ? '' : 'no-tst'}
                related={related}
            />
        </>
    );
}

export default CaseSingle;