import axios from 'axios';

// Replace this URL with your deployed Vercel backend URL
const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://luminatext-backend-itds.vercel.app/' 
  : 'http://localhost:3001';

export interface TranscriptionResult {
  text: string;
  fileName: string;
  duration: string;
  fileSize: string;
  date: string;
}

export const transcribeFile = async (file: File): Promise<TranscriptionResult> => {
  const formData = new FormData();
  formData.append('file', file);
  
  try {
    const response = await axios.post(`${API_URL}/api/transcribe`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      // Add timeout and max size validation
      timeout: 300000, // 5 minutes
      maxContentLength: 25 * 1024 * 1024, // 25MB
    });
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 413) {
        throw new Error('File size exceeds 25MB limit');
      }
      throw new Error(error.response?.data?.detail || 'Error transcribing file');
    }
    throw error;
  }
};

// Health check function
export const checkApiHealth = async (): Promise<boolean> => {
  try {
    const response = await axios.get(`${API_URL}/api/health`);
    return response.data.status === 'healthy';
  } catch (error) {
    return false;
  }
};
