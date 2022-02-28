var isInitialized = false;
var audioctx, buffer, arraybuffer;
var src;
var DistortionFactor;
var VU;
var ctx;
var ReadFlag;
var audio;
audio = document.createElement('audio');
var source;
window.AudioContext = window.AudioContext || window.webkitAudioContext;
// Create the instance of AudioContext
// var context = new AudioContext();
//音声読込部
window.addEventListener('load', (event) =>{
    SoundRead();
});
function SoundRead(){
    //File Uploader
    document.getElementById('UploadIconInput').addEventListener('change', event => {
        InputTypeFile();
    }, false);
    document.getElementById('WaveSelectInput').addEventListener('change', event => {
        InputTypeFile();
    }, false);
    function InputTypeFile(){
        var uploader = this;
    
        // Get the instance of File (extends Blob)
        var file = event.target.files[0];
    
        if (!(file instanceof File)) {
            window.alert('Please upload file.');
        } else if (file.type.indexOf('audio') === -1) {
            window.alert('Please upload audio file.');
        } else {
            // Create the instance of FileReader
            var reader = new FileReader();
            
            let WaveText = document.getElementById('WaveText');
            reader.onprogress = function(event) {
                if (event.lengthComputable && (event.total > 0)) {
                    var rate = Math.floor((event.loaded / event.total) * 100);
                    // WaveText.textContent = rate + ' %';
                }
            };
    
            reader.onerror = function() {
                window.alert('FileReader Error : Error code is ' + reader.error.code);
                uploader.value = '';
            };
    
            // Success read
            reader.onload = function() {                
                arraybuffer = reader.result;  // Get ArrayBuffer 波形描画用
                // audio.src = URL.createObjectURL(document.getElementsByID(InputSelect).files[0]);
                audio.src = URL.createObjectURL(file);
                if(PlayIcon.getAttribute('name') === 'pause-outline'){
                    PlayIcon.setAttribute('name', 'play-outline');
                };
                // audio.src = URL.createObjectURL(document.getElementsByTagName('input')[InputSelect].files[0]);
                // displayProperties(file,        'file-properties',        'File (extends Blob)');
                // displayProperties(arrayBuffer, 'arraybuffer-properties', 'ArrayBuffer');
                ReadFlag = true;
                // WaveText.textContent = file.name;
                uploader.value = '';
                if(!isInitialized){
                    Init();
                };
                WaveDraw();
            };
    
            // Read the instance of File
            reader.readAsArrayBuffer(file);
        }
    };

    //Drag & Drop
    document.getElementById('Wave').addEventListener('dragenter', function(event) {
        event.preventDefault();
    }, false);
    
    document.getElementById('Wave').addEventListener('dragover', function(event) {
        event.preventDefault();
        document.getElementById('Wave').classList.add('WaveDragover');
    }, false);

    document.getElementById('Wave').addEventListener('dragleave', function(event) {
        event.preventDefault();
        document.getElementById('Wave').classList.remove('WaveDragover');
    }, false);

    document.getElementById('Wave').addEventListener('drop', function(event) {
        event.preventDefault();
        document.getElementById('Wave').classList.remove('WaveDragover');

        // Get the instance of File (extends Blob)
        var file = /*('items' in event.dataTransfer) ? event.dataTransfer.items[0].getAsFile() : */event.dataTransfer.files[0];

        if (!(file instanceof Blob)) {
            window.alert('Please upload file.');
        } else if (file.type.indexOf('audio') === -1) {
            window.alert('Please upload audio file.');
        } else {
            // Create the instance of FileReader
            var reader = new FileReader();

            reader.onprogress = function(event) {
                if (event.lengthComputable && (event.total > 0)) {
                    var rate = Math.floor((event.loaded / event.total) * 100);
                    // document.getElementById('WaveText').textContent = rate + ' %';
                }
            };

            reader.onerror = function() {
                window.alert('FileReader Error : Error code is ' + reader.error.code);
            };

            // Success read
            reader.onload = function() {
                arraybuffer = reader.result;  // Get ArrayBuffer 波形描画用
                audio.src = URL.createObjectURL(file);
                if(PlayIcon.getAttribute('name') === 'pause-outline'){
                    PlayIcon.setAttribute('name', 'play-outline');
                };
                // displayProperties(file,        'file-properties',        'File (extends Blob)');
                // displayProperties(arrayBuffer, 'arraybuffer-properties', 'ArrayBuffer');
                ReadFlag = true;
                // document.getElementById('WaveText').textContent = file.name;
                if(!isInitialized){
                    Init();
                };
                WaveDraw();
            };

            // Read the instance of File
            reader.readAsArrayBuffer(file);
        }
    }, false);

    let PlayIcon = document.getElementById('PlayIcon');
    PlayIcon.addEventListener('click', ()=>{
        if(ReadFlag === true){
            if(PlayIcon.getAttribute('name') === 'play-outline'){
                // Play();
                if(!isInitialized){
                    Init();
                }
                audio.play();
                PlayIcon.setAttribute('name', 'pause-outline');
            }else{
                // Stop();
                audio.pause();
                PlayIcon.setAttribute('name', 'play-outline');
            }
        };
    });
};

