'use client'

import { motion } from 'framer-motion'
import { Terminal, Database, Globe, ArrowRight, Server, Wifi, Code2, Cpu, Key, Play } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 }
}

// Reusable "Terminal" for code snippets
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

// Visual Component for Web2 vs Web3 Architecture
const ArchitectureDiagram = () => (
  <div className="grid md:grid-cols-2 gap-8 my-12">
    {/* Web 2 */}
    <div className="p-6 border border-neutral-800 bg-[#050505] opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
      <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-6">Legacy Stack (Web2)</div>
      <div className="flex flex-col items-center gap-4">
        <div className="w-32 p-3 border border-neutral-700 rounded-sm text-center text-sm font-bold bg-neutral-900">Frontend</div>
        <ArrowRight className="rotate-90 text-neutral-600" size={20} />
        <div className="w-32 p-3 border border-neutral-700 rounded-sm text-center text-sm font-bold bg-neutral-900">API Server</div>
        <ArrowRight className="rotate-90 text-neutral-600" size={20} />
        <div className="w-32 p-3 border border-neutral-700 rounded-sm text-center text-sm font-bold bg-neutral-900">Private DB</div>
      </div>
      <p className="mt-8 text-xs text-center text-neutral-500 font-mono">"We own all of it"</p>
    </div>

    {/* Web 3 */}
    <div className="p-6 border border-blue-900/50 bg-[#050505] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-20 h-20 bg-blue-600/10 blur-3xl rounded-full"></div>
      <div className="text-xs font-mono uppercase tracking-widest text-blue-500 mb-6">Decentralized Stack (Web3)</div>
      <div className="flex flex-col items-center gap-4">
        <div className="w-32 p-3 border border-blue-500/30 rounded-sm text-center text-sm font-bold bg-neutral-900 text-white">Frontend</div>
        <div className="h-8 w-px bg-blue-500/50"></div>
        <div className="w-full border border-dashed border-neutral-700 p-4 rounded-sm bg-neutral-900/20 relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#050505] px-2 text-[10px] text-neutral-500 font-mono uppercase">JSON-RPC</div>
          <div className="flex justify-center gap-4 text-neutral-400">
            <Server size={24} />
            <Server size={24} />
            <Server size={24} />
          </div>
          <div className="mt-2 text-center text-xs font-bold text-white">Public Nodes</div>
        </div>
        <div className="h-8 w-px bg-blue-500/50"></div>
        <div className="w-full p-3 border border-blue-500 rounded-sm text-center text-sm font-bold bg-blue-900/10 text-blue-400">
          The Blockchain (Ethereum)
        </div>
      </div>
      <p className="mt-8 text-xs text-center text-blue-400 font-mono">"We own none of it"</p>
    </div>
  </div>
)

