/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";

const LoadingComponent: React.FC = () => {
    const canvas = useRef<HTMLCanvasElement | null>(null);
    const width = window.innerWidth;
    const height = window.innerHeight;
    let context: CanvasRenderingContext2D | null = (null);
    let globalTime: number = 0;
    let prevCycle: number = 0;
    useEffect(() => {
        if (canvas === null) return;
        if (canvas.current === null) return;
        context = canvas.current.getContext('2d');
    }, []);
    useEffect(() => {
        globalTime = performance.now();
        prevCycle = globalTime;
        render();
    }, [context]);
    const render = () => {
        if (context === null) {
            return;
        }
        let dwDelta = (globalTime - prevCycle) / 720; // 720 = time in ms
        if (dwDelta >= 1.0) {
            prevCycle = globalTime;
            dwDelta = 0;
        }
        const dwProgress = dwDelta * (2 * Math.PI);
        const hslColor = `hsl(${dwDelta * 360},100%,50%)`;
        context.clearRect(0, 0, width, height);
        context.strokeStyle = hslColor;
        context.beginPath();
        context.arc(width / 2, height / 2, height / 4, -Math.PI/2+dwProgress, dwProgress);
        context.stroke();
        globalTime = performance.now();
        requestAnimationFrame(render);
    }
    return (
        <canvas ref={canvas} width={width} height={height}>

        </canvas>
    );
}
export default LoadingComponent;