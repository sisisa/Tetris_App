================================================
FILE: README.md
================================================
# Tetris App (React + TypeScript + Bun)

## 概要

React + TypeScript + Bun を使用して実装したブラウザ版テトリスアプリです。  
単なる「動くだけのゲーム」ではなく、**実務レベルの保守性・拡張性・型安全性・責務分離設計** を重視して開発しました。

UI とゲームロジックを完全分離し、  
テスト容易性と再利用性を意識したアーキテクチャを採用しています。

---

## デモ起動方法

以下のコマンドを実行し、ブラウザで動作を確認できます。

```bash
bun install
bun run dev
```

## 使用技術
| 技術                     | 用途           |
| ---------------------- | ------------ |
| React 18               | UIコンポーネント    |
| TypeScript             | 型安全・保守性      |
| Vite                   | 開発サーバ・ビルド    |
| Bun                    | パッケージ管理・高速実行 |
| Custom Hooks           | 状態管理         |
| Functional Programming | 純粋ロジック       |

## パッケージマネージャーについて

### 依存関係のインストール
```bash
bun install
```

## 開発サーバの起動

## 実装機能
- ゲーム機能
- 自動落下
- 左右移動
- 回転処理
- 高速落下
- 衝突判定
- ライン消去
- スコア加算
- ゲームオーバー判定


## UI機能
- フルスクリーンレイアウト
- 中央配置レイアウト
- スコア表示
- ゲームオーバー表示

## 操作方法
| キー  | 動作   |
| --- | ---- |
| ← → | 移動   |
| ↑   | 回転   |
| ↓   | 高速落下 |

## ディレクトリ構成
```
src/
├ components/
├ hooks/
├ utils/
├ types/
├ App.tsx
└ main.tsx
```

## 各ディレクトリの役割
### components

UI描画のみを担当します。

### hooks
ゲーム状態管理およびロジック呼び出しを担当します。

### utils
副作用を持たない純粋なゲームロジックを実装します。

### types
TypeScript型定義のみを管理します。

## アーキテクチャ

```
React UI
  ↓
useTetris (状態管理)
  ↓
tetrisLogic (純関数ロジック)
```

UI はロジックを直接扱わず、Hook 経由でのみアクセスします。
ロジック層は React に依存しない構造としています。

## 設計方針

### 責務分離
UI・状態管理・ロジックを明確に分離し、可読性と保守性を向上させています。

### 純関数設計
ゲームロジックは入力と出力のみを扱い、副作用を排除しています。
これによりテスト容易性と再利用性を確保しています。

### 型安全
- any 不使用

- strict mode 有効

- 型のみ import を使用

## 技術的な実装内容
### 衝突判定
ブロック座標と盤面配列を用いて壁・床・既存ブロックとの衝突を判定します。

### 回転処理
2次元配列の転置と反転によって回転処理を実装しています。

### ライン消去
埋まった行を削除し、上部に空行を追加するアルゴリズムを採用しています。

### ゲームループ
setInterval と Custom Hook を使用して自動落下処理を管理しています。

## 今後の拡張予定
- 次ブロック表示
- ホールド機能
- レベル制御
- ハードドロップ
- サウンド追加
- Jest テスト
- デプロイ
- モバイル対応

## 学習ポイント
- React Hooks による状態管理
- UI とロジックの分離設計
- TypeScript による型駆動開発
- ゲームアルゴリズム設計
- bun を利用した高速開発環境


================================================
FILE: eslint.config.js
================================================
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
])



================================================
FILE: index.html
================================================
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>tetris-app</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>



================================================
FILE: package.json
================================================
{
  "name": "tetris-app",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.2.0",
    "react-dom": "^19.2.0"
  },
  "devDependencies": {
    "@eslint/js": "^9.39.1",
    "@types/node": "^24.10.1",
    "@types/react": "^19.2.5",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^5.1.1",
    "eslint": "^9.39.1",
    "eslint-plugin-react-hooks": "^7.0.1",
    "eslint-plugin-react-refresh": "^0.4.24",
    "globals": "^16.5.0",
    "typescript": "~5.9.3",
    "typescript-eslint": "^8.46.4",
    "vite": "^7.2.4"
  }
}



================================================
FILE: tsconfig.app.json
================================================
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "types": ["vite/client"],
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["src"]
}



================================================
FILE: tsconfig.json
================================================
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}



================================================
FILE: tsconfig.node.json
================================================
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "ES2023",
    "lib": ["ES2023"],
    "module": "ESNext",
    "types": ["node"],
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["vite.config.ts"]
}



================================================
FILE: vite.config.ts
================================================
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})



================================================
FILE: src/App.css
================================================
#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.react:hover {
  filter: drop-shadow(0 0 2em #61dafbaa);
}

@keyframes logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: no-preference) {
  a:nth-of-type(2) .logo {
    animation: logo-spin infinite 20s linear;
  }
}

.card {
  padding: 2em;
}

.read-the-docs {
  color: #888;
}



================================================
FILE: src/App.tsx
================================================
import { useTetris } from "./hooks/useTetris"
import { Board } from "./components/Board"

export default function App() {
  const { board, piece, score, gameOver } = useTetris()

  return (
    <div style={{
      height: "100vh",
      width: "200vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
      gap: 40
    }}>
      <Board board={board} piece={piece} />

      <div>
        <h2>Score</h2>
        <p>{score}</p>
        {gameOver && <h2>Game Over</h2>}
      </div>
    </div>
  )
}



================================================
FILE: src/index.css
================================================
:root {
  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
}
a:hover {
  color: #535bf2;
}

