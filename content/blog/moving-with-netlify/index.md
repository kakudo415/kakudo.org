---
title: "Netlifyを使ってリンク切れさせずにサイトを引っ越す方法"
date: 2023-06-13T01:39:39+09:00
description: "Netlifyの301リダイレクト機能を使って、旧サイトへのリンクを切らさずに引っ越しを実現する"
tags: ["Netlify"]
draft: false
---

## 経緯（本題は下にあります）

Blueskyが流行りはじめて数か月経ちましたね。
このSNSはいろいろ画期的なんですが、ぱっと目につくのは公式マークの代わりにドメインを使って本人を表すところです。
たとえば、Bluesky運営のアカウントは[@bsky.app](https://bsky.app/profile/bsky.app)というアプリ自体のドメインをユーザ名にすることで本物であることを証明しています。

そんな環境にいると自分もドメインを使ったユーザ名を使いたくなるわけなんですが、最近使っていたドメインはちょっと長すぎます。
そしてユーザ名のために短いドメインを用意したが運の尽き、ほかのWebサイト等も全部乗り換えたくなってしまいました。

前ブログでの[『このサイトを作るときに気をつけたこと』](https://kakudo.org/blog/3rd-generation-blog/)にも書いたように、URLというのは変わらないことがまずもって大事なわけです。
にもかかわらず1年たたずに乗り換えとは言語道断ですが、せめてもの償いに**301 Redirect**を設定したので手順をまとめておきます。

## 本題

この記事では、[Netlify](https://www.netlify.com/)を利用してGitHub Pagesで公開していたサイトの新サイトへのリダイレクトを行います。

### リダイレクトの設定ファイルを作成する

`_redirects`というファイルをプロジェクトのルートに置くことでリダイレクトが可能です。

フォーマットは、**リダイレクト元**、**先**、**オプション**を順にスペース区切りで並べます。

たとえば、旧[kakudokentaro.com](https://kakudokentaro.com/)からのリダイレクト設定を簡単に書くと以下のようになります。

```
/       https://kakudo.org/            301!
/about/ https://kakudo.org/about/      301!
/blog/* https://kakudo.org/blog/:splat 301!
```

```
/       https://kakudo.org/            301!
/about/ https://kakudo.org/about/      301!
```

この行は`/`･`/about/`に来たアクセスを`kakudo.org`にステータスコード301でリダイレクトしています。最後の`!`は強制リダイレクトを表していて、たとえ既存のサイトに該当ページが存在してもリダイレクトを行います。今回は引っ越しが目的なので旧サイトのページは無視してもらう必要があります。

```
/blog/* https://kakudo.org/:splat      301!
```

既存ページをすべてリストアップして、ひとつひとつ対応付けてももちろん良いのですが、あまりに面倒なのでまとめて設定する方法が用意されています。
それが[Splats](https://docs.netlify.com/routing/redirects/redirect-options/#splats)で、`*`でマッチした文字列を`:splat`に展開できます。

[Redirects and rewrites | Netlify Docs](https://docs.netlify.com/routing/redirects/)

### 設定ファイルを「生成後」にルートに来る位置に置く

あとはデプロイするだけなんですが、一応注意しておくべきなのは、設定ファイルは**生成後のルート**に来る必要があるということです。
たとえば、[Hugo](https://gohugo.io/)などの静的サイトジェネレータを利用している場合、`_redirects`はプロジェクトルートではなく`static`ディレクトリに置く必要があります。

### DNSを書き換える

Netlifyのダッシュボードに全て手順が書いてある通りに、旧サイトで利用しているドメインのDNSを書き換えます。
Google Domainsは`ALIAS`レコード等に対応していなかったので、`A`レコードをダッシュボードに書いてある値に書き換えました。

これで旧サイトに来たアクセスはすべて新サイトにリダイレクトされます！

## おわりに

まだ始めたばかりで全然知り合いがいないので、ぜひ繋がってください･･･。

[Bluesky @kakudo.org](https://bsky.app/profile/kakudo.org)