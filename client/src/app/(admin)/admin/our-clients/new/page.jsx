import RightBar from "@/components/(Admin)/RightBar/RightBar";
import {noDataPages} from "@/utils/api/(admin)/helpers";

export default async function ClientLogoNewPageInfo() {
    const data = noDataPages('Add New Client')

    return (
        <RightBar activePage='our-clients/new' data={data} button={{title: 'go back', url: './', class: 'btn-back'}} />
    )
}