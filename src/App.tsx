import React, { useState } from 'react';
import SEOHead from './components/SEOHead';
import Footer from './components/Footer';
import AdPlaceholder from './components/AdPlaceholder';
import Dashboard from './components/Dashboard';
import BMICalculator from './components/calculators/BMICalculator';
import TipCalculator from './components/calculators/TipCalculator';
import LoanCalculator from './components/calculators/LoanCalculator';
import UnitConverter from './components/calculators/UnitConverter';
import MathCalculator from './components/calculators/MathCalculator';
import Header from './components/Header';

type CalculatorType = 'dashboard' | 'bmi' | 'tip' | 'loan' | 'unit' | 'math';

function App() {
  const [activeCalculator, setActiveCalculator] = useState<CalculatorType>('dashboard');

  const getSEOData = () => {
    switch (activeCalculator) {
      case 'bmi':
        return {
          title: 'BMI Calculator - Calculate Your Body Mass Index | CalcHub Pro',
          description: 'Free BMI calculator to determine your Body Mass Index and health category. Supports both metric and imperial units with instant results.',
          keywords: 'BMI calculator, body mass index, health calculator, weight calculator, BMI chart'
        };
      case 'tip':
        return {
          title: 'Tip Calculator - Calculate Tips & Split Bills | CalcHub Pro',
          description: 'Easy tip calculator to calculate gratuity and split bills among friends. Supports custom tip percentages and multiple people.',
          keywords: 'tip calculator, gratuity calculator, bill splitter, restaurant tip, dining calculator'
        };
      case 'loan':
        return {
          title: 'Loan Calculator - Calculate Monthly Payments | CalcHub Pro',
          description: 'Calculate loan payments, interest rates, and total costs. Perfect for mortgages, auto loans, and personal loans.',
          keywords: 'loan calculator, mortgage calculator, payment calculator, interest calculator, finance calculator'
        };
      case 'unit':
        return {
          title: 'Unit Converter - Convert Length, Weight, Temperature | CalcHub Pro',
          description: 'Convert between different units of measurement including length, weight, temperature, and volume. Fast and accurate conversions.',
          keywords: 'unit converter, measurement converter, length converter, weight converter, temperature converter'
        };
      case 'math':
        return {
          title: 'Scientific Calculator - Advanced Math Calculator | CalcHub Pro',
          description: 'Professional scientific calculator for complex mathematical calculations. Perfect for students and professionals.',
          keywords: 'scientific calculator, math calculator, advanced calculator, online calculator'
        };
      default:
        return {
          title: 'CalcHub Pro - Professional Calculators & Converters',
          description: 'Free online calculators for BMI, tips, loans, unit conversions, and scientific calculations. Accurate, fast, and mobile-friendly tools.',
          keywords: 'calculator, online calculators, BMI calculator, tip calculator, loan calculator, unit converter'
        };
    }
  };

  const renderCalculator = () => {
    switch (activeCalculator) {
      case 'bmi':
        return (
          <>
            <AdPlaceholder size="banner" position="top" />
            <BMICalculator onBack={() => setActiveCalculator('dashboard')} />
            <AdPlaceholder size="rectangle" position="bottom" />
          </>
        );
      case 'tip':
        return (
          <>
            <AdPlaceholder size="banner" position="top" />
            <TipCalculator onBack={() => setActiveCalculator('dashboard')} />
            <AdPlaceholder size="rectangle" position="bottom" />
          </>
        );
      case 'loan':
        return (
          <>
            <AdPlaceholder size="banner" position="top" />
            <LoanCalculator onBack={() => setActiveCalculator('dashboard')} />
            <AdPlaceholder size="rectangle" position="bottom" />
          </>
        );
      case 'unit':
        return (
          <>
            <AdPlaceholder size="banner" position="top" />
            <UnitConverter onBack={() => setActiveCalculator('dashboard')} />
            <AdPlaceholder size="rectangle" position="bottom" />
          </>
        );
      case 'math':
        return (
          <>
            <AdPlaceholder size="banner" position="top" />
            <MathCalculator onBack={() => setActiveCalculator('dashboard')} />
            <AdPlaceholder size="rectangle" position="bottom" />
          </>
        );
      default:
        return (
          <>
            <AdPlaceholder size="banner" position="hero" />
            <Dashboard onSelectCalculator={setActiveCalculator} />
          </>
        );
    }
  };

  const seoData = getSEOData();

  return (
    <>
      <SEOHead {...seoData} />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 flex flex-col">
        <Header 
          showBackButton={activeCalculator !== 'dashboard'}
          onBack={() => setActiveCalculator('dashboard')}
        />
        <main className="container mx-auto px-4 py-8 flex-1">
          {renderCalculator()}
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;