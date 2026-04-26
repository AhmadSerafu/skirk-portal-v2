export default function PassiveCard({ passive }) {
  return (
    <div className="card p-5">
      <div className="flex items-center gap-3 mb-1">
        {passive.icon && (
          <img
            src={passive.icon}
            alt={passive.name}
            className="w-10 h-10 object-contain shrink-0"
            onError={(e) => (e.target.style.display = "none")}
          />
        )}
        <div className="min-w-0">
          <p className="font-cinzel text-sm font-semibold text-parchment truncate">
            {passive.name}
          </p>
          <p className="text-xs text-gold">{passive.unlock}</p>
        </div>
      </div>
      <p className="text-parchment-dim text-sm leading-relaxed mt-3">
        {passive.description?.replace(/\*\*/g, "")}
      </p>
    </div>
  );
}
