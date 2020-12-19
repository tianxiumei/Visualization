import React, { useEffect, useRef } from "react";

const CanvasStyle = {
    width: '200px',
    height: '200px',
    border: "1px solid red"
}

export default function Circle() {
    const rootRef = useRef(null)

    useEffect(() => {
        const canvas = document.getElementById('circleCanvase') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.fillStyle = 'red'
            ctx.beginPath()
            ctx.arc(0.5 * canvas.width, 0.5 * canvas.height, 50, 0, 2 * Math.PI)
            ctx.translate(-0.5 * 50, -0.5 * 50)
            ctx.fill()
        }
    }, [])
    return <div ref={rootRef}>
        <canvas height={500} width={500} style={CanvasStyle} id='circleCanvase'></canvas>
    </div>
}