import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import {resizeImage } from '../utils';

const TestModel = () => {
	const canvasRef = useRef(null);
	const [, setCanvasContext] = useState(null);
	const [isDrawing, setIsDrawing] = useState(false);
    const [data, setData] = useState(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (canvas) {
			const context = canvas.getContext('2d');
			context.lineWidth = 10;
			context.lineCap = 'round';
			context.strokeStyle = 'black';
			setCanvasContext(context);
		}
	}, []);

	const startDrawing = (event) => {
		setIsDrawing(true);
		const canvas = canvasRef.current;
		const context = canvas.getContext('2d');
		context.beginPath();
		context.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
	};

	const finishDrawing = () => {
		setIsDrawing(false);
	};

	const draw = (event) => {
		if (!isDrawing) return;
		const canvas = canvasRef.current;
		const context = canvas.getContext('2d');
		context.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
		context.stroke();
	};

	const handlePredict = async () => {

        const canvas = canvasRef.current;

        const base64Image = await resizeImage(canvas, 200, 200);

        try {
            // Enviar la imagen en base64 al servidor
            const response = await axios.post('http://localhost:5000/predict', {
                image: base64Image,
            });
            console.log(response.data);
            setData(response.data);
            alert('Imagen cargada exitosamente');
            handleReset();
        } catch (error) {
            console.error('Error al cargar la imagen:', error);
            alert('Hubo un error al cargar la imagen en el servidor');
        }
    };

	const handleReset = () => {
		const canvas = canvasRef.current;
		const context = canvas.getContext('2d');
		context.clearRect(0, 0, canvas.width, canvas.height);
	};

	return (
		<section className="container flex flex-col gap-4">
			<h1 className="text-lg">Dibujar una vocal en código morse</h1>
            <div>
                <h2 className='text-base'>Vocal dibujada: {data !== null ? data.letter : ''}</h2>
                <h3 className='text-base'>Exactitud: {data !== null ? Math.max(... data.prediction):'' }</h3>
            </div>
			<div>
				<canvas
					ref={canvasRef}
					width={400}
					height={400}
					style={{ border: '1px solid black' }}
					onMouseDown={startDrawing}
					onMouseUp={finishDrawing}
					onMouseMove={draw}
				/>
			</div>
			<div className="flex gap-4">
				<button className="bg-gray-500 hover:bg-gray-700 text-white px-6 py-2 rounded-sm w-fit ml-2" onClick={handleReset}>
					Limpiar
				</button>
				<button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded" onClick={handlePredict}>
					Enviar Imagen
				</button>
			</div>
		</section>
	);
};

export default TestModel;
