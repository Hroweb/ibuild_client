import RightBar from "@/components/(Admin)/RightBar/RightBar";
import {noDataPages} from "@/utils/api/(admin)/helpers";
import {getPageModuleData} from "@/utils/api/(admin)/main";

export default async function EventLogosPageInfo() {
    const data = noDataPages('Event Logos');
    const {logos} = await getPageModuleData('logos', true);
    const mergedData = {
        ...data,
        logos: logos
    };

    return (
        <RightBar activePage='event-logos' data={mergedData} button={{title: 'Add New Event Logo', url: '/admin/event-logos/new'}} />
    )
}