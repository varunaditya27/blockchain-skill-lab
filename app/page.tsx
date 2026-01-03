'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Terminal, Layers, Zap, Globe, Box, Lock } from 'lucide-react'
import dynamic from 'next/dynamic'

// DYNAMIC IMPORT
const Hero3D = dynamic(() => import('@/components/Hero3D'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-black/0" />
})

// --- DATA SOURCE ---
const CURRICULUM_DATA = [
  {
    day: 1,
    title: "Genesis Block",
    sessions: [
      { title: 'Foundations of Distributed Ledgers', topics: ['Distributed Ledgers', 'Blockchain Architecture', 'Cryptographic Hashing', 'Merkle Trees'], link: '/d1-session-1', available: true },
      { title: 'Platforms & Performance', topics: ['Ethereum Overview', 'Solana Architecture', 'Algorand Consensus', 'Performance Comparison'], link: '/d1-session-2', available: true },
      { title: 'Advanced Concepts', topics: ['Smart Contracts', 'Transaction Models', 'Consensus Mechanisms'], link: '#', available: false }
    ],
    icon: <Box className="w-5 h-5" />
  },
  {
    day: 2,
    title: "Smart Contracts",
    sessions: [
      { title: 'Ethereum Architecture', topics: ['Ethereum Network', 'EVM', 'Gas Model and transaction lifecycle', 'Smart contracts and accounts'], link: '/d2-session-1', available: true },
      { title: 'Solidity Programming', topics: ['Contract structure', 'Data types', 'Functions, Mappings, Modifiers and Events'], link: '/d2-session-2', available: true },
      { title: 'Ethereum Smart Contract', topics: ['Write and Deploy Contract', 'Remix IDE & Contract Interaction', 'Student Registry/Asset Transfer'], link: '/d2-session-3', available: true }
    ],
    icon: <Terminal className="w-5 h-5" />
  },
  {
    day: 3,
    title: "High Throughput",
    sessions: [
      { title: 'Fundamentals of Solana', topics: ['Proof of History', 'Sealevel', 'Account Model', 'PDAs'], link: '/d3-session-1', available: true },
      { title: 'UTXO Model', topics: ['Bitcoin Architecture', 'Transaction Structure', 'Script System'], link: '#', available: false },
      { title: 'Layer 2 Solutions', topics: ['Lightning Network', 'Rollups', 'Sidechains'], link: '#', available: false }
    ],
    icon: <Zap className="w-5 h-5" />
  },
  {
    day: 4,
    title: "EVM Deep Dive",
    sessions: [
      { title: 'Ethereum Deep Dive', topics: ['EVM Architecture', 'Gas & Fees', 'Account Model'], link: '/d4-session-1', available: true },
      { title: 'Smart Contract Development', topics: ['Solidity Basics', 'Contract Deployment', 'Testing'], link: '#', available: false },
      { title: 'DApp Development', topics: ['Web3.js', 'Frontend Integration', 'Wallet Connection'], link: '/d4-session-3', available: false }
    ],
    icon: <Layers className="w-5 h-5" />
  },
  {
    day: 5,
    title: "Algorand",
    sessions: [
      { title: 'Algorand Consensus', topics: ['Pure Proof of Stake', 'VRFs', 'Byzantine Agreement', 'Instant Finality'], link: '/d5-session-1', available: true },
      { title: 'Algorand Architecture', topics: ['Node Types', 'Account Model', 'ASAs', 'State Proofs'], link: '/d5-session-2', available: true },
      { title: 'PyTeal Smart Contracts', topics: ['TEAL', 'Stateful Apps', 'Deployment', 'Interaction'], link: '/d5-session-3', available: true }
    ],
    icon: <Globe className="w-5 h-5" />
  },
]

// --- SUB-COMPONENTS ---

const SessionItem = ({ session, index }: { session: any, index: number }) => (
  <Link href={session.link} className={!session.available ? 'pointer-events-none' : ''}>
    <motion.div
      className={`group relative pl-4 border-l transition-all duration-200 py-3 mb-1
        ${session.available
          ? 'border-neutral-800 hover:border-blue-600 hover:bg-neutral-900 cursor-pointer'
          : 'border-neutral-900 opacity-40 cursor-not-allowed'}`}
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: session.available ? 1 : 0.4, x: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <div className="flex justify-between items-center mb-2 pr-4">
        <h4 className={`font-medium text-sm transition-colors ${session.available ? 'text-neutral-200 group-hover:text-white' : 'text-neutral-500'}`}>
          {session.title}
        </h4>
        {session.available && (
          <ArrowRight className="w-4 h-4 text-neutral-600 group-hover:text-blue-500 transition-colors" />
        )}
      </div>

      <div className="flex flex-wrap gap-2 pr-4">
        {session.topics.map((topic: string, t: number) => (
          <span
            key={t}
            className="text-[10px] font-mono uppercase tracking-wide text-neutral-500 bg-neutral-900 px-2 py-1 rounded-sm border border-neutral-800"
          >
            {topic}
          </span>
        ))}
      </div>
    </motion.div>
  </Link>
)

