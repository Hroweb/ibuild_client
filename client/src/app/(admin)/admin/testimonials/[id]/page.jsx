import RightBar from "@/components/(Admin)/RightBar/RightBar";
import {getPageModuleData} from "@/utils/api/(admin)/main";

export default async function TestimonialSinglePageInfo({params}) {
    const id = params.id;
    const {testimonials} = await getPageModuleData('testimonials', true, {id: id})
    const tstSingleInfo = testimonials;

    return ( <RightBar activePage='testimonials/single' data={tstSingleInfo} button={{title: 'go back', url: './', class: 'btn-back'}} altTitle={`Testimomial From ${tstSingleInfo.data.name}`} /> )
}