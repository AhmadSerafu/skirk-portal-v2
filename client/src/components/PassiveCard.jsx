export default function PassiveCard({ passive }) {
  return (
    <div className="card p-5">
      <p className="font-cinzel text-sm font-semibold text-parchment mb-1">
        {passive.name}
      </p>
      <p className="text-xs text-gold mb-2">{passive.unlock}</p>
      <p className="text-parchment-dim text-sm leading-relaxed">
        {passive.description}
      </p>
    </div>
  );
}
