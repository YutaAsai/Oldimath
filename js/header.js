let HeaderMenuH;
let HeaderChangeFlag = false;

let HeaderH;
let HeaderMenuW;
//要素追加
const HeaderBackGround = document.createElement('div');
HeaderBackGround.setAttribute('ID', 'HeaderBackGround');
HeaderBackGround.setAttribute('draggable', 'false');
const HeaderMenu = document.createElement('div');
HeaderMenu.setAttribute('ID', 'HeaderMenu');
HeaderMenu.setAttribute('draggable', 'false');
const HeaderLogo = document.createElement('div');
HeaderLogo.setAttribute('ID', 'HeaderLogo');
HeaderLogo.setAttribute('draggable', 'false');
const HeaderAction = document.createElement('div');
HeaderAction.setAttribute('ID', 'HeaderAction');
HeaderAction.setAttribute('draggable', 'false');
const HeaderPlayBack = document.createElement('div');
HeaderPlayBack.setAttribute('ID', 'HeaderPlayBack');
HeaderPlayBack.setAttribute('draggable', 'false');
const PlayIcon = document.createElement('ion-icon');
PlayIcon.setAttribute('ID', 'PlayIcon');
PlayIcon.setAttribute('name', 'play-outline')
PlayIcon.setAttribute('draggable', 'false');
const WaveDiv = document.createElement('div');
WaveDiv.setAttribute('ID', 'WaveDiv');
WaveDiv.setAttribute('draggable', 'false');
const Wave = document.createElement('div');
Wave.setAttribute('ID', 'Wave');
Wave.setAttribute('class', 'Wave');
Wave.setAttribute('draggable', 'false');
const WaveText = document.createElement('p');
WaveText.setAttribute('ID', 'WaveText');
WaveText.setAttribute('draggable', 'false');
WaveText.textContent = 'Drag and drop an audio file here';
const WaveSelect = document.createElement('p');
WaveSelect.setAttribute('ID', 'WaveSelect');
WaveSelect.setAttribute('draggable', 'false');
WaveSelect.textContent = '　select a file　';
const WaveSelectInput = document.createElement('input');
WaveSelectInput.setAttribute('ID', 'WaveSelectInput');
WaveSelectInput.setAttribute('type', 'file');
const IconTest = document.createElement('ion-icon');
IconTest.setAttribute('ID', 'IconTest');
IconTest.setAttribute('name', 'mic-circle-outline')
IconTest.setAttribute('draggable', 'false');
const ServiceName = document.createElement('p');
ServiceName.setAttribute('ID', 'ServiceName');
ServiceName.setAttribute('draggable', 'false');
ServiceName.textContent = 'OlDiMath';
const UploadDiv = document.createElement('div');
UploadDiv.setAttribute('ID', 'UploadDiv');
const UploadIcon = document.createElement('ion-icon');
UploadIcon.setAttribute('ID', 'UploadIcon');
UploadIcon.setAttribute('name', 'share-outline');
UploadIcon.setAttribute('draggable', 'false');
const UploadIconInput = document.createElement('input');
UploadIconInput.setAttribute('ID', 'UploadIconInput');
UploadIconInput.setAttribute('type', 'file');
// UploadIconInput.setAttribute('hidden', 'hidden');
const Upload = document.createElement('p');
Upload.setAttribute('ID', 'Upload');
Upload.setAttribute('draggable', 'false');
Upload.textContent = 'upload　';
const DownloadIcon = document.createElement('ion-icon');
DownloadIcon.setAttribute('ID', 'DownloadIcon');
DownloadIcon.setAttribute('name', 'download-outline');
DownloadIcon.setAttribute('draggable', 'false');
const Download = document.createElement('p');
Download.setAttribute('ID', 'Download');
Download.setAttribute('draggable', 'false');
Download.textContent = 'download';
const HeaderDragBar = document.createElement('div');
HeaderDragBar.setAttribute('ID', 'HeaderDragBar');
HeaderDragBar.setAttribute('draggable', 'false');
const ChevronUpIcon = document.createElement('ion-icon');
ChevronUpIcon.setAttribute('ID', 'ChevronUpIcon');
ChevronUpIcon.setAttribute('name', 'chevron-up-outline')
ChevronUpIcon.setAttribute('draggable', 'false');
const ReorderIcon = document.createElement('ion-icon');
ReorderIcon.setAttribute('ID', 'ReorderIcon');
ReorderIcon.setAttribute('name', 'reorder-two-outline')
ReorderIcon.setAttribute('draggable', 'false');
const ChevronDownIcon = document.createElement('ion-icon');
ChevronDownIcon.setAttribute('ID', 'ChevronDownIcon');
ChevronDownIcon.setAttribute('name', 'chevron-down-outline')
ChevronDownIcon.setAttribute('draggable', 'false');

