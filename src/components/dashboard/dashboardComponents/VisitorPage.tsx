import React from 'react';
import VisitorFilter from './visitorList/VisitorFilter';
import VisitorList from './visitorList/VisitorList';
import './visitorList/visitor.css';
import { IconHeader } from '../../common/IconHeader';
import Header from '../../common/Header';

const VisitorPage: React.FC = () => {
    return (
        <div className="visitor-page">
            <IconHeader icon='fa-users' title='All Visitors' />
            <div className="my-4">
                <Header title="Visitor filter" tooltipText="Filter visitors based on various criteria" />

            </div>
            <VisitorFilter />
            <VisitorList />
        </div>
    );
};

export default VisitorPage;
