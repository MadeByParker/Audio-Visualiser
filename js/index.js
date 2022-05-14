(function() {

    const number_of_bars = 25;
    
    const audio = document.querySelector("audio");
    myfile.onchange = function(){
        var files = this.files;
        const file = URL.createObjectURL(files[0]);
        audio.setAttribute("src", file);
    };

    //creates an audio constant API
    const ctx = new AudioContext();

    // Creating an audio source
    const audioSource = ctx.createMediaElementSource(audio);

    //Create analyser
    const analyser = ctx.createAnalyser();

    //connect source to analyser and back to destination
    audioSource.connect(analyser);
    audioSource.connect(ctx.destination);

    // Print out frequencies
    const frequencyData = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(frequencyData);
    console.log("frequencyData", frequencyData);

    //get container 
    const container = document.querySelector(".visualiser-container");


    //create frequency bars
    for (let i = 0; i < number_of_bars; i++){
        const bar = document.createElement("div");
        bar.setAttribute("id", "bar" + i);
        bar.setAttribute("class", "visualiser-container-bar");
        container.appendChild(bar);

    }

    //update frequency bars and render them
    function renderFrame(){
        
        analyser.getByteFrequencyData(frequencyData);

        for( let i = 0; i < number_of_bars; i++){

            const index = (i + 10) * 4;
            const frequency = frequencyData[index];

            const bar = document.querySelector("#bar" + i);
            if (!bar){
                continue;
            }

            const barHeight = Math.max(4, frequency || 0);
            bar.style.height = (barHeight) + "px";

        }
        window.requestAnimationFrame(renderFrame)
    }

    renderFrame();

    audio.volume = 0.10;
    audio.play();

})();