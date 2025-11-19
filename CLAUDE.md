# AI のスコープ

- AI の作業するスコープは ./frontend の中だけ （バックエンド側は人間が実装）

# ルール

## 最優先ルール

### 絶対的な禁止事項

- **コード実行の禁止**: Python、JavaScript、Bash 等でのブラウザ操作やプロセス実行
- **通信プロトコルの禁止**: curl、wget 等によるデータ送受信
- **Git 操作の制限**: ユーザー承認なしでのコミット、プッシュ、マージ

## コミュニケーション

### 言語設定

- 主要言語: 日本語（ユーザーとの全対話）
- 技術用語: 英語表記を維持（例: Component, Hook, State）

### エラー報告

- エラー発生時は即座に報告
- 回避策の模索は禁止
- エラーメッセージは原文のまま提示

## プロジェクト構造

### アーキテクチャ

- **フレームワーク**: React 19 + TypeScript 5
- **ビルドツール**: Vite

## 開発フ

### コード品質基準

**命名規則**:

- Boolean: `isEnabled`, `hasPermission`
- 配列: `users`, `items`
- メソッド: `getUser()`, `updateProfile()`
- 定数: `MAX_RETRY_COUNT`

**TypeScript**:

- `any`の使用禁止
- 型推論の活用
- ジェネリクスの適切な使用

## テスト

- **フレームワーク**: Vitest + React Testing Library
- **構造**: BDD 形式（What/When/Then）
- **カバレッジ目標**: 80%以上
- テストケース名は日本語

### テストケース名を「何が」「どうなったら」「どうなる」という３つのパーツに分けて書く

- テスト作成者がどういったテストシナリオを想定して作ったテストなのかを明確にするため、What、When が `describe`、then が `it` になるように書く

例：

```ts
describe('updateUserInformation', () => {
  describe('ユーザー情報を引数に渡すと、', () => {
    it('そのユーザー情報を伴ってmutationが実行され、成功したことを示すsnackbarが表示される', () => {
      // ...
    })
  })
})
```

### 各テストケースを書くまでに、最低２階層作る

- テストコードの理解が容易にするため、最低 `describe` を 2 回書くことで、テストケースのグルーピングができ、テスト結果がわかりやすくなり、どのようなテストケースが成功、失敗しているのかがすぐにわかる

例 math.ts の sum 関数をテストする場合：

````ts
describe('sum', () => {
  describe('２つの引数に数値を渡すと', () => {
    it('その数を合計した値を返す', () => {
      // ...
    })
    it('少数第6位まで返す', () => {
      // ...
    })
  })
})

### 「Arrange」「Act」「Assert」の AAA パターンを各テストケースに書く

- フォーマットが固まっていると、テストの内容理解がはかどるため。
- 尚、各パートは空行で区切ること。コメントで`// Arrange`のように説明は書かなくていい。

例：

```ts
it('', () => {
  const params: Parameters<typeof findUser>[0] = {
    name: 'John',
    id: '123'
  }

  const result = findUserByName(params)

  expect(result).toEqual({
    name: 'John',
    id: '123',
    age: 20
  })
})
````
