import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Loader } from 'lucide-react';

const DeploymentModal = ({ project, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [deploymentStatus, setDeploymentStatus] = useState('deploying'); // 'deploying', 'success', 'error'

  const deploymentSteps = [
    { label: 'Preparing build environment', duration: 2000 },
    { label: 'Installing dependencies', duration: 3000 },
    { label: 'Building frontend assets', duration: 2500 },
    { label: 'Setting up backend services', duration: 2000 },
    { label: 'Configuring database', duration: 1500 },
    { label: 'Running security checks', duration: 1800 },
    { label: 'Deploying to production', duration: 2200 },
    { label: 'Verifying deployment', duration: 1000 }
  ];

  useEffect(() => {
    if (currentStep < deploymentSteps.length) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, deploymentSteps[currentStep]?.duration || 1000);

      return () => clearTimeout(timer);
    } else {
      // Simulate random success/failure (90% success rate)
      const success = Math.random() > 0.1;
      setDeploymentStatus(success ? 'success' : 'error');
    }
  }, [currentStep]);

  const generateDeploymentUrl = () => {
    const subdomain = project.name.toLowerCase().replace(/\s+/g, '-');
    return `https://${subdomain}-${Math.random().toString(36).substr(2, 5)}.vercel.app`;
  };

  const deploymentUrl = generateDeploymentUrl();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Deploy {project.name}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {deploymentStatus === 'deploying' && (
            <div className="space-y-6">
              <div className="text-center">
                <Loader className="w-12 h-12 text-blue-600 mx-auto mb-4 animate-spin" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Deploying Your Project</h3>
                <p className="text-gray-600">This may take a few minutes...</p>
              </div>

              <div className="space-y-4">
                {deploymentSteps.map((step, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      index < currentStep ? 'bg-green-500' :
                      index === currentStep ? 'bg-blue-500' : 'bg-gray-200'
                    }`}>
                      {index < currentStep ? (
                        <CheckCircle className="w-4 h-4 text-white" />
                      ) : index === currentStep ? (
                        <Loader className="w-4 h-4 text-white animate-spin" />
                      ) : (
                        <span className="w-2 h-2 bg-gray-400 rounded-full" />
                      )}
                    </div>
                    <span className={`${
                      index <= currentStep ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="bg-gray-100 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-2">Deployment Progress</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(currentStep / deploymentSteps.length) * 100}%` }}
                  />
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {Math.round((currentStep / deploymentSteps.length) * 100)}% complete
                </div>
              </div>
            </div>
          )}

          {deploymentStatus === 'success' && (
            <div className="text-center space-y-6">
              <div>
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Deployment Successful!</h3>
                <p className="text-gray-600">Your website is now live and accessible to the world.</p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="text-sm font-medium text-green-800 mb-2">Your website is live at:</div>
                <a
                  href={deploymentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-mono text-sm break-all"
                >
                  {deploymentUrl}
                </a>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-gray-50 p-3 rounded">
                  <div className="font-medium text-gray-900">SSL Certificate</div>
                  <div className="text-green-600">✓ Enabled</div>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="font-medium text-gray-900">CDN</div>
                  <div className="text-green-600">✓ Optimized</div>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="font-medium text-gray-900">Performance</div>
                  <div className="text-green-600">✓ 98/100</div>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="font-medium text-gray-900">Uptime</div>
                  <div className="text-green-600">✓ 99.9%</div>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => window.open(deploymentUrl, '_blank')}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                >
                  Visit Website
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 bg-gray-200 text-gray-900 py-2 px-4 rounded-md hover:bg-gray-300"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {deploymentStatus === 'error' && (
            <div className="text-center space-y-6">
              <div>
                <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Deployment Failed</h3>
                <p className="text-gray-600">There was an issue deploying your website. Please try again.</p>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-left">
                <div className="text-sm font-medium text-red-800 mb-2">Error Details:</div>
                <div className="text-red-700 text-sm font-mono">
                  Build failed: Unable to resolve dependencies in backend configuration.
                  <br />Please check your API endpoints and database models.
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setCurrentStep(0);
                    setDeploymentStatus('deploying');
                  }}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                >
                  Try Again
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 bg-gray-200 text-gray-900 py-2 px-4 rounded-md hover:bg-gray-300"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeploymentModal;
