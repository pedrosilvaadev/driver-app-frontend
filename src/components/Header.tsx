"use client"

import { Car, LogOut } from "lucide-react"
import { useAuth } from "../hooks/useAuth"

export const Header = () => {
  const { logout } = useAuth()

  return (
    <header className="bg-blue-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Car className="h-8 w-8" />
          <h1 className="text-xl font-bold">URIDE Driver</h1>
        </div>
        <button
          onClick={logout}
          className="flex items-center space-x-2 bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-lg transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </button>
      </div>
    </header>
  )
}
