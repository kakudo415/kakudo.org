# Hugo から Next.js への移行プロジェクト

## プロジェクト概要
- 既存のHugoブログサイト（kakudo.org）をNext.jsに移行
- 現在のデザイン、コンテンツ、URL構造を維持
- 最新技術スタックを活用した最適化

## 主要目標
1. 既存のHugoブログの全機能をNext.jsで再現
2. パフォーマンスとSEOの維持・向上
3. 将来的な拡張性の確保
4. GitHub Pagesへの静的サイト生成（SSG）デプロイ

## 技術スタック
- Node.js v22
- Next.js v15（App Router）
- TypeScript
- Panda CSS（ゼロランタイムCSS-in-JS）
- MDX（contentlayer）
- GitHub Actions + GitHub Pages

## 成功基準
- 全ての既存コンテンツが正しく表示される
- 既存のURL構造が維持される
- ページロード速度が現在と同等以上
- モバイル対応が完全に機能する
- GitHub Actionsによる自動デプロイが正常に動作する
