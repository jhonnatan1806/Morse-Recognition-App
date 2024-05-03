// export const resizeImage = async (canvas, width, height) => {
//     // Crear un nuevo canvas
//     const offscreenCanvas = document.createElement('canvas');
//     offscreenCanvas.width = width;
//     offscreenCanvas.height = height;

//     // Dibujar la imagen original en el nuevo canvas con redimensionamiento
//     const ctx = offscreenCanvas.getContext('2d');
//     ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, width, height);

//     // Retornar la nueva imagen en base64
//     return offscreenCanvas.toDataURL('image/png');
// };

export const resizeImage = (image, width, height) => {
    return new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Set the canvas dimensions to the desired width and height
        canvas.width = width;
        canvas.height = height;

        // Draw the image on the canvas
        ctx.drawImage(image, 0, 0, width, height);

        // Get the base64 representation of the resized image
        const base64Image = canvas.toDataURL('image/png');

        // Resolve with the resized image
        resolve(base64Image);
    });
};