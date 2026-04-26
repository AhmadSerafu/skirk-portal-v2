export default function ConstellationCard({ constellation, index }) {
  return (
    <div className="card p-5 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        {constellation.icon && (
          <img
            src={constellation.icon}
            alt={constellation.name}
            className="w-10 h-10 object-contain shrink-0"
            onError={(e) => (e.target.style.display = "none")}
          />
        )}
        <div className="min-w-0">
          <p className="font-cinzel text-sm font-semibold text-parchment truncate">
            {constellation.name}
          </p>
          <p className="text-xs text-gold">{constellation.unlock}</p>
        </div>
      </div>

      <p className="text-parchment-dim text-sm leading-relaxed">
        {constellation.description?.replace(/\*\*/g, "")}
      </p>
    </div>
  );
}
