import RightBar from '@/components/(Admin)/RightBar/RightBar';
import {noDataPages} from "@/utils/api/(admin)/helpers"
import {getPageModuleData} from "@/utils/api/(admin)/main"

export default async function ServicesLst() {
    const data = noDataPages('Services List')
    const {list} = await getPageModuleData('services', true)

    const mergedData = {
        ...data,
        svList: list
    };

    return (
        <RightBar activePage='services/list' data={mergedData} />
    )
}