'use client'

import { motion } from 'framer-motion'
import {
    FileCode,
    Terminal,
    Database,
    ArrowRight,
    CheckCircle2,
    Play,
    Box,
    Settings,
    Layers,
    Code2,
    GitBranch,
    Zap,
    AlertTriangle,
    BookOpen,
    Cpu,
    Hash,
    Binary,
    LayoutList,
    Workflow,
    ArrowDown,
    KeyRound,
    Upload,
    Eye
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
}

// Terminal Window Component
const TerminalWindow = ({ code, title = 'contract.py', language = 'python' }: { code: string, title?: string, language?: string }) => (
    <div className="mt-6 mb-8 rounded-sm overflow-hidden border border-neutral-800 bg-[#050505] shadow-2xl">
        <div className="flex items-center justify-between px-4 py-2 bg-neutral-900 border-b border-neutral-800">
            <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50" />
            </div>
            <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">{title}</span>
        </div>
        <div className="text-sm font-mono">
            <SyntaxHighlighter
                language={language}
                style={vscDarkPlus}
                customStyle={{
                    margin: 0,
                    padding: '1.5rem',
                    background: '#050505',
                    fontSize: '0.8rem',
                    lineHeight: '1.6'
                }}
                wrapLongLines={true}
            >
                {code}
            </SyntaxHighlighter>
        </div>
    </div>
)

