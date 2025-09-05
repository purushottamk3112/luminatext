import React from 'react';
import { motion } from 'framer-motion';
import { Mic, FileText, Zap, Globe, Users, Award } from 'lucide-react';

const About = () => {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              About LuminaText
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Lighting up your content through transcription
          </p>
        </motion.div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-gray-300 mb-4">
              At LuminaText, we believe that valuable content should be
              accessible to everyone. Our mission is to transform audio and
              video content into accurate text, making it searchable,
              analyzable, and more accessible.
            </p>
            <p className="text-gray-300 mb-4">
              We've built a platform that leverages cutting-edge AI technology
              to provide high-quality transcriptions that save you time and
              unlock the potential of your media content.
            </p>
            <p className="text-gray-300">
              Whether you're a content creator, researcher, journalist, or
              business professional, LuminaText helps you extract more value
              from your audio and video files.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative"
          >
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-purple-500/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-pink-500/20 rounded-full blur-xl"></div>
            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
              alt="AI Transcription Technology"
              className="rounded-xl shadow-2xl w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* Technology Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-20"
        >
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Our Technology
          </h2>
          <div className="bg-gray-800 rounded-xl p-8 shadow-xl">
            <p className="text-gray-300 mb-6">
              LuminaText is powered by OpenAI's Whisper, a state-of-the-art
              automatic speech recognition system that has been trained on
              680,000 hours of multilingual and multitask supervised data. This
              advanced model enables us to provide:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: <Globe className="h-8 w-8 text-purple-400" />,
                  title: "Multilingual Support",
                  description:
                    "Transcribe content in multiple languages with high accuracy.",
                },
                {
                  icon: <Zap className="h-8 w-8 text-purple-400" />,
                  title: "Advanced AI",
                  description:
                    "Utilizing cutting-edge deep learning models for superior results.",
                },
                {
                  icon: <FileText className="h-8 w-8 text-purple-400" />,
                  title: "Accurate Formatting",
                  description:
                    "Proper punctuation, capitalization, and paragraph structure.",
                },
              ].map((feature, index) => (
                <div key={index} className="bg-gray-700 rounded-lg p-6">
                  <div className="mb-3">{feature.icon}</div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-gray-700/50 rounded-lg">
              <p className="text-gray-300 text-sm">
                <strong className="text-purple-400">Technical Note:</strong> Our
                system uses the "small" Whisper model variant, which offers an
                excellent balance between accuracy and processing speed. The
                model processes audio in chunks, ensuring efficient handling of
                various file lengths while maintaining high transcription
                quality.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-20"
        >
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            About me
          </h2>
          <div className="flex justify-center">
            <div className="max-w-sm w-full">
              <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg">
                <img
                  src="https://i.postimg.cc/9QkzGFpT/fnd.avif"
                  alt="Purushottam"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white">
                    Purushottam Kr.
                  </h3>
                  <p className="text-purple-400 mb-3">ML & AI Engineer</p>
                  <p className="text-gray-300">
                    I'm Purushottam – a machine learning enthusiast who spends way too much time thinking about how language and AI intersect. While I nerd out over algorithms and NLP, what really gets me excited is breaking down complex tech into tools anyone can use
                    
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: <Users className="h-8 w-8 text-purple-400" />,
                title: "Accessibility",
                description:
                  "We believe in making content accessible to everyone, regardless of hearing ability or language barriers.",
              },
              {
                icon: <Award className="h-8 w-8 text-purple-400" />,
                title: "Quality",
                description:
                  "We're committed to providing the highest quality transcriptions through continuous improvement of our technology.",
              },
              {
                icon: (
                  <svg
                    className="h-8 w-8 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                ),
                title: "Privacy",
                description:
                  "We respect your data privacy and ensure that your content is processed securely and confidentially.",
              },
              {
                icon: (
                  <svg
                    className="h-8 w-8 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                ),
                title: "Innovation",
                description:
                  "We continuously explore new technologies and approaches to improve our transcription service.",
              },
            ].map((value, index) => (
              <div key={index} className="bg-gray-800 rounded-xl p-6 shadow-lg">
                <div className="flex items-start">
                  <div className="mr-4 mt-1">{value.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {value.title}
                    </h3>
                    <p className="text-gray-300">{value.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;