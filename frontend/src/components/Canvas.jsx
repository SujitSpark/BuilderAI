import React from 'react';
import ComponentRenderer from './ComponentRenderer';
import { Trash2 } from 'lucide-react';

// Use React.memo for performance optimization.
const MemoizedComponentRenderer = React.memo(ComponentRenderer);

const Canvas = ({ components, selectedComponent, setSelectedComponent, updateComponentProps, deleteComponent, screenSize }) => {
  const getScreenClass = () => {
    switch (screenSize) {
      case 'tablet':
        return 'w-[768px] mx-auto scale-[0.8] md:scale-100';
      case 'desktop':
      default:
        return 'w-full';
    }
  };

  return (
    <div className="flex-1 bg-gray-100 overflow-auto flex justify-center p-4">
      <div className={`min-h-full bg-white shadow-xl transition-all duration-300 transform origin-top ${getScreenClass()}`}>
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
          <div className="min-h-full">
            {components.map((component) => (
              <div
                key={component.id}
                onClick={() => setSelectedComponent(component)}
                className={`relative group ${
                  selectedComponent?.id === component.id ? 'ring-2 ring-blue-500' : ''
                } hover:ring-2 hover:ring-blue-300 cursor-pointer`}
              >
                <MemoizedComponentRenderer 
                  component={component}
                  updateProps={(newProps) => updateComponentProps(component.id, newProps)}
                />
                {selectedComponent?.id === component.id && (
                  <div className="absolute top-2 right-2 flex items-center space-x-2">
                    <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs">
                      {component.type}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteComponent(component.id);
                      }}
                      className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
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