// 音声処理部
async function Init(){
    audioctx = new AudioContext();
    // buffer = await audioctx.decodeAudioData(arraybuffer);
    const HeaderPlayBack = document.getElementById('HeaderPlayBack');
    HeaderPlayBack.appendChild(audio);
    
    // Create the instance of MediaElementAudioSourceNode
    console.log('hi');
    source = audioctx.createMediaElementSource(audio);

    // audio.addEventListener('loadstart', function() {
    // }, false);
    await audioctx.audioWorklet.addModule("js/overdrive-proc.js");
    DistortionFactor = new AudioWorkletNode(audioctx,"OverDrive");
    DistortionFactor.drive = DistortionFactor.parameters.get("drive");
    
    vol = new GainNode(audioctx,{gain:0.5});
    VU = new AnalyserNode(audioctx);
    // src = new AudioBufferSourceNode(audioctx, {buffer:buffer, loop:true});
    // src.connect(overdrive).connect(vol).connect(analyser).connect(audioctx.destination);
    // src.connect(vol).connect(analyser).connect(audioctx.destination);
    // src.connect(vol).connect(audioctx.destination);
    //ctx = document.getElementById("graph").getContext("2d");
    Setup();
    //setInterval(DrawGraph, 100);

    // src.start();
    source.connect(DistortionFactor).connect(vol).connect(VU).connect(audioctx.destination);
    isInitialized = true;
};

function Setup() {
    if(!isInitialized)
        return;
    // console.log(volume);
    var driveval = dist/100;
    // document.getElementById("drivedisp").innerHTML = driveval;
    DistortionFactor.drive.value = driveval;
    var volval = volume/100;
    // document.getElementById("voldisp").innerHTML = volval;
    vol.gain.value = volval;
};

// For VU
var wavdata = new Uint8Array(256);
let DecimalVU = 1;
function DrawVU() {
    if(!isInitialized)
         return;
    VU.getByteTimeDomainData(wavdata);
    // ctx.fillStyle = "#000000";
    // ctx.fillRect(0, 0, 256, 256);
    // ctx.fillStyle = "#00f022";
    // console.log(wavdata[0]);

    for(var i = 0; i < 256; ++i) {
        // d = 128 - wavdata[i];
        // ctx.fillRect(i, 128, 1, d);
        DecimalVU += ((Math.abs(50 - (wavdata[i] / 255 * 100)) * 2)*2  - DecimalVU)/ 5000;
        vu = Math.floor(DecimalVU);
        if(vu < 1)
            vu = 1;
        //DigitalDistortionDisplay.js
        if(onoff)
            drawDDUIvu();
    };
};
var intervalid = window.setInterval(function(){
    DrawVU();
    if(isInitialized){
        // console.log(audio.currentTime);
        // console.log(audio.duration);
        // console.log(Wave.clientWidth * audio.currentTime / audio.duration);
        WaveCurrentTimeDiv.style.width = Wave.clientWidth * audio.currentTime / audio.duration + 'px';
    }
    if(HeaderChangeFlag === true){
        // WaveCanvas.setAttribute('width', Wave.clientWidth + 'px');
        // WaveCanvas.setAttribute('height', Wave.clientHeight + 'px');
        // WaveCanvas.style.transform = 'scale(Wave.clientWidth/WaveCanvas.clientWidth, Wave.clientHeight/WaveCanvas.clientHeight)';
        setTimeout(function(){
            WaveCanvas.style.width = Wave.clientWidth + 'px';
            WaveCanvas.style.height = Wave.clientHeight + 'px';
            WaveCurrentTimeDiv.style.height = Wave.clientHeight + 'px';
        },500);
    };
}, 1);

