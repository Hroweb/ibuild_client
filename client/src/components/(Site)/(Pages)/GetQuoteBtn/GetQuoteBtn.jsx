import React, { useContext } from 'react';
import { ToggleContext } from '@/components/(Site)/Header/Header';
import Link from "next/link";
import { BtnArrUp } from '@/components/svgs/index';

const GetQuoteBtn = ({ isDarkTheme, isRedBtn }) => {
    // Consume the context to access the function
    const toggleQuotePPClass = useContext(ToggleContext);
    //console.log(toggleQuotePPClass);

    const handleButtonClick = (event) => {
        //console.log(toggleQuotePPClass);
        event.preventDefault(); // Prevent default behavior (page refresh)

        if (toggleQuotePPClass) {
            toggleQuotePPClass();
        }
    };

  return (
        <Link
            className={`btn-primary ${isDarkTheme ? 'btn-primary-wh' : 'btn-primary-dk'} ${isRedBtn ? 'btn-primary-red' : ''} fx fx-ac fx-jc`}
            href="javascript:void(0)"
            onClick={handleButtonClick}
        >
            <span>Get a Quote</span>
            <div className="btn-arr fx">
                <BtnArrUp />
            </div>
        </Link>
  );
};

export default GetQuoteBtn;