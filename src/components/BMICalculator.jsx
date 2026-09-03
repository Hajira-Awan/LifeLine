import { useState } from 'react';
import { Activity } from 'lucide-react';

const BMICalculator = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);

  const calculateBMI = (e) => {
    e.preventDefault();
    if (height && weight) {
      const heightInMeters = height / 100;
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);
      setBmi(bmiValue);
    }
  };

  const getStatus = (bmi) => {
    if (bmi < 18.5) return { label: 'Underweight', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    if (bmi >= 18.5 && bmi < 24.9) return { label: 'Normal weight', color: 'text-green-600', bg: 'bg-green-50' };
    if (bmi >= 25 && bmi < 29.9) return { label: 'Overweight', color: 'text-orange-600', bg: 'bg-orange-50' };
    return { label: 'Obese', color: 'text-red-600', bg: 'bg-red-50' };
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
      <div className="flex items-center mb-4">
        <div className="w-8 h-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center mr-3">
          <Activity className="w-5 h-5" />
        </div>
        <h2 className="text-lg font-bold text-gray-900">BMI Calculator</h2>
      </div>
      
      <form onSubmit={calculateBMI} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Height (cm)</label>
            <input 
              type="number" 
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
              placeholder="175"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Weight (kg)</label>
            <input 
              type="number" 
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
              placeholder="70"
              required
            />
          </div>
        </div>
        <button type="submit" className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium py-2 rounded-xl transition-colors text-sm border border-gray-200">
          Calculate
        </button>
      </form>

      {bmi && (
        <div className={`mt-4 p-4 rounded-xl text-center ${getStatus(bmi).bg}`}>
          <p className="text-sm text-gray-600 mb-1">Your BMI is</p>
          <p className={`text-3xl font-bold ${getStatus(bmi).color}`}>{bmi}</p>
          <p className={`text-sm font-medium mt-1 ${getStatus(bmi).color}`}>{getStatus(bmi).label}</p>
        </div>
      )}
    </div>
  );
};

export default BMICalculator;