export default function Day3Session1() {
  return (
    <div className="relative pt-24 pb-24 bg-black text-white selection:bg-blue-900 selection:text-white font-sans min-h-screen">
      
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
            <div className="px-3 py-1 bg-purple-900/20 border border-purple-800 text-purple-400 text-xs font-mono uppercase tracking-widest rounded-sm">
              Session 03.1
            </div>
            <div className="h-px bg-neutral-800 flex-1"></div>
            <span className="text-neutral-500 text-xs font-mono uppercase tracking-widest">
              Frontend Architecture
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-[0.9]">
            WEB3
            <br />
            INTEGRATION.
          </h1>

          <p className="text-xl text-neutral-400 max-w-2xl leading-relaxed font-light border-l border-neutral-800 pl-6">
            Breaking the mental model. How to build frontends that talk to a database you don't own, via a protocol that has no API key.
          </p>
        </motion.div>

        {/* 1. The Mental Model Shift */}
        <motion.section className="mb-24" {...fadeInUp}>
          <div className="flex items-baseline gap-4 mb-8 border-b border-neutral-800 pb-4">
            <span className="text-4xl font-mono font-bold text-neutral-800">01</span>
            <h2 className="text-2xl font-bold tracking-tight">The Architecture Shift</h2>
          </div>
          
          <div className="bg-[#0A0A0A] border border-neutral-800 p-8 rounded-sm">
             <p className="text-lg text-neutral-300 leading-relaxed mb-6">
               In Web3, the "Backend" is a shared, public network. We don't write API endpoints; we write <strong className="text-white">Smart Contracts</strong>. We don't have a private database; we have a <strong className="text-white">Public Ledger</strong>.
             </p>
             <ArchitectureDiagram />
          </div>
        </motion.section>

        {/* 2. JSON-RPC Protocol */}
        <motion.section className="mb-24" {...fadeInUp}>
          <div className="flex items-baseline gap-4 mb-8 border-b border-neutral-800 pb-4">
            <span className="text-4xl font-mono font-bold text-neutral-800">02</span>
            <h2 className="text-2xl font-bold tracking-tight">The Language: JSON-RPC</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-neutral-400 mb-6">
                We don't use REST APIs. We communicate with Nodes using <strong>Remote Procedure Calls (RPC)</strong>. It's a stateless protocol where we send a JSON object describing the method we want to execute.
              </p>
              <div className="flex flex-col gap-4">
                 <div className="flex items-start gap-4 p-4 border border-neutral-800 bg-[#050505]">
                    <Globe className="text-blue-500 mt-1" size={20} />
                    <div>
                       <h4 className="font-bold text-white text-sm uppercase tracking-wide">The Node</h4>
                       <p className="text-xs text-neutral-500 mt-1">
                         A computer running the blockchain software. It acts as our gateway.
                         <br/>
                         <span className="font-mono text-blue-400">https://rpc.sepolia.org</span>
                       </p>
                    </div>
                 </div>
                 <div className="flex items-start gap-4 p-4 border border-neutral-800 bg-[#050505]">
                    <Code2 className="text-purple-500 mt-1" size={20} />
                    <div>
                       <h4 className="font-bold text-white text-sm uppercase tracking-wide">The Provider</h4>
                       <p className="text-xs text-neutral-500 mt-1">
                         The JS library object that manages the connection to the Node.
                       </p>
                    </div>
                 </div>
              </div>
            </div>

            <div>
              <TerminalBlock 
                title="JSON Payload Request"
                language="json"
                code={`// POST request to Node
{
  "jsonrpc": "2.0",
  "method": "eth_blockNumber",
  "params": [],
  "id": 1
}

// Response
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x5bad55" // Hexadecimal Block #
}`}
              />
            </div>
          </div>
        </motion.section>

        {/* 3. Legacy Tooling: Web3.js */}
        <motion.section className="mb-24" {...fadeInUp}>
          <div className="flex items-baseline gap-4 mb-8 border-b border-neutral-800 pb-4">
            <span className="text-4xl font-mono font-bold text-neutral-800">03</span>
            <h2 className="text-2xl font-bold tracking-tight">Legacy Tooling: Web3.js</h2>
          </div>

          <div className="border-l-2 border-yellow-600/50 pl-6 mb-8">
            <h3 className="text-lg font-bold text-yellow-500 mb-2">The "jQuery" of Blockchain</h3>
            <p className="text-neutral-400 max-w-2xl">
              Web3.js is the original library. Good for understanding history, but heavy. We use it here to demonstrate a simple <strong>Read-Only</strong> connection.
            </p>
          </div>

          <TerminalBlock 
            title="web3-demo.js"
            language="javascript"
            code={`import { Web3 } from 'web3'; 

// 1. Define the Endpoint (The Node)
const RPC_URL = 'https://ethereum-sepolia-rpc.publicnode.com';
const web3 = new Web3(RPC_URL);

const main = async () => {
  // 2. The Heartbeat Check
  const blockNum = await web3.eth.getBlockNumber();
  console.log(\`✅ Connected! Current Block: \${blockNum}\`);

  // 3. Query State (Vitalik's Balance)
  const balanceWei = await web3.eth.getBalance('0xd8dA6...45');
  
  // 4. Unit Conversion (Wei -> Ether)
  console.log(\`Balance: \${web3.utils.fromWei(balanceWei, 'ether')} ETH\`);
};

main();`}
          />
        </motion.section>

        {/* 4. Modern Tooling: Ethers.js & The Commander */}
        <motion.section className="mb-24" {...fadeInUp}>
          <div className="flex items-baseline gap-4 mb-8 border-b border-neutral-800 pb-4">
            <span className="text-4xl font-mono font-bold text-neutral-800">04</span>
            <h2 className="text-2xl font-bold tracking-tight">Modern Stack: The Sepolia Commander</h2>
          </div>

          <div className="mb-8">
            <p className="text-neutral-400 mb-6">
              We transition to <strong>Ethers.js</strong> for building DApps. Unlike the read-only script above, this introduces the <strong>Signer</strong> (Wallet) to write data to the blockchain.
            </p>
          </div>

          {/* Logic Breakdown */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {[
               { icon: Wifi, title: "Connect", desc: "Request access to window.ethereum (MetaMask)" },
               { icon: Key, title: "Signer", desc: "Wrap Private Key to authorize transactions" },
               { icon: Cpu, title: "Execute", desc: "Broadcast signed tx to the Mempool" }
            ].map((step, i) => (
              <div key={i} className="bg-[#0A0A0A] border border-neutral-800 p-6 flex flex-col items-center text-center hover:border-blue-800 transition-colors group">
                 <step.icon className="text-neutral-600 mb-4 group-hover:text-white transition-colors" size={24} />
                 <h4 className="font-bold text-white uppercase tracking-wider text-sm mb-2">{step.title}</h4>
                 <p className="text-xs text-neutral-500 font-mono">{step.desc}</p>
              </div>
            ))}
          </div>

          <TerminalBlock 
            title="SepoliaCommander.js logic"
            language="javascript"
            code={`import { BrowserProvider, parseEther } from "ethers";

// 1. THE HANDSHAKE
async function connectWallet() {
    if (!window.ethereum) return alert("Install MetaMask!");
    
    // Wrap the injected provider
    const provider = new BrowserProvider(window.ethereum);
    
    // Trigger Popup
    await provider.send("eth_requestAccounts", []);
    
    // Get the "Pen" to write signatures
    const signer = await provider.getSigner();
}

// 2. THE WRITE OPERATION
async function sendMoney(toAddr, amount) {
    // 1 ETH = 10^18 Wei
    const tx = await signer.sendTransaction({
        to: toAddr,
        value: parseEther(amount) 
    });

    console.log(\`Mempool Hash: \${tx.hash}\`);
    
    // Wait for Mining (~12s)
    await tx.wait();
}`}
          />
        </motion.section>

        {/* 5. Terminology Review */}
        <motion.section className="mb-16 border-t border-neutral-800 pt-16" {...fadeInUp}>
          <h2 className="text-lg font-bold font-mono uppercase tracking-widest text-neutral-500 mb-8 text-center">
            Protocol Terminology
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#0A0A0A] p-6 border border-neutral-800">
               <span className="text-xs font-bold text-blue-500 uppercase block mb-2">Infrastructure</span>
               <h3 className="text-lg font-bold text-white mb-2">The Node</h3>
               <p className="text-sm text-neutral-400">The generic API gateway. It listens for JSON-RPC commands and queries its local copy of the ledger.</p>
            </div>
            <div className="bg-[#0A0A0A] p-6 border border-neutral-800">
               <span className="text-xs font-bold text-purple-500 uppercase block mb-2">Library</span>
               <h3 className="text-lg font-bold text-white mb-2">The Provider</h3>
               <p className="text-sm text-neutral-400">A read-only connection pipe. Used to fetch public data like block numbers or balances.</p>
            </div>
            <div className="bg-[#0A0A0A] p-6 border border-neutral-800">
               <span className="text-xs font-bold text-red-500 uppercase block mb-2">Identity</span>
               <h3 className="text-lg font-bold text-white mb-2">The Signer</h3>
               <p className="text-sm text-neutral-400">An abstraction of the Private Key/Wallet. Required to authorize state changes (transactions).</p>
            </div>
            <div className="bg-[#0A0A0A] p-6 border border-neutral-800">
               <span className="text-xs font-bold text-green-500 uppercase block mb-2">Cost</span>
               <h3 className="text-lg font-bold text-white mb-2">Gas</h3>
               <p className="text-sm text-neutral-400">The fee paid to the network validators to process a write request. No Gas = No Transaction.</p>
            </div>
            <div className="bg-[#0A0A0A] p-6 border border-neutral-800">
               <span className="text-xs font-bold text-yellow-500 uppercase block mb-2">Data Unit</span>
               <h3 className="text-lg font-bold text-white mb-2">Wei</h3>
               <p className="text-sm text-neutral-400">The smallest unit of ETH. 1 Ether = 10^18 Wei. Blockchains do not store decimals.</p>
            </div>
          </div>
        </motion.section>

      </div>
    </div>
  )
}