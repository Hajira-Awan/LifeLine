import { useState, useMemo } from 'react';
import SearchFilter from '../components/SearchFilter';
import DoctorCard from '../components/DoctorCard';
import { doctors } from '../data/doctors';

const DoctorSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');

  const filteredDoctors = useMemo(() => {
    return doctors.filter(doctor => {
      const matchesSearch = 
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.bio.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesSpecialty = selectedSpecialty === 'All' || doctor.specialty === selectedSpecialty;
      const matchesLocation = selectedLocation === 'All' || doctor.location === selectedLocation;
      
      return matchesSearch && matchesSpecialty && matchesLocation;
    });
  }, [searchTerm, selectedSpecialty, selectedLocation]);

  return (
    <div className="min-h-screen bg-background py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find a Doctor</h1>
          <p className="text-gray-500">Search specialized doctors and book your appointment easily.</p>
        </div>

        <SearchFilter 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          selectedSpecialty={selectedSpecialty} 
          setSelectedSpecialty={setSelectedSpecialty} 
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        />

        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">
            {filteredDoctors.length} {filteredDoctors.length === 1 ? 'Doctor' : 'Doctors'} Found
          </h2>
        </div>

        {filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDoctors.map(doctor => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔍</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No doctors found</h3>
            <p className="text-gray-500">Try adjusting your search criteria, location, or specialty filter.</p>
            <button 
              onClick={() => { setSearchTerm(''); setSelectedSpecialty('All'); setSelectedLocation('All'); }}
              className="mt-6 text-primary font-medium hover:text-primary/80 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}
        
      </div>
    </div>
  );
};

export default DoctorSearch;
