export type Cell = 0 | 1
export type Board = Cell[][]

export interface Piece {
  shape: number[][]
  x: number
  y: number
}
