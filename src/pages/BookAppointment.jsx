import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, Phone, CheckCircle, ArrowLeft, Mail, Bell, Shield, Loader2 } from 'lucide-react';
import { doctors } from '../data/doctors';

const BookAppointment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const doctor = doctors.find(d => d.id === parseInt(id));

  const [step, setStep] = useState(1); // 1: Date/Time, 2: Details, 3: Confirmation
  
  // Form State
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [enableReminders, setEnableReminders] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    reason: ''
  });

  // Security Simulation State
  const [isBooking, setIsBooking] = useState(false);
  const [bookingStatus, setBookingStatus] = useState('');

  // Local state to simulate conflict-free scheduling
  const [availableSlots, setAvailableSlots] = useState([]);

  // Generate next 5 days for dummy calendar
  const generateDates = () => {
    const dates = [];
    for (let i = 1; i <= 5; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      dates.push({
        dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNum: d.getDate(),
        fullDate: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      });
    }
    return dates;
  };

  const dates = generateDates();

  useEffect(() => {
    if (dates.length > 0) {
      setSelectedDate(dates[0].fullDate);
    }
    if (doctor) {
      // Simulate real-time availability: Randomly remove 1 slot to simulate someone just booked it
      const slots = [...doctor.availableSlots];
      if (slots.length > 2) {
        slots.splice(Math.floor(Math.random() * slots.length), 1);
      }
      setAvailableSlots(slots);
    }
  }, [doctor]);

  if (!doctor) {
    return <div className="p-10 text-center">Doctor not found</div>;
  }

  const handleNext = () => {
    if (step === 1 && selectedDate && selectedTime) {
      setStep(2);
    } else if (step === 2 && formData.name && formData.phone) {
      setIsBooking(true);
      setBookingStatus('Verifying Data...');
      
      // Simulate API Call & Conflict-free scheduling (remove slot)
      setAvailableSlots(prev => prev.filter(slot => slot !== selectedTime));
      
      // Simulate Security Sequence
      setTimeout(() => {
        setBookingStatus('🔒 Encrypting Patient Data (AES-256)...');
        setTimeout(() => {
          setIsBooking(false);
          setStep(3);
        }, 1500);
      }, 1000);
    }
  };

  const renderProgressBar = () => (
    <div className="flex items-center justify-between relative mb-8">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-100 -z-10 rounded-full"></div>
      <div 
        className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary -z-10 rounded-full transition-all duration-500"
        style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}
      ></div>
      
      {[1, 2, 3].map(s => (
        <div key={s} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-4 ${
          step >= s ? 'bg-primary border-white text-white shadow-md' : 'bg-white border-gray-100 text-gray-400'
        } transition-colors duration-300`}>
          {s === 3 && step === 3 ? <CheckCircle className="w-5 h-5" /> : s}
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <button onClick={() => navigate(-1)} className="flex items-center text-gray-500 hover:text-primary mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </button>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          
          {/* Header */}
          <div className="bg-primary/5 p-6 md:p-8 border-b border-gray-100 flex items-center space-x-4">
            <img src={doctor.photo} alt={doctor.name} className="w-16 h-16 rounded-full border-2 border-white shadow-sm" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Book Appointment</h1>
              <p className="text-primary font-medium">with {doctor.name}</p>
            </div>
          </div>

          <div className="p-6 md:p-8">
            {renderProgressBar()}

            {/* STEP 1: DATE & TIME */}
            {step === 1 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-primary" /> Select Date & Time
                  </h2>
                  <span className="bg-green-50 text-green-600 text-xs px-2 py-1 rounded-md flex items-center font-medium">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5 animate-pulse"></span>
                    Live Availability
                  </span>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">Available Dates</h3>
                  <div className="flex space-x-3 overflow-x-auto pb-2 custom-scrollbar">
                    {dates.map((date, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedDate(date.fullDate)}
                        className={`flex flex-col items-center min-w-[80px] p-3 rounded-2xl border-2 transition-all ${
                          selectedDate === date.fullDate 
                            ? 'border-primary bg-primary/5 shadow-sm' 
                            : 'border-gray-100 hover:border-primary/30 hover:bg-gray-50'
                        }`}
                      >
                        <span className={`text-sm ${selectedDate === date.fullDate ? 'text-primary' : 'text-gray-500'}`}>
                          {date.dayName}
                        </span>
                        <span className={`text-xl font-bold ${selectedDate === date.fullDate ? 'text-gray-900' : 'text-gray-700'}`}>
                          {date.dayNum}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">Available Slots</h3>
                  {availableSlots.length === 0 ? (
                    <div className="p-4 bg-red-50 text-red-600 rounded-xl text-center text-sm font-medium">
                      No slots available for this date. Please select another date.
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {availableSlots.map((time, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedTime(time)}
                          className={`py-3 px-4 rounded-xl border flex items-center justify-center transition-all ${
                            selectedTime === time 
                              ? 'bg-primary text-white border-primary shadow-md shadow-primary/20' 
                              : 'bg-white border-gray-200 text-gray-700 hover:border-primary/50 hover:bg-primary/5'
                          }`}
                        >
                          <Clock className={`w-4 h-4 mr-2 ${selectedTime === time ? 'text-white' : 'text-gray-400'}`} />
                          <span className="font-medium text-sm">{time}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-10 flex justify-end">
                  <button 
                    onClick={handleNext}
                    disabled={!selectedDate || !selectedTime}
                    className={`px-8 py-3 rounded-xl font-semibold transition-all ${
                      selectedDate && selectedTime 
                        ? 'bg-primary text-white hover:bg-primary/90 shadow-md hover:-translate-y-0.5' 
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Continue to Details
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: PATIENT DETAILS */}
            {step === 2 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <User className="w-5 h-5 mr-2 text-primary" /> Patient Details
                </h2>

                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-8 flex items-center justify-between">
                  <div className="flex items-center text-sm font-medium text-gray-700">
                    <Calendar className="w-4 h-4 mr-2 text-primary" /> {selectedDate}
                  </div>
                  <div className="flex items-center text-sm font-medium text-gray-700">
                    <Clock className="w-4 h-4 mr-2 text-primary" /> {selectedTime}
                  </div>
                  <button onClick={() => setStep(1)} className="text-sm text-primary hover:underline font-medium">Edit</button>
                </div>

                <form className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                          placeholder="John Doe" 
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-gray-400" />
                        </div>
                        <input 
                          type="tel" 
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="pl-10 block w-full border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-primary focus:border-primary sm:text-sm py-3 border transition-colors" 
                          placeholder="(555) 123-4567" 
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="pl-10 block w-full border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-primary focus:border-primary sm:text-sm py-3 border transition-colors" 
                        placeholder="john@example.com" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Reason for visit (Optional)</label>
                    <textarea 
                      rows="3"
                      value={formData.reason}
                      onChange={(e) => setFormData({...formData, reason: e.target.value})}
                      className="block w-full border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-primary focus:border-primary sm:text-sm p-3 border transition-colors" 
                      placeholder="Briefly describe your symptoms..." 
                    ></textarea>
                  </div>
                  
                  <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="reminders"
                        type="checkbox"
                        checked={enableReminders}
                        onChange={(e) => setEnableReminders(e.target.checked)}
                        className="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="reminders" className="font-medium text-gray-700 flex items-center">
                        <Bell className="w-4 h-4 mr-1 text-primary" /> Enable Instant Notifications
                      </label>
                      <p className="text-gray-500">Receive email & SMS confirmations, plus a 24-hour follow-up reminder.</p>
                    </div>
                  </div>
                </form>

                <div className="mt-10 flex justify-between">
                  <button 
                    onClick={() => setStep(1)}
                    className="px-6 py-3 text-gray-600 hover:text-gray-900 font-medium transition-colors"
                  >
                    Back
                  </button>
                  <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
                    <div className="flex items-center text-xs text-gray-500 mr-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                      <Shield className="w-4 h-4 text-green-500 mr-1.5" />
                      <span>HIPAA Compliant & Encrypted</span>
                    </div>
                    <button 
                      onClick={handleNext}
                      disabled={!formData.name || !formData.phone || !formData.email || isBooking}
                      className={`px-8 py-3 rounded-xl font-semibold transition-all flex items-center min-w-[200px] justify-center ${
                        formData.name && formData.phone && formData.email && !isBooking
                          ? 'bg-primary text-white hover:bg-primary/90 shadow-md hover:-translate-y-0.5' 
                          : isBooking && bookingStatus.includes('Encrypting')
                          ? 'bg-green-500 text-white shadow-md'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {isBooking ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          {bookingStatus}
                        </>
                      ) : (
                        'Confirm Booking'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: CONFIRMATION */}
            {step === 3 && (
              <div className="text-center animate-in zoom-in-95 duration-500 py-8">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                  <CheckCircle className="w-12 h-12 text-accent" />
                  {enableReminders && (
                    <span className="absolute -top-2 -right-2 bg-blue-100 text-blue-600 text-[10px] font-bold px-2 py-1 rounded-full border border-blue-200 shadow-sm animate-bounce">
                      Email Sent!
                    </span>
                  )}
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
                <p className="text-gray-500 mb-8 max-w-sm mx-auto">
                  Your appointment with {doctor.name} has been successfully scheduled.
                  {enableReminders && " We've sent a confirmation to your email and phone."}
                </p>

                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 text-left max-w-md mx-auto mb-8">
                  <h3 className="font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">Appointment Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Patient</span>
                      <span className="font-medium text-gray-900">{formData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Date</span>
                      <span className="font-medium text-gray-900">{selectedDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Time</span>
                      <span className="font-medium text-gray-900">{selectedTime}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link 
                    to="/patient-dashboard"
                    className="px-8 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors shadow-md"
                  >
                    Go to Dashboard
                  </Link>
                  <Link 
                    to="/"
                    className="px-8 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Return Home
                  </Link>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
