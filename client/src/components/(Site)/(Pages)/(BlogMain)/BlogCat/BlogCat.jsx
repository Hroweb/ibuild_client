import Link from "next/link";

const BlogCat = ({ category, selectedCategory, setSelectedCategory, countPostsForCategory, setPostsToShow }) => {

    return (
        <div className={`cat-item ${selectedCategory.id === category.id ? 'selected' : ''}`}>
            <Link
                key={category.id}
                href='#'
                onClick={(e) => {
                    e.preventDefault();
                    setPostsToShow(4);
                    setSelectedCategory({
                        id: category.id,
                        name: category.title
                    });
                }}
            >
                { category.title } ({countPostsForCategory(category.id)})
            </Link>
        </div>
    );
}

export default BlogCat;