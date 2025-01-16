'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Gamepad2Icon } from 'lucide-react'

const games = [
  { id: 'pacman', title: "Pac-Man", color: "yellow" },
  { id: 'space-invaders', title: "Space Invaders", color: "green" },
  { id: 'donkey-kong', title: "Donkey Kong", color: "red" },
  { id: 'galaga', title: "Galaga", color: "blue" }
]

export default function GamesPage() {
  const [stars, setStars] = useState<{ x: number; y: number; size: number }[]>([])

  useEffect(() => {
    const newStars = Array.from({ length: 50 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1
    }))
    setStars(newStars)
  }, [])

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

      <div className="w-full max-w-4xl bg-black/80 p-8 rounded-lg border-2 border-purple-500">
        <h2 className="text-3xl font-bold mb-6 text-center arcade-title text-white">Selecciona un Juego</h2>
        <div className="grid grid-cols-2 gap-4">
          {games.map((game) => (
            <Link key={game.id} href={`/games/${game.id}`}>
              <div className={`p-4 border-2 border-${game.color}-500 rounded-lg text-center hover:bg-${game.color}-500/20 transition-colors cursor-pointer`}>
                <h3 className={`text-xl font-bold mb-2 arcade-title text-${game.color}-400`}>{game.title}</h3>
                <p className="text-white">Jugar ahora</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

