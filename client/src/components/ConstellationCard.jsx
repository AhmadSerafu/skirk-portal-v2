export default function ConstellationCard({ constellation, index }) {
  return (
    <div className="card p-5 flex gap-4 items-start">
      <span className="font-cinzel text-gold font-bold text-sm shrink-0">
        C{index + 1}
      </span>
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
