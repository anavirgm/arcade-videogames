'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Gamepad2Icon, ArrowLeftIcon } from 'lucide-react'

export default function DonkeyKongGame() {
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

      <div className="w-full max-w-4xl bg-black/80 p-8 rounded-lg border-2 border-red-500">
        <h2 className="text-3xl font-bold mb-6 text-center arcade-title text-red-400">Donkey Kong</h2>
        <div className="aspect-video bg-black border-4 border-red-500 rounded-lg flex items-center justify-center">
          <p className="text-red-400 text-2xl arcade-title">Juego de Donkey Kong aquí</p>
        </div>
        <div className="mt-6 flex justify-between items-center">
          <Link href="/games" className="flex items-center text-white hover:text-red-400 transition-colors">
            <ArrowLeftIcon className="mr-2" />
            Volver a la selección de juegos
          </Link>
          <button className="start-button bg-red-500 text-black hover:bg-red-400">Iniciar Juego</button>
        </div>
      </div>
    </div>
  )
}

