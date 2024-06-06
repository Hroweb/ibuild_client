import styles from "./CaseSingle.module.scss"

const CaseContent = ({ post }) => {
    const createMarkup = () => {
        return { __html: post.content };
    };
    return (
        <div className={`bg-white fx fx-wrap`}>
            <div className="container">
                <div dangerouslySetInnerHTML={createMarkup()} className="fx fx-wrap"></div>
            </div>
        </div>
    );
}

export default CaseContent;