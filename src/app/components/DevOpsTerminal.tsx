'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Command {
  id: string;
  input: string;
  output: string[];
  type: 'success' | 'error' | 'info';
  icon?: string;
}

const commands: Command[] = [
  {
    id: 'terraform',
    input: 'terraform apply -auto-approve',
    output: [
      'Initializing provider plugins...',
      'Planning infrastructure changes...',
      'Creating AWS resources...',
      'Apply complete! Resources: 12 added, 0 changed, 0 destroyed.',
      '✨ Infrastructure successfully deployed!'
    ],
    type: 'success',
    icon: '🏗️'
  },
  {
    id: 'kubernetes',
    input: 'kubectl get pods -n production',
    output: [
      'NAME                         READY   STATUS    RESTARTS   AGE',
      'web-app-784d78f9f-2xjp8     1/1     Running   0          5m',
      'api-6b4f7d8f9-1xkp7         1/1     Running   0          10m',
      'redis-5c7d89f6b-3yjp9       1/1     Running   0          15m'
    ],
    type: 'success',
    icon: '⎈'
  },
  {
    id: 'docker',
    input: 'docker-compose up -d --scale web=3',
    output: [
      'Creating network "app_default" with driver "bridge"',
      'Creating app_web_1    ... done',
      'Creating app_web_2    ... done',
      'Creating app_web_3    ... done',
      'Creating app_db_1     ... done',
      'Services scaled successfully! 🚀'
    ],
    type: 'success',
    icon: '🐳'
  },
  {
    id: 'github',
    input: 'git push origin main --force-with-lease',
    output: [
      'Enumerating objects: 32, done.',
      'Counting objects: 100% (32/32), done.',
      'Delta compression using up to 8 threads',
      'Compressing objects: 100% (18/18), done.',
      'Writing objects: 100% (20/20), 2.12 KiB | 1.06 MiB/s, done.',
      '✨ Successfully deployed to main'
    ],
    type: 'success',
    icon: '📦'
  }
];

const DevOpsTerminal = () => {
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [displayedCommands, setDisplayedCommands] = useState<Command[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentChar, setCurrentChar] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
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
          }, 50);
          return () => clearTimeout(timer);
        } else {
          setIsTyping(false);
          const timer = setTimeout(() => {
            setShowOutput(true);
            const nextTimer = setTimeout(() => {
              setDisplayedCommands(prev => [...prev, currentCommand]);
              setCurrentChar(0);
              setCurrentCommandIndex(prev => prev + 1);
              setShowOutput(false);
            }, 2000);
            return () => clearTimeout(nextTimer);
          }, 500);
          return () => clearTimeout(timer);
        }
      }
    };

    typeCommand();
  }, [currentCommandIndex, currentChar, isTyping]);

  // Cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  const CommandPrompt = ({ command }: { command?: Command }) => (
    <div className="flex items-center text-gray-300 space-x-2">
      <span className="text-blue-400">➜</span>
      <span className="text-green-400">~/project</span>
      <span className="text-blue-400">git:(</span>
      <span className="text-red-400">main</span>
      <span className="text-blue-400">)</span>
      <span className="flex items-center">
        {command?.icon && <span className="mr-2">{command.icon}</span>}
        {command?.input || ''}
      </span>
    </div>
  );

  return (
    <div className="relative w-full h-full">
      {/* Terminal glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
      
      {/* Main terminal window */}
      <div className="relative w-full h-full bg-gray-900/95 backdrop-blur-sm rounded-lg border border-gray-700/50 overflow-hidden shadow-2xl">
        {/* Terminal header */}
        <div className="w-full h-10 bg-gray-800/90 flex items-center px-4 border-b border-gray-700/50">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500/90 hover:bg-red-600 transition-colors duration-200"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/90 hover:bg-yellow-600 transition-colors duration-200"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/90 hover:bg-green-600 transition-colors duration-200"></div>
          </div>
          <div className="flex-1 text-center">
            <span className="text-sm font-medium text-gray-400">~/devops-terminal</span>
          </div>
        </div>
        
        {/* Terminal content */}
        <div className="p-4 font-mono text-sm h-[calc(100%-2.5rem)] overflow-auto custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key="terminal-content"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 1 }}
            >
              {displayedCommands.map((command, index) => (
                <motion.div
                  key={`${command.id}-${index}`}
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 1 }}
                  className="mb-4"
                >
                  <CommandPrompt command={command} />
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="mt-2 ml-6"
                  >
                    {command.output.map((line, i) => (
                      <div
                        key={i}
                        className={`${
                          command.type === 'success' ? 'text-green-400' :
                          command.type === 'error' ? 'text-red-400' :
                          'text-blue-400'
                        } opacity-90`}
                      >
                        {line}
                      </div>
                    ))}
                  </motion.div>
                </motion.div>
              ))}

              {/* Current typing command */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center text-gray-300 space-x-2"
                >
                  <CommandPrompt />
                  <span>{commands[currentCommandIndex].input.slice(0, currentChar)}</span>
                  <span 
                    className={`w-2 h-5 bg-gray-400 ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}
                  />
                </motion.div>
              )}

              {/* Show output for current command */}
              {!isTyping && showOutput && (
                <motion.div className="mb-4">
                  <CommandPrompt command={commands[currentCommandIndex]} />
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="mt-2 ml-6"
                  >
                    {commands[currentCommandIndex].output.map((line, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: i * 0.1 }}
                        className={`${
                          commands[currentCommandIndex].type === 'success' ? 'text-green-400' :
                          commands[currentCommandIndex].type === 'error' ? 'text-red-400' :
                          'text-blue-400'
                        } opacity-90`}
                      >
                        {line}
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default DevOpsTerminal;