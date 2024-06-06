import {getPageModuleData} from '@/utils/api/(admin)/main'
import RightBar from "@/components/(Admin)/RightBar/RightBar"
import {noDataPages} from "@/utils/api/(admin)/helpers";

export default async function AboutGalleryPageInfo() {
    const data = noDataPages('Gallery');
    const { gallery } = await getPageModuleData('gallery', true);
    const mergedData = {
        ...data,
        gallery: gallery
    };

    return (
        <RightBar activePage='about/gallery' data={mergedData} />
    )
}