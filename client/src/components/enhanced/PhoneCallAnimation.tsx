
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, PhoneOff, Volume2 } from "lucide-react";

export default function PhoneCallAnimation() {
  const [stage, setStage] = useState(0); // 0: ringing, 1: talking, 2: translating, 3: replying
  const [languageIndex, setLanguageIndex] = useState(0);
  const [isPersonTalking, setIsPersonTalking] = useState(false);

  const dialogues = [
    { lang: "Hindi", text: "मैं ठीक हूँ, आप कैसे हैं?", script: "hi" },
    { lang: "Tamil", text: "நான் நலமாக இருக்கிறேன், நீங்கள் எப்படி இருக்கிறீர்கள்?", script: "ta" },
    { lang: "Telugu", text: "నేను బాగున్నాను, మీరు ఎలా ఉన్నారు?", script: "te" },
    { lang: "English", text: "I'm good, how are you?", script: "en" }
  ];

  const replies = [
    "I'm doing well, thank you!",
    "Thanks for asking, all good here!",
    "Great to hear from you!",
    "Everything's fine on my end!"
  ];

  useEffect(() => {
    const timeline = setTimeout(() => {
      if (stage === 0) {
        // Phone stops ringing, call answered
        setStage(1);
        setIsPersonTalking(true);
      } else if (stage === 1) {
        // After 3 seconds of talking, show translation
        setStage(2);
      } else if (stage === 2) {
        // After 1 second, show reply
        setStage(3);
        setIsPersonTalking(false);
      } else if (stage === 3) {
        // After 2 seconds, restart the cycle
        setTimeout(() => {
          setStage(0);
          setLanguageIndex(0);
        }, 2000);
      }
    }, stage === 0 ? 2000 : stage === 1 ? 3000 : stage === 2 ? 1000 : 1000);

    return () => clearTimeout(timeline);
  }, [stage]);

  // Language cycling effect during talking stage
  useEffect(() => {
    if (stage === 1 && isPersonTalking) {
      const languageCycle = setInterval(() => {
        setLanguageIndex((prev) => (prev + 1) % dialogues.length);
      }, 800);
      return () => clearInterval(languageCycle);
    }
  }, [stage, isPersonTalking]);

  return (
    <div className="relative w-full h-80 flex items-center justify-center">
      {/* Person with Phone - Fixed Head Alignment */}
      <div className="relative z-10 mr-8">
        <motion.div
          className="relative"
          animate={isPersonTalking ? { 
            scale: [1, 1.02, 1],
            rotate: [0, 1, -1, 0]
          } : {}}
          transition={{ 
            duration: 0.6, 
            repeat: isPersonTalking ? Infinity : 0,
            ease: "easeInOut"
          }}
        >
          {/* Person's Body Container */}
          <div className="relative flex flex-col items-center">
            {/* Head directly attached to body */}
            <motion.div className="w-20 h-20 bg-gradient-to-b from-amber-100 to-amber-200 rounded-full relative mb-0">
              {/* Hair */}
              <div className="absolute -top-2 left-2 right-2 h-6 bg-gradient-to-b from-amber-800 to-amber-900 rounded-t-full"></div>
              
              {/* Eyes */}
              <div className="absolute top-6 left-4 w-2 h-2 bg-gray-800 rounded-full"></div>
              <div className="absolute top-6 right-4 w-2 h-2 bg-gray-800 rounded-full"></div>
              
              {/* Nose */}
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-1 h-2 bg-amber-300 rounded-full"></div>
              
              {/* Mouth - animated when talking */}
              <motion.div 
                className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-red-400 rounded-full"
                animate={isPersonTalking ? {
                  scaleY: [1, 1.5, 0.8, 1.2, 1],
                  scaleX: [1, 0.8, 1.2, 0.9, 1]
                } : {}}
                transition={{ duration: 0.4, repeat: isPersonTalking ? Infinity : 0 }}
              />
            </motion.div>
            
            {/* Body/Shirt - directly connected to head */}
            <div className="w-24 h-32 bg-gradient-to-b from-blue-500 to-blue-600 rounded-t-3xl relative -mt-1">
              {/* Collar */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-white rounded-b-xl"></div>
              
              {/* Shirt buttons */}
              <div className="absolute top-6 left-1/2 transform -translate-x-1/2 space-y-2">
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <div className="w-1 h-1 bg-white rounded-full"></div>
              </div>
            </div>

            {/* Arms */}
            <div className="absolute top-18 -left-6 w-6 h-16 bg-gradient-to-b from-amber-200 to-amber-300 rounded-full transform rotate-12"></div>
            <div className="absolute top-18 -right-6 w-6 h-16 bg-gradient-to-b from-amber-200 to-amber-300 rounded-full transform -rotate-45">
              {/* Phone in hand */}
              <motion.div 
                className="absolute -bottom-2 -right-2 w-8 h-14 bg-gray-900 rounded-lg flex items-center justify-center shadow-lg"
                animate={stage === 0 ? { rotate: [0, 5, -5, 0] } : {}}
                transition={{ duration: 0.5, repeat: stage === 0 ? Infinity : 0 }}
              >
                <Phone size={16} className="text-white" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Speech Bubble */}
        <AnimatePresence>
          {stage === 1 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: -20 }}
              className="absolute -top-16 -left-32 bg-white rounded-2xl px-4 py-3 shadow-lg border-2 border-blue-200 min-w-48"
            >
              <motion.p 
                key={languageIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm font-medium text-gray-800"
              >
                {dialogues[languageIndex].text}
              </motion.p>
              <div className="absolute bottom-0 left-8 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white transform translate-y-full"></div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sound Emojis when listening */}
        <AnimatePresence>
          {stage === 3 && (
            <div className="absolute -top-8 -left-16">
              {["🔊", "🎵", "📢"].map((emoji, i) => (
                <motion.div
                  key={i}
                  className="absolute text-2xl"
                  initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                  animate={{ 
                    opacity: [0, 1, 0],
                    scale: [0, 1.2, 0],
                    x: [-10 + i * 5, -20 + i * 10],
                    y: [-5 - i * 8, -15 - i * 12]
                  }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeOut"
                  }}
                >
                  {emoji}
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Phone Screen */}
      <motion.div 
        className="relative w-48 h-80 bg-gray-900 rounded-3xl p-4 shadow-2xl"
        animate={stage === 0 ? { scale: [1, 1.05, 1] } : {}}
        transition={{ duration: 1, repeat: stage === 0 ? Infinity : 0 }}
      >
        {/* Screen Content */}
        <div className="w-full h-full bg-white rounded-2xl relative overflow-hidden">
          
          {/* Stage 0: Android Incoming Call */}
          <AnimatePresence>
            {stage === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black text-white"
              >
                {/* Status Bar */}
                <div className="flex justify-between items-center p-2 text-xs">
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                  </div>
                  <span>9:41</span>
                  <div className="flex space-x-1">
                    <div className="w-3 h-2 border border-white rounded-sm">
                      <div className="w-full h-full bg-white rounded-sm"></div>
                    </div>
                  </div>
                </div>

                {/* Incoming call content */}
                <div className="flex flex-col items-center justify-center h-full px-4">
                  <p className="text-xs text-gray-300 mb-2">Incoming call</p>
                  
                  {/* Contact Photo */}
                  <motion.div 
                    className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mb-4 flex items-center justify-center"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="text-3xl">👤</span>
                  </motion.div>
                  
                  <h3 className="text-xl font-medium mb-1">Friend</h3>
                  <p className="text-sm text-gray-300 mb-8">Mobile</p>
                  
                  {/* Pulsing ring indicator */}
                  <motion.div
                    className="absolute inset-0 border-4 border-green-400 rounded-2xl opacity-20"
                    animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </div>

                {/* Bottom action buttons */}
                <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-16">
                  {/* Decline button */}
                  <motion.div
                    className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
                  >
                    <PhoneOff size={24} className="text-white" />
                  </motion.div>
                  
                  {/* Accept button */}
                  <motion.div
                    className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <Phone size={24} className="text-white" />
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stage 1-3: Chat Interface */}
          <AnimatePresence>
            {stage >= 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute inset-0 bg-gradient-to-b from-green-50 to-white"
              >
                {/* Chat Header */}
                <div className="bg-green-500 text-white p-3 flex items-center">
                  <div className="w-8 h-8 bg-green-300 rounded-full mr-2"></div>
                  <div>
                    <p className="font-semibold text-sm">Friend</p>
                    <p className="text-xs opacity-80">Online</p>
                  </div>
                </div>

                {/* Messages */}
                <div className="p-3 space-y-3">
                  {/* Incoming Message */}
                  <AnimatePresence>
                    {stage >= 2 && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex"
                      >
                        <div className="bg-gray-200 rounded-2xl rounded-bl-md px-3 py-2 max-w-32">
                          <p className="text-xs text-gray-800">
                            {dialogues[3].text}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Translated from {dialogues[languageIndex].lang}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Reply Message */}
                  <AnimatePresence>
                    {stage >= 3 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex justify-end"
                      >
                        <div className="bg-green-500 text-white rounded-2xl rounded-br-md px-3 py-2 max-w-32">
                          <p className="text-xs">
                            {replies[Math.floor(Math.random() * replies.length)]}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Audio Wave Effect */}
        <AnimatePresence>
          {stage === 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute -right-12 top-1/2 transform -translate-y-1/2 flex items-center"
            >
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-blue-400 rounded-full mr-1"
                  animate={{
                    height: [4, 20, 4],
                    opacity: [0.3, 1, 0.3]
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.1
                  }}
                />
              ))}
              <Volume2 size={20} className="text-blue-400 ml-2" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
