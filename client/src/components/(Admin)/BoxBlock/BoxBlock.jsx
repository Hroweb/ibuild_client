import styles from '@/components/(Admin)/RightBar/RightBar.module.scss'
import TitleBlock from "@/components/(Admin)/TitleBlock/TitleBlock"
import DescBlock from '@/components/(Admin)/DescBlock/DescBlock'
import IconBlock from "@/components/(Admin)/IconBlock/IconBlock"

const BoxBlock = ({ title, handleInputChange, inputTitleID, inputTitleVal, inputTitlePlaceholder, inputDescTitle, inputDescID, inputDescVal, selectedFile, iconLabel, inputFileID, errorMessage, subType }) => {
    return (
        <div className={`${styles['admin-field-group']}`}>
            <TitleBlock
                sectionTitle={title}
                sectionTitleVal={inputTitleVal}
                onChange={(event) => handleInputChange(inputTitleID, event.target.value, subType)}
                inputID={inputTitleID}
                inputPlaceholder={inputTitlePlaceholder}
            />
            <DescBlock
                sectionTitle={inputDescTitle}
                sectionTitleVal={inputDescVal}
                inputID={inputDescID}
                inputName={inputDescID}
                onChange={(event) => handleInputChange(inputDescID, event.target.value, subType)}
            />
            <IconBlock
                label={iconLabel}
                selectedFile={selectedFile}
                onChange={(event) => handleInputChange(inputFileID, event.target.value, subType, {
                    file: event,
                    accept: ['image/svg', 'image/svg+xml'],
                    size: 5242880
                })}
                inputID={inputFileID}
                errorMessage={errorMessage}
            />
        </div>
    );
}

export default BoxBlock;