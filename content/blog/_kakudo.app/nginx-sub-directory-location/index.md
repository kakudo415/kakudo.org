---
title: "nginxでrewriteを使わずにディレクトリ構造にするproxy_pass"
date: 2018-08-22T00:00:00+09:00
tags: ["Former Blog Post", "Web", "nginx"]
draft: false

aliases:
  - /2018/08/22/nginx-dir/
---

{{% remark "warning" %}}
この記事は[昔のブログ](https://github.com/kakudo415/blog)から引っ越してきた古い内容です。
{{% /remark %}}

こんにちは、今回はこのブログのようにドメインの後ディレクトリを挟んでアプリケーションを動かすときにrewriteを使わない方法をご説明します  

## locationで正規表現を使う
locationを指定するところで下のようにチルダ等を入れることで単に前方一致ではない正規表現を使うことができます  
```
location =  完全一致 {}
location ^~ 正規表現(マッチしたら検索終了) {}
location ~  正規表現 {}
location ~* 正規表現(大文字小文字区別しない) {}
```

## マッチした文字列を変数にする
```
location ~ (?<変数名>正規表現) {}
```

このように変数名を指定して正規表現を使いかっこで括ることでlocation内で使える変数を作ることができます（変数名は既存のものと被らないように）  
そしてこのように書くことで  
```
location ~ /dir/(?<path>.*) {
	proxy_pass http://localhost:12345/$path$is_arg$args;
}
```

**$path** には`/dir/`以下のURLが入り、  
**$is_args** にはクエリがある場合に ? が入り、  
**$args** にクエリが入るので、正しく`/dir/`を飛ばしてリバースプロキシできるわけですね  

## 最後に(rewriteとの比較)
自分の環境ではrewrite時にPOSTするとうまくいかないところがあったので他のやり方を探したところこれが良さそうだと思いました 
