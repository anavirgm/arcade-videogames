'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Gamepad2Icon, ArrowLeftIcon } from 'lucide-react'

export default function PrivacyPage() {
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
        <h1 className="text-3xl font-bold mb-6 text-center arcade-title text-purple-400">Política de Privacidad</h1>
        <div className="space-y-4">
          <p>En Retro Arcade, valoramos y respetamos tu privacidad. Esta política de privacidad explica cómo recopilamos, usamos y protegemos tu información personal.</p>
          
          <h2 className="text-xl font-bold text-purple-400 mt-4">1. Información que Recopilamos</h2>
          <p>Recopilamos información que nos proporcionas directamente, como tu nombre, dirección de correo electrónico y datos de juego cuando creas una cuenta o juegas en nuestra plataforma.</p>
          
          <h2 className="text-xl font-bold text-purple-400 mt-4">2. Uso de la Información</h2>
          <p>Utilizamos la información recopilada para proporcionar, mantener y mejorar nuestros servicios, así como para comunicarnos contigo sobre actualizaciones o promociones.</p>
          
          <h2 className="text-xl font-bold text-purple-400 mt-4">3. Compartir Información</h2>
          <p>No vendemos ni compartimos tu información personal con terceros, excepto cuando sea necesario para proporcionar nuestros servicios o cumplir con requisitos legales.</p>
          
          <h2 className="text-xl font-bold text-purple-400 mt-4">4. Seguridad de Datos</h2>
          <p>Implementamos medidas de seguridad para proteger tu información personal contra acceso no autorizado, alteración, divulgación o destrucción.</p>
          
          <h2 className="text-xl font-bold text-purple-400 mt-4">5. Tus Derechos</h2>
          <p>Tienes derecho a acceder, corregir o eliminar tu información personal. Si deseas ejercer estos derechos, por favor contáctanos.</p>
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

