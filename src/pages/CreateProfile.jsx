import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, MapPin, Stethoscope, Video, Navigation, CheckCircle, ArrowLeft } from 'lucide-react';
import { doctors } from '../data/doctors';

const CreateProfile = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    specialty: 'Cardiologist',
    location: 'New York, NY',
    consultationType: 'Both', // Online, Physical, Both
    experience: '',
    bio: ''
  });

  const specialties = [
    "Cardiologist", "Neurologist", "Dermatologist", 
    "Pediatrician", "Psychiatrist", "Orthopedic", "Gynecologist", 
    "Ophthalmologist", "General Physician", "ENT Specialist"
  ];

  const locations = [
    "New York, NY", "San Francisco, CA", "Miami, FL", 
    "Chicago, IL", "Austin, TX", "Seattle, WA", "Los Angeles, CA", 
    "Boston, MA", "Denver, CO", "Atlanta, GA"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API delay
    setTimeout(() => {
      const newDoctor = {
        id: doctors.length > 0 ? Math.max(...doctors.map(d => d.id)) + 1 : 1,
        name: formData.name.startsWith('Dr.') ? formData.name : `Dr. ${formData.name}`,
        specialty: formData.specialty,
        experience: formData.experience ? `${formData.experience} years` : 'New',
        location: formData.location,
        rating: 5.0, // Default new rating
        reviews: 0,
        photo: `https://ui-avatars.com/api/?name=${formData.name.replace(' ', '+')}&background=random&color=fff&size=200`,
        availableSlots: ["09:00 AM", "11:00 AM", "02:00 PM"], // Default slots
        bio: formData.bio || `Dr. ${formData.name} is a dedicated ${formData.specialty} providing both online and physical consultations.`
      };

      // Add to imported array (persists in memory during session)
      doctors.push(newDoctor);

      setSuccess(true);
      setIsSubmitting(false);

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/search');
      }, 2000);
    }, 1000);
  };

  if (success) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-background py-10 flex items-center justify-center">
        <div className="text-center animate-in zoom-in-95 duration-500 py-8 bg-white p-12 rounded-3xl shadow-sm border border-gray-100">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-accent" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Profile Created!</h2>
          <p className="text-gray-500 mb-8 max-w-sm mx-auto">
            Your doctor profile is now live and searchable nationwide.
          </p>
          <p className="text-sm text-primary font-medium">Redirecting to search...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background py-10">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <button onClick={() => navigate(-1)} className="flex items-center text-gray-500 hover:text-primary mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </button>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-primary/5 p-6 md:p-8 border-b border-gray-100">
            <h1 className="text-2xl font-bold text-gray-900">Create Doctor Profile</h1>
            <p className="text-gray-500">Join our network and become searchable nationwide.</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
            
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="pl-10 block w-full border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-primary focus:border-primary sm:text-sm py-3 border transition-colors" 
                  placeholder="e.g., Sarah Jenkins" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Specialty */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Specialization *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Stethoscope className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    value={formData.specialty}
                    onChange={(e) => setFormData({...formData, specialty: e.target.value})}
                    className="pl-10 block w-full border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-primary focus:border-primary sm:text-sm py-3 border transition-colors appearance-none"
                  >
                    {specialties.map(spec => <option key={spec} value={spec}>{spec}</option>)}
                  </select>
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="pl-10 block w-full border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-primary focus:border-primary sm:text-sm py-3 border transition-colors appearance-none"
                  >
                    {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Consultation Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Consultation Type *</label>
              <div className="grid grid-cols-3 gap-3">
                {['Online', 'Physical', 'Both'].map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData({...formData, consultationType: type})}
                    className={`py-3 px-4 rounded-xl border flex flex-col items-center justify-center transition-all ${
                      formData.consultationType === type 
                        ? 'bg-primary/10 border-primary text-primary shadow-sm' 
                        : 'bg-white border-gray-200 text-gray-500 hover:border-primary/50'
                    }`}
                  >
                    {type === 'Online' && <Video className="w-5 h-5 mb-1" />}
                    {type === 'Physical' && <Navigation className="w-5 h-5 mb-1" />}
                    {type === 'Both' && <div className="flex space-x-1 mb-1"><Video className="w-4 h-4" /><Navigation className="w-4 h-4" /></div>}
                    <span className="text-sm font-medium">{type}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience (Optional)</label>
              <input 
                type="number" 
                min="0"
                value={formData.experience}
                onChange={(e) => setFormData({...formData, experience: e.target.value})}
                className="block w-full px-4 border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-primary focus:border-primary sm:text-sm py-3 border transition-colors" 
                placeholder="e.g., 5" 
              />
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Professional Bio (Optional)</label>
              <textarea 
                rows="4"
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                className="block w-full p-4 border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-primary focus:border-primary sm:text-sm border transition-colors" 
                placeholder="Tell patients about your expertise and background..." 
              ></textarea>
            </div>

            <div className="pt-4">
              <button 
                type="submit"
                disabled={!formData.name || isSubmitting}
                className={`w-full py-4 rounded-xl font-semibold transition-all flex justify-center items-center ${
                  formData.name && !isSubmitting
                    ? 'bg-primary text-white hover:bg-primary/90 shadow-md hover:-translate-y-0.5' 
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? 'Creating Profile...' : 'Create Profile & Go Live'}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProfile;
