import { Calendar, Clock, MapPin, Video, MoreVertical } from 'lucide-react';

const AppointmentCard = ({ appointment, role = 'patient' }) => {
  const isDoctor = role === 'doctor';
  
  return (
    <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative">
      <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
        <MoreVertical className="w-5 h-5" />
      </button>

      <div className="flex items-center mb-4">
        <img 
          src={isDoctor ? appointment.patientPhoto : appointment.doctorPhoto} 
          alt="Avatar" 
          className="w-12 h-12 rounded-full object-cover mr-4 border border-gray-100"
        />
        <div>
          <h4 className="font-semibold text-gray-900">
            {isDoctor ? appointment.patientName : appointment.doctorName}
          </h4>
          <p className="text-sm text-gray-500">
            {isDoctor ? appointment.patientCondition : appointment.specialty}
          </p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-3 grid grid-cols-2 gap-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="w-4 h-4 mr-2 text-primary" />
          {appointment.date}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="w-4 h-4 mr-2 text-primary" />
          {appointment.time}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center text-sm text-gray-500">
          {appointment.type === 'video' ? (
            <><Video className="w-4 h-4 mr-1 text-secondary" /> Video Call</>
          ) : (
            <><MapPin className="w-4 h-4 mr-1 text-accent" /> In-person</>
          )}
        </div>
        
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          appointment.status === 'Confirmed' ? 'bg-green-50 text-accent' : 
          appointment.status === 'Pending' ? 'bg-yellow-50 text-yellow-600' : 
          'bg-gray-100 text-gray-600'
        }`}>
          {appointment.status}
        </div>
      </div>
      
      {isDoctor && (
        <div className="mt-4 flex space-x-2">
          <button className="flex-1 bg-white border border-gray-200 text-gray-600 py-1.5 rounded-lg text-sm hover:bg-gray-50 transition-colors">
            Reschedule
          </button>
          <button className="flex-1 bg-primary/10 text-primary py-1.5 rounded-lg text-sm font-medium hover:bg-primary/20 transition-colors">
            Join Call
          </button>
        </div>
      )}
    </div>
  );
};

export default AppointmentCard;
