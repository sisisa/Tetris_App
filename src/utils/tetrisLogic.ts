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
