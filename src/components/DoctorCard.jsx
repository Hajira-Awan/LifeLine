import { Star, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const DoctorCard = ({ doctor }) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 hover-lift relative group">
      <div className="absolute top-4 right-4 bg-green-50 text-accent px-2 py-1 rounded-md text-xs font-semibold flex items-center shadow-sm">
        <Star className="w-3 h-3 mr-1 fill-accent" /> {doctor.rating}
      </div>
      
      <div className="flex items-center space-x-4 mb-4">
        <img 
          src={doctor.photo} 
          alt={doctor.name} 
          className="w-16 h-16 rounded-full object-cover border-2 border-primary/20 p-0.5"
        />
        <div>
          <h3 className="font-bold text-gray-900 text-lg group-hover:text-primary transition-colors">
            {doctor.name}
          </h3>
          <p className="text-secondary text-sm font-medium">{doctor.specialty}</p>
        </div>
      </div>
      
      <div className="space-y-2 mb-6">
        <div className="flex items-center text-gray-500 text-sm">
          <Clock className="w-4 h-4 mr-2 text-gray-400" />
          {doctor.experience} experience
        </div>
        <div className="flex items-center text-gray-500 text-sm">
          <MapPin className="w-4 h-4 mr-2 text-gray-400" />
          {doctor.location}
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {doctor.availableSlots.slice(0, 3).map((slot, index) => (
          <span key={index} className="bg-gray-50 text-gray-600 text-xs px-2 py-1 rounded-md border border-gray-100">
            {slot}
          </span>
        ))}
        {doctor.availableSlots.length > 3 && (
          <span className="bg-gray-50 text-gray-400 text-xs px-2 py-1 rounded-md border border-gray-100">
            +{doctor.availableSlots.length - 3}
          </span>
        )}
      </div>

      <div className="flex space-x-2">
        <Link 
          to={`/doctor/${doctor.id}`}
          className="flex-1 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors py-2 rounded-xl text-sm font-medium text-center"
        >
          View Profile
        </Link>
        <Link 
          to={`/book/${doctor.id}`}
          className="flex-1 bg-primary text-white hover:bg-primary/90 transition-colors py-2 rounded-xl text-sm font-medium text-center shadow-md shadow-primary/20"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
};

export default DoctorCard;