// For wave
const WaveCanvas = document.createElement('canvas');
WaveCanvas.setAttribute('id', 'WaveCanvas');
WaveCanvas.setAttribute('draggable', 'false');
const WaveCurrentTimeDiv = document.createElement('div');
WaveCurrentTimeDiv.setAttribute('id', 'WaveCurrentTimeDiv');
WaveCurrentTimeDiv.setAttribute('draggable', 'false');

window.addEventListener('load', () =>{
    WaveCanvas.setAttribute('width', Wave.clientWidth + 'px');
    WaveCanvas.setAttribute('height', Wave.clientHeight + 'px');
    // WaveCurrentTimeDiv.style.width = Wave.clientWidth/2 + 'px';
    WaveCurrentTimeDiv.style.height = Wave.clientHeight + 'px';
    // WaveDiv.appendChild(WaveMouseTime);
    WaveMouseTime.style.width = 0 + 'px';
    WaveMouseTime.style.height = Wave.clientHeight + 'px';
    WaveMouseTime.style.top = 0 + 'px';
    WaveMouseTime.style.left = 0 + 'px';
});

window.addEventListener('resize', () =>{
    window.setTimeout(function(){
        if(!ReadFlag){
            WaveCanvas.setAttribute('width', Wave.clientWidth + 'px');
            WaveCanvas.setAttribute('height', Wave.clientHeight + 'px');
            // WaveCurrentTimeDiv.style.width = Wave.clientWidth/2 + 'px';
            WaveCurrentTimeDiv.style.height = Wave.clientHeight + 'px';
            console.log(WaveCanvas.clientWidth, Wave.clientWidth);
        }else{
            WaveCanvas.style.width = Wave.clientWidth + 'px';
            WaveCanvas.style.height = Wave.clientHeight + 'px';
            // WaveCurrentTimeDiv.style.width = Wave.clientWidth/2 + 'px';
            WaveCurrentTimeDiv.style.height = Wave.clientHeight + 'px';
        };
    },500);
});
function WaveDraw(){
    if(!ReadFlag)
        return;
    // const WaveText = document.getElementById('WaveText');
    // WaveText.remove();
    // const WaveSelect = document.getElementById('WaveSelect');
    // WaveSelect.remove();
    const WaveSelectInput = document.getElementById('WaveSelectInput');
    if(WaveSelectInput != null){
        WaveSelectInput.remove();
    };
    const Wave = document.getElementById('Wave');
    while(Wave.firstChild){
        Wave.removeChild(Wave.firstChild);
    };
    Wave.style.borderStyle = 'none';
    Wave.style.borderRadius = '0px';
    Wave.style.opacity = '60%';
    Wave.appendChild(WaveCanvas);
    const WaveDiv = document.getElementById('WaveDiv');
    WaveDiv.appendChild(WaveCurrentTimeDiv);

    var context = new AudioContext();
    if (arraybuffer instanceof ArrayBuffer) {
        // The 2nd argument for decodeAudioData
        var successCallback = function(audioBuffer) {
            // Get audio binary data for drawing wave
            var channelLs = new Float32Array(audioBuffer.length);
            var channelRs = new Float32Array(audioBuffer.length);
            // Stereo ?
            if (audioBuffer.numberOfChannels > 1) {
                channelLs.set(audioBuffer.getChannelData(0));
                channelRs.set(audioBuffer.getChannelData(1));
            } else if (audioBuffer.numberOfChannels > 0) {
                channelLs.set(audioBuffer.getChannelData(0));
            } else {
                window.alert('The number of channels is invalid.');
                return;
            }
            
            var WaveCanvasContext = WaveCanvas.getContext('2d');

            var width = Wave.clientWidth;
            var height = Wave.clientHeight;
            console.log(WaveCanvas.width);
            console.log(WaveCanvas.height);
            console.log(Wave.clientWidth);
            console.log(Wave.clientHeight);

            // Sampling period
            var period = 1 / context.sampleRate;
            // This value is the number of samples during 50 msec
            var n50msec = Math.floor(20 * Math.pow(10, -3) * context.sampleRate);
            // Clear previous data
            WaveCanvasContext.clearRect(0, 0, width, height);

            // Draw audio wave
            WaveCanvasContext.beginPath();
            WaveCanvasContext.strokeStyle = "rgba(255, 255, 255, 1.0)";
            WaveCanvasContext.lineWidth = 0.5;
            WaveCanvasContext.lineCap = 'round';
            WaveCanvasContext.lineJoin = 'miter';

            for (var i = 0, len = channelLs.length; i < len; i++) {
                // 50 msec ?
                if((i % n50msec) === 0){
                    var x = (i / len) * width;
                    var y = ((1 - channelLs[i]) / 2) * height;
                    if (i === 0) {
                        WaveCanvasContext.moveTo(x, y);
                    } else {
                        WaveCanvasContext.lineTo(x, y);
                    }
                }
            };
            WaveCanvasContext.stroke();
        };
        // The 3rd argument for decodeAudioData
        var errorCallback = function(error) {
            /* do something for error .... */
        };

        context.decodeAudioData(arraybuffer, successCallback, errorCallback);
        
    };
};

