// HTML要素の取得
const chatOutput = document.getElementById("chat-output");
const optionButtons = document.querySelectorAll(".option-button");

// チャットボットの応答を管理するオブジェクト
const chatbotResponses = {
  option1: ["DDS・MVD", "リカレの再受講", "知り合いに紹介したい"], //申し込み
  option2: ["解約月について", "決済できません", "申し込んだ講座をキャンセルしたい"], //決済・解約・キャンセル
  option3: ["革命室って何ですか？", "動画配信はありますか？", "革命TRIBE！～じブラ道～を解約したらその他の商品のコンテンツも見れなくなりますか？", "グループコンサルやイベントを欠席します", "Zoomリンクがわかりません"], //コンテンツについて
  option4: ["紹介料はいつ入りますか？", "紹介者を出しましたが、本講座に申し込んだか知りたいです", "紹介リンクはどうやって発行したらいいですか？", "エバンジェリスト会員サイトへログイン方法がわかりません"], //紹介について
  option5: ["SNSやツールの使い方がわからないです", "会員サイトアプリのインストール方法がわかりません", "会員サイトのログイン方法がわかりません", "会費を払っているクレジットカードを変更したいです", "革命TRIBE！～じブラ道～の次回の契約更新はいつですか？", "革命TRIBE！～じブラ道～を解約したいです", "上記の質問以外の質問があります。"], //その他
};



