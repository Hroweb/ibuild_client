"use client"
import styles from "./CaseSingle.module.scss"
import { useParams } from 'next/navigation'
import { getPostBySlug } from "@/context/Cases"
import CaseIntro from './CaseIntro'
import FeaturedImage from "./FeauturedImage"
import CaseOverview from "./CaseOverview"
import CaseContent from "./CaseContent"
import CaseGallery from "./CaseGallery"
import RelatedStudies from "@/components/(Site)/(Pages)/(Cases)/RelatedStudies/RelatedStudies";
import {Testimonials} from "@/components/(Site)";

const CaseSingle = () => {
    const params = useParams();
    const slug = params.slug;
    const caseStudy = getPostBySlug(slug);

    if (!caseStudy) {
        return <div>Case Study not found</div>;
    }
    const testimonialProps = caseStudy.testimonial && caseStudy.testimonial !== "" ? { post: caseStudy.testimonial } : {};

    return (
        <>
            <CaseIntro 
                title={caseStudy.title}
                desc={caseStudy.desc}
                bgColor={caseStudy.bannerColor}
                standSize={caseStudy.stand_size[0].name}
                eventCat={caseStudy.event_cat[1].name}
                eventYear={caseStudy.event_year[0].name}
            />
            <FeaturedImage 
                src={caseStudy.image}
                alt={caseStudy.title}
                width={caseStudy.imageWidth}
                height={caseStudy.imageHeight}
            />
            <CaseOverview
                ovw_text={caseStudy.overview}
            />
            <CaseContent
                post = {caseStudy}
            />
            {caseStudy.gallery && (
                <CaseGallery 
                    gallery={caseStudy.gallery}
                />
            )}
            {caseStudy.testimonial && (
                <Testimonials 
                    singleTestimonial="Yes"
                    {...testimonialProps}
                />
            )}
            <RelatedStudies 
                title="Related Case Studies" 
                excludeID={caseStudy.id} 
                additionalClass={caseStudy.testimonial ? '' : 'no-tst'}
            />
        </>
    );
}

export default CaseSingle;