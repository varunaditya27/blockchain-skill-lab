'use client';

import { motion } from 'framer-motion';
import { Code, Download, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function Session3() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <motion.h1 
            className="text-4xl font-bold text-gray-900 mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Blockchain Technology Workshop
          </motion.h1>
          <p className="text-xl text-gray-600">Session 3 - Development Environment Setup</p>
          
          <motion.div 
            className="mt-8 bg-white p-6 rounded-xl shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Workshop Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div>
                <p className="font-medium">📅 Date:</p>
                <p>December 29, 2025</p>
              </div>
              <div>
                <p className="font-medium">🕒 Time:</p>
                <p>02:30 PM Onwards</p>
              </div>
              <div>
                <p className="font-medium">📍 Venue:</p>
                <p>ECE Seminar Hall</p>
              </div>
              <div>
                <p className="font-medium">🎯 Track:</p>
                <p>Blockchain Technology</p>
              </div>
            </div>
          </motion.div>

          <motion.div className="mt-8">
            <Link 
              href="https://docs.google.com/document/d/1pYnPd9vN5A_jROLuWO46ysusVyFhGCTny53ZtaOwpzk/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ExternalLink className="mr-2 h-5 w-5" />
              View Detailed Documentation
            </Link>
          </motion.div>
        </header>

        {/* Installation Checklist */}
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Code className="mr-2 h-6 w-6 text-blue-600" />
            Development Environment Setup Checklist
          </h2>
          
          <div className="grid gap-6">
            {installations.map((item, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + (index * 0.1) }}
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {index + 1}. {item.title}
                </h3>
                <div className="prose prose-blue max-w-none">
                  {item.content}
                </div>
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <Download className="mr-1 h-4 w-4" />
                    Download
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Final Notes */}
        <motion.div 
          className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Important Notes:</h3>
          <ul className="list-disc pl-5 space-y-2 text-blue-700">
            <li>Make sure to restart your computer after WSL installation</li>
            <li>Save all wallet recovery phrases in a secure location</li>
            <li>Verify each installation with the provided verification commands</li>
            <li>For any issues, refer to the detailed documentation or ask the instructors</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}

const installations = [
  {
    title: 'Visual Studio Code',
    content: (
      <>
        <p className="mb-2">Install the VS Code editor with the following extensions:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Python</li>
          <li>Rust Analyzer</li>
          <li>Solidity</li>
          <li>WSL (Windows Subsystem for Linux)</li>
        </ul>
        <p className="mt-2 text-sm text-gray-600">During installation, ensure to select "Add to PATH" and "Register Code as editor" options.</p>
      </>
    ),
    link: 'https://code.visualstudio.com/'
  },
  {
    title: 'Python 3.13 + Packages',
    content: (
      <>
        <p className="mb-2">Install Python 3.13 and required packages:</p>
        <pre className="bg-gray-100 p-3 rounded-md text-sm overflow-x-auto">
          <code>pip install pyteal py-algorand-sdk</code>
        </pre>
        <p className="mt-2 text-sm text-gray-600">During installation, make sure to check "Add Python to PATH".</p>
      </>
    ),
    link: 'https://www.python.org/downloads/'
  },
  {
    title: 'WSL (Ubuntu Linux Environment)',
    content: (
      <>
        <p className="mb-2">Install Windows Subsystem for Linux:</p>
        <ol className="list-decimal pl-5 space-y-1">
          <li>Open PowerShell as Administrator</li>
          <li>Run: <code className="bg-gray-100 px-1 rounded">wsl --install</code></li>
          <li>Restart your computer</li>
          <li>Set up your Ubuntu username and password when prompted</li>
          <li>Verify with: <code className="bg-gray-100 px-1 rounded">uname -a</code></li>
        </ol>
      </>
    ),
    link: 'https://learn.microsoft.com/en-us/windows/wsl/install'
  },
  {
    title: 'Node.js + npm',
    content: (
      <>
        <p className="mb-2">Install Node.js LTS version (includes npm):</p>
        <div className="bg-gray-100 p-3 rounded-md text-sm">
          <p>Verify installation:</p>
          <code className="block mt-1">node --version</code>
          <code className="block mt-1">npm --version</code>
        </div>
      </>
    ),
    link: 'https://nodejs.org/'
  },
  {
    title: 'Remix IDE',
    content: (
      <>
        <p className="mb-2">Access the online Remix IDE or install VS Code extension:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Web version: remix.ethereum.org</li>
          <li>VS Code: Install "Remix IDE" extension</li>
        </ul>
      </>
    ),
    link: 'https://remix.ethereum.org/'
  },
  {
    title: 'Wallet Setup',
    content: (
      <div className="space-y-3">
        <div>
          <p className="font-medium">MetaMask (Ethereum):</p>
          <p className="text-sm text-gray-600">Install extension, create wallet, and save recovery phrase</p>
        </div>
        <div>
          <p className="font-medium">Phantom (Solana):</p>
          <p className="text-sm text-gray-600">Install extension, create wallet, and save seed phrase</p>
        </div>
      </div>
    ),
    link: 'https://metamask.io/'
  },
  {
    title: 'Rust (via rustup)',
    content: (
      <>
        <p className="mb-2">Run in WSL (Ubuntu):</p>
        <pre className="bg-gray-100 p-3 rounded-md text-sm overflow-x-auto">
          <code>curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh</code>
          <br /><br />
          <code>source $HOME/.cargo/env</code>
          <br /><br />
          <code>rustc --version</code>
          <br />
          <code>cargo --version</code>
        </pre>
      </>
    ),
    link: 'https://www.rust-lang.org/tools/install'
  },
  {
    title: 'Solana CLI',
    content: (
      <>
        <p className="mb-2">Run in WSL (Ubuntu):</p>
        <pre className="bg-gray-100 p-3 rounded-md text-sm overflow-x-auto">
          <code>sh -c "$(curl -4 -sSfL https://release.solana.com/stable/install)"</code>
          <br /><br />
          <code>export PATH="$HOME/.local/share/solana/install/active_release/bin:$PATH"</code>
          <br /><br />
          <code>solana --version</code>
          <br /><br />
          <code>solana config set --url https://api.devnet.solana.com</code>
        </pre>
      </>
    ),
    link: 'https://docs.solana.com/cli/install-solana-cli-tools'
  },
  {
    title: 'Ethereum (Geth)',
    content: (
      <>
        <p className="mb-2">Run in WSL (Ubuntu):</p>
        <pre className="bg-gray-100 p-3 rounded-md text-sm overflow-x-auto">
          <code>sudo add-apt-repository -y ppa:ethereum/ethereum</code>
          <br />
          <code>sudo apt update</code>
          <br />
          <code>sudo apt install ethereum</code>
          <br /><br />
          <code>geth version</code>
          <br /><br />
          <span className="text-gray-500"># To start a dev chain:</span>
          <br />
          <code>geth --dev</code>
        </pre>
      </>
    ),
    link: 'https://geth.ethereum.org/'
  },
  {
    title: 'VS Code + WSL Integration',
    content: (
      <>
        <p className="mb-2">From WSL terminal:</p>
        <pre className="bg-gray-100 p-3 rounded-md text-sm overflow-x-auto">
          <code>cd /mnt/c/Users/&lt;username&gt;/blockchain</code>
          <br />
          <code>code .</code>
        </pre>
        <p className="mt-2 text-sm text-gray-600">This allows you to use Linux tooling while working with your Windows files in VS Code.</p>
      </>
    )
  }
];
