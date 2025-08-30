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
  const [screenSize, setScreenSize] = useState('desktop');

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
    setCanvasComponents(prev => {
      const updatedComponents = prev.map(comp => 
        comp.id === componentId ? { ...comp, props: { ...comp.props, ...newProps } } : comp
      );
      // Update the selected component state to reflect the latest changes
      setSelectedComponent(updatedComponents.find(comp => comp.id === componentId));
      return updatedComponents;
    });
  };
  
  const deleteComponent = (componentId) => {
    setCanvasComponents(prev => prev.filter(comp => comp.id !== componentId));
    setSelectedComponent(null);
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
        screenSize={screenSize}
        setScreenSize={setScreenSize}
        deleteComponent={deleteComponent}
        selectedComponent={selectedComponent}
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
              deleteComponent={deleteComponent}
              screenSize={screenSize}
            />
          ) : (
            <BackendPanel 
              project={project}
              setProject={setProject}
            />
          )}
        </div>

        {activeTab === 'frontend' && (
          <PropertiesPanel 
            selectedComponent={selectedComponent}
            updateComponentProps={updateComponentProps}
            deleteComponent={deleteComponent}
          />
        )}
      </div>
      
      <footer className="w-full bg-white border-t p-2 text-center text-xs text-gray-500">
        © 2025 Eleven11. All Rights Reserved.
      </footer>

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