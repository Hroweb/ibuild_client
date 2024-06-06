import RightBar from '@/components/(Admin)/RightBar/RightBar'
import {getPageModuleData} from "@/utils/api/(admin)/main";

export default async function HomePageInfo() {
    const pageData = await getPageModuleData('home');

    return (
        <RightBar activePage='home' data={pageData} />
    )
    /*try{
        const { pageData } = await getPageModuleData('home');
        return (
            <Suspense fallback={<LoadingAnim />}>
                <RightBar activePage='home' data={pageData} />
            </Suspense>
        )
    }catch (error) {
        console.error('Error loading page:', error);
    }*/
}