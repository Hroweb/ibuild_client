import RightBar from "@/components/(Admin)/RightBar/RightBar"
import {noDataPages} from "@/utils/api/(admin)/helpers";
import {getCasesCategories} from "@/utils/api/(admin)/get";

export default async function CasesPageInfo() {
    const years = await getCasesCategories('event_year');
    const data = noDataPages('Event Years', {
        subTitle: 'Featured Data',
        categories: years,
        type: 'event_year'
    })

    return (
        <RightBar activePage='portfolio/categories' data={data} />
    )
}