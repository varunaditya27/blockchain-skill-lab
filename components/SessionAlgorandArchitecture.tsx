'use client'

import { motion } from 'framer-motion'
import {
    Layers,
    Cpu,
    Database,
    ArrowRight,
    CheckCircle2,
    Zap,
    Shield,
    Globe,
    FileCode,
    Coins,
    Box,
    Clock,
    Settings,
    Activity,
    Lock,
    Wallet,
    ArrowLeftRight,
    AlertTriangle,
    Binary,
    BookOpen,
    Lightbulb,
    Users,
    Ban,
    RefreshCw,
    Tag
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

// Terminal Block Component
const TerminalBlock = ({ title, code, language = 'bash' }: { title: string, code: string, language?: string }) => (
    <div className="rounded-sm overflow-hidden border border-neutral-800 bg-[#080808] font-mono text-sm my-6 shadow-2xl">
        <div className="flex items-center justify-between px-3 py-2 bg-neutral-900 border-b border-neutral-800">
            <span className="text-[10px] text-neutral-500 uppercase tracking-widest">{title}</span>
            <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50" />
            </div>
        </div>
        <div className="p-4 overflow-x-auto">
            <pre className={`text-neutral-300 language-${language}`}>
                <code>{code}</code>
            </pre>
        </div>
    </div>
)

// Transaction Type Card
const TransactionTypeCard = ({ type, icon: Icon, desc, color }: { type: string, icon: any, desc: string, color: string }) => (
    <div className={`p-4 bg-[#0A0A0A] border border-neutral-800 hover:border-${color}-800/50 transition-colors rounded-sm group`}>
        <div className="flex items-center gap-3 mb-3">
            <div className={`p-2 bg-${color}-900/20 border border-${color}-800/50 rounded-sm`}>
                <Icon size={16} className={`text-${color}-400`} />
            </div>
            <h4 className="font-bold text-white text-sm">{type}</h4>
        </div>
        <p className="text-xs text-neutral-500 leading-relaxed">{desc}</p>
    </div>
)

// Network Stats Visual
const NetworkStatsVisual = () => {
    const stats = [
        { label: 'Block Time', value: '~3.3s', icon: Clock },
        { label: 'Finality', value: 'Instant', icon: Zap },
        { label: 'TPS', value: '10,000+', icon: Activity },
        { label: 'Min Stake', value: '0 ALGO', icon: Coins },
    ]

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
                <div key={i} className="p-4 bg-[#050505] border border-teal-900/30 rounded-sm text-center">
                    <stat.icon size={20} className="text-teal-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">{stat.label}</div>
                </div>
            ))}
        </div>
    )
}

