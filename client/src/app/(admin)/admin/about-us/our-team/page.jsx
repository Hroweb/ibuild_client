import RightBar from "@/components/(Admin)/RightBar/RightBar";
import {noDataPages} from "@/utils/api/(admin)/helpers";
import {getPageModuleData} from "@/utils/api/(admin)/main";


export default async function AboutTeamPageInfo() {
    const data = noDataPages('Out Team');
    const { team } = await getPageModuleData('team', true);
    const mergedData = {
        ...data,
        team: team
    };

    return (
        <RightBar activePage='about/team' data={mergedData} />
    )
}