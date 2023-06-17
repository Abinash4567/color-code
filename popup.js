const btn = document.querySelector('.changeColorBtn');
const colorGrid = document.querySelector('.colorGrid');
const colorValue = document.querySelector('.colorValue');

btn.addEventListener('click', async () => {

    chrome.storage.sync.get('color', ({ color }) => {
        console.log('color: ', color);
    });


    // chrome API to get tab information
    //tab array consists of information from API      useful tab id
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript(        //requires permission in manifest
        {                                  //execute script in website 
            target: { tabId: tab.id },     //tab id in which script works
            function: pickColor,
        },


        async (injectionResults) => {          //Scripting function return value
            const [data] = injectionResults;   //array to  store returned value


            if (data.result)                  //result is null when pressed escape
            {
            var colour = data.result.sRGBHex;

            var rgba=colour, forceRemoveAlpha=true;
            var ans="#" + rgba.replace(/^rgba?\(|\s+|\)$/g, '')           // Get's rgba / rgb string values
            .split(',')                                                   // splits them at ","
            .filter((string, index) => !forceRemoveAlpha || index !== 3)
            .map(string => parseFloat(string))                                 // Converts them to numbers
            .map((number, index) => index === 3 ? Math.round(number * 255) : number) // Converts alpha to 255 number
            .map(number => number.toString(16))            // Converts numbers to hex
            .map(string => string.length === 1 ? "0" + string : string)       // Adds 0 when length of one number is 1
            .join("");                                         // Puts the array to togehter to a string




            colorGrid.style.backgroundColor = ans; 
            colorValue.innerText = ans;

            try 
            {
                await navigator.clipboard.writeText(ans);        
            } 
            catch (err) 
            {
                console.error(err);
            }
            }
        }
    );
});






//works in website
async function pickColor() {
    
    try 
    {
        const eyeDropper = new EyeDropper();     //Available in Edge, Chrome, Opera   
        return await eyeDropper.open();      //returns color from eyedropper
    } 

    catch (err) 
    {
        console.error(err);
    }
}