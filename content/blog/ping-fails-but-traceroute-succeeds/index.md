---
title: "Pingが失敗したのにtracerouteだけ通った謎"
description: "pingを実行したら失敗したが、tracerouteで確認しようとしたら通ってしまい、余計に混乱した話"
thumbnail: "ping-fails.png"
date: 2023-07-27T15:08:19+09:00
draft: false
---

## 今回起きた問題

以前、[研究室PCにCloudflare TunnelsでSSHする](https://kakudo.org/blog/cloudflare-tunnels-into-lab/)で外部から接続できるようにしたPCに繋がらなくなりました。
どうやらルータが変わったようで、ならばとケーブルを差し替えて`ping`を打ってみます。通りません。

そこで、問題が起きている場所を探るために`traceroute`を叩いてみます。
不思議なことに、今度は最後まで通るのです。
他にもいろいろやってみると、むしろ`ping`だけが通らないように見えます。

| コマンド                    | 結果   |
| --------------------------- | ------ |
| `ping www.google.com`       | ❌ 不通 |
| `ping www.tus.ac.jp`        | ✅ 成功 |
| `traceroute www.google.com` | ✅ 成功 |
| `curl www.google.com`       | ✅ 成功 |

### 似た事例

途方に暮れていたところ、[pingは通るのにtracerouteは通らない - dullwhaleのメモ帳](https://dullwhale-public.hateblo.jp/entry/2022/01/20/160134)という記事を見つけました。
僕のちょうど逆（[逆ではない](https://ja.wikipedia.org/wiki/%E9%80%86)）パターンです。

この記事によると、ファイアウォールなどによって、プロトコルごとに通信が許可されたりされなかったりする場合があると言います。

## 調査

ICMPがブロックされているのではないかと仮説を立てて、調べてみます。

デフォルトではUDPを使用する`traceroute`ですが、`-I`オプションをつけることでICMPを使うように設定できます。

```
traceroute -I www.google.com
```

すると、無事？失敗しました。
先程は通過できていた4番目のルータで返答がありません。
どうやら、これがファイアウォールだったようです。
`www.tus.ac.jp`宛だと`ping`が成功したのは、大学内部のネットワークだったからなのでしょう。

### Ping ･ traceroute

もう少し両コマンドについて調べてみると、`traceroute`もICMPを利用しているようです。
UDPでテスト用のパケットを送信しているものの、TTL切れを知らせるメッセージはICMPで返ってくるからです。
それが正しく返ってきていることを考えると、先程のファイアウォールはICMPのecho requestのみをブロックしているのだと思われます。

### Cloudflare Tunnels

肝心のTunnelは繋がっていました。

## 結果

`ping`に失敗したものの、当初の予想通り、LANケーブルを差し替えた時点で接続は復活していたというオチでした。
いつでもインターネット疎通確認に`ping`が使えるとは限らないということですね。
