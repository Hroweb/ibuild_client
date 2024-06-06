import RightBar from '@/components/(Admin)/RightBar/RightBar';
import {noDataPages} from "@/utils/api/(admin)/helpers";
import {getPageModuleData} from "@/utils/api/(admin)/main";

export default async function TestimonialsPageInfo() {
    const data = noDataPages('Testimonials')
    const {testimonials}  = await getPageModuleData('testimonials', true, {num: 15, rand: false});
    const mergedData = {
        ...data,
        testimonials: testimonials
    };

    return (
        <RightBar activePage='testimonials' data={mergedData} button={{title: 'Add New Testimonial', url: '/admin/testimonials/new'}} altTitle="Testimomials"/>
    )
}