import RightBar from '@/components/(Admin)/RightBar/RightBar';
import {getPageModuleData} from "@/utils/api/(admin)/main";

export default async function PrivacyPageInfo() {
    const pageData = await getPageModuleData('terms-and-conditions');

    return (
        <RightBar activePage='terms' data={pageData} />
    )
}