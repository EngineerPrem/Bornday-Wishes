"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ThankYouPage() {
  const [showMessage, setShowMessage] = useState(false);
  const [currentParagraph, setCurrentParagraph] = useState(0);
  const [audioPlayed, setAudioPlayed] = useState(false);
  const [goldConfetti, setGoldConfetti] = useState(false);

  const paragraphs = [
    "To My Dearest Thangachi ❤️",
    "From the moment you became a part of my life, you have been more than just a sister to me - you are my blessing, my happiness, my heart’s favorite person. Blood may not have made us siblings, but fate did, and I wouldn’t have it any other way.",
    "Your kindness, your laughter, your love - these are the things that make life brighter. You have always been my safe place, my biggest cheerleader, and my closest friend. No words can ever truly express how much you mean to me.",
    "If I have ever made mistakes, hurt you unknowingly, or not been the brother/sister you deserve, I am truly sorry. You have always stood by me, and I promise to do the same for you, today and always.",
    "You are precious, irreplaceable, and deeply loved. I am grateful every day for you, my Thangam. No matter where life takes us, one thing will never change - I will always be here for you.",
    "✨ Happy Birthday, My Sweet Thangachi! Love you forever and beyond! ❤️🎂✨",
  ];

  useEffect(() => {
    if (goldConfetti) {
      const confetti = document.createElement("div");
      confetti.className = "gold-confetti";
      document.body.appendChild(confetti);

      setTimeout(() => {
        confetti.remove();
      }, 3000);
    }
  }, [goldConfetti]);

  const handleClick = () => {
    if (!showMessage) {
      setShowMessage(true);
      setGoldConfetti(true);
      if (!audioPlayed) {
        const audio = new Audio("/emotional-music.mp3");
        audio.play();
        audio.onended = () => {
          const secondAudio = new Audio("/emotional-music.mp3");
          secondAudio.play();
        };
        setAudioPlayed(true);
      }
    } else if (currentParagraph < paragraphs.length - 1) {
      setCurrentParagraph(currentParagraph + 1);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-end min-h-screen text-white text-center px-6 relative pb-24"
      style={{
        backgroundImage: "url('/thankyou-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Background Overlay for reduced opacity */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      

      <div className="relative z-10">
        {!showMessage && (
          <motion.button
            className="px-6 py-3 text-xl font-semibold bg-yellow-500 rounded-lg shadow-lg hover:bg-yellow-600"
            onClick={handleClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            ❤️ Click Me ❤️
          </motion.button>
        )}

        {showMessage && (
          <motion.div className="w-full max-w-2xl text-center">
            <motion.p
              className="text-3xl font-bold mb-4 drop-shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              {paragraphs[currentParagraph]}
            </motion.p>

            {currentParagraph < paragraphs.length - 1 && (
              <motion.button
                className="mt-4 px-5 py-2 text-lg font-semibold bg-white text-purple-600 rounded-lg shadow-lg hover:bg-gray-200"
                onClick={handleClick}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Next ➡
              </motion.button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