body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
}
button:hover {
  border-color: #646cff;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #ffffff;
  }
  a:hover {
    color: #747bff;
  }
  button {
    background-color: #f9f9f9;
  }
}



================================================
FILE: src/main.tsx
================================================
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)



================================================
FILE: src/components/Board.tsx
================================================
export const Board = ({ board, piece }: any) => {
  const display = board.map((r: number[]) => [...r])

  piece.shape.forEach((row: number[], y: number) =>
    row.forEach((v: number, x: number) => {
      if (v) display[piece.y + y][piece.x + x] = 1
    })
  )

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(10, 24px)" }}>
      {display.flat().map((c: number, i: number) => (
        <div key={i} style={{
          width: 24,
          height: 24,
          background: c ? "#22c55e" : "#111",
          border: "1px solid #333"
        }} />
      ))}
    </div>
  )
}



================================================
FILE: src/hooks/useTetris.ts
================================================
// テトリスの状態管理Hook
// UIとロジックの橋渡し役

import { useEffect, useState } from "react"
import {
  createBoard,
  randomPiece,
  collide,
  merge,
  rotate,
  clearLines,
} from "../utils/tetrisLogic"

export const useTetris = () => {
  const [board, setBoard] = useState(createBoard())
  const [piece, setPiece] = useState(randomPiece())
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)


  /* ========= 移動 ========= */
  const move = (dx: number) => {
    const next = { ...piece, x: piece.x + dx }
    if (!collide(board, next)) setPiece(next)
  }


  /* ========= 回転 ========= */
  const spin = () => {
    const next = { ...piece, shape: rotate(piece.shape) }
    if (!collide(board, next)) setPiece(next)
  }


  /* ========= 落下 ========= */
  const drop = () => {
    const next = { ...piece, y: piece.y + 1 }

    if (collide(board, next)) {
      const merged = merge(board, piece)
      const cleared = clearLines(merged)

      setBoard(cleared.board)
      setScore((s) => s + cleared.lines * 100)

      const newPiece = randomPiece()
      if (collide(cleared.board, newPiece)) {
        setGameOver(true)
      }

      setPiece(newPiece)
    } else {
      setPiece(next)
    }
  }


  /* ========= 自動落下 ========= */
  useEffect(() => {
    if (gameOver) return
    const id = setInterval(drop, 500)
    return () => clearInterval(id)
  })


  /* ========= キー操作 ========= */
  useEffect(() => {
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") move(-1)
      if (e.key === "ArrowRight") move(1)
      if (e.key === "ArrowDown") drop()
      if (e.key === "ArrowUp") spin()
    }

    window.addEventListener("keydown", keyHandler)
    return () => window.removeEventListener("keydown", keyHandler)
  })


  return { board, piece, score, gameOver }
}



================================================
FILE: src/types/tetris.ts
================================================
export type Cell = 0 | 1
export type Board = Cell[][]

export interface Piece {
  shape: number[][]
  x: number
  y: number
}



================================================
FILE: src/utils/tetrisLogic.ts
================================================
// テトリスの純粋ロジック（React非依存）
// ここは「ゲームエンジン部分」
// テスト可能な純関数のみで構成する

import type { Board, Piece } from "../types/tetris"

export const ROWS = 20
export const COLS = 10

/* =============================
   盤面生成
============================= */
export const createBoard = (): Board =>
  Array.from({ length: ROWS }, () => Array(COLS).fill(0))


/* =============================
   テトロミノ定義（7種）
============================= */
export const TETROMINOES: number[][][] = [
  [[1, 1, 1, 1]], // I
  [
    [1, 1],
    [1, 1],
  ], // O
  [
    [0, 1, 0],
    [1, 1, 1],
  ], // T
  [
    [1, 0, 0],
    [1, 1, 1],
  ], // L
  [
    [0, 0, 1],
    [1, 1, 1],
  ], // J
  [
    [1, 1, 0],
    [0, 1, 1],
  ], // S
  [
    [0, 1, 1],
    [1, 1, 0],
  ], // Z
]


/* =============================
   ランダムピース生成
============================= */
export const randomPiece = (): Piece => ({
  shape: TETROMINOES[Math.floor(Math.random() * TETROMINOES.length)],
  x: 3,
  y: 0,
})


/* =============================
   衝突判定
============================= */
export const collide = (board: Board, piece: Piece) =>
  piece.shape.some((row, y) =>
    row.some((v, x) => {
      if (!v) return false
      const ny = piece.y + y
      const nx = piece.x + x
      return ny >= ROWS || nx < 0 || nx >= COLS || board[ny][nx]
    })
  )


/* =============================
   盤面へ固定
============================= */
export const merge = (board: Board, piece: Piece): Board => {
  const newBoard = board.map((r) => [...r])

  piece.shape.forEach((row, y) =>
    row.forEach((v, x) => {
      if (v) newBoard[piece.y + y][piece.x + x] = 1
    })
  )

  return newBoard
}


/* =============================
   回転処理（時計回り）
============================= */
export const rotate = (shape: number[][]) =>
  shape[0].map((_, i) => shape.map((r) => r[i]).reverse())


/* =============================
   ライン消去
============================= */
export const clearLines = (board: Board): { board: Board; lines: number } => {
  const remain = board.filter((row) => row.some((c) => c === 0))
  const lines = ROWS - remain.length

  const newBoard = [
    ...Array(lines)
      .fill(0)
      .map(() => Array(COLS).fill(0)),
    ...remain,
  ]

  return { board: newBoard, lines }
}
