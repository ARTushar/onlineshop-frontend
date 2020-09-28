import React from 'react';
import Select from 'react-select';

function ReduxFormSelect(props) {
    return (
        <Select
            {...props}
            isDisabled={props.disabled}
            isSearchable
            onChange={(val) => props.onChange(val)}
            onBlur={() => props.onBlur(props.value)}
            // isClearable
            className="reduxformselect"
        />
    );
}

export default ReduxFormSelect;
