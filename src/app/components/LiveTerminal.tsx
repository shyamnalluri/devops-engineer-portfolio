"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

interface Command {
  prompt: string;
  command: string;
  output?: string[];
  delay?: number;
}

const LiveTerminal = () => {
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const commands: Command[] = useMemo(() => [
    {
      prompt: "~/devops$",
      command: "kubectl get pods -n production",
      output: [
        "NAME                          READY   STATUS    RESTARTS   AGE",
        "api-service-7d4b8c9f6-x2m9p   1/1     Running   0          2d",
        "frontend-app-5f8a7b3d2-k4n7q  1/1     Running   0          1d",
        "redis-cache-6c9d5e8f1-p8r3t   1/1     Running   0          3d"
      ],
      delay: 100
    },
    {
      prompt: "~/devops$",
      command: "terraform plan -var-file=prod.tfvars",
      output: [
        "Terraform will perform the following actions:",
        "",
        "  # aws_instance.web_server will be created",
        "  + resource \"aws_instance\" \"web_server\" {",
        "      + instance_type = \"t3.medium\"",
        "      + tags          = {",
        "          + \"Environment\" = \"production\"",
        "        }",
        "    }",
        "",
        "Plan: 1 to add, 0 to change, 0 to destroy."
      ],
      delay: 80
    },
    {
      prompt: "~/devops$",
      command: "docker build -t myapp:v2.1.0 .",
      output: [
        "Sending build context to Docker daemon  15.36MB",
        "Step 1/8 : FROM node:18-alpine",
        " ---> e4c58958181a",
        "Step 2/8 : WORKDIR /app",
        " ---> Running in 9f8a7b6c5d2e",
        " ---> 3e5d4c7f8a9b",
        "Successfully built 3e5d4c7f8a9b",
        "Successfully tagged myapp:v2.1.0"
      ],
      delay: 120
    },
    {
      prompt: "~/devops$",
      command: "helm upgrade --install myapp ./charts/myapp",
      output: [
        "Release \"myapp\" has been upgraded. Happy Helming!",
        "NAME: myapp",
        "LAST DEPLOYED: Thu May 30 12:34:56 2025",
        "NAMESPACE: default",
        "STATUS: deployed",
        "REVISION: 3"
      ],
      delay: 90
    },
    {
      prompt: "~/devops$",
      command: "aws eks update-kubeconfig --region us-west-2 --name prod-cluster",
      output: [
        "Added new context arn:aws:eks:us-west-2:123456789012:cluster/prod-cluster to ~/.kube/config"      ],
      delay: 110
    }
  ], []);

  // Typewriter effect
  useEffect(() => {
    if (currentCommandIndex >= commands.length) {
      // Reset after all commands
      const timer = setTimeout(() => {
        setCurrentCommandIndex(0);
        setCurrentText("");
        setShowOutput(false);
      }, 3000);
      return () => clearTimeout(timer);
    }

    const currentCommand = commands[currentCommandIndex];
    const fullText = currentCommand.command;
    
    if (currentText.length < fullText.length) {
      setIsTyping(true);
      const timer = setTimeout(() => {
        setCurrentText(fullText.slice(0, currentText.length + 1));
      }, currentCommand.delay || 100);
      return () => clearTimeout(timer);
    } else {
      setIsTyping(false);
      // Show output after command is typed
      setTimeout(() => {
        setShowOutput(true);
        // Move to next command after showing output
        setTimeout(() => {
          setCurrentCommandIndex(prev => prev + 1);
          setCurrentText("");
          setShowOutput(false);
        }, 2000);
      }, 500);
    }
  }, [currentText, currentCommandIndex, commands]);

  // Cursor blinking effect
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(cursorTimer);
  }, []);  const currentCommand = commands[currentCommandIndex] || commands[0];
  return (
    <motion.div
      className="relative w-[360px] h-[400px] lg:w-[400px] lg:h-[440px] xl:w-[450px] xl:h-[480px] 2xl:w-[480px] 2xl:h-[520px] max-w-full"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      {/* Terminal window */}
      <div className="relative w-full h-full bg-gray-900 rounded-lg shadow-2xl overflow-hidden border border-gray-700">
        {/* Terminal header */}
        <div className="flex items-center justify-between bg-gray-800 px-4 py-3 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="text-gray-400 text-sm font-mono">
            Terminal - DevOps Console
          </div>
          <div className="w-16"></div>
        </div>

        {/* Terminal content */}
        <div className="p-4 h-full overflow-hidden bg-black">
          <div className="font-mono text-sm">
            {/* Previous commands (fade out effect) */}
            {currentCommandIndex > 0 && (
              <div className="opacity-40 space-y-1 mb-2">
                {commands.slice(Math.max(0, currentCommandIndex - 2), currentCommandIndex).map((cmd, index) => (
                  <div key={index}>
                    <div className="flex">
                      <span className="text-green-400">{cmd.prompt}</span>
                      <span className="text-white ml-2">{cmd.command}</span>
                    </div>
                    {cmd.output && (
                      <div className="ml-2 text-gray-400 text-xs">
                        {cmd.output.slice(0, 2).map((line, i) => (
                          <div key={i}>{line}</div>
                        ))}
                        {cmd.output.length > 2 && <div>...</div>}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Current command line */}
            <div className="flex items-center">
              <span className="text-green-400 font-bold">{currentCommand.prompt}</span>
              <span className="text-white ml-2">
                {currentText}
                {(isTyping || currentText.length === currentCommand.command.length) && (
                  <span className={`text-orange-500 ${showCursor ? 'opacity-100' : 'opacity-0'}`}>
                    ▊
                  </span>
                )}
              </span>
            </div>

            {/* Command output */}
            {showOutput && currentCommand.output && (
              <motion.div
                className="mt-2 space-y-1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {currentCommand.output.map((line, index) => (
                  <motion.div
                    key={index}
                    className="text-gray-300 text-xs leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {line.includes('Running') || line.includes('STATUS') ? (
                      <span className="text-blue-400">{line}</span>
                    ) : line.includes('Successfully') || line.includes('deployed') ? (
                      <span className="text-green-400">{line}</span>
                    ) : line.includes('Error') || line.includes('Failed') ? (
                      <span className="text-red-400">{line}</span>
                    ) : line.includes('Plan:') || line.includes('READY') ? (
                      <span className="text-yellow-400">{line}</span>
                    ) : line.includes('kubectl') || line.includes('terraform') || line.includes('docker') || line.includes('helm') ? (
                      <span className="text-orange-400">{line}</span>
                    ) : (
                      line
                    )}
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Progress indicator */}
            <div className="absolute bottom-4 right-4 flex space-x-1">
              {commands.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentCommandIndex 
                      ? 'bg-orange-500 scale-125' 
                      : index < currentCommandIndex 
                        ? 'bg-green-500' 
                        : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>      {/* Glowing border effect */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-orange-500/20 via-red-500/20 to-purple-500/20 blur-xl -z-10"></div>
    </motion.div>
  );
};

export default LiveTerminal;
