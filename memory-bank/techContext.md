# 技術コンテキスト: Hugo から Next.js への移行

## 使用技術

### フロントエンド
- **フレームワーク**: Next.js v15
- **言語**: TypeScript
- **スタイリング**: Panda CSS
- **コンテンツ処理**: MDX（Next.js公式サポート）
- **シンタックスハイライト**: rehype-pretty-code + shiki（予定）
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
    "next": "^15.2.3",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@next/mdx": "^15.2.3",
    "@mdx-js/loader": "^3.1.0",
    "@mdx-js/react": "^3.1.0",
    "@types/mdx": "^2.0.13",
    "date-fns": "^2.30.0"
  },
  "devDependencies": {
    "@pandacss/dev": "^0.53.2",
    "typescript": "^5.8.2",
    "@types/react": "^19.0.12",
    "@types/react-dom": "^19.0.4",
    "@types/node": "^22.13.10",
    "eslint": "^9.22.0",
    "eslint-config-next": "^15.2.3",
    "prettier": "^3.5.3"
  }
}
```

### Panda CSS設定
```typescript
// panda.config.ts
import { defineConfig } from "@pandacss/dev"

export default defineConfig({
  preflight: true,
  include: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  exclude: [],
  outdir: "styled-system",
  theme: {
    extend: {
      tokens: {
        colors: {
          white: {
            1000: { value: "#FFFFFF" }
          },
          sea: {
            900: { value: "#000082" },
            800: { value: "#0017C1" },
            // 他の色も同様に定義
          },
          // 他のカラートークン
        },
        fonts: {
          body: { value: "'Inter', sans-serif" }
        },
        sizes: {
          maxWidth: { value: "1024px" }
        }
      },
      breakpoints: {
        tablet: "521px",
        desktop: "961px"
      },
      semanticTokens: {
        colors: {
          foreground: {
            body: { value: "{colors.sumi.900}" },
            // 他のセマンティックカラー
          },
          // 他のセマンティックトークン
        }
      }
    }
  }
})
```

### Next.js設定
```typescript
// next.config.mjs
import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
}

const withMDX = createMDX({})

export default withMDX(nextConfig)
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

### 5. MDXファイルの処理
- フロントマターの抽出と処理
- ファイルシステムからのMDXファイルの読み込み
- 動的なブログ記事一覧の生成
