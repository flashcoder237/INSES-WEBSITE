'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Lock, Mail, Loader2 } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const supabase = createClient()
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setError(error.message)
        return
      }

      if (data.user) {
        router.push('/admin')
        router.refresh()
      }
    } catch (err) {
      setError('Une erreur est survenue lors de la connexion')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Logo et titre */}
        <div className="text-center">
          <div className="mx-auto h-20 w-20 bg-[#B22234] rounded-lg flex items-center justify-center shadow-lg">
            <Lock className="h-10 w-10 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-[#4A4A4A] dark:text-white">
            Panneau d'administration
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            INSES - Institut Supérieur de l'Espoir
          </p>
        </div>

        {/* Formulaire de connexion */}
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-xl shadow-xl bg-white dark:bg-gray-800 p-8">
            <div className="space-y-5">
              {/* Champ Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Adresse email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B22234] focus:border-transparent dark:bg-gray-700 dark:text-white transition"
                    placeholder="admin@univ-inses.com"
                  />
                </div>
              </div>

              {/* Champ Mot de passe */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Mot de passe
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B22234] focus:border-transparent dark:bg-gray-700 dark:text-white transition"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Message d'erreur */}
              {error && (
                <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-4">
                  <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
                </div>
              )}

              {/* Bouton de connexion */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-[#B22234] hover:bg-[#800020] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B22234] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                    Connexion en cours...
                  </>
                ) : (
                  'Se connecter'
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 dark:text-gray-400">
          Accès réservé au personnel autorisé uniquement
        </p>
      </div>
    </div>
  )
}
