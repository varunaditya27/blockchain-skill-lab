'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Menu, X, BookOpen, FileText, ChevronDown, Terminal } from 'lucide-react'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showExploreDropdown, setShowExploreDropdown] = useState(false)
  const [showResourcesDropdown, setShowResourcesDropdown] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-200 ${
        isScrolled 
          ? 'bg-black/90 backdrop-blur-md border-neutral-900' 
          : 'bg-transparent border-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: "circOut" }}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-8 h-8 bg-blue-600 flex items-center justify-center rounded-sm text-black">
              <Terminal size={18} strokeWidth={3} />
            </div>
            <span className="text-lg font-bold tracking-tight text-white group-hover:text-neutral-300 transition-colors">
              SKILLLAB
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          
          {/* Explore Dropdown */}
          <div 
            className="relative" 
            onMouseEnter={() => setShowExploreDropdown(true)}
            onMouseLeave={() => setShowExploreDropdown(false)}
          >
            <button
              className={`flex items-center gap-2 text-sm font-medium transition-colors py-2 ${
                showExploreDropdown ? 'text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <BookOpen size={16} />
              <span className="uppercase tracking-wide text-xs">Curriculum</span>
              <ChevronDown size={12} className={`transition-transform duration-200 ${showExploreDropdown ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {showExploreDropdown && (
                <motion.div
                  className="absolute top-full right-0 w-80 bg-[#0A0A0A] border border-neutral-800 shadow-2xl pt-2 pb-1 z-50"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.15 }}
                >
                  <div className="px-4 py-3 border-b border-neutral-800 bg-neutral-900/50">
                    <h3 className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                      Program Sequence
                    </h3>
                  </div>
                  
                  <div className="p-1">
                    {[
                      { day: 1, sessions: 3, available: 3, path: '/d1-session-1' },
                      { day: 2, sessions: 3, available: 3, path: '/d2-session-1' },
                      { day: 3, sessions: 3, available: 0, path: '/' },
                      { day: 4, sessions: 3, available: 1, path: '/d4-session-1' },
                      { day: 5, sessions: 3, available: 0, path: '/' }
                    ].map((item) => (
                      <Link key={item.day} href={item.path}>
                        <div className="group flex justify-between items-center p-3 hover:bg-neutral-900 transition-colors border-l-2 border-transparent hover:border-blue-600">
                          <span className="text-sm font-medium text-neutral-300 group-hover:text-white transition-colors">
                            Day 0{item.day}
                          </span>
                          <span className={`text-[10px] font-mono uppercase px-1.5 py-0.5 rounded-sm ${
                            item.available > 0 
                              ? 'bg-blue-900/20 text-blue-400 border border-blue-900/30' 
                              : 'bg-neutral-800 text-neutral-500'
                          }`}>
                            {item.available > 0 ? 'Active' : 'Locked'}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Resources Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setShowResourcesDropdown(true)}
            onMouseLeave={() => setShowResourcesDropdown(false)}
          >
            <button
              className={`flex items-center gap-2 text-sm font-medium transition-colors py-2 ${
                showResourcesDropdown ? 'text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <FileText size={16} />
              <span className="uppercase tracking-wide text-xs">Resources</span>
              <ChevronDown size={12} className={`transition-transform duration-200 ${showResourcesDropdown ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {showResourcesDropdown && (
                <motion.div
                  className="absolute top-full right-0 mt-0 w-64 bg-[#0A0A0A] border border-neutral-800 shadow-2xl p-6 text-center z-50"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.15 }}
                >
                  <div className="w-10 h-10 bg-neutral-900 rounded-sm flex items-center justify-center mx-auto mb-3 border border-neutral-800">
                    <Terminal size={20} className="text-neutral-500" />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1">Coming Soon</h3>
                  <p className="text-xs text-neutral-500 font-mono">
                    Library access restricted.
                    <br />
                    Check back later.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* <button className="bg-white text-black text-xs font-bold uppercase tracking-wider px-5 py-2.5 hover:bg-neutral-200 transition-colors rounded-sm">
            Sign In
          </button> */}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2 hover:bg-neutral-900 rounded-sm transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden fixed inset-0 top-20 bg-black z-40 border-t border-neutral-900"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col p-6 gap-8">
              {/* Mobile Explore */}
              <div>
                <div className="flex items-center gap-2 text-blue-500 mb-4">
                  <BookOpen size={16} />
                  <span className="text-xs font-mono uppercase tracking-widest">Curriculum</span>
                </div>
                <div className="space-y-1 pl-4 border-l border-neutral-800">
                  {[
                    { day: 1, available: true, path: '/d1-session-1' },
                    { day: 2, available: true, path: '/d2-session-1' },
                    { day: 3, available: false, path: '/' },
                    { day: 4, available: true, path: '/d4-session-1' },
                    { day: 5, available: false, path: '/' }
                  ].map((item) => (
                    <Link key={item.day} href={item.path} onClick={() => setIsMobileMenuOpen(false)}>
                      <div className="py-3 flex justify-between items-center text-neutral-300 hover:text-white border-b border-neutral-900">
                        <span className="text-lg font-bold">Day 0{item.day}</span>
                        <span className="text-[10px] font-mono text-neutral-600">
                          {item.available ? 'AVAILABLE' : 'LOCKED'}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Mobile Resources */}
              <div>
                <div className="flex items-center gap-2 text-neutral-500 mb-2">
                  <FileText size={16} />
                  <span className="text-xs font-mono uppercase tracking-widest">Resources</span>
                </div>
                <div className="pl-6 pt-2">
                  <span className="text-sm text-neutral-600 font-mono">
                    // Access restricted
                  </span>
                </div>
              </div>

              <div className="pt-8 mt-auto">
                 <button className="w-full bg-white text-black text-sm font-bold uppercase tracking-wider py-4 hover:bg-neutral-200 transition-colors rounded-sm">
                  Sign In
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}