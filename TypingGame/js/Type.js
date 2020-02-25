'use strict'; 

{
  const words = [
    'ishikawa',
    'fukui',
    'toyama',
  ];
  let word = words[Math.floor(Math.random() * words.length)];
  let loc 
  let score  
  let miss  
  const timeLimit = 3 * 10000; 
  let startTime = 0;
  let isPlaying = false; 

  const target = document.getElementById('target');
  const scoreLabel = document.getElementById('score');
  const missLabel = document.getElementById('miss');
  const timerLabel = document.getElementById('timer');

  // クリックイベント
  window.addEventListener('click', () => {
    if(isPlaying === true){
      return;
    }
    isPlaying = true;

    loc = 0;
    score = 0;
    miss = 0;
    scoreLabel.textContent = score;
    missLabel.textContent = miss;
    word = words[Math.floor(Math.random() * words.length)];

    updateTarget();
    startTime = Date.now(); // 基準日から経過ミリ秒の計算
    updateTimer();
  });

  // 入力イベント
  window.addEventListener('keyup' , e => {

    // クリックするまで入力を無効
    if(isPlaying === false){
      return;
    }

    // 結果を表示
    if(e.key === word[loc]){
      loc++;
      if(loc === word.length){
        word = words[Math.floor(Math.random() * words.length)];
        loc = 0;
      }
      score++;
      scoreLabel.textContent = score;
      updateTarget();
    }else{
      miss++;
      missLabel.textContent = miss;
    }
  });

  // 正解したら"_"に変換
  function updateTarget(){
    let placeholder = '';
    for (let i = 0;i < loc;i++){
      placeholder += '_';
    }
  //  先頭から指定した文字数を削除
   target.textContent = placeholder + word.substring(loc);
  }

  function updateTimer(){
    const timeLeft = startTime + timeLimit - Date.now();
    timerLabel.textContent = (timeLeft / 1000).toFixed(2);

    const timeoutId = setTimeout(() => {
      updateTimer();
    },10);

    // 残り時間が0になったらタイマーの更新をストップし、ゲーム終了
    if (timeLeft < 0){
      isPlaying = false;

      // 画面の更新を100ミリ秒遅らせる。そうして0秒になったら表示される
      setTimeout(() => {
        showResult();
      }, 100);

      clearTimeout(timeoutId);
      timerLabel.textContent = '0.00';
      target.textContent = 'click to replay';
    }
  }

  /* 結果表示処理 */
  function showResult(){
    // 正答率算出 未入力時に分母が0になるため、0の時は正答率を0として表示する
    const accuracy = score + miss === 0 ? 0 : score / (score + miss) * 100;

    // alert(``)でないとscore等の数値が表示されないため注意。alert('')だと文字がそのまま表示される
    alert(`${score} letters, ${miss} misses, ${accuracy.toFixed(2)}% accuracy!`);
  }

}
