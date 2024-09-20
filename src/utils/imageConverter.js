const heicConvert = require('heic-convert');

const heicToJpegConverter = async (imageFile) => {
    try {
        const outputBuffer = await heicConvert({
            buffer: imageFile,
            format: 'JPEG',
            quality: 1
        });
        return outputBuffer;
    } catch (err) {
        console.error(err);
    }
}