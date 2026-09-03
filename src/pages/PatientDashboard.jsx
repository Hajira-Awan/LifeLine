import { Calendar, MessageSquare, Search, FileText, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import AppointmentCard from '../components/AppointmentCard';
import BMICalculator from '../components/BMICalculator';
import { doctors } from '../data/doctors';

const PatientDashboard = () => {
  // Dummy data
  const upcomingAppointments = [
    {
      id: 1,
      doctorName: doctors[0].name,
      doctorPhoto: doctors[0].photo,
      specialty: doctors[0].specialty,
      date: 'Tomorrow',
      time: '09:00 AM',
      type: 'video',
      status: 'Confirmed'
    }
  ];

  const pastAppointments = [
    {
      id: 2,
      doctorName: doctors[2].name,
      doctorPhoto: doctors[2].photo,
      specialty: doctors[2].specialty,
      date: 'Oct 15, 2023',
      time: '11:30 AM',
      type: 'in-person',
      status: 'Completed'
    }
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome back, John!</h1>
            <p className="text-gray-500 text-sm">Here is your health overview for today.</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="p-2 bg-white border border-gray-200 rounded-full text-gray-500 hover:bg-gray-50 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <img src="https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff" alt="Profile" className="w-10 h-10 rounded-full border border-gray-200" />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Link to="/search" className="bg-white p-4 rounded-2xl border border-gray-100 flex flex-col items-center justify-center text-center hover:border-primary/30 hover:shadow-md transition-all group">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Search className="w-6 h-6" />
            </div>
            <span className="font-medium text-gray-900 text-sm">Find Doctor</span>
          </Link>
          <Link to="/chat" className="bg-white p-4 rounded-2xl border border-gray-100 flex flex-col items-center justify-center text-center hover:border-secondary/30 hover:shadow-md transition-all group">
            <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <MessageSquare className="w-6 h-6" />
            </div>
            <span className="font-medium text-gray-900 text-sm">AI Assistant</span>
          </Link>
          <button className="bg-white p-4 rounded-2xl border border-gray-100 flex flex-col items-center justify-center text-center hover:border-accent/30 hover:shadow-md transition-all group">
            <div className="w-12 h-12 bg-accent/10 text-accent rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Calendar className="w-6 h-6" />
            </div>
            <span className="font-medium text-gray-900 text-sm">My Bookings</span>
          </button>
          <button className="bg-white p-4 rounded-2xl border border-gray-100 flex flex-col items-center justify-center text-center hover:border-yellow-400/30 hover:shadow-md transition-all group">
            <div className="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <FileText className="w-6 h-6" />
            </div>
            <span className="font-medium text-gray-900 text-sm">Lab Reports</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-gray-900">Upcoming Appointments</h2>
                <Link to="/search" className="text-sm text-primary font-medium hover:underline">Book New</Link>
              </div>
              
              {upcomingAppointments.length > 0 ? (
                <div className="space-y-4">
                  {upcomingAppointments.map(apt => (
                    <AppointmentCard key={apt.id} appointment={apt} role="patient" />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Calendar className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 font-medium">No upcoming appointments</p>
                </div>
              )}
            </div>

            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Past Consultations</h2>
              <div className="space-y-4">
                {pastAppointments.map(apt => (
                  <AppointmentCard key={apt.id} appointment={apt} role="patient" />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-primary to-secondary rounded-3xl p-6 text-white shadow-lg shadow-primary/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full"></div>
              <h2 className="text-xl font-bold mb-2 relative z-10">Need medical advice now?</h2>
              <p className="text-primary-100 text-sm mb-6 relative z-10">Chat with our AI assistant for an instant preliminary assessment.</p>
              <Link to="/chat" className="inline-block bg-white text-primary font-bold px-5 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all relative z-10 w-full text-center">
                Start Chat
              </Link>
            </div>
            
            <BMICalculator />
          </div>

        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
