import React from 'react';
import AdPlaceholder from './AdPlaceholder';
import { 
  User, 
  DollarSign, 
  Calculator as CalcIcon, 
  ArrowRightLeft, 
  PiggyBank 
} from 'lucide-react';

interface DashboardProps {
  onSelectCalculator: (calculator: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onSelectCalculator }) => {
  const calculators = [
    {
      id: 'bmi',
      title: 'BMI Calculator',
      description: 'Calculate your Body Mass Index and health status',
      icon: User,
      gradient: 'from-pink-500 to-rose-500',
      bgGradient: 'from-pink-50 to-rose-50'
    },
    {
      id: 'tip',
      title: 'Tip Calculator',
      description: 'Calculate tips and split bills with friends',
      icon: DollarSign,
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50'
    },
    {
      id: 'loan',
      title: 'Loan Calculator',
      description: 'Calculate loan payments and interest rates',
      icon: PiggyBank,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50'
    },
    {
      id: 'unit',
      title: 'Unit Converter',
      description: 'Convert between different units of measurement',
      icon: ArrowRightLeft,
      gradient: 'from-orange-500 to-yellow-500',
      bgGradient: 'from-orange-50 to-yellow-50'
    },
    {
      id: 'math',
      title: 'Scientific Calculator',
      description: 'Advanced mathematical calculations and functions',
      icon: CalcIcon,
      gradient: 'from-purple-500 to-indigo-500',
      bgGradient: 'from-purple-50 to-indigo-50'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Choose Your Calculator
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Professional-grade calculators for everyday needs. Fast, accurate, and easy to use.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {calculators.map((calc) => {
          const Icon = calc.icon;
          return (
            <div
              key={calc.id}
              onClick={() => onSelectCalculator(calc.id)}
              className={`
                group cursor-pointer transform transition-all duration-300 
                hover:scale-105 hover:-translate-y-2
              `}
            >
              <div className={`
                bg-gradient-to-br ${calc.bgGradient} 
                rounded-2xl p-6 border border-white/50 
                shadow-lg hover:shadow-2xl transition-all duration-300
                backdrop-blur-sm
              `}>
                <div className={`
                  w-16 h-16 rounded-xl bg-gradient-to-r ${calc.gradient} 
                  flex items-center justify-center mb-4 
                  group-hover:scale-110 transition-transform duration-300
                `}>
                  <Icon className="text-white" size={28} />
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {calc.title}
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed">
                  {calc.description}
                </p>
                
                <div className="mt-4 text-sm font-medium text-transparent bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text group-hover:from-purple-700 group-hover:to-blue-700 transition-all duration-300">
                  Click to calculate →
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <AdPlaceholder size="rectangle" position="mid-content" />

      <div className="mt-16 text-center">
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/50 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Why Choose CalcHub Pro?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">✓</span>
              </div>
              <h4 className="font-semibold text-gray-800">Accurate Results</h4>
              <p className="text-sm text-gray-600">Precise calculations you can trust</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">⚡</span>
              </div>
              <h4 className="font-semibold text-gray-800">Lightning Fast</h4>
              <p className="text-sm text-gray-600">Instant results as you type</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">📱</span>
              </div>
              <h4 className="font-semibold text-gray-800">Mobile Friendly</h4>
              <p className="text-sm text-gray-600">Works perfectly on any device</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
            Popular Calculator Categories
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-100">
              <div className="font-semibold text-purple-700 mb-1">Health & Fitness</div>
              <div className="text-purple-600 text-xs">BMI, Body Fat, Calorie</div>
            </div>
            <div className="text-center p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-100">
              <div className="font-semibold text-green-700 mb-1">Financial</div>
              <div className="text-green-600 text-xs">Loans, Mortgage, Investment</div>
            </div>
            <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-100">
              <div className="font-semibold text-blue-700 mb-1">Everyday</div>
              <div className="text-blue-600 text-xs">Tips, Discounts, Tax</div>
            </div>
            <div className="text-center p-3 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg border border-orange-100">
              <div className="font-semibold text-orange-700 mb-1">Conversions</div>
              <div className="text-orange-600 text-xs">Units, Currency, Time</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;