"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function MemoryPage() {
  const [answers, setAnswers] = useState<string[]>([]);
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement>(null);

  const images = [
    "/memories/img1.jpg",
    "/memories/img2.jpg",
    "/memories/img3.jpg",
    "/memories/img4.jpg",
    "/memories/img5.jpg",
    "/memories/img6.jpg",
    "/memories/img7.jpg",
    "/memories/img8.jpg",
    "/memories/img9.jpg",
    "/memories/img10.jpg",
  ];

  useEffect(() => {
    let storedUserId = localStorage.getItem("userId");

    if (!storedUserId) {
      storedUserId = `user-${Date.now()}`;
      localStorage.setItem("userId", storedUserId);
      alert(`Your User ID is: ${storedUserId}.\nSave this to access your answers later!`);
    }

    setUserId(storedUserId);
    fetchData(storedUserId);
    
    audioRef.current?.play();
  }, []);

  const fetchData = (userId: string) => {
    fetch(`/api/save-answers?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.answers) {
          setAnswers(data.answers);
        } else {
          alert("No data found for this user!");
        }
      })
      .catch(() => alert("Error fetching data! ❌"))
      .finally(() => setLoading(false));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gray-900 border-8 border-white p-6 overflow-hidden">
      {/* Background Music */}
      <audio ref={audioRef} src="/song.mp3" autoPlay loop />

      {/* Beautiful Heading */}
      <motion.h1
  className="text-4xl md:text-5xl font-bold font-serif text-yellow-300 mb-8 drop-shadow-[0_0_15px_rgba(255,255,0,0.8)]"
  initial={{ opacity: 0, scale: 0.5 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 1.2 }}
>
  Memories of Bond of <span className="text-pink-400">Anna✨</span> and <span className="text-blue-400">Paapa❤️‍🩹</span>
</motion.h1>




      {/* Slideshow with Enhanced Animations */}
      <div className="relative w-screen  overflow-hidden border-4 border-yellow-400 rounded-lg shadow-lg">
        <motion.div
          className="flex w-[200%] h-[400px]"
          animate={{ x: ["0%", "-100%"], scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
        >
          {[...images, ...images].map((src, index) => (
            <motion.img
              key={index}
              src={src}
              alt={`Memory ${index}`}
              className="w-screen h-[400px] object-cover"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, delay: index * 0.3 }}
            />
          ))}
        </motion.div>

        {/* Funny Next Page Button */}

      </div>

      <motion.button
  onClick={() => router.push("/gift")}
  className="mt-8 px-6 py-3 bg-pink-500 text-white text-xl font-bold rounded-lg shadow-lg hover:bg-pink-600"
  whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: "easeInOut" }}
>
  🎁 Surprise Awaits! Click Me! 🚀
</motion.button>
    </div>
  );
}
