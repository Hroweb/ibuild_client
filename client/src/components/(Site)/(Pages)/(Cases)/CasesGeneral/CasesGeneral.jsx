'use client';
import { useEffect, useState } from "react"
import styles from './CasesGeneral.module.scss'
import CasesEventCatRow from './CasesEventCatRow'
import FeaturedCase from './FeaturedCase'
import CasesByYear from './CasesByYear'
import CaseItems from "@/components/(Site)/(Pages)/(Cases)/CasesGeneral/CaseItems"
import {casesGroupedByYear, getPrimaryCase} from "@/hooks/helpers"
import LoadingAnimFull from "@/components/(Site)/(Animations)/LoadingAnim/LoadingAnimFull"

const CasesGeneral = ({ events, categories }) => {
    const [selectedCaseCategory, setSelectedCaseCategory] = useState({ id: '', name: '' });
    const [perPage, setPerPage] = useState(9);
    const [isLoading, setIsLoading] = useState(true);
    const caseCategories = categories?.data || [];
    const casesPosts = events?.data || [];

    useEffect(() => {
        if (!selectedCaseCategory.id && caseCategories.length > 0) {
            const allCategoriesCategory = caseCategories.find((category) => category.slug === 'all-stands');
            if (allCategoriesCategory) {
                setSelectedCaseCategory({
                    id: allCategoriesCategory.id,
                    name: allCategoriesCategory.title,
                });
            }
        }
        setIsLoading(false);
    }, [caseCategories, selectedCaseCategory.id]);

    const filteredCases = selectedCaseCategory.id && selectedCaseCategory.id !== 5
        ? casesPosts.filter((post) => post.event_cat.some(category => category.id === selectedCaseCategory.id))
        : casesGroupedByYear(casesPosts);

    const primaryEvent = getPrimaryCase(casesPosts);

    return (
        <div className={`${styles['cs-pg-wrap']} bg-white`}>
            <div className="container">
                {isLoading ? (
                    <LoadingAnimFull />
                ) : (
                    <>
                        <CasesEventCatRow
                            categories={caseCategories}
                            allEvents={casesPosts}
                            selectedCaseCategory={selectedCaseCategory}
                            setSelectedCaseCategory={setSelectedCaseCategory}
                            setPerPage={setPerPage}
                        />
                        {selectedCaseCategory.name === 'All Stands' ? (
                            <>
                                {primaryEvent && primaryEvent.length > 0 && (
                                    <FeaturedCase
                                        title="Featured"
                                        desc="Experience some of our best exhibition stands. Discover captivating designs carefully crafted for a memorable display."
                                        post={primaryEvent[0]}
                                    />
                                )}
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