// Account Model Visual
const AccountModelVisual = () => {
    const [selectedAccount, setSelectedAccount] = useState<'standard' | 'asset' | 'app'>('standard')

    const accountTypes = {
        standard: {
            title: 'Standard Account',
            desc: 'Basic account that holds ALGO and can opt-in to assets/apps',
            fields: [
                { name: 'Address', type: '32 bytes' },
                { name: 'Balance', type: 'uint64 (microAlgos)' },
                { name: 'Status', type: 'Online/Offline' },
                { name: 'Assets', type: 'map[assetId]holding' },
            ]
        },
        asset: {
            title: 'Algorand Standard Assets (ASA)',
            desc: 'Native token standard for fungible and non-fungible assets',
            fields: [
                { name: 'Asset ID', type: 'uint64' },
                { name: 'Total Supply', type: 'uint64' },
                { name: 'Decimals', type: 'uint32' },
                { name: 'Manager/Freeze/Clawback', type: 'Address[]' },
            ]
        },
        app: {
            title: 'Application Account',
            desc: 'Smart contract with global and local state storage',
            fields: [
                { name: 'App ID', type: 'uint64' },
                { name: 'Approval Program', type: 'TEAL bytecode' },
                { name: 'Global State', type: 'key-value (64 slots)' },
                { name: 'Local State', type: 'per-user key-value' },
            ]
        }
    }

    const current = accountTypes[selectedAccount]

    return (
        <div className="bg-[#050505] border border-neutral-800 rounded-sm p-6">
            <div className="flex gap-2 mb-6">
                {(['standard', 'asset', 'app'] as const).map((type) => (
                    <button
                        key={type}
                        onClick={() => setSelectedAccount(type)}
                        className={`px-4 py-2 text-xs font-mono uppercase tracking-wide rounded-sm transition-colors
                            ${selectedAccount === type 
                                ? 'bg-teal-500 text-black font-bold' 
                                : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'}`}
                    >
                        {type}
                    </button>
                ))}
            </div>

            <h4 className="text-lg font-bold text-white mb-2">{current.title}</h4>
            <p className="text-sm text-neutral-400 mb-6">{current.desc}</p>

            <div className="space-y-2">
                {current.fields.map((field, i) => (
                    <div key={i} className="flex justify-between p-3 bg-neutral-900/50 border border-neutral-800 rounded-sm">
                        <span className="text-sm text-neutral-300">{field.name}</span>
                        <span className="text-xs font-mono text-teal-400">{field.type}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

// Layer Stack Visual
const LayerStackVisual = () => {
    const layers = [
        { name: 'Applications', desc: 'Smart Contracts, DeFi, NFTs', color: 'teal', icon: FileCode },
        { name: 'Protocol', desc: 'ASA, Atomic Transfers, State Proofs', color: 'cyan', icon: Settings },
        { name: 'Consensus', desc: 'Pure Proof of Stake, VRF, BA*', color: 'blue', icon: Shield },
        { name: 'Network', desc: 'Relay Nodes, Participation Nodes', color: 'purple', icon: Globe },
    ]

    return (
        <div className="space-y-3">
            {layers.map((layer, i) => (
                <motion.div
                    key={i}
                    className={`p-4 bg-${layer.color}-900/10 border border-${layer.color}-800/30 rounded-sm flex items-center gap-4 hover:border-${layer.color}-500/50 transition-colors cursor-default`}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                >
                    <div className={`p-2 bg-${layer.color}-900/30 rounded-sm`}>
                        <layer.icon size={18} className={`text-${layer.color}-400`} />
                    </div>
                    <div className="flex-1">
                        <h4 className="font-bold text-white text-sm">{layer.name}</h4>
                        <p className="text-xs text-neutral-500">{layer.desc}</p>
                    </div>
                    <span className="text-[10px] font-mono text-neutral-600 uppercase">Layer {layers.length - i}</span>
                </motion.div>
            ))}
        </div>
    )
}

export default function SessionAlgorandArchitecture() {
    const [showASADetails, setShowASADetails] = useState(false)

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
                            Session 05.2
                        </div>
                        <div className="h-px bg-neutral-800 flex-1"></div>
                        <span className="text-neutral-500 text-xs font-mono uppercase tracking-widest">
                            Protocol Layer
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
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">ARCHITECTURE.</span>
                        </h1>
                    </div>

                    <p className="text-xl text-neutral-400 max-w-2xl leading-relaxed font-light border-l border-neutral-800 pl-6">
                        Understanding the <strong className="text-white">two-tier node architecture</strong>, native asset standards, atomic transfers, and the state-proof mechanism that makes Algorand quantum-resistant.
                    </p>
                </motion.div>

                {/* Network Stats */}
                <motion.section className="mb-24" {...fadeInUp} viewport={{ once: true }}>
                    <NetworkStatsVisual />
                </motion.section>

                {/* NEW Section: How Algorand Thinks */}
                <motion.section className="mb-24" {...fadeInUp} viewport={{ once: true }}>
                    <div className="flex items-baseline gap-4 mb-8 border-b border-neutral-800 pb-4">
                        <span className="text-4xl font-mono font-bold text-neutral-800">00</span>
                        <h2 className="text-2xl font-bold tracking-tight">How Algorand Thinks</h2>
                    </div>

                    <div className="bg-gradient-to-r from-teal-900/20 to-cyan-900/20 border border-teal-800/30 rounded-sm p-8 mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Lightbulb size={24} className="text-teal-400" />
                            <h3 className="text-xl font-bold text-white">Transaction-First Paradigm</h3>
                        </div>
                        <p className="text-lg text-neutral-300 leading-relaxed mb-4">
                            In Algorand, <strong className="text-teal-300">transactions are first-class citizens</strong>. 
                            Smart contracts don't <em>do</em> things — they <em>approve</em> or <em>reject</em> transactions.
                        </p>
                        <div className="p-4 bg-black/30 border border-teal-900/50 rounded-sm">
                            <p className="text-teal-200 font-mono text-sm">
                                → "Algorand smart contracts don't <span className="text-red-400 line-through">execute business logic</span>. 
                                They <span className="text-white font-bold">validate transaction permissions</span>."
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                title: 'Predictable Execution',
                                desc: 'No arbitrary loops. Bounded computation. You know exactly what a transaction costs before submitting.',
                                icon: Clock,
                                color: 'teal'
                            },
                            {
                                title: 'Explicit Approval',
                                desc: 'Every asset, app interaction requires explicit opt-in. Users control what touches their accounts.',
                                icon: CheckCircle2,
                                color: 'cyan'
                            },
                            {
                                title: 'Self-Describing Messages',
                                desc: 'Transactions contain all info needed for validation. State is queried, not computed on-chain.',
                                icon: BookOpen,
                                color: 'blue'
                            }
                        ].map((item, i) => (
                            <div key={i} className="p-6 bg-[#0A0A0A] border border-neutral-800 rounded-sm">
                                <item.icon size={24} className={`text-${item.color}-500 mb-4`} />
                                <h4 className="font-bold text-white mb-2">{item.title}</h4>
                                <p className="text-sm text-neutral-500">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </motion.section>

                {/* Section 1: Protocol Stack */}
                <motion.section className="mb-24" {...fadeInUp} viewport={{ once: true }}>
                    <div className="flex items-baseline gap-4 mb-8 border-b border-neutral-800 pb-4">
                        <span className="text-4xl font-mono font-bold text-neutral-800">01</span>
                        <h2 className="text-2xl font-bold tracking-tight">Protocol Stack</h2>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12">
                        <div>
                            <p className="text-neutral-400 leading-relaxed mb-6">
                                Algorand's architecture is built in layers, each providing specific functionality while maintaining the core principles of <strong className="text-white">decentralization, security, and scalability</strong>.
                            </p>

                            <div className="p-4 bg-teal-900/10 border border-teal-800/50 rounded-sm mb-6">
                                <h4 className="text-sm font-bold text-teal-400 mb-2">The Blockchain Trilemma</h4>
                                <p className="text-sm text-neutral-400">
                                    Most blockchains sacrifice one of: Decentralization, Security, or Scalability. Algorand's architecture addresses all three through its unique consensus and protocol design.
                                </p>
                            </div>
                        </div>

                        <LayerStackVisual />
                    </div>
                </motion.section>

                {/* Section 2: Node Architecture */}
                <motion.section className="mb-24" {...fadeInUp} viewport={{ once: true }}>
                    <div className="flex items-baseline gap-4 mb-8 border-b border-neutral-800 pb-4">
                        <span className="text-4xl font-mono font-bold text-neutral-800">02</span>
                        <h2 className="text-2xl font-bold tracking-tight">Two-Tier Node Architecture</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <div className="p-6 bg-[#0A0A0A] border border-cyan-800/30 rounded-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-cyan-900/30 border border-cyan-800/50 rounded-sm">
                                    <Globe size={20} className="text-cyan-400" />
                                </div>
                                <h3 className="text-lg font-bold text-white">Relay Nodes</h3>
                            </div>
                            <p className="text-sm text-neutral-400 mb-4">
                                High-performance nodes that facilitate communication between participation nodes. They don't participate in consensus but ensure network efficiency.
                            </p>
                            <ul className="space-y-2">
                                {['Route blocks and votes', 'Connect participation nodes', 'No stake required', 'Run by community/foundation'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-2 text-xs text-neutral-300">
                                        <div className="w-1 h-1 bg-cyan-500 rounded-full" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="p-6 bg-[#0A0A0A] border border-teal-800/30 rounded-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-teal-900/30 border border-teal-800/50 rounded-sm">
                                    <Cpu size={20} className="text-teal-400" />
                                </div>
                                <h3 className="text-lg font-bold text-white">Participation Nodes</h3>
                            </div>
                            <p className="text-sm text-neutral-400 mb-4">
                                Nodes that actively participate in consensus by proposing and voting on blocks. Anyone can run one with minimal hardware.
                            </p>
                            <ul className="space-y-2">
                                {['Propose blocks', 'Vote in consensus', 'Require participation keys', 'Stake determines selection probability'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-2 text-xs text-neutral-300">
                                        <div className="w-1 h-1 bg-teal-500 rounded-full" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <TerminalBlock
                        title="algod_config.json"
                        language="json"
                        code={`{
  "Version": 28,
  "EndpointAddress": "127.0.0.1:8080",
  "EnableDeveloperAPI": true,
  "Archival": false,
  "IsIndexerActive": false,
  "NodeExporter": "prometheus"
}`}
                    />
                </motion.section>

                {/* Section 3: Account Model */}
                <motion.section className="mb-24" {...fadeInUp} viewport={{ once: true }}>
                    <div className="flex items-baseline gap-4 mb-8 border-b border-neutral-800 pb-4">
                        <span className="text-4xl font-mono font-bold text-neutral-800">03</span>
                        <h2 className="text-2xl font-bold tracking-tight">The Algorand Account Model</h2>
                    </div>

                    <p className="text-neutral-400 leading-relaxed mb-8 max-w-3xl">
                        Algorand accounts are <strong className="text-white">multi-purpose containers</strong> that can hold native currency, 
                        fungible/non-fungible assets, and application-specific state — all in a unified model.
                    </p>

                    {/* Visual Account Model - inspired by PPT */}
                    <div className="bg-[#050505] border border-neutral-800 rounded-sm p-8 mb-8">
                        <h4 className="text-xs font-mono text-teal-500 uppercase tracking-widest mb-6 text-center">
                            Account Structure
                        </h4>
                        
                        <div className="max-w-md mx-auto">
                            {/* Account Address Header */}
                            <div className="bg-teal-900/20 border border-teal-800/50 rounded-t-sm p-4 text-center">
                                <div className="text-[10px] font-mono text-teal-400 uppercase tracking-widest mb-2">Account Address</div>
                                <div className="font-mono text-sm text-white">ALGO...XYZ</div>
                            </div>
                            
                            {/* Account Components */}
                            <div className="border-x border-neutral-800">
                                <div className="flex border-b border-neutral-800">
                                    <div className="flex-1 p-4 bg-[#0A0A0A] border-r border-neutral-800">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Coins size={14} className="text-teal-400" />
                                            <span className="text-xs font-bold text-white">ALGO Balance</span>
                                        </div>
                                        <div className="text-[10px] text-neutral-500">Native currency</div>
                                        <div className="text-lg font-mono text-teal-300 mt-1">100.00</div>
                                    </div>
                                    <div className="flex-1 p-4 bg-[#0A0A0A]">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Tag size={14} className="text-cyan-400" />
                                            <span className="text-xs font-bold text-white">ASA Holdings</span>
                                        </div>
                                        <div className="text-[10px] text-neutral-500">Opted-in assets</div>
                                        <div className="text-lg font-mono text-cyan-300 mt-1">5 assets</div>
                                    </div>
                                </div>
                                <div className="p-4 bg-[#0A0A0A]">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Database size={14} className="text-purple-400" />
                                        <span className="text-xs font-bold text-white">App Local State</span>
                                    </div>
                                    <div className="text-[10px] text-neutral-500">Per-app key-value storage</div>
                                    <div className="grid grid-cols-3 gap-2 mt-2">
                                        {['App #1', 'App #2', 'App #3'].map((app, i) => (
                                            <div key={i} className="text-[10px] font-mono text-purple-300 bg-purple-900/20 px-2 py-1 rounded text-center">
                                                {app}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            
                            {/* Min Balance Footer */}
                            <div className="bg-yellow-900/10 border border-yellow-800/30 rounded-b-sm p-3 text-center">
                                <div className="flex items-center justify-center gap-2">
                                    <AlertTriangle size={12} className="text-yellow-500" />
                                    <span className="text-[10px] text-yellow-400">Min Balance: 0.1 ALGO + 0.1 per opt-in</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12">
                        <div>
                            <div className="space-y-4 mb-6">
                                <h4 className="text-sm font-bold font-mono text-teal-500 uppercase tracking-widest">Key Concepts</h4>
                                
                                <div className="p-4 bg-neutral-900/30 border-l-2 border-teal-500">
                                    <h5 className="font-bold text-white text-sm mb-1">Minimum Balance Requirement</h5>
                                    <p className="text-xs text-neutral-400">
                                        Every account must maintain 0.1 ALGO base + 0.1 ALGO per asset/app opt-in to prevent state bloat.
                                    </p>
                                </div>

                                <div className="p-4 bg-neutral-900/30 border-l-2 border-cyan-500">
                                    <h5 className="font-bold text-white text-sm mb-1">Opt-In Model</h5>
                                    <p className="text-xs text-neutral-400">
                                        Users must explicitly opt-in to receive assets or interact with apps, preventing spam and ensuring consent.
                                    </p>
                                </div>

                                <div className="p-4 bg-neutral-900/30 border-l-2 border-purple-500">
                                    <h5 className="font-bold text-white text-sm mb-1">Simpler than Ethereum</h5>
                                    <p className="text-xs text-neutral-400">
                                        Unlike Ethereum's "everything is a contract" approach, Algorand accounts are native balance + state holders.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <AccountModelVisual />
                    </div>
                </motion.section>

                {/* Section 4: Transaction Types */}
                <motion.section className="mb-24" {...fadeInUp} viewport={{ once: true }}>
                    <div className="flex items-baseline gap-4 mb-8 border-b border-neutral-800 pb-4">
                        <span className="text-4xl font-mono font-bold text-neutral-800">04</span>
                        <h2 className="text-2xl font-bold tracking-tight">Transaction Types</h2>
                    </div>

                    <p className="text-neutral-400 leading-relaxed mb-8 max-w-3xl">
                        Algorand supports <strong className="text-white">six native transaction types</strong>, each optimized for specific operations. This native support eliminates the need for smart contracts for common operations.
                    </p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="p-4 bg-[#0A0A0A] border border-neutral-800 hover:border-teal-800/50 transition-colors rounded-sm">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-teal-900/20 border border-teal-800/50 rounded-sm">
                                    <Coins size={16} className="text-teal-400" />
                                </div>
                                <h4 className="font-bold text-white text-sm">Payment</h4>
                            </div>
                            <p className="text-xs text-neutral-500 leading-relaxed">Transfer ALGO between accounts</p>
                        </div>

                        <div className="p-4 bg-[#0A0A0A] border border-neutral-800 hover:border-cyan-800/50 transition-colors rounded-sm">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-cyan-900/20 border border-cyan-800/50 rounded-sm">
                                    <Box size={16} className="text-cyan-400" />
                                </div>
                                <h4 className="font-bold text-white text-sm">Asset Config</h4>
                            </div>
                            <p className="text-xs text-neutral-500 leading-relaxed">Create, modify, or destroy ASAs</p>
                        </div>

                        <div className="p-4 bg-[#0A0A0A] border border-neutral-800 hover:border-blue-800/50 transition-colors rounded-sm">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-blue-900/20 border border-blue-800/50 rounded-sm">
                                    <ArrowRight size={16} className="text-blue-400" />
                                </div>
                                <h4 className="font-bold text-white text-sm">Asset Transfer</h4>
                            </div>
                            <p className="text-xs text-neutral-500 leading-relaxed">Transfer ASAs between accounts</p>
                        </div>

                        <div className="p-4 bg-[#0A0A0A] border border-neutral-800 hover:border-purple-800/50 transition-colors rounded-sm">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-purple-900/20 border border-purple-800/50 rounded-sm">
                                    <Lock size={16} className="text-purple-400" />
                                </div>
                                <h4 className="font-bold text-white text-sm">Asset Freeze</h4>
                            </div>
                            <p className="text-xs text-neutral-500 leading-relaxed">Freeze/unfreeze asset holdings</p>
                        </div>

                        <div className="p-4 bg-[#0A0A0A] border border-neutral-800 hover:border-green-800/50 transition-colors rounded-sm">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-green-900/20 border border-green-800/50 rounded-sm">
                                    <FileCode size={16} className="text-green-400" />
                                </div>
                                <h4 className="font-bold text-white text-sm">Application Call</h4>
                            </div>
                            <p className="text-xs text-neutral-500 leading-relaxed">Interact with smart contracts</p>
                        </div>

                        <div className="p-4 bg-[#0A0A0A] border border-neutral-800 hover:border-yellow-800/50 transition-colors rounded-sm">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-yellow-900/20 border border-yellow-800/50 rounded-sm">
                                    <Shield size={16} className="text-yellow-400" />
                                </div>
                                <h4 className="font-bold text-white text-sm">Key Registration</h4>
                            </div>
                            <p className="text-xs text-neutral-500 leading-relaxed">Register participation keys for consensus</p>
                        </div>
                    </div>
                </motion.section>

                {/* NEW Section: ASA Roles - from PPT */}
                <motion.section className="mb-24" {...fadeInUp} viewport={{ once: true }}>
                    <div className="flex items-baseline gap-4 mb-8 border-b border-neutral-800 pb-4">
                        <span className="text-4xl font-mono font-bold text-neutral-800">05</span>
                        <h2 className="text-2xl font-bold tracking-tight">ASA Roles & Compliance</h2>
                    </div>

                    <p className="text-neutral-400 leading-relaxed mb-8 max-w-3xl">
                        Algorand Standard Assets (ASAs) include <strong className="text-white">built-in role-based controls</strong> that make them ideal for regulated environments, institutional finance, and enterprise use cases.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        {[
                            {
                                role: 'Manager',
                                desc: 'Can update asset configuration (except immutable fields). Can change other role addresses.',
                                icon: Users,
                                color: 'teal',
                                permission: 'Modify asset parameters'
                            },
                            {
                                role: 'Reserve',
                                desc: 'Holds un-minted supply. Used for token economics and supply management.',
                                icon: Wallet,
                                color: 'cyan',
                                permission: 'Control supply distribution'
                            },
                            {
                                role: 'Freeze Manager',
                                desc: 'Can freeze/unfreeze asset holdings in any account. Used for compliance and emergency stops.',
                                icon: Ban,
                                color: 'blue',
                                permission: 'Freeze asset holdings'
                            },
                            {
                                role: 'Clawback',
                                desc: 'Can revoke assets from any account. Required for regulatory compliance scenarios.',
                                icon: RefreshCw,
                                color: 'purple',
                                permission: 'Force transfer assets'
                            }
                        ].map((item, i) => (
                            <div key={i} className={`p-6 bg-[#0A0A0A] border border-${item.color}-800/30 rounded-sm`}>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className={`p-2 bg-${item.color}-900/30 border border-${item.color}-800/50 rounded-sm`}>
                                        <item.icon size={20} className={`text-${item.color}-400`} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white">{item.role}</h3>
                                        <span className={`text-[10px] font-mono text-${item.color}-400 uppercase`}>{item.permission}</span>
                                    </div>
                                </div>
                                <p className="text-sm text-neutral-400">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="bg-gradient-to-r from-green-900/10 to-teal-900/10 border border-green-800/30 p-6 rounded-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <CheckCircle2 size={20} className="text-green-400" />
                            <h4 className="font-bold text-white">Why This Matters for Enterprise</h4>
                        </div>
                        <p className="text-sm text-neutral-400 leading-relaxed">
                            ASAs are <strong className="text-white">protocol-defined objects, not smart contracts</strong>. This gives uniform behavior, 
                            lower bug surface, and built-in compliance controls. It's why Algorand attracts <strong className="text-green-300">enterprises, 
                            institutions, and regulated environments</strong>.
                        </p>
                    </div>
                </motion.section>

                {/* Section 6: Atomic Transfers */}
                <motion.section className="mb-24" {...fadeInUp} viewport={{ once: true }}>
                    <div className="flex items-baseline gap-4 mb-8 border-b border-neutral-800 pb-4">
                        <span className="text-4xl font-mono font-bold text-neutral-800">06</span>
                        <h2 className="text-2xl font-bold tracking-tight">Atomic Transfers</h2>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12">
                        <div>
                            <p className="text-neutral-400 leading-relaxed mb-6">
                                Algorand supports <strong className="text-white">native atomic transfers</strong> — groups of up to 16 transactions that either all succeed or all fail. No smart contract required.
                            </p>

                            <div className="bg-teal-900/10 border border-teal-800/50 p-6 rounded-sm mb-6">
                                <h4 className="font-bold text-white mb-3">Use Cases</h4>
                                <ul className="space-y-2">
                                    {[
                                        'Trustless trading (Asset A for Asset B)',
                                        'Batch payments (payroll, dividends)',
                                        'Complex DeFi operations',
                                        'NFT sales with royalties'
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-neutral-300">
                                            <CheckCircle2 size={14} className="text-teal-500 mt-0.5 flex-shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <TerminalBlock
                            title="atomic_swap.py"
                            language="python"
                            code={`from algosdk import transaction

# Create transaction group
txn1 = transaction.PaymentTxn(
    sender=alice,
    receiver=bob,
    amt=1000000,  # 1 ALGO
    sp=params
)

txn2 = transaction.AssetTransferTxn(
    sender=bob,
    receiver=alice,
    amt=100,
    index=asset_id,
    sp=params
)

# Group transactions (atomic)
gid = transaction.calculate_group_id([txn1, txn2])
txn1.group = gid
txn2.group = gid

# Both must be signed & submitted together
# Either BOTH succeed or BOTH fail`}
                        />
                    </div>
                </motion.section>

                {/* Section 7: State Proofs & Quantum Resistance */}
                <motion.section className="mb-24" {...fadeInUp} viewport={{ once: true }}>
                    <div className="flex items-baseline gap-4 mb-8 border-b border-neutral-800 pb-4">
                        <span className="text-4xl font-mono font-bold text-neutral-800">07</span>
                        <h2 className="text-2xl font-bold tracking-tight">State Proofs & Quantum Readiness</h2>
                    </div>

                    <div className="bg-[#0A0A0A] border border-neutral-800 p-8 rounded-sm">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="p-3 bg-purple-900/20 border border-purple-800 rounded-sm">
                                <Shield size={24} className="text-purple-400" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">Post-Quantum Security</h3>
                                <p className="text-neutral-400 max-w-2xl leading-relaxed">
                                    Algorand is proactive in safeguarding against quantum computing threats through <strong className="text-white">State Proofs</strong> — post-quantum secure compact certificates using FALCON signatures.
                                </p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                {
                                    title: 'State Proofs',
                                    desc: 'Compact certificates attesting to state changes every 256 rounds',
                                    icon: FileCode
                                },
                                {
                                    title: 'FALCON Signatures',
                                    desc: 'Post-quantum secure digital signatures based on lattices',
                                    icon: Lock
                                },
                                {
                                    title: 'Future VRF Upgrade',
                                    desc: 'Ability to swap VRF for post-quantum version when needed',
                                    icon: Settings
                                }
                            ].map((item, i) => (
                                <div key={i} className="p-4 border border-neutral-800 bg-neutral-900/20 rounded-sm">
                                    <item.icon size={20} className="text-purple-400 mb-3" />
                                    <h4 className="font-bold text-white text-sm mb-1">{item.title}</h4>
                                    <p className="text-xs text-neutral-500">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.section>

                {/* NEW Section: Smart Contract Types Preview */}
                <motion.section className="mb-24" {...fadeInUp} viewport={{ once: true }}>
                    <div className="flex items-baseline gap-4 mb-8 border-b border-neutral-800 pb-4">
                        <span className="text-4xl font-mono font-bold text-neutral-800">08</span>
                        <h2 className="text-2xl font-bold tracking-tight">Two Types of Smart Contracts</h2>
                    </div>

                    <p className="text-neutral-400 leading-relaxed mb-8 max-w-3xl">
                        Algorand supports two distinct types of smart contracts, each with different capabilities and use cases. 
                        <strong className="text-white"> Session 3 will deep-dive into building stateful apps with PyTeal.</strong>
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Stateless */}
                        <div className="bg-[#0A0A0A] border border-neutral-800 rounded-sm overflow-hidden">
                            <div className="p-4 bg-neutral-900 border-b border-neutral-800">
                                <div className="flex items-center gap-3">
                                    <FileCode size={20} className="text-neutral-400" />
                                    <div>
                                        <h3 className="font-bold text-white">Stateless (LogicSig)</h3>
                                        <span className="text-[10px] font-mono text-neutral-500 uppercase">Contract Accounts</span>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6">
                                <p className="text-sm text-neutral-400 mb-4">
                                    Pure validation logic. <strong className="text-white">No storage</strong>. Signs transactions if conditions are met.
                                </p>
                                <div className="space-y-2 mb-4">
                                    {['Escrow accounts', 'Delegated signatures', 'Payment authorizations'].map((item, i) => (
                                        <div key={i} className="flex items-center gap-2 text-xs text-neutral-300">
                                            <div className="w-1 h-1 bg-neutral-500 rounded-full" />
                                            {item}
                                        </div>
                                    ))}
                                </div>
                                <div className="p-3 bg-neutral-900/50 border border-neutral-800 rounded-sm">
                                    <span className="text-[10px] font-mono text-neutral-500">Think: "Should this transaction be allowed?"</span>
                                </div>
                            </div>
                        </div>

                        {/* Stateful */}
                        <div className="bg-teal-900/10 border border-teal-800/50 rounded-sm overflow-hidden">
                            <div className="p-4 bg-teal-900/20 border-b border-teal-800/30">
                                <div className="flex items-center gap-3">
                                    <Database size={20} className="text-teal-400" />
                                    <div>
                                        <h3 className="font-bold text-white">Stateful (Applications)</h3>
                                        <span className="text-[10px] font-mono text-teal-400 uppercase">Smart Contracts</span>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6">
                                <p className="text-sm text-neutral-400 mb-4">
                                    Can <strong className="text-teal-300">store and modify on-chain state</strong>. Has global and local storage.
                                </p>
                                <div className="space-y-2 mb-4">
                                    {['DeFi protocols', 'DAOs & governance', 'Games & NFT logic'].map((item, i) => (
                                        <div key={i} className="flex items-center gap-2 text-xs text-teal-300">
                                            <div className="w-1 h-1 bg-teal-500 rounded-full" />
                                            {item}
                                        </div>
                                    ))}
                                </div>
                                <div className="p-3 bg-teal-900/20 border border-teal-800/30 rounded-sm">
                                    <span className="text-[10px] font-mono text-teal-400">Think: "Update counter, transfer ownership, execute logic"</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* Key Takeaways */}
                <motion.section className="mb-16 border-t border-neutral-800 pt-16" {...fadeInUp} viewport={{ once: true }}>
                    <h2 className="text-lg font-bold font-mono uppercase tracking-widest text-neutral-500 mb-8 text-center">
                        Architecture Summary
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[
                            'Transactions are first-class citizens, not computation',
                            'Two-tier node architecture for efficiency',
                            'Native ASA support with built-in compliance roles',
                            'Account model with opt-in for security',
                            'Atomic transfers for trustless multi-party operations',
                            'Quantum-resistant through State Proofs'
                        ].map((item, i) => (
                            <div key={i} className="flex items-start gap-3 p-4 bg-[#0A0A0A] border border-neutral-800 rounded-sm">
                                <CheckCircle2 className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-neutral-300">{item}</p>
                            </div>
                        ))}
                    </div>
                </motion.section>

                {/* Navigation */}
                <motion.div className="flex justify-center gap-4" {...fadeInUp} viewport={{ once: true }}>
                    <Link href="/d5-session-1">
                        <button className="px-6 py-4 text-neutral-500 text-sm font-bold uppercase tracking-wide hover:text-white transition-colors">
                            Back: Consensus
                        </button>
                    </Link>
                    <Link href="/d5-session-3">
                        <button className="group relative px-8 py-4 bg-white text-black font-bold text-sm uppercase tracking-wider hover:bg-neutral-200 transition-colors flex items-center gap-3 rounded-sm">
                            <span>Next: PyTeal Development</span>
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </button>
                    </Link>
                </motion.div>

            </div>
        </div>
    )
}
