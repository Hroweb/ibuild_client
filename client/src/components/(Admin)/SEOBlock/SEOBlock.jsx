import DescBlock from '@/components/(Admin)/DescBlock/DescBlock';
import TitleBlock from "@/components/(Admin)/TitleBlock/TitleBlock";

const SEOBlock = ({fieldName, pageMetaDesc, pageMetaKeyW, handleInputChange, ogData, subType}) => {
    return (
        <>
            <DescBlock
                sectionTitle="Meta Description"
                sectionTitleVal={pageMetaDesc}
                inputId={`meta_description`}
                inputName={`meta_description`}
                onChange={(event) => handleInputChange(`meta_description`, event.target.value, subType)}
            />
            <DescBlock
                sectionTitle="Keywords"
                sectionTitleVal={pageMetaKeyW}
                inputId="meta_keywords"
                inputName="meta_keywords"
                onChange={(event) => handleInputChange(`meta_keywords`, event.target.value, subType)}
            />
            {ogData && ( // Check if ogData exists
                <>
                    {/* Render additional TitleBlock components */}
                    <TitleBlock
                        inputID='og_title'
                        sectionTitle="Og Title"
                        sectionTitleVal={ogData.og_title} // Example value, replace with actual data from ogData
                        onChange={(event) => handleInputChange(`og_title`, event.target.value, subType)}
                    />
                    <DescBlock
                        sectionTitle="Og Description"
                        sectionTitleVal={ogData.og_desc} // Example value, replace with actual data from ogData
                        inputId="og_desc"
                        inputName="og_desc"
                        onChange={(event) => handleInputChange(`og_desc`, event.target.value, subType)}
                    />
                    <TitleBlock
                        inputID='og_type'
                        sectionTitle="Og Type"
                        sectionTitleVal={ogData.og_type} // Example value, replace with actual data from ogData
                        onChange={(event) => handleInputChange(`og_type`, event.target.value, subType)}
                    />
                    <TitleBlock
                        inputID='og_url'
                        sectionTitle="Og Url"
                        sectionTitleVal={ogData.og_url} // Example value, replace with actual data from ogData
                        onChange={(event) => handleInputChange(`og_url`, event.target.value, subType)}
                    />
                </>
            )}
        </>
    );
}

export default SEOBlock;