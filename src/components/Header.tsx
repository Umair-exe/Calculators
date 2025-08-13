import React from 'react';
import { Calculator, ArrowLeft } from 'lucide-react';

interface HeaderProps {
  showBackButton?: boolean;
  onBack?: () => void;
}

const Header: React.FC<HeaderProps> = ({ showBackButton, onBack }) => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {showBackButton && (
              <button
                onClick={onBack}
                className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 transition-all duration-200 transform hover:scale-105"
              >
                <ArrowLeft size={20} />
              </button>
            )}
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500">
                <Calculator className="text-white" size={24} />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                CalcHub Pro
              </h1>
            </div>
          </div>
          <div className="text-sm text-gray-600 hidden sm:block">
            Professional Calculators & Converters
          </div>
          <div className="hidden md:flex items-center space-x-4 text-sm">
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
              ✓ Free Forever
            </span>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
              ⚡ Instant Results
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;