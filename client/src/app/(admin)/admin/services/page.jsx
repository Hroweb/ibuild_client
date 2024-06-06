import RightBar from '@/components/(Admin)/RightBar/RightBar';
import {getPageModuleData} from "@/utils/api/(admin)/main";

export default async function ServicesPageInfo() {
    const pageData= await getPageModuleData('services');

    return (
        <RightBar activePage='services' data={pageData} />
    )
}