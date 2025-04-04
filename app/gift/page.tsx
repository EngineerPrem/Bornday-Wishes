"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useRouter } from "next/navigation";

export default function GiftPage() {
  const [isOpened, setIsOpened] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();

  const handleGiftClick = () => {
    setIsOpened(true);
    setShowVideo(true);
    videoRef.current?.play();
  };

  const handleVideoEnd = () => {
    setShowVideo(false); // 🔥 Remove Countdown Video
    setShowCelebration(true); // ✅ Show Award
    playAudio();
  };

  const playAudio = () => {
    const audio = new Audio("/award-music.mp3");
    audio.play();
    setIsMusicPlaying(true); // ✅ Keep Confetti Running
    audio.onended = () => {
      setIsMusicPlaying(false); // 🔥 Stop Confetti
      setShowCelebration(false); // 🔥 Hide Award
      setShowButton(true); // ✅ Show Button
    };
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center overflow-hidden w-screen h-screen"
      style={{ backgroundImage: 'url(/background.jpg)' }}
    >
      {/* Confetti Effect - Only stops when song ends */}
      {(showCelebration || isMusicPlaying) && <Confetti numberOfPieces={300} recycle={true} />}

      {/* Heading - Hidden when Gift is Opened */}
      {!isOpened && (
        <motion.h1
        className="absolute bottom-90 left-1/2 transform -translate-x-1/2 text-5xl md:text-6xl font-extrabold text-yellow-300 drop-shadow-lg text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        🏆 World’s Best Sister Award is for you! 🎖️
      </motion.h1>
      
      )}

      {/* Gift Box */}
      {!isOpened ? (
        <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-64 h-64 bg-red-500 rounded-lg shadow-lg cursor-pointer flex items-center justify-center border-4 border-yellow-300"
        onClick={handleGiftClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ y: -20 }}
        animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
          <div className="absolute w-full h-8 bg-yellow-300 top-0 rounded-t-lg"></div>
          <div className="absolute w-8 h-full bg-yellow-300 left-1/2 transform -translate-x-1/2"></div>
          <span className="text-white text-2xl font-bold">📦 Tap to Open!</span>
        </motion.div>
      ) : (
        // Show Countdown Video and Remove After End
        showVideo && (
          <motion.video
            ref={videoRef}
            src="/countdown.mp4"
            className="absolute top-0 left-0 w-full h-full object-cover"
            autoPlay
            onEnded={handleVideoEnd} // 🔥 Remove Video after end
          />
        )
      )}

      {/* Celebration Image - Hides when the song ends */}
      {showCelebration && (
        <motion.img
          src="/award.png"
          alt="Award Trophy"
          className="absolute top-0 left-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }} // 🔥 Hide when song ends
          transition={{ duration: 1.5 }}
        />
      )}

      {/* Move to Celebration Page Button */}
      {showButton && (
        <motion.button
          className="mt-10 px-6 py-3 bg-blue-500 text-white text-xl font-bold rounded-lg shadow-lg hover:bg-blue-600"
          onClick={() => router.push("/celebration")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Go to Celebration Page 🎊
        </motion.button>
      )}
    </div>
  );
}
