import styles from './Pagination.module.scss';

const Pagination = ({totalPages, currentPage, onPageChange}) => {
    return (
        <div className={`${styles['paginationWrapper']} fx fx-ac fx-jc`}>
            <button
                className={`${styles['pg-prev']}`}
                onClick={() => onPageChange(currentPage - 1)} 
                disabled={currentPage === 1}
            >
                Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page, index) => (
                <button
                    className={`${styles['pg-item']}`}
                    key={index}
                    onClick={() => onPageChange(page)} 
                    disabled={currentPage === page}
                >
                    {page}
                </button>
            ))}
            <button
                className={`${styles['pg-next']}`}
                onClick={() => onPageChange(currentPage + 1)} 
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
}

export default Pagination