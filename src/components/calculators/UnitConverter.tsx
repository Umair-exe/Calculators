import React, { useState, useEffect } from 'react';
import { ArrowRightLeft, Ruler } from 'lucide-react';

interface UnitConverterProps {
  onBack: () => void;
}

const UnitConverter: React.FC<UnitConverterProps> = ({ onBack }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [outputValue, setOutputValue] = useState<string>('');
  const [category, setCategory] = useState<string>('length');
  const [fromUnit, setFromUnit] = useState<string>('meters');
  const [toUnit, setToUnit] = useState<string>('feet');

  const conversionData = {
    length: {
      name: 'Length',
      units: {
        meters: { label: 'Meters', factor: 1 },
        feet: { label: 'Feet', factor: 3.28084 },
        inches: { label: 'Inches', factor: 39.3701 },
        centimeters: { label: 'Centimeters', factor: 100 },
        kilometers: { label: 'Kilometers', factor: 0.001 },
        miles: { label: 'Miles', factor: 0.000621371 },
        yards: { label: 'Yards', factor: 1.09361 }
      }
    },
    weight: {
      name: 'Weight',
      units: {
        kilograms: { label: 'Kilograms', factor: 1 },
        pounds: { label: 'Pounds', factor: 2.20462 },
        grams: { label: 'Grams', factor: 1000 },
        ounces: { label: 'Ounces', factor: 35.274 },
        stones: { label: 'Stones', factor: 0.157473 }
      }
    },
    temperature: {
      name: 'Temperature',
      units: {
        celsius: { label: 'Celsius', factor: 1 },
        fahrenheit: { label: 'Fahrenheit', factor: 1 },
        kelvin: { label: 'Kelvin', factor: 1 }
      }
    },
    volume: {
      name: 'Volume',
      units: {
        liters: { label: 'Liters', factor: 1 },
        gallons: { label: 'Gallons (US)', factor: 0.264172 },
        milliliters: { label: 'Milliliters', factor: 1000 },
        cups: { label: 'Cups', factor: 4.22675 },
        pints: { label: 'Pints', factor: 2.11338 },
        quarts: { label: 'Quarts', factor: 1.05669 }
      }
    }
  };

  const convertValue = () => {
    const input = parseFloat(inputValue);
    if (isNaN(input)) {
      setOutputValue('');
      return;
    }

    const categoryData = conversionData[category as keyof typeof conversionData];
    
    if (category === 'temperature') {
      let result: number;
      if (fromUnit === 'celsius' && toUnit === 'fahrenheit') {
        result = (input * 9/5) + 32;
      } else if (fromUnit === 'fahrenheit' && toUnit === 'celsius') {
        result = (input - 32) * 5/9;
      } else if (fromUnit === 'celsius' && toUnit === 'kelvin') {
        result = input + 273.15;
      } else if (fromUnit === 'kelvin' && toUnit === 'celsius') {
        result = input - 273.15;
      } else if (fromUnit === 'fahrenheit' && toUnit === 'kelvin') {
        result = (input - 32) * 5/9 + 273.15;
      } else if (fromUnit === 'kelvin' && toUnit === 'fahrenheit') {
        result = (input - 273.15) * 9/5 + 32;
      } else {
        result = input;
      }
      setOutputValue(result.toFixed(4));
    } else {
      const fromFactor = categoryData.units[fromUnit as keyof typeof categoryData.units].factor;
      const toFactor = categoryData.units[toUnit as keyof typeof categoryData.units].factor;
      const result = (input / fromFactor) * toFactor;
      setOutputValue(result.toFixed(6));
    }
  };

  useEffect(() => {
    const categoryData = conversionData[category as keyof typeof conversionData];
    const units = Object.keys(categoryData.units);
    setFromUnit(units[0]);
    setToUnit(units[1]);
  }, [category]);

  useEffect(() => {
    convertValue();
  }, [inputValue, fromUnit, toUnit, category]);

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setInputValue(outputValue);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-white/50 shadow-xl">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center mr-4">
            <ArrowRightLeft className="text-white" size={24} />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Unit Converter</h2>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Conversion Category
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {Object.entries(conversionData).map(([key, data]) => (
              <button
                key={key}
                onClick={() => setCategory(key)}
                className={`py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  category === key
                    ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {data.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
            >
              {Object.entries(conversionData[category as keyof typeof conversionData].units).map(([key, unit]) => (
                <option key={key} value={key}>{unit.label}</option>
              ))}
            </select>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter value"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 mt-2"
            />
          </div>

          <div className="flex justify-center">
            <button
              onClick={swapUnits}
              className="p-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-full hover:from-orange-600 hover:to-yellow-600 transition-all duration-200 transform hover:scale-110"
            >
              <ArrowRightLeft size={20} />
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
            >
              {Object.entries(conversionData[category as keyof typeof conversionData].units).map(([key, unit]) => (
                <option key={key} value={key}>{unit.label}</option>
              ))}
            </select>
            <div className="w-full px-4 py-3 bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg mt-2 font-semibold text-gray-800">
              {outputValue || '0'}
            </div>
          </div>
        </div>

        <div className="mt-8 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-6 border border-orange-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
            <Ruler className="mr-2 text-orange-500" size={20} />
            Quick Reference
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            {category === 'length' && (
              <>
                <div>• 1 meter = 3.28 feet</div>
                <div>• 1 mile = 1.609 kilometers</div>
                <div>• 1 inch = 2.54 centimeters</div>
                <div>• 1 yard = 0.914 meters</div>
              </>
            )}
            {category === 'weight' && (
              <>
                <div>• 1 kilogram = 2.20 pounds</div>
                <div>• 1 pound = 16 ounces</div>
                <div>• 1 stone = 14 pounds</div>
                <div>• 1 kilogram = 1000 grams</div>
              </>
            )}
            {category === 'temperature' && (
              <>
                <div>• Water freezes: 0°C = 32°F</div>
                <div>• Water boils: 100°C = 212°F</div>
                <div>• Room temperature: ~20°C = 68°F</div>
                <div>• Body temperature: 37°C = 98.6°F</div>
              </>
            )}
            {category === 'volume' && (
              <>
                <div>• 1 liter = 0.264 gallons</div>
                <div>• 1 gallon = 4 quarts</div>
                <div>• 1 cup = 240 milliliters</div>
                <div>• 1 liter = 1000 milliliters</div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitConverter;