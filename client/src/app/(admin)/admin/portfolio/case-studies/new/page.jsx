import RightBar from "@/components/(Admin)/RightBar/RightBar"
import {noDataPages} from "@/utils/api/(admin)/helpers";
import {getPageModuleData} from "@/utils/api/(admin)/main";

export default async function CaseAddNewPageInfo() {
    const data = noDataPages('', {isNew: true}, 'data')
    const {services_full, categories, testimonials} = await getPageModuleData('cases_new', true);

    const mergedData = {
        ...data,
        services_full: services_full,
        categories: categories,
        testimonials: testimonials
    };

    //console.log(mergedData);

    return ( 
        <RightBar activePage='portfolio/single' altTitle="Add New Case" data={mergedData} button={{title: 'go back', url: './', class: 'btn-back'}} /> 
    )
}