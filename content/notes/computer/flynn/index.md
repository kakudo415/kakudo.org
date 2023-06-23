---
title: 'フリンの分類'
---

*Flynn's taxonomy*

並列処理に関するアーキテクチャの分類

- SISD
  - 命令列もデータストリームも並列ではない.
- SIMD
  - ひとつの命令列を持つが, それぞれの命令が複数のデータストリームを扱える.
- MISD
  - 複数の命令が単一のデータストリームに適用される.
- MIMD
  - 複数の命令列を持ち, 複数のプロセッサがそれぞれ異なるデータストリームを処理する.

の4種類がある.

| 略称 | 正式名称                                      | 命令列 | データストリーム | 例                 |
| ---- | --------------------------------------------- | ------ | ---------------- | ------------------ |
| SISD | *Single Instruction Single Data stream*       | 単一   | 単一             |                    |
| SIMD | *Single Instruction Multiple Data streams*    | 単一   | 複数             | GPU                |
| MISD | *Multiple Instructions Single Data stream*    | 複数   | 単一             | パイプライン処理？ |
| MIMD | *Multiple Instructions Multiple Data streams* | 複数   | 複数             |                    |