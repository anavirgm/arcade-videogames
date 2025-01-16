'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Gamepad2Icon, ArrowLeftIcon } from 'lucide-react'

export default function TermsPage() {
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

      <div className="w-full max-w-4xl bg-black/80 p-8 rounded-lg border-2 border-purple-500 text-white">
        <h1 className="text-3xl font-bold mb-6 text-center arcade-title text-purple-400">Términos de Servicio</h1>
        <div className="space-y-4">
          <p>Bienvenido a Retro Arcade. Al acceder a nuestro sitio web y utilizar nuestros servicios, aceptas cumplir con los siguientes términos y condiciones:</p>
          
          <h2 className="text-xl font-bold text-purple-400 mt-4">1. Uso del Servicio</h2>
          <p>Retro Arcade proporciona una plataforma de juegos arcade en línea. Al utilizar nuestros servicios, te comprometes a usarlos de manera responsable y de acuerdo con todas las leyes aplicables.</p>
          
          <h2 className="text-xl font-bold text-purple-400 mt-4">2. Cuenta de Usuario</h2>
          <p>Para acceder a ciertas funciones de nuestro sitio, deberás crear una cuenta. Eres responsable de mantener la confidencialidad de tu cuenta y contraseña.</p>
          
          <h2 className="text-xl font-bold text-purple-400 mt-4">3. Propiedad Intelectual</h2>
          <p>Todo el contenido presente en Retro Arcade, incluyendo pero no limitado a gráficos, logotipos, y software, está protegido por derechos de autor y otras leyes de propiedad intelectual.</p>
          
          <h2 className="text-xl font-bold text-purple-400 mt-4">4. Limitación de Responsabilidad</h2>
          <p>Retro Arcade no se hace responsable de cualquier daño directo, indirecto, incidental o consecuente que resulte del uso o la imposibilidad de usar nuestros servicios.</p>
          
          <h2 className="text-xl font-bold text-purple-400 mt-4">5. Modificaciones de los Términos</h2>
          <p>Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en el sitio web.</p>
        </div>
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

