import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { resizeImage } from '../utils';

const UploadForm = () => {
	const canvasRef = useRef(null);
	const [selectedVowel, setSelectedVowel] = useState('');
	const [, setCanvasContext] = useState(null);
	const [isDrawing, setIsDrawing] = useState(false);
	const [uploadLoading, setUploadLoading] = useState(false);

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

	const handleVowelChange = (event) => {
		setSelectedVowel(event.target.value);
	};

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

	const handleUpload = async () => {
		if (!selectedVowel) {
			alert('Por favor selecciona una vocal');
			return;
		}

		const canvas = canvasRef.current;

		// Convertir la imagen redimensionada a base64
		const base64Image = await resizeImage(canvas, 200, 200);

		try {
			setUploadLoading(true);
			const response = await axios.post('https://morse-recognition-backend.fly.dev/upload', {
				image: base64Image,
				subfolder: selectedVowel,
			});
			console.log(response.data);
			alert('Imagen cargada exitosamente');
			handleReset();
			setUploadLoading(false);
		} catch (error) {
			console.error('Error al cargar la imagen:', error);
			alert('Hubo un error al cargar la imagen en el servidor');
			setUploadLoading(false);
		}
	};

	const handleReset = () => {
		const canvas = canvasRef.current;
		const context = canvas.getContext('2d');
		context.clearRect(0, 0, canvas.width, canvas.height);
	};

	return (
		<section className="container flex flex-col gap-4">
			<h2 className="text-lg">Cargar una vocal al modelo</h2>
			<div className="flex gap-4 items-center">
				<label htmlFor="vowel">Seleccione una vocal:</label>
				<select
					id="vowel"
					value={selectedVowel}
					onChange={handleVowelChange}
					className="border-gray-200 px-4 py-1 border rounded-sm grow">
					<option value="">Seleccione una vocal</option>
					<option value="A">A</option>
					<option value="E">E</option>
					<option value="I">I</option>
					<option value="O">O</option>
					<option value="U">U</option>
				</select>
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
				<button
					className="bg-gray-500 hover:bg-gray-700 text-white px-6 py-2 rounded-sm w-fit ml-2"
					onClick={handleReset}>
					Limpiar
				</button>
				<button
					className={`bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded ${
						uploadLoading ? 'opacity-50 cursor-not-allowed' : ''
					}`}
					onClick={handleUpload}>
					{uploadLoading ? 'Subiendo...' : 'Subir Imagen'}
				</button>
			</div>
		</section>
	);
};

export default UploadForm;
