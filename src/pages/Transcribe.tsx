import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { FileAudio, FileVideo, Upload, Download, Copy, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { transcribeFile, TranscriptionResult } from '../services/api';
import { saveTranscription } from '../services/historyService';

const Transcribe = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [transcriptionResult, setTranscriptionResult] = useState<TranscriptionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    setIsUploading(true);
    setError(null);
    setTranscriptionResult(null);

    try {
      const result = await transcribeFile(file);
      setTranscriptionResult(result);
      
      // Save to history
      saveTranscription(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during transcription');
    } finally {
      setIsUploading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/*': ['.mp3', '.wav', '.m4a', '.aac', '.ogg', '.opus'],
      'video/*': ['.mp4', '.avi', '.mov', '.wmv', '.flv', '.webm', '.3gp']
    },
    maxSize: 25 * 1024 * 1024, // 25MB
    multiple: false
  });

  const handleCopyText = () => {
    if (transcriptionResult?.text) {
      navigator.clipboard.writeText(transcriptionResult.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (!transcriptionResult) return;

    const element = document.createElement('a');
    const file = new Blob([transcriptionResult.text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${transcriptionResult.fileName}_transcript.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Transcribe Your Media
            </span>
          </h1>
          <p className="text-gray-300 text-center mb-8 text-lg">
            Transform your audio and video files into text with our AI-powered transcription service.
          </p>
        </motion.div>

        {/* Upload Section */}
        <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden mb-8">
          <div className="p-8 md:p-12">
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 cursor-pointer ${
                isDragActive
                  ? 'border-purple-400 bg-purple-900/20'
                  : 'border-gray-600 hover:border-purple-400 hover:bg-purple-900/10'
              }`}
            >
              <input {...getInputProps()} />
              
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="w-16 h-16 bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                {isUploading ? (
                  <Loader2 className="h-8 w-8 text-purple-400 animate-spin" />
                ) : (
                  <Upload className="h-8 w-8 text-purple-400" />
                )}
              </motion.div>

              {isUploading ? (
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Processing your file...</h3>
                  <p className="text-gray-300">This may take a few minutes depending on file size</p>
                </div>
              ) : (
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {isDragActive ? 'Drop your file here' : 'Upload Audio or Video File'}
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Drag & drop or click to select • Max 25MB
                  </p>
                  <div className="flex justify-center space-x-4 text-sm text-gray-400">
                    <span className="flex items-center">
                      <FileAudio className="h-4 w-4 mr-1" />
                      MP3, WAV, M4A
                    </span>
                    <span className="flex items-center">
                      <FileVideo className="h-4 w-4 mr-1" />
                      MP4, AVI, MOV
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Error Section */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-900/20 border border-red-500/30 rounded-xl p-6 mb-8"
          >
            <div className="flex items-center space-x-3">
              <AlertCircle className="h-6 w-6 text-red-400" />
              <div>
                <h3 className="text-red-400 font-semibold">Transcription Failed</h3>
                <p className="text-gray-300">{error}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Results Section */}
        {transcriptionResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 rounded-xl shadow-xl overflow-hidden"
          >
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <CheckCircle className="h-6 w-6 text-green-400" />
                <h3 className="text-xl font-semibold text-white">Transcription Complete</h3>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-400">File</p>
                  <p className="text-white font-medium">{transcriptionResult.fileName}</p>
                </div>
                <div>
                  <p className="text-gray-400">Duration</p>
                  <p className="text-white font-medium">{transcriptionResult.duration}</p>
                </div>
                <div>
                  <p className="text-gray-400">Size</p>
                  <p className="text-white font-medium">{transcriptionResult.fileSize}</p>
                </div>
                <div>
                  <p className="text-gray-400">Date</p>
                  <p className="text-white font-medium">
                    {new Date(transcriptionResult.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-semibold text-white">Transcript</h4>
                <div className="flex space-x-2">
                  <button
                    onClick={handleCopyText}
                    className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                  >
                    {copied ? (
                      <>
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        <span className="text-sm">Copy</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleDownload}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <Download className="h-4 w-4" />
                    <span className="text-sm">Download</span>
                  </button>
                </div>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-4 max-h-64 overflow-y-auto">
                <p className="text-gray-100 leading-relaxed whitespace-pre-wrap">
                  {transcriptionResult.text}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Feature Info Section */}
        {!transcriptionResult && !isUploading && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-3">Supported Formats</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <FileAudio className="h-5 w-5 text-purple-400 mr-2" />
                  Audio: MP3, WAV, M4A, AAC, OGG, OPUS
                </li>
                <li className="flex items-center">
                  <FileVideo className="h-5 w-5 text-purple-400 mr-2" />
                  Video: MP4, AVI, MOV, WMV, FLV, WEBM
                </li>
                <li className="flex items-center">
                  <Upload className="h-5 w-5 text-purple-400 mr-2" />
                  Maximum file size: 25MB
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-3">Features</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                  AI-powered high accuracy transcription
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                  Fast processing with real-time updates
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                  Download transcript as text file
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                  Secure processing - files not stored
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Transcribe;