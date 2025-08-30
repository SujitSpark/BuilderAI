import React, { useState } from 'react';
import { X, Download, Copy, Check } from 'lucide-react';
import { getHtmlCssCode, getMernStackCode } from './codeGeneration';

const CodeGenerationModal = ({ project, canvasComponents, onClose }) => {
  const [activeOutput, setActiveOutput] = useState('html');
  const [copied, setCopied] = useState(false);
  const [selectedMernFile, setSelectedMernFile] = useState('react');

  const getCodeContent = () => {
    if (activeOutput === 'html') {
      return getHtmlCssCode(project, canvasComponents);
    } else if (activeOutput === 'mern') {
      return getMernStackCode(project, canvasComponents, selectedMernFile);
    }
    return '';
  };

  const getFileName = () => {
    if (activeOutput === 'html') {
      return 'index.html';
    } else if (activeOutput === 'mern') {
      switch (selectedMernFile) {
        case 'react':
          return 'App.jsx';
        case 'express':
          return 'server.js';
        case 'package':
          return 'package.json';
      }
    }
    return 'code.txt';
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(getCodeContent());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const downloadCode = () => {
    const content = getCodeContent();
    const filename = getFileName();
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-6xl h-5/6 flex flex-col">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Generated Code - {project.name}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex border-b">
          <button
            onClick={() => setActiveOutput('html')}
            className={`px-6 py-3 font-medium ${
              activeOutput === 'html'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            HTML/CSS
          </button>
          <button
            onClick={() => setActiveOutput('mern')}
            className={`px-6 py-3 font-medium ${
              activeOutput === 'mern'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            MERN Stack
          </button>
        </div>

        {activeOutput === 'mern' && (
          <div className="flex border-b pl-4">
            {[
              { id: 'react', label: 'Frontend (React)' },
              { id: 'express', label: 'Backend (Express)' },
              { id: 'package', label: 'Package.json' }
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setSelectedMernFile(id)}
                className={`px-6 py-3 text-sm font-medium ${
                  selectedMernFile === id
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        )}

        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between p-4 bg-gray-50 border-b">
            <span className="text-sm text-gray-600">
              {getFileName()}
            </span>
            <div className="flex space-x-2">
              <button
                onClick={copyToClipboard}
                className="flex items-center space-x-1 px-3 py-1 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span className="text-sm">{copied ? 'Copied!' : 'Copy'}</span>
              </button>
              <button
                onClick={downloadCode}
                className="flex items-center space-x-1 px-3 py-1 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded"
              >
                <Download className="w-4 h-4" />
                <span className="text-sm">Download</span>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-auto">
            <pre className="p-4 text-sm font-mono bg-gray-900 text-green-400 h-full overflow-auto">
              {getCodeContent()}
            </pre>
          </div>
        </div>

        <div className="p-4 bg-gray-50 border-t">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Code generated successfully! Download or copy the files to use in your project.
            </p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeGenerationModal;