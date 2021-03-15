const buildHTML = (XHR) => {
  const item = XHR.response.post; //  レスポンスの中から投稿されたメモの情報を抽出し、変数itemに格納
  const html = `  
    <div class="post">
      <div class="post-date">
        投稿日時：${item.created_at}
      </div>
      <div class="post-content">
        ${item.content}
      </div>
    </div>`;//  item内に格納されたメモの情報を元にして、ブラウザに描画するためのHTMLを生成し、変数htmlに格納
  return html //  関数buildHTMLの返り値にhtmlを指定
}

function post (){
  const submit = document.getElementById("submit"); // id=submit の要素を取得
  submit.addEventListener("click", (e) => { // submit の要素でクリックされたらのイベント、() => {}は即時＆アロー関数で（）の中に引数が入る
    e.preventDefault(); //  既定のイベントを無効化するためのメソッド:今回は投稿ボタンのクリックを無効化
    const form = document.getElementById("form")    //  フォーム内を取得
    const formData = new FormData(form);    //  FormData=「フォームに入力された値を取得」、new FormData(フォームの要素);→オブジェクトを生成し、引数にフォームの要素を渡すことで、そのフォームに入力された値を取得
    const XHR = new XMLHttpRequest(); //  新たに生成したXMLHttpRequestオブジェクトを変数XHRに格納
    XHR.open("POST", "/posts", true); //  リクエストの内容を指定:第一引数にはHTTPメソッド、第二引数にはパス、第三引数には非同期通信であるかをtrueかfalseで記述
    XHR.responseType = "json";  //  レスポンスのデータフォーマット（＝どのような形式のデータにするか）を指定→JSON形式
    XHR.send(formData); //  リクエストを送信するXMLHttpRequestオブジェクトのメソッド
    XHR.onload = () => {  //  onload：リクエストの送信が成功したときに呼び出されるXMLHttpRequestオブジェクトのプロパティ
      if (XHR.status != 200) {  //  200以外のHTTPステータスコードが返された場合はエラーメッセージが表示されるようにします
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;  //  return null;によってJavaScriptの処理から抜け出す
      }
      const list = document.getElementById("list");
      const formText = document.getElementById("content");  //  リセットの対象となるフォームの要素contentを取得して、変数formTextに格納
      list.insertAdjacentHTML("afterend", buildHTML(XHR));  //  insertAdjacentHTMLとは、HTMLをある要素の指定した箇所に挿入するメソッド:第一引数にHTMLを挿入したい位置、第二引数に挿入したいHTMLを記述
      formText.value = "";  //formTextのvalue属性に空の文字列を割り当てることで、フォームの値をリセットします
    };
  });
}

window.addEventListener('load', post);