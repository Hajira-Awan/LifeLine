import { Search, Filter, MapPin } from 'lucide-react';

const SearchFilter = ({ searchTerm, setSearchTerm, selectedSpecialty, setSelectedSpecialty, selectedLocation, setSelectedLocation }) => {
  const specialties = [
    "All", "Cardiologist", "Neurologist", "Dermatologist", 
    "Pediatrician", "Psychiatrist", "Orthopedic", "Gynecologist", 
    "Ophthalmologist", "General Physician", "ENT Specialist"
  ];

  const locations = [
    "All", "New York, NY", "San Francisco, CA", "Miami, FL", 
    "Chicago, IL", "Austin, TX", "Seattle, WA", "Los Angeles, CA", 
    "Boston, MA", "Denver, CO", "Atlanta, GA"
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        
        {/* Search Bar */}
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all sm:text-sm"
            placeholder="Search by doctor name, symptom, or condition..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Location Dropdown */}
        <div className="relative md:w-56">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MapPin className="h-5 w-5 text-gray-400" />
          </div>
          <select
            className="block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl leading-5 bg-gray-50 focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all sm:text-sm appearance-none cursor-pointer"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            {locations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        {/* Specialty Dropdown */}
        <div className="relative md:w-56">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Filter className="h-5 w-5 text-gray-400" />
          </div>
          <select
            className="block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl leading-5 bg-gray-50 focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all sm:text-sm appearance-none cursor-pointer"
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
          >
            {specialties.map(spec => (
              <option key={spec} value={spec}>{spec}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="mt-4 flex flex-wrap gap-2 items-center">
        <span className="text-sm text-gray-500 mr-2">Popular:</span>
        {['Cardiologist', 'Dermatologist', 'General Physician'].map(spec => (
          <button
            key={spec}
            onClick={() => setSelectedSpecialty(spec)}
            className={`px-3 py-1 text-xs rounded-full border transition-colors ${
              selectedSpecialty === spec 
                ? 'bg-primary/10 border-primary/20 text-primary font-medium' 
                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {spec}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchFilter;
