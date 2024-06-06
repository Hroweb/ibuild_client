import RightBar from "@/components/(Admin)/RightBar/RightBar";
import {noDataPages} from "@/utils/api/(admin)/helpers";
import {getPageModuleData} from "@/utils/api/(admin)/main";

export default async function ClientsPageInfo() {
    const data = noDataPages('Our Clients')
    const {clients} = await getPageModuleData('clients', true)
    const mergedData = {
        ...data,
        clients: clients
    };

    return (
        <RightBar activePage='our-clients' data={mergedData} button={{title: 'Add New Client', url: '/admin/our-clients/new'}} />
    )
}