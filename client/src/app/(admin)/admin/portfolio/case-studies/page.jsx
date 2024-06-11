import RightBar from "@/components/(Admin)/RightBar/RightBar";
import {getCases} from "@/utils/api/requests";
import {getCasesCategories} from "@/utils/api/(admin)/get";
import {noDataPages} from "@/utils/api/(admin)/helpers";

export default async function CasesPageInfo() {
    const cases = await getCases(false);
    const categories = await getCasesCategories();
    const data = noDataPages('Case Studies', {}, 'data')

    const mergedData = {
        ...data,
        cases: cases,
        categories: categories
    };

    return (
        <RightBar activePage='portfolio/cases' data={mergedData} button={{title: 'Add New Case Study', url: '/admin/portfolio/case-studies/new'}} />
    )
}