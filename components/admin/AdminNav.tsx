'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { User } from '@supabase/supabase-js'
import {
  Home,
  LogOut,
  Menu,
  X,
  ChevronDown,
} from 'lucide-react'

interface AdminNavProps {
  user: User
}

export default function AdminNav({ user }: AdminNavProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  const navigation = [
    { name: 'Tableau de bord', href: '/admin' },
    { name: 'Formations', href: '/admin/formations' },
    { name: 'Actualités', href: '/admin/news' },
    { name: 'À propos', href: '/admin/about' },
  ]

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo et navigation principale */}
          <div className="flex">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/admin" className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">IN</span>
                </div>
                <span className="font-bold text-gray-900 dark:text-white hidden sm:block">
                  Admin INSES
                </span>
              </Link>
            </div>

            {/* Navigation desktop */}
            <div className="hidden md:ml-8 md:flex md:space-x-4">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Actions droite */}
          <div className="flex items-center space-x-4">
            {/* Lien vers le site */}
            <Link
              href="/"
              target="_blank"
              className="hidden sm:flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
            >
              <Home className="h-4 w-4 mr-2" />
              Voir le site
            </Link>

            {/* Menu utilisateur desktop */}
            <div className="hidden md:block relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user.email?.[0].toUpperCase()}
                  </span>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {user.email}
                    </p>
                  </div>
                  <div className="p-1">
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Déconnexion
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Bouton menu mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {item.name}
                </Link>
              )
            })}
            <Link
              href="/"
              target="_blank"
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Home className="h-4 w-4 mr-2" />
              Voir le site
            </Link>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 px-2 py-3">
            <div className="px-3 py-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {user.email}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Déconnexion
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
