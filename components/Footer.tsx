'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Github, Twitter, Linkedin, Terminal, ArrowUpRight, Code2, Users, Heart } from 'lucide-react'

// --- TEAM CONFIGURATION ---
const DEVELOPERS = [
  { 
    name: 'Taha Sindoli', 
    role: 'Frontend Lead', 
    url: 'https://tahasindoli.vercel.app/', 
    initials: 'TS', 
    color: 'bg-blue-600',
    border: 'group-hover:border-blue-500'
  },
  { 
    name: 'Anirudh', 
    role: 'Fullstack Engineer', 
    url: 'https://github.com/its-ME-007', 
    initials: 'AN', 
    color: 'bg-purple-600',
    border: 'group-hover:border-purple-500'
  },
]

const CONTRIBUTORS = [
  // Add actual contributor names here
  { name: 'Kavin', role: 'Day 1' },
  { name: 'Ishan', role: 'Day 2' },
]

// --- SUB-COMPONENTS ---

const DevCard = ({ dev }: { dev: typeof DEVELOPERS[0] }) => (
  <a 
    href={dev.url} 
    target="_blank" 
    rel="noopener noreferrer" 
    className={`group flex items-center gap-3 p-3 bg-neutral-900/30 border border-neutral-800 rounded-sm transition-all duration-300 hover:bg-neutral-900 ${dev.border}`}
  >
    <div className={`w-8 h-8 ${dev.color} flex items-center justify-center text-[10px] font-bold text-white tracking-widest shadow-lg`}>
      {dev.initials}
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between">
        <h5 className="text-sm font-bold text-neutral-200 group-hover:text-white truncate transition-colors">
          {dev.name}
        </h5>
        <ArrowUpRight className="w-3 h-3 text-neutral-600 group-hover:text-white opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
      </div>
      <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider group-hover:text-neutral-400 transition-colors">
        {dev.role}
      </p>
    </div>
  </a>
)

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-neutral-900 bg-black text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-900/50 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid md:grid-cols-12 gap-12 md:gap-8">
          
          {/* Brand Column (Span 4) */}
          <div className="md:col-span-4 space-y-8">
            <Link href="/">
              <div className="flex items-center gap-2 group cursor-pointer">
                <div className="w-8 h-8 bg-blue-600 flex items-center justify-center rounded-sm text-black shadow-[0_0_15px_rgba(37,99,235,0.3)]">
                  <Terminal size={16} strokeWidth={3} />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold tracking-tight text-white leading-none">
                    SKILLLAB
                  </span>
                  <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest">
                    Protocol Engineering
                  </span>
                </div>
              </div>
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-sm">
              Open-source curriculum designed for the next generation of blockchain architects. 
              Built with rigorous engineering standards and technical depth.
            </p>
            <div className="flex gap-2">
              {[Github, Twitter, Linkedin].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  className="w-9 h-9 flex items-center justify-center border border-neutral-800 bg-neutral-900/50 text-neutral-400 hover:text-white hover:border-neutral-600 hover:bg-neutral-800 transition-all rounded-sm"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Column (Span 2) */}
          <div className="md:col-span-2">
            <h4 className="font-mono text-xs font-bold text-blue-500 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Terminal size={12} /> Modules
            </h4>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Day 01: Genesis', href: '/d1-session-1' },
                { label: 'Day 02: Contracts', href: '/d2-session-1' },
                { label: 'Day 03: EVM Deep Dive', href: '#' },
                { label: 'Day 04: Solana', href: '#' },
              ].map((link, i) => (
                <Link key={i} href={link.href}>
                  <span className="text-neutral-400 hover:text-white transition-colors text-sm font-medium flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-neutral-700 group-hover:bg-blue-500 rounded-full transition-colors"></span>
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Links Column (Span 2) */}
          <div className="md:col-span-2">
            <h4 className="font-mono text-xs font-bold text-purple-500 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Code2 size={12} /> Concepts
            </h4>
            <div className="flex flex-col gap-3 text-sm text-neutral-400">
              <span className="cursor-default hover:text-white transition-colors">Distributed Ledgers</span>
              <span className="cursor-default hover:text-white transition-colors">Cryptographic Hashing</span>
              <span className="cursor-default hover:text-white transition-colors">Consensus Mechanisms</span>
              <span className="cursor-default hover:text-white transition-colors">Zero Knowledge Proofs</span>
            </div>
          </div>

          {/* Team Column (Span 4) */}
          <div className="md:col-span-4">
            <div className="bg-[#050505] border border-neutral-900 p-6 rounded-sm">
              <h4 className="font-mono text-xs font-bold text-neutral-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                <Users size={12} /> Engineering Team
              </h4>
              
              {/* Lead Developers */}
              <div className="space-y-3 mb-6">
                {DEVELOPERS.map((dev, i) => (
                  <DevCard key={i} dev={dev} />
                ))}
              </div>

              {/* Contributors Section */}
              {CONTRIBUTORS.length > 0 && (
                <div className="pt-4 border-t border-neutral-800">
                  <div className="flex items-center gap-2 mb-3 text-neutral-500">
                    <Heart size={10} className="text-red-500 fill-red-500/20" />
                    <span className="text-[10px] font-mono uppercase tracking-widest">Contributors</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {CONTRIBUTORS.map((contributor, i) => (
                      <span 
                        key={i} 
                        className="inline-flex items-center px-2 py-1 bg-neutral-900 border border-neutral-800 rounded-sm text-[10px] text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors cursor-default"
                        title={`Contributed to: ${contributor.role}`}
                      >
                        {contributor.name}
                      </span>
                    ))}
                    <span className="inline-flex items-center px-2 py-1 text-[10px] text-neutral-600 font-mono italic">
                      + Community
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-500 font-mono uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <span>© {currentYear} SKILLLAB. MIT LICENSE.</span>
          </div>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}