---
title: "SSH先でもVS Codeで作業する方法"
description: ""
images: ["remote-ssh-extension.png"]
date: 2023-06-21T16:46:49+09:00
draft: false
---

拡張機能**Remote - SSH**をインストールします。

![Remote SSH 拡張機能](remote-ssh-extension.png)

リモートエクスプローラーが左のアクティビティバーに追加されるので、そこからSSH接続先を選択します。
`~/.ssh/config`を参照していると思われるので、未設定の人はこの機会にやっておくといいです。

[研究室PCにCloudflare TunnelsでSSHする](/blog/cloudflare-tunnels-into-lab/)も合わせてどうぞ

![リモートエクスプローラー](remote-explorer.png)

SSHでサーバに接続できたら、次にフォルダ（ディレクトリ）を開きます。

![ファイルまたはフォルダーを開くメニュー](remote-open-folder.png)

拡張機能は、ローカルと接続先で別々に管理されているようです。

ローカルにインストールされている拡張機能をリモート先にも導入するボタンがあるので、そこからまとめてインストールします。

![ローカル拡張機能を接続先にもインストールする](remote-extensions-installing.png)

もちろん、個別にインストールすることもできます。

![C/C++ 拡張機能](remote-c-extension.png)

これでローカルのファイルを編集するのと同じようにリモートでも作業できます！便利！

![リモートサーバにあるCファイルを編集しているところ、補完がちゃんと効いている](remote-c-editing.png)