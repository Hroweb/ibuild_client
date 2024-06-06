'use client';
import React, {Suspense, useState} from "react";
import AdminTab from "@/components/(Admin)/AdminTab/AdminTab";
import styles from "@/components/(Admin)/RightBar/RightBar.module.scss";
import {tabData} from "@/context/admin/LeftMenu";
import LoadingAnim from "@/components/(Admin)/LoadingAnim/LoadingAnim";

const RightBar = ({activePage, data, button= {}, altTitle}) => {
    const pageData = data?.pageData ?? data?.data ?? null;
    const { tabs } = tabData[activePage] ?? {};
    const [activeTab, setActiveTab] = useState(tabs?.[0]?.tabN || null); // Default to the first tab

    const handleTabClick = (tabN) => {
        setActiveTab(tabN);
    };

    const TabContentComponent = React.lazy(() => import(`./${activePage}/tabContent`));
    // Render tabs and data based on the active page
    return (
        <div className={`${styles['admin-rcol']}`}>
            <div className={`${styles['admin-top']} fx fx-jb`}>
                {pageData && pageData.title ? <h1>{pageData.title}</h1> : <h1>{altTitle}</h1>}
                {Object.keys(button).length !== 0 && <a className={button.class ? styles[button.class] : `btn-primary`} href={button.url}>{button.title}</a>}
            </div>
            <div className={`${styles['admin-tabs-wrap']}`}>
                {tabs &&
                    <div className={`${styles['admin-tabs-toggle']} ps-rel`}>
                        {tabs.map(tab => (
                            <AdminTab
                                key={tab.tabN}
                                tabTitle={tab.title}
                                tabN={tab.tabN}
                                activeTab={activeTab}
                                onClick={() => handleTabClick(tab.tabN)}
                            />
                        ))}
                    </div>
                }
                <Suspense fallback={<LoadingAnim />}>
                    <TabContentComponent data={data} activeTab={activeTab} />
                </Suspense>
            </div>
        </div>
    );
}

export default RightBar