import {useEffect, useState} from "react";
import FiltersBar from "@/components/(Admin)/FiltersBar/FiltersBar";
import styles from "@/components/(Admin)/RightBar/RightBar.module.scss";
import BlogRow from "@/components/(Admin)/BlogRow/BlogRow";
import Pagination from "@/components/(Admin)/Pagination/Pagination";
import {showConfirmAlert, showSuccessAlert} from "@/hooks/admin/helpers";
import {deletePost} from "@/utils/api/(admin)/post";
import LoadingAnim from "@/components/(Admin)/LoadingAnim/LoadingAnim";

const TabContent = ({data}) => {
    const categories = data?.categories?.data ?? [];
    const posts = data?.posts?.data ?? [];

    // States
    const itemsPerPage = 10;
    const [displayedPosts, setDisplayedPosts] = useState([]); // Cases to display (filtered and paginated)
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({ categories: [] }); // Track current filters
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(true); // Loading state

    // Define filtersFormData for FiltersBar component
    const filtersFormData = {
        'categories': categories
    };

    // Apply filters and then apply pagination
    useEffect(() => {
        // Filter cases based on current filters
        const filteredPosts = posts.filter(postItem => {
            return Object.entries(filters).every(([key, selectedValues]) => {
                //const caseProperty = key;
                const postValues = postItem[key]?.map(item => item.slug);
                return selectedValues.length === 0 || selectedValues.some(val => postValues.includes(val));
            });
        });

        // Calculate the total pages based on filtered cases
        const newTotalPages = Math.ceil(filteredPosts.length / itemsPerPage);
        setTotalPages(newTotalPages);

        // Apply pagination to the filtered cases
        const paginatedPosts = filteredPosts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
        setDisplayedPosts(paginatedPosts);
        setIsLoading(false); // Set loading to false once data is ready

    }, [posts, currentPage, itemsPerPage, filters]); // Recalculate whenever cases, currentPage, or filters change

    // Update filters and reset to page 1
    const onApplyFilters = (selectedFilters) => {
        setFilters(selectedFilters); // Update filters
        setCurrentPage(1); // Reset to first page
        setTotalPages(Math.ceil(displayedPosts.length / itemsPerPage))
    };

    // Handling page change
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    if (isLoading) {
        return <LoadingAnim />;
    }

    const handleDeletePost = (id) => {
        showConfirmAlert().then((result) => {
            if (result) {
                proceedWithDelete(id).then(r => '');
            }
        });
    };

    const proceedWithDelete = async (id) =>{
        try {
            const result = await deletePost(id);
            if (result.ok) {
                showSuccessAlert(result.message);
            }
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    }

    return (
        <>
            <div className={`${styles['admin-page-wrap']}`}>
                <div className={`${styles['admin-filters-bar']} fx fx-jb fx-ac`}>
                    <FiltersBar filtersFormData={filtersFormData} onApplyFilters={onApplyFilters} />
                </div>
                <div className={`${styles['admin-tbl-area']}`}>
                    <div className={`${styles['admin-tbl-top']} fx fx-jb`}>
                        <div className={`${styles['admin-tbl-col']} ${styles['admin-tbl-col-ttl-bl']}`}>
                            <span>Title</span>
                        </div>
                        <div className={`${styles['admin-tbl-col']} ${styles['admin-tbl-col-ev']}`}>
                            <span>Categories</span>
                        </div>
                        <div className={`${styles['admin-tbl-col']} ${styles['admin-tbl-col-date']}`}>
                            <span>Published date</span>
                        </div>
                        <div className={`${styles['admin-tbl-col']}`}>
                            <span>Actions</span>
                        </div>
                    </div>
                    <div>
                        {Object.entries(displayedPosts).map(([key, item], index) => (
                            <BlogRow
                                key={key}
                                id={item.id}
                                title={item.title}
                                category={item.categories[1].title === "All Posts" ? (item.categories[0] ? item.categories[0].title : "") : item.categories[1].title}
                                date={item.created_at}
                                slug={item.slug}
                                onDelete={handleDeletePost}
                            />
                        ))}
                    </div>
                </div>
                {/* Pagination Controls */}
                {totalPages > 1 &&
                    <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
                }
            </div>
        </>
    )
}

export default TabContent