/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import '../style/views/404error.css'
const ErrorView: React.FC = () => {
    const params = useParams();
    const precision = 150;//also is speed
    const canvas = useRef<HTMLCanvasElement | null>(null);
    let width = window.innerWidth;
    let height = window.innerHeight;
    let context: CanvasRenderingContext2D | null = (null);
    let particles: { x: number, y: number }[] = [];
    let time: number = 0;
    let accumulator: number = 0;
    let mouseX = 0;
    let mouseY = 0;
    let sinTable: number[] = [];
    let cosTable: number[] = [];
    useEffect(() => {
        sinTable = [];
        cosTable = [];
        context = null;
        if (canvas === null) return;
        if (canvas.current === null) return;
        context = canvas.current.getContext('2d');
        for (let i = 0; i < Math.PI * 2.0; i += (2.0 * Math.PI) / precision) {
            sinTable.push(Math.sin(i));
            cosTable.push(Math.cos(i));
        }
    }, []);
    useEffect(() => {
        if (context === null) return;
        initialize(context);
        render();
    }, [context]);
    const initialize = (ctx: CanvasRenderingContext2D) => {
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = "#ffffff";
        const fontSize = Math.min(width, height) / 2;
        ctx.font = `${fontSize}px Arial`;
        ctx.textAlign = 'center';
        ctx.fillText(params.error === undefined ? '404' : params.error, width / 2, height / 2 + fontSize / 4);
        const data = ctx.getImageData(0, 0, width, height).data;
        const data32 = new Uint32Array(data.buffer);
        for (let x = 0; x < width; x += 15) {
            for (let y = 0; y < height; y += 15) {
                const _color = data32[y * width + x];
                if (_color !== 0xFF000000) particles.push({ x, y });
            }
        }
    }
    const render = () => {
        if (context === null) {
            return;
        }
        let old = time;
        time = performance.now();
        const delta = time - old;
        accumulator += delta / 100;
        context.clearRect(0, 0, width, height);
        context.fillStyle = "#FF000000";
        context.fillRect(0, 0, width, height);
        const color = `hsl(${Math.sin(accumulator / 200) * 360},100%,50%)`;
        context.fillStyle = color;
        //  let dX = 3 * cosTable[Math.floor(i * 14 + accumulator * 20) % precision]; //Math.cos(i*14+accum)
        //let dY = 3 * sinTable[Math.floor(((i * 20 + accumulator * 20) % precision))];//          Math.sin(i * 20 + accumulator);
        for (let i = 0; i < particles.length; i++) {
            const length = Math.sqrt(Math.pow(mouseX - particles[i].x, 2) + Math.pow(mouseY - particles[i].y, 2));
            let dX = (mouseX - particles[i].x) * 15.0 / length + 3 * cosTable[Math.floor(i * 14 + accumulator * 20) % precision];
            let dY = (mouseY - particles[i].y) * 15.0 / length + 3 * sinTable[Math.floor(((i * 20 + accumulator * 20) % precision))];
            const finalX = particles[i].x + dX;
            const finalY = particles[i].y + dY;
            const radius = 7 * (Math.abs(sinTable[Math.floor((i * 200 + accumulator * 5) % precision)]));
            context.beginPath();
            context.arc(
                finalX,
                finalY,
                radius,
                0, 2 * Math.PI,
                false);
            context.fill();
        }
        requestAnimationFrame(render);
    }
    const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }
    return (
        <canvas className="canvas404" ref={canvas} width={width} height={height} onMouseMove={onMouseMove}>

        </canvas>
    );
}
export default ErrorView;