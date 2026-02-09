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
