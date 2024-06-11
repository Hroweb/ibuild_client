import Link from "next/link";

const CaseCat = ({category, eventCount, selectedCaseCategory, setSelectedCaseCategory}) => {

    return (
        <div className={`cat-item ${selectedCaseCategory.id === category.id ? 'selected' : ''}`}>
            <Link
                key={category.id}
                href='#'
                onClick={(e) => {
                    e.preventDefault();
                    setSelectedCaseCategory({
                        id: category.id,
                        name: category.title
                    });
                }}
            >
                { category.title } ({eventCount(category.id)})
            </Link>
        </div>
    );
}

export default CaseCat;