import { useParams, Link } from 'react-router-dom';
import { MapPin, Clock, Star, MessageSquare, CalendarCheck, Award, ShieldCheck } from 'lucide-react';
import { doctors } from '../data/doctors';

const DoctorProfile = () => {
  const { id } = useParams();
  const doctor = doctors.find(d => d.id === parseInt(id));

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Doctor Not Found</h2>
          <Link to="/search" className="text-primary hover:underline">Return to Search</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Profile Header */}
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-bl-full -z-10"></div>
          
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="w-32 h-32 md:w-40 md:h-40 flex-shrink-0 relative">
              <img 
                src={doctor.photo} 
                alt={doctor.name} 
                className="w-full h-full rounded-2xl object-cover border-4 border-white shadow-lg"
              />
              <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-1.5 rounded-lg shadow-sm">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>
            
            <div className="flex-grow text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-1">{doctor.name}</h1>
                  <p className="text-xl text-primary font-medium">{doctor.specialty}</p>
                </div>
                
                <div className="flex items-center justify-center md:justify-end gap-2 bg-yellow-50 px-4 py-2 rounded-xl text-yellow-700 font-bold">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-lg">{doctor.rating}</span>
                  <span className="text-yellow-600/70 font-normal text-sm ml-1">({doctor.reviews} reviews)</span>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-gray-600 mb-6">
                <div className="flex items-center">
                  <Award className="w-5 h-5 mr-2 text-gray-400" />
                  {doctor.experience} Exp.
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-gray-400" />
                  {doctor.location}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to={`/book/${doctor.id}`}
                  className="flex-1 sm:flex-none flex items-center justify-center px-8 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-semibold transition-all shadow-md shadow-primary/20 hover:-translate-y-0.5"
                >
                  <CalendarCheck className="w-5 h-5 mr-2" /> Book Appointment
                </Link>
                <Link 
                  to="/chat"
                  className="flex-1 sm:flex-none flex items-center justify-center px-8 py-3 bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 rounded-xl font-semibold transition-all shadow-sm hover:-translate-y-0.5"
                >
                  <MessageSquare className="w-5 h-5 mr-2 text-secondary" /> AI Pre-Consult
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs area - simplified for MVP */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">About Doctor</h2>
              <p className="text-gray-600 leading-relaxed">{doctor.bio}</p>
            </div>
            
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Patient Reviews</h2>
              <div className="space-y-6">
                {[1, 2].map((_, i) => (
                  <div key={i} className="border-b border-gray-50 pb-6 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 font-bold">
                          {i === 0 ? 'JD' : 'SM'}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{i === 0 ? 'John Doe' : 'Sarah Miller'}</p>
                          <p className="text-xs text-gray-500">2 weeks ago</p>
                        </div>
                      </div>
                      <div className="flex text-yellow-400">
                        <Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" />
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mt-3">
                      "Excellent experience. The doctor was very attentive, listened to all my concerns, and explained the treatment plan clearly. Highly recommend!"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Availability Today</h2>
              <div className="grid grid-cols-2 gap-3">
                {doctor.availableSlots.map((slot, i) => (
                  <div key={i} className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-center text-sm font-medium text-gray-700">
                    <Clock className="w-4 h-4 mx-auto mb-1 text-primary/70" />
                    {slot}
                  </div>
                ))}
              </div>
              <div className="mt-6">
                 <Link 
                  to={`/book/${doctor.id}`}
                  className="block w-full text-center px-4 py-3 bg-primary/10 text-primary hover:bg-primary/20 rounded-xl font-semibold transition-colors"
                >
                  See Full Schedule
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
