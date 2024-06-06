import React, { forwardRef } from 'react';

// eslint-disable-next-line react/display-name
const InputField = forwardRef(({ id, value, onChange, placeholder, type = 'text', accept, multiple, readOnly, checked }, ref) => {
    if (type === 'file') {
        return (
            <input
                type="file"
                id={id}
                name={id}
                accept={accept}
                autoComplete="off"
                onChange={onChange}
                multiple={multiple}
                ref={ref}
            />
        );
    }

    if (type === 'date') {
        return (
            <input
                type="date"
                placeholder={placeholder}
                id={id}
                name={id}
                autoComplete="off"
                onChange={onChange}
                value={value}
                ref={ref}
            />
        );
    }

    return (
        <input
            type={type}
            id={id}
            name={id} 
            placeholder={placeholder}
            autoComplete="off"
            value={value}
            onChange={onChange}
            readOnly={readOnly}
            checked={checked}
            ref={ref}
        />
    );
});
  
export default InputField;