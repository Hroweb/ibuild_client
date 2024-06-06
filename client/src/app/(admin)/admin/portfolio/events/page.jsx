import RightBar from "@/components/(Admin)/RightBar/RightBar"
import {noDataPages} from "@/utils/api/(admin)/helpers";
import {getCasesCategories} from "@/utils/api/(admin)/get";

export default async function CasesPageInfo() {
    const events = await getCasesCategories('event_cat');
    const data = noDataPages('Events', {
        subTitle: 'Featured Data',
        categories: events,
        type: 'event_cat'
    })

    return (
        <RightBar activePage='portfolio/categories' data={data} />
    )
}