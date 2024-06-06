'use client'
import { useEffect, useState } from "react"
import styles from './CasesGeneral.module.scss'
import { CasesPosts, getEventCategories, casesGroupedByYear } from '@/context/Cases'
import CasesEventCatRow from './CasesEventCatRow'
import FeaturedCase from './FeaturedCase'
import CasesByYear from './CasesByYear'
import CaseItems from "@/components/(Site)/(Pages)/(Cases)/CasesGeneral/CaseItems";


const CasesGeneral = () => {
    const [selectedCaseCategory, setSelectedCaseCategory] = useState({ id: '', name: '' });
    const [perPage, setPerPage] = useState(9);
    const [isLoading, setIsLoading] = useState(true);
    const caseCategories = getEventCategories();


    const filteredCases = selectedCaseCategory.id && selectedCaseCategory.id !== 17
        ? CasesPosts.filter((post) => post.event_cat.some(category => category.id === selectedCaseCategory.id))
        : casesGroupedByYear();

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if (!selectedCaseCategory.id && caseCategories.length > 0) {
            const allCategoriesCategory = caseCategories.find((category) => category.slug === 'all-stands');
            if (allCategoriesCategory) {
                setSelectedCaseCategory({
                    id: allCategoriesCategory.id,
                    name: allCategoriesCategory.name,
                });
            }
        }
        setIsLoading(false)
    }, [caseCategories, selectedCaseCategory.id]);


    return (
        <div className={`${styles['cs-pg-wrap']} bg-white`}>
            <div className="container">
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        <CasesEventCatRow
                            categories={caseCategories}
                            allEvents={CasesPosts}
                            selectedCaseCategory={selectedCaseCategory}
                            setSelectedCaseCategory={setSelectedCaseCategory}
                            setPerPage={setPerPage}
                        />
                        {selectedCaseCategory.name === 'All Stands' ? (
                            <>
                                <FeaturedCase
                                    title="Featured"
                                    desc="Experience some of our best exhibition stands. Discover captivating designs carefully crafted for a memorable display."
                                    post={CasesPosts[0]}
                                />
                                <CasesByYear cases={filteredCases} perPage={perPage} />
                            </>
                        ) : (
                            <CaseItems title={selectedCaseCategory.name} cases={filteredCases} perPage={perPage} />
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default CasesGeneral;