// For audio play
audio.addEventListener("ended", () =>{
    audio.currentTime = 0;
    // audio.pause();
    PlayIcon.setAttribute('name', 'play-outline');
});
// 再生時間の変更
WaveCanvas.addEventListener('click', (e) =>{
    TimeSet(e.offsetX);
});
WaveCurrentTimeDiv.addEventListener('click', (e) =>{
    TimeSet(e.offsetX);
});
function TimeSet(X){
    audio.currentTime = audio.duration * X / Wave.clientWidth;
};
// マウス位置描画
const WaveMouseTime = document.createElement('div');
WaveMouseTime.setAttribute('class', 'WaveMouseTime');
WaveCanvas.addEventListener('mouseenter', (e) =>{
    // WaveMouseTimeMouseenter(e);
});
WaveCurrentTimeDiv.addEventListener('mouseenter', (e) =>{
    // WaveMouseTimeMouseenter(e);
});
function WaveMouseTimeMouseenter(e){
    
};
WaveCanvas.addEventListener('mouseover', (e) =>{
    // WaveCanvas.appendChild(WaveMouseTime);
    // WaveMouseTimeMouseenter(e);
});
WaveCurrentTimeDiv.addEventListener('mouseover', (e) =>{
    // WaveCurrentTimeDiv.appendChild(WaveMouseTime);
    // WaveMouseTimeMouseenter(e);
});
function WaveMouseTimeMouseover(e){
    // WaveMouseTime.style.left = e.offsetX + 'px';
};
WaveCanvas.addEventListener('mouseleave', (e) =>{
    // WaveCanvas.removeChild(WaveMouseTime);
    // WaveMouseTimeMouseleave(e);
});
WaveCurrentTimeDiv.addEventListener('mouseleave', (e) =>{
    // WaveCurrentTimeDiv.removeChild(WaveMouseTime);
    // WaveMouseTimeMouseleave(e);
});
function WaveMouseTimeMouseleave(e){
}
WaveDiv.addEventListener('mouseover', (e)=>{
    WaveMouseTime.classList.add('WaveMouseTimeOver');
    WaveMouseTime.style.transform = 'translate(' + e.offsetX + 'px)';
})
WaveDiv.addEventListener('mousemove', (e) =>{
    // WaveMouseTime.classList.add('WaveMouseTimeOver');
    WaveMouseTime.style.transform = 'translate(' + e.offsetX + 'px)';
})
WaveDiv.addEventListener('mouseleave', (e)=>{
    WaveMouseTime.classList.remove('WaveMouseTimeOver');
})
// 参考 https://takamints.hatenablog.jp/entry/mouseenter-vs-mouseover