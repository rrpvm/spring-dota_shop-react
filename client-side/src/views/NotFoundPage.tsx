import { useEffect } from 'react';
import { useRef } from 'react';
import '../styles/404.css'
const NotFoundPage: React.FC = () => {
    const width = 1280;
    const height = 720;
    const canvas = useRef<HTMLCanvasElement | null>(null);
    let context: CanvasRenderingContext2D | null = null;
    let particles: { x: number, y: number }[] = [];
    let time: number = 0;
    let accumulator: number = 0;
    useEffect(() => {
        if (canvas === null) return;
        if (canvas.current === null) return;
        context = canvas.current?.getContext('2d');
        if (context === null) return;
        initialize(context);
    }, []);
    const initialize = (ctx: CanvasRenderingContext2D) => {
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = "#ffffff";
        const fontSize = Math.min(width, height) / 2;
        ctx.font = `${fontSize}px Arial`;
        ctx.textAlign = 'center';
        ctx.fillText('404', width / 2, height / 2 + fontSize / 4);
        const data = ctx.getImageData(0, 0, width, height).data;
        const data32 = new Uint32Array(data.buffer);
        for (let x = 0; x < width; x += 5) {
            for (let y = 0; y < height; y += 5) {
                const _color = data32[y * width + x];
                if (_color !== 0xFF000000) particles.push({ x, y });
            }
        }
        render();
    }
    const render = () => {
        if (context === null) return;
        let old = time;
        time = performance.now();
        const delta = time - old;
        accumulator += delta/100;
        context.clearRect(0, 0, width, height);
        context.fillStyle = "#FF000000";
        context.fillRect(0, 0, width, height);

       
        for (let i = 0; i < particles.length; i++) {
            const color = `hsl(${Math.sin(accumulator/1000+i)*360},100%,50%)`;
            context.fillStyle = color;
            const dX = (4 / 10) * Math.cos(i * 14 + accumulator);
            const dY = (4 / 10) * Math.sin(i * 20 + accumulator);
            const radius = 4 * Math.abs(Math.sin(i + accumulator/3));
            context.beginPath();
            context.arc(
                particles[i].x + dX,
                particles[i].y + dY,
                radius,
                0, 2 * Math.PI,
                false);
            context.fill();
        }
        requestAnimationFrame(render);
    }
    return (
        <canvas className="canvas404" ref={canvas} width={width} height={height}>

        </canvas>
    );
}
export default NotFoundPage;