// 選択肢分岐を管理するオブジェクト
const branchingResponses = {
  "DDS・MVD": {
    followUpOptions: ["DDS", "MVD",],
  },
  "DDS": {
    followUpOptions: ["申し込みフォーム"],
  },
  "MVD": {
    followUpOptions: ["申し込みフォーム"],
  },
  "リカレの再受講": {
    followUpOptions: [""],
  },
  "知り合いに紹介したい": {
    followUpOptions: ["紹介料はいつ入りますか？", "紹介者を出しましたが、本講座に申し込んだか知りたいです", "紹介リンクはどうやって発行したらいいですか？"],
  },
  "解約月について": {
    followUpOptions: ["こちらのリンクより、メールアドレスと電話番号で照合できます。<br><a href='https://jb-revo.com/lp/tribe_cancel/'>https://jb-revo.com/lp/tribe_cancel/</a><br>※照合できない場合は、お手数ですが、事務局までご連絡ください。",],
  },
  "決済できません": {
    followUpOptions: ["こちらより、決済ご希望のカード情報のご入力をいただけますと幸いです。<a href='https://jb-revo.com/lp/tribe_cardchange/'>https://jb-revo.com/lp/tribe_cardchange/</a>",],
  },
  "申し込んだ講座をキャンセルしたい": {
    followUpOptions: ["講座名1", "講座名2"],
  },
  "革命室って何ですか？": {
    followUpOptions: ["革命室とは月に1回開催する弊社トレーナーによる公開セッションです。<br>毎月、革命TRIBE！会員の皆さまの中からクライアント役を募集し、弊社トレーナー陣の誰か1人が、マンツーマンセッション形式で、担当いたします。<br>毎月、革命室開催の約2週間前から約1週間前まで、メールとFacebookグループにてクライアント役を募集致します。<br>クライアント役以外の方は、セッションを見学することが可能です。また、革命室の最後の時間にはトレーナーへセッションに関して質問をしていただくこともできます。<br>また、セッションの内容はプライバシーに関わることも含まれる可能性がありますので、録画による動画配信はありません。"],
  },
  "動画配信はありますか？": {
    followUpOptions: ["動画配信の有無につきましては、イベント毎に異なります。イベントページもしくは、お申込み後の自動返信メールのいずれかに記載しております。<br>なお、動画配信する際は、メールもしくはFacebookグループにて案内させていただきます。"],
  },
  "革命TRIBE！～じブラ道～を解約したらその他の商品のコンテンツも見れなくなりますか？": {
    followUpOptions: ["その商品の契約満了日に自動解約となり、契約の更新は出来かねます。<br>システムの関係上、商品解約後は商品コンテンツが見れなくなりますので、必要なコンテンツは解約前に視聴等していただきますよう、お願いいたします。"],
  },
  "グループコンサルやイベントを欠席します": {
    followUpOptions: ["グループコンサルやイベントの途中参加、途中退出、欠席の場合でも弊社への連絡は不要です。<br>動画配信のあるものにつきましては、概ねグループコンサルやイベントの２営業日以内に配信いたします。グループコンサルやイベントの内容は動画にてご確認いただきますようお願いいたします。また、動画視聴URLなどはFacebookグループやメールにて案内致します。"],
  },
  "Zoomリンクがわかりません": {
    followUpOptions: ["こちらより、決済ご希望のカード情報のご入力をいただけますと幸いです。<a href='https://jb-revo.com/lp/tribe_cardchange/'><br>https://jb-revo.com/lp/tribe_cardchange/</a>",],
  },
  "紹介料はいつ入りますか？": {
    followUpOptions: ["紹介料は、本講座2日目終了後の翌月の25日お支払いします。<br>例）本講座2日目が3/7の場合、4/25にお振込いたします。<br>■紹介料のルールについてはこちら<a href='https://jb-revo.com/contents/evangelist/'><br>https://jb-revo.com/contents/evangelist/</a>■エバンジェリスト専用サイト<br>（紹介用URLの発行サイト）はこちら<a href='https://onlinerevo.jp/ap/o4Hj1jxe/top.html'>https://onlinerevo.jp/ap/o4Hj1jxe/top.html</a>",],
  },
  "紹介者を出しましたが、本講座に申し込んだか知りたいです": {
    followUpOptions: ["説明会に各日程2,000〜2,500名ほどの方がお申込みされますので、集計に少々お時間を要します。<br>紹介者様の本講座お申し込み状況につきましては、本講座2日目終了後にエバンジェリスト専用サイトに反映されます。<br>■エバンジェリスト専用サイト（紹介用URLの発行サイト）はこちら<br><a href='https://onlinerevo.jp/ap/o4Hj1jxe/top.html'>https://onlinerevo.jp/ap/o4Hj1jxe/top.html</a>",]
  },
  "紹介リンクはどうやって発行したらいいですか？": {
    followUpOptions: ["紹介リンクの発行方法に関して動画をご用意しておりますので、コチラよりご確認ください。<br>■エバンジェリスト専用サイト（紹介用URLの発行サイト）はこちら<br><a href='https://onlinerevo.jp/ap/o4Hj1jxe/top.html'>https://onlinerevo.jp/ap/o4Hj1jxe/top.html</a>",]
  },
  "エバンジェリスト会員サイトへログイン方法がわかりません": {
    followUpOptions: ["",]
  },
  "SNSやツールの使い方がわからないです": {
    followUpOptions: ["",]
  },
  "会員サイトアプリのインストール方法がわかりません": {
    followUpOptions: ["会員サイトアプリ(Kajabi)のインストール方法はコチラよりご確認ください。",]
  },
  "会員サイトのログイン方法がわかりません": {
    followUpOptions: ["メールアドレスはWeb講座にお申込みされた際のメールアドレスでログインください。パスワードがわからない場合は、『パスワードがわからない時はコチラ』からパスコードの再設定をお願いいたします。",]
  },
  "会費を払っているクレジットカードを変更したいです": {
    followUpOptions: ["ご登録のクレジットカードのご変更については、以下のフォームより事務局までご連絡ください。<br>お問い合わせ内容を確認後、事務局よりメールにてご案内いたします。<br>▼クレジットカード変更のご連絡はこちらから<a href='https://1lejend.com/stepmail/kd.php?no=dmrylTgc'>https://1lejend.com/stepmail/kd.php?no=dmrylTgc</a>"],
  },
  "革命TRIBE！～じブラ道～の次回の契約更新はいつですか？": {
    followUpOptions: ["革命TRIBE！～じブラ道～は年間契約ですので、契約開始日から1年後に契約更新となります。なお、契約は自動更新です。"],
  },
  "革命TRIBE！～じブラ道～を解約したいです": {
    followUpOptions: ["革命TRIBE！～じブラ道～は年間契約ですので途中解約は出来かねます。<br>解約につきましては、契約満了月の上旬に『【重要】年間更新のお知らせ』の件名で更新停止フォームをご案内しますので、そちらよりお手続きをお願いいたします。<br>なお、確実な解約処理のために、ご本人さまによる更新停止フォーム入力にご協力いただいております。メールやFacebookメッセージでの解約は出来かねますので、ご了承ください。"],
  },
  "上記の質問以外の質問があります。": {
    followUpOptions: ["こちらのフォームにより、ご入力ください。"],
  },

};

// チャットボットの応答を表示する関数
function displayChatbotMessage(message) {
  const chatMessage = document.createElement("div");
  chatMessage.classList.add("chatbot-message");

  if (typeof message === 'string') {
    // もしテキストの場合、テキストを設定
    chatMessage.textContent = message;
  } else {
    // もしHTML要素が渡された場合、その要素を追加
    chatMessage.appendChild(message);
  }

  chatOutput.appendChild(chatMessage);
}


