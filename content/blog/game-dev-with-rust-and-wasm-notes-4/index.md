---
title: "O'Reilly『RustとWebAssemblyによるゲーム開発』を進める（4章）"
description: "『RustとWebAssemblyによるゲーム開発』4章の感想と、可能な限り要点の解説も試みる。"
thumbnail: ""
date: 2023-09-16T16:38:40+09:00
draft: false
---

引き続き、『RustとWebAssemblyによるゲーム開発』を進めるなかで学んだことを、書き留めておきます。

{{% remark "supplement" %}}
- [1･2･3章](/blog/game-dev-with-rust-and-wasm-notes-1-3/)
- 4章（この記事）
{{% /remark %}}

## 学んだこと

4章では、ステートマシンを利用して、主人公（RedHatBoy）の状態遷移を実装しました。

主人公を、走らせたり、ジャンプさせたり、スライディングさせたりできるようになります。

### 実装したステートマシンの構造

```rust
struct RedHatBoy {
    state_machine: RedHatBoyStateMachine,
    // other fields
}

enum RedHatBoyStateMachine {
    Idle(RedHatBoyState<Idle>),
    Running(RedHatBoyState<Running>),
    Sliding(RedHatBoyState<Sliding>),
    Jumping(RedHatBoyState<Jumping>),
}

struct RedHatBoyState<S> {
    context: RedHatBoyContext,
    _state: S,
}

struct RedHatBoyContext {
    // fields
}

struct Idle;
struct Running;
struct Sliding;
struct Jumping;

enum Event {
    Run,
    Slide,
    Jump,
    Update,
}

impl RedHatBoyStateMachine {
    fn transition(self, event: Event) -> Self {
        match (self, event) {
            (RedHatBoyStateMachine::Idle(state), Event::Run) => state.run().into(),
            (RedHatBoyStateMachine::Running(state), Event::Slide) => state.slide().into(),
            (RedHatBoyStateMachine::Idle(state), Event::Update) => state.update().into(),
            (RedHatBoyStateMachine::Running(state), Event::Update) => state.update().into(),
            (RedHatBoyStateMachine::Sliding(state), Event::Update) => state.update().into(),
            (RedHatBoyStateMachine::Running(state), Event::Jump) => state.jump().into(),
            (RedHatBoyStateMachine::Jumping(state), Event::Update) => state.update().into(),
            _ => self,
        }
    }
}
```

`RedHatBoyStateMachine`の状態が、`Event`に応じて切り替えられます。

`Run`・`Slide`・`Jump`は、キーが押されたときに発火します。
それぞれ、右矢印・下矢印・スペースに対応しています。

`Update`は少し特殊で、毎フレーム実行されます。
プレイヤーからの入力がなくとも、状態を遷移させたい場合があるからです。
たとえば、主人公をジャンプさせたとき、`Jumping`に遷移した状態を、着地時に`Running`に戻す必要があります。

### 型レベルステートマシン

コードを読むと、ステートマシンがただの`enum`ではなく、**くどい**書き方になっていることがわかります。

```rust
enum RedHatBoyStateMachine {
    Idle(RedHatBoyState<Idle>),
    Running(RedHatBoyState<Running>),
    Sliding(RedHatBoyState<Sliding>),
    Jumping(RedHatBoyState<Jumping>),
}

struct Idle;
struct Running;
struct Sliding;
struct Jumping;
```

次のようにしては、なぜいけないのでしょうか。

```rust
enum RedHatBoyStateMachine {
    Idle(RedHatBoyContext),
    Running(RedHatBoyContext),
    Sliding(RedHatBoyContext),
    Jumping(RedHatBoyContext),
}
```

列挙型のみの下の表現では、状態遷移のメソッドは`RedHatBoyStateMachine`列挙型に対して実装されることになります。
これでは、空中にいるのにスライディングするといった無効な状態遷移を書いてしまうかもしれません。

対して上の表現では、列挙型のバリアントそれぞれが`RedHatBoyState<S>`を持っています。
この内部の型`RedHatBoyState<S>`にのみ、状態遷移のメソッドを実装するようにします。
たとえば、`RedHatBoyState<Running>`にのみ`RedHatBoyState<Jumping>`への遷移メソッドを定義します。
すると無効な状態遷移を心配する必要がなくなるわけです。

## 参考文献

- [O'Reilly Japan - RustとWebAssemblyによるゲーム開発](https://www.oreilly.co.jp/books/9784814400393/)
- [Pretty State Machine Patterns in Rust](https://hoverbear.org/blog/rust-state-machine-pattern/)
