import { TranscriptionResult } from './api';

export interface HistoryItem {
  id: string;
  fileName: string;
  date: string;
  duration: string;
  fileSize: string;
  text: string;
  preview: string;
}

const STORAGE_KEY = 'luminatext_history';

/**
 * Save a transcription result to localStorage
 */
export const saveTranscription = (result: TranscriptionResult): void => {
  try {
    const existingHistory = getTranscriptionHistory();
    
    const historyItem: HistoryItem = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      fileName: result.fileName,
      date: result.date,
      duration: result.duration,
      fileSize: result.fileSize,
      text: result.text,
      preview: result.text.substring(0, 150) + (result.text.length > 150 ? '...' : '')
    };
    
    // Add new item at the beginning (most recent first)
    const updatedHistory = [historyItem, ...existingHistory];
    
    // Keep only the last 100 transcriptions to prevent storage bloat
    const limitedHistory = updatedHistory.slice(0, 100);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(limitedHistory));
    
    console.log('Transcription saved to history:', historyItem.fileName);
  } catch (error) {
    console.error('Error saving transcription to history:', error);
  }
};

/**
 * Get all transcription history from localStorage
 */
export const getTranscriptionHistory = (): HistoryItem[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading transcription history:', error);
    return [];
  }
};

/**
 * Delete a specific transcription from history
 */
export const deleteTranscription = (id: string): void => {
  try {
    const history = getTranscriptionHistory();
    const updatedHistory = history.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
    
    console.log('Transcription deleted from history:', id);
  } catch (error) {
    console.error('Error deleting transcription from history:', error);
  }
};

/**
 * Clear all transcription history
 */
export const clearAllHistory = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    console.log('All transcription history cleared');
  } catch (error) {
    console.error('Error clearing transcription history:', error);
  }
};

/**
 * Download transcription as text file
 */
export const downloadTranscription = (item: HistoryItem): void => {
  try {
    const element = document.createElement('a');
    const file = new Blob([item.text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${item.fileName.replace(/\.[^/.]+$/, '')}_transcript.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    console.log('Transcription downloaded:', item.fileName);
  } catch (error) {
    console.error('Error downloading transcription:', error);
  }
};