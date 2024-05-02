export const resizeImage = async (canvas, width, height) => {
    // Crear un nuevo canvas
    const offscreenCanvas = document.createElement('canvas');
    offscreenCanvas.width = width;
    offscreenCanvas.height = height;

    // Dibujar la imagen original en el nuevo canvas con redimensionamiento
    const ctx = offscreenCanvas.getContext('2d');
    ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, width, height);

    // Retornar la nueva imagen en base64
    return offscreenCanvas.toDataURL('image/png');
};