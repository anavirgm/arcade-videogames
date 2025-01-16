'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Gamepad2Icon, ArrowLeftIcon } from 'lucide-react'

export default function ContactPage() {
  const [stars, setStars] = useState<{ x: number; y: number; size: number }[]>([])
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  useEffect(() => {
    const newStars = Array.from({ length: 50 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1
    }))
    setStars(newStars)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar el formulario
    console.log('Datos del formulario:', formData)
    alert('Gracias por tu mensaje. Te contactaremos pronto.')
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

      <div className="w-full max-w-4xl bg-black/80 p-8 rounded-lg border-2 border-purple-500 text-white">
        <h1 className="text-3xl font-bold mb-6 text-center arcade-title text-purple-400">Contacto</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-purple-400">Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 bg-purple-900/50 border border-purple-500 rounded-md text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-purple-400">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 bg-purple-900/50 border border-purple-500 rounded-md text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-purple-400">Mensaje</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="mt-1 block w-full px-3 py-2 bg-purple-900/50 border border-purple-500 rounded-md text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            ></textarea>
          </div>
          <div>
            <button type="submit" className="w-full start-button bg-purple-500 text-white hover:bg-purple-400">
              Enviar Mensaje
            </button>
          </div>
        </form>
        <div className="mt-8 flex justify-center">
          <Link href="/" className="start-button bg-purple-500 text-white hover:bg-purple-400 flex items-center">
            <ArrowLeftIcon className="mr-2" />
            Volver al Inicio
          </Link>
        </div>
      </div>
    </div>
  )
}

