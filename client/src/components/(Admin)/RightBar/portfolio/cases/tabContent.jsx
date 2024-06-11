import { useEffect, useState } from "react";
import styles from "@/components/(Admin)/RightBar/RightBar.module.scss";
import FiltersBar from "@/components/(Admin)/FiltersBar/FiltersBar";
import CasesRow from "@/components/(Admin)/CasesRow/CasesRow";
import Pagination from "@/components/(Admin)/Pagination/Pagination";
import LoadingAnim from "@/components/(Admin)/LoadingAnim/LoadingAnim";
import {showConfirmAlert, showSuccessAlert, sortByTitle} from "@/hooks/admin/helpers";
import {deleteEvent} from "@/utils/api/(admin)/post";


const TabContent = ({ data }) => {
    const categories = data?.categories?.data ?? [];
    const cases = data?.cases?.data ?? [];

    // States
    const itemsPerPage = 10;
    const [allCases, setAllCases] = useState(cases); // All cases, unfiltered
    const [displayedCases, setDisplayedCases] = useState([]); // Cases to display (filtered and paginated)
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({ years: [], sizes: [], events: [] }); // Track current filters
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(true); // Loading state


    // Define filtersFormData for FiltersBar component
    const filtersFormData = {
        'years': sortByTitle(categories?.event_year, true),
        'sizes': sortByTitle(categories?.stand_size, true),
        'events': categories?.event_cat
    };

    // Apply filters and then apply pagination
    useEffect(() => {
        // Filter cases based on current filters
        const filteredCases = allCases.filter(caseItem => {
            return Object.entries(filters).every(([key, selectedValues]) => {
                const caseProperty = key === 'years' ? 'event_year' : key === 'sizes' ? 'stand_size' : 'event_cat';
                const caseValues = caseItem[caseProperty]?.map(item => item.slug);
                return selectedValues.length === 0 || selectedValues.some(val => caseValues.includes(val));
            });
        });

        // Calculate the total pages based on filtered cases
        const newTotalPages = Math.ceil(filteredCases.length / itemsPerPage);
        setTotalPages(newTotalPages);

        // Apply pagination to the filtered cases
        const paginatedCases = filteredCases.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
        setDisplayedCases(paginatedCases);
        setIsLoading(false); // Set loading to false once data is ready

    }, [allCases, currentPage, itemsPerPage, filters]); // Recalculate whenever cases, currentPage, or filters change

    // Update filters and reset to page 1
    const onApplyFilters = (selectedFilters) => {
        setFilters(selectedFilters); // Update filters
        setCurrentPage(1); // Reset to first page
        setTotalPages(Math.ceil(displayedCases.length / itemsPerPage))
    };

    // Handling page change
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleDeleteEvent = (id) => {
        showConfirmAlert().then((result) => {
            if (result) {
                proceedWithDelete(id).then(r => '');
            }
        });
    };

    const proceedWithDelete = async (id) =>{
        try {
            const result = await deleteEvent(id);
            if (result.ok) {
                showSuccessAlert(result.message);
            }
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    }

    if (isLoading) {
        return <LoadingAnim />;
    }

    return (
        <>
            <div className={`${styles['admin-page-wrap']}`}>
                <div className={`${styles['admin-filters-bar']} fx fx-jb fx-ac`}>
                    <FiltersBar filtersFormData={filtersFormData} onApplyFilters={onApplyFilters} />
                </div>
                {displayedCases.length > 0 ? (
                    <div className={`${styles['admin-tbl-area']}`}>
                        {/* Table Header */}
                        <div className={`${styles['admin-tbl-top']} fx fx-jb`}>
                            <div className={`${styles['admin-tbl-col']} ${styles['admin-tbl-col-ttl']}`}>
                                <span>Title</span>
                            </div>
                            <div className={`${styles['admin-tbl-col']} ${styles['admin-tbl-col-year']}`}>
                                <span>Year</span>
                            </div>
                            <div className={`${styles['admin-tbl-col']} ${styles['admin-tbl-col-ss']}`}>
                                <span>Stand Size</span>
                            </div>
                            <div className={`${styles['admin-tbl-col']} ${styles['admin-tbl-col-ev']}`}>
                                <span>Event</span>
                            </div>
                            <div className={`${styles['admin-tbl-col']} ${styles['admin-tbl-col-date']}`}>
                                <span>Publish date</span>
                            </div>
                            <div className={`${styles['admin-tbl-col']}`}>
                                <span>Actions</span>
                            </div>
                        </div>
                        {/* Table Rows */}
                        <div>
                            {displayedCases.map((item, index) => (
                                <CasesRow
                                    key={index}
                                    id={item.id}
                                    title={item.title}
                                    year={item.event_year[0]?.title}
                                    standSize={item.stand_size[0]?.title}
                                    event={item.event_cat[1]?.title}
                                    date={item.created_at}
                                    slug={item.slug}
                                    onDelete={handleDeleteEvent}
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    'No cases found'
                )}
                {/* Pagination Controls */}
                {totalPages > 1 &&
                    <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
                }
            </div>
        </>
    );
};

export default TabContent;