import React from 'react';

import './Hole.css';

const hole = (props) => {
    return (
        <div className="Hole">
            <div className={props.value}></div>
        </div>
    );
};

export default hole;