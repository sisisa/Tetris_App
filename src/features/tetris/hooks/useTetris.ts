import { useEffect, useState, useCallback } from "react"
import {
  createBoard,
  createPiece,
  getRandomTetromino,
  collide,
  merge,
  rotate,
  clearLines,
} from "../utils/tetris-logic"

export const useTetris = () => {
  const [board, setBoard] = useState(createBoard())
  const [piece, setPiece] = useState(createPiece())
  const [nextPiece, setNextPiece] = useState(getRandomTetromino())
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [gameOver, setGameOver] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)

  // レベルに応じて速度を上げる（初期800ms, レベルごとに10%速くする、下限100ms）
  const dropTime = Math.max(100, 800 - (level - 1) * 70)

  /* ========= ゲーム開始・リセット ========= */
  const startGame = () => {
    setBoard(createBoard())
    setPiece(createPiece())
    setNextPiece(getRandomTetromino())
    setScore(0)
    setLevel(1)
    setGameOver(false)
    setGameStarted(true)
  }

  /* ========= 移動 ========= */
  const move = useCallback((dx: number) => {
    if (!gameStarted || gameOver) return
    const next = { ...piece, x: piece.x + dx }
    if (!collide(board, next)) setPiece(next)
  }, [board, gameOver, gameStarted, piece])


  /* ========= 回転 ========= */
  const spin = useCallback(() => {
    if (!gameStarted || gameOver) return
    const next = { ...piece, shape: rotate(piece.shape) }
    if (!collide(board, next)) setPiece(next)
  }, [board, gameOver, gameStarted, piece])


  /* ========= 落下 ========= */
  const drop = useCallback(() => {
    if (!gameStarted || gameOver) return
    const next = { ...piece, y: piece.y + 1 }

    if (collide(board, next)) {
      const merged = merge(board, piece)
      const cleared = clearLines(merged)

      setBoard(cleared.board)
      const newScore = score + (cleared.lines * 100 * level)
      setScore(newScore)
      
      // 1000点ごとにレベルアップ
      setLevel(Math.floor(newScore / 1000) + 1)

      const newPiece = createPiece(nextPiece.data)
      if (collide(cleared.board, newPiece)) {
        setGameOver(true)
        setGameStarted(false)
      }

      setPiece(newPiece)
      setNextPiece(getRandomTetromino())
    } else {
      setPiece(next)
    }
  }, [board, gameOver, gameStarted, level, nextPiece, piece, score])


  /* ========= 自動落下 ========= */
  useEffect(() => {
    if (!gameStarted || gameOver) return
    const id = setInterval(drop, dropTime)
    return () => clearInterval(id)
  }, [drop, dropTime, gameOver, gameStarted])


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
  }, [drop, move, spin])


  return { board, piece, nextPiece, score, level, gameOver, gameStarted, startGame }
}
