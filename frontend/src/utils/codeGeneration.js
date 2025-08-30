export const getHtmlCssCode = (project, canvasComponents) => {
  let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${project.name}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
</head>
<body>
`;
  canvasComponents.forEach(component => {
    switch (component.type) {
      case 'layout':
        const layoutClass = component.props.layoutType === 'flex'
          ? `${component.props.flexDirection}`
          : `grid grid-cols-${component.props.gridCols} gap-4`;
        html += `
    <div class="p-4 ${layoutClass}">
        </div>`;
        break;
      case 'navbar':
        html += `
    <nav class="bg-white shadow-sm border-b">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <div class="text-xl font-bold text-gray-900">${component.props.brand}</div>
                <div class="hidden md:flex space-x-8">
                    ${component.props.links.map(link => `<a href="#" class="text-gray-700 hover:text-blue-600">${link}</a>`).join('\n                    ')}
                </div>
            </div>
        </div>
    </nav>`;
          break;
        case 'hero':
          html += `
    <div class="relative bg-gray-900 text-white">
        <div class="absolute inset-0 bg-cover bg-center opacity-50" style="background-image: url('${component.props.backgroundImage}')"></div>
        <div class="relative max-w-7xl mx-auto px-4 py-24 sm:py-32">
            <div class="text-center">
                <h1 class="text-4xl md:text-6xl font-bold mb-6">${component.props.title}</h1>
                <p class="text-xl md:text-2xl mb-8 text-gray-300">${component.props.subtitle}</p>
                <button class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold">
                    ${component.props.buttonText}
                </button>
            </div>
        </div>
    </div>`;
          break;
        case 'features':
          html += `
    <div class="py-16 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4">
            <div class="text-center mb-12">
                <h2 class="text-3xl font-bold text-gray-900">${component.props.title}</h2>
            </div>
            <div class="grid md:grid-cols-3 gap-8">
                ${component.props.items.map(item => `
                <div class="text-center p-6 bg-white rounded-lg shadow-sm">
                    <div class="w-12 h-12 text-blue-600 mx-auto mb-4">[${item.icon}]</div>
                    <h3 class="text-xl font-semibold mb-2">${item.title}</h3>
                    <p class="text-gray-600">${item.description}</p>
                </div>`).join('')}
            </div>
        </div>
    </div>`;
          break;
        case 'form':
          html += `
    <div class="py-16 bg-gray-50">
        <div class="max-w-2xl mx-auto px-4">
            <div class="text-center mb-8">
                <h2 class="text-3xl font-bold text-gray-900">${component.props.title}</h2>
            </div>
            <form class="bg-white p-8 rounded-lg shadow-sm">
                ${component.props.fields.includes('name') ? '<div class="mb-4"><label class="block text-sm font-medium text-gray-700 mb-2">Name</label><input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md" /></div>' : ''}
                ${component.props.fields.includes('email') ? '<div class="mb-4"><label class="block text-sm font-medium text-gray-700 mb-2">Email</label><input type="email" class="w-full px-3 py-2 border border-gray-300 rounded-md" /></div>' : ''}
                ${component.props.fields.includes('message') ? '<div class="mb-6"><label class="block text-sm font-medium text-gray-700 mb-2">Message</label><textarea rows="4" class="w-full px-3 py-2 border border-gray-300 rounded-md"></textarea></div>' : ''}
                <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                    ${component.props.submitText}
                </button>
            </form>
        </div>
    </div>`;
          break;
        case 'footer':
          html += `
    <footer class="bg-gray-900 text-white py-12">
        <div class="max-w-7xl mx-auto px-4">
            <div class="grid md:grid-cols-3 gap-8">
                <div>
                    <div class="text-xl font-bold mb-4">${component.props.brand}</div>
                    <p class="text-gray-400">Building amazing experiences for the web.</p>
                </div>
                <div>
                    <h4 class="font-semibold mb-4">Quick Links</h4>
                    <ul class="space-y-2">
                        ${component.props.links.map(link => `<li><a href="#" class="text-gray-400 hover:text-white">${link}</a></li>`).join('')}
                    </ul>
                </div>
                <div>
                    <h4 class="font-semibold mb-4">Follow Us</h4>
                    <div class="flex space-x-4">
                        ${component.props.social.map(social => `<span class="text-gray-400 hover:text-white cursor-pointer">[${social}]</span>`).join('')}
                    </div>
                </div>
            </div>
        </div>
    </footer>`;
          break;
      }
    });
    html += `
</body>
</html>`;
    return html;
  };
  
  export const getMernStackCode = (project, components, fileType) => {
    const reactCode = `// frontend/src/App.jsx
import React from 'react';
import './App.css';
// Your visually designed components would be imported here.

export default function App() {
  return (
    <div>
      {/* React components generated from the visual canvas go here */}
      <h1>${project.name}</h1>
      <p>This is a MERN Stack frontend generated by WebBuilder Pro.</p>
    </div>
  );
}
`;
  
    const expressCode = `// backend/server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
  
app.use(cors());
app.use(express.json());
  
app.get('/', (req, res) => {
  res.send('MERN Stack backend is running!');
});
  
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    console.log('Received contact form submission:', req.body);
    res.status(200).json({ message: 'Form submitted successfully!' });
});
  
app.listen(PORT, () => {
  console.log(\`Server is running on http://localhost:\${PORT}\`);
});
`;
  
    const packageJson = `{
  "name": "${project.name.toLowerCase().replace(/\s/g, '-')}-mern",
  "version": "1.0.0",
  "description": "A MERN stack project generated by WebBuilder Pro.",
  "main": "server.js",
  "scripts": {
    "start": "node backend/server.js",
    "build": "cd frontend && npm install && npm run build",
    "dev": "concurrently \\"npm run start\\" \\"npm start --prefix frontend\\""
  },
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.19.2",
    "mongoose": "^8.4.3"
  },
  "devDependencies": {
    "concurrently": "^8.2.2"
  }
}`;
  
    switch (fileType) {
      case 'react':
        return reactCode;
      case 'express':
        return expressCode;
      case 'package':
        return packageJson;
      default:
        return '';
    }
  };