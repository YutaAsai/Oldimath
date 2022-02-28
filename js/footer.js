{
//div要素追加部
//フッターボタン要素を追加
const FooterButton = document.createElement('div');
FooterButton.setAttribute('class', 'FooterButton');
FooterButton.setAttribute('draggable', 'true');//ドロップ禁止バグ対策
FooterButton.textContent = 'Chain';
//フッターインプット要素を追加
const FooterInput = document.createElement('div');
FooterInput.setAttribute('class', 'FooterInput');
FooterInput.setAttribute('draggable', 'true');//ドロップ禁止バグ対策
FooterInput.textContent = 'input>';
//フッターディストーション要素を追加
const FooterDistortion = document.createElement('div');
FooterDistortion.setAttribute('class', 'FooterDistortion');
FooterDistortion.setAttribute('draggable', 'true');//ドロップ禁止バグ対策
// FooterDistortion.classList.add('class', 'FooterDistortionON')
FooterDistortion.textContent = 'Dist';
//フッターリミッター要素を追加
const FooterLimiter = document.createElement('div');
FooterLimiter.setAttribute('class', 'FooterLimiter');
FooterLimiter.setAttribute('draggable', 'true');//ドロップ禁止バグ対策
FooterLimiter.textContent = 'Limit';
//フッターアウトプット要素を追加
const FooterOutput = document.createElement('div');
FooterOutput.setAttribute('class', 'FooterOutput');
FooterOutput.setAttribute('draggable', 'true');//ドロップ禁止バグ対策
FooterOutput.textContent = 'output>';
//フッタークローズ要素を追加
const FooterClose = document.createElement('div');
FooterClose.setAttribute('class', 'FooterClose');
FooterClose.setAttribute('draggable', 'true');//ドロップ禁止バグ対策
FooterClose.textContent = 'Close';
//フッターの背景要素を追加(Chainボタンにホバーしていないときは隠れる)
const FooterBackGround = document.createElement('div');
FooterBackGround.setAttribute('class', 'FooterBackGround');
FooterBackGround.setAttribute('draggable','true');//ドロップ禁止バグ対策

//ウィンドウ読み込み時の動作
window.addEventListener('load', () =>{
    const footer = document.querySelector('footer');
    footer.appendChild(FooterBackGround);
    footer.appendChild(FooterButton);
    footer.appendChild(FooterInput);
    footer.appendChild(FooterDistortion);
    footer.appendChild(FooterLimiter);
    footer.appendChild(FooterOutput);
    footer.appendChild(FooterClose);
    footersize();
});
//ウィンドウリサイズ時の動作
window.addEventListener('resize', () =>{
    footersize();
});
//フッターサイズ決定関数
function footersize(){
    // FooterBackGround.style.height = window.innerHeight/10+ 'px';
    FooterH = 80;
    //フッターオープンボタン
    FooterButton.style.width = FooterH * 0.8 + 'px';
    FooterButton.style.height = FooterH * 0.8 + 'px';
    FooterButton.style.right = FooterH * 0.1 + 'px';
    FooterButton.style.bottom = FooterH * 0.1 + 'px';
    FooterButton.style.lineHeight = FooterH * 0.8 + 'px';
    //フッターインプット
    FooterInput.style.width = FooterH * 0.8 + 'px';
    FooterInput.style.height = FooterH * 0.4 + 'px';
    FooterInput.style.right = FooterH * 4 + FooterH * 0.1 + 'px';
    FooterInput.style.bottom = FooterH * 0.3 + 'px';
    FooterInput.style.lineHeight = FooterH * 0.4 + 'px';
    //フッターディストーション
    FooterDistortion.style.width = FooterH * 0.8 + 'px';
    FooterDistortion.style.height = FooterH * 0.8 + 'px';
    FooterDistortion.style.right = FooterH * 3 + FooterH * 0.1 + 'px';
    FooterDistortion.style.bottom = FooterH * 0.1 + 'px';
    FooterDistortion.style.lineHeight = FooterH * 0.8 + 'px';
    //フッターリミッター
    FooterLimiter.style.width = FooterH * 0.8 + 'px';
    FooterLimiter.style.height = FooterH * 0.8 + 'px';
    FooterLimiter.style.right = FooterH * 2 + FooterH * 0.1 + 'px';
    FooterLimiter.style.bottom = FooterH * 0.1 + 'px';
    FooterLimiter.style.lineHeight = FooterH * 0.8 + 'px';
    //フッターアウトプット
    FooterOutput.style.width = FooterH * 0.8 + 'px';
    FooterOutput.style.height = FooterH * 0.4 + 'px';
    FooterOutput.style.right = FooterH + FooterH * 0.1 + 'px';
    FooterOutput.style.bottom = FooterH * 0.3 + 'px';
    FooterOutput.style.lineHeight = FooterH * 0.4 + 'px';
    //フッタークローズ
    FooterClose.style.width = FooterH * 0.8 + 'px';
    FooterClose.style.height = FooterH * 0.8 + 'px';
    FooterClose.style.right = FooterH * 0.1 + 'px';
    FooterClose.style.bottom = FooterH * 0.1 + 'px';
    FooterClose.style.lineHeight = FooterH * 0.8 + 'px';
    //フッター背景
    FooterBackGround.style.height = FooterH + 'px';
    FooterBackGround.style.width = window.innerWidth + 'px';
    FooterBackGround.style.bottom = 0 + 'px';
}
FooterButton.addEventListener('click', () =>{
    FooterButton.classList.add('class', 'FooterButtonActive');
    FooterInput.classList.add('class', 'FooterInputActive');
    FooterDistortion.classList.add('class', 'FooterDistortionActive');
    FooterLimiter.classList.add('class', 'FooterLimiterActive');
    FooterOutput.classList.add('class', 'FooterOutputActive');
    FooterClose.classList.add('class', 'FooterCloseActive')
    FooterBackGround.classList.add('class', 'FooterBackGroundActive');
});
FooterClose.addEventListener('click', () =>{
    FooterButton.classList.remove('class', 'FooterButtonActive');
    FooterInput.classList.remove('class', 'FooterInputActive');
    FooterDistortion.classList.remove('class', 'FooterDistortionActive');
    FooterLimiter.classList.remove('class', 'FooterLimiterActive');
    FooterOutput.classList.remove('class', 'FooterOutputActive');
    FooterClose.classList.remove('class', 'FooterCloseActive');
    FooterBackGround.classList.remove('class', 'FooterBackGroundActive');    
})

}