const DayCard = ({ data, index }: { data: any, index: number }) => {
  const isAvailable = data.sessions.some((s: any) => s.available);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="flex flex-col h-full"
    >
      <div className="h-full bg-[#0A0A0A] border border-neutral-800 hover:border-neutral-700 transition-colors duration-300">
        <div className="p-6 border-b border-neutral-800 bg-neutral-900/30 flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className={`p-2.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300`}>
              {data.icon}
            </div>
            <div>
              <div className="text-[10px] font-mono font-bold text-blue-500 uppercase tracking-widest mb-1">
                Day 0{data.day}
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">{data.title}</h3>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-1">
          {data.sessions.map((session: any, i: number) => (
            <SessionItem key={i} session={session} index={i} />
          ))}
        </div>

        <div className="mt-auto px-6 py-4 border-t border-neutral-800 bg-[#050505]">
          {isAvailable ? (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-[11px] font-mono font-semibold text-neutral-300 uppercase tracking-wider">Available Now</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Lock className="w-3 h-3 text-neutral-600" />
              <span className="text-[11px] font-mono font-medium text-neutral-600 uppercase tracking-wider">Locked</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-blue-900 selection:text-white font-sans">

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex flex-col md:flex-row items-center px-4 md:px-6 overflow-hidden border-b border-neutral-900 pt-20 md:pt-0">

        {/* 3D Visual Layer */}
        <Hero3D />

        <div className="relative z-10 max-w-7xl mx-auto w-full pt-4 md:pt-12 pointer-events-none">

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-xl md:max-w-2xl text-center md:text-left mx-auto md:mx-0"
          >
            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-black/50 backdrop-blur-md border border-neutral-800 text-white text-xs font-mono tracking-widest uppercase mb-6 md:mb-8 shadow-lg shadow-blue-900/10 pointer-events-auto">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-sm animate-pulse"></span>
              Cohort 2026 / Beta
            </div>

            {/* Headline - Responsive sizing */}
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tighter text-white mb-6 md:mb-8 leading-[0.95] md:leading-[0.9] drop-shadow-2xl">
              BLOCKCHAIN
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-200 to-white">
                ENGINEERING.
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-neutral-300 mb-8 md:mb-10 max-w-lg leading-relaxed font-light drop-shadow-md mx-auto md:mx-0">
              Master distributed ledgers, smart contracts, and high-performance consensus mechanisms. A rigorous technical path for the modern stack.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center md:items-start justify-center md:justify-start pointer-events-auto pb-12 md:pb-0">
              <Link href="/d1-session-1" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-8 py-4 bg-white text-black text-sm font-bold uppercase tracking-wide hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 rounded-sm shadow-xl shadow-white/5">
                  Start Learning
                  <ArrowRight size={16} />
                </button>
              </Link>
              <Link href="#syllabus" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-8 py-4 bg-black/40 backdrop-blur-sm border border-neutral-700 text-white text-sm font-bold uppercase tracking-wide hover:bg-black/60 transition-colors rounded-sm">
                  View Syllabus
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats/Features Banner */}
      <div className="border-b border-neutral-900 bg-black">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Duration", value: "5 Days" },
            { label: "Difficulty", value: "Intermediate" },
            { label: "Architecture", value: "EVM & Solana" },
            { label: "Project", value: "Full DApp" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col border-l border-neutral-800 pl-6 first:pl-0 first:border-l-0">
              <span className="text-neutral-500 text-[10px] font-mono uppercase tracking-widest mb-2">{stat.label}</span>
              <span className="text-lg font-semibold text-white tracking-tight">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Curriculum Grid */}
      <section id="syllabus" className="relative py-24 px-4 md:px-6 bg-[#050505]">
        <div className="max-w-7xl mx-auto">

          <motion.div
            className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold tracking-tighter text-white mb-2">Technical Roadmap</h2>
              <p className="text-neutral-500 font-mono text-sm">SEQUENCE_ID: 2024-V2</p>
            </div>
            <div className="h-px bg-neutral-800 flex-1 mx-8 hidden md:block opacity-50"></div>
            <p className="text-neutral-400 text-sm max-w-xs text-center md:text-right mx-auto md:mx-0">
              Execute modules in order to ensure dependency resolution.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CURRICULUM_DATA.map((day, idx) => (
              <DayCard key={day.day} data={day} index={idx} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}