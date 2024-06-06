"use client"
import React, { useState, useEffect } from 'react';
import styles from './IntroText.module.scss';
import Link from 'next/link';

const IntroText = ({ data }) => {
    const [isActive, setIsActive] = useState(false);
    const [truncatedText, setTruncatedText] = useState('');
    const title = data?.['cp_intro_title']?.['meta_value'];
    const text = data?.['cp_intro_text']?.['meta_value'];

    const truncateText = (html, maxWords) => {
        const div = document.createElement('div');
        div.innerHTML = html;
        let wordCount = 0;

        const truncateNode = (node) => {
            if (wordCount >= maxWords) {
                return document.createTextNode('');
            }
            if (node.nodeType === Node.TEXT_NODE) {
                const words = node.nodeValue.split(' ');
                const remainingWords = maxWords - wordCount;
                const truncatedText = words.slice(0, remainingWords).join(' ');
                wordCount += truncatedText.split(' ').length;
                if (truncatedText.split(' ').length < words.length) {
                    return document.createTextNode(truncatedText + '...');
                }
                return document.createTextNode(truncatedText);
            }

            if (node.nodeType === Node.ELEMENT_NODE) {
                const clone = node.cloneNode(false);
                node.childNodes.forEach((childNode) => {
                    clone.appendChild(truncateNode(childNode));
                });
                return clone;
            }

            return node;
        };

        const truncatedContent = Array.from(div.childNodes).map(truncateNode);
        div.innerHTML = '';
        truncatedContent.forEach((node) => div.appendChild(node));
        return div.innerHTML;
    };

    useEffect(() => {
        if (text) {
            setTruncatedText(truncateText(text, 36));
        }
    }, [text]);

    const toggleClass = (e) => {
        e.preventDefault();
        setIsActive(!isActive);
    };

    return (
        <section className="pg-section pg-section-pd bg-light">
            <div className="container">
                <div className="fx fx-jb fx-wrap">
                    <div className="intro-lcol">
                        <h2>{title}</h2>
                    </div>
                    <div className="intro-rcol">
                        <div className="intro-text">
                            <div
                                dangerouslySetInnerHTML={{ __html: isActive ? text : truncatedText }}
                            />
                        </div>
                        <Link
                            href="/#read-more"
                            className={styles['intro-rMore']}
                            onClick={toggleClass}
                        >
                            Read {isActive ? 'Less' : 'More'}
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default IntroText;