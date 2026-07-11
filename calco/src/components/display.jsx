export default function Display({ expression, result }) {
  return (
    <div className="bg-[#c2cacc] border-4 border-[#a3adaf] rounded-lg p-3 text-right shadow-inner mb-6 h-20 flex flex-col justify-between overflow-hidden">
      {/* Small top expression context */}
      <div className="text-xs text-slate-600 font-mono tracking-wider truncate">
        {expression || '0'}
      </div>
      {/* Primary result layout */}
      <div className="text-2xl font-bold font-mono text-slate-800 tracking-tight truncate">
        {result || expression || '0'}
      </div>
    </div>
  );
}