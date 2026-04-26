import { useState } from "react";

const formatValue = (template, parameters, level) => {
  return template.replace(
    /\{(param\d+):(F1P|F2P|P|F1|F2|I)\}/g,
    (_, key, fmt) => {
      const raw = parameters[key]?.[level - 1] ?? 0;
      if (fmt === "F1P") return (raw * 100).toFixed(1) + "%";
      if (fmt === "F2P") return (raw * 100).toFixed(2) + "%";
      if (fmt === "P") return Math.round(raw * 100) + "%";
      if (fmt === "F1") return raw.toFixed(1);
      if (fmt === "F2") return raw.toFixed(2);
      if (fmt === "I") return Math.round(raw).toString();
      return raw;
    },
  );
};

export default function SkillCard({ skill }) {
  const [talentLevel, setTalentLevel] = useState(10);

  const hasScaling =
    skill.attributes?.labels?.length > 0 &&
    skill.attributes?.parameters &&
    Object.keys(skill.attributes.parameters).length > 0;

  return (
    <div className="card p-5">
      {/* Header: icon + nama + unlock */}
      <div className="flex items-center gap-3 mb-1">
        {skill.icon && (
          <img
            src={skill.icon}
            alt={skill.name}
            className="w-10 h-10 object-contain shrink-0"
          />
        )}
        <div>
          <p className="font-cinzel text-sm font-semibold text-parchment">
            {skill.name}
          </p>
          <p className="text-xs text-gold">{skill.unlock}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-parchment-dim text-sm leading-relaxed mb-4 mt-3">
        {skill.description?.replace(/\*\*/g, "")}
      </p>

      {hasScaling && (
        <div className="border-t border-void-600 pt-3 flex flex-col gap-3">
          {/* Slider per skill */}
          <div className="flex items-center gap-3">
            <span className="form-label shrink-0">Level</span>
            <input
              type="range"
              min={1}
              max={15}
              value={talentLevel}
              onChange={(e) => setTalentLevel(Number(e.target.value))}
              className="flex-1 accent-gold cursor-pointer"
            />
            <span className="font-cinzel text-gold font-bold text-sm w-6 text-center shrink-0">
              {talentLevel}
            </span>
          </div>

          {/* Scaling values */}
          <div className="flex flex-col gap-1.5">
            {skill.attributes.labels.map((label, i) => {
              const [statName, template] = label.split("|");
              if (!template) return null;
              const value = formatValue(
                template,
                skill.attributes.parameters,
                talentLevel,
              );
              return (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row sm:justify-between text-xs gap-0.5"
                >
                  <span className="text-parchment-dim">{statName}</span>
                  <span className="text-parchment font-semibold">{value}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
