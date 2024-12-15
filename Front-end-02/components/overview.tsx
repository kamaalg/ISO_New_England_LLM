import { motion } from 'framer-motion';
import Image from 'next/image';

export const Overview = () => {
  return (
    <motion.div
      key="overview"
      className="max-w-3xl mx-auto md:mt-20"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ delay: 0.5 }}
    >
      <div className="rounded-xl p-6 flex flex-col gap-8 leading-relaxed text-center max-w-xl">
        <p className="flex flex-row justify-center gap-4 items-center">
          <Image
          src="/isoLogo.jpg"
          alt="ISO New England logo"
          width={250} // Optional, but recommended for better performance
          height={250} // Optional, but recommended for better performance
          />
        </p>
        <p>
        Welcome to the ISO New England Chatbot, your guide to understanding and navigating the region’s power grid operations.
        </p>
        <p>
        This is a Chatbot built with Next.js and the Azure Open AI by microsoft
        </p>
      </div>
    </motion.div>
  );
};
