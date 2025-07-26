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

const GRID_SIZE = 18 // Reduced by 10%
const GAME_WIDTH = 360 // Reduced by 10%
const GAME_HEIGHT = 270 // Reduced by 10%
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

// Improved ghost AI that follows maze paths
const moveGhost = (ghost: Ghost): Ghost => {
  const directions = ["up", "down", "left", "right"]
  let newX = ghost.x
  let newY = ghost.y
  let newDirection = ghost.direction

  // Try to continue in current direction first
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

  // If can't continue in current direction, find valid alternatives
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
      return isValidPosition(testX, testY) && dir !== getOppositeDirection(ghost.direction)
    })

    // If no valid directions except backwards, allow backwards
    if (validDirections.length === 0) {
      const oppositeDir = getOppositeDirection(ghost.direction)
      if (oppositeDir) {
        newDirection = oppositeDir
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
      }
    } else {
      // Pick a random valid direction
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
    }
  }

  // Final validation - if still invalid, don't move
  if (!isValidPosition(newX, newY)) {
    return ghost
  }

  return { ...ghost, x: newX, y: newY, direction: newDirection }
}

const getOppositeDirection = (direction: string): string => {
  switch (direction) {
    case "up":
      return "down"
    case "down":
      return "up"
    case "left":
      return "right"
    case "right":
      return "left"
    default:
      return "right"
  }
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
    }, 600) // Slightly slower ghost movement

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
      <Card className="w-full max-w-lg bg-black border-4 border-yellow-400">
        <CardHeader className="text-center bg-black pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl text-yellow-400 font-mono">🍪 COOKIE MONSTER PAC-MAN 🍪</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-yellow-400 hover:bg-yellow-400/20">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-cyan-400 font-mono">"ME WANT COOKIE! AVOID CHEF HATS!"</p>
        </CardHeader>
        <CardContent className="p-4 bg-black">
          <div className="text-center mb-3">
            <div className="flex justify-between items-center mb-1 font-mono text-sm">
              <div className="text-yellow-400">SCORE: {gameState.score.toString().padStart(4, "0")}</div>
              <div className={`${gameState.timeLeft <= 20 ? "text-red-500 animate-pulse" : "text-cyan-400"}`}>
                TIME: {gameState.timeLeft.toString().padStart(2, "0")}
              </div>
            </div>
            <div className="text-xs font-mono text-green-400">
              COOKIES: {gameState.score / 10}/{gameState.score / 10 + gameState.cookies.length}
            </div>
            {gameState.lost && (
              <div className="text-sm font-bold text-red-500 mt-1 font-mono animate-pulse">
                {gameState.timeLeft <= 0 ? '"ME RUN OUT OF TIME!"' : '"CHEF HAT GOT ME!"'}
                <div className="text-xs text-gray-400 mt-1">CLOSING IN 3 SECONDS...</div>
              </div>
            )}
            {gameState.gameOver && !gameState.lost && (
              <div className="text-sm font-bold text-green-400 mt-1 font-mono animate-bounce">
                "ME EAT ALL COOKIES! NOM NOM!"
              </div>
            )}
          </div>

          {/* Game Board */}
          <div
            className="relative bg-black border-4 border-blue-600 mx-auto mb-3"
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

            {/* Pixelated Cookie Emojis */}
            {gameState.cookies.map((cookie, index) => (
              <div
                key={index}
                className="absolute z-5 text-sm"
                style={{
                  left: cookie.x * GRID_SIZE + 1,
                  top: cookie.y * GRID_SIZE + 1,
                  width: GRID_SIZE - 2,
                  height: GRID_SIZE - 2,
                  fontSize: "14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                🍪
              </div>
            ))}

            {/* Pixelated Cookie Monster Emoji */}
            <div
              className="absolute transition-all duration-150 z-10 text-sm"
              style={{
                left: gameState.cookieMonster.x * GRID_SIZE,
                top: gameState.cookieMonster.y * GRID_SIZE,
                width: GRID_SIZE,
                height: GRID_SIZE,
                fontSize: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: `rotate(${
                  gameState.direction === "right"
                    ? "0deg"
                    : gameState.direction === "left"
                      ? "180deg"
                      : gameState.direction === "up"
                        ? "-90deg"
                        : "90deg"
                })`,
              }}
            >
              👹
            </div>

            {/* Pixelated Chef Hat Emojis */}
            {gameState.ghosts.map((ghost) => (
              <div
                key={ghost.id}
                className="absolute transition-all duration-300 z-10 text-sm"
                style={{
                  left: ghost.x * GRID_SIZE,
                  top: ghost.y * GRID_SIZE,
                  width: GRID_SIZE,
                  height: GRID_SIZE,
                  fontSize: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  filter:
                    ghost.color === "red"
                      ? "hue-rotate(0deg)"
                      : ghost.color === "pink"
                        ? "hue-rotate(300deg)"
                        : "hue-rotate(180deg)",
                }}
              >
                👨‍🍳
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="text-center space-y-3">
            <div className="text-xs text-cyan-400 font-mono">
              <p>AVOID THE CHEF HAT GHOSTS!</p>
              <p>EAT ALL COOKIES TO WIN!</p>
            </div>

            {/* Mobile Controls */}
            <div className="grid grid-cols-3 gap-1 max-w-32 mx-auto">
              <div></div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => moveCookieMonster("up")}
                disabled={gameState.gameOver}
                className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black bg-black font-mono disabled:opacity-50 text-xs h-8"
              >
                ↑
              </Button>
              <div></div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => moveCookieMonster("left")}
                disabled={gameState.gameOver}
                className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black bg-black font-mono disabled:opacity-50 text-xs h-8"
              >
                ←
              </Button>
              <div></div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => moveCookieMonster("right")}
                disabled={gameState.gameOver}
                className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black bg-black font-mono disabled:opacity-50 text-xs h-8"
              >
                →
              </Button>
              <div></div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => moveCookieMonster("down")}
                disabled={gameState.gameOver}
                className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black bg-black font-mono disabled:opacity-50 text-xs h-8"
              >
                ↓
              </Button>
              <div></div>
            </div>

            <div className="flex gap-2 justify-center">
              {gameState.gameOver && !gameState.lost && (
                <Button
                  onClick={resetGame}
                  className="bg-green-600 hover:bg-green-700 text-white font-mono text-xs h-8"
                >
                  "ME WANT MORE!"
                </Button>
              )}
              {gameState.lost && (
                <Button onClick={resetGame} className="bg-red-500 hover:bg-red-600 text-white font-mono text-xs h-8">
                  "ME TRY AGAIN!"
                </Button>
              )}
              <Button
                variant="outline"
                onClick={onClose}
                className="border-gray-400 text-gray-400 bg-black font-mono hover:bg-gray-800 text-xs h-8"
              >
                EXIT
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
