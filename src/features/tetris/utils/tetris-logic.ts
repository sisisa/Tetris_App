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
export const TETROMINOES = {
  I: { shape: [[1, 1, 1, 1]], color: "#00f0f0" },
  O: { shape: [[1, 1], [1, 1]], color: "#f0f000" },
  T: { shape: [[0, 1, 0], [1, 1, 1]], color: "#a000f0" },
  L: { shape: [[1, 0, 0], [1, 1, 1]], color: "#f0a000" },
  J: { shape: [[0, 0, 1], [1, 1, 1]], color: "#0000f0" },
  S: { shape: [[0, 1, 1], [1, 1, 0]], color: "#00f000" },
  Z: { shape: [[1, 1, 0], [0, 1, 1]], color: "#f00000" },
}

export type TetrominoKey = keyof typeof TETROMINOES

/* =============================
   ランダムピース生成
============================= */
export const getRandomTetromino = (): { key: TetrominoKey; data: typeof TETROMINOES[TetrominoKey] } => {
  const keys = Object.keys(TETROMINOES) as TetrominoKey[]
  const key = keys[Math.floor(Math.random() * keys.length)]
  return { key, data: TETROMINOES[key] }
}

export const createPiece = (tetrominoData = getRandomTetromino().data): Piece => ({
  shape: tetrominoData.shape,
  color: tetrominoData.color,
  x: Math.floor(COLS / 2) - Math.floor(tetrominoData.shape[0].length / 2),
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
      if (v) newBoard[piece.y + y][piece.x + x] = piece.color
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
