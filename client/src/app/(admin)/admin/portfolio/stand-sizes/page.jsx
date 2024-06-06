import {getCasesCategories} from "@/utils/api/(admin)/get"
import RightBar from "@/components/(Admin)/RightBar/RightBar"
import {noDataPages} from "@/utils/api/(admin)/helpers";

export default async function CasesPageInfo() {
    const stand_sizes = await getCasesCategories('stand_size');
    const data = noDataPages('Stand Sizes', {
        subTitle: 'Featured Data',
        categories: stand_sizes,
        type: 'stand_size'
    })

    return (
        <RightBar activePage='portfolio/categories' data={data} />
    )
}