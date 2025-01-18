'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Gamepad2Icon, ArrowLeftIcon } from 'lucide-react'

const CELL_SIZE = 20;
const PACMAN_SIZE = 16;
const GRID_WIDTH = 28;
const GRID_HEIGHT = 31;

interface Pacman {
  x: number;
  y: number;
  direction: 'right' | 'left' | 'up' | 'down';
}

interface Ghost {
  x: number;
  y: number;
  direction: 'right' | 'left' | 'up' | 'down';
  color: string;
}

const MAZE = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0],
  [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
  [0,3,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,3,0],
  [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
  [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
  [0,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0],
  [0,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0],
  [0,1,1,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,1,1,0],
  [0,0,0,0,0,0,1,0,0,0,0,0,2,0,0,2,0,0,0,0,0,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,0,0,0,0,0,2,0,0,2,0,0,0,0,0,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,0,0,2,2,2,2,2,2,2,2,2,2,0,0,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,0,0,2,0,0,0,4,4,0,0,0,2,0,0,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,0,0,2,0,2,2,2,2,2,2,0,2,0,0,1,0,0,0,0,0,0],
  [2,2,2,2,2,2,1,2,2,2,0,2,2,2,2,2,2,0,2,2,2,1,2,2,2,2,2,2],
  [0,0,0,0,0,0,1,0,0,2,0,2,2,2,2,2,2,0,2,0,0,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,0,0,2,0,0,0,0,0,0,0,0,2,0,0,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,0,0,2,2,2,2,2,2,2,2,2,2,0,0,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,0,0,2,0,0,0,0,0,0,0,0,2,0,0,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,0,0,2,0,0,0,0,0,0,0,0,2,0,0,1,0,0,0,0,0,0],
  [0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0],
  [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
  [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
  [0,3,1,1,0,0,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,0,0,1,1,3,0],
  [0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0],
  [0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0],
  [0,1,1,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,1,1,0],
  [0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0],
  [0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0],
  [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];

export default function PacmanGame() {
  const [stars, setStars] = useState<{ x: number; y: number; size: number }[]>([])
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [level, setLevel] = useState(1)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [pacman, setPacman] = useState<Pacman>({ x: 1, y: 1, direction: 'right' })
  const [ghosts, setGhosts] = useState<Ghost[]>([
    { x: 13, y: 11, direction: 'right', color: 'red' },
    { x: 14, y: 11, direction: 'left', color: 'pink' },
    { x: 13, y: 12, direction: 'up', color: 'cyan' },
    { x: 14, y: 12, direction: 'down', color: 'orange' },
  ])
  const [grid, setGrid] = useState<number[][]>(MAZE)
  const [powerMode, setPowerMode] = useState(false)
  const [dotsLeft, setDotsLeft] = useState(0)

  useEffect(() => {
    const newStars = Array.from({ length: 50 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1
    }))
    setStars(newStars)

    // Count initial dots
    let dots = 0;
    for (let y = 0; y < GRID_HEIGHT; y++) {
      for (let x = 0; x < GRID_WIDTH; x++) {
        if (MAZE[y][x] === 1 || MAZE[y][x] === 3) dots++;
      }
    }
    setDotsLeft(dots);
  }, [])

  useEffect(() => {
    if (!gameStarted || gameOver) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const gameLoop = setInterval(() => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw grid
      for (let y = 0; y < GRID_HEIGHT; y++) {
        for (let x = 0; x < GRID_WIDTH; x++) {
          if (grid[y][x] === 0) {
            ctx.fillStyle = 'blue'
            ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE)
          } else if (grid[y][x] === 1) {
            ctx.fillStyle = 'yellow'
            ctx.beginPath()
            ctx.arc(x * CELL_SIZE + CELL_SIZE / 2, y * CELL_SIZE + CELL_SIZE / 2, 2, 0, Math.PI * 2)
            ctx.fill()
          } else if (grid[y][x] === 3) {
            ctx.fillStyle = 'yellow'
            ctx.beginPath()
            ctx.arc(x * CELL_SIZE + CELL_SIZE / 2, y * CELL_SIZE + CELL_SIZE / 2, 5, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      }

      // Draw Pac-Man
      ctx.fillStyle = 'yellow'
      ctx.beginPath()
      const mouthAngle = 0.2 * Math.PI * Math.sin(Date.now() / 100) + 0.2 * Math.PI
      let startAngle, endAngle
      switch(pacman.direction) {
        case 'right':
          startAngle = mouthAngle
          endAngle = 2 * Math.PI - mouthAngle
          break
        case 'left':
          startAngle = Math.PI + mouthAngle
          endAngle = Math.PI - mouthAngle
          break
        case 'up':
          startAngle = 1.5 * Math.PI + mouthAngle
          endAngle = 1.5 * Math.PI - mouthAngle
          break
        case 'down':
          startAngle = 0.5 * Math.PI + mouthAngle
          endAngle = 0.5 * Math.PI - mouthAngle
          break
      }
      ctx.arc(
        pacman.x * CELL_SIZE + CELL_SIZE / 2,
        pacman.y * CELL_SIZE + CELL_SIZE / 2,
        PACMAN_SIZE / 2,
        startAngle,
        endAngle
      )
      ctx.lineTo(pacman.x * CELL_SIZE + CELL_SIZE / 2, pacman.y * CELL_SIZE + CELL_SIZE / 2)
      ctx.fill()

      // Draw ghosts
      ghosts.forEach(ghost => {
        ctx.fillStyle = powerMode ? 'blue' : ghost.color
        ctx.beginPath()
        ctx.arc(
          ghost.x * CELL_SIZE + CELL_SIZE / 2,
          ghost.y * CELL_SIZE + CELL_SIZE / 2,
          PACMAN_SIZE / 2,
          0,
          Math.PI * 2
        )
        ctx.fill()
      })

      // Move Pac-Man
      const newPacman = { ...pacman }
      switch (pacman.direction) {
        case 'right':
          if (grid[pacman.y][pacman.x + 1] !== 0) newPacman.x += 1
          break
        case 'left':
          if (grid[pacman.y][pacman.x - 1] !== 0) newPacman.x -= 1
          break
        case 'up':
          if (grid[pacman.y - 1][pacman.x] !== 0) newPacman.y -= 1
          break
        case 'down':
          if (grid[pacman.y + 1][pacman.x] !== 0) newPacman.y += 1
          break
      }

      // Wrap around
      if (newPacman.x < 0) newPacman.x = GRID_WIDTH - 1
      if (newPacman.x >= GRID_WIDTH) newPacman.x = 0
      if (newPacman.y < 0) newPacman.y = GRID_HEIGHT - 1
      if (newPacman.y >= GRID_HEIGHT) newPacman.y = 0

      // Eat dot or power pellet
      if (grid[newPacman.y][newPacman.x] === 1 || grid[newPacman.y][newPacman.x] === 3) {
        const newGrid = [...grid]
        if (grid[newPacman.y][newPacman.x] === 1) {
          setScore(prevScore => prevScore + 10)
          setDotsLeft(prev => prev - 1)
        } else if (grid[newPacman.y][newPacman.x] === 3) {
          setScore(prevScore => prevScore + 50)
          setPowerMode(true)
          setTimeout(() => setPowerMode(false), 10000) // Power mode lasts 10 seconds
          setDotsLeft(prev => prev - 1)
        }
        newGrid[newPacman.y][newPacman.x] = 2
        setGrid(newGrid)
      }

      setPacman(newPacman)

      // Move ghosts (improved AI)
      const newGhosts = ghosts.map(ghost => {
        const possibleDirections = ['right', 'left', 'up', 'down']
        const validDirections = possibleDirections.filter(dir => {
          switch (dir) {
            case 'right': return grid[ghost.y][ghost.x + 1] !== 0
            case 'left': return grid[ghost.y][ghost.x - 1] !== 0
            case 'up': return grid[ghost.y - 1][ghost.x] !== 0
            case 'down': return grid[ghost.y + 1][ghost.x] !== 0
          }
        })

        let newDirection
        if (Math.random() < 0.8) { // 80% chance to move towards Pac-Man
          const dx = pacman.x - ghost.x
          const dy = pacman.y - ghost.y
          if (Math.abs(dx) > Math.abs(dy)) {
            newDirection = dx > 0 ? 'right' : 'left'
          } else {
            newDirection = dy > 0 ? 'down' : 'up'
          }
          if (!validDirections.includes(newDirection)) {
            newDirection = validDirections[Math.floor(Math.random() * validDirections.length)]
          }
        } else {
          newDirection = validDirections[Math.floor(Math.random() * validDirections.length)]
        }

        const newGhost = { ...ghost, direction: newDirection as 'right' | 'left' | 'up' | 'down' }

        switch (newDirection) {
          case 'right': newGhost.x += 1; break
          case 'left': newGhost.x -= 1; break
          case 'up': newGhost.y -= 1; break
          case 'down': newGhost.y += 1; break
        }

        // Wrap around
        if (newGhost.x < 0) newGhost.x = GRID_WIDTH - 1
        if (newGhost.x >= GRID_WIDTH) newGhost.x = 0
        if (newGhost.y < 0) newGhost.y = GRID_HEIGHT - 1
        if (newGhost.y >= GRID_HEIGHT) newGhost.y = 0

        return newGhost
      })

      setGhosts(newGhosts)

      // Check for collisions with ghosts
      if (newGhosts.some(ghost => ghost.x === newPacman.x && ghost.y === newPacman.y)) {
        if (powerMode) {
          setScore(prevScore => prevScore + 200)
          setGhosts(prevGhosts => prevGhosts.map(ghost => 
            ghost.x === newPacman.x && ghost.y === newPacman.y
              ? { ...ghost, x: 13, y: 11 } // Reset eaten ghost position
              : ghost
          ))
        } else {
          setLives(prevLives => prevLives - 1)
          if (lives <= 1) {
            clearInterval(gameLoop)
            setGameOver(true)
          } else {
            // Reset positions
            setPacman({ x: 1, y: 1, direction: 'right' })
            setGhosts([
              { x: 13, y: 11, direction: 'right', color: 'red' },
              { x: 14, y: 11, direction: 'left', color: 'pink' },
              { x: 13, y: 12, direction: 'up', color: 'cyan' },
              { x: 14, y: 12, direction: 'down', color: 'orange' },
            ])
          }
        }
      }

      // Check if all dots are eaten
      if (dotsLeft === 0) {
        clearInterval(gameLoop)
        setLevel(prevLevel => prevLevel + 1)
        setGrid(MAZE)
        setPacman({ x: 1, y: 1, direction: 'right' })
        setGhosts([
          { x: 13, y: 11, direction: 'right', color: 'red' },
          { x: 14, y: 11, direction: 'left', color: 'pink' },
          { x: 13, y: 12, direction: 'up', color: 'cyan' },
          { x: 14, y: 12, direction: 'down', color: 'orange' },
        ])
        let dots = 0;
        for (let y = 0; y < GRID_HEIGHT; y++) {
          for (let x = 0; x < GRID_WIDTH; x++) {
            if (MAZE[y][x] === 1 || MAZE[y][x] === 3) dots++;
          }
        }
        setDotsLeft(dots)
        setGameStarted(false)
      }
    }, 200 - (level * 10)) // Game speeds up with each level

    return () => clearInterval(gameLoop)
  }, [gameStarted, gameOver, grid, pacman, ghosts, score, lives, level, powerMode, dotsLeft])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameStarted) return

      switch (e.key) {
        case 'ArrowRight':
          setPacman(prev => ({ ...prev, direction: 'right' }))
          break
        case 'ArrowLeft':
          setPacman(prev => ({ ...prev, direction: 'left' }))
          break
        case 'ArrowUp':
          setPacman(prev => ({ ...prev, direction: 'up' }))
          break
        case 'ArrowDown':
          setPacman(prev => ({ ...prev, direction: 'down' }))
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [gameStarted])

  const startGame = () => {
    setGameStarted(true)
    setGameOver(false)
    setScore(0)
    setLives(3)
    setLevel(1)
    setPacman({ x: 1, y: 1, direction: 'right' })
    setGhosts([
      { x: 13, y: 11, direction: 'right', color: 'red' },
      { x: 14, y: 11, direction: 'left', color: 'pink' },
      { x: 13, y: 12, direction: 'up', color: 'cyan' },
      { x: 14, y: 12, direction: 'down', color: 'orange' },
    ])
    setGrid(MAZE)
    let dots = 0;
    for (let y = 0; y < GRID_HEIGHT; y++) {
      for (let x = 0; x < GRID_WIDTH; x++) {
        if (MAZE[y][x] === 1 || MAZE[y][x] === 3) dots++;
      }
    }
    setDotsLeft(dots)
  }

  return (
    <div className="min-h-screen space-background relative overflow-hidden flex flex-col items-center justify-center p-8">
      {/* Stars */}
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute bg-white rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: Math.random() * 0.5 + 0.5
          }}
        />
      ))}

      {/* Top Border Flames */}
      <div className="pixel-border absolute top-0 left-0 right-0">
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={`top-${i}`} className="pixel-flame flame" style={{ animationDelay: `${i * 0.1}s` }} />
        ))}
      </div>

      {/* Bottom Border Flames */}
      <div className="pixel-border absolute bottom-0 left-0 right-0">
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={`bottom-${i}`} className="pixel-flame flame" style={{ animationDelay: `${i * 0.1}s` }} />
        ))}
      </div>

      <Link href="/" className="mb-8 text-2xl font-bold arcade-title flex items-center text-white">
        <Gamepad2Icon className="mr-2" />
        Retro Arcade
      </Link>

      <div className="w-full max-w-4xl bg-black/80 p-8 rounded-lg border-2 border-yellow-500">
        <h2 className="text-3xl font-bold mb-6 text-center arcade-title text-yellow-400">Pac-Man</h2>
        <div className="aspect-video bg-black border-4 border-yellow-500 rounded-lg flex items-center justify-center">
          <canvas 
            ref={canvasRef} 
            width={GRID_WIDTH * CELL_SIZE} 
            height={GRID_HEIGHT * CELL_SIZE}
            className="border-4 border-blue-500"
            aria-label="Juego de Pac-Man"
            role="img"
          ></canvas>
        </div>
        <div className="mt-6 flex justify-between items-center">
          <Link href="/games" className="flex items-center text-white hover:text-yellow-400 transition-colors">
            <ArrowLeftIcon className="mr-2" />
            Volver a la selección de juegos
          </Link>
          <div className="text-yellow-400 text-xl">
            <span className="mr-4">Nivel: {level}</span>
            <span className="mr-4">Vidas: {lives}</span>
            <span>Puntuación: {score}</span>
          </div>
          <button 
            className="start-button bg-yellow-500 text-black hover:bg-yellow-400"
            onClick={startGame}
            disabled={gameStarted && !gameOver}
          >
            {gameStarted && !gameOver ? 'Jugando...' : gameOver ? 'Jugar de nuevo' : 'Iniciar Juego'}
          </button>
        </div>
      </div>
    </div>
  )
}

