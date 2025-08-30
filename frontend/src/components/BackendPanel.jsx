import React, { useState } from 'react';
import { Database, Server, Shield, Plus, Trash2, Code } from 'lucide-react';

const BackendPanel = ({ project, setProject }) => {
  const [activeSection, setActiveSection] = useState('endpoints');

  const addEndpoint = () => {
    const newEndpoint = {
      id: Date.now().toString(),
      path: '/api/new-endpoint',
      method: 'GET',
      description: 'New endpoint description',
      parameters: [],
      response: { type: 'object', properties: {} }
    };
    
    setProject(prev => ({
      ...prev,
      backend: {
        ...prev.backend,
        endpoints: [...prev.backend.endpoints, newEndpoint]
      }
    }));
  };

  const updateEndpoint = (id, updates) => {
    setProject(prev => ({
      ...prev,
      backend: {
        ...prev.backend,
        endpoints: prev.backend.endpoints.map(ep => 
          ep.id === id ? { ...ep, ...updates } : ep
        )
      }
    }));
  };

  const deleteEndpoint = (id) => {
    setProject(prev => ({
      ...prev,
      backend: {
        ...prev.backend,
        endpoints: prev.backend.endpoints.filter(ep => ep.id !== id)
      }
    }));
  };

  const addModel = () => {
    const newModel = {
      id: Date.now().toString(),
      name: 'NewModel',
      fields: [
        { name: 'id', type: 'integer', required: true, primary: true },
        { name: 'created_at', type: 'timestamp', required: true }
      ]
    };
    
    setProject(prev => ({
      ...prev,
      backend: {
        ...prev.backend,
        models: [...prev.backend.models, newModel]
      }
    }));
  };

  const updateModel = (id, updates) => {
    setProject(prev => ({
      ...prev,
      backend: {
        ...prev.backend,
        models: prev.backend.models.map(model => 
          model.id === id ? { ...model, ...updates } : model
        )
      }
    }));
  };

  const deleteModel = (id) => {
    setProject(prev => ({
      ...prev,
      backend: {
        ...prev.backend,
        models: prev.backend.models.filter(model => model.id !== id)
      }
    }));
  };

  const updateAuth = (updates) => {
    setProject(prev => ({
      ...prev,
      backend: {
        ...prev.backend,
        auth: { ...prev.backend.auth, ...updates }
      }
    }));
  };

  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Backend Configuration</h2>
          <p className="text-gray-600">Configure your API endpoints, database models, and authentication.</p>
        </div>

        <div className="flex space-x-1 mb-6 bg-white rounded-lg p-1 border">
          {[
            { id: 'endpoints', label: 'API Endpoints', icon: Server },
            { id: 'models', label: 'Data Models', icon: Database },
            { id: 'auth', label: 'Authentication', icon: Shield }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveSection(id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium ${
                activeSection === id
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {activeSection === 'endpoints' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">API Endpoints</h3>
              <button
                onClick={addEndpoint}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Plus className="w-4 h-4" />
                <span>Add Endpoint</span>
              </button>
            </div>

            {project.backend.endpoints.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
                <Server className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">No endpoints configured</h4>
                <p className="text-gray-500 mb-4">Add your first API endpoint to get started</p>
                <button
                  onClick={addEndpoint}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Add Your First Endpoint
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {project.backend.endpoints.map((endpoint) => (
                  <div key={endpoint.id} className="bg-white p-6 rounded-lg border">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 text-xs font-semibold rounded ${
                          endpoint.method === 'GET' ? 'bg-green-100 text-green-800' :
                          endpoint.method === 'POST' ? 'bg-blue-100 text-blue-800' :
                          endpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {endpoint.method}
                        </span>
                        <input
                          type="text"
                          value={endpoint.path}
                          onChange={(e) => updateEndpoint(endpoint.id, { path: e.target.value })}
                          className="text-lg font-mono bg-gray-50 px-2 py-1 rounded border"
                        />
                      </div>
                      <button
                        onClick={() => deleteEndpoint(endpoint.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">HTTP Method</label>
                        <select
                          value={endpoint.method}
                          onChange={(e) => updateEndpoint(endpoint.id, { method: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        >
                          <option value="GET">GET</option>
                          <option value="POST">POST</option>
                          <option value="PUT">PUT</option>
                          <option value="DELETE">DELETE</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <input
                          type="text"
                          value={endpoint.description}
                          onChange={(e) => updateEndpoint(endpoint.id, { description: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          placeholder="Endpoint description"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeSection === 'models' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Database Models</h3>
              <button
                onClick={addModel}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Plus className="w-4 h-4" />
                <span>Add Model</span>
              </button>
            </div>

            {project.backend.models.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
                <Database className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">No models configured</h4>
                <p className="text-gray-500 mb-4">Define your data structure with database models</p>
                <button
                  onClick={addModel}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Create Your First Model
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {project.backend.models.map((model) => (
                  <div key={model.id} className="bg-white p-6 rounded-lg border">
                    <div className="flex items-center justify-between mb-4">
                      <input
                        type="text"
                        value={model.name}
                        onChange={(e) => updateModel(model.id, { name: e.target.value })}
                        className="text-lg font-semibold bg-gray-50 px-2 py-1 rounded border"
                      />
                      <button
                        onClick={() => deleteModel(model.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900">Fields</h4>
                      {model.fields.map((field, index) => (
                        <div key={index} className="grid grid-cols-3 gap-3 p-3 bg-gray-50 rounded">
                          <input
                            type="text"
                            value={field.name}
                            onChange={(e) => {
                              const updatedFields = model.fields.map((f, i) => 
                                i === index ? { ...f, name: e.target.value } : f
                              );
                              updateModel(model.id, { fields: updatedFields });
                            }}
                            className="px-2 py-1 border border-gray-300 rounded text-sm"
                            placeholder="Field name"
                          />
                          <select
                            value={field.type}
                            onChange={(e) => {
                              const updatedFields = model.fields.map((f, i) => 
                                i === index ? { ...f, type: e.target.value } : f
                              );
                              updateModel(model.id, { fields: updatedFields });
                            }}
                            className="px-2 py-1 border border-gray-300 rounded text-sm"
                          >
                            <option value="string">String</option>
                            <option value="integer">Integer</option>
                            <option value="boolean">Boolean</option>
                            <option value="timestamp">Timestamp</option>
                            <option value="text">Text</option>
                          </select>
                          <div className="flex items-center space-x-2">
                            <label className="text-xs text-gray-600">Required</label>
                            <input
                              type="checkbox"
                              checked={field.required}
                              onChange={(e) => {
                                const updatedFields = model.fields.map((f, i) => 
                                  i === index ? { ...f, required: e.target.checked } : f
                                );
                                updateModel(model.id, { fields: updatedFields });
                              }}
                              className="rounded"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeSection === 'auth' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Authentication Configuration</h3>
            
            <div className="bg-white p-6 rounded-lg border">
              <div className="flex items-center justify-between mb-4">
                <label className="text-base font-medium text-gray-900">Enable Authentication</label>
                <input
                  type="checkbox"
                  checked={project.backend.auth.enabled}
                  onChange={(e) => updateAuth({ enabled: e.target.checked })}
                  className="rounded"
                />
              </div>
              
              {project.backend.auth.enabled && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Authentication Methods</label>
                    <div className="space-y-2">
                      {['email', 'google', 'github', 'facebook'].map(method => (
                        <label key={method} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={(project.backend.auth.methods || []).includes(method)}
                            onChange={(e) => {
                              const currentMethods = project.backend.auth.methods || [];
                              if (e.target.checked) {
                                updateAuth({ methods: [...currentMethods, method] });
                              } else {
                                updateAuth({ methods: currentMethods.filter(m => m !== method) });
                              }
                            }}
                            className="rounded"
                          />
                          <span className="text-sm capitalize">{method} {method !== 'email' && 'OAuth'}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">JWT Secret</label>
                      <input
                        type="text"
                        value={project.backend.auth.jwtSecret || ''}
                        onChange={(e) => updateAuth({ jwtSecret: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="Your JWT secret"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Session Duration (hours)</label>
                      <input
                        type="number"
                        value={project.backend.auth.sessionDuration || 24}
                        onChange={(e) => updateAuth({ sessionDuration: parseInt(e.target.value) })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BackendPanel;
