//グローバル変数
let winW; //ウィンドウ横幅
let winH; //ウィンドウ縦幅
let scale; //画面倍率
let onoff = 1;
let dist = 1;
let volume = 80;
let vu = 1;
let bestImgWH = 950;
let bestImgWHphone = 500;

//canvas要素を作る
const DDUIcanvas = document.createElement('canvas');
DDUIcanvas.setAttribute('id', 'DDUIcanvasID');
DDUIcanvas.setAttribute('draggable','false');
//div要素を作る(ユーザーが操作できる範囲として使用)
const DDUIswitchDIV = document.createElement('div');
DDUIswitchDIV.setAttribute('id','DDUIswitchDIVID');
DDUIswitchDIV.setAttribute('draggable','false');
const DDUIknobDIV = document.createElement('div');
DDUIknobDIV.setAttribute('id','DDUIknobDIVID');
DDUIknobDIV.setAttribute('draggable','false');
const DDUIvolumeDIV = document.createElement('div');
DDUIvolumeDIV.setAttribute('id','DDUIvolumeDIVID');
DDUIvolumeDIV.setAttribute('draggable','false');

//---------------------------------------//
//----------------描画部-----------------//
//---------------------------------------//

//UI全体の描画関数(レスポンシブ対応)
function drawDDUI(){
    //ウィンドウサイズを取得
    winW = window.innerWidth;
    winH = window.innerHeight;

    //canvas要素を編集
    DDUIcanvas.width = winW;
    DDUIcanvas.height = winH;
    let imgW = img.width;
    let imgH = img.height;

    const ctx = DDUIcanvas.getContext("2d")

    if(winW > winH && winW <= (winH * 2.1)){
        ctx.drawImage(img,(imgW-bestImgWH*winW/winH)/2,(imgH-bestImgWH)/2,bestImgWH*winW/winH,bestImgWH,0,0,winW,winH);
        scale =  winH / bestImgWH;
    }
    else if(winW > (winH * 2.1)){
        ctx.drawImage(img,(imgW-bestImgWHphone*winW/winH)/2,(imgH-bestImgWHphone)/2,bestImgWHphone*winW/winH,bestImgWHphone,0,0,winW,winH);
        scale = winH / bestImgWHphone;
    }
    else{
        ctx.drawImage(img,(imgW-bestImgWH)/2,(imgH-bestImgWH*winH/winW)/2,bestImgWH,bestImgWH*winH/winW,0,0,winW,winH);
        scale = winW / bestImgWH;
    }
    //drawImage(画像,X0,Y0,W0,H0,X1,Y1,W1,H1)
    //X0,Y0:切り抜く元画像座標 W0,H0:切り抜く画像の幅と高さ
    //X1,Y1:画像を描画するcanvas内の座標 W1,H1:描画する際の幅と高さ
    drawDDUIswitch();
    drawDDUIknob();
    drawDDUIvolume();
    drawDDUIvu();
};

//スイッチ・パイロットランプの描画
function drawDDUIswitch(){
    const ctx = DDUIcanvas.getContext("2d");
    if(onoff === 0){
        ctx.drawImage(DDUIswitch,0,0,230,134,winW/2-422*scale,winH/2+10*scale,230*scale,134*scale);
    }
    else{
        ctx.drawImage(DDUIswitch,0,134,230,134,winW/2-422*scale,winH/2+10*scale,230*scale,134*scale);
    };
    DDUIswitchDIV.style.left = winW/2-422*scale + 'px';
    DDUIswitchDIV.style.top = winH/2+10*scale + 'px';
    DDUIswitchDIV.style.width = 230*scale + 'px';
    DDUIswitchDIV.style.height = 134*scale + 'px';
};

//ディストーションノブの描画
function drawDDUIknob(){
    const ctx = DDUIcanvas.getContext("2d");
    ctx.drawImage(DDUIknob,0,dist*192,156,192,winW/2-190*scale,winH/2+26*scale,158*scale,187*scale);

    DDUIknobDIV.style.left = winW/2-190*scale + 'px';
    DDUIknobDIV.style.top = winH/2+26*scale + 'px';
    DDUIknobDIV.style.width = 156*scale + 'px';
    DDUIknobDIV.style.height = 192*scale + 'px';
};

//アウトプットボリュームスライダーの描画
function drawDDUIvolume(){
    const ctx = DDUIcanvas.getContext("2d");
    ctx.drawImage(DDUIvolume,0,volume*173,514,173,winW/2-32*scale,winH/2+59*scale,502.5*scale,168*scale);

    DDUIvolumeDIV.style.left = winW/2-32*scale + 'px';
    DDUIvolumeDIV.style.top = winH/2+59*scale + 'px';
    DDUIvolumeDIV.style.width = 450*scale + 'px';
    DDUIvolumeDIV.style.height = 173*scale + 'px';
};

