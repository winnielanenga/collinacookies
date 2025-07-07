"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X } from "lucide-react"

interface Position {
  x: number
  y: number
}

interface Ghost {
  id: number
  x: number
  y: number
  direction: string
  color: string
}

interface GameState {
  cookieMonster: Position
  cookies: Position[]
  ghosts: Ghost[]
  score: number
  gameOver: boolean
  lost: boolean
  direction: string
  timeLeft: number
}

const GRID_SIZE = 20
const GAME_WIDTH = 400
const GAME_HEIGHT = 300
const COLS = GAME_WIDTH / GRID_SIZE // 20 columns
const ROWS = GAME_HEIGHT / GRID_SIZE // 15 rows

// Pac-Man style maze layout (1 = wall, 0 = path)
const MAZE = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1],
  [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
  [1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
]

// Generate cookies only on valid paths
const generateCookies = (): Position[] => {
  const cookies: Position[] = []
  for (let y = 1; y < ROWS - 1; y++) {
    for (let x = 1; x < COLS - 1; x++) {
      if (MAZE[y][x] === 0 && Math.random() > 0.65) {
        cookies.push({ x, y })
      }
    }
  }
  while (cookies.length < 15) {
    const x = Math.floor(Math.random() * (COLS - 2)) + 1
    const y = Math.floor(Math.random() * (ROWS - 2)) + 1
    if (MAZE[y][x] === 0 && !cookies.some((c) => c.x === x && c.y === y)) {
      cookies.push({ x, y })
    }
  }
  return cookies.slice(0, 18)
}

// Generate chef hat ghosts
const generateGhosts = (): Ghost[] => {
  return [
    { id: 1, x: 9, y: 7, direction: "left", color: "red" },
    { id: 2, x: 10, y: 7, direction: "right", color: "pink" },
    { id: 3, x: 9, y: 8, direction: "up", color: "cyan" },
  ]
}

// Check if position is valid
const isValidPosition = (x: number, y: number): boolean => {
  if (x < 0 || x >= COLS || y < 0 || y >= ROWS) return false
  return MAZE[y][x] === 0
}

// Move ghosts AI
const moveGhost = (ghost: Ghost): Ghost => {
  const directions = ["up", "down", "left", "right"]
  let newX = ghost.x
  let newY = ghost.y
  let newDirection = ghost.direction

  // Try to continue in current direction
  switch (ghost.direction) {
    case "up":
      newY = ghost.y - 1
      break
    case "down":
      newY = ghost.y + 1
      break
    case "left":
      newX = ghost.x - 1
      break
    case "right":
      newX = ghost.x + 1
      break
  }

  // If can't continue, pick a random valid direction
  if (!isValidPosition(newX, newY)) {
    const validDirections = directions.filter((dir) => {
      let testX = ghost.x
      let testY = ghost.y
      switch (dir) {
        case "up":
          testY = ghost.y - 1
          break
        case "down":
          testY = ghost.y + 1
          break
        case "left":
          testX = ghost.x - 1
          break
        case "right":
          testX = ghost.x + 1
          break
      }
      return isValidPosition(testX, testY)
    })

    if (validDirections.length > 0) {
      newDirection = validDirections[Math.floor(Math.random() * validDirections.length)]
      switch (newDirection) {
        case "up":
          newY = ghost.y - 1
          break
        case "down":
          newY = ghost.y + 1
          break
        case "left":
          newX = ghost.x - 1
          break
        case "right":
          newX = ghost.x + 1
          break
      }
    } else {
      newX = ghost.x
      newY = ghost.y
    }
  }

  return { ...ghost, x: newX, y: newY, direction: newDirection }
}

export default function CookieMonsterGame({ onClose }: { onClose: () => void }) {
  const [gameState, setGameState] = useState<GameState>({
    cookieMonster: { x: 1, y: 1 },
    cookies: generateCookies(),
    ghosts: generateGhosts(),
    score: 0,
    gameOver: false,
    lost: false,
    direction: "right",
    timeLeft: 90,
  })

  const moveCookieMonster = useCallback((direction: string) => {
    setGameState((prev) => {
      if (prev.gameOver) return prev

      let newX = prev.cookieMonster.x
      let newY = prev.cookieMonster.y

      switch (direction) {
        case "up":
          newY = newY - 1
          break
        case "down":
          newY = newY + 1
          break
        case "left":
          newX = newX - 1
          break
        case "right":
          newX = newX + 1
          break
      }

      if (!isValidPosition(newX, newY)) {
        return prev
      }

      const newCookieMonster = { x: newX, y: newY }

      // Check for ghost collision
      const hitGhost = prev.ghosts.some((ghost) => ghost.x === newX && ghost.y === newY)
      if (hitGhost) {
        return { ...prev, lost: true, gameOver: true }
      }

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

  // Ghost movement timer
  useEffect(() => {
    if (gameState.gameOver) return

    const ghostTimer = setInterval(() => {
      setGameState((prev) => {
        if (prev.gameOver) return prev

        const newGhosts = prev.ghosts.map(moveGhost)

        // Check if any ghost caught Cookie Monster
        const hitGhost = newGhosts.some((ghost) => ghost.x === prev.cookieMonster.x && ghost.y === prev.cookieMonster.y)

        if (hitGhost) {
          return { ...prev, ghosts: newGhosts, lost: true, gameOver: true }
        }

        return { ...prev, ghosts: newGhosts }
      })
    }, 500) // Ghosts move every 500ms

    return () => clearInterval(ghostTimer)
  }, [gameState.gameOver])

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
      }, 3000)

      return () => clearTimeout(timeout)
    }
  }, [gameState.lost, onClose])

  const resetGame = () => {
    setGameState({
      cookieMonster: { x: 1, y: 1 },
      cookies: generateCookies(),
      ghosts: generateGhosts(),
      score: 0,
      gameOver: false,
      lost: false,
      direction: "right",
      timeLeft: 90,
    })
  }

  return (
    <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-black border-4 border-yellow-400">
        <CardHeader className="text-center bg-black">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl text-yellow-400 font-mono">🍪 COOKIE MONSTER PAC-MAN 🍪</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-yellow-400 hover:bg-yellow-400/20">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-cyan-400 font-mono">"ME WANT COOKIE! AVOID CHEF HATS!"</p>
        </CardHeader>
        <CardContent className="p-6 bg-black">
          <div className="text-center mb-4">
            <div className="flex justify-between items-center mb-2 font-mono">
              <div className="text-lg font-bold text-yellow-400">
                SCORE: {gameState.score.toString().padStart(4, "0")}
              </div>
              <div
                className={`text-lg font-bold ${gameState.timeLeft <= 20 ? "text-red-500 animate-pulse" : "text-cyan-400"}`}
              >
                TIME: {gameState.timeLeft.toString().padStart(2, "0")}
              </div>
            </div>
            <div className="text-sm font-mono text-green-400">
              COOKIES: {gameState.score / 10}/{gameState.score / 10 + gameState.cookies.length}
            </div>
            {gameState.lost && (
              <div className="text-lg font-bold text-red-500 mt-2 font-mono animate-pulse">
                {gameState.timeLeft <= 0 ? '"ME RUN OUT OF TIME!"' : '"CHEF HAT GOT ME!"'}
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
            }}
          >
            {/* Draw Maze Walls */}
            {MAZE.map((row, y) =>
              row.map((cell, x) => {
                if (cell === 1) {
                  return (
                    <div
                      key={`wall-${x}-${y}`}
                      className="absolute bg-blue-600 border border-blue-400"
                      style={{
                        left: x * GRID_SIZE,
                        top: y * GRID_SIZE,
                        width: GRID_SIZE,
                        height: GRID_SIZE,
                        boxShadow: "inset 1px 1px 2px rgba(100, 149, 237, 0.3)",
                      }}
                    />
                  )
                }
                return null
              }),
            )}

            {/* Enhanced Cookies */}
            {gameState.cookies.map((cookie, index) => (
              <div
                key={index}
                className="absolute z-5"
                style={{
                  left: cookie.x * GRID_SIZE + 2,
                  top: cookie.y * GRID_SIZE + 2,
                  width: 16,
                  height: 16,
                }}
              >
                <div className="w-full h-full relative animate-pulse">
                  {/* Cookie base with gradient */}
                  <div
                    className="absolute inset-0 rounded-full border-2 border-yellow-500"
                    style={{
                      background: "radial-gradient(circle at 30% 30%, #fbbf24, #d97706)",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.3), inset 1px 1px 2px rgba(255,255,255,0.3)",
                    }}
                  ></div>
                  {/* Chocolate chips */}
                  <div className="absolute w-1.5 h-1.5 bg-amber-900 rounded-full top-1 left-2 shadow-sm"></div>
                  <div className="absolute w-1.5 h-1.5 bg-amber-900 rounded-full top-3 right-1 shadow-sm"></div>
                  <div className="absolute w-1 h-1 bg-amber-900 rounded-full bottom-1 left-1 shadow-sm"></div>
                  <div className="absolute w-1 h-1 bg-amber-900 rounded-full top-2 left-3 shadow-sm"></div>
                  {/* Cookie shine */}
                  <div className="absolute w-2 h-1 bg-yellow-200 rounded-full top-1 left-2 opacity-60"></div>
                </div>
              </div>
            ))}

            {/* Enhanced Cookie Monster */}
            <div
              className="absolute transition-all duration-150 z-10"
              style={{
                left: gameState.cookieMonster.x * GRID_SIZE,
                top: gameState.cookieMonster.y * GRID_SIZE,
                width: GRID_SIZE,
                height: GRID_SIZE,
              }}
            >
              <div className="w-full h-full relative">
                {/* Main blue fuzzy body with gradient */}
                <div
                  className="absolute inset-0 rounded-full border-2 border-blue-400"
                  style={{
                    background: "radial-gradient(circle at 30% 30%, #3b82f6, #1e40af)",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.4), inset 1px 1px 3px rgba(255,255,255,0.2)",
                  }}
                ></div>

                {/* Googly Eyes */}
                <div className="absolute top-0.5 left-1">
                  <div
                    className="w-3 h-3 bg-white rounded-full border border-gray-300"
                    style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.2)" }}
                  >
                    <div className="w-1.5 h-1.5 bg-black rounded-full mt-1 ml-1"></div>
                  </div>
                </div>
                <div className="absolute top-0.5 right-1">
                  <div
                    className="w-3 h-3 bg-white rounded-full border border-gray-300"
                    style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.2)" }}
                  >
                    <div className="w-1.5 h-1.5 bg-black rounded-full mt-1 ml-1"></div>
                  </div>
                </div>

                {/* Mouth with teeth */}
                <div
                  className="absolute bg-black rounded-full border border-gray-800"
                  style={{
                    left: "50%",
                    top: "65%",
                    transform: "translate(-50%, -50%)",
                    width: "10px",
                    height: "8px",
                    boxShadow: "inset 0 1px 2px rgba(0,0,0,0.5)",
                  }}
                >
                  {/* Teeth */}
                  <div className="absolute w-1 h-1 bg-white top-0 left-1"></div>
                  <div className="absolute w-1 h-1 bg-white top-0 right-1"></div>
                </div>

                {/* Cookie crumbs */}
                <div className="absolute w-1 h-1 bg-orange-400 rounded-full top-4 left-1 animate-pulse shadow-sm"></div>
                <div className="absolute w-0.5 h-0.5 bg-yellow-600 rounded-full top-3 right-1 animate-pulse"></div>
                <div className="absolute w-0.5 h-0.5 bg-amber-600 rounded-full bottom-1 left-2 animate-pulse"></div>
              </div>
            </div>

            {/* Chef Hat Ghosts */}
            {gameState.ghosts.map((ghost) => (
              <div
                key={ghost.id}
                className="absolute transition-all duration-300 z-10"
                style={{
                  left: ghost.x * GRID_SIZE,
                  top: ghost.y * GRID_SIZE,
                  width: GRID_SIZE,
                  height: GRID_SIZE,
                }}
              >
                <div className="w-full h-full relative">
                  {/* Chef Hat Base */}
                  <div
                    className={`absolute inset-0 rounded-t-full border-2 ${
                      ghost.color === "red"
                        ? "bg-red-500 border-red-400"
                        : ghost.color === "pink"
                          ? "bg-pink-500 border-pink-400"
                          : "bg-cyan-500 border-cyan-400"
                    }`}
                    style={{
                      background:
                        ghost.color === "red"
                          ? "radial-gradient(circle at 30% 30%, #ef4444, #dc2626)"
                          : ghost.color === "pink"
                            ? "radial-gradient(circle at 30% 30%, #ec4899, #db2777)"
                            : "radial-gradient(circle at 30% 30%, #06b6d4, #0891b2)",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
                    }}
                  ></div>

                  {/* Chef Hat Top (puffy part) */}
                  <div
                    className="absolute -top-1 left-1 w-4 h-3 bg-white rounded-full border border-gray-200"
                    style={{
                      boxShadow: "0 1px 3px rgba(0,0,0,0.2), inset 0 1px 1px rgba(255,255,255,0.5)",
                    }}
                  ></div>

                  {/* Chef Hat Band */}
                  <div className="absolute bottom-2 left-0 w-full h-1 bg-white border-t border-gray-200"></div>

                  {/* Ghost Eyes */}
                  <div className="absolute top-2 left-1">
                    <div className="w-2 h-2 bg-white rounded-full border border-gray-300">
                      <div className="w-1 h-1 bg-red-600 rounded-full mt-0.5 ml-0.5"></div>
                    </div>
                  </div>
                  <div className="absolute top-2 right-1">
                    <div className="w-2 h-2 bg-white rounded-full border border-gray-300">
                      <div className="w-1 h-1 bg-red-600 rounded-full mt-0.5 ml-0.5"></div>
                    </div>
                  </div>

                  {/* Ghost bottom wavy part */}
                  <div
                    className={`absolute bottom-0 left-0 w-full h-2 ${
                      ghost.color === "red" ? "bg-red-500" : ghost.color === "pink" ? "bg-pink-500" : "bg-cyan-500"
                    }`}
                    style={{
                      clipPath: "polygon(0 0, 25% 100%, 50% 0, 75% 100%, 100% 0, 100% 50%, 0 50%)",
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="text-center space-y-4">
            <div className="text-sm text-cyan-400 font-mono">
              <p>AVOID THE CHEF HAT GHOSTS!</p>
              <p>EAT ALL COOKIES TO WIN!</p>
              <p className="font-bold text-yellow-400">⚡ "ME WANT COOKIE NOW!" ⚡</p>
            </div>

            {/* Mobile Controls */}
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
