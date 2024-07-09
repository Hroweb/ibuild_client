'use client'
import Link from "next/link";
import {getPageData} from "@/utils/api/requests";
import {useEffect, useState} from "react";
import {Facebook, Instagram, Linkedin} from "@/components/svgs";
import {splitTextIntoParagraphs} from "@/hooks/helpers";

const Social = ({footer = false}) => {
    const [meta, setMeta] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                const pageData = await getPageData('contact-us');
                setMeta(pageData?.['data']?.['pageMeta']?.['info']);
            } catch (err) {

            }
        }

        fetchData().then();
    }, []);

    if (meta === '') {
        return null;
    }

    if (footer) {
        return (
            <div className="ft-addr">
                <p>{splitTextIntoParagraphs(meta['address']['meta_value'], true)}</p>
                <div className="ft-social fx fx-ac">
                    <Link href={`${meta['linkedin_link']?.['meta_value'] ?? 'https://www.linkedin.com/company/ipoint-int/'}`} target="_blank">
                        <Linkedin/>
                    </Link>
                    <Link href={`${meta['fb_link']?.['meta_value'] ?? 'https://web.facebook.com/Ipoint.Int'}`} target="_blank">
                        <Facebook/>
                    </Link>
                    <Link href={`${meta['insta_link']?.['meta_value'] ?? 'https://www.instagram.com/ipoint_int/'}`} target="_blank">
                        <Instagram/>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="rcol-wrap fx fx-wrap fx-ae">
            <div className="rcol-top">
                <h6>Social</h6>
                <div className="main-social">
                    <Link href={`${meta['insta_link']?.['meta_value'] ?? 'https://www.instagram.com/ipoint_int/'}`}
                          target="_blank">Instagram</Link>
                    <Link
                        href={`${meta['linkedin_link']?.['meta_value'] ?? 'https://www.linkedin.com/company/ipoint-int/'}`}
                        target="_blank">LinkedIn</Link>
                    <Link href={`${meta['fb_link']?.['meta_value'] ?? 'https://web.facebook.com/Ipoint.Int'}`}
                          target="_blank">Facebook</Link>
                    <Link href="https://www.youtube.com/@antoinevella7449" target="_blank">YouTube</Link>
                </div>
            </div>
            <div className="rcol-btm">
                <h5>Get in touch</h5>
                <Link href={`mailto:${meta['email']['meta_value'] ?? 'info@ipoint.com.mt'}`}>{`${meta['email']['meta_value'] ?? 'info@ipoint.com.mt'}`}</Link>
            </div>
        </div>
    );
}

export default Social