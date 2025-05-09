import React, { useState } from 'react'
import { Tc1 } from './Tc1'
import { Tc2 } from './Tc2';
import { NumberProvider } from './NumberContest';

export const TParent = () => {
    const [num, setNum] = useState(4);



    function myfunc(): void {
        setNum(p => p + 1);
        console.log(num)
    }

    return (
        <div>TParent
            <p>{num}</p>
            <NumberProvider>
                <Tc2 num={num} ></Tc2>
                <Tc1 changeNum={myfunc}></Tc1>
            </NumberProvider>
        </div>
    )
}
