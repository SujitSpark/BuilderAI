// src/components/ComponentRenderer.jsx
import React from 'react';
// Add Quote to this import statement
import { Star, Shield, TrendingUp, Zap, Twitter, Facebook, Linkedin, Quote } from 'lucide-react';

const ComponentRenderer = ({ component }) => {
  const { type, props } = component;

  const getIcon = (iconName) => {
    const icons = {
      star: Star,
      shield: Shield,
      'trending-up': TrendingUp,
      zap: Zap,
      twitter: Twitter,
      facebook: Facebook,
      linkedin: Linkedin
    };
    return icons[iconName] || Star;
  };

  switch (type) {
    case 'layout':
      const layoutClass = props.layoutType === 'flex'
        ? `flex ${props.flexDirection === 'flex-row' ? 'flex-row' : 'flex-col'}`
        : `grid grid-cols-${props.gridCols} gap-4`;

      return (
        <div className={`p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 m-4 ${layoutClass}`}>
          <div className="text-sm text-gray-500 italic text-center p-4">
            Layout Block: Drop components here
          </div>
        </div>
      );

    case 'navbar':
      return (
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="text-xl font-bold text-gray-900">{props.brand}</div>
              <div className="hidden md:flex space-x-8">
                {props.links.map((link, index) => (
                  <a key={index} href="#" className="text-gray-700 hover:text-blue-600">
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </nav>
      );

    case 'hero':
      return (
        <div className="relative bg-gray-900 text-white">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-50"
            style={{ backgroundImage: `url(${props.backgroundImage})` }}
          />
          <div className="relative max-w-7xl mx-auto px-4 py-24 sm:py-32">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">{props.title}</h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-300">{props.subtitle}</p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold">
                {props.buttonText}
              </button>
            </div>
          </div>
        </div>
      );

    case 'features':
      return (
        <div className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">{props.title}</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {props.items.map((item, index) => {
                const Icon = getIcon(item.icon);
                return (
                  <div key={index} className="text-center p-6 bg-white rounded-lg shadow-sm">
                    <Icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );

    case 'pricing':
      return (
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">{props.title}</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {props.plans.map((plan, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6 text-center">
                  <h3 className="text-xl font-semibold mb-4">{plan.name}</h3>
                  <div className="text-3xl font-bold text-blue-600 mb-6">{plan.price}/mo</div>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="text-gray-600">{feature}</li>
                    ))}
                  </ul>
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                    Choose Plan
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case 'form':
      return (
        <div className="py-16 bg-gray-50">
          <div className="max-w-2xl mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">{props.title}</h2>
            </div>
            <form className="bg-white p-8 rounded-lg shadow-sm">
              {props.fields.includes('name') && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>
              )}
              {props.fields.includes('email') && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>
              )}
              {props.fields.includes('message') && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea rows="4" className="w-full px-3 py-2 border border-gray-300 rounded-md"></textarea>
                </div>
              )}
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                {props.submitText}
              </button>
            </form>
          </div>
        </div>
      );

    case 'footer':
      return (
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-xl font-bold mb-4">{props.brand}</div>
                <p className="text-gray-400">Building amazing experiences for the web.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  {props.links.map((link, index) => (
                    <li key={index}>
                      <a href="#" className="text-gray-400 hover:text-white">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  {props.social.map((social, index) => {
                    const Icon = getIcon(social);
                    return (
                      <Icon key={index} className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </footer>
      );
case 'testimonial':
      return (
        <div className="bg-gray-50 py-16">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">{props.title}</h2>
            <div className="relative p-8 bg-white rounded-lg shadow-xl border-t-4 border-blue-600">
              <Quote className="absolute top-0 left-0 -mt-3 -ml-3 w-10 h-10 text-blue-600 opacity-20 transform -scale-x-100" />
              <p className="text-xl italic text-gray-700 mb-4">"{props.quote}"</p>
              <div className="font-semibold text-lg text-gray-900">{props.author}</div>
              <div className="text-sm text-gray-500">{props.role}</div>
            </div>
          </div>
        </div>
      );

    case 'cta':
      return (
        <div className="bg-blue-600 py-16">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{props.title}</h2>
            <p className="text-lg text-blue-100 mb-8">{props.subtitle}</p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
              {props.buttonText}
            </button>
          </div>
        </div>
      );
      
    case 'team':
      return (
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">{props.title}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {props.members.map((member, index) => (
                <div key={index} className="p-6 bg-gray-50 rounded-lg">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-blue-600 mb-2">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    default:
      return (
        <div className="p-8 bg-gray-100 border-2 border-dashed border-gray-300">
          <p className="text-gray-500">Unknown component type: {type}</p>
        </div>
      );
  }
};

export default ComponentRenderer;