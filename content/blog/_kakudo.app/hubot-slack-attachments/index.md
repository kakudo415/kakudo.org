---
title: "HubotでSlackにattachments付きのリッチなメッセージを送る"
date: 2018-08-29T00:00:00+09:00
tags: ["Former Blog Post", "Slack"]
draft: false

aliases:
  - /2018/08/29/hubot-slack-attachments/
---

{{% remark "warning" %}}
この記事は[昔のブログ](https://github.com/kakudo415/blog)から引っ越してきた古い内容です。
{{% /remark %}}

こんにちは、今回はJavaScriptでSlackにリッチなメッセージをHubotを使って送りたいと思います（今回は備忘録的な記事です）  
調べてもCoffeeScriptの情報が多かったりしてわかりにくかったので、出来たことを書いていきます  
また2018年8月時点での情報ですので（hubot-slack version 4.5.4）、未来からご覧の方はうまく動かない可能性があります
## データ構造
hubot-slackは所定の形のObjectを渡してやることで、通常の使用では使えないリッチな表現をすることができます（attachments）  
```
let msg = new Object;  
msg = {
  attachments: [ // 配列なので注意！複数同時に送れます
    {
      title: "太字になり最初の記載されます",
      text: "本文です",
      fields: [ // フィールドも配列です、複数可
        {
          title: "フィールドのタイトルです",
          value: "フィールドの内容",
          short: true // 十分横幅が小さいか？trueの場合２列に並べられます
        }
      ]
    }
  ]
}
```

全て書いていませんがこのようにattachments配列の中に書いていくことでデザインが可能です  
さらに知りたい方は[Slack Attachments](https://api.slack.com/docs/message-attachments)をご覧ください  

## Slackに投稿する
```
robot.send({room: '送り先のチャンネル名'}, msg);
```

このようにObjectを使ってチャンネルを指定して投稿できます

短い記事でしたが、意外と簡単にSlackのリッチなメッセージを作成できることがお分りいただけたかと思います
