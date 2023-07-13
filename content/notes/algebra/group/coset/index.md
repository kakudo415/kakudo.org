---
title: "剰余類"
date: 2023-06-23T12:11:00+09:00
draft: false
---

## 命題 1

$G$ を群, $H$ を $G$ の部分群とする.

$$
\forall g \in G, \quad |gH| = |Hg| = |H|.
$$

### 証明

写像 $\phi \colon H \rightarrow gH$ を $\phi(h) = gh$ と定義する. $\phi$ は明らかに全射である.

$h_1, h_2 \in H$ に対して, $\phi(h_1) = \phi(h_2)$ と仮定する. $\phi$ の定義から $gh_1 = gh_2$.

この両辺に左から $g^{-1}$ をかけることで $h_1 = h_2$ を得る. よって $\phi$ は単射.

$\phi$ が全単射であることが示されたため, $|gH| = |H|$.

$|Hg| = |H|$ も同様.

（証明終）

## 参考文献

- [代数学1　群論入門｜日本評論社](https://www.nippyo.co.jp/shop/book/5462.html), p.52