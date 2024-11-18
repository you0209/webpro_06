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

# コイントス
## このプログラムについて
このプログラムは，コイントスのプログラムであり，CPUにランダムに配られた表裏と，
選択した表裏が一致するかを判断し，当たりかハズレかを表示させる．．

## ファイル一覧
ファイル名 | 説明
-|-
app5.js | プログラム本体
public/coin.html | コイントスの開始画面
viwes/coin.ejs | コイントスの表示部分

## 使用方法
1. ターミナルで ```node app5.js``` と打ちプログラムを起動する
1. Webブラウザで ```localhost:8080/public/coin.html``` にアクセスする
1. 自分の表裏を入力する

```mermaid
flowchart TD;

start["開始"];
end1["終了"];
step1["開始画面を表示"];
step2["CPUの表裏を決定"];
step3["自分の表裏を入力"];
if{"CPUが自分の表裏が一致するか"};
yes["当たりを表示"];
no["はずれを表示"];
noplus["連続回数を0にする"];
yesplus["連続回数を1増やす"]
stetus["当たり外れとと連続回数を表示"]

start --> step1
step1 --> step2
step2 --> step3
step3 --> if
if --> |当たり| yes
yes --> yesplus
if --> |はずれ| no
yesplus --> stetus
no --> noplus
noplus --> stetus
stetus --> end1


```

# 割り算
## このプログラムについて
このプログラムは，割り算のプログラムであり，CPUにランダム配られる，
1から100までの数字が，クライアントが入力した数字で割り切れるかを判断して，結果を表示させる．

## ファイル一覧
ファイル名 | 説明
-|-
app5.js | プログラム本体
public/division.html | 割り算の開始画面
viwes/division.ejs | 割り算の表示部分

## 使用方法
1. ターミナルで ```node app5.js``` と打ちプログラムを起動する
1. Webブラウザで ```localhost:8080/public/division.html``` にアクセスする
1. 自分の数字を入力する

```mermaid
flowchart TD;

start["開始"];
end1["終了"];
step1["開始画面を表示"];
step2["CPUの数字を出力"];
step3["自分の数字を入力"];
if{"CPUと自分の数字のあまりが0か"};
yes["割り切れましたを表示"];
no["割り切れませんでしたを表示"];

start --> step1
step1 --> step2
step2 --> step3
step3 --> if
if --> |割り切れる| yes
if --> |割り切れない| no
yes --> end1
no --> end1


```
