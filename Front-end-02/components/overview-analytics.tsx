import { motion } from 'framer-motion';
import Image from 'next/image';

export const OverviewAnalytics = () => {
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
        Welcome to the ISO New England Chatbot Analytics. Feel free to evaluate our AI chatbot with our testing guidelines. Feedbacks are welcome so we can further improve the chatbot's performance.
        </p>
      </div>
    </motion.div>
  );
};
