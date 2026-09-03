import { useState, useEffect } from 'react';
import { ArrowRight, Bot, Shield, Clock, HeartPulse, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { doctors } from '../data/doctors';
import DoctorCard from '../components/DoctorCard';

const Landing = () => {
  const featuredDoctors = doctors.slice(0, 4);
  const [activeUsers, setActiveUsers] = useState(1428);

  useEffect(() => {
    const interval = setInterval(() => {
      // Fluctuate between -3 and +5
      const change = Math.floor(Math.random() * 9) - 3;
      setActiveUsers(prev => Math.max(1400, prev + change));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background pt-20 pb-32">
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mb-8">
              <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm border border-gray-200 px-4 py-2 rounded-full text-sm font-medium text-gray-700 shadow-sm">
                <span className="flex h-2 w-2 rounded-full bg-accent"></span>
                <span>The future of healthcare is here</span>
              </div>
              <div className="inline-flex items-center space-x-2 bg-green-50/80 backdrop-blur-sm border border-green-200 px-4 py-2 rounded-full text-sm font-medium text-green-700 shadow-sm">
                <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                <Users className="w-4 h-4" />
                <span>{activeUsers.toLocaleString()} Active Users Online</span>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-8 leading-tight">
              Smarter Care with <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">AI-Powered</span> Precision
            </h1>
            
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Connect with top-rated specialists, get preliminary AI symptom analysis, and book appointments instantly. Your health, simplified.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link 
                to="/search" 
                className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg shadow-primary/30 flex items-center justify-center hover:-translate-y-1"
              >
                Find a Doctor <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link 
                to="/chat" 
                className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-sm flex items-center justify-center hover:-translate-y-1"
              >
                <Bot className="mr-2 w-5 h-5 text-secondary" /> Try AI Assistant
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How it Works</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Get the care you need in three simple steps.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center p-6 rounded-3xl bg-gray-50 hover:bg-primary/5 transition-colors duration-300 border border-gray-100 hover:border-primary/20">
              <div className="w-16 h-16 mx-auto bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 text-secondary">
                <Bot className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">1. Check Symptoms</h3>
              <p className="text-gray-500">Chat with our advanced AI to analyze your symptoms and get a preliminary assessment instantly.</p>
            </div>
            
            <div className="text-center p-6 rounded-3xl bg-gray-50 hover:bg-primary/5 transition-colors duration-300 border border-gray-100 hover:border-primary/20">
              <div className="w-16 h-16 mx-auto bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 text-primary">
                <HeartPulse className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">2. Find the Right Doctor</h3>
              <p className="text-gray-500">Based on your symptoms, we match you with the most qualified specialists in your area.</p>
            </div>
            
            <div className="text-center p-6 rounded-3xl bg-gray-50 hover:bg-primary/5 transition-colors duration-300 border border-gray-100 hover:border-primary/20">
              <div className="w-16 h-16 mx-auto bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 text-accent">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">3. Book Appointment</h3>
              <p className="text-gray-500">Schedule your visit online in seconds. Choose from available slots that fit your schedule.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Doctors */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Top Rated Specialists</h2>
              <p className="text-gray-500 max-w-2xl">Book appointments with our most trusted healthcare professionals.</p>
            </div>
            <Link to="/search" className="hidden sm:inline-flex text-primary font-medium hover:text-primary/80 items-center transition-colors">
              View All Doctors <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDoctors.map(doctor => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
          
          <div className="mt-8 text-center sm:hidden">
            <Link to="/search" className="inline-flex text-primary font-medium hover:text-primary/80 items-center transition-colors">
              View All Doctors <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Shield className="w-12 h-12 mx-auto text-green-500 mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Health Data is Secure</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            We employ state-of-the-art encryption to ensure your medical records and conversations with our AI assistant remain strictly confidential and HIPAA compliant.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Landing;
