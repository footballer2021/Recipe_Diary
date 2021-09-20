

// videoタグ メインビジュアル
const mainVisual = document.querySelector('.main-visual');

// mainVisual(動画)を常にブラウザの高さにする
mainVisual.style.height = document.documentElement.clientHeight + "px";
window.addEventListener('resize',()=>{
    mainVisual.style.height = document.documentElement.clientHeight + "px";
});

// メインビジュアルの<section>を常にブラウザの高さにする
const hero = document.querySelector('.hero');
hero.style.height = document.documentElement.clientHeight + "px";
window.addEventListener('resize',()=>{
    hero.style.height = document.documentElement.clientHeight + "px";
});

// audioタグ
const song = document.querySelector('.song');

// 再生ボタン矢印imgタグ
const play = document.querySelector('.play');

// タイマー用再生ボタンサークル svg
const playButton1 = document.querySelector('.moving-outline');

// タイマー用再生ボタンサークル circle
const outline = document.querySelector('.moving-outline circle');

// circleの長さを取得
const outlineLength = outline.getTotalLength();

// 時間パラメーター
let fakeDuration = 600;

// パラメーターの実線
outline.style.strokeDasharray = outlineLength;

// パラメーターの始点
outline.style.strokeDashoffset = outlineLength;


// 時間表示タグ h3
const timeDisplay = document.querySelector('.time-display');

// 音楽選択ボタン
const sounds = document.querySelectorAll('.sound-button-wrapper button');

// 時間選択ボタン
const timeSelect = document.querySelectorAll('.time-select button');

// 音楽選択機能
sounds.forEach(sound => {
    sound.addEventListener("click", function() {
        song.src = this.getAttribute("data-sound");
        mainVisual.src = this.getAttribute("data-video");
        checkPlaying(song);
      });
});

// 再生・停止ボタンイベント
playButton1.addEventListener('click',()=>{
    checkPlaying(song);
});

// 再生時間選択ボタン機能
timeSelect.forEach( (option) => {
    option.addEventListener("click",function(){
        fakeDuration = this.getAttribute("data-time");
        timeDisplay.textContent =`${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`;
    });
});

 // 動画、音楽の再生・停止機能 画像の変換
 const checkPlaying = song => {
    if(song.paused){
        song.play();
        mainVisual.play();
        play.src = './svg/pause.svg';
    }else{
        song.pause();
        mainVisual.pause();
        play.src = './svg/play.svg';
    }
}

// パラメーターサークル機能
song.ontimeupdate = () =>{
    let currentTime = song.currentTime;
    let elapsed = fakeDuration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);

    // パラメーターを進行させる
    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;

    // 時間表示を進める
    timeDisplay.textContent = `${minutes}:${seconds}`;

    // 指定時間を過ぎた場合の処理
    if(currentTime >= fakeDuration){
        song.pause();
        song.currentTime = 0;
        play.src = "./svg/play.svg";
        mainVisual.pause();
    }
}

    // アイコンの切り替え 晴れ
    const sunny = document.querySelector('.sunny');
    sunny.onmouseover = function(){
        const sunnyImage = document.querySelector('.sunny__image');
        sunnyImage.src = "icon/sunnyOrange.svg";
    };

    sunny.onmouseout = function(){
        const sunnyImage = document.querySelector('.sunny__image');
        sunnyImage.src = "icon/sunny.svg";
        };
    
    // アイコンの切り替え 雨
    const rain = document.querySelector('.rain');
    rain.onmouseover = function(){
        const rainImage = document.querySelector('.rain__image');
        rainImage.src = "icon/rainBlue.svg";
    };

    rain.onmouseout = function(){
        const rainImage = document.querySelector('.rain__image');
        rainImage.src = "icon/rain.svg";
        };


// マウスストーカーの要素を取得
const el = document.querySelector('.stoker');

// マウス座標
let mouseX = 0;
let mouseY = 0;
// ストーカーの座標
let currentX = 0;
let currentY = 0;
// マウス移動時
document.body.addEventListener('mousemove', (event) => {
  // マウス座標を保存
  mouseX = event.clientX;
  mouseY = event.clientY;
});

tick();
function tick() {
  // アニメーションフレームを指定
  requestAnimationFrame(tick);

  // マウス座標を遅延してストーカーの座標へ反映する
  currentX += (mouseX - currentX) * 0.1;
  currentY += (mouseY - currentY) * 0.1;

  // ボタンを押しづらいのでストーカーを少し離す
  currentX += 3;
  currentY += 3;



  // ストーカーの要素へ反映
  el.style.transform = `translate(${currentX}px, ${currentY}px)`;
}
