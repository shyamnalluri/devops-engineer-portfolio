'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const icons = [
  { name: 'Docker', src: '/icons/docker.svg' },
  { name: 'Kubernetes', src: '/icons/kubernetes.svg' },
  { name: 'AWS', src: '/icons/aws.svg' },
  { name: 'Azure', src: '/icons/azure.svg' },
  { name: 'Terraform', src: '/icons/terraform.svg' },
  { name: 'Jenkins', src: '/icons/jenkins.svg' },
  { name: 'Git', src: '/icons/git.svg' },
  { name: 'Linux', src: '/icons/linux.svg' }
];

const generateRandomPosition = () => ({
  x: Math.random() * 400 - 200, // Random position between -200 and 200
  y: Math.random() * 400 - 200,
  scale: Math.random() * 0.5 + 0.5, // Random scale between 0.5 and 1
  rotate: Math.random() * 360 // Random rotation
});

const FloatingIcons = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="relative w-full h-full">
      {icons.map((icon, index) => {
        const initialPosition = generateRandomPosition();
        const newPosition = generateRandomPosition();

        return (
          <motion.div
            key={icon.name}
            className="absolute"
            style={{
              width: 64,
              height: 64,
              top: '50%',
              left: '50%',
              x: -32,
              y: -32
            }}
            initial={{
              x: initialPosition.x,
              y: initialPosition.y,
              scale: initialPosition.scale,
              rotate: initialPosition.rotate,
            }}
            animate={{
              x: [initialPosition.x, newPosition.x, initialPosition.x],
              y: [initialPosition.y, newPosition.y, initialPosition.y],
              scale: [initialPosition.scale, newPosition.scale, initialPosition.scale],
              rotate: [initialPosition.rotate, newPosition.rotate + 360, initialPosition.rotate + 720],
            }}
            transition={{
              duration: 20 + index * 2, // Different duration for each icon
              repeat: Infinity,
              ease: "linear",
              times: [0, 0.5, 1]
            }}
          >
            <Image
              src={icon.src}
              alt={icon.name}
              width={64}
              height={64}
              className="w-full h-full object-contain drop-shadow-lg"
            />
          </motion.div>
        );
      })}

      {/* Center glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-32 h-32 bg-blue-500/20 rounded-full blur-xl" />
      </div>
    </div>
  );
};

export default FloatingIcons;