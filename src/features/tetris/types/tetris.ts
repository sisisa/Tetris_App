export type Cell = string | 0 // 0は空、文字列は色コード
export type Board = Cell[][]
export type BoardType = Board

export interface Piece {
  shape: number[][]
  x: number
  y: number
  color: string
}
