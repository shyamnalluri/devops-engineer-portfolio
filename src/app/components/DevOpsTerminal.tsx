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

// Updated DevOpsTerminal to match the Figma wireframe
const DevOpsTerminal = () => {
  return (
    <div className="relative w-full h-full bg-gray-900/95 rounded-lg border border-gray-700/50 shadow-2xl">
      <div className="w-full h-10 bg-gray-800/90 flex items-center px-4 border-b border-gray-700/50">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500/90"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/90"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/90"></div>
        </div>
        <div className="flex-1 text-center">
          <span className="text-sm font-medium text-gray-400">~/devops-terminal</span>
        </div>
      </div>
      <div className="p-4 font-mono text-sm h-[calc(100%-2.5rem)] overflow-auto">
        <div className="text-green-400">Initializing provider plugins...</div>
        <div className="text-green-400">Planning infrastructure changes...</div>
        <div className="text-green-400">Creating AWS resources...</div>
        <div className="text-green-400">Apply complete! Resources: 12 added, 0 changed, 0 destroyed.</div>
      </div>
    </div>
  );
};

export default DevOpsTerminal;