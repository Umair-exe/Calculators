import React from 'react';
import { Calculator, Mail, Shield, FileText } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white/90 backdrop-blur-md border-t border-gray-200 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500">
                <Calculator className="text-white" size={20} />
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                CalcHub Pro
              </h3>
            </div>
            <p className="text-gray-600 mb-4 max-w-md">
              Your trusted source for accurate calculations and conversions. Professional-grade tools for everyday needs, from health metrics to financial planning.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center text-sm text-gray-500">
                <Shield className="w-4 h-4 mr-1" />
                Secure & Private
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Calculator className="w-4 h-4 mr-1" />
                Always Accurate
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Calculators</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-purple-600 transition-colors">BMI Calculator</a></li>
              <li><a href="#" className="hover:text-purple-600 transition-colors">Tip Calculator</a></li>
              <li><a href="#" className="hover:text-purple-600 transition-colors">Loan Calculator</a></li>
              <li><a href="#" className="hover:text-purple-600 transition-colors">Unit Converter</a></li>
              <li><a href="#" className="hover:text-purple-600 transition-colors">Scientific Calculator</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-purple-600 transition-colors flex items-center">
                <Mail className="w-3 h-3 mr-1" />
                Contact Us
              </a></li>
              <li><a href="#" className="hover:text-purple-600 transition-colors flex items-center">
                <FileText className="w-3 h-3 mr-1" />
                Privacy Policy
              </a></li>
              <li><a href="#" className="hover:text-purple-600 transition-colors flex items-center">
                <FileText className="w-3 h-3 mr-1" />
                Terms of Service
              </a></li>
              <li><a href="#" className="hover:text-purple-600 transition-colors">FAQ</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            © 2025 CalcHub Pro. All rights reserved. Built with precision and care.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="text-xs text-gray-400">Made with ❤️ for accuracy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;