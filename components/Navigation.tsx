'use client';

import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';

export default function Navigation() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-zinc-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold hover:text-zinc-300 transition-colors">
              📚 BookHub
            </Link>
          </div>
          <div className="flex items-center space-x-8">
            <Link 
              href="/" 
              className="hover:text-zinc-300 transition-colors font-medium"
            >
              Home
            </Link>
            {user && (
              <>
                <Link 
                  href="/books" 
                  className="hover:text-zinc-300 transition-colors font-medium"
                >
                  Books
                </Link>
                <Link 
                  href="/authors" 
                  className="hover:text-zinc-300 transition-colors font-medium"
                >
                  Authors
                </Link>
                <Link 
                  href="/publishers" 
                  className="hover:text-zinc-300 transition-colors font-medium"
                >
                  Publishers
                </Link>
              </>
            )}
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-zinc-300">{user.email}</span>
                <button
                  onClick={logout}
                  className="bg-zinc-700 hover:bg-zinc-600 px-4 py-2 rounded transition-colors font-medium text-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                href="/login" 
                className="bg-white text-zinc-900 px-4 py-2 rounded hover:bg-zinc-100 transition-colors font-medium"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
