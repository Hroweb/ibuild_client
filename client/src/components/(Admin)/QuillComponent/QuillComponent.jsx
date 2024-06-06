import {useState} from "react";
import dynamic from "next/dynamic";
import 'react-quill/dist/quill.snow.css';
import styles from './QuillComponent.scss';

const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });
const QuillComponent = ({ id, name, value, onChange }) => {
    const [editorValue, setEditorValue] = useState(value ?? '');
    const [sourceMode, setSourceMode] = useState(false);

    const handleChange = (content, delta, source, editor) => {
        setEditorValue(editor.getHTML());
        onChange(editor.getHTML());
    }

    const toggleSourceMode = () => {
        setSourceMode(!sourceMode)
    }

    const toolbarOptions = [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        ['image', 'video', 'link', 'code-block'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }, { 'script': 'sub'}, { 'script': 'super' }],
        [{ 'align': [] }, { 'color': [] }, { 'background': [] }, 'clean'],
    ];

    return (
        <div className={`editorHolder`}>
            <h3>Content Box</h3>
            <button className={`toggleEditor ${sourceMode && 'active'}`} onClick={toggleSourceMode}>{sourceMode ? "Exit Source Mode" : "Enter Source Mode"}</button>
            {
                sourceMode ? (
                    <textarea
                        className={`codeArea`}
                        value={editorValue}
                        onChange={(e) => setEditorValue(e.target.value)}
                        rows={10}
                        cols={50}
                    />
                ) : (
                    <QuillEditor
                        id={id}
                        name={name}
                        value={editorValue}
                        onChange={handleChange}
                        placeholder="Add your text here..."
                        modules={{
                            toolbar: toolbarOptions,
                            clipboard: {
                                matchVisual: true,
                            },
                        }}
                        //formats={['div', 'style']}
                        sanitize={false}

                    />
                )
            }
        </div>
    )
}

export default QuillComponent