// オプションボタンがクリックされたときの処理
optionButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const nextOptionsKey = button.getAttribute("data-next-options");
    const nextOptions = chatbotResponses[nextOptionsKey];



    if (nextOptions) {
      // ユーザーの選択肢を表示
      displayChatbotMessage("選んでください：");
      nextOptions.forEach(function (option) {
        // 各選択肢をボタンにして表示
        const newButton = document.createElement("button");
        newButton.classList.add("option-button");
        newButton.setAttribute("data-next-options", option);
        newButton.innerText = option;
        newButton.addEventListener("click", function () {
          // ボタンがクリックされたときの処理
          const nextOptionsKey = newButton.getAttribute("data-next-options");
          const nextOptions = chatbotResponses[nextOptionsKey];
          if (nextOptions) {
            displayChatbotMessage("選んでください：");
            nextOptions.forEach(function (opt) {
              const subButton = document.createElement("button");
              subButton.classList.add("option-button");
              subButton.setAttribute("data-next-options", opt);
              subButton.innerText = opt;
              displayChatbotMessage(subButton);
            });
          }
        });
        displayChatbotMessage(newButton);
      });
    } else {
      const buttonText = button.innerText;
      const branchingOptions = branchingResponses[buttonText];

      if (branchingOptions) {
        displayChatbotMessage("選んでください：");
        branchingOptions.followUpOptions.forEach(function (option) {
          const newButton = document.createElement("button");
          newButton.classList.add("option-button");
          newButton.setAttribute("data-next-options", option);
          newButton.innerText = option;
          newButton.addEventListener("click", function () {
            const nextOptionsKey = newButton.getAttribute("data-next-options");
            const nextOptions = chatbotResponses[nextOptionsKey];
            if (nextOptions) {
              displayChatbotMessage("選んでください：");
              nextOptions.forEach(function (opt) {
                const subButton = document.createElement("button");
                subButton.classList.add("option-button");
                subButton.setAttribute("data-next-options", opt);
                subButton.innerText = opt;
                displayChatbotMessage(subButton);
              });
            }
          });
          displayChatbotMessage(newButton);
        });
      } else {
        displayChatbotMessage("ごめんなさい、選択肢がありません。");
      }
    }
  });
});


// ボタン内の選択肢がクリックされたときの処理
chatOutput.addEventListener("click", function (event) {
  if (event.target && event.target.classList.contains("option-button")) {
    const nextOptionsKey = event.target.getAttribute("data-next-options");
    const nextOptions = chatbotResponses[nextOptionsKey];

    if (nextOptions) {
      // ユーザーの選択肢を表示
      displayChatbotMessage("選んでください：");
      nextOptions.forEach(function (option) {
        // 各選択肢をボタンにして表示
        displayChatbotMessage(`<button class="option-button" data-next-options="${option}">${option}</button>`);
      });
    } else {
      const buttonText = event.target.innerText;
      const branchingOptions = branchingResponses[buttonText];

      if (branchingOptions) {
        displayChatbotMessage("選んでください：");

        // ボタン要素を含むコンテナを作成
        const buttonContainer = document.createElement("div");

        branchingOptions.followUpOptions.forEach(function (option) {
          const newButton = document.createElement("button");
          newButton.classList.add("option-button");
          newButton.setAttribute("data-next-options", option);
          newButton.style.textAlign = "left";
          newButton.innerHTML = option;
          // ボタンをコンテナに追加
          buttonContainer.appendChild(newButton);

          newButton.addEventListener("click", function () {
            const nextOptionsKey = newButton.getAttribute("data-next-options");
            const nextOptions = chatbotResponses[nextOptionsKey];
            if (nextOptions) {
              displayChatbotMessage("選んでください：");

              // サブボタン要素を含むコンテナを作成
              const subButtonContainer = document.createElement("div");

              nextOptions.forEach(function (opt) {
                const subButton = document.createElement("button");
                subButton.classList.add("option-button");
                subButton.setAttribute("data-next-options", opt);
                subButton.style.textAlign = "left";
                subButton.innerHTML = opt;

                // サブボタンをコンテナに追加
                subButtonContainer.appendChild(subButton);
              });

              // サブボタンコンテナを表示
              displayChatbotMessage(subButtonContainer);
            }
          });
        });

        // ボタンコンテナを表示
        displayChatbotMessage(buttonContainer);
      }

      else {
        displayChatbotMessage("ごめんなさい、選択肢がありません。");
      }
    }
  }
});


