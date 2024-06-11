import CaseCat from "./CaseCat";

const CasesEventCatRow = ( {categories, allEvents, selectedCaseCategory, setSelectedCaseCategory, setPerPage} ) => {
    const countEventsForCategory = (categoryId) => {
        if (Array.isArray(allEvents)) {
            // Filter articles that belong to the category with the specified categoryId
            const categoryPosts = allEvents.filter((post) => post.event_cat.some((cat) => cat.id === categoryId));
            return categoryPosts.length;
        }
        return 0; // Return 0 if allPosts is not an array or no articles match the category.
    };

    return (
        <div className="cat-row cat-row-pt fx fx-wrap">
            {
                Array.isArray(categories) && categories.length > 0 ? (
                    categories.map((caseCat) => (
                        (countEventsForCategory(caseCat.id) > 0) && (
                            <CaseCat
                                key={caseCat.id}
                                category={caseCat}
                                eventCount={countEventsForCategory}
                                selectedCaseCategory={selectedCaseCategory}
                                setSelectedCaseCategory={setSelectedCaseCategory}
                            />
                        )
                    ))
                ) : (
                    <p>No categories were found</p>
                )
            }
        </div>
    );
}

export default CasesEventCatRow;