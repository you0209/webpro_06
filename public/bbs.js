"use strict";

let number=0;
const bbs = document.querySelector('#bbs');
document.querySelector('#post').addEventListener('click', () => {
    const name = document.querySelector('#name').value;
    const message = document.querySelector('#message').value;

    const params = {  // URL Encode
        method: "POST",
        body:  'name='+name+'&message='+message,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    console.log( params );
    const url = "/post";
    fetch( url, params )
    .then( (response) => {
        if( !response.ok ) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then( (response) => {
        console.log( response );
        document.querySelector('#message').value = "";
    });
});

document.querySelector('#check').addEventListener('click', () => {
    const params = {  // URL Encode
        method: "POST",
        body:  '',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    const url = "/check";
    fetch( url, params )
    .then( (response) => {
        if( !response.ok ) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then( (response) => {
        let value = response.number;
        console.log( value );

        console.log( number );
        if( number != value ) {
            const params = {
                method: "POST",
                body: 'start='+number,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'               
                }
            }
            const url = "/read";
            fetch( url, params )
            .then( (response) => {
                if( !response.ok ) {
                    throw new Error('Error');
                }
                return response.json();
            })
            .then( (response) => {
                number += response.messages.length;
                for( let mes of response.messages ) {
                    console.log( mes );  // 表示する投稿
                    let cover = document.createElement('div');
                    cover.className = 'cover';
                    let name_area = document.createElement('span');
                    name_area.className = 'name';
                    name_area.innerText = mes.name;
                    let mes_area = document.createElement('span');
                    mes_area.className = 'mes';
                    mes_area.innerText = mes.message;
                    cover.appendChild( name_area );
                    cover.appendChild( mes_area );

                    bbs.appendChild( cover );
                }
            })
        }
    });
});

document.querySelector('#reset').addEventListener('click', () => {
    const params = {
        method: "POST",
        body: '', // リクエストボディは不要
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    // サーバーにリセットリクエストを送信
    fetch("/reset", params)
        .then(response => {
            if (!response.ok) {
                throw new Error("リセットに失敗しました");
            }
            return response.json();
        })
        .then(response => {
            if (response.status === "success") {
                // リセット成功時の画面更新
                document.querySelector('#bbs').innerHTML = ""; // 掲示板の表示をクリア
                console.log("掲示板がリセットされました");

                // number変数を初期化
                number = 0;
            }
        })
        .catch(err => console.error(err)); // エラーハンドリング
});

document.querySelector('#replace-latest-btn').addEventListener('click', () => {
    const newMessage = document.querySelector('#replace-message').value; // 入力値を取得

    if (!newMessage.trim()) {
        alert("置き換える内容を入力してください！");
        return;
    }

    const params = {
        method: "POST",
        body: `message=${encodeURIComponent(newMessage)}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    fetch("/replace-latest", params)
        .then(response => {
            if (!response.ok) {
                throw new Error("サーバーエラーが発生しました");
            }
            return response.json();
        })
        .then(response => {
            if (response.status === "success") {
                alert("最新の投稿を置き換えました！");
                document.querySelector('#replace-message').value = ""; // 入力欄をクリア
                document.querySelector('#bbs').innerHTML = ""; // 掲示板をクリアして再描画

                // 最新の投稿一覧を表示
                for (let mes of response.bbs) {
                    let cover = document.createElement('div');
                    cover.className = 'cover';
                    let name_area = document.createElement('span');
                    name_area.className = 'name';
                    name_area.innerText = mes.name;
                    let mes_area = document.createElement('span');
                    mes_area.className = 'mes';
                    mes_area.innerText = mes.message;
                    cover.appendChild(name_area);
                    cover.appendChild(mes_area);

                    document.querySelector('#bbs').appendChild(cover);
                }
            } else {
                alert(response.message);
            }
        })
        .catch(err => {
            console.error(err);
            alert("置き換えに失敗しました");
        });
});

//最新の投稿を削除
document.querySelector('#delete-latest-btn').addEventListener('click', () => {
    fetch("/delete-latest", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                alert("最新の投稿を削除しました！");

                // 再描画処理
                const bbs = document.querySelector('#bbs');
                bbs.innerHTML = ""; // 掲示板をクリア

                // サーバーから返されたデータを1件ずつ表示
                data.messages.forEach((mes) => {
                    const cover = document.createElement('div');

                    const nameArea = document.createElement('span');
                    nameArea.innerText = mes.name;

                    const mesArea = document.createElement('span');
                    mesArea.innerText = `: ${mes.message}`;

                    cover.appendChild(nameArea);
                    cover.appendChild(mesArea);

                    bbs.appendChild(cover);
                });
            } else {
                alert(data.message);
            }
        })
        .catch(err => console.error(err));
});


