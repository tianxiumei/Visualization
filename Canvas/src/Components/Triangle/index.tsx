import React, { useEffect, useRef } from "react";

const CanvasStyle = {
    width: '200px',
    height: '200px',
}

export default function Triangle() {
    const rootRef = useRef(null)

    useEffect(() => {
        const canvas = document.getElementById('triangleCanvase') as HTMLCanvasElement;
        const reactSize = [canvas.width, canvas.height]
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.strokeStyle = '#DF492F'  // 线条颜色
            ctx.fillStyle = '#007C2F' //设置填充的颜色
            ctx.beginPath()
            ctx.beginPath()
            ctx.moveTo(reactSize[0] * 0.5, reactSize[1] * 0.5 - 50)
            ctx.lineTo(reactSize[0] * 0.5 - 50, 50 + reactSize[1] * 0.5)
            ctx.lineTo(reactSize[0] * 0.5 + 50, 50 + reactSize[1] * 0.5)
            ctx.stroke() //开始绘制直线
            ctx.fill() //填充颜色
        }
    }, [])
    return <div style={{ border: '1px solid red', height: '200px', width: '200px' }} ref={rootRef}>
        <canvas height={500} width={500} style={CanvasStyle} id='triangleCanvase'></canvas>
    </div>
}