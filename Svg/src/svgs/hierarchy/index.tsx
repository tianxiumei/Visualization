import React, { useCallback, useEffect, useState } from "react";
import * as d3 from "d3";
/**样式控制圆圈点击成红色 */
import './style.less'

const dataSource = 'https://s5.ssl.qhres.com/static/b0695e2dd30daa64.json';

export default function Hierarchy() {

    const [data, setData] = useState<d3.HierarchyNode<any>>()
    const [activeTarget, setActiveTarget] = useState<any>()

    useEffect(() => {
        fetch(dataSource).then(async (response: any) => {
            const text = await response.text()
            const res = JSON.parse(text)
            const regions = d3.hierarchy(res)
                .sum((_d: any) => 1)
                .sort((a: any, b: any) => b.value - a.value);
            setData(regions)
        });
    }, [])

    const getTitle = useCallback((target) => {
        const name = target.getAttribute('data-name')
        if (target.parentNode && target.parentNode.nodeName === 'g') {
            const parentName = target.parentNode.getAttribute('data-name');
            return `${parentName}-${name}`;
        }
        return name;
    }, [])

    const draw = useCallback((parent, node, { fillStyle = 'rgba(0, 0, 0, 0.2)', textColor = 'white' } = {}) => {
        const children = node.children;
        const { x, y, r } = node;
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', x);
        circle.setAttribute('cy', y);
        circle.setAttribute('r', r);
        circle.setAttribute('fill', fillStyle);
        circle.setAttribute('data-name', node.data.name);
        parent.appendChild(circle);
        if (children) {
            const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            for (let i = 0; i < children.length; i++) {
                draw(group, children[i], { fillStyle, textColor });
            }
            group.setAttribute('data-name', node.data.name);
            parent.appendChild(group);
        } else {
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('fill', textColor);
            text.setAttribute('font-family', 'Arial');
            text.setAttribute('font-size', '1.5rem');
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('x', x);
            text.setAttribute('y', y);
            const name = node.data.name;
            text.textContent = name;
            parent.appendChild(text);
        }
    }, [])

    useEffect(() => {
        if (data) {
            const pack = d3.pack()
                .size([1600, 1600])
                .padding(3);
            const root = pack(data);
            const svgroot = document.querySelector('#circleSvg');
            draw(svgroot, root);
        }
    }, [data])

    useEffect(() => {
        const svgroot = document.querySelector('#circleSvg');
        const moseOver = (evt: any) => {
            let target = evt.target as any;
            const titleEl = document.getElementById('title');
            if (target && titleEl) {
                if (target.nodeName === 'text') {
                    target = target.previousSibling;
                }
                if (activeTarget !== target) {
                    if (activeTarget) {
                        activeTarget.setAttribute('fill', 'rgba(0, 0, 0, 0.2)');
                    }
                }
                target.setAttribute('fill', 'rgba(0, 128, 0, 0.1)');
                titleEl.textContent = getTitle(target);
                setActiveTarget(target)
            }
        }
        if (svgroot) {
            svgroot.addEventListener('mousemove', moseOver);
        }
        return () => {
            if (svgroot) {
                svgroot.removeEventListener('mousemove', moseOver)
            }
        }
    }, [activeTarget])


    return <div>
        <h1 id="title"></h1>
        <svg id='circleSvg' xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="800" viewBox="0 0 1600 1600">
        </svg>
    </div>
}