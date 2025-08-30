import React from 'react';
import { X } from 'lucide-react';

const BackendImageModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-semibold mb-4">Backend Visualization</h2>
        <div className="bg-gray-100 p-8 rounded-lg text-center">
          <img src="https://via.placeholder.com/800x600.png?text=AI+Generated+Backend+Diagram" alt="AI Generated Backend Diagram" className="mx-auto" />
          <p className="text-gray-500 mt-4 text-sm">
            This is a simulated AI-generated diagram showing your API endpoints, data models, and relationships.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BackendImageModal;