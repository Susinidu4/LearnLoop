import { useState } from 'react';
import axios from 'axios';
import { Header } from '../../components/Header';
import { SideBar } from '../../components/SideBar';

export const AddVideo = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [refreshVideos, setRefreshVideos] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      const fileName = e.target.files[0].name;
      setTitle(fileName.substring(0, fileName.lastIndexOf('.')) || fileName);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file');
      return;
    }

    if (!title.trim()) {
      setError('Please enter a title');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);

    setIsUploading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/api/videos/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-User-Id': user.id,
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(progress);
        },
      });

      // Upload success
      setFile(null);
      setTitle('');
      setUploadProgress(0);
      setRefreshVideos(prev => !prev);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Upload failed');
      console.error('Upload error:', err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
   <div>
    <Header/>
     <div className="min-h-screen bg-gray-50">
    <SideBar/>
      {/* Main Content */}
      <main className="mt-20 container mx-auto px-4 py-8">
        <div className="">
          {/* Upload Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Upload Video</h2>
            
            <div className="mb-4">
              <label htmlFor="videoFile" className="block text-sm font-medium text-gray-700 mb-2">
                Select Video File:
              </label>
              <div className="mt-1 flex items-center">
                <input
                  id="videoFile"
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  disabled={isUploading}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100
                    disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {file && (
              <>
                <div className="mb-4">
                  <label htmlFor="videoTitle" className="block text-sm font-medium text-gray-700 mb-2">
                    Video Title:
                  </label>
                  <input
                    id="videoTitle"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={isUploading}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                  />
                </div>

                <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Preview:</h4>
                  <video 
                    controls 
                    src={URL.createObjectURL(file)} 
                    className="w-full rounded-md mb-2 max-h-64 object-contain bg-black"
                  />
                  <p className="text-xs text-gray-500">
                    File: {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                  </p>
                </div>

                <button
                  onClick={handleUpload}
                  disabled={isUploading}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    isUploading
                      ? 'bg-blue-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
                  }`}
                >
                  {isUploading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Uploading... ({uploadProgress}%)
                    </span>
                  ) : (
                    'Upload Video'
                  )}
                </button>
              </>
            )}

            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            )}

            {error && (
              <div className="mt-4 p-3 text-sm text-red-700 bg-red-100 rounded-md">
                {error}
              </div>
            )}
          </div>

         
        </div>
      </main>
    </div>
   </div>
  );
};