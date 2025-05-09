import React from 'react';
import FilterOptions from './FilterOptions';

const VisitorFilter: React.FC = () => {
    return (
        <div className="visitor-filter">
            <input type="text" placeholder="Search by name, email, phone number or special notes" />
            <input type="text" placeholder="Search by visitor type or option" />
            <FilterOptions />
        </div>
    );
};

export default VisitorFilter;