//VUメーターの描画
function drawDDUIvu(){
    const ctx = DDUIcanvas.getContext("2d");
    ctx.drawImage(DDUIvu,0,vu*193,343,193,winW/2+28*scale,winH/2-142*scale,337*scale,193*scale);
};

//DDUIcanvas要素をDOMツリーから削除する関数(現状使用予定なし)
function removeDDUI(){
    const DDUIremove = document.getElementById('DDUIcanvasID');
    DDUIremove.remove();
};

window.addEventListener('load', ()=>{
    //DOMツリーにcanvas要素追加
    const main = document.querySelector('main');
    main.appendChild(DDUIswitchDIV);
    main.appendChild(DDUIknobDIV);
    main.appendChild(DDUIvolumeDIV);
    main.appendChild(DDUIcanvas);

    drawDDUI();
});

window.addEventListener('resize', ()=>{
    drawDDUI();
});

//---------------------------------------//
//----------------操作部-----------------//
//---------------------------------------//

//スイッチのon-off動作
DDUIswitchDIV.addEventListener('click', () =>{
    if(onoff === 1){
        onoff = 0;
        vu = 0;
    }
    else{
        onoff = 1;
        vu = 1;
    }
    drawDDUIswitch();
    drawDDUIvu();
});

//ノブ マウス・タッチ操作開始フラグ
let DistY = 0;
let DistChangeFlag = 0;
DDUIknobDIV.addEventListener('mousedown', e =>{
    DistY = e.clientY;
    DistChangeFlag = 1;
    DDUIvolumeDIV.setAttribute('draggable','true');
    //ノブ操作時横のスライダーのdraggable:trueを入れてないと
    //ドロップ禁止マークが出てくるバグ発生
});
DDUIknobDIV.addEventListener('touchstart', e =>{
    DistY = e.touches[0].clientY;
    DistChangeFlag = 1;
    DDUIvolumeDIV.setAttribute('draggable','true');
});
//アウトプットボリューム マウス・タッチ操作開始フラグ
let VolumeX = 0;
let VolumeChangeFlag = 0;
DDUIvolumeDIV.addEventListener('mousedown', e =>{
    VolumeX = e.clientX;
    VolumeChangeFlag = 1;
});
DDUIvolumeDIV.addEventListener('touchstart', e =>{
    VolumeX = e.touches[0].clientX;
    VolumeChangeFlag = 1;
});
//操作開始フラグがON時マウスが動いた時の挙動
window.addEventListener('mousemove', e =>{
    //Distortionノブの記述
    if(DistChangeFlag === 1){
        let dist_delta = Math.floor((DistY - e.clientY)/3);
        if(dist_delta !== 0){
            dist += dist_delta;
            DistY = e.clientY;
        }
        if(dist <= 1){
            dist = 1;
        }
        else if(dist >= 100){
            dist = 100;
        }
        drawDDUIknob();
        //WaveformProcessing.js
        Setup();
    }
    //Volumeスライダーの記述
    if(VolumeChangeFlag === 1){
        let volume_delta = Math.floor((e.clientX - VolumeX)/4);
        if(volume_delta !== 0){
            volume += volume_delta;
            VolumeX = e.clientX;
        }
        if(volume <= 1){
            volume = 1;
        }
        else if(volume >= 100){
            volume = 100;
        }
        drawDDUIvolume();
        //WaveformProcessing.js
        Setup();
    }
});
//操作開始フラグがON字タッチが動いた時の挙動
window.addEventListener('touchmove', e =>{
    //Distortionノブの記述
    if(DistChangeFlag === 1){
        let dist_delta = Math.floor((DistY - e.touches[0].clientY)/3);
        if(dist_delta !== 0){
            dist += dist_delta;
            DistY = e.touches[0].clientY;
        }
        if(dist <= 1){
            dist = 1;
        }
        else if(dist >= 100){
            dist = 100;
        }
        drawDDUIknob();
    }
    //Volumeスライダーの記述
    if(VolumeChangeFlag === 1){
        let volume_delta = Math.floor((e.touches[0].clientX - VolumeX)/4);
        if(volume_delta !== 0){
            volume += volume_delta;
            VolumeX = e.touches[0].clientX;
        }
        if(volume <= 1){
            volume = 1;
        }
        else if(volume >= 100){
            volume = 100;
        }
        drawDDUIvolume();
    }
});
//操作終了フラグOFF
window.addEventListener('mouseup', e =>{
    DistChangeFlag = 0;
    VolumeChangeFlag = 0;
    DDUIvolumeDIV.setAttribute('draggable','false');
    //操作終了時にはドラッグ禁止に直す
});
window.addEventListener('touchend', e =>{
    DistChangeFlag = 0;
    VolumeChangeFlag = 0;
    DDUIvolumeDIV.setAttribute('draggable','false');
});
