'use client'

import { motion } from 'framer-motion'
import {
    Shield,
    Users,
    Shuffle,
    CheckCircle2,
    ArrowRight,
    Zap,
    Lock,
    Eye,
    EyeOff,
    Target,
    Layers,
    GitBranch,
    Clock,
    AlertTriangle,
    Scale,
    Lightbulb,
    Timer,
    Network,
    ChevronRight,
    Vote,
    BadgeCheck,
    Binary,
    Hash,
    Key,
    Dice6
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
}

// VRF Visualization Component
const VRFVisual = () => {
    const [step, setStep] = useState(0)

    const steps = [
        { label: 'Private Key', color: 'teal', icon: Lock },
        { label: 'Block Hash', color: 'teal', icon: GitBranch },
        { label: 'VRF Compute', color: 'teal', icon: Shuffle },
        { label: 'Leadership?', color: 'teal', icon: Target },
    ]

    return (
        <div className="bg-[#050505] border border-neutral-800 rounded-sm p-6">
            <div className="text-[10px] font-mono text-teal-500 uppercase tracking-widest mb-6">
                VRF Self-Selection Process
            </div>

            <div className="flex justify-between items-center mb-8 relative">
                {/* Connection Line */}
                <div className="absolute top-1/2 left-0 right-0 h-px bg-neutral-800 -translate-y-1/2" />
                <div
                    className="absolute top-1/2 left-0 h-px bg-teal-500 -translate-y-1/2 transition-all duration-500"
                    style={{ width: `${(step / (steps.length - 1)) * 100}%` }}
                />

                {steps.map((s, i) => (
                    <button
                        key={i}
                        onClick={() => setStep(i)}
                        className={`relative z-10 flex flex-col items-center gap-2 group transition-all duration-300 ${i <= step ? 'opacity-100' : 'opacity-40'}`}
                    >
                        <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300
                            ${i <= step ? 'bg-teal-500/20 border-teal-500' : 'bg-neutral-900 border-neutral-700'}`}>
                            <s.icon size={16} className={i <= step ? 'text-teal-400' : 'text-neutral-500'} />
                        </div>
                        <span className={`text-[10px] font-mono uppercase tracking-wide ${i <= step ? 'text-teal-400' : 'text-neutral-600'}`}>
                            {s.label}
                        </span>
                    </button>
                ))}
            </div>

            <div className="text-center p-4 bg-neutral-900/30 border border-neutral-800 rounded-sm">
                {step === 0 && (
                    <p className="text-sm text-neutral-400">Node uses its <span className="text-white font-medium">private key</span> — never revealed.</p>
                )}
                {step === 1 && (
                    <p className="text-sm text-neutral-400">Combined with <span className="text-white font-medium">previous block hash</span> — public randomness seed.</p>
                )}
                {step === 2 && (
                    <p className="text-sm text-neutral-400">VRF computation happens <span className="text-white font-medium">locally, silently</span> — no network messages.</p>
                )}
                {step === 3 && (
                    <p className="text-sm text-neutral-400">Only if selected: <span className="text-teal-400 font-medium">speak with cryptographic proof</span>.</p>
                )}
            </div>

            <div className="flex justify-center gap-2 mt-4">
                {steps.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setStep(i)}
                        className={`w-2 h-2 rounded-full transition-colors ${i === step ? 'bg-teal-500' : 'bg-neutral-700'}`}
                    />
                ))}
            </div>
        </div>
    )
}

// Consensus Round Visualization
const ConsensusRoundVisual = () => {
    const [activePhase, setActivePhase] = useState<number | null>(null)

    const phases = [
        {
            name: 'Proposal',
            icon: Target,
            desc: 'Multiple nodes discover they are proposers secretly. They broadcast proposals with VRF proofs.',
            detail: 'Nobody knew who proposers were beforehand.'
        },
        {
            name: 'Soft Vote',
            icon: Users,
            desc: 'A new random committee filters down to one proposal. Committee membership was unknown until now.',
            detail: 'Attackers cannot anticipate committee membership.'
        },
        {
            name: 'Certify Vote',
            icon: CheckCircle2,
            desc: 'Another independent committee certifies the block. Once certified, it is final forever.',
            detail: 'There is no "longest chain" logic in Algorand.'
        }
    ]

    return (
        <div className="space-y-4">
            {phases.map((phase, i) => (
                <motion.button
                    key={i}
                    onClick={() => setActivePhase(activePhase === i ? null : i)}
                    className={`w-full text-left p-4 border rounded-sm transition-all duration-300 group
                        ${activePhase === i
                            ? 'bg-teal-900/20 border-teal-500'
                            : 'bg-[#0A0A0A] border-neutral-800 hover:border-teal-800'}`}
                    whileHover={{ x: 4 }}
                >
                    <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-sm ${activePhase === i ? 'bg-teal-500 text-white' : 'bg-neutral-900 text-neutral-500 group-hover:text-teal-400'}`}>
                            <phase.icon size={20} />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <h4 className={`font-bold uppercase tracking-wide text-sm ${activePhase === i ? 'text-white' : 'text-neutral-300'}`}>
                                    Phase {i + 1}: {phase.name}
                                </h4>
                                <ArrowRight className={`w-4 h-4 transition-transform ${activePhase === i ? 'rotate-90 text-teal-500' : 'text-neutral-700'}`} />
                            </div>
                        </div>
                    </div>

                    {activePhase === i && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            className="mt-4 pt-4 border-t border-neutral-800"
                        >
                            <p className="text-sm text-neutral-400 mb-3">{phase.desc}</p>
                            <div className="p-3 bg-teal-900/10 border border-teal-900/30 rounded-sm">
                                <p className="text-xs text-teal-300 font-mono">→ {phase.detail}</p>
                            </div>
                        </motion.div>
                    )}
                </motion.button>
            ))}
        </div>
    )
}

