'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Gamepad2Icon } from 'lucide-react'

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [stars, setStars] = useState<{ x: number; y: number; size: number }[]>([])

  useState(() => {
    const newStars = Array.from({ length: 50 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1
    }))
    setStars(newStars)
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar los datos de inicio de sesión
    console.log('Datos de inicio de sesión:', formData)
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
      <div className="w-full max-w-md bg-black/80 p-8 rounded-lg border-2 border-purple-500">
        <h2 className="text-3xl font-bold mb-6 text-center arcade-title text-white">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-white">Correo electrónico</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="bg-purple-900/50 text-white border-purple-500"
            />
          </div>
          <div>
            <Label htmlFor="password" className="text-white">Contraseña</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="bg-purple-900/50 text-white border-purple-500"
            />
          </div>
          <Button type="submit" className="w-full start-button">Iniciar Sesión</Button>
        </form>
        <p className="mt-4 text-center text-sm text-purple-300">
          ¿No tienes una cuenta?{' '}
          <Link href="/register" className="text-purple-400 hover:text-purple-300 hover-glow">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  )
}