//ウィンドウ読み込み時の動作
window.addEventListener('load', () =>{
    const header = document.querySelector('header');
    header.appendChild(HeaderBackGround);
    HeaderBackGround.appendChild(HeaderMenu);
    HeaderMenu.appendChild(HeaderLogo);
    HeaderLogo.appendChild(IconTest);
    HeaderLogo.appendChild(ServiceName);
    HeaderMenu.appendChild(HeaderAction);
    HeaderAction.appendChild(UploadDiv);
    HeaderAction.appendChild(UploadIconInput);
    UploadDiv.appendChild(UploadIcon);
    UploadDiv.appendChild(Upload);
    UploadDiv.appendChild(DownloadIcon);
    UploadDiv.appendChild(Download);
    HeaderMenu.appendChild(HeaderPlayBack);
    HeaderPlayBack.appendChild(PlayIcon);
    HeaderPlayBack.appendChild(WaveDiv);
    WaveDiv.appendChild(Wave);
    Wave.appendChild(WaveText);
    Wave.appendChild(WaveSelect);
    WaveDiv.appendChild(WaveSelectInput);
    header.appendChild(HeaderDragBar);
    HeaderDragBar.appendChild(ReorderIcon);
    HeaderSize();
    HeaderMenuSize();
});
//ウィンドウリサイズ時の動作
window.addEventListener('resize', () =>{
    HeaderSize();
    HeaderMenuSize();
});
//ヘッダーレスポンシブ対応サイズ決定関数
function HeaderSize(){
    HeaderBackGround.style.width = winW + 'px';
    // let bestHeaderH = winH bestImgWH
    let HeaderRate = (((bestImgWH - bestImgWHphone)/2)/bestImgWH)
    if(winW > winH && winW <= (winH * 2.1)){
        HeaderH = winH * HeaderRate;
        HeaderMenuW = bestImgWH * scale * 0.93;
    }else if (winW > (winH * 2.1)){
        HeaderH = winH * 0.3;
        HeaderMenuW = bestImgWH * scale * 0.93;
    }else{
        HeaderH = (winH - winW) / 2 + winW * HeaderRate *0.8;
        HeaderMenuW = winW * 0.93;
    }
}
function HeaderMenuSize(){
    HeaderBackGround.style.height = HeaderH + 'px';
    HeaderMenu.style.width = HeaderMenuW + 'px';

    if(HeaderH >= HeaderMenuW*0.6){
        HeaderMenuH = HeaderMenuW * 0.6;
        HeaderBackGround.style.alignItems = 'center';
    }else if(HeaderH <= HeaderMenuW * 0.15){
        HeaderMenuH = HeaderMenuW * 0.15;
        console.log('hi');
        HeaderBackGround.style.alignItems = 'flex-end';
    }else{
        HeaderMenuH = HeaderH;
        HeaderBackGround.style.alignItems = 'center';
    }
    HeaderMenu.style.height = HeaderMenuH + 'px';
    HeaderLogo.style.width = HeaderMenuW + 'px';
    HeaderLogo.style.height = HeaderMenuH * 0.25 + 'px';
    IconTest.style.fontSize = HeaderMenuH * 0.25 * 0.7 + 'px';
    ServiceName.style.fontSize = HeaderMenuH * 0.25 * 0.55 + 'px';
    ServiceName.style.lineHeight = HeaderMenuH * 0.25 + 'px';
    HeaderAction.style.width = HeaderMenuW + 'px';
    HeaderAction.style.height = HeaderMenuH * 0.15 + 'px';
    UploadDiv.style.height = HeaderMenuH * 0.15 + 'px';
    UploadIcon.style.fontSize = HeaderMenuH * 0.15 * 0.7 + 'px';
    UploadIconInput.style.width = HeaderMenuH * 0.15 * 0.7 * 4 + 'px';
    UploadIconInput.style.height = HeaderMenuH * 0.15 + 'px';
    Upload.style.fontSize = HeaderMenuH * 0.15 * 0.6 + 'px';
    DownloadIcon.style.fontSize = HeaderMenuH * 0.15 * 0.7 + 'px';
    Download.style.fontSize = HeaderMenuH * 0.15 * 0.6 + 'px';
    HeaderPlayBack.style.width = HeaderMenuW + 'px';
    HeaderPlayBack.style.height = HeaderMenuH * 0.5 + 'px';
    PlayIcon.style.fontSize = HeaderMenuH * 0.5 * 0.6 + 'px';
    Wave.style.width = HeaderMenuW - HeaderMenuH * 0.5 * 0.6 + 'px';
    Wave.style.height = HeaderMenuH * 0.5 * 0.75 + 'px';
    WaveText.style.fontSize = HeaderMenuH * 0.5 * 0.6 * 0.3 + 'px';
    WaveSelect.style.fontSize = HeaderMenuH * 0.5 * 0.6 * 0.3 + 'px';
    WaveSelectInput.style.width = HeaderMenuH * 0.5 * 0.6 * 2.05 + 'px';
    WaveSelectInput.style.height = HeaderMenuH * 0.5 * 0.21 + 'px';
    WaveSelectInput.style.left = ((HeaderMenuW - HeaderMenuH * 0.5 * 0.6) - (HeaderMenuH * 0.5 * 0.6 * 2.05)) * 0.5 + 'px';
    HeaderDragBar.style.width = HeaderMenuW + 'px';
    HeaderDragBar.style.height = HeaderMenuH * 0.1 + 'px';
    HeaderDragBar.style.top = HeaderH * 0.9 + 'px';
    HeaderDragBar.style.left = (winW - HeaderMenuW) / 2 + 'px';
    ReorderIcon.style.fontSize = HeaderMenuW * 0.03 + 'px';
    ReorderIcon.style.width = HeaderMenuW * 0.2 + 'px';
}

