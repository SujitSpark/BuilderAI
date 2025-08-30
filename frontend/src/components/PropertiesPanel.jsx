import React from 'react';
import { Settings, Palette, Type, Image, Plus, Minus, Layout, Columns, Trash2 } from 'lucide-react';

const PropertiesPanel = ({ selectedComponent, updateComponentProps, deleteComponent }) => {
  if (!selectedComponent) {
    return (
      <div className="w-80 bg-white border-l border-gray-200 p-4">
        <div className="text-center py-8">
          <Settings className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Component Selected</h3>
          <p className="text-gray-500">Click on a component in the canvas to edit its properties</p>
        </div>
      </div>
    );
  }

  const { type, props } = selectedComponent;

  const handleChange = (key, value) => {
    updateComponentProps(selectedComponent.id, { [key]: value });
  };

  const handleArrayAdd = (key, newItem) => {
    const currentArray = props[key] || [];
    handleChange(key, [...currentArray, newItem]);
  };

  const handleArrayRemove = (key, index) => {
    const currentArray = props[key] || [];
    handleChange(key, currentArray.filter((_, i) => i !== index));
  };

  const handleArrayUpdate = (key, index, value) => {
    const currentArray = props[key] || [];
    const updated = currentArray.map((item, i) => i === index ? value : item);
    handleChange(key, updated);
  };

  const renderPropertyEditor = () => {
    switch (type) {
      case 'layout':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Layout Type</label>
              <select
                value={props.layoutType || 'flex'}
                onChange={(e) => handleChange('layoutType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="flex">Flex</option>
                <option value="grid">Grid</option>
              </select>
            </div>
            {props.layoutType === 'flex' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Flex Direction</label>
                <select
                  value={props.flexDirection || 'flex-col'}
                  onChange={(e) => handleChange('flexDirection', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="flex-col">Column</option>
                  <option value="flex-row">Row</option>
                </select>
              </div>
            )}
            {props.layoutType === 'grid' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Grid Columns</label>
                <input
                  type="number"
                  value={props.gridCols || 1}
                  onChange={(e) => handleChange('gridCols', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  min="1"
                  max="12"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Add Content Here...</label>
              <div className="bg-gray-100 p-4 rounded-md text-gray-500 text-sm italic">
                Drag and drop other components inside this layout block to group them.
              </div>
            </div>
          </div>
        );

      case 'hero':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={props.title || ''}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
              <textarea
                value={props.subtitle || ''}
                onChange={(e) => handleChange('subtitle', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                rows="3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
              <input
                type="text"
                value={props.buttonText || ''}
                onChange={(e) => handleChange('buttonText', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Background Image</label>
              <input
                type="url"
                value={props.backgroundImage || ''}
                onChange={(e) => handleChange('backgroundImage', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                placeholder="Image URL"
              />
            </div>
          </div>
        );

      case 'navbar':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Brand Name</label>
              <input
                type="text"
                value={props.brand || ''}
                onChange={(e) => handleChange('brand', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Navigation Links</label>
              {(props.links || []).map((link, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={link}
                    onChange={(e) => handleArrayUpdate('links', index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                  <button
                    onClick={() => handleArrayRemove('links', index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => handleArrayAdd('links', 'New Link')}
                className="flex items-center space-x-1 text-blue-600 hover:bg-blue-50 px-2 py-1 rounded"
              >
                <Plus className="w-4 h-4" />
                <span className="text-sm">Add Link</span>
              </button>
            </div>
          </div>
        );

      case 'features':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
              <input
                type="text"
                value={props.title || ''}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
              {(props.items || []).map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-md p-3 mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Feature {index + 1}</span>
                    <button
                      onClick={() => handleArrayRemove('items', index)}
                      className="text-red-600 hover:bg-red-50 p-1 rounded"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={item.title || ''}
                    onChange={(e) => handleArrayUpdate('items', index, { ...item, title: e.target.value })}
                    placeholder="Feature title"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm mb-2"
                  />
                  <textarea
                    value={item.description || ''}
                    onChange={(e) => handleArrayUpdate('items', index, { ...item, description: e.target.value })}
                    placeholder="Feature description"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    rows="2"
                  />
                </div>
              ))}
              <button
                onClick={() => handleArrayAdd('items', { title: 'New Feature', description: 'Feature description', icon: 'star' })}
                className="flex items-center space-x-1 text-blue-600 hover:bg-blue-50 px-2 py-1 rounded"
              >
                <Plus className="w-4 h-4" />
                <span className="text-sm">Add Feature</span>
              </button>
            </div>
          </div>
        );

      case 'form':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Form Title</label>
              <input
                type="text"
                value={props.title || ''}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Submit Button Text</label>
              <input
                type="text"
                value={props.submitText || ''}
                onChange={(e) => handleChange('submitText', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Form Fields</label>
              <div className="space-y-2">
                {['name', 'email', 'message', 'phone'].map(field => (
                  <label key={field} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={(props.fields || []).includes(field)}
                      onChange={(e) => {
                        const currentFields = props.fields || [];
                        if (e.target.checked) {
                          handleChange('fields', [...currentFields, field]);
                        } else {
                          handleChange('fields', currentFields.filter(f => f !== field));
                        }
                      }}
                      className="rounded"
                    />
                    <span className="text-sm capitalize">{field}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 'testimonial':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={props.title || ''}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quote</label>
              <textarea
                value={props.quote || ''}
                onChange={(e) => handleChange('quote', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                rows="3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
              <input
                type="text"
                value={props.author || ''}
                onChange={(e) => handleChange('author', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <input
                type="text"
                value={props.role || ''}
                onChange={(e) => handleChange('role', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
          </div>
        );

      case 'cta':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={props.title || ''}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
              <textarea
                value={props.subtitle || ''}
                onChange={(e) => handleChange('subtitle', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                rows="2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
              <input
                type="text"
                value={props.buttonText || ''}
                onChange={(e) => handleChange('buttonText', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
          </div>
        );

      case 'team':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
              <input
                type="text"
                value={props.title || ''}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Team Members</label>
              {(props.members || []).map((member, index) => (
                <div key={index} className="border border-gray-200 rounded-md p-3 mb-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Member {index + 1}</span>
                    <button
                      onClick={() => handleArrayRemove('members', index)}
                      className="text-red-600 hover:bg-red-50 p-1 rounded"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={member.name || ''}
                    onChange={(e) => handleArrayUpdate('members', index, { ...member, name: e.target.value })}
                    placeholder="Member Name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                  <input
                    type="text"
                    value={member.role || ''}
                    onChange={(e) => handleArrayUpdate('members', index, { ...member, role: e.target.value })}
                    placeholder="Role"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                  <textarea
                    value={member.bio || ''}
                    onChange={(e) => handleArrayUpdate('members', index, { ...member, bio: e.target.value })}
                    placeholder="Bio"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    rows="2"
                  />
                  <input
                    type="url"
                    value={member.image || ''}
                    onChange={(e) => handleArrayUpdate('members', index, { ...member, image: e.target.value })}
                    placeholder="Image URL"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
              ))}
              <button
                onClick={() => handleArrayAdd('members', { name: 'New Member', role: 'Role', bio: 'Short bio', image: 'https://via.placeholder.com/150' })}
                className="flex items-center space-x-1 text-blue-600 hover:bg-blue-50 px-2 py-1 rounded"
              >
                <Plus className="w-4 h-4" />
                <span className="text-sm">Add Member</span>
              </button>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-gray-500 text-sm">
            Properties for {type} component are not yet available.
          </div>
        );
    }
  };

  return (
    <div className="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto">
      <div className="flex items-center space-x-2 mb-6">
        <Settings className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900 capitalize">{type} Properties</h3>
      </div>
      
      {selectedComponent && (
        <div className="mb-6">
          <button
            onClick={() => deleteComponent(selectedComponent.id)}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete Component</span>
          </button>
        </div>
      )}

      <div className="space-y-6">
        {renderPropertyEditor()}
      </div>
    </div>
  );
};

export default PropertiesPanel;