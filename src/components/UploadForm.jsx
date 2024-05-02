import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import {resizeImage } from '../utils';

const UploadForm = () => {
	const canvasRef = useRef(null);
	const [selectedVowel, setSelectedVowel] = useState('');
	const [, setCanvasContext] = useState(null);
	const [isDrawing, setIsDrawing] = useState(false);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (canvas) {
			const context = canvas.getContext('2d');
			context.lineWidth = 5;
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
        context.lineWidth = 10;
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
        const resizedImage = await resizeImage(canvas, 100, 100); // Redimensionar a 200x200 px
    
        // Convertir base64 a Blob
        const response = await fetch(resizedImage);
        const blob = await response.blob();
    
        // Usar FormData para enviar el archivo
        const formData = new FormData();
        formData.append('image', blob, 'upload.png'); // Añade un nombre al archivo
        formData.append('subfolder', selectedVowel);
    
        try {
            const response = await axios.post('http://localhost:5000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Esto es necesario para el correcto procesamiento en el servidor
                }
            });
            console.log(response.data);
            alert('Imagen guardad exitosamente');
        } catch (error) {
            console.error('Error al cargar la imagen:', error);
            alert('Hubo un error al cargar la imagen');
        }
    };

	const handleReset = () => {
		const canvas = canvasRef.current;
		const context = canvas.getContext('2d');
		context.clearRect(0, 0, canvas.width, canvas.height);
	};

	return (
		<section className="flex flex-col gap-4">
			<h2 className="text-2xl">Cargar una vocal al modelo</h2>
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
				<button className="bg-gray-500 text-white px-6 py-2 rounded-sm w-fit ml-2" onClick={handleReset}>
					Limpiar
				</button>
				<button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded" onClick={handleUpload}>
					Guardar Imagen
				</button>
			</div>
		</section>
	);
};

export default UploadForm;
