---
title: "『RustとWebAssemblyによるゲーム開発』の感想"
description: "『RustとWebAssemblyによるゲーム開発』の感想と、可能な限り要点の解説も試みる"
thumbnail: "rhb.png"
date: 2023-07-26T15:16:38+09:00
draft: false
---

これを買わずして何を買うという本が出たので、読み進めています。

[O'Reilly Japan - RustとWebAssemblyによるゲーム開発](https://www.oreilly.co.jp/books/9784814400393/)

しかし、ただ読んで手順通りに丸写ししただけでは何をやったかすぐに忘れてしまいそうなので、この記事に要点をまとめておきたいと思います。

著者と僕のリポジトリは以下の通りです。合わせてご覧ください。

- 著者: [PacktPublishing/Game-Development-with-Rust-and-WebAssembly](https://github.com/PacktPublishing/Game-Development-with-Rust-and-WebAssembly)
- 拙作: [kakudo415/wasm-game-rs](https://github.com/kakudo415/wasm-game-rs)

{{% remark "supplement" %}}
やっと3章まで読み終わったところで、まだまだ書きかけです。
{{% /remark %}}

## 構成

この本は、『Walk the Dog』という横スクロールゲームを作りながら、どのようにゲームを制作するか学ぶものです。
インクリメンタルな開発スタイルとなっているため、ある程度進むごとに段階に応じた何かができます。
ブラウザ上に線を引くところから始めて、画像を描画し、それをアニメーションして、･･････といった具合です。

以上の内容をRustで書き、WebAssemblyにコンパイルして、ブラウザで実行します。
ただし残念ながら、JavaScript APIから逃げることはできません。
ブラウザで動くアプリケーションを書く以上、どうしてもブラウザのAPIを避けては通れず、Rust（ないしコンパイルされたWebAssembly）からJavaScript APIを呼び出す必要があるのです。
非常に相性の悪い両言語なので間で苦しむことも多々ありますが、それでもRustで書ける喜びを味わうことができます。

なお、ある程度Rustが書けることが要求されますが、WebAssemblyについての事前知識は必要なさそうです。

## 要点

### JavaScriptにおけるメインループ

[`window.requestAnimationFrame()`](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)を使うことで、次の再描画前に特定のコールバック関数を呼んでもらえます。
コールバック内で再帰的に`window.requestAnimationFrame()`を呼ぶことでメインループが作れるわけです。

```js
function callback() {
  // 入力の処理
  // いろいろする...
  // <canvas>への再描画
  window.requestAnimationFrame(callback); // 再帰的に呼び出す
}

window.requestAnimationFrame(callback);
```

ただし、ゲームというのは往々にして重い処理を行うもので、必ず16ms以下（60Hzディスプレイの場合）で再描画が終わるとは限りません。
そのためこの本では、決まった時間で再描画が終わらなかった場合、次のように内部状態の更新のみを行い描画をスキップして追いつかせる工夫がなされています。

```js
function callback() {
  // 入力の処理
  // いろいろする...
  while (/* 以前の描画から1フレーム時間以上経っているとき */) {
    // 内部状態の更新
  }
  // <canvas>への再描画
  window.requestAnimationFrame(callback); // 再帰的に呼び出す
}

window.requestAnimationFrame(callback);
```

さて、ここからが問題で、`window.requestAnimationFrame()`はWebAssemblyから呼べるにしても、それ以外の部分はRustに落とし込まなければなりません。

### RustとJavaScriptの連携

冒頭で述べたように、RustとJavaScript (API)の相性は非常に悪いです。
前の項目で触れたメインループに至っては、コンパイルが通らない部分しか見当たらないほどです。

それでもRustに落とし込むために、2つのポインタ`f`･`g`から参照されるクロージャとして先述のコールバックを作ります。
このポインタをそれぞれクロージャ自身と外部に所有させることで所有権の問題を回避できるのです。

```rust
let f: Rc<RefCell<Option<LoopClosure>>> = Rc::new(RefCell::new(None));
let g = f.clone();

*g.borrow_mut() = Some(browser::create_raf_closure(move |perf: f64| {
    // 入力の処理
    // いろいろする...
    while /* 以前の描画から1フレーム時間以上経っているとき */ {
        // 内部状態の更新
    }
    // <canvas>への再描画
    browser::request_animation_frame(f.borrow().as_ref().unwrap());
}));

browser::request_animation_frame(
    g.borrow()
        .as_ref()
        .ok_or_else(|| anyhow!("No loop closure"))?,
)?;
```

他にもJavaScriptとRustの違いとして、可変長引数への対応があります。
JavaScriptではひとつの関数でも、引数の数を可変にすることができないRustでは、引数の数ごとに別途関数が用意されているのです。
そのため、JavaScriptの引数9個[`drawImage()`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage)に対応する関数が[`draw_image_with_html_image_element_and_sw_and_sh_and_dx_and_dy_and_dw_and_dh()`](https://rustwasm.github.io/wasm-bindgen/api/web_sys/struct.CanvasRenderingContext2d.html)というとんでもない名前になってしまったりします。

## 参考文献

- [O'Reilly Japan - RustとWebAssemblyによるゲーム開発](https://www.oreilly.co.jp/books/9784814400393/)
- [Anatomy of a video game - Game development | MDN](https://developer.mozilla.org/en-US/docs/Games/Anatomy)
- [Basic animations - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_animations)
- [Advanced animations - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Advanced_animations)
