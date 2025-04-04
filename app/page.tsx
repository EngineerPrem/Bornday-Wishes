"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import bgImage from "@/public/birthday-bg.jpg"; // Ensure this image is inside the 'public' folder

export default function Home() {
  return (
    <main className="relative flex items-center justify-center h-screen bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
      {/* Background Image */}
      <Image 
        src={bgImage} 
        alt="Birthday Background" 
        layout="fill" 
        objectFit="cover" 
        className="absolute inset-0 z-0 opacity-50" 
      />

      <motion.div className="relative z-10 w-full h-full flex flex-col justify-between">
        {/* "Hai sister💖" - Appears from left to top-left */}
        <motion.h1
          className="text-5xl font-bold text-white absolute top-10 left-10"
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          Hai sister💖
        </motion.h1>

        {/* "How are you?" - Appears from right to bottom-right */}
        <motion.h2
          className="text-4xl font-semibold text-white absolute bottom-10 right-10"
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 2.5, ease: "easeOut", delay: 1 }}
        >
          How are you?
        </motion.h2>

        {/* Button - Appears from top to middle-center */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 2.8, ease: "easeOut", delay: 4 }}
        >
          <Link
            href="/login"
            className="px-6 py-3 text-lg font-semibold bg-yellow-400 text-gray-900 rounded-lg shadow-lg hover:bg-yellow-300 transition-all duration-300"
          >
            Waiting for Your Surprise 🎁
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
