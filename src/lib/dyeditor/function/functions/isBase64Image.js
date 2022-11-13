export default function isBase64Image(imgEl) {
    const imgSrc = imgEl.src;
    if(imgSrc.substr(0, 11) === "data:image/") {
        const idx = imgSrc.indexOf(';');
        if(idx === -1) return false;
        if(imgSrc.substr(idx + 1, 6) === "base64") return true;
    }
    return false;
};