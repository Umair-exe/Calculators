import React, { useState, useEffect } from 'react';
import { ArrowLeft, User, Scale } from 'lucide-react';

interface BMICalculatorProps {
  onBack: () => void;
}

const BMICalculator: React.FC<BMICalculatorProps> = ({ onBack }) => {
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState<string>('');

  const calculateBMI = () => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    if (!weightNum || !heightNum || weightNum <= 0 || heightNum <= 0) {
      setBmi(null);
      setCategory('');
      return;
    }

    let bmiValue: number;
    
    if (unit === 'metric') {
      const heightInM = heightNum / 100;
      bmiValue = weightNum / (heightInM * heightInM);
    } else {
      bmiValue = (weightNum / (heightNum * heightNum)) * 703;
    }

    setBmi(bmiValue);

    if (bmiValue < 18.5) setCategory('Underweight');
    else if (bmiValue < 25) setCategory('Normal weight');
    else if (bmiValue < 30) setCategory('Overweight');
    else setCategory('Obese');
  };

  useEffect(() => {
    calculateBMI();
  }, [weight, height, unit]);

  const getBMIColor = () => {
    if (!bmi) return 'text-gray-500';
    if (bmi < 18.5) return 'text-blue-500';
    if (bmi < 25) return 'text-green-500';
    if (bmi < 30) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-white/50 shadow-xl">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center mr-4">
            <User className="text-white" size={24} />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">BMI Calculator</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Unit System
              </label>
              <div className="flex rounded-lg bg-gray-100 p-1">
                <button
                  onClick={() => setUnit('metric')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                    unit === 'metric'
                      ? 'bg-white text-purple-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Metric
                </button>
                <button
                  onClick={() => setUnit('imperial')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                    unit === 'imperial'
                      ? 'bg-white text-purple-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Imperial
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weight ({unit === 'metric' ? 'kg' : 'lbs'})
              </label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder={unit === 'metric' ? 'Enter weight in kg' : 'Enter weight in lbs'}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Height ({unit === 'metric' ? 'cm' : 'inches'})
              </label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder={unit === 'metric' ? 'Enter height in cm' : 'Enter height in inches'}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 text-center border border-purple-100">
              <Scale className="mx-auto mb-4 text-purple-500" size={48} />
              
              {bmi ? (
                <>
                  <div className={`text-4xl font-bold mb-2 ${getBMIColor()}`}>
                    {bmi.toFixed(1)}
                  </div>
                  <div className={`text-lg font-semibold ${getBMIColor()}`}>
                    {category}
                  </div>
                  <div className="text-sm text-gray-600 mt-2">
                    BMI Score
                  </div>
                </>
              ) : (
                <div className="text-gray-500">
                  <div className="text-2xl font-bold mb-2">--</div>
                  <div>Enter your details</div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">BMI Categories</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center p-3 bg-blue-100 rounded-lg">
              <div className="font-semibold text-blue-700">Underweight</div>
              <div className="text-blue-600">Below 18.5</div>
            </div>
            <div className="text-center p-3 bg-green-100 rounded-lg">
              <div className="font-semibold text-green-700">Normal</div>
              <div className="text-green-600">18.5 - 24.9</div>
            </div>
            <div className="text-center p-3 bg-yellow-100 rounded-lg">
              <div className="font-semibold text-yellow-700">Overweight</div>
              <div className="text-yellow-600">25.0 - 29.9</div>
            </div>
            <div className="text-center p-3 bg-red-100 rounded-lg">
              <div className="font-semibold text-red-700">Obese</div>
              <div className="text-red-600">30.0 and above</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BMICalculator;