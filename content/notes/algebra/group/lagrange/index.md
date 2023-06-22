---
title: 'ラグランジュの定理'
---

## 定理 1

*Lagrange's theorem*

$N$ を $G$ の部分群とし, $G$ が有限群であるとする. このとき次が成り立つ.
$$|N| \lbrack G:N \rbrack = |G|$$

### 証明

剰余類は同値類であるため, $G$ は $N$ の左剰余類に関して次のように（交わらないように）割ることができる.

$$
G/N = \lbrace gN \\; | \\; g \in G \rbrace
$$

この各左剰余類 $gN$ に対して, $|gN| = |N|$ である. （[剰余類](/notes/algebra/group/coset/)参照）

左剰余類の数は $\lbrack G:H \rbrack$ と表されるため次の式が得られる.

$$|N| \lbrack G:N \rbrack = |G|$$

（証明終）

#### 証明の気持ち

剰余類の直和として $G$ を見る.

- 剰余類の元は $|N|$ 個ずつ
- 剰余類の数は $\lbrack G:N \rbrack$ である

## 系 1

$G$ を位数が素数 $p$ の群とする. このとき, $G$ は巡回群である.

### 証明

$1_G \ne x \in G$ なる $x$ をとり, $N = \langle x \rangle$ とする. （つまり $N$ は巡回群.）

$x \ne 1_G$ より $|N| \ne 1$.

**定理 1** から $|N| \lbrack G:N \rbrack = |G| = p$ であるため, $|N| = p$.

元の個数が等しいため, $G = N$.

（証明終）

## 参考文献

- [Applied Abstract Algebra | SpringerLink](https://link.springer.com/book/10.1007/978-1-4757-2941-2), p.104
- [代数学1　群論入門｜日本評論社](https://www.nippyo.co.jp/shop/book/5462.html), p.53