# 技術コンテキスト: Hugo から Next.js への移行

## 使用技術

### フロントエンド
- **フレームワーク**: Next.js v15
- **言語**: TypeScript
- **スタイリング**: Panda CSS
- **コンテンツ処理**: MDX + Contentlayer
- **シンタックスハイライト**: rehype-pretty-code + shiki
- **フォント**: Inter（Google Fonts）

### ビルド・デプロイ
- **ビルドモード**: 静的サイト生成（SSG）
- **デプロイ**: GitHub Actions + GitHub Pages
- **バージョン管理**: Git
- **CI/CD**: GitHub Actions

### 開発環境
- **Node.js**: v22
- **パッケージマネージャー**: npm
- **エディタ**: Visual Studio Code
- **リンター**: ESLint
- **フォーマッター**: Prettier

## 開発環境セットアップ

### 必要条件
- Node.js v22以上
- npm v10以上
- Git

### 初期セットアップ手順
1. リポジトリのクローン
   ```bash
   git clone https://github.com/kakudo415/kakudo.org.git
   cd kakudo.org
   ```

2. 依存関係のインストール
   ```bash
   npm install
   ```

3. 開発サーバーの起動
   ```bash
   npm run dev
   ```

4. ビルドとプレビュー
   ```bash
   npm run build
   npm run start
   ```

### 推奨VSCode拡張機能
- ESLint
- Prettier
- TypeScript + JavaScript Language Features
- MDX
- Tailwind CSS IntelliSense（Panda CSSのユーティリティクラス補完に有用）

## 技術的制約

### パフォーマンス要件
- Lighthouse スコア:
  - パフォーマンス: 90+
  - アクセシビリティ: 90+
  - ベストプラクティス: 90+
  - SEO: 90+

### ブラウザサポート
- 最新のChrome, Firefox, Safari, Edge
- iOS Safari, Android Chrome

### 静的サイト生成の制約
- ビルド時にすべてのコンテンツが利用可能である必要がある
- クライアントサイドのインタラクションは最小限に抑える
- 動的なデータフェッチングは制限される

### GitHub Pages制約
- ビルド出力は`out`ディレクトリに生成
- カスタムドメイン設定の維持
- 404ページの適切な設定

## 依存関係

### 主要パッケージ
```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "contentlayer": "^0.3.0",
    "next-contentlayer": "^0.3.0",
    "date-fns": "^2.30.0",
    "rehype-pretty-code": "^0.10.0",
    "shiki": "^0.14.0"
  },
  "devDependencies": {
    "@pandacss/dev": "^0.15.0",
    "typescript": "^5.0.0",
    "@types/react": "^18.2.0",
    "@types/node": "^20.0.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "^15.0.0",
    "postcss": "^8.0.0",
    "autoprefixer": "^10.0.0"
  }
}
```

### Panda CSS設定
```typescript
// panda.config.ts
import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // 基本設定
  preflight: true,
  include: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  exclude: [],

  // 出力設定
  outdir: "styled-system",

  // テーマ設定
  theme: {
    extend: {
      tokens: {
        // カラートークン
        colors: {
          // 既存のHugoサイトのカラースキームを反映
        },
        // フォントトークン
        fonts: {
          // 既存のHugoサイトのフォント設定を反映
        },
        // その他のトークン
      }
    }
  }
});
```

### Next.js設定
```typescript
// next.config.js
const { withContentlayer } = require('next-contentlayer');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  // その他の設定
};

module.exports = withContentlayer(nextConfig);
```

## 移行における技術的考慮事項

### 1. コンテンツ変換
- Hugoのフロントマター形式からMDXへの変換
- ショートコードからMDXコンポーネントへの変換
- 画像参照パスの調整

### 2. スタイリング変換
- SCSSからPanda CSSへの変換
- デザイントークンの抽出と設定
- レスポンシブデザインの再実装

### 3. テンプレート変換
- Hugoテンプレートから React/Next.js コンポーネントへの変換
- レイアウト構造の再構築
- 条件付きレンダリングの実装

### 4. URL構造の維持
- Next.jsのルーティングをHugoのURL構造に合わせる
- 動的ルートパラメータの設定
- リダイレクト設定（必要に応じて）
