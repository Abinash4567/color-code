const btn = document.querySelector('.changeColorBtn');
const grid = document.querySelector('.colorGrid');
const value = document.querySelector('.colorValue');

btn.addEventListener('click', async () => {
    try {
        const eyeDropper = new EyeDropper();
        const result = await eyeDropper.open();
        console.log(result.sRGBHex);
        grid.style.backgroundColor = result.sRGBHex;
        value.textContent = result.sRGBHex;
        await navigator.clipboard.writeText(result.sRGBHex)
    }
    catch (err) {
        console.error('Error picking color:', err);
    }
});