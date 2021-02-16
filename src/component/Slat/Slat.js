import React from 'react';

import Hole from '../Hole/Hole';

const slat = (props) => {
    const holes = [...Array(props.holes.length)].map((x, j) => 
        <Hole key={j} value={props.holes[j]}></Hole>
    );
    return (
        <div onClick={() => props.handleClick()}>
            <p>{props.numberValue}</p>
            {holes}
        </div>
    );
};

export default slat;