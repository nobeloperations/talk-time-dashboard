window.onload = async function () {


    let nameEl = document.querySelector('.username')
    let name = nameEl.textContent;

    let urlEl = document.querySelector('.url')
    let url = urlEl.textContent;

    let dateEl = document.querySelector('.date')
    let date = dateEl.textContent;

    function groupAverage(arr) {
        let result = [];
        for (let i = 0; i < arr.length;) {
            let sum = 0;
            for (let j = 0; j < 8; j++) {
                sum += +arr[i++] || 0;
            }
            result.push(sum / 4);
        }
        return result.map((item) => Math.round(item));
    }

    let arr = []

    navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false
    })
        .then(function (stream) {
            const audioContext = new AudioContext();
            const analyser = audioContext.createAnalyser();
            const microphone = audioContext.createMediaStreamSource(stream);
            const scriptProcessor = audioContext.createScriptProcessor(2048, 1, 1);

            analyser.smoothingTimeConstant = 0.8;
            analyser.fftSize = 1024;

            microphone.connect(analyser);
            analyser.connect(scriptProcessor);
            scriptProcessor.connect(audioContext.destination);
            scriptProcessor.onaudioprocess = function () {
                const array = new Uint8Array(analyser.frequencyBinCount);
                analyser.getByteFrequencyData(array);
                const arraySum = array.reduce((a, value) => a + value, 0);
                const average = arraySum / array.length;
                arr.push(Math.round(average) * 100)
            };
            let res;
            let av = []
            setInterval(() => {
                arr.forEach(item => {
                    let sum = 0;
                    sum += item;
                    res = Math.round(sum / (arr.length / 2));
                })
                av.push(res)
                document.querySelector('.ending__meet__button').onclick = function () {
                    this.disabled = true;
                    let averageArray = groupAverage(av)
                    fetch(`/audio/vad/${url}/${name}/${date}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            array: averageArray
                        })
                    })
                }
            }, 1000)
        })
        .catch(function (err) {
            console.error(err);
        });
}