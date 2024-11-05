# webpro_06
## このプログラムについて
このプログラムは，じゃんけんのプログラムであり，CPUにランダムに配られる手とクライアントの選択した手の勝敗を判断し，勝ち負けを表示させる．

## ファイル一覧
ファイル名 | 説明
-|-
app5.js | プログラム本体
public/janken.html | じゃんけんの開始画面
viwes/janken.ejs | じゃんけんの表示部分

## 使用方法
1. ターミナルで ```node app5.js``` と打ちプログラムを起動する
1. Webブラウザでlocalhost:8080/public/janken.htmlにアクセスする
1. 自分の手を入力する

```mermaid
flowchart TD;

start["開始"];
end1["終了"];
step1["開始画面を表示"];
step2["自分の手を入力"];
step3["CPUの手を出力"];
if{"勝敗を判断"};
win["勝ちを表示"];
draw["あいこを表示"]
lose["負けを表示"];
winplus["勝ちの回数を1増やす"]
total[試合数を1増やす]
stetus["勝利回数と試合数を表示"]

start --> step1
step1 --> step2
step2 --> step3
step3 --> if
if --> |勝ち| win
win --> winplus
if --> |あいこ| draw
if --> |負け| lose
winplus --> total
draw --> total
lose --> total
total --> stetus
stetus --> end1


```
