import React, { useState } from 'react';
import { Calculator as CalcIcon, Delete } from 'lucide-react';

interface MathCalculatorProps {
  onBack: () => void;
}

const MathCalculator: React.FC<MathCalculatorProps> = ({ onBack }) => {
  const [display, setDisplay] = useState<string>('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState<boolean>(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const buttons = [
    { label: 'C', type: 'clear', className: 'bg-red-500 hover:bg-red-600 text-white' },
    { label: '±', type: 'sign', className: 'bg-gray-300 hover:bg-gray-400 text-gray-800' },
    { label: '%', type: 'percent', className: 'bg-gray-300 hover:bg-gray-400 text-gray-800' },
    { label: '÷', type: 'operation', className: 'bg-orange-500 hover:bg-orange-600 text-white' },
    
    { label: '7', type: 'number', className: 'bg-gray-200 hover:bg-gray-300 text-gray-800' },
    { label: '8', type: 'number', className: 'bg-gray-200 hover:bg-gray-300 text-gray-800' },
    { label: '9', type: 'number', className: 'bg-gray-200 hover:bg-gray-300 text-gray-800' },
    { label: '×', type: 'operation', className: 'bg-orange-500 hover:bg-orange-600 text-white' },
    
    { label: '4', type: 'number', className: 'bg-gray-200 hover:bg-gray-300 text-gray-800' },
    { label: '5', type: 'number', className: 'bg-gray-200 hover:bg-gray-300 text-gray-800' },
    { label: '6', type: 'number', className: 'bg-gray-200 hover:bg-gray-300 text-gray-800' },
    { label: '-', type: 'operation', className: 'bg-orange-500 hover:bg-orange-600 text-white' },
    
    { label: '1', type: 'number', className: 'bg-gray-200 hover:bg-gray-300 text-gray-800' },
    { label: '2', type: 'number', className: 'bg-gray-200 hover:bg-gray-300 text-gray-800' },
    { label: '3', type: 'number', className: 'bg-gray-200 hover:bg-gray-300 text-gray-800' },
    { label: '+', type: 'operation', className: 'bg-orange-500 hover:bg-orange-600 text-white' },
    
    { label: '0', type: 'number', className: 'bg-gray-200 hover:bg-gray-300 text-gray-800 col-span-2' },
    { label: '.', type: 'decimal', className: 'bg-gray-200 hover:bg-gray-300 text-gray-800' },
    { label: '=', type: 'equals', className: 'bg-blue-500 hover:bg-blue-600 text-white' }
  ];

  const handleButtonClick = (button: typeof buttons[0]) => {
    switch (button.type) {
      case 'number':
        inputNumber(button.label);
        break;
      case 'decimal':
        inputDecimal();
        break;
      case 'operation':
        performOperation(button.label);
        break;
      case 'equals':
        handleEquals();
        break;
      case 'clear':
        clear();
        break;
      case 'sign':
        setDisplay(String(parseFloat(display) * -1));
        break;
      case 'percent':
        setDisplay(String(parseFloat(display) / 100));
        break;
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-white/50 shadow-xl">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center mr-4">
            <CalcIcon className="text-white" size={24} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Scientific Calculator</h2>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 mb-6">
          <div className="text-right">
            <div className="text-3xl font-mono text-white min-h-[2.5rem] flex items-center justify-end overflow-hidden">
              {display}
            </div>
            {operation && previousValue !== null && (
              <div className="text-sm text-gray-400 mt-1">
                {previousValue} {operation}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {buttons.map((button, index) => (
            <button
              key={index}
              onClick={() => handleButtonClick(button)}
              className={`
                ${button.className} 
                ${button.label === '0' ? 'col-span-2' : ''} 
                py-4 px-4 rounded-xl font-semibold text-lg 
                transition-all duration-200 transform 
                hover:scale-105 active:scale-95 shadow-lg
              `}
            >
              {button.label}
            </button>
          ))}
        </div>

        <div className="mt-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4 border border-purple-100">
          <h4 className="font-semibold text-gray-800 mb-2">Calculator Features</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <div>• Basic arithmetic operations (+, -, ×, ÷)</div>
            <div>• Decimal point calculations</div>
            <div>• Percentage calculations</div>
            <div>• Sign toggle (positive/negative)</div>
            <div>• Clear function to reset</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MathCalculator;