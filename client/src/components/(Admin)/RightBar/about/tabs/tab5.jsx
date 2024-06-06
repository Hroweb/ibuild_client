import styles from "@/components/(Admin)/RightBar/RightBar.module.scss";
import TitleBlock from "@/components/(Admin)/TitleBlock/TitleBlock";
import BoxBlock from "@/components/(Admin)/BoxBlock/BoxBlock";
import ButtonBlock from "@/components/(Admin)/ButtonBlock/ButtonBlock";

const Tab5 = ({formData, selectedMedia, errorMessage, handleInputChange, subType}) => {
    const box1_icon = selectedMedia?.grow?.box1_icon?.preview ? selectedMedia?.grow?.box1_icon.preview : `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/about-us/${selectedMedia?.grow.box1_icon}`;
    const box2_icon = selectedMedia?.grow?.box2_icon?.preview ? selectedMedia?.grow?.box2_icon.preview : `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/about-us/${selectedMedia?.grow.box2_icon}`;
    const box3_icon = selectedMedia?.grow?.box3_icon?.preview ? selectedMedia?.grow?.box3_icon.preview : `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/about-us/${selectedMedia?.grow.box3_icon}`;
    return (
    <div className={`${styles['admin-fields-wrap']}`}>
        {[
            { title: "Section title 1", id: "cp_gr_title_1", value: formData['cp_gr_title_1'] },
            { title: "Section title 2", id: "cp_gr_title_2", value: formData['cp_gr_title_2'] }
        ].map(item => (
            <TitleBlock
                key={item.id}
                sectionTitle={item.title}
                sectionTitleVal={item.value}
                onChange={(event) => handleInputChange(item.id, event.target.value, subType)}
                inputID={item.id}
                inputPlaceholder="Add your title here..."
            />
        ))}

        {[
            { title: "Box 1", id: "cp_grow_1", icon: box1_icon, fileId: 'box1_icon', errorMsg: errorMessage.box1_icon },
            { title: "Box 2", id: "cp_grow_2", icon: box2_icon, fileId: 'box2_icon', errorMsg: errorMessage.box2_icon },
            { title: "Box 3", id: "cp_grow_3", icon: box3_icon, fileId: 'box3_icon', errorMsg: errorMessage.box3_icon }
        ].map(item => (
            <BoxBlock
                key={item.id}
                title={`${item.title} Title`}
                handleInputChange={handleInputChange}
                inputTitleID={`${item.id}_title`}
                inputTitlePlaceholder="Add your title here..."
                inputTitleVal={formData[`${item.id}_title`]}
                inputDescTitle={`${item.title} Description`}
                inputDescID={`${item.id}_text`}
                inputDescVal={formData[`${item.id}_text`]}
                selectedFile={item.icon}
                iconLabel={`${item.title} Icon`}
                inputFileID={item.fileId}
                errorMessage={item.errorMsg}
                subType={subType}
            />
        ))}

        <ButtonBlock
            sectionTitle="Button"
            inputID="grow_btn"
            inputName="grow_btn"
            inputVal={formData['grow_btn']}
            onChange={(event) => handleInputChange('grow_btn', event.target.value, subType)}
        />
    </div>
)}

export default Tab5