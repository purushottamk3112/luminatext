import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileAudio, FileVideo, Clock, Zap, Shield, Headphones } from 'lucide-react';

const Home = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-blue-900/30 mix-blend-multiply"></div>
          <img 
            src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
            alt="Audio waves background" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Transform Your Audio & Video
              </span>
              <br />
              Into Accurate Text
            </h1>
            
            <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-8">
              LuminaText uses advanced AI to transcribe your audio and video files with exceptional accuracy. Save time and unlock the content within your media.
            </p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/transcribe" 
                className="inline-flex items-center px-8 py-4 text-lg font-medium rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start Transcribing
                <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Animated wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path fill="#111827" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            {...fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Powerful Transcription Features
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our advanced AI-powered platform offers everything you need for perfect transcriptions.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <FileAudio className="h-10 w-10 text-purple-400" />,
                title: "Audio Transcription",
                description: "Convert MP3, WAV, and other audio formats into accurate text with our advanced AI model."
              },
              {
                icon: <FileVideo className="h-10 w-10 text-purple-400" />,
                title: "Video Transcription",
                description: "Extract and transcribe audio from MP4 and other video formats with exceptional accuracy."
              },
              {
                icon: <Clock className="h-10 w-10 text-purple-400" />,
                title: "Fast Processing",
                description: "Get your transcriptions quickly with our optimized processing pipeline."
              },
              {
                icon: <Zap className="h-10 w-10 text-purple-400" />,
                title: "High Accuracy",
                description: "Our AI model delivers industry-leading transcription accuracy across multiple languages."
              },
              {
                icon: <Shield className="h-10 w-10 text-purple-400" />,
                title: "Secure & Private",
                description: "Your files are processed securely and never shared with third parties."
              },
              {
                icon: <Headphones className="h-10 w-10 text-purple-400" />,
                title: "Multiple Languages",
                description: "Support for transcribing content in various languages and accents."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-800/80"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            {...fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Transcribing your audio and video files has never been easier.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Upload Your File",
                description: "Drag and drop or browse to upload your audio or video file (up to 25MB)."
              },
              {
                step: "02",
                title: "AI Processing",
                description: "Our advanced AI model processes your file and extracts the spoken content."
              },
              {
                step: "03",
                title: "Get Your Transcript",
                description: "Download your accurate transcript in text format or copy it directly."
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative"
              >
                <div className="bg-gray-700 rounded-xl p-8 h-full">
                  <div className="text-5xl font-bold text-purple-400/20 absolute top-4 right-4">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3 relative z-10">
                    {step.title}
                  </h3>
                  <p className="text-gray-300 relative z-10">
                    {step.description}
                  </p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-900 to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Media?
            </h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-8">
              Start transcribing your audio and video files today and experience the power of LuminaText.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/transcribe" 
                className="inline-flex items-center px-8 py-4 text-lg font-medium rounded-full bg-white text-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Started Now
                <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;