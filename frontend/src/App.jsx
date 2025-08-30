import React, { useState } from 'react';
import { Bot } from 'lucide-react';
import TopNav from './components/TopNav';
import ComponentLibrary from './components/ComponentLibrary';
import Canvas from './components/Canvas';
import PropertiesPanel from './components/PropertiesPanel';
import BackendPanel from './components/BackendPanel';
import GeminiModal from './components/GeminiModal';
import CodeGenerationModal from './utils/CodeGenerationModal';
import DeploymentModal from './components/DeploymentModal';
import { getDefaultProps } from './utils/getDefaultProps';

function App() {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [canvasComponents, setCanvasComponents] = useState([]);
  const [activeTab, setActiveTab] = useState('frontend');
  const [project, setProject] = useState({
    name: 'My Website',
    components: [],
    backend: {
      endpoints: [],
      models: [],
      auth: { enabled: false, methods: [] }
    }
  });
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [showDeployModal, setShowDeployModal] = useState(false);
  const [showGeminiModal, setShowGeminiModal] = useState(false);

  const addComponentToCanvas = (componentType) => {
    const newComponent = {
      id: Date.now().toString(),
      type: componentType,
      props: getDefaultProps(componentType),
      position: { x: 0, y: canvasComponents.length * 100 }
    };
    setCanvasComponents(prev => [...prev, newComponent]);
  };

  const updateComponentProps = (componentId, newProps) => {
    setCanvasComponents(prev => 
      prev.map(comp => 
        comp.id === componentId ? { ...comp, props: { ...comp.props, ...newProps } } : comp
      )
    );
  };
  
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <TopNav 
        project={project} 
        setProject={setProject}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        canvasComponents={canvasComponents}
        setShowCodeModal={setShowCodeModal}
        setShowDeployModal={setShowDeployModal}
        setShowGeminiModal={setShowGeminiModal}
      />
      
      <div className="flex-1 flex overflow-hidden">
        <ComponentLibrary 
          onAddComponent={addComponentToCanvas}
          activeTab={activeTab}
        />
        
        <div className="flex-1 flex">
          {activeTab === 'frontend' ? (
            <Canvas 
              components={canvasComponents}
              selectedComponent={selectedComponent}
              setSelectedComponent={setSelectedComponent}
              updateComponentProps={updateComponentProps}
            />
          ) : (
            <div className="flex-1 bg-gray-100 overflow-auto flex items-center justify-center">
              <div className="text-center">
                <Bot className="w-20 h-20 text-gray-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900">Chat with Gemini to build your Backend</h3>
                <p className="text-gray-500 max-w-sm mt-2">
                  Describe the APIs and data models you need, or choose from our pre-defined add-ons.
                </p>
                <button
                  onClick={() => setShowGeminiModal(true)}
                  className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Start a new chat
                </button>
              </div>
            </div>
          )}
        </div>

        {activeTab === 'frontend' && (
          <PropertiesPanel 
            selectedComponent={selectedComponent}
            updateComponentProps={updateComponentProps}
          />
        )}
      </div>

      {showCodeModal && (
        <CodeGenerationModal 
          project={project}
          canvasComponents={canvasComponents}
          onClose={() => setShowCodeModal(false)}
        />
      )}

      {showDeployModal && (
        <DeploymentModal 
          project={project}
          onClose={() => setShowDeployModal(false)}
        />
      )}

      {showGeminiModal && (
        <GeminiModal
          onClose={() => setShowGeminiModal(false)}
          onGenerateMern={() => {}}
          project={project}
        />
      )}
    </div>
  );
}

export default App;