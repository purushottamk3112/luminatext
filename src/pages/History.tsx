import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Trash2, Search, RefreshCw } from 'lucide-react';
import { getTranscriptionHistory, deleteTranscription, downloadTranscription, HistoryItem } from '../services/historyService';

const History = () => {
  const [transcriptions, setTranscriptions] = useState<HistoryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTranscription, setSelectedTranscription] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Load transcriptions from localStorage on component mount
  useEffect(() => {
    loadTranscriptions();
  }, []);

  const loadTranscriptions = () => {
    setLoading(true);
    const history = getTranscriptionHistory();
    setTranscriptions(history);
    setLoading(false);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredTranscriptions = transcriptions.filter(
    (item) => 
      item.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.preview.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    deleteTranscription(id);
    loadTranscriptions(); // Reload from localStorage
    if (selectedTranscription === id) {
      setSelectedTranscription(null);
    }
  };

  const handleDownload = (item: HistoryItem) => {
    downloadTranscription(item);
  };

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <h1 className="text-3xl md:text-4xl font-bold">
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Your Transcription History
              </span>
            </h1>
            <button
              onClick={loadTranscriptions}
              className="ml-4 p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              title="Refresh history"
            >
              <RefreshCw className="h-5 w-5 text-gray-300" />
            </button>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Access and manage all your previous transcriptions ({transcriptions.length} total)
          </p>
        </motion.div>
        
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Search transcriptions by filename or content..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
        
        {/* Transcription List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* List Panel */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 bg-gray-700">
                <h2 className="text-lg font-semibold text-white">Recent Transcriptions</h2>
              </div>
              
              <div className="divide-y divide-gray-700">
                {loading ? (
                  <div className="p-8 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto mb-2"></div>
                    <p className="text-gray-400">Loading transcriptions...</p>
                  </div>
                ) : filteredTranscriptions.length > 0 ? (
                  filteredTranscriptions.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className={`p-4 cursor-pointer transition-colors ${
                        selectedTranscription === item.id 
                          ? 'bg-purple-900/30 border-l-4 border-purple-500' 
                          : 'hover:bg-gray-700/50'
                      }`}
                      onClick={() => setSelectedTranscription(item.id)}
                    >
                      <div className="flex items-start">
                        <FileText className={`h-5 w-5 mr-3 mt-1 ${
                          item.fileName.includes('.mp3') || item.fileName.includes('.wav') || item.fileName.includes('.m4a')
                            ? 'text-blue-400' 
                            : 'text-green-400'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white truncate">
                            {item.fileName}
                          </p>
                          <p className="text-xs text-gray-400">
                            {new Date(item.date).toLocaleDateString()} • {item.duration} • {item.fileSize}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <p className="text-gray-400">
                      {searchTerm ? 'No transcriptions match your search' : 'No transcriptions found'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Detail Panel */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-xl shadow-lg h-full">
              {selectedTranscription ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 h-full flex flex-col"
                >
                  {(() => {
                    const selected = transcriptions.find(t => t.id === selectedTranscription);
                    if (!selected) return null;
                    
                    return (
                      <>
                        <div className="flex justify-between items-start mb-6">
                          <div>
                            <h2 className="text-xl font-semibold text-white mb-1">
                              {selected.fileName}
                            </h2>
                            <p className="text-sm text-gray-400">
                              Transcribed on {selected.date} • {selected.duration} • {selected.fileSize}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <button 
                              className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                              onClick={() => handleDownload(selected)}
                              title="Download transcript"
                            >
                              <Download className="h-5 w-5 text-gray-300" />
                            </button>
                            <button 
                              className="p-2 bg-gray-700 hover:bg-red-600 rounded-lg transition-colors"
                              onClick={() => handleDelete(selected.id)}
                              title="Delete transcription"
                            >
                              <Trash2 className="h-5 w-5 text-gray-300" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="flex-grow bg-gray-900 rounded-lg p-4 overflow-y-auto">
                          <p className="text-gray-100 leading-relaxed whitespace-pre-wrap">
                            {selected.text}
                          </p>
                        </div>
                      </>
                    );
                  })()}
                </motion.div>
              ) : (
                <div className="flex items-center justify-center h-full p-8">
                  <div className="text-center">
                    <FileText className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl font-medium text-gray-400 mb-2">No Transcription Selected</h3>
                    <p className="text-gray-500">
                      Select a transcription from the list to view its details
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Empty State */}
        {transcriptions.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 bg-gray-800 rounded-xl p-12 text-center"
          >
            <FileText className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-300 mb-2">No Transcriptions Yet</h3>
            <p className="text-gray-400 mb-6">
              You haven't created any transcriptions yet. Start by uploading an audio or video file.
            </p>
            <a 
              href="/transcribe" 
              className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium transition-colors"
            >
              Create Your First Transcription
              <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default History;