import { Link } from 'react-router-dom';
import { Users, Calendar, TrendingUp, Star, Bell, Search, Filter, MoreHorizontal, CheckCircle, Clock } from 'lucide-react';
import AppointmentCard from '../components/AppointmentCard';

const DoctorDashboard = () => {
  // Dummy data
  const stats = [
    { label: "Total Patients", value: "1,248", icon: Users },
    { label: "Today's Bookings", value: "8", icon: Calendar },
    { label: "Earnings (Month)", value: "$4,250", icon: TrendingUp },
    { label: "Patient Rating", value: "4.9", icon: Star },
  ];

  const todaysAppointments = [
    {
      id: 1,
      patientName: "John Doe",
      patientPhoto: "https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff",
      patientCondition: "Routine Checkup",
      date: 'Today',
      time: '09:00 AM',
      type: 'video',
      status: 'Confirmed'
    },
    {
      id: 2,
      patientName: "Sarah Miller",
      patientPhoto: "https://ui-avatars.com/api/?name=Sarah+Miller&background=E11D48&color=fff",
      patientCondition: "Follow-up",
      date: 'Today',
      time: '11:30 AM',
      type: 'in-person',
      status: 'Confirmed'
    },
    {
      id: 3,
      patientName: "Mike Johnson",
      patientPhoto: "https://ui-avatars.com/api/?name=Mike+Johnson&background=10B981&color=fff",
      patientCondition: "Mild fever, cough",
      date: 'Today',
      time: '02:00 PM',
      type: 'video',
      status: 'Pending'
    }
  ];

  return (
    <div className="min-h-screen bg-doctor-bg py-8 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 border-b border-gray-200 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Dr. Sarah Jenkins</h1>
            <p className="text-gray-600 text-sm mt-1">Provider Overview &bull; 8 appointments scheduled today</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search patients..." 
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-doctor-primary focus:border-doctor-primary w-64 shadow-sm"
              />
            </div>
            <button className="p-2 bg-white border border-gray-300 shadow-sm rounded-md text-gray-600 hover:bg-gray-50 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <img src="https://ui-avatars.com/api/?name=Sarah+Jenkins&background=0F766E&color=fff" alt="Profile" className="w-10 h-10 rounded-md border border-gray-300 shadow-sm" />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className="w-10 h-10 bg-doctor-primary/10 text-doctor-primary rounded-md flex items-center justify-center flex-shrink-0">
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Content - Schedule */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                <h2 className="text-base font-semibold text-gray-900 flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-doctor-primary" />
                  Today's Schedule
                </h2>
                <div className="flex space-x-2">
                  <button className="p-1.5 text-gray-500 hover:text-gray-700 bg-white border border-gray-300 rounded shadow-sm">
                    <Filter className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="divide-y divide-gray-200">
                {todaysAppointments.map(apt => (
                  <div key={apt.id} className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-center w-16">
                        <p className="text-sm font-bold text-gray-900">{apt.time}</p>
                        <p className="text-xs text-gray-500 font-medium mt-0.5">{apt.type === 'video' ? 'Video Call' : 'In-Person'}</p>
                      </div>
                      <div className="h-10 w-px bg-gray-200"></div>
                      <div className="flex items-center">
                        <img src={apt.patientPhoto} alt={apt.patientName} className="w-10 h-10 rounded-full mr-3 border border-gray-200" />
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{apt.patientName}</p>
                          <p className="text-xs text-gray-500">{apt.patientCondition}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        apt.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {apt.status === 'Confirmed' ? <CheckCircle className="w-3 h-3 mr-1" /> : <Clock className="w-3 h-3 mr-1" />}
                        {apt.status}
                      </span>
                      <button className="text-sm bg-doctor-primary text-white px-3 py-1.5 rounded-md font-medium hover:bg-doctor-primary/90 transition-colors shadow-sm">
                        View Chart
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-200 bg-gray-50">
                <h2 className="text-base font-semibold text-gray-900">Patient Messages</h2>
              </div>
              
              <div className="divide-y divide-gray-100">
                {[
                  { name: "Emily Clark", msg: "Are my test results ready?", time: "10m", unread: true },
                  { name: "Robert Fox", msg: "Thank you for the prescription.", time: "1h", unread: false },
                  { name: "Alice Smith", msg: "Can we reschedule tomorrow?", time: "2h", unread: false }
                ].map((msg, i) => (
                  <div key={i} className={`p-4 transition-colors cursor-pointer flex items-start ${msg.unread ? 'bg-blue-50/50' : 'hover:bg-gray-50'}`}>
                    <img src={`https://ui-avatars.com/api/?name=${msg.name.replace(' ', '+')}&background=random`} alt="Profile" className="w-8 h-8 rounded-full mr-3 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline mb-1">
                        <p className={`text-sm truncate ${msg.unread ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}>{msg.name}</p>
                        <p className="text-xs text-gray-500 font-medium">{msg.time}</p>
                      </div>
                      <p className={`text-xs truncate ${msg.unread ? 'text-gray-800 font-medium' : 'text-gray-500'}`}>{msg.msg}</p>
                    </div>
                    {msg.unread && <div className="w-2 h-2 bg-doctor-primary rounded-full mt-1.5 ml-2"></div>}
                  </div>
                ))}
              </div>
              
              <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 text-center">
                <button className="text-xs font-semibold text-doctor-primary hover:text-doctor-primary/80 uppercase tracking-wider">
                  View Inbox
                </button>
              </div>
            </div>
            
            {/* Quick Actions Sidebar */}
            <div className="bg-doctor-secondary rounded-lg border border-doctor-secondary/20 shadow-sm p-5 text-white">
              <h3 className="text-sm font-semibold mb-4 text-gray-200 uppercase tracking-wider">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 text-sm bg-white/10 hover:bg-white/20 rounded-md transition-colors flex items-center">
                  <Calendar className="w-4 h-4 mr-3 text-gray-300" />
                  Manage Availability
                </button>
                <button className="w-full text-left px-3 py-2 text-sm bg-white/10 hover:bg-white/20 rounded-md transition-colors flex items-center">
                  <Users className="w-4 h-4 mr-3 text-gray-300" />
                  Add New Patient
                </button>
                <button className="w-full text-left px-3 py-2 text-sm bg-white/10 hover:bg-white/20 rounded-md transition-colors flex items-center">
                  <TrendingUp className="w-4 h-4 mr-3 text-gray-300" />
                  Generate Reports
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
