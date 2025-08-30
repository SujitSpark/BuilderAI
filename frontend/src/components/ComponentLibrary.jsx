// src/components/ComponentLibrary.jsx
import React from 'react';
import { Star, DollarSign, Layout, Mail, User, Database, Globe, Server, Shield, Quote, Rocket, Plus, Users, Navigation, Grid, Rows } from 'lucide-react';
import { getDefaultProps } from '../utils/getDefaultProps';

const ComponentLibrary = ({ onAddComponent, activeTab, onAddBackendComponent }) => {
  const frontendComponents = [
    { type: 'navbar', label: 'Navigation Bar', icon: Navigation, description: 'Website navigation' },
    { type: 'hero', label: 'Hero Section', icon: Layout, description: 'Main banner area' },
    { type: 'layout', label: 'Layout Block', icon: Rows, description: 'Container for arranging content' },
    { type: 'features', label: 'Features Grid', icon: Star, description: 'Showcase features' },
    { type: 'pricing', label: 'Pricing Table', icon: DollarSign, description: 'Pricing plans' },
    { type: 'form', label: 'Contact Form', icon: Mail, description: 'User contact form' },
    { type: 'testimonial', label: 'Testimonial', icon: Quote, description: 'Customer reviews' },
    { type: 'cta', label: 'Call to Action', icon: Rocket, description: 'A strong call to action' },
    { type: 'team', label: 'Team Section', icon: Users, description: 'Display your team members' },
    { type: 'footer', label: 'Footer', icon: Layout, description: 'Page footer' }
  ];

  const backendComponents = [
    { type: 'endpoint', label: 'API Endpoint', icon: Server, description: 'REST API endpoint' },
    { type: 'model', label: 'Data Model', icon: Database, description: 'Database model' },
    { type: 'auth', label: 'Authentication', icon: Shield, description: 'User authentication' }
  ];

  const components = activeTab === 'frontend' ? frontendComponents : backendComponents;

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4 overflow-y-auto">
      <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center">
        {activeTab === 'frontend' ? <Globe className="w-4 h-4 mr-2" /> : <Database className="w-4 h-4 mr-2" />}
        {activeTab === 'frontend' ? 'Frontend Components' : 'Backend Components'}
      </h3>
      
      <div className="space-y-2">
        {components.map(({ type, label, icon: Icon, description }) => (
          <div
            key={type}
            onClick={() => {
              if (activeTab === 'frontend') {
                onAddComponent(type);
              } else {
                onAddBackendComponent(type);
              }
            }}
            className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-blue-50 hover:border-blue-300 group"
          >
            <Icon className="w-5 h-5 text-gray-400 group-hover:text-blue-600 mr-3" />
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">{label}</div>
              <div className="text-xs text-gray-500">{description}</div>
            </div>
            <Plus className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
          </div>
        ))}
      </div>

      {activeTab === 'frontend' && (
        <div className="mt-6 p-3 bg-blue-50 rounded-lg">
          <h4 className="text-sm font-medium text-blue-900 mb-2">Quick Start</h4>
          <p className="text-xs text-blue-700">
            Start by adding a navbar, then a hero section. Build your page from top to bottom.
          </p>
        </div>
      )}
    </div>
  );
};

export default ComponentLibrary;