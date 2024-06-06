import RightBar from '@/components/(Admin)/RightBar/RightBar';
import {getPageModuleData} from "@/utils/api/(admin)/main";

export default async function PrivacyPageInfo() {
    const pageData = await getPageModuleData('privacy-policy');

    return (
        <RightBar activePage='privacy' data={pageData} />
    )
}