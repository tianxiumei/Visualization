import React from "react";
import Circle from "./Components/Circle";
import Triangle from "./Components/Triangle";

export default function App() {
    return <div>
        <div>
            <h3>圆形居中</h3>
            <Circle />
        </div>
        <div>
            <h3>三角形居中</h3>
            <Triangle />
        </div>
    </div>
}