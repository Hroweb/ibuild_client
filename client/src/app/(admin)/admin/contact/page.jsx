import RightBar from '@/components/(Admin)/RightBar/RightBar';
import {getPageModuleData} from "@/utils/api/(admin)/main";

export default async function ContactPageInfo() {
    const pageData= await getPageModuleData('contact-us');

    return (
        <RightBar activePage='contact' data={pageData} />
    )
}