import React from 'react';
import ComponentRenderer from './ComponentRenderer';

const Canvas = ({ components, selectedComponent, setSelectedComponent, updateComponentProps }) => {
  return (
    <div className="flex-1 bg-gray-100 overflow-auto">
      <div className="min-h-full">
        {components.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Start Building Your Website</h3>
              <p className="text-gray-500 mb-4">Add components from the sidebar to get started</p>
              <div className="text-sm text-gray-400">
                Try adding a navbar or hero section first
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white min-h-full">
            {components.map((component) => (
              <div
                key={component.id}
                onClick={() => setSelectedComponent(component)}
                className={`relative ${
                  selectedComponent?.id === component.id ? 'ring-2 ring-blue-500' : ''
                } hover:ring-2 hover:ring-blue-300 cursor-pointer`}
              >
                <ComponentRenderer 
                  component={component}
                  updateProps={(newProps) => updateComponentProps(component.id, newProps)}
                />
                {selectedComponent?.id === component.id && (
                  <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded text-xs">
                    {component.type}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Canvas;
