'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { TrophyIcon, UsersIcon, SparklesIcon } from 'lucide-react'

export default function ArcadeHome() {
  const [stars, setStars] = useState<{ x: number; y: number; size: number }[]>([])

  useEffect(() => {
    const newStars = Array.from({ length: 50 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1
    }))
    setStars(newStars)
  }, [])

  const games = [
    { title: "Pac-Man", players: "1-2", score: "99,999" },
    { title: "Space Invaders", players: "1", score: "88,888" },
    { title: "Donkey Kong", players: "1-2", score: "77,777" },
    { title: "Galaga", players: "1", score: "66,666" }
  ]

  return (
    <div className="min-h-screen space-background relative">
      {/* Hero Section */}
      <div className="relative overflow-hidden flex flex-col items-center justify-center p-8 min-h-screen">
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

        {/* Hearts */}
        <div className="absolute top-8 left-8 flex gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={`heart-${i}`} className="pixel-heart pulse" style={{ animationDelay: `${i * 0.2}s` }} />
          ))}
        </div>

        {/* Main Content */}
        <div className="text-center z-10 space-y-12">
          <h1 className="pixel-text text-4xl md:text-6xl text-white mb-8 tracking-wider">
            ARCADE
            <br />
            GAME
          </h1>

          {/* Spaceships and Clouds */}
          <div className="relative w-full max-w-2xl mx-auto">
            <div className="absolute left-0 float" style={{ animationDelay: '0.5s' }}>
              <div className="pixel-spaceship" />
              <div className="pixel-cloud mt-4" />
            </div>
            <div className="absolute right-0 float">
              <div className="pixel-spaceship" />
              <div className="pixel-cloud mt-4" />
            </div>
          </div>

          {/* Start Button */}
          <Link href="/games">
            <button className="start-button text-white pulse">
              START
            </button>
          </Link>
        </div>
      </div>

      {/* High Scores Section */}
      <section className="relative bg-black/80 py-20">
        <div className="container mx-auto px-4">
          <h2 className="pixel-text text-3xl text-center text-white mb-12">HIGH SCORES</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {games.map((game, index) => (
              <div 
                key={game.title}
                className="border-2 border-purple-500 bg-black p-6 rounded-lg text-white hover:border-purple-400 transition-all"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <h3 className="pixel-text text-lg mb-4">{game.title}</h3>
                <div className="space-y-2 text-sm">
                  <p className="flex justify-between">
                    <span>Players:</span>
                    <span className="text-purple-400">{game.players}</span>
                  </p>
                  <p className="flex justify-between">
                    <span>High Score:</span>
                    <span className="text-purple-400">{game.score}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative bg-purple-900/20 py-20">
        <div className="container mx-auto px-4">
          <h2 className="pixel-text text-3xl text-center text-white mb-12">FEATURES</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <TrophyIcon className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
              <h3 className="pixel-text text-white mb-2">TOURNAMENTS</h3>
              <p className="text-purple-200">Compete for the highest scores in weekly tournaments</p>
            </div>
            <div className="text-center p-6">
              <UsersIcon className="w-12 h-12 mx-auto mb-4 text-blue-400" />
              <h3 className="pixel-text text-white mb-2">MULTIPLAYER</h3>
              <p className="text-purple-200">Challenge friends in real-time matches</p>
            </div>
            <div className="text-center p-6">
              <SparklesIcon className="w-12 h-12 mx-auto mb-4 text-purple-400" />
              <h3 className="pixel-text text-white mb-2">ACHIEVEMENTS</h3>
              <p className="text-purple-200">Unlock special rewards and badges</p>
            </div>
          </div>
        </div>
      </section>

      {/* Join Now Section */}
      <section className="relative bg-black/80 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="pixel-text text-3xl text-white mb-6">JOIN THE ARCADE</h2>
          <p className="text-purple-200 mb-8 max-w-2xl mx-auto">
            Experience the golden age of gaming with our collection of classic arcade games. 
            Register now and start your retro gaming adventure!
          </p>
          <div className="space-x-4">
            <Link href="/register">
              <button className="start-button text-white">
                REGISTER
              </button>
            </Link>
            <Link href="/login">
              <button className="start-button text-white" style={{
                background: 'linear-gradient(45deg, #2196f3, #00bcd4)'
              }}>
                LOGIN
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/90 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-purple-200 text-sm">&copy; 2025 ARCADE GAME. ALL RIGHTS RESERVED</p>
          <div className="mt-4 space-x-4">
            <Link href="/terms" className="text-sm text-purple-400 hover:text-purple-300">Terms</Link>
            <Link href="/privacy" className="text-sm text-purple-400 hover:text-purple-300">Privacy</Link>
            <Link href="/contact" className="text-sm text-purple-400 hover:text-purple-300">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

