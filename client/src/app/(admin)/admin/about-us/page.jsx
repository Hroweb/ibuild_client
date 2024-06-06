import RightBar from '@/components/(Admin)/RightBar/RightBar'
import {getPageModuleData} from '@/utils/api/(admin)/main'

export default async function AboutPageInfo() {
    const pageData = await getPageModuleData('about-us');
    return (
        <RightBar activePage='about' data={pageData} />
    )
}