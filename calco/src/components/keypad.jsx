export default function Keypad({ onButtonPress }) {
  // Config array mapping label values to button behaviors
  const buttons = [
    { label: '√', value: 'sqrt(', type: 'op' },
    { label: 'x²', value: '^2', type: 'op' },
    { label: '(', value: '(', type: 'op' },
    { label: ')', value: ')', type: 'op' },
    { label: '1', value: '1', type: 'num' },
    { label: '2', value: '2', type: 'num' },
    { label: '3', value: '3', type: 'num' },
    { label: '4', value: '4', type: 'num' },
    { label: '5', value: '5', type: 'num' },
    { label: '6', value: '6', type: 'num' },
    { label: '7', value: '7', type: 'num' },
    { label: '8', value: '8', type: 'num' },
    { label: '+', value: '+', type: 'op' },
    { label: '-', value: '-', type: 'op' },
    { label: '*', value: '*', type: 'op' },
    { label: '/', value: '/', type: 'op' },
    { label: '.', value: '.', type: 'num' },
    { label: '⌫', value: 'DEL', type: 'del' },
    { label: 'C', value: 'CLEAR', type: 'clear' },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Main Grid: 4 columns matching the source wireframe layout */}
      <div className="grid grid-cols-4 gap-3">
        {buttons.map((btn, index) => (
          <button
            key={index}
            onClick={() => onButtonPress(btn.value)}
            className={`h-14 font-sans text-xl font-medium rounded-lg shadow-sm active:scale-95 transition-all flex items-center justify-center text-white text-opacity-95 ${
              btn.type === 'clear' || btn.type === 'del'
                ? 'bg-amber-600 hover:bg-amber-700'
                : 'bg-[#568d9c] hover:bg-[#497885]'
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Spanning Equals Footer Button matching visual reference layout */}
      <button
        onClick={() => onButtonPress('=')}
        className="w-full h-14 bg-[#416e79] hover:bg-[#365c66] text-white text-2xl font-bold rounded-lg shadow-md active:scale-[0.99] transition-all flex items-center justify-center"
      >
        =
      </button>
    </div>
  );
}