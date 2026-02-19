'use client'

import { useState, useEffect } from 'react'
import { WifiOff, RefreshCw } from 'lucide-react'

export default function OfflineDetector() {
  const [isOnline, setIsOnline] = useState(true)
  const [showOffline, setShowOffline] = useState(false)

  useEffect(() => {
    // Vérifier l'état initial
    setIsOnline(navigator.onLine)

    // Écouter les changements de connexion
    const handleOnline = () => {
      setIsOnline(true)
      setShowOffline(false)
    }

    const handleOffline = () => {
      setIsOnline(false)
      setShowOffline(true)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const handleRetry = () => {
    // Recharger la page pour réessayer
    window.location.reload()
  }

  if (!showOffline) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-8 text-center">
        {/* Icône */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-[#0000fe] bg-opacity-10 rounded-full flex items-center justify-center">
            <WifiOff className="w-10 h-10 text-[#0000fe]" />
          </div>
        </div>

        {/* Titre */}
        <h2 className="text-2xl font-bold text-[#4A4A4A] mb-4">
          Pas de connexion Internet
        </h2>

        {/* Message */}
        <p className="text-gray-600 mb-6 leading-relaxed">
          Veuillez vérifier votre connexion Internet et réessayer.
        </p>

        {/* Suggestions */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
          <p className="text-sm font-semibold text-gray-700 mb-2">
            Suggestions :
          </p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Vérifiez votre connexion Wi-Fi ou données mobiles</li>
            <li>• Redémarrez votre routeur</li>
            <li>• Vérifiez que le mode avion est désactivé</li>
          </ul>
        </div>

        {/* Bouton réessayer */}
        <button
          onClick={handleRetry}
          className="w-full bg-[#0000fe] hover:bg-[#0000b3] text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-5 h-5" />
          Réessayer
        </button>

        {/* Statut de connexion */}
        <div className="mt-4 text-xs text-gray-500">
          Statut : {isOnline ? '✓ En ligne' : '✗ Hors ligne'}
        </div>
      </div>
    </div>
  )
}
