import styles from '@/components/(Admin)/RightBar/RightBar.module.scss'

const AdminTab = ({ tabTitle, tabN, activeTab, onClick }) => {
    const handleTabClick = () => {
        onClick(tabN);
    };

    return (
        <button
            className={activeTab === tabN ? styles.active : ''}
            onClick={handleTabClick}
        >
            { tabTitle }
        </button>
    );
}

export default AdminTab;