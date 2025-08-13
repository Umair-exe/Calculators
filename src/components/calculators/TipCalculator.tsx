import React, { useState, useEffect } from 'react';
import { DollarSign, Users } from 'lucide-react';

interface TipCalculatorProps {
  onBack: () => void;
}

const TipCalculator: React.FC<TipCalculatorProps> = ({ onBack }) => {
  const [billAmount, setBillAmount] = useState<string>('');
  const [tipPercentage, setTipPercentage] = useState<number>(18);
  const [numberOfPeople, setNumberOfPeople] = useState<number>(1);
  const [tipAmount, setTipAmount] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [perPersonAmount, setPerPersonAmount] = useState<number>(0);

  const quickTipOptions = [15, 18, 20, 25];

  const calculateTip = () => {
    const bill = parseFloat(billAmount);
    if (!bill || bill <= 0) {
      setTipAmount(0);
      setTotalAmount(0);
      setPerPersonAmount(0);
      return;
    }

    const tip = (bill * tipPercentage) / 100;
    const total = bill + tip;
    const perPerson = total / numberOfPeople;

    setTipAmount(tip);
    setTotalAmount(total);
    setPerPersonAmount(perPerson);
  };

  useEffect(() => {
    calculateTip();
  }, [billAmount, tipPercentage, numberOfPeople]);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-white/50 shadow-xl">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mr-4">
            <DollarSign className="text-white" size={24} />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Tip Calculator</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bill Amount ($)
              </label>
              <input
                type="number"
                value={billAmount}
                onChange={(e) => setBillAmount(e.target.value)}
                placeholder="Enter bill amount"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tip Percentage: {tipPercentage}%
              </label>
              <input
                type="range"
                min="0"
                max="30"
                value={tipPercentage}
                onChange={(e) => setTipPercentage(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0%</span>
                <span>30%</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Quick Tip Options
              </label>
              <div className="grid grid-cols-4 gap-2">
                {quickTipOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => setTipPercentage(option)}
                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      tipPercentage === option
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {option}%
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of People
              </label>
              <div className="flex items-center space-x-3">
                <Users className="text-gray-400" size={20} />
                <input
                  type="number"
                  min="1"
                  value={numberOfPeople}
                  onChange={(e) => setNumberOfPeople(Math.max(1, Number(e.target.value)))}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Calculation Results</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-green-200">
                  <span className="text-gray-600">Bill Amount:</span>
                  <span className="font-semibold text-gray-800">
                    ${parseFloat(billAmount || '0').toFixed(2)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-green-200">
                  <span className="text-gray-600">Tip ({tipPercentage}%):</span>
                  <span className="font-semibold text-green-600">
                    ${tipAmount.toFixed(2)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-green-200">
                  <span className="text-gray-600">Total Amount:</span>
                  <span className="font-bold text-lg text-gray-800">
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>
                
                {numberOfPeople > 1 && (
                  <div className="bg-white/50 rounded-lg p-4 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Per Person:</span>
                      <span className="font-bold text-xl text-green-600">
                        ${perPersonAmount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-4 border border-green-200">
              <h4 className="font-semibold text-gray-800 mb-2">Tip Guide</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <div>• 15-18%: Standard service</div>
                <div>• 18-20%: Good service</div>
                <div>• 20-25%: Excellent service</div>
                <div>• 25%+: Outstanding service</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TipCalculator;