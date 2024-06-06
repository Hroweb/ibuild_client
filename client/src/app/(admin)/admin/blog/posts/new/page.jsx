import {getAllBlogCats} from "@/utils/api/(admin)/get"
import RightBar from "@/components/(Admin)/RightBar/RightBar"
import {noDataPages} from "@/utils/api/(admin)/helpers";

export default async function BlogSingleAddNewInfo() {
    const categories = await getAllBlogCats();
    const data = noDataPages('', {
        isNew: true
    }, 'data')
   
    const mergedData = {
        ...data,
        categories: categories
    };

    return ( <RightBar activePage='blog/single' data={mergedData} button={{title: 'go back', url: './', class: 'btn-back'}} altTitle={`Add new Article`} /> )
}