//ヘッダーサイズ変更イベント
let Y = 0;
ReorderIcon.addEventListener('mousedown', e =>{HeaderChangeFlagFunc(e.clientY);});
ReorderIcon.addEventListener('touchstart', e =>{HeaderChangeFlagFunc(e.touches[0].clientY);});
function HeaderChangeFlagFunc(e){
    Y = e;
    HeaderChangeFlag = true;
};
window.addEventListener('mousemove', e =>{HeaderDragFunc(e.clientY);});
window.addEventListener('touchmove', e =>{HeaderDragFunc(e.touches[0].clientY);});
function HeaderDragFunc(e){
    if(HeaderChangeFlag === true){
        let deltaY = e - Y;
        Y = e;
        HeaderH += deltaY;
        if(HeaderH <= HeaderMenuW * 0.085){
            HeaderH = HeaderMenuW * 0.085;
        }else if(HeaderH >= winH){
            HeaderH = winH;
        }
        HeaderMenuSize();
    }
};
window.addEventListener('mouseup', e =>{HeaderChangeEnd();});
window.addEventListener('touchend', e =>{HeaderChangeEnd();});
function HeaderChangeEnd(){
    HeaderChangeFlag = false;
}
ReorderIcon.addEventListener('dblclick', e =>{HeaderDblClick();});
var tm;
function HeaderDblClick(){
    tm = setInterval("SizeMax()",0.1);
};
function SizeMax(){
    HeaderH += 7;
    HeaderMenuSize();
    if(HeaderH >= winH){
        HeaderH = winH;
        clearInterval(tm);
    }
};
ReorderIcon.oncontextmenu = function(){
    HeaderRightClick();
    return false;
};
function HeaderRightClick(){
    tm = setInterval("SizeMin()", 0.1);
    return false;
}
function SizeMin(){
    HeaderH -= 7;
    HeaderMenuSize();
    if(HeaderH <= HeaderMenuW * 0.085){
        HeaderH = HeaderMenuW * 0.085;
        clearInterval(tm);
    }
}
// PlayIcon.addEventListener('click', () =>{
//     if(PlayIcon.getAttribute('name') === 'play-outline'){
//         PlayIcon.setAttribute('name', 'pause-outline');
//     }else{
//         PlayIcon.setAttribute('name', 'play-outline');
//     }
// });



