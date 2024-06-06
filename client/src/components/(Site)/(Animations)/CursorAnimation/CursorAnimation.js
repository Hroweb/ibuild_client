/*import '@/components/(Site)/IntroVideo/IntroVideo.module.scss'
import '@/components/(Site)/Blog/Blog.module.scss'*/
const CursorAnimation = ({ cursorClass, cursorX, cursorY, isHovered, cursorText, isMusic= false, styles }) => {
    return (
        <div
            className={`${styles[cursorClass]} fx fx-jc fx-ac ${isHovered ? styles.active : ''}`}
            style={{ left: cursorX, top: cursorY }}
        >
            <span>{ cursorText ?? 'See more' }</span>
        </div>
    );
};

export default CursorAnimation;
