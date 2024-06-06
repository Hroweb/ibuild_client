import SEOBlock from "@/components/(Admin)/SEOBlock/SEOBlock";

const Tab1 = ({ formData, handleInputChange, subType }) => (
    <SEOBlock
        pageMetaDesc={formData['meta_description']}
        pageMetaKeyW={formData['meta_keywords']}
        fieldName={`tm`}
        handleInputChange={handleInputChange}
        ogData={formData}
        subType={subType}
    />
);

export default Tab1;