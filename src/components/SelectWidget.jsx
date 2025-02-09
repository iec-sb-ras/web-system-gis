import React from 'react';

const SelectWidget = ({ options, onChange }) => {
    return (
        <select onChange={(e) => onChange(e.target.value)}>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default SelectWidget;
