---
title: "GDB 使い方備忘録"
date: 2023-04-17T15:05:50+09:00
tags: ["GDB"]
draft: false

aliases:
  - /2023/04/17/gdb-usage/
---

最近、[低レイヤを知りたい人のためのCコンパイラ作成入門](https://www.sigbus.info/compilerbook)を写経しています。
模範コードが常にあるわけではないので当然バグらせまくっているわけですが、アセンブリを出力するこの手のプログラムはなかなかデバッグが難しいです。
そこで重い腰をあげてGDBに挑戦してみたので備忘録です。

## 基本

```terminal
$ gdb {プログラム名}
```

で起動。ブレークポイントを設定後、実行します。

```gdb
break {ラベル名}
run
```

AT&T記法が見づらい場合はIntel構文に変更。`gdbinit`に書いておいてもいいですね。

```gdb
set disassembly-flavor intel
```

逆アセンブルしたコードの表示と現在のレジスタ情報を出す。

```gdb
layout asm
layout regs
```

そして、現在の地点からステップ実行します。

| コマンド | 略記 | 効果                                               |
| :------- | :--- | :------------------------------------------------- |
| `next`   | `n`  | 次の行まで実行（関数呼び出しなら関数全体を実行）   |
| `nexti`  | `ni` | 次の機械語を実行（関数呼び出しなら関数全体を実行） |
| `step`   | `s`  | 次の行まで実行（関数呼び出しなら関数の中に入る）   |
| `stepi`  | `si` | 次の機械語を実行（関数呼び出しなら関数の中に入る） |

コマンド入力画面でそのままENTERを押すと直前のコマンドを再度実行してくれるため、ステップ実行時などに便利です。

## 一時停止・再開

### ブレークポイント

```gdb
break 位置
```

#### 次のブレークポイントまで実行

```gdb
continue
```

#### 一覧表示・削除

ブレークポイントの番号は`info`コマンドで得ることができる．

```gdb
info breakpoints
delete breakpoints 番号
```

## 変数検査

### 自動表示

自動表示コマンド`display`を使うことで，プログラムが停止するたびに変数の内容などを表示することができます．

```gdb
display 変数・式
```

一覧表示・削除はブレークポイントと同様です．

```gdb
info display
delete display 番号
```

## メモリ検査

`x`コマンドを使います（examineの略らしい）。

### 構文

```
x /nfu addr
```

- `n`: いくつ表示するか
- `f`: 表示フォーマット
- `u`: メモリサイズ
- `addr`: 表示したいメモリの先頭アドレス

#### 表示フォーマット

| フォーマット文字       | 出力内容                   |
| ---------------------- | -------------------------- |
| `x` ･ **デフォルト値** | 16進数                     |
| `d`                    | 10進数                     |
| `u`                    | 10進数（符号なし）         |
| `o`                    | 8進数                      |
| `t`                    | 2進数（twoの頭文字らしい） |
| `a`                    | アドレスとしての表示       |

他にもあるので、[Output Formats (Debugging with GDB)](https://sourceware.org/gdb/current/onlinedocs/gdb.html/Output-Formats.html)も合わせてご覧ください。

#### メモリサイズ

| メモリサイズ文字               | サイズ |
| ------------------------------ | ------ |
| `b` (byte)                     | 1 Byte |
| `h` (halfwords)                | 2 Byte |
| `w` (words) ･ **デフォルト値** | 4 Byte |
| `g` (giant words)              | 8 Byte |

### 例

#### スタック表示

スタックの上位10ワードを表示します。`$sp`はスタックポインタ。

```gdb
x /10 $sp
```

## 参考文献

- [Output Formats (Debugging with GDB)](https://sourceware.org/gdb/current/onlinedocs/gdb.html/Output-Formats.html)
- [Memory (Debugging with GDB)](https://sourceware.org/gdb/current/onlinedocs/gdb.html/Memory.html)
- [Stopping (Debugging with GDB)](https://sourceware.org/gdb/current/onlinedocs/gdb.html/Stopping.html#Stopping)
