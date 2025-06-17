'use client';

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useState } from "react";

// Dynamically import the game component with no SSR to prevent Phaser errors
const GameComponent = dynamic(() => import('./game'), { ssr: false });

export default function GamePage() {
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gray-900 py-16">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-0" aria-hidden="true" />
      
      {/* Game gradients */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-red-500/15 via-orange-500/10 to-amber-500/5 rounded-full blur-3xl" aria-hidden="true" />
      <div className="absolute -bottom-10 -left-10 w-[500px] h-[500px] bg-gradient-to-br from-blue-600/15 via-indigo-500/10 to-purple-600/5 rounded-full blur-3xl" aria-hidden="true" />
      
      {/* Binary pattern overlay */}
      <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03] z-0" aria-hidden="true" />
      
      {!gameStarted ? (
        <motion.div 
          className="relative z-10 text-center p-8 bg-gray-900/90 backdrop-blur-lg rounded-xl border border-gray-800/50 max-w-2xl mx-4 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-orange-400 via-red-400 to-orange-400 text-transparent bg-clip-text">
              DevOps Runner
            </span>
          </h1>
          
          <p className="text-gray-300 mb-8 text-lg">
            Escape from the relentless Jenkins CI/CD pipelines that are chasing you, while avoiding obstacles in your DevOps journey!
          </p>
          
          <div className="mb-8 p-6 bg-gray-800/60 rounded-lg border border-gray-700/50">
            <h2 className="text-xl font-semibold text-white mb-4">How to Play</h2>            <ul className="text-left text-gray-300 space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-blue-400 text-xl">•</span> 
                <span>Press <strong className="text-white bg-gray-700 px-2 py-0.5 rounded font-mono">↑ Up Arrow</strong> or <strong className="text-white bg-gray-700 px-2 py-0.5 rounded font-mono">Space</strong> to jump</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 text-xl">•</span> 
                <span>Jump over DevOps obstacles (Jenkins, Docker) as they approach</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 text-xl">•</span> 
                <span>Stay ahead of the AI that&apos;s chasing you from behind</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 text-xl">•</span> 
                <span>Collect power-ups for special abilities:</span>
                <ul className="ml-6 space-y-2 mt-2">
                  <li className="flex items-center gap-2">
                    <span className="inline-block w-3 h-3 rounded-full bg-blue-400"></span>
                    <span><strong className="text-blue-400">Shield</strong> - Protects from one collision</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="inline-block w-3 h-3 rounded-full bg-yellow-400"></span>
                    <span><strong className="text-yellow-400">Cloud</strong> - Super jump ability</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="inline-block w-3 h-3 rounded-full bg-green-400"></span>
                    <span><strong className="text-green-400">Slow</strong> - Slows down obstacles</span>
                  </li>
                </ul>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 text-xl">•</span> 
                <span>Try to beat your high score!</span>
              </li>
            </ul>
          </div>
          
          <motion.button 
            onClick={() => setGameStarted(true)}
            className="px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-500 hover:to-indigo-500 transition-all shadow-lg shadow-indigo-600/30 text-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Start Game
          </motion.button>
        </motion.div>
      ) : (
        <motion.div 
          className="w-full max-w-6xl px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <GameComponent />
        </motion.div>
      )}
    </main>
  );
}
