# スキルシート

React + TypeScript で作成したスキルシート（ポートフォリオ）アプリケーション

フロントエンド・エンジニアのポートフォリオとして作成しました。
バックエンド側は PHP + JSON という最低限の実装となっています。

デザインは [Brittany Chiang さんのポートフォリオ](https://brittanychiang.com/) を参考にしています。

## 技術スタック

### フロントエンド

- **React 19** - UI ライブラリ
- **TypeScript 5.9** - 型安全な開発
- **Vite 7** - 高速なビルドツール
- **Tailwind CSS 3** - ユーティリティファーストな CSS フレームワーク
- **Vitest 4** - 高速なユニットテストフレームワーク
- **React Testing Library** - React コンポーネントのテスト
- **openapi-typescript** - OpenAPI スキーマからの型生成

### 開発ツール

- **ESLint** - コード品質の維持
- **Prettier** - コードフォーマッター
- **pnpm** - 高速なパッケージマネージャー

## フォルダ構成

```
frontend/
├── src/
│   ├── ProfileLayout/              # メインレイアウトコンポーネント
│   │   ├── Container.tsx           # ロジック層（データ変換）
│   │   ├── Presentational.tsx      # プレゼンテーション層（UI）
│   │   ├── Container.test.tsx      # Container のテスト
│   │   └── components/             # セクション別コンポーネント
│   │       ├── ProfileHeader/      # ヘッダーセクション（名前・職種）
│   │       ├── ProfileSummary/     # 概要セクション
│   │       ├── ProfileSkills/      # スキルセクション
│   │       ├── ProfileWorkHistory/ # 職務経歴セクション
│   │       │   ├── Container.tsx
│   │       │   ├── Presentational.tsx
│   │       │   ├── Container.test.tsx
│   │       │   └── utils/          # ビジネスロジック
│   │       │       ├── calculateDuration.ts      # 在籍期間計算
│   │       │       └── calculateDuration.test.ts # ロジックのテスト
│   │       └── ProfileFooter/      # フッターセクション
│   │
│   ├── ProfileLoader/              # データローディング管理
│   │   ├── Container.tsx           # ローディング状態の分岐
│   │   ├── Presentational.tsx      # ローディング/エラーUI
│   │   └── Container.test.tsx
│   │
│   ├── hooks/                      # カスタムフック
│   │   ├── useProfile.ts           # プロフィールデータ取得
│   │   └── useProfile.test.ts
│   │
│   ├── api/                        # API 関連
│   │   ├── fetchProfile.ts         # プロフィールデータ取得関数
│   │   └── Profile.ts              # プロフィールの型定義
│   │
│   ├── generated/                  # 自動生成ファイル
│   │   └── openapi-types.ts        # OpenAPI からの型定義
│   │
│   ├── test/                       # テスト設定
│   │   └── setup.ts                # Vitest セットアップ
│   │
│   ├── App.tsx                     # アプリケーションルート
│   ├── App.css                     # グローバルスタイル
│   └── main.tsx                    # エントリーポイント
│
├── public/                         # 静的ファイル
│   └── favicon.ico
│
├── vite.config.ts                  # Vite 設定
├── tailwind.config.js              # Tailwind CSS 設定
├── tsconfig.json                   # TypeScript 設定
└── package.json                    # 依存関係

```

### フォルダ構成の意味

#### Container/Presentational パターン

このプロジェクトでは、UI とロジックを分離する **Container/Presentational パターン** を採用しています。

- **Container.tsx**: データ変換、ソート、フィルタリングなどのロジックを担当
- **Presentational.tsx**: 純粋な UI の描画のみを担当（props を受け取って表示）
- **index.ts**: Container をデフォルトエクスポート

#### テスト戦略

- **Container.test.tsx**: ロジックのテストに集中
- **utils/*.test.ts**: 純粋な計算ロジックの境界値テスト
- **BDD スタイル**: `describe`/`it` で日本語のテスト名
- **AAA パターン**: Arrange（準備）/Act（実行）/Assert（検証）

#### コンポーネント分割の基準

- **Container が必要**: ループ処理やデータ変換が含まれるコンポーネント
  - ProfileSummary（配列のループ）
  - ProfileSkills（配列のループ）
  - ProfileWorkHistory（ソート + 日付フォーマット）
- **Container 不要**: シンプルな表示のみ
  - ProfileHeader（単純な props 表示）
  - ProfileFooter（単純な props 表示）

## 主要な実装の特徴

### 1. 型安全性

OpenAPI スキーマから TypeScript の型を自動生成し、フロントエンド・バックエンド間の型の整合性を保証：

```bash
pnpm gen:openapi
```

### 2. レスポンシブデザイン

Tailwind CSS のブレークポイントを使用：

- モバイル（< 768px）: 縦スクロール
- タブレット（768px - 1024px）: 縦スクロール + 余白調整
- デスクトップ（≥ 1024px）: 左にヘッダー固定、右にコンテンツスクロール

### 3. テスト駆動開発

- カバレッジ重視
- ビジネスロジックは必ずテストを記述
- モック化による単体テストの独立性確保

### 4. メモリリーク対策

`useProfile` フックでは、以下の対策を実施：

- `isMounted` フラグでアンマウント後の setState を防止
- `hasLoaded` フラグで React StrictMode の二重実行対策
- cleanup 関数での適切なリソース解放

## 開発環境のセットアップ

### 必要な環境

- Node.js 18 以上
- pnpm 8 以上

### インストール

```bash
# 依存関係のインストール
pnpm install

# 開発サーバーの起動
pnpm dev

# テストの実行
pnpm test

# テスト UI の起動
pnpm test:ui

# ビルド
pnpm build
```

### OpenAPI 型の再生成

バックエンドの API スキーマを変更した場合：

```bash
pnpm gen:openapi
```

## コーディング規約

- **関数定義**: アロー関数を使用
- **型アサーション**: `any` / `as` の使用を極力避ける（テストコード内は例外）
- **イミュータビリティ**: オブジェクトの変更ではなく、新しいオブジェクトを生成
- **テスト名**: 日本語で What/When/Then を明確に記述

## ライセンス

個人のポートフォリオプロジェクトです。
