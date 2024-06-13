import styles from "./CaseSingle.module.scss"
import {Template1, Template2, Template3, Template4, Template5, Template6, Template7} from "@/components/(Site)/(Pages)/(Cases)/CaseSingle/Templates";

const templateComponents = {
    Template1, Template2, Template3, Template4, Template5, Template6, Template7
};
const CaseContent = ({ post }) => {
    const createMarkup = () => {
        return { __html: post.content };
    };
    return (
        <div className={`bg-white fx fx-wrap`}>
            <div className="container">
                <div dangerouslySetInnerHTML={createMarkup()} className="fx fx-wrap"></div>
                {post.templates && post.templates.map((template, index) => {
                    //console.log(template); return false;
                    const TemplateComponent = templateComponents[`${template.type}`];
                    return TemplateComponent ? <TemplateComponent key={index} data={template.data} /> : null;
                })}
            </div>
        </div>
    );
}

export default CaseContent;