'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Command {
  input: string;
  output: string[];
  type: 'success' | 'error' | 'info';
}

const commands: Command[] = [
  {
    input: 'terraform init',
    output: ['Initializing provider plugins...', 'Terraform has been successfully initialized!'],
    type: 'success'
  },
  {
    input: 'kubectl get pods',
    output: ['NAME                     READY   STATUS    RESTARTS   AGE', 'web-app-784d78f9f-2xjp8   1/1     Running   0          5m'],
    type: 'success'
  },
  {
    input: 'docker-compose up -d',
    output: ['Creating network "app_default" with driver "bridge"', 'Creating app_web_1    ... done', 'Creating app_db_1     ... done'],
    type: 'success'
  },
  {
    input: 'aws eks update-kubeconfig',
    output: ['Added new context eks-cluster to kubeconfig'],
    type: 'success'
  }
];

const DevOpsTerminal = () => {
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [displayedCommands, setDisplayedCommands] = useState<Command[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentChar, setCurrentChar] = useState(0);
  const [showOutput, setShowOutput] = useState(false);

  useEffect(() => {
    const typeCommand = () => {
      if (currentCommandIndex >= commands.length) {
        setCurrentCommandIndex(0);
        setDisplayedCommands([]);
        setShowOutput(false);
        return;
      }

      const currentCommand = commands[currentCommandIndex];
      if (!isTyping && currentChar === 0) {
        setIsTyping(true);
        setShowOutput(false);
      }

      if (isTyping) {
        if (currentChar < currentCommand.input.length) {
          const timer = setTimeout(() => {
            setCurrentChar(prev => prev + 1);
          }, 100);
          return () => clearTimeout(timer);
        } else {
          setIsTyping(false);
          const timer = setTimeout(() => {
            setShowOutput(true);
            const nextTimer = setTimeout(() => {
              setDisplayedCommands(prev => [...prev, currentCommand]);
              setCurrentChar(0);
              setCurrentCommandIndex(prev => prev + 1);
            }, 2000); // Wait longer before moving to next command
            return () => clearTimeout(nextTimer);
          }, 500);
          return () => clearTimeout(timer);
        }
      }
    };

    typeCommand();
  }, [currentCommandIndex, currentChar, isTyping]);

  return (
    <motion.div 
      className="w-full h-full bg-gray-900 rounded-lg border border-gray-700 overflow-hidden shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full h-8 bg-gray-800 flex items-center px-4">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="flex-1 text-center text-gray-400 text-sm">DevOps Terminal</div>
      </div>
      
      <div className="p-4 font-mono text-sm h-[calc(100%-2rem)] overflow-auto">
        {displayedCommands.map((command, index) => (
          <div key={index} className="mb-4">
            <div className="flex items-center text-gray-300">
              <span className="text-blue-400">➜</span>
              <span className="text-green-400 ml-2">~/devops</span>
              <span className="ml-2">{command.input}</span>
            </div>
            {command.output.map((line, i) => (
              <div key={i} className="mt-1 text-gray-400">
                {line}
              </div>
            ))}
          </div>
        ))}
        {(isTyping || showOutput) && (
          <div className="mb-4">
            <div className="flex items-center text-gray-300">
              <span className="text-blue-400">➜</span>
              <span className="text-green-400 ml-2">~/devops</span>
              <span className="ml-2">
                {commands[currentCommandIndex].input.slice(0, currentChar)}
                {isTyping && <span className="animate-pulse">_</span>}
              </span>
            </div>
            {showOutput && (
              <AnimatePresence>
                {commands[currentCommandIndex].output.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: i * 0.1 }}
                    className="mt-1 text-gray-400"
                  >
                    {line}
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default DevOpsTerminal;