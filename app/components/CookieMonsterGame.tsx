"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X } from "lucide-react"

interface Position {
  x: number
  y: number
}

interface GameState {
  cookieMonster: Position
  cookies: Position[]
  score: number
  gameOver: boolean
  lost: boolean
  direction: string
  timeLeft: number
}

const GRID_SIZE = 20
const GAME_WIDTH = 400
const GAME_HEIGHT = 300

export default function CookieMonsterGame({ onClose }: { onClose: () => void }) {
  const [gameState, setGameState] = useState<GameState>({
    cookieMonster: { x: 10, y: 10 },
    cookies: [
      { x: 5, y: 5 },
      { x: 15, y: 5 },
      { x: 5, y: 15 },
      { x: 15, y: 15 },
      { x: 10, y: 5 },
      { x: 10, y: 15 },
      { x: 5, y: 10 },
      { x: 15, y: 10 },
    ],
    score: 0,
    gameOver: false,
    lost: false,
    direction: "right",
    timeLeft: 45,
  })

  const moveCookieMonster = useCallback((direction: string) => {
    setGameState((prev) => {
      if (prev.gameOver) return prev

      let newX = prev.cookieMonster.x
      let newY = prev.cookieMonster.y

      switch (direction) {
        case "up":
          newY = Math.max(0, newY - 1)
          break
        case "down":
          newY = Math.min(GAME_HEIGHT / GRID_SIZE - 1, newY + 1)
          break
        case "left":
          newX = Math.max(0, newX - 1)
          break
        case "right":
          newX = Math.min(GAME_WIDTH / GRID_SIZE - 1, newX + 1)
          break
      }

      const newCookieMonster = { x: newX, y: newY }

      // Check for cookie collision
      const remainingCookies = prev.cookies.filter((cookie) => !(cookie.x === newX && cookie.y === newY))

      const cookieEaten = remainingCookies.length < prev.cookies.length
      const newScore = cookieEaten ? prev.score + 10 : prev.score
      const gameOver = remainingCookies.length === 0

      return {
        ...prev,
        cookieMonster: newCookieMonster,
        cookies: remainingCookies,
        score: newScore,
        gameOver,
        direction,
      }
    })
  }, [])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          e.preventDefault()
          moveCookieMonster("up")
          break
        case "ArrowDown":
        case "s":
        case "S":
          e.preventDefault()
          moveCookieMonster("down")
          break
        case "ArrowLeft":
        case "a":
        case "A":
          e.preventDefault()
          moveCookieMonster("left")
          break
        case "ArrowRight":
        case "d":
        case "D":
          e.preventDefault()
          moveCookieMonster("right")
          break
        case "Escape":
          onClose()
          break
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [moveCookieMonster, onClose])

  // Timer countdown effect
  useEffect(() => {
    if (gameState.gameOver || gameState.lost || gameState.timeLeft <= 0) return

    const timer = setInterval(() => {
      setGameState((prev) => {
        const newTimeLeft = prev.timeLeft - 1
        if (newTimeLeft <= 0) {
          return { ...prev, timeLeft: 0, lost: true, gameOver: true }
        }
        return { ...prev, timeLeft: newTimeLeft }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameState.gameOver, gameState.lost, gameState.timeLeft])

  // Auto-close game after losing
  useEffect(() => {
    if (gameState.lost) {
      const timeout = setTimeout(() => {
        onClose()
      }, 3000) // Close after 3 seconds when lost

      return () => clearTimeout(timeout)
    }
  }, [gameState.lost, onClose])

  const resetGame = () => {
    setGameState({
      cookieMonster: { x: 10, y: 10 },
      cookies: [
        { x: 5, y: 5 },
        { x: 15, y: 5 },
        { x: 5, y: 15 },
        { x: 15, y: 15 },
        { x: 10, y: 5 },
        { x: 10, y: 15 },
        { x: 5, y: 10 },
        { x: 15, y: 10 },
      ],
      score: 0,
      gameOver: false,
      lost: false,
      direction: "right",
      timeLeft: 45,
    })
  }

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-black border-4 border-blue-400">
        <CardHeader className="text-center bg-black">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl text-blue-400 font-mono">🍪 COOKIE MONSTER GAME 🍪</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-blue-400 hover:bg-blue-400/20">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-cyan-400 font-mono">"ME WANT COOKIE! NOM NOM NOM!"</p>
        </CardHeader>
        <CardContent className="p-6 bg-black">
          <div className="text-center mb-4">
            <div className="flex justify-between items-center mb-2 font-mono">
              <div className="text-lg font-bold text-yellow-400">
                COOKIES: {gameState.score / 10}/{gameState.score / 10 + gameState.cookies.length}
              </div>
              <div
                className={`text-lg font-bold ${gameState.timeLeft <= 10 ? "text-red-500 animate-pulse" : "text-cyan-400"}`}
              >
                TIME: {gameState.timeLeft.toString().padStart(2, "0")}
              </div>
            </div>
            {gameState.lost && (
              <div className="text-lg font-bold text-red-500 mt-2 font-mono animate-pulse">
                "ME NO GET ALL COOKIES!"
                <div className="text-sm text-gray-400 mt-1">CLOSING IN 3 SECONDS...</div>
              </div>
            )}
            {gameState.gameOver && !gameState.lost && (
              <div className="text-lg font-bold text-green-400 mt-2 font-mono animate-bounce">
                "ME EAT ALL COOKIES! NOM NOM!"
              </div>
            )}
          </div>

          {/* Game Board */}
          <div
            className="relative bg-black border-4 border-blue-600 mx-auto mb-4"
            style={{
              width: GAME_WIDTH,
              height: GAME_HEIGHT,
              backgroundImage: `
                radial-gradient(circle at 50% 50%, #001122 0%, #000000 100%),
                repeating-linear-gradient(0deg, transparent, transparent 19px, #001122 20px),
                repeating-linear-gradient(90deg, transparent, transparent 19px, #001122 20px)
              `,
            }}
          >
            {/* Cookie Monster - Sesame Street style */}
            <div
              className="absolute transition-all duration-150"
              style={{
                left: gameState.cookieMonster.x * GRID_SIZE,
                top: gameState.cookieMonster.y * GRID_SIZE,
                width: GRID_SIZE,
                height: GRID_SIZE,
              }}
            >
              {/* Cookie Monster Head */}
              <div className="w-full h-full relative">
                {/* Main blue fuzzy body */}
                <div className="absolute inset-0 bg-blue-500 rounded-full border border-blue-400"></div>

                {/* Eyes */}
                <div className="absolute top-1 left-1">
                  <div className="w-2 h-2 bg-white rounded-full border border-gray-300">
                    <div className="w-1 h-1 bg-black rounded-full mt-0.5 ml-0.5"></div>
                  </div>
                </div>
                <div className="absolute top-1 right-1">
                  <div className="w-2 h-2 bg-white rounded-full border border-gray-300">
                    <div className="w-1 h-1 bg-black rounded-full mt-0.5 ml-0.5"></div>
                  </div>
                </div>

                {/* Mouth - changes based on direction */}
                <div
                  className="absolute bg-black rounded-full"
                  style={{
                    left: "50%",
                    top: "60%",
                    transform: "translate(-50%, -50%)",
                    width: gameState.direction === "left" || gameState.direction === "right" ? "8px" : "6px",
                    height: gameState.direction === "up" || gameState.direction === "down" ? "8px" : "6px",
                  }}
                ></div>

                {/* Cookie crumbs around mouth when moving */}
                {gameState.direction && (
                  <>
                    <div className="absolute w-0.5 h-0.5 bg-orange-400 rounded-full top-3 left-2 animate-pulse"></div>
                    <div className="absolute w-0.5 h-0.5 bg-yellow-600 rounded-full top-3 right-2 animate-pulse"></div>
                  </>
                )}
              </div>
            </div>

            {/* Cookies - Realistic pixelated cookies */}
            {gameState.cookies.map((cookie, index) => (
              <div
                key={index}
                className="absolute"
                style={{
                  left: cookie.x * GRID_SIZE + 4,
                  top: cookie.y * GRID_SIZE + 4,
                  width: 12,
                  height: 12,
                }}
              >
                {/* Pixelated chocolate chip cookie */}
                <div className="w-full h-full relative">
                  {/* Cookie base - golden brown */}
                  <div className="absolute inset-0 bg-yellow-600 rounded-full border border-yellow-500"></div>

                  {/* Chocolate chips */}
                  <div className="absolute w-1 h-1 bg-amber-800 rounded-full top-1 left-1"></div>
                  <div className="absolute w-1 h-1 bg-amber-800 rounded-full top-2 right-1"></div>
                  <div className="absolute w-1 h-1 bg-amber-800 rounded-full bottom-1 left-2"></div>

                  {/* Cookie shine/highlight */}
                  <div className="absolute w-1 h-1 bg-yellow-300 rounded-full top-0.5 left-1.5 opacity-70"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="text-center space-y-4">
            <div className="text-sm text-cyan-400 font-mono">
              <p>HELP COOKIE MONSTER EAT ALL THE COOKIES!</p>
              <p>USE ARROW KEYS OR WASD TO MOVE!</p>
              <p className="font-bold text-yellow-400">⚡ "ME WANT COOKIE NOW!" ⚡</p>
            </div>

            {/* Mobile Controls - Cookie Monster themed */}
            <div className="grid grid-cols-3 gap-2 max-w-48 mx-auto">
              <div></div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => moveCookieMonster("up")}
                disabled={gameState.gameOver}
                className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black bg-black font-mono disabled:opacity-50"
              >
                ↑
              </Button>
              <div></div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => moveCookieMonster("left")}
                disabled={gameState.gameOver}
                className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black bg-black font-mono disabled:opacity-50"
              >
                ←
              </Button>
              <div></div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => moveCookieMonster("right")}
                disabled={gameState.gameOver}
                className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black bg-black font-mono disabled:opacity-50"
              >
                →
              </Button>
              <div></div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => moveCookieMonster("down")}
                disabled={gameState.gameOver}
                className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black bg-black font-mono disabled:opacity-50"
              >
                ↓
              </Button>
              <div></div>
            </div>

            <div className="flex gap-2 justify-center">
              {gameState.gameOver && !gameState.lost && (
                <Button onClick={resetGame} className="bg-green-600 hover:bg-green-700 text-white font-mono">
                  "ME WANT MORE COOKIES!"
                </Button>
              )}
              {gameState.lost && (
                <Button onClick={resetGame} className="bg-red-500 hover:bg-red-600 text-white font-mono">
                  "ME TRY AGAIN!"
                </Button>
              )}
              <Button
                variant="outline"
                onClick={onClose}
                className="border-gray-400 text-gray-400 bg-black font-mono hover:bg-gray-800"
              >
                EXIT GAME
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
