import React from 'react';
import { Play, Download, Settings, Code, Database, Globe, Bot } from 'lucide-react';
import CodeGenerationModal from '../utils/CodeGenerationModal';
import DeploymentModal from './DeploymentModal';
import GeminiModal from './GeminiModal';


const TopNav = ({ project, setProject, activeTab, setActiveTab, canvasComponents, setShowCodeModal, setShowDeployModal, setShowGeminiModal }) => {
  
  const handleProjectNameChange = (e) => {
    setProject(prev => ({ ...prev, name: e.target.value }));
  };

  const handlePublish = () => {
    setShowCodeModal(true);
  };

  return (
    <>
      <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Code className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">Eleven11</span>
          </div>
          
          <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('frontend')}
              className={`px-3 py-1 rounded-md text-sm font-medium flex items-center space-x-1 ${
                activeTab === 'frontend' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>Frontend</span>
            </button>
            <button
              onClick={() => setActiveTab('backend')}
              className={`px-3 py-1 rounded-md text-sm font-medium flex items-center space-x-1 ${
                activeTab === 'backend' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Database className="w-4 h-4" />
              <span>Backend</span>
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={project.name}
            onChange={handleProjectNameChange}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Project name"
          />
          
          <button className="flex items-center space-x-1 px-3 py-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md">
            <Settings className="w-4 h-4" />
            <span className="text-sm">Settings</span>
          </button>

          {activeTab === 'backend' ? (
            <button
              onClick={() => setShowGeminiModal(true)}
              className="flex items-center space-x-1 px-4 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Bot className="w-4 h-4" />
              <span className="text-sm">Chat with Gemini</span>
            </button>
          ) : (
            <button
              onClick={handlePublish}
              className="flex items-center space-x-1 px-4 py-1.5 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              <Download className="w-4 h-4" />
              <span className="text-sm">Publish</span>
            </button>
          )}
          
          <button 
            onClick={() => setShowDeployModal(true)}
            className="flex items-center space-x-1 px-4 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Play className="w-4 h-4" />
            <span className="text-sm">Deploy Project</span>
          </button>
        </div>
      </nav>
    </>
  );
};

export default TopNav;