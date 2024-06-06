import RightBar from "@/components/(Admin)/RightBar/RightBar";
import {noDataPages} from "@/utils/api/(admin)/helpers";

export default async function EventLogoNewPageInfo() {
    const data = noDataPages('Add New Event Logo')

    return (
        <RightBar activePage='event-logos/new' data={data} button={{title: 'go back', url: './', class: 'btn-back'}} />
    )
}