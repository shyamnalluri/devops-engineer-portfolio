import { motion } from 'framer-motion';

const LoadingSpinner = () => {
  return (
    <motion.div
      className="flex justify-center items-center min-h-[200px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </motion.div>
  );
};

export default LoadingSpinner;