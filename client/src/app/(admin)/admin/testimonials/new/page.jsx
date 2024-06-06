import RightBar from "@/components/(Admin)/RightBar/RightBar";
import {noDataPages} from "@/utils/api/(admin)/helpers";

export default async function TestimonialNewPageInfo() {
    //const data = {data:{title: 'Add new testimonial'}}
    const data = noDataPages('Add new testimonial')

    return ( <RightBar activePage='testimonials/single' data={data} button={{title: 'go back', url: './', class: 'btn-back'}} /> )
}