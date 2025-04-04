"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useRouter } from "next/navigation";

export default function CelebrationPage() {
  const [startCelebration, setStartCelebration] = useState(false);
  const [cutCake, setCutCake] = useState(false);
  const [blowCandles, setBlowCandles] = useState(false);
  const [showBalloons, setShowBalloons] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (cutCake) {
      const audio = new Audio("/birthday-music.mp3");
      audio.play();
      setShowBalloons(true);

      // After song completes, show "Thank You" button
      audio.onended = () => {
        setShowThankYou(true);
      };
    }
  }, [cutCake]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-screen overflow-hidden bg-gradient">
      {/* 🎉 Confetti Effect */}
      {cutCake && <Confetti numberOfPieces={300} recycle={true} />}

      {/* 🎈 Floating Balloons */}
      {showBalloons && (
        <>
          <motion.img
            src="/balloon.png"
            className="absolute top-full left-1/4 w-20"
            animate={{ y: [-200, -500, -800], opacity: [1, 0] }}
            transition={{ duration: 5 }}
          />
          <motion.img
            src="/balloon.png"
            className="absolute top-full right-1/4 w-20"
            animate={{ y: [-200, -500, -800], opacity: [1, 0] }}
            transition={{ duration: 5 }}
          />
          <motion.img
            src="/cracker.png"
            className="absolute top-full left-10 w-16"
            animate={{ y: [-200, -600, -900], opacity: [1, 0] }}
            transition={{ duration: 6 }}
          />
          <motion.img
            src="/cracker.png"
            className="absolute top-full right-10 w-16"
            animate={{ y: [-200, -600, -900], opacity: [1, 0] }}
            transition={{ duration: 6 }}
          />
        </>
      )}

      {/* 🎤 Text Message & Start Celebration Button at Bottom Center */}
{!startCelebration && (
  <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-4">
    <motion.h1
      className="text-5xl font-bold text-white mb-6 text-center"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      🎉 Waiting for your Celebration!
    </motion.h1>

    <motion.button
      className="px-6 py-3 text-xl font-semibold text-white bg-yellow-500 rounded-lg shadow-lg hover:bg-yellow-600"
      onClick={() => setStartCelebration(true)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      🎂 Click to Start Celebration!
    </motion.button>
  </div>
)}


      {/* 🎂 Cake Animation */}
      {startCelebration && (
        <motion.div
          className="relative mt-6 cursor-pointer"
          onClick={() => {
            setBlowCandles(true);
            setTimeout(() => {
              setCutCake(true);
            }, 2000);
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
         {!cutCake && (
  <motion.h2
    className="absolute top-[-70px] left-1/2 -translate-x-1/2 whitespace-nowrap text-white text-4xl font-bold"
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
  >
    🎂 Tap the Cake!
  </motion.h2>
)}



          {/* Cake Base */}
          <motion.img
            src="/cake.png"
            alt="Birthday Cake"
            className="w-64 h-auto"
            initial={{ opacity: 1 }}
            animate={cutCake ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 1 }}
          />

          {/* Candles Flickering Effect */}
          {!blowCandles && (
            <motion.div className="absolute top-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
              <motion.img
                src="/candles.png"
                alt="Candles"
                className="w-24"
                animate={{ opacity: [1, 0.8, 1] }}
                transition={{ repeat: Infinity, duration: 0.5 }}
              />
            </motion.div>
          )}

          {/* Knife Cutting Animation */}
          {cutCake && (
            <motion.img
              src="/knife.png"
              alt="Knife Cutting Cake"
              className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 max-h-20"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 50, opacity: 1 }}
              transition={{ duration: 1 }}
            />
          )}
        </motion.div>
      )}

      {/* 🎊 Celebration Message */}
      {cutCake && (
        <motion.p
          className="text-white text-3xl mt-6 font-bold font-serif"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          🎉 Happy Birthday Thangam❤️‍🩹! Enjoy the Cake! 🍰
        </motion.p>
      )}

      {/* 🎁 "Thank You" Button After Song Ends */}
      {showThankYou && (
        <motion.button
          className="mt-6 px-6 py-3 text-xl font-semibold text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700"
          onClick={() => router.push("/thankyou")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          🙏 Thank You!
        </motion.button>
      )}

      {/* 🎨 CSS Animation */}
      <style jsx>{`
       @keyframes gradientMove {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.bg-gradient {
  background: 
    url('/Theme-2.png'),
    linear-gradient(45deg, rgba(255, 107, 107, 0.4), rgba(254, 202, 87, 0.4), rgba(72, 219, 251, 0.4), rgba(29, 209, 161, 0.4), rgba(255, 159, 243, 0.4));
  background-blend-mode: overlay;
  background-size: cover, 400% 400%;
  background-position: center;
  animation: gradientMove 8s ease infinite;
}

      `}</style>
    </div>
  );
}
