(function($, doc, win){


    // 値を変えたり代入したりするもの（変数）
    // ストップウォッチ全体
    var watch = $("#watch");
    // 時間の表示
    var hour = $("#hour");
    // 分の表示
    var minute = $("#minute");
    // 秒の表示
    var second = $("#second");

    
    // スタートボタンを操作する変数
    var btnStart = $("#start");
	// リセットボタンを操作する変数
    var btnReset = $("#reset");

    // 経過時間（最初は0）
    var currentTime = 0;

    // 止まるかどうか（trueとfalseの値が入る変数をboolean変数という）
    var stop = true;

    // メソッド
    var method = {
        // ストップウォッチを動かす
        timer : function() {
    
            // このメソッドを呼び出す間隔（単位は1/1000秒）
            var interval = 1000;
    
            // 一定間隔ごとに以下を実行する
            // function() { ここが実行される }, interval);
            time = setInterval(function() {

                if (!stop) { // ← stopという変数がfalseであればと云う意味

                    // カウントアップ
                    currentTime += interval;

                    // 追加する時間
                    var appendHour = currentTime / (1000 * 60 * 60) | 0; // 1/1000秒x60秒x60分
                    var appendMinute = currentTime % (1000 * 60 * 60) / (1000 * 60) | 0; // 時間で割った余りを割る
                    var appendSecond = currentTime  % (1000 * 60) / 1000 | 0; // 分で割った余りを割る

                    // 1けただったら「0」を足す ex. 1 → 01
                    appendHour = appendHour < 10 ? "0" + appendHour : appendHour;
                    appendMinute = appendMinute < 10 ? "0" + appendMinute : appendMinute;
                    appendSecond = appendSecond < 10 ? "0" + appendSecond : appendSecond;
            
                    // 時間をHTMLに記述する
                    hour.html(appendHour);
                    minute.html(appendMinute);
                    second.html(appendSecond);
                    }

            }, interval); // ←これが間隔

	    }, // ここまで timer

        // スタート/ストップボタン
        startAndStop : function() {
			// ストップであればスタート、スタートであればストップ
                stop = !stop; // ←stopがfalseであればtrueを、trueであればfalseを代入する
        },

        // リセットするメソッド
        reset : function() {
            // リセット（経過時間を0に戻す）
        	currentTime = 0;
            // 時間をHTMLに記述する
            hour.html("00");
            minute.html("00");
            second.html("00");
        },

        // 初期化メソッド
        init : function() {
            // ストップウォッチを動かすメソッドを呼び出す
            method.timer();
            // スタート/リセットボタンをクリックしたらstartAndStopを呼び出す
            btnStart.click(method.startAndStop);
            // リセットボタンをクリックしたらresetを呼び出す
            btnReset.click(method.reset);
        }
    };

    // ページを読み込んだ時に初期化メソッドを呼び出す（実行する）
    $(document).ready(method.init);

}(jQuery, document, window));
