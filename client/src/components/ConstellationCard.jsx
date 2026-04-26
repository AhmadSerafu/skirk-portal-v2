export default function ConstellationCard({ constellation, index }) {
  return (
    <div className="card p-5 flex flex-col gap-3">
      {/* Icon kanan atas + label C1/C2 */}
      <div className="flex justify-between items-start">
        <span className="font-cinzel text-gold font-bold text-sm">
          C{index + 1}
        </span>
        {constellation.icon && (
          <img
            src={constellation.icon}
            alt={constellation.name}
            className="w-10 h-10 object-contain"
          />
        )}
      </div>

      {/* Content */}
      <div>
        <p className="font-cinzel text-sm font-semibold text-parchment mb-1">
          {constellation.name}
        </p>
        <p className="text-xs text-gold mb-2">{constellation.unlock}</p>
        <p className="text-parchment-dim text-sm leading-relaxed">
          {constellation.description?.replace(/\*\*/g, "")}
        </p>
      </div>
    </div>
  );
}
