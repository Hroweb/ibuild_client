import RightBar from "@/components/(Admin)/RightBar/RightBar";
import {getAllBlogCats} from "@/utils/api/(admin)/get";
import {noDataPages} from "@/utils/api/(admin)/helpers";

export default async function BlogCatInfo() {
    const cats = await getAllBlogCats();
    const data = noDataPages('Categories', {
        subTitle: 'Featured Data',
        categories: cats,
        type: 'post'
    })

    return (
        <RightBar activePage='blog/categories' data={data} />
    )
}