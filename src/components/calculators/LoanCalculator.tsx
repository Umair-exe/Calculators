import React, { useState, useEffect } from 'react';
import { PiggyBank, TrendingUp } from 'lucide-react';

interface LoanCalculatorProps {
  onBack: () => void;
}

const LoanCalculator: React.FC<LoanCalculatorProps> = ({ onBack }) => {
  const [loanAmount, setLoanAmount] = useState<string>('');
  const [interestRate, setInterestRate] = useState<string>('');
  const [loanTerm, setLoanTerm] = useState<string>('');
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const calculateLoan = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12;
    const months = parseFloat(loanTerm) * 12;

    if (!principal || !rate || !months || principal <= 0 || months <= 0) {
      setMonthlyPayment(0);
      setTotalInterest(0);
      setTotalAmount(0);
      return;
    }

    const monthly = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
    const total = monthly * months;
    const interest = total - principal;

    setMonthlyPayment(monthly);
    setTotalAmount(total);
    setTotalInterest(interest);
  };

  useEffect(() => {
    calculateLoan();
  }, [loanAmount, interestRate, loanTerm]);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-white/50 shadow-xl">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mr-4">
            <PiggyBank className="text-white" size={24} />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Loan Calculator</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loan Amount ($)
              </label>
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                placeholder="Enter loan amount"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Annual Interest Rate (%)
              </label>
              <input
                type="number"
                step="0.01"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                placeholder="Enter interest rate"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loan Term (Years)
              </label>
              <input
                type="number"
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
                placeholder="Enter loan term"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <TrendingUp className="mr-2 text-blue-500" size={20} />
                Payment Summary
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-blue-200">
                  <span className="text-gray-600">Monthly Payment:</span>
                  <span className="font-bold text-xl text-blue-600">
                    ${monthlyPayment.toFixed(2)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-blue-200">
                  <span className="text-gray-600">Total Interest:</span>
                  <span className="font-semibold text-red-600">
                    ${totalInterest.toFixed(2)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Total Amount:</span>
                  <span className="font-bold text-lg text-gray-800">
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl p-4 border border-blue-200">
              <h4 className="font-semibold text-gray-800 mb-2">Loan Breakdown</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <div>• Principal: ${parseFloat(loanAmount || '0').toFixed(2)}</div>
                <div>• Interest: ${totalInterest.toFixed(2)}</div>
                <div>• Term: {loanTerm || 0} years ({(parseFloat(loanTerm || '0') * 12).toFixed(0)} months)</div>
                <div>• Interest Rate: {interestRate || 0}% annual</div>
              </div>
            </div>
          </div>
        </div>

        {monthlyPayment > 0 && (
          <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Payment Schedule Preview</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 text-gray-600">Year</th>
                    <th className="text-right py-2 text-gray-600">Interest Paid</th>
                    <th className="text-right py-2 text-gray-600">Principal Paid</th>
                    <th className="text-right py-2 text-gray-600">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: Math.min(5, parseInt(loanTerm || '0')) }, (_, i) => {
                    const year = i + 1;
                    const balance = parseFloat(loanAmount || '0') - (monthlyPayment * 12 * year - totalInterest * (year / parseFloat(loanTerm || '1')));
                    return (
                      <tr key={year} className="border-b border-gray-100">
                        <td className="py-2 text-gray-800">{year}</td>
                        <td className="text-right py-2 text-red-600">${(totalInterest / parseFloat(loanTerm || '1')).toFixed(2)}</td>
                        <td className="text-right py-2 text-green-600">${(monthlyPayment * 12 - (totalInterest / parseFloat(loanTerm || '1'))).toFixed(2)}</td>
                        <td className="text-right py-2 text-gray-800">${Math.max(0, balance).toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoanCalculator;