export default function SkillCard({ skill }) {
  return (
    <div className="card p-5">
      <p className="font-cinzel text-sm font-semibold text-parchment mb-1">
        {skill.name}
      </p>
      <p className="text-xs text-gold mb-2">{skill.unlock}</p>
      <p className="text-parchment-dim text-sm leading-relaxed mb-4">
        {skill.description}
      </p>

      {skill.upgrades?.length > 0 && (
        <div className="border-t border-void-600 pt-3 flex flex-col gap-1.5">
          <p className="text-xs text-gold font-cinzel mb-1">Base Scaling</p>
          {skill.upgrades.map((upgrade, index) => (
            <div key={index} className="flex justify-between text-xs">
              <span className="text-parchment-dim">{upgrade.name}</span>
              <span className="text-parchment font-semibold">
                {upgrade.value}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
