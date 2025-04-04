"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import bgImage from "@/public/Theme-1.jpg"; // Background Image

export default function LoginPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState(["", "", "", "", ""]);

  const questions = [
    "If we had a theme song, what would it be?",
    "What’s the funniest prank I’ve ever pulled on you?",
    "What’s the best gift you ever got from me?",
    "If we were in a movie, what would be our title?",
    "Describe About our bond",
  ];

  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    const lastAnswer = answers[4].trim();
    const wordCount = lastAnswer.split(/\s+/).length;
  
    if (wordCount < 100) {
      alert("Your description must be at least 100 words! 📝");
      return;
    }
  
    const userId = crypto.randomUUID(); // Unique user ID
  
    const response = await fetch("/api/save-answers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, answers }),
    });
  
    const result = await response.json();
    console.log(result);
  
    if (response.ok) {
      alert("Your answers have been saved! ✅");
      localStorage.setItem("userId", userId); // Store userId to fetch data later
      router.push("/memory");
    } else {
      alert("Failed to save your answers. Try again! ❌");
    }
  };
  
  return (
    <main className="relative flex items-center justify-center h-screen bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 px-10">
      {/* Background Image */}
      <Image
        src={bgImage}
        alt="Birthday Background"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 z-0 opacity-50"
      />

      {/* Form Box Positioned Slightly Left */}
      <motion.div
        initial={{ x: 100, opacity: 0 }} // Enters from Right
        animate={{ x: -50, opacity: 1 }} // Moves Slightly Left
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md p-8 text-center"
      >
        {/* Looping through all 5 questions */}
        {questions.map((question, index) => (
          <motion.div
            key={index}
            initial={{ x: 50, opacity: 0 }} // Each field enters from right
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="mb-4"
          >
            <p className="text-lg font-semibold text-white">{question}</p>
            <textarea
              value={answers[index]}
              onChange={(e) => handleChange(index, e.target.value)}
              className={`w-full mt-2 border border-white rounded-lg text-gray-900 bg-white bg-opacity-80 
                ${index < 4 ? "p-1 text-sm" : "p-3 text-base"}`} // Reduced padding for first 4 fields
              placeholder="Type your answer..."
              rows={index === 4 ? 5 : 2}
            />
          </motion.div>
        ))}

        {/* Submit Button */}
        <motion.button
          onClick={handleSubmit}
          disabled={answers.some((answer) => answer.trim() === "")}
          className="mt-4 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-400 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Submit
        </motion.button>
      </motion.div>
    </main>
  );
}