// Execution Flow Visual
const ExecutionFlowVisual = () => {
    const [activeStep, setActiveStep] = useState(0)

    const steps = [
        { name: 'PyTeal Code', desc: 'Python DSL for contract logic', icon: Code2 },
        { name: 'Compile', desc: 'PyTeal → TEAL bytecode', icon: Settings },
        { name: 'Deploy', desc: 'Submit to Algorand network', icon: Zap },
        { name: 'Execute', desc: 'AVM processes transaction', icon: Play },
    ]

    return (
        <div className="bg-[#050505] border border-neutral-800 rounded-sm p-6">
            <div className="text-[10px] font-mono text-teal-500 uppercase tracking-widest mb-6">
                Smart Contract Lifecycle
            </div>

            <div className="flex justify-between items-center mb-6 relative">
                {/* Connection Line */}
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-neutral-800 -translate-y-1/2" />
                <div
                    className="absolute top-1/2 left-0 h-0.5 bg-teal-500 -translate-y-1/2 transition-all duration-500"
                    style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
                />

                {steps.map((step, i) => (
                    <button
                        key={i}
                        onClick={() => setActiveStep(i)}
                        className={`relative z-10 flex flex-col items-center gap-2 transition-all duration-300 ${i <= activeStep ? 'opacity-100' : 'opacity-40'}`}
                    >
                        <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300
                            ${i <= activeStep ? 'bg-teal-500/20 border-teal-500' : 'bg-neutral-900 border-neutral-700'}`}>
                            <step.icon size={18} className={i <= activeStep ? 'text-teal-400' : 'text-neutral-500'} />
                        </div>
                        <span className={`text-[10px] font-mono uppercase tracking-wide text-center ${i <= activeStep ? 'text-teal-400' : 'text-neutral-600'}`}>
                            {step.name}
                        </span>
                    </button>
                ))}
            </div>

            <div className="text-center p-4 bg-neutral-900/30 border border-neutral-800 rounded-sm">
                <p className="text-sm text-neutral-400">{steps[activeStep].desc}</p>
            </div>
        </div>
    )
}

// Contract State Visual
const ContractStateVisual = () => {
    return (
        <div className="bg-[#050505] border border-neutral-800 rounded-sm p-6">
            <div className="text-[10px] font-mono text-teal-500 uppercase tracking-widest mb-4">
                State Storage Model
            </div>

            <div className="space-y-4">
                <div className="p-4 border border-cyan-800/30 bg-cyan-900/10 rounded-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <Database size={16} className="text-cyan-400" />
                        <h4 className="font-bold text-white text-sm">Global State</h4>
                    </div>
                    <p className="text-xs text-neutral-400 mb-3">Shared across all users — 64 key-value slots</p>
                    <div className="bg-black/30 p-2 rounded font-mono text-xs text-cyan-300">
                        {"{ 'counter': 42, 'admin': 'ALGO...' }"}
                    </div>
                </div>

                <div className="p-4 border border-purple-800/30 bg-purple-900/10 rounded-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <Layers size={16} className="text-purple-400" />
                        <h4 className="font-bold text-white text-sm">Local State</h4>
                    </div>
                    <p className="text-xs text-neutral-400 mb-3">Per-user storage — 16 key-value slots per user</p>
                    <div className="bg-black/30 p-2 rounded font-mono text-xs text-purple-300">
                        {"User A: { 'balance': 100 }"}
                        <br />
                        {"User B: { 'balance': 250 }"}
                    </div>
                </div>
            </div>
        </div>
    )
}

// Application Call Types
const ApplicationCallCard = ({ type, onComplete, desc, code }: { type: string, onComplete: string, desc: string, code: string }) => (
    <div className="p-4 bg-[#0A0A0A] border border-neutral-800 rounded-sm hover:border-teal-800/50 transition-colors">
        <div className="flex items-center justify-between mb-2">
            <h4 className="font-bold text-white text-sm">{type}</h4>
            <span className="text-[10px] font-mono text-teal-400">{code}</span>
        </div>
        <p className="text-xs text-neutral-500 mb-2">{desc}</p>
        <div className="text-[10px] text-neutral-600 font-mono">OnComplete: {onComplete}</div>
    </div>
)

export default function SessionAlgorandPyTeal() {
    const [activeTab, setActiveTab] = useState<'approval' | 'clear'>('approval')

    const approvalCode = `from pyteal import *

def approval_program():
    # Global state key
    counter_key = Bytes("counter")
    
    # Handle application creation
    on_create = Seq([
        App.globalPut(counter_key, Int(0)),
        Approve()
    ])
    
    # Handle NoOp calls (increment)
    on_increment = Seq([
        App.globalPut(
            counter_key,
            App.globalGet(counter_key) + Int(1)
        ),
        Approve()
    ])
    
    # Main router
    program = Cond(
        [Txn.application_id() == Int(0), on_create],
        [Txn.on_completion() == OnComplete.NoOp, on_increment],
        [Txn.on_completion() == OnComplete.OptIn, Approve()],
        [Txn.on_completion() == OnComplete.CloseOut, Approve()],
        [Txn.on_completion() == OnComplete.DeleteApplication, 
         Return(Txn.sender() == Global.creator_address())],
    )
    
    return program

# Compile to TEAL
if __name__ == "__main__":
    print(compileTeal(
        approval_program(), 
        mode=Mode.Application, 
        version=8
    ))`

    const clearCode = `from pyteal import *

def clear_program():
    """
    Clear program executes when a user 
    clears their local state.
    
    Must always approve to allow 
    users to opt-out safely.
    """
    return Approve()

# Compile to TEAL
if __name__ == "__main__":
    print(compileTeal(
        clear_program(), 
        mode=Mode.Application, 
        version=8
    ))`

    const deployCode = `from algosdk import account, mnemonic
from algosdk.v2client import algod
from algosdk.transaction import ApplicationCreateTxn, StateSchema
import base64

# Connect to Algorand node
algod_client = algod.AlgodClient(
    algod_token="",
    algod_address="https://testnet-api.algonode.cloud"
)

# Load compiled TEAL
with open("approval.teal", "r") as f:
    approval_source = f.read()
with open("clear.teal", "r") as f:
    clear_source = f.read()

# Compile TEAL to bytecode
approval_program = base64.b64decode(
    algod_client.compile(approval_source)["result"]
)
clear_program = base64.b64decode(
    algod_client.compile(clear_source)["result"]
)

# Define state schema
global_schema = StateSchema(num_uints=1, num_byte_slices=0)
local_schema = StateSchema(num_uints=0, num_byte_slices=0)

# Create application transaction
params = algod_client.suggested_params()
txn = ApplicationCreateTxn(
    sender=creator_address,
    sp=params,
    on_complete=OnComplete.NoOpOC,
    approval_program=approval_program,
    clear_program=clear_program,
    global_schema=global_schema,
    local_schema=local_schema,
)

# Sign and submit
signed_txn = txn.sign(creator_private_key)
txid = algod_client.send_transaction(signed_txn)
print(f"Application ID: {wait_for_confirmation(txid)}")`

    const interactCode = `from algosdk.transaction import ApplicationNoOpTxn

# Call the counter contract (increment)
params = algod_client.suggested_params()
txn = ApplicationNoOpTxn(
    sender=user_address,
    sp=params,
    index=app_id,  # Application ID from deployment
)

# Sign and submit
signed_txn = txn.sign(user_private_key)
txid = algod_client.send_transaction(signed_txn)
result = wait_for_confirmation(txid)

# Read global state
app_info = algod_client.application_info(app_id)
state = app_info["params"]["global-state"]
for item in state:
    key = base64.b64decode(item["key"]).decode()
    value = item["value"]["uint"]
    print(f"{key}: {value}")  # counter: 1`

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
                            Session 05.3
                        </div>
                        <div className="h-px bg-neutral-800 flex-1"></div>
                        <span className="text-neutral-500 text-xs font-mono uppercase tracking-widest">
                            Smart Contracts
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
                            PYTEAL
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">CONTRACTS.</span>
                        </h1>
                    </div>

                    <p className="text-xl text-neutral-400 max-w-2xl leading-relaxed font-light border-l border-neutral-800 pl-6">
                        Design and deploy <strong className="text-white">stateful smart contracts</strong> on Algorand using PyTeal — a Python DSL that compiles to TEAL bytecode executed by the Algorand Virtual Machine.
                    </p>
                </motion.div>

                {/* Section 1: Execution Environment */}
                <motion.section className="mb-24" {...fadeInUp} viewport={{ once: true }}>
                    <div className="flex items-baseline gap-4 mb-8 border-b border-neutral-800 pb-4">
                        <span className="text-4xl font-mono font-bold text-neutral-800">01</span>
                        <h2 className="text-2xl font-bold tracking-tight">Execution Environment</h2>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12">
                        <div>
                            <p className="text-neutral-400 leading-relaxed mb-6">
                                Algorand smart contracts run on <strong className="text-white">algod</strong> (Algorand daemon), which executes transactions, validates blocks, and maintains blockchain state.
                            </p>

                            <div className="space-y-4 mb-6">
                                <div className="p-4 bg-neutral-900/30 border-l-2 border-teal-500">
                                    <h4 className="font-bold text-white text-sm mb-1">TEAL</h4>
                                    <p className="text-xs text-neutral-400">
                                        Transaction Execution Approval Language — a low-level, stack-based bytecode language.
                                    </p>
                                </div>

                                <div className="p-4 bg-neutral-900/30 border-l-2 border-cyan-500">
                                    <h4 className="font-bold text-white text-sm mb-1">PyTeal</h4>
                                    <p className="text-xs text-neutral-400">
                                        A Python library that provides a high-level abstraction for writing TEAL programs safely.
                                    </p>
                                </div>

                                <div className="p-4 bg-yellow-900/10 border border-yellow-800/30 rounded-sm">
                                    <div className="flex items-center gap-2 mb-2">
                                        <AlertTriangle size={14} className="text-yellow-500" />
                                        <span className="text-xs font-bold text-yellow-500 uppercase">Important</span>
                                    </div>
                                    <p className="text-xs text-neutral-400">
                                        PyTeal is <strong className="text-white">NOT executed on the blockchain</strong>. It compiles to TEAL, and only the generated TEAL runs on-chain.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <ExecutionFlowVisual />
                    </div>

                    {/* TEAL Stack-Based Execution Visual */}
                    <div className="mt-12 bg-[#050505] border border-neutral-800 rounded-sm p-8">
                        <h4 className="text-sm font-bold font-mono text-teal-500 uppercase tracking-widest mb-6">
                            TEAL Stack-Based Execution
                        </h4>
                        
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Stack Visual */}
                            <div>
                                <p className="text-neutral-400 text-sm mb-4">
                                    TEAL is a <strong className="text-white">stack-based language</strong>. Operations push/pop values from the stack. 
                                    All operations are deterministic and bounded.
                                </p>
                                
                                <div className="bg-neutral-900/50 border border-neutral-800 rounded-sm p-4">
                                    <div className="text-[10px] font-mono text-neutral-500 mb-3">// Example: Add 5 + 3</div>
                                    
                                    <div className="flex gap-6">
                                        {/* TEAL Code */}
                                        <div className="flex-1">
                                            <div className="text-[10px] font-mono text-cyan-400 mb-2">TEAL Instructions:</div>
                                            <div className="space-y-1 font-mono text-xs">
                                                <div className="text-teal-400">int 5</div>
                                                <div className="text-teal-400">int 3</div>
                                                <div className="text-teal-400">+</div>
                                            </div>
                                        </div>
                                        
                                        {/* Stack State */}
                                        <div className="flex-1">
                                            <div className="text-[10px] font-mono text-purple-400 mb-2">Stack State:</div>
                                            <div className="space-y-1">
                                                <div className="bg-purple-900/30 border border-purple-800/50 px-3 py-1 text-xs font-mono text-purple-300 rounded">
                                                    [5]
                                                </div>
                                                <div className="bg-purple-900/30 border border-purple-800/50 px-3 py-1 text-xs font-mono text-purple-300 rounded">
                                                    [5, 3]
                                                </div>
                                                <div className="bg-green-900/30 border border-green-800/50 px-3 py-1 text-xs font-mono text-green-300 rounded">
                                                    [8] ✓
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Key Characteristics */}
                            <div className="space-y-3">
                                <div className="p-3 border border-neutral-800 bg-neutral-900/30 rounded-sm">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Binary size={14} className="text-teal-400" />
                                        <span className="text-xs font-bold text-white uppercase">Deterministic</span>
                                    </div>
                                    <p className="text-xs text-neutral-500">Same input always produces same output. No randomness on-chain.</p>
                                </div>
                                <div className="p-3 border border-neutral-800 bg-neutral-900/30 rounded-sm">
                                    <div className="flex items-center gap-2 mb-1">
                                        <LayoutList size={14} className="text-cyan-400" />
                                        <span className="text-xs font-bold text-white uppercase">No Loops</span>
                                    </div>
                                    <p className="text-xs text-neutral-500">Bounded execution. No infinite loops. Cost is predictable.</p>
                                </div>
                                <div className="p-3 border border-neutral-800 bg-neutral-900/30 rounded-sm">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Workflow size={14} className="text-purple-400" />
                                        <span className="text-xs font-bold text-white uppercase">Approval Model</span>
                                    </div>
                                    <p className="text-xs text-neutral-500">Contract returns 0 (reject) or non-zero (approve). Binary outcome.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* Section 2: Contract Types */}
                <motion.section className="mb-24" {...fadeInUp} viewport={{ once: true }}>
                    <div className="flex items-baseline gap-4 mb-8 border-b border-neutral-800 pb-4">
                        <span className="text-4xl font-mono font-bold text-neutral-800">02</span>
                        <h2 className="text-2xl font-bold tracking-tight">Contract Types</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <div className="p-6 bg-[#0A0A0A] border border-neutral-800 rounded-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-neutral-900 border border-neutral-700 rounded-sm">
                                    <FileCode size={20} className="text-neutral-400" />
                                </div>
                                <h3 className="text-lg font-bold text-white">Stateless (LogicSig)</h3>
                            </div>
                            <p className="text-sm text-neutral-400 mb-4">
                                Purely validation logic. Signs transactions if conditions are met. Cannot store data.
                            </p>
                            <div className="text-xs text-neutral-500 font-mono">
                                Use case: Escrow, Delegated signatures
                            </div>
                        </div>

                        <div className="p-6 bg-teal-900/10 border border-teal-800/50 rounded-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-teal-900/30 border border-teal-700 rounded-sm">
                                    <Database size={20} className="text-teal-400" />
                                </div>
                                <h3 className="text-lg font-bold text-white">Stateful (Applications)</h3>
                            </div>
                            <p className="text-sm text-neutral-400 mb-4">
                                Can store and modify on-chain state. Has global and local storage. <strong className="text-teal-300">Our focus.</strong>
                            </p>
                            <div className="text-xs text-teal-400 font-mono">
                                Use case: DeFi, DAOs, Games, NFT logic
                            </div>
                        </div>
                    </div>

                    <ContractStateVisual />
                </motion.section>

                {/* Section 3: Contract Programs */}
                <motion.section className="mb-24" {...fadeInUp} viewport={{ once: true }}>
                    <div className="flex items-baseline gap-4 mb-8 border-b border-neutral-800 pb-4">
                        <span className="text-4xl font-mono font-bold text-neutral-800">03</span>
                        <h2 className="text-2xl font-bold tracking-tight">Approval & Clear Programs</h2>
                    </div>

                    <p className="text-neutral-400 leading-relaxed mb-8 max-w-3xl">
                        Every stateful smart contract requires two programs: an <strong className="text-white">Approval Program</strong> that handles all logic, and a <strong className="text-white">Clear Program</strong> that executes when users opt-out.
                    </p>

                    {/* Tab Selector */}
                    <div className="flex gap-2 mb-6">
                        <button
                            onClick={() => setActiveTab('approval')}
                            className={`px-4 py-2 text-sm font-mono uppercase tracking-wide rounded-sm transition-colors
                                ${activeTab === 'approval'
                                    ? 'bg-teal-500 text-black font-bold'
                                    : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'}`}
                        >
                            Approval Program
                        </button>
                        <button
                            onClick={() => setActiveTab('clear')}
                            className={`px-4 py-2 text-sm font-mono uppercase tracking-wide rounded-sm transition-colors
                                ${activeTab === 'clear'
                                    ? 'bg-teal-500 text-black font-bold'
                                    : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'}`}
                        >
                            Clear Program
                        </button>
                    </div>

                    {activeTab === 'approval' ? (
                        <div>
                            <div className="bg-[#0A0A0A] border border-neutral-800 p-4 rounded-sm mb-4">
                                <p className="text-sm text-neutral-400">
                                    The <strong className="text-teal-400">Approval Program</strong> determines whether a transaction should be accepted or rejected. It contains the main business logic.
                                </p>
                            </div>
                            <TerminalWindow code={approvalCode} title="counter.py" />
                        </div>
                    ) : (
                        <div>
                            <div className="bg-[#0A0A0A] border border-neutral-800 p-4 rounded-sm mb-4">
                                <p className="text-sm text-neutral-400">
                                    The <strong className="text-teal-400">Clear Program</strong> executes when a user clears their local state. It must always approve to allow safe opt-out.
                                </p>
                            </div>
                            <TerminalWindow code={clearCode} title="clear.py" />
                        </div>
                    )}
                </motion.section>

                {/* Section 4: Application Call Types */}
                <motion.section className="mb-24" {...fadeInUp} viewport={{ once: true }}>
                    <div className="flex items-baseline gap-4 mb-8 border-b border-neutral-800 pb-4">
                        <span className="text-4xl font-mono font-bold text-neutral-800">04</span>
                        <h2 className="text-2xl font-bold tracking-tight">Application Call Types</h2>
                    </div>

                    <p className="text-neutral-400 leading-relaxed mb-8 max-w-3xl">
                        Algorand applications respond to different <strong className="text-white">OnComplete</strong> actions, each triggering specific logic paths in your contract.
                    </p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <ApplicationCallCard
                            type="Create"
                            code="app_id == 0"
                            onComplete="NoOp"
                            desc="Deploy a new application. Runs once during initial creation."
                        />
                        <ApplicationCallCard
                            type="NoOp"
                            code="NoOp"
                            onComplete="NoOp"
                            desc="Standard function call. Used for most contract interactions."
                        />
                        <ApplicationCallCard
                            type="OptIn"
                            code="OptIn"
                            onComplete="OptIn"
                            desc="User opts into the app. Allocates local state storage."
                        />
                        <ApplicationCallCard
                            type="CloseOut"
                            code="CloseOut"
                            onComplete="CloseOut"
                            desc="User opts out gracefully. Clears local state."
                        />
                        <ApplicationCallCard
                            type="ClearState"
                            code="ClearState"
                            onComplete="ClearState"
                            desc="Force opt-out via Clear Program. Always succeeds."
                        />
                        <ApplicationCallCard
                            type="Delete"
                            code="DeleteApplication"
                            onComplete="Delete"
                            desc="Remove the application. Usually restricted to creator."
                        />
                    </div>
                </motion.section>

                {/* Section 5: Deployment */}
                <motion.section className="mb-24" {...fadeInUp} viewport={{ once: true }}>
                    <div className="flex items-baseline gap-4 mb-8 border-b border-neutral-800 pb-4">
                        <span className="text-4xl font-mono font-bold text-neutral-800">05</span>
                        <h2 className="text-2xl font-bold tracking-tight">Deployment</h2>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 mb-8">
                        <div>
                            <p className="text-neutral-400 leading-relaxed mb-6">
                                Deploy your contract using the Algorand SDK. This involves compiling TEAL, defining state schemas, and submitting a creation transaction.
                            </p>

                            <div className="space-y-3">
                                {[
                                    'Compile PyTeal to TEAL bytecode',
                                    'Define global/local state schemas',
                                    'Create ApplicationCreateTxn',
                                    'Sign with creator\'s private key',
                                    'Submit to network and get App ID'
                                ].map((step, i) => (
                                    <div key={i} className="flex items-center gap-3 p-3 bg-neutral-900/30 border border-neutral-800 rounded-sm">
                                        <span className="text-xs font-mono text-teal-500 w-6">{String(i + 1).padStart(2, '0')}</span>
                                        <span className="text-sm text-neutral-300">{step}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-[#050505] border border-neutral-800 rounded-sm p-6">
                            <h4 className="text-sm font-bold font-mono text-teal-500 uppercase tracking-widest mb-4">
                                Algorand Sandbox
                            </h4>
                            <p className="text-sm text-neutral-400 mb-4">
                                For development, use Algorand Sandbox — Docker containers running a local Algorand node with KMD wallet service.
                            </p>
                            <div className="bg-black/50 p-3 rounded font-mono text-xs text-neutral-300">
                                <div className="text-neutral-500 mb-1"># Start sandbox</div>
                                <div>./sandbox up</div>
                                <div className="text-neutral-500 mt-2 mb-1"># Enter algod container</div>
                                <div>./sandbox enter algod</div>
                            </div>
                        </div>
                    </div>

                    <TerminalWindow code={deployCode} title="deploy.py" />
                </motion.section>

                {/* Section 6: Interaction */}
                <motion.section className="mb-24" {...fadeInUp} viewport={{ once: true }}>
                    <div className="flex items-baseline gap-4 mb-8 border-b border-neutral-800 pb-4">
                        <span className="text-4xl font-mono font-bold text-neutral-800">06</span>
                        <h2 className="text-2xl font-bold tracking-tight">Contract Interaction</h2>
                    </div>

                    <p className="text-neutral-400 leading-relaxed mb-8 max-w-3xl">
                        Once deployed, interact with your contract using <strong className="text-white">ApplicationNoOpTxn</strong> for function calls, and read state directly from the application info.
                    </p>

                    <TerminalWindow code={interactCode} title="interact.py" />
                </motion.section>

                {/* Deployment Checklist */}
                <motion.section className="mb-16 border-t border-neutral-800 pt-16" {...fadeInUp} viewport={{ once: true }}>
                    <div className="bg-[#0A0A0A] border border-neutral-800 rounded-sm p-8">
                        <div className="flex items-center gap-3 mb-8">
                            <Play className="text-teal-500 fill-teal-500" size={16} />
                            <h2 className="text-lg font-bold font-mono uppercase tracking-widest text-white">
                                Deployment Checklist
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {[
                                'Define state schemas before deployment (cannot be changed)',
                                'Ensure Clear Program always approves for safe opt-out',
                                'Handle all OnComplete types in Approval Program',
                                'Test on Algorand Sandbox or TestNet before MainNet',
                                'Verify minimum balance requirements for users',
                                'Consider upgradeability patterns if logic may change'
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                                    <p className="text-sm text-neutral-300 font-mono leading-snug">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.section>

                {/* Compilation Workflow Visual */}
                <motion.section className="mb-16" {...fadeInUp} viewport={{ once: true }}>
                    <div className="bg-[#050505] border border-neutral-800 rounded-sm p-8">
                        <h4 className="text-sm font-bold font-mono text-teal-500 uppercase tracking-widest mb-6 text-center">
                            Complete Development Workflow
                        </h4>
                        
                        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                            {[
                                { name: 'counter.py', desc: 'PyTeal Logic', icon: Code2, color: 'cyan' },
                                { name: 'compile.py', desc: 'Generate TEAL', icon: Settings, color: 'teal' },
                                { name: 'approval.teal', desc: 'Bytecode', icon: Binary, color: 'purple' },
                                { name: 'goal deploy', desc: 'On-Chain', icon: Upload, color: 'green' },
                                { name: 'App #123', desc: 'Live Contract', icon: Eye, color: 'teal' },
                            ].map((step, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className={`p-4 bg-${step.color}-900/20 border border-${step.color}-800/30 rounded-sm text-center min-w-[120px]`}>
                                        <step.icon size={20} className={`text-${step.color}-400 mx-auto mb-2`} />
                                        <div className="text-xs font-mono text-white">{step.name}</div>
                                        <div className="text-[10px] text-neutral-500">{step.desc}</div>
                                    </div>
                                    {i < 4 && (
                                        <ArrowRight size={16} className="text-neutral-600 hidden md:block" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.section>

                {/* Key Observations */}
                <motion.section className="mb-16" {...fadeInUp} viewport={{ once: true }}>
                    <div className="bg-gradient-to-r from-teal-900/10 to-cyan-900/10 border border-teal-800/30 p-8 rounded-sm">
                        <h2 className="text-lg font-bold text-white mb-6">Key Learnings</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            {[
                                { title: 'Only TEAL runs on-chain', desc: 'PyTeal is a development tool that compiles to TEAL bytecode' },
                                { title: 'Transaction-driven execution', desc: 'Smart contracts are only executed when triggered by transactions' },
                                { title: 'Immediate finality', desc: 'State changes are atomic — once confirmed, they\'re permanent' },
                                { title: 'Explicit state typing', desc: 'State is stored efficiently with explicit types (uint, bytes)' },
                                { title: 'Portable logic', desc: 'Same code works on DevNet, TestNet, and MainNet' },
                                { title: 'Bounded computation', desc: 'No infinite loops — all execution has predictable cost' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-3 p-3 bg-black/30 rounded-sm">
                                    <CheckCircle2 className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="text-sm font-bold text-white">{item.title}</h4>
                                        <p className="text-xs text-neutral-500">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.section>

                {/* Resources */}
                <motion.section className="mb-16" {...fadeInUp} viewport={{ once: true }}>
                    <div className="bg-teal-900/10 border border-teal-800/50 p-8 rounded-sm">
                        <h2 className="text-lg font-bold text-white mb-4">Resources</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <a
                                href="https://github.com/tung-programming/Algorand-sandbox"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-4 bg-black/30 border border-teal-900/50 rounded-sm hover:border-teal-500/50 transition-colors group"
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <GitBranch size={16} className="text-teal-400" />
                                    <span className="text-sm font-bold text-white group-hover:text-teal-300 transition-colors">Counter Contract Repo</span>
                                </div>
                                <p className="text-xs text-neutral-500">Complete code examples and setup instructions</p>
                            </a>
                            <a
                                href="https://developer.algorand.org/docs/get-details/dapps/pyteal/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-4 bg-black/30 border border-teal-900/50 rounded-sm hover:border-teal-500/50 transition-colors group"
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <FileCode size={16} className="text-teal-400" />
                                    <span className="text-sm font-bold text-white group-hover:text-teal-300 transition-colors">PyTeal Documentation</span>
                                </div>
                                <p className="text-xs text-neutral-500">Official Algorand developer documentation</p>
                            </a>
                        </div>
                    </div>
                </motion.section>

                {/* Navigation */}
                <motion.div className="flex justify-center gap-4" {...fadeInUp} viewport={{ once: true }}>
                    <Link href="/d5-session-2">
                        <button className="px-6 py-4 text-neutral-500 text-sm font-bold uppercase tracking-wide hover:text-white transition-colors">
                            Back: Architecture
                        </button>
                    </Link>
                    <Link href="/">
                        <button className="group relative px-8 py-4 bg-white text-black font-bold text-sm uppercase tracking-wider hover:bg-neutral-200 transition-colors flex items-center gap-3 rounded-sm">
                            <span>Return to Curriculum</span>
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </button>
                    </Link>
                </motion.div>

            </div>
        </div>
    )
}
