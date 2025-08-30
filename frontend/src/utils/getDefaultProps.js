export const getDefaultProps = (type) => {
  const defaults = {
    hero: {
      title: 'Welcome to Our Website',
      subtitle: 'Build amazing experiences with our platform',
      buttonText: 'Get Started',
      backgroundImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    },
    navbar: {
      brand: 'Brand',
      links: ['Home', 'About', 'Services', 'Contact'],
      style: 'modern'
    },
    features: {
      title: 'Our Features',
      items: [
        { title: 'Fast', description: 'Lightning fast performance', icon: 'zap' },
        { title: 'Secure', description: 'Enterprise-grade security', icon: 'shield' },
        { title: 'Scalable', description: 'Grows with your business', icon: 'trending-up' }
      ]
    },
    pricing: {
      title: 'Choose Your Plan',
      plans: [
        { name: 'Basic', price: '$9', features: ['Feature 1', 'Feature 2'] },
        { name: 'Pro', price: '$29', features: ['All Basic', 'Feature 3', 'Feature 4'] },
        { name: 'Enterprise', price: '$99', features: ['All Pro', 'Premium Support'] }
      ]
    },
    footer: {
      brand: 'Brand',
      links: ['Privacy', 'Terms', 'Support'],
      social: ['twitter', 'facebook', 'linkedin']
    },
    form: {
      title: 'Contact Us',
      fields: ['name', 'email', 'message'],
      submitText: 'Send Message'
    },
    testimonial: {
      title: 'What Our Customers Say',
      quote: 'This is the most incredible tool I have ever used. It saved my team countless hours and allowed us to launch our project ahead of schedule.',
      author: 'Jane Doe',
      role: 'CEO, Tech Solutions'
    },
    cta: {
      title: 'Ready to Build Something Amazing?',
      subtitle: 'Join thousands of developers and designers using our platform to bring their ideas to life.',
      buttonText: 'Start Your Free Trial'
    },
    team: {
      title: 'Meet Our Amazing Team',
      members: [
        { name: 'John Smith', role: 'Founder', bio: 'Expert in full-stack development and product design.', image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHByb2ZpbGUlMjBwaG90b3xlbnwwfHwwfHx8MA%3D%3D' },
        { name: 'Sarah Chen', role: 'Lead Designer', bio: 'Passionate about creating beautiful and intuitive user interfaces.', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHByb2ZpbGUlMjBwaG90b3xlbnwwfHwwfHx8MA%3D%3D' },
        { name: 'Alex Johnson', role: 'Backend Engineer', bio: 'Specializes in scalable cloud infrastructure and API development.', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTJ8fHByb2ZpbGUlMjBwaG90b3xlbnwwfHwwfHx8MA%3D%3D' }
      ]
    }
  };
  return defaults[type] || {};
};