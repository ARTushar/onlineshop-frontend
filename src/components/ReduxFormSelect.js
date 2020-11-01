import React from 'react';
import Select from 'react-select';

function ReduxFormSelect(props) {
    const handleChange = (val) => {
        if(props.updateDeliveryCost){
            props.updateDeliveryCost(val)
        }
        props.onChange(val);
    }
    return (
        <Select
            {...props}
            isDisabled={props.disabled}
            isSearchable
            onChange={handleChange}
            onBlur={() => props.onBlur(props.value)}
            // isClearable
            className="reduxformselect"
        />
    );
}

export default ReduxFormSelect;
