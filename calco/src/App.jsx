import { useState } from 'react';
import Display from './components/Display';
import Keypad from './components/Keypad';

export default function App() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');

  const handleButtonPress = (value) => {
    if (value === 'CLEAR') {
      setExpression('');
      setResult('');
      return;
    }

    if (value === 'DEL') {
      // Handles deleting backspace token sequences safely
      if (expression.endsWith('sqrt(')) {
        setExpression(expression.slice(0, -5));
      } else if (expression.endsWith('^2')) {
        setExpression(expression.slice(0, -2));
      } else {
        setExpression(expression.slice(0, -1));
      }
      setResult('');
      return;
    }

    if (value === '=') {
      try {
        if (!expression.trim()) return;

        // Parse human-readable symbols into valid JavaScript math equations
        let formattedExpr = expression
          .replace(/sqrt\(([^)]+)\)/g, 'Math.sqrt($1)') 
          .replace(/([^)+*/-]+)\^2/g, 'Math.pow($1,2)');

        // Safely compute expression strings dynamically
        const evaluated = new Function(`return (${formattedExpr})`)();
        
        if (evaluated === undefined || isNaN(evaluated)) {
          setResult('Error');
        } else {
          // Format decimals nicely to prevent floating point pixel shifts
          setResult(Number(evaluated.toFixed(8)).toString());
        }
      } catch (error) {
        setResult('Error');
      }
      return;
    }

    // Clear previous calculated buffer automatically on new text entries
    if (result) {
      if (['+', '-', '*', '/'].includes(value)) {
        setExpression(result + value);
      } else {
        setExpression(value);
      }
      setResult('');
    } else {
      setExpression((prev) => prev + value);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      {/* Main Base Plate Calculator Canvas Frame */}
      <div className="w-full max-w-xs bg-[#7fb0bd] rounded-2xl shadow-xl overflow-hidden border border-[#6ea0ad]">
        
        {/* Deep Slate Accent Header Mask */}
        <div className="bg-[#3d4547] p-5 pb-3">
          <Display expression={expression} result={result} />
        </div>

        {/* Dynamic Buttons Panel */}
        <div className="p-4 bg-[#7fb0bd]">
          <Keypad onButtonPress={handleButtonPress} />
        </div>

      </div>
    </div>
  );
}