import React from "react";
import Circle from './svgs/circle.svg'
import Hierarchy from './svgs/hierarchy'

export default function App() {
    return <div>
        <div>
            <h3>圆形</h3>
            <Circle />
        </div>
        <div>
            <h3>嵌套</h3>
            <Hierarchy />
        </div>
    </div>
}