/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useRef } from 'react';
import '../style/views/404error.css'
const AlternativeLaodPage: React.FC = () => {
    let width = window.innerWidth;
    let height = window.innerHeight;
    const max_dots = 85;
    const connect_distance = 150;
    const canvas = useRef<HTMLCanvasElement | null>(null);
    let context: CanvasRenderingContext2D | null = (null);
    let particles: { x: number, y: number, vX: number, vY: number, connected: number[] }[] = [];
    let time: number = 0;
    useEffect(() => {
        if (canvas === null) return;
        if (canvas.current === null) return;
        particles = [];
        context = canvas.current.getContext('2d');

    }, []);
    useEffect(() => {
        if (context === null) return;
        initialize(context);
        render();
    }, [context]);
    const initialize = (ctx: CanvasRenderingContext2D) => {
        for (let x = 0; x < width; x += (width / max_dots + height / max_dots) * 6) {
            for (let y = 0; y < height; y += height / max_dots) {
                if (Math.random() >= 0.95) {
                    if (particles.length > max_dots) break;
                    let vX = ((Math.random() * 100) - 50);
                    let vY = ((Math.random() * 100) - 50);
                    while (vX === 0) { vX = ((Math.random() * 100) - 50); }
                    while (vY === 0) { vY = ((Math.random() * 100) - 50); }
                    vX /= 5;
                    vY /= 5;
                    particles.push({ x, y, vX, vY, connected: [] });
                }
            }
        }
    }
    const render = () => {
        if (context === null) {
            return;
        }
        let old = time;
        time = performance.now();
        const delta = (time - old) / 150;
        context.clearRect(0, 0, width, height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].connected = [];
        }
        for (let i = 0; i < particles.length; i++) {
            particles[i].x += particles[i].vX * delta;
            particles[i].y += particles[i].vY * delta;
            if (particles[i].x < 0 || particles[i].x > width) {
                particles[i].vX *= -1;
                particles[i].x += (particles[i].x > width ? -3 : 3);
            }
            if (particles[i].y < 0 || particles[i].y > height) {
                particles[i].vY *= -1;
                particles[i].y += (particles[i].y > height ? -3 : 3);
            }
            for (let j = i; j < particles.length; j++) {
                if (i === j) continue;
                if (Math.sqrt(Math.pow(particles[i].x - particles[j].x, 2) + Math.pow(particles[i].y - particles[j].y, 2)) < connect_distance) {
                    if (particles[i].connected.filter(_i => _i === j).length === 0)
                        particles[i].connected.push(j);
                    if (particles[j].connected.filter(_j => _j === i).length === 0)
                        particles[j].connected.push(i);
                }
            }
        }
        context.lineWidth = 1;
        context.strokeStyle = "#FFFFFFDD";
        for (let i = 0; i < particles.length; i++) {
            context.fillStyle = particles[i].connected.length === 0 ? "#FFFFFF50" : "#00FFFFFF";

            context.beginPath();
            context.arc(particles[i].x, particles[i].y, 5, 0, 2 * Math.PI);
            context.fill();
            context.beginPath();
            for (let j = 0; j < particles[i].connected.length; j++) {
                const particle: { x: number, y: number, vX: number, vY: number, connected: number[] } = particles[particles[i].connected[j]];
                context.moveTo(particles[i].x, particles[i].y);
                context.lineTo(particle.x, particle.y);
                context.stroke();
            }

        }

        requestAnimationFrame(render);
    }
    return (
        <canvas className="canvas_load" style={{position:"absolute", background:"#131313"}} ref={canvas} width={width} height={height}>

        </canvas>
    );
}
export default AlternativeLaodPage;