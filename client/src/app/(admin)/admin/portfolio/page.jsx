import RightBar from '@/components/(Admin)/RightBar/RightBar';
import {getPageModuleData} from "@/utils/api/(admin)/main";

export default async function PortfolioPageInfo() {
    const pageData = await getPageModuleData('portfolio');
    return (
        <RightBar activePage='portfolio' data={pageData} button={{title: 'Add New Case Study', url: '/admin/portfolio/case-studies/new'}} />
    )
}