export default function SessionAlgorandConsensus() {
    const [showProblemDetail, setShowProblemDetail] = useState(false)

    return (
        <div className="relative pt-24 pb-24 bg-black text-white selection:bg-teal-900 selection:text-white font-sans">

            {/* Background Grid */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}>
            </div>

            <div className="relative max-w-5xl mx-auto px-6 z-10">

                {/* Header */}
                <motion.div
                    className="mb-20"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="px-3 py-1 bg-teal-900/20 border border-teal-800 text-teal-400 text-xs font-mono uppercase tracking-widest rounded-sm">
                            Session 05.1
                        </div>
                        <div className="h-px bg-neutral-800 flex-1"></div>
                        <span className="text-neutral-500 text-xs font-mono uppercase tracking-widest">
                            Consensus Layer
                        </span>
                    </div>

                    <div className="flex items-center gap-4 mb-8">
                        <Image
                            src="/logos/algorand.svg"
                            alt="Algorand"
                            width={48}
                            height={48}
                            className="opacity-80"
                        />
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9]">
                            ALGORAND
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">CONSENSUS.</span>
                        </h1>
                    </div>

                    <p className="text-xl text-neutral-400 max-w-2xl leading-relaxed font-light border-l border-neutral-800 pl-6">
                        Algorand didn't tweak Proof-of-Stake. It <strong className="text-white">redesigned validator selection itself</strong> — using cryptographic self-selection to achieve true decentralization with instant finality.
                    </p>
                </motion.div>

                {/* Section 1: The Problem with Modern PoS */}
                <motion.section className="mb-24" {...fadeInUp} viewport={{ once: true }}>
                    <div className="flex items-baseline gap-4 mb-8 border-b border-neutral-800 pb-4">
                        <span className="text-4xl font-mono font-bold text-neutral-800">01</span>
                        <h2 className="text-2xl font-bold tracking-tight">The PoS Problem</h2>
                    </div>

                    <div className="bg-[#0A0A0A] border border-neutral-800 p-8 rounded-sm mb-8">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="p-2 bg-red-900/20 border border-red-800 rounded-sm">
                                <Eye size={20} className="text-red-500" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-2">The Identity Exposure</h3>
                                <p className="text-neutral-400 leading-relaxed">
                                    Most Proof-of-Stake systems solved <strong className="text-white">energy efficiency</strong> but created a new attack surface: <strong className="text-red-400">known validators = predictable targets</strong>.
                                </p>
                            </div>
                        </div>

                        <div className="border-l-2 border-red-600/50 pl-6 py-2 bg-red-900/5">
                            <p className="text-neutral-300 font-medium italic">
                                "PoS removed wasted energy, but it <span className="text-red-400">exposed identities</span>."
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            {
                                title: 'Known Validator Sets',
                                desc: 'Fixed or semi-fixed validator sets with public identities. Leads to targeted DDoS, cartel coordination, and regulatory pressure.',
                                icon: Users,
                                color: 'red'
                            },
                            {
                                title: 'Predictable Leaders',
                                desc: 'When the next block proposer is known in advance, MEV extractors can front-run and attackers can prepare.',
                                icon: Target,
                                color: 'red'
                            },
                            {
                                title: 'Probabilistic Finality',
                                desc: 'Ethereum-style PoS says "wait N blocks to be safe". Not acceptable for finance, payments, or institutions.',
                                icon: Clock,
                                color: 'red'
                            },
                            {
                                title: 'Cartel Coordination',
                                desc: 'Known validators can cooperate to extract value or coordinate attacks. Democracy becomes plutocracy.',
                                icon: GitBranch,
                                color: 'red'
                            }
                        ].map((item, i) => (
                            <div key={i} className="p-6 bg-[#0A0A0A] border border-neutral-800 hover:border-red-800/50 transition-colors rounded-sm">
                                <div className="flex items-start justify-between mb-4">
                                    <h4 className="font-bold text-white">{item.title}</h4>
                                    <item.icon size={18} className="text-red-500/50" />
                                </div>
                                <p className="text-sm text-neutral-500 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </motion.section>

                {/* Section 2: Algorand's Core Idea */}
                <motion.section className="mb-24" {...fadeInUp} viewport={{ once: true }}>
                    <div className="flex items-baseline gap-4 mb-8 border-b border-neutral-800 pb-4">
                        <span className="text-4xl font-mono font-bold text-neutral-800">02</span>
                        <h2 className="text-2xl font-bold tracking-tight">Private Self-Selection</h2>
                    </div>

                    <div className="bg-teal-900/10 border border-teal-800/50 p-8 rounded-sm mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <EyeOff size={24} className="text-teal-400" />
                            <h3 className="text-xl font-bold text-white">Algorand's Philosophical Shift</h3>
                        </div>
                        <p className="text-lg text-neutral-300 leading-relaxed mb-4">
                            Instead of the network choosing validators, <strong className="text-teal-300">validators choose themselves — secretly</strong>.
                        </p>
                        <div className="p-4 bg-black/30 border border-teal-900/50 rounded-sm">
                            <p className="text-teal-200 font-mono text-sm">
                                → "In Algorand, leadership is discovered <span className="text-white font-bold">after</span> it's exercised."
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { title: 'Randomness', desc: 'No predictability in who gets selected', icon: Shuffle },
                            { title: 'Privacy', desc: 'No early exposure of leadership', icon: EyeOff },
                            { title: 'Verifiability', desc: 'Cryptographic proof prevents cheating', icon: Shield }
                        ].map((item, i) => (
                            <div key={i} className="p-6 bg-[#0A0A0A] border border-teal-800/30 rounded-sm text-center group hover:border-teal-500/50 transition-colors">
                                <div className="w-12 h-12 mx-auto mb-4 bg-teal-900/30 border border-teal-800 rounded-full flex items-center justify-center group-hover:bg-teal-500/20 transition-colors">
                                    <item.icon size={20} className="text-teal-400" />
                                </div>
                                <h4 className="font-bold text-white mb-2">{item.title}</h4>
                                <p className="text-sm text-neutral-500">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </motion.section>

                {/* Section 3: VRF Deep Dive */}
                <motion.section className="mb-24" {...fadeInUp} viewport={{ once: true }}>
                    <div className="flex items-baseline gap-4 mb-8 border-b border-neutral-800 pb-4">
                        <span className="text-4xl font-mono font-bold text-neutral-800">03</span>
                        <h2 className="text-2xl font-bold tracking-tight">Verifiable Random Functions</h2>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12">
                        <div>
                            <p className="text-neutral-400 leading-relaxed mb-6">
                                VRFs solve a fundamental problem: how do you prove you won a lottery <strong className="text-white">without revealing you entered until you've won</strong>?
                            </p>

                            <div className="space-y-4 mb-8">
                                <h4 className="text-sm font-bold font-mono text-teal-500 uppercase tracking-widest">How It Works</h4>
                                <ul className="space-y-3">
                                    {[
                                        'Each node uses its private key',
                                        'Combined with the previous block hash',
                                        'Computes a local VRF output',
                                        'No messages. No coordination. No announcement.',
                                        'Only if the node wins does it speak'
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 bg-teal-500 rounded-sm mt-2" />
                                            <span className="text-sm text-neutral-300">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="p-4 bg-neutral-900/30 border-l-2 border-teal-500">
                                <p className="text-sm text-neutral-300">
                                    <strong className="text-white">Stake-weighted probability:</strong> More ALGO → more lottery tickets. But every round is fresh randomness — no permanent validator elites.
                                </p>
                            </div>
                        </div>

                        <VRFVisual />
                    </div>

                    {/* VRF Mathematical Deep Dive */}
                    <div className="mt-12 bg-[#050505] border border-neutral-800 rounded-sm p-8">
                        <h4 className="text-sm font-bold font-mono text-teal-500 uppercase tracking-widest mb-6">
                            VRF Mathematical Intuition
                        </h4>
                        
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <p className="text-neutral-400 text-sm mb-4 leading-relaxed">
                                    A VRF is essentially a <strong className="text-white">keyed hash function</strong> with a twist: you can prove the output was computed honestly without revealing your key.
                                </p>
                                
                                <div className="font-mono text-xs space-y-2 p-4 bg-neutral-900/50 border border-neutral-800 rounded-sm">
                                    <div className="text-neutral-500">// Simplified VRF concept</div>
                                    <div><span className="text-teal-400">output</span> = <span className="text-cyan-400">VRF</span>(private_key, seed)</div>
                                    <div><span className="text-teal-400">proof</span> = cryptographic_proof(output)</div>
                                    <div className="text-neutral-500 mt-2">// Anyone can verify without knowing key</div>
                                    <div><span className="text-cyan-400">verify</span>(public_key, seed, output, proof)</div>
                                </div>
                            </div>
                            
                            <div className="space-y-3">
                                <div className="p-3 border border-neutral-800 bg-neutral-900/30 rounded-sm">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Dice6 size={14} className="text-teal-400" />
                                        <span className="text-xs font-bold text-white uppercase">Randomness</span>
                                    </div>
                                    <p className="text-xs text-neutral-500">Output looks random and unpredictable to anyone without the private key.</p>
                                </div>
                                <div className="p-3 border border-neutral-800 bg-neutral-900/30 rounded-sm">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Key size={14} className="text-cyan-400" />
                                        <span className="text-xs font-bold text-white uppercase">Uniqueness</span>
                                    </div>
                                    <p className="text-xs text-neutral-500">For a given key and input, only ONE valid output exists. Cannot cherry-pick.</p>
                                </div>
                                <div className="p-3 border border-neutral-800 bg-neutral-900/30 rounded-sm">
                                    <div className="flex items-center gap-2 mb-1">
                                        <BadgeCheck size={14} className="text-green-400" />
                                        <span className="text-xs font-bold text-white uppercase">Verifiability</span>
                                    </div>
                                    <p className="text-xs text-neutral-500">Anyone can check the proof using only the public key.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* NEW Section: Stake-Weighted Probability */}
                <motion.section className="mb-24" {...fadeInUp} viewport={{ once: true }}>
                    <div className="flex items-baseline gap-4 mb-8 border-b border-neutral-800 pb-4">
                        <span className="text-4xl font-mono font-bold text-neutral-800">04</span>
                        <h2 className="text-2xl font-bold tracking-tight">Stake-Weighted Selection</h2>
                    </div>

                    <div className="bg-[#0A0A0A] border border-neutral-800 p-8 rounded-sm mb-8">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="p-2 bg-teal-900/20 border border-teal-800 rounded-sm">
                                <Scale size={20} className="text-teal-500" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-2">Stake ≠ Control, Stake = Probability</h3>
                                <p className="text-neutral-400 leading-relaxed">
                                    A common misconception: more stake means you <em>control</em> consensus. In reality, stake represents <strong className="text-teal-300">probability mass</strong> — like having more lottery tickets.
                                </p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4">
                            {[
                                {
                                    title: 'Fresh Randomness',
                                    desc: 'Every round uses new randomness. Past wins don\'t influence future selection.',
                                    icon: Shuffle
                                },
                                {
                                    title: 'No Lock-In',
                                    desc: 'No minimum staking periods or unbonding delays. Liquid participation.',
                                    icon: Lock
                                },
                                {
                                    title: 'Democratic',
                                    desc: 'Even small holders can be selected. No permanent validator elites.',
                                    icon: Users
                                }
                            ].map((item, i) => (
                                <div key={i} className="p-4 bg-neutral-900/30 border border-neutral-800 rounded-sm">
                                    <item.icon size={18} className="text-teal-500 mb-2" />
                                    <h4 className="font-bold text-white text-sm mb-1">{item.title}</h4>
                                    <p className="text-xs text-neutral-500">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Visual: Stake Distribution */}
                    <div className="bg-[#050505] border border-neutral-800 rounded-sm p-6">
                        <h4 className="text-xs font-mono text-teal-500 uppercase tracking-widest mb-4">
                            Selection Probability Distribution
                        </h4>
                        <div className="flex items-end gap-1 h-32 mb-4">
                            {[15, 25, 8, 35, 12, 5].map((height, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                                    <div 
                                        className="w-full bg-gradient-to-t from-teal-600 to-teal-400 rounded-t-sm transition-all hover:from-teal-500 hover:to-teal-300"
                                        style={{ height: `${height * 2.5}%` }}
                                    />
                                    <span className="text-[10px] font-mono text-neutral-500">{height}%</span>
                                </div>
                            ))}
                        </div>
                        <p className="text-xs text-neutral-500 text-center">
                            Stake distribution affects probability, but <span className="text-white">random selection prevents predictability</span>.
                        </p>
                    </div>
                </motion.section>

                {/* Section 5: Consensus Round */}
                <motion.section className="mb-24" {...fadeInUp} viewport={{ once: true }}>
                    <div className="flex items-baseline gap-4 mb-8 border-b border-neutral-800 pb-4">
                        <span className="text-4xl font-mono font-bold text-neutral-800">05</span>
                        <h2 className="text-2xl font-bold tracking-tight">The Consensus Round</h2>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12">
                        <div>
                            <p className="text-neutral-400 leading-relaxed mb-6">
                                A single round of Algorand consensus involves three phases, each with a freshly selected committee that exists only briefly and disappears.
                            </p>

                            <ConsensusRoundVisual />
                        </div>

                        <div className="bg-[#050505] border border-neutral-800 rounded-sm p-8">
                            <div className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest mb-6">
                                Block Finality Timeline
                            </div>

                            <div className="space-y-6">
                                <div className="relative">
                                    <div className="absolute left-4 top-8 bottom-0 w-px bg-teal-900/50" />

                                    {[
                                        { time: '0s', event: 'Block N produced', status: 'active' },
                                        { time: '~2.5s', event: 'Proposal phase complete', status: 'pending' },
                                        { time: '~3.5s', event: 'Soft vote complete', status: 'pending' },
                                        { time: '~4.5s', event: 'Block certified & FINAL', status: 'final' }
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-4 mb-4 relative">
                                            <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center z-10 
                                                ${item.status === 'final' ? 'bg-teal-500 border-teal-400' : 'bg-neutral-900 border-neutral-700'}`}>
                                                {item.status === 'final' ? (
                                                    <CheckCircle2 size={14} className="text-white" />
                                                ) : (
                                                    <div className="w-2 h-2 rounded-full bg-neutral-600" />
                                                )}
                                            </div>
                                            <div>
                                                <div className="text-xs font-mono text-teal-400">{item.time}</div>
                                                <div className={`text-sm ${item.status === 'final' ? 'text-white font-bold' : 'text-neutral-400'}`}>
                                                    {item.event}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="p-4 bg-teal-900/10 border border-teal-800/50 rounded-sm">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Zap size={16} className="text-teal-400" />
                                        <span className="text-sm font-bold text-white">Instant Finality</span>
                                    </div>
                                    <p className="text-xs text-neutral-400">
                                        Once certified, blocks cannot be reverted. No "longest chain" logic. No waiting for confirmations.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* Section 6: Why Forks Don't Happen */}
                <motion.section className="mb-24" {...fadeInUp} viewport={{ once: true }}>
                    <div className="flex items-baseline gap-4 mb-8 border-b border-neutral-800 pb-4">
                        <span className="text-4xl font-mono font-bold text-neutral-800">06</span>
                        <h2 className="text-2xl font-bold tracking-tight">Fork Prevention</h2>
                    </div>

                    <div className="bg-[#0A0A0A] border border-neutral-800 p-8 rounded-sm mb-8">
                        <p className="text-neutral-400 leading-relaxed mb-6">
                            Forks require competing leaders and sustained disagreement. Algorand structurally prevents both.
                        </p>

                        <div className="grid md:grid-cols-3 gap-6 mb-8">
                            {[
                                {
                                    title: 'Ephemeral Committees',
                                    desc: 'Committees are small, random, and change every step. They exist briefly and disappear.',
                                    icon: Users
                                },
                                {
                                    title: 'No Stable Attack Surface',
                                    desc: 'By the time an attacker identifies committee members, they\'re no longer relevant.',
                                    icon: Shield
                                },
                                {
                                    title: 'Byzantine Agreement',
                                    desc: 'Even with malicious actors, honest majority ensures consensus without forks.',
                                    icon: CheckCircle2
                                }
                            ].map((item, i) => (
                                <div key={i} className="p-6 border border-neutral-800 bg-neutral-900/20 rounded-sm">
                                    <item.icon size={24} className="text-teal-500 mb-4" />
                                    <h4 className="font-bold text-white mb-2">{item.title}</h4>
                                    <p className="text-sm text-neutral-500">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Comparison Visual: Ethereum vs Algorand Finality */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-red-900/10 border border-red-800/30 rounded-sm p-6">
                            <h4 className="font-bold text-red-400 mb-4 text-sm uppercase tracking-wide">Traditional PoS (e.g., Ethereum)</h4>
                            <div className="space-y-2 font-mono text-xs">
                                <div className="text-neutral-500">Block N: Published</div>
                                <div className="text-neutral-600">Wait... Wait... Wait...</div>
                                <div className="text-neutral-600">~33 epochs (~12 minutes)</div>
                                <div className="text-neutral-400">Block N+32: ~99.9% Finality</div>
                                <div className="mt-4 p-2 bg-red-900/20 border border-red-800/30 rounded text-red-300">
                                    ⚠️ Probabilistic — reorgs possible
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-teal-900/10 border border-teal-800/30 rounded-sm p-6">
                            <h4 className="font-bold text-teal-400 mb-4 text-sm uppercase tracking-wide">Algorand Pure PoS</h4>
                            <div className="space-y-2 font-mono text-xs">
                                <div className="text-neutral-300">Block N: Published</div>
                                <div className="text-teal-400">~4.5 seconds...</div>
                                <div className="text-white font-bold">Block N: CERTIFIED & FINAL ✓</div>
                                <div className="mt-4 p-2 bg-teal-900/20 border border-teal-800/30 rounded text-teal-300">
                                    ✓ Deterministic — no forks possible
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* Key Quote Section */}
                <motion.section className="mb-16" {...fadeInUp} viewport={{ once: true }}>
                    <div className="bg-gradient-to-r from-teal-900/20 to-cyan-900/20 border border-teal-800/30 rounded-sm p-8 text-center">
                        <div className="text-2xl font-bold text-white mb-4 leading-relaxed">
                            "There is <span className="text-teal-400">no 'longest chain' logic</span> in Algorand."
                        </div>
                        <p className="text-neutral-400 max-w-xl mx-auto text-sm">
                            This single sentence captures the fundamental difference between Algorand and every other blockchain. 
                            Once a block is certified, it's final — forever.
                        </p>
                    </div>
                </motion.section>

                {/* Key Takeaways */}
                <motion.section className="mb-16 border-t border-neutral-800 pt-16" {...fadeInUp} viewport={{ once: true }}>
                    <h2 className="text-lg font-bold font-mono uppercase tracking-widest text-neutral-500 mb-8 text-center">
                        Core Principles
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            'VRFs enable private self-selection of validators',
                            'Leadership is discovered after it\'s exercised',
                            'Stake = probability mass, not guaranteed control',
                            'Blocks are final in ~4.5 seconds with no forks'
                        ].map((item, i) => (
                            <div key={i} className="flex items-start gap-3 p-4 bg-[#0A0A0A] border border-neutral-800 rounded-sm">
                                <CheckCircle2 className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-neutral-300 font-medium">{item}</p>
                            </div>
                        ))}
                    </div>
                </motion.section>

                {/* Engagement Poll */}
                <motion.section className="mb-16" {...fadeInUp} viewport={{ once: true }}>
                    <div className="bg-[#0A0A0A] border border-neutral-800 rounded-sm p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Lightbulb size={20} className="text-yellow-500" />
                            <h3 className="font-bold text-white">Think About It</h3>
                        </div>
                        <p className="text-neutral-400 mb-4 leading-relaxed">
                            <em>"If you had to process a $1M payment, would you accept Ethereum's 15-minute finality or want Algorand's 4.5-second guarantee?"</em>
                        </p>
                        <p className="text-sm text-neutral-500">
                            This is the institutional pain point Algorand solves — real-time settlement for finance, payments, and enterprises that can't afford reorg risk.
                        </p>
                    </div>
                </motion.section>

                {/* Navigation */}
                <motion.div className="flex justify-center gap-4" {...fadeInUp} viewport={{ once: true }}>
                    <Link href="/d4-session-1">
                        <button className="px-6 py-4 text-neutral-500 text-sm font-bold uppercase tracking-wide hover:text-white transition-colors">
                            Back
                        </button>
                    </Link>
                    <Link href="/d5-session-2">
                        <button className="group relative px-8 py-4 bg-white text-black font-bold text-sm uppercase tracking-wider hover:bg-neutral-200 transition-colors flex items-center gap-3 rounded-sm">
                            <span>Next: Algorand Architecture</span>
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </button>
                    </Link>
                </motion.div>

            </div>
        </div>
    )
}
