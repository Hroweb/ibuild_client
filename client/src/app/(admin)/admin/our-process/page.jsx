import RightBar from "@/components/(Admin)/RightBar/RightBar";
import {noDataPages} from "@/utils/api/(admin)/helpers";
import {getPageModuleData} from "@/utils/api/(admin)/main";

export default async function ProcessPageInfo() {
    const data = noDataPages('Our Process');
    const { process } = await getPageModuleData('processes', true);
    const mergedData = {
        ...data,
        process: process
    };
    return (
        <RightBar activePage='our-process' data={mergedData} />
    )
}