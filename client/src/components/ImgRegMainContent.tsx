import React, { useState } from 'react';
import { Button } from "./Button";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogFooter } from './AlertDialog';

const ImageRecognizer = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [recognitionResult, setRecognitionResult] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>('');

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleImageReset = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    setRecognitionResult(null);
    setConfidence(null);
    setImageUrl(''); 
  };

  const handleSubmit = () => {

    if (!selectedImage && !imageUrl) {
      console.error('No image selected or URL provided');
      return;
    }
    
    setRecognitionResult("Dog"); 
    setConfidence(90); 
  };

  const openUploadDialog = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = (source: string) => {
    setOpenDialog(false);
    if (source === "local") {
      document.getElementById('file-input')?.click(); 
    } else if (source === "online-url") {
      if (imageUrl) {
        setPreviewUrl(imageUrl); 
      }
    }
  };

  const getProgressBarColor = (confidence: number) => {
    if (confidence >= 80) {
      return 'bg-green-500'; 
    } else if (confidence >= 50) {
      return 'bg-yellow-500'; 
    } else {
      return 'bg-red-500'; 
    }
  };

  return (
    <div className="flex flex-row p-8 space-x-8">
      <div className="flex flex-col items-start w-1/2">
        <h1 className="text-3xl font-bold text-blue-900 mb-4">Upload an Image</h1>
        <div className="flex items-center mb-4 border border-blue-300 rounded-md bg-blue-50 p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-blue-900 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v3a2.5 2.5 0 002.5 2.5h13a2.5 2.5 0 002.5-2.5v-3m-4-6.5l-4-4m0 0l-4 4m4-4v12" />
          </svg>
          <Button
            variant="link"
            onClick={openUploadDialog}
            className="flex-1 p-2 outline-none bg-transparent"
          >
            Upload Image
          </Button>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        {previewUrl && (
          <div className="flex flex-col items-center mt-4">
            <h2 className="text-lg font-semibold text-blue-900 mb-2">Image Preview:</h2>
            <img
              src={previewUrl}
              alt="Preview"
              className="w-64 h-auto border border-blue-300 rounded-md shadow-md"
            />
            <Button
              onClick={handleSubmit}
              className="mt-4 w-40 bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-blue-700 transition-colors"
            >
              Submit
            </Button>
            <Button
              onClick={handleImageReset}
              className="mt-2 w-40 bg-gray-600 text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-gray-700 transition-colors"
            >
              Reset Image
            </Button>
          </div>
        )}
      </div>


      <div className="flex flex-col items-start w-1/2">
        <h2 className="text-2xl font-semibold text-blue-900 mb-2">Image Recognition</h2>
        <p className="text-lg text-gray-700 mb-4">
          {recognitionResult || "No recognition yet."}
        </p>
        <h2 className="text-2xl font-semibold text-blue-900 mb-2">Confidence</h2>

        {confidence !== null ? (
          <div className="w-full bg-gray-200 rounded-full h-6 mt-4 relative">
            <div
              className={`h-6 rounded-full ${getProgressBarColor(confidence)}`}
              style={{ width: `${confidence}%` }}
            ></div>
            <span className="absolute inset-0 flex justify-center items-center text-white font-medium">
              {confidence}%
            </span>
          </div>
        ) : (
          <p className="text-lg text-gray-700">No confidence data.</p>
        )}
      </div>

      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>Select Upload Source</AlertDialogHeader>
          <div className="space-y-4">
            <Button onClick={() => handleDialogClose("local")} className="w-full">Local File</Button>
            <Button onClick={() => handleDialogClose("google-drive")} className="w-full">Google Drive</Button>
            <Button onClick={() => handleDialogClose("online-url")} className="w-full">Fetch Image from URL</Button>
          </div>
          <div className="mt-4">
            {openDialog && (
              <input
                type="text"
                placeholder="Enter image URL"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="border border-blue-300 rounded-md p-2 w-full"
              />
            )}
          </div>
          <AlertDialogFooter>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ImageRecognizer;
