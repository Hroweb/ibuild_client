import RightBar from '@/components/(Admin)/RightBar/RightBar';
import {getPageModuleData} from "@/utils/api/(admin)/main";

export default async function CaseSinglePageInfo({params}) {
    const {services_full, categories, testimonials, caseSingleInfo} = await getPageModuleData('cases_edit', true, {
        case:{id: params.id,},
        testimonial: {num: 10, rand: false}
    });

    const mergedData = {
        ...caseSingleInfo,
        services_full: services_full,
        categories: categories,
        testimonials: testimonials
    };

    return ( 
        <RightBar activePage='portfolio/single' data={mergedData} button={{title: 'go back', url: './', class: 'btn-back'}} /> 
    )
}