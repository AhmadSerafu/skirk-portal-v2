import { Link } from "react-router";
import DeleteModal from "./DeleteModal";
import { useState } from "react";

const ELEMENT_COLORS = {
  Pyro: "border-red-500/60",
  Hydro: "border-blue-500/60",
  Cryo: "border-cyan-400/60",
  Electro: "border-purple-500/60",
  Anemo: "border-emerald-400/60",
  Geo: "border-yellow-500/60",
  Dendro: "border-green-500/60",
};

const ELEMENT_GLOW = {
  Pyro: "shadow-[0_0_10px_rgba(239,68,68,0.3)]",
  Hydro: "shadow-[0_0_10px_rgba(59,130,246,0.3)]",
  Cryo: "shadow-[0_0_10px_rgba(34,211,238,0.3)]",
  Electro: "shadow-[0_0_10px_rgba(168,85,247,0.3)]",
  Anemo: "shadow-[0_0_10px_rgba(52,211,153,0.3)]",
  Geo: "shadow-[0_0_10px_rgba(234,179,8,0.3)]",
  Dendro: "shadow-[0_0_10px_rgba(34,197,94,0.3)]",
};

export default function BuildCard({ build, handleDelete }) {
  const [showModal, setShowModal] = useState(false);

  // Karakter pertama sebagai "hero" card
  const hero = build.BuildCharacters?.[0];
  const bgSplash = hero?.splash || null;

  return (
    <>
      {showModal && (
        <DeleteModal
          buildName={build.name}
          onConfirm={() => {
            handleDelete(build.id);
            setShowModal(false);
          }}
          onCancel={() => setShowModal(false)}
        />
      )}

      <div className="group relative rounded-xl overflow-hidden border border-void-600 hover:border-gold/40 transition-all duration-300 flex flex-col">
        {/* ── Hero section: splash background ── */}
        <div className="relative h-36 overflow-hidden bg-void-800">
          {bgSplash && (
            <img
              src={bgSplash}
              alt=""
              className="absolute inset-0 w-full h-full object-cover object-top scale-110 transition-transform duration-500 group-hover:scale-100"
              style={{ filter: "blur(1px) brightness(0.5)" }}
            />
          )}
          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-void-900 via-void-900/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-void-900/80 via-transparent to-transparent" />

          {/* Build name + description overlaid */}
          <div className="relative z-10 h-full flex flex-col justify-end p-4">
            <h2 className="font-cinzel text-parchment text-base font-bold leading-tight line-clamp-1">
              {build.name}
            </h2>
            {build.description && (
              <p className="font-nunito text-parchment-dim text-xs mt-1 line-clamp-2 leading-relaxed">
                {build.description}
              </p>
            )}
          </div>
        </div>

        {/* ── Character slots ── */}
        <div className="bg-void-800 px-4 py-3 flex gap-2.5 border-t border-void-600/50">
          {Array.from({ length: 4 }).map((_, i) => {
            const bc = build.BuildCharacters?.[i];
            return bc ? (
              <div
                key={bc.id}
                className={`relative w-12 h-12 rounded-lg overflow-hidden border-2 bg-void-900 shrink-0 ...`}
              >
                {bc.icon ? (
                  <img
                    src={bc.icon}
                    alt={bc.characterId}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center p-1">
                    <span className="text-parchment-dim text-[9px] text-center leading-tight capitalize">
                      {bc.characterId}
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <div
                key={`empty-${i}`}
                className="w-12 h-12 rounded-lg border border-dashed border-void-600 bg-void-950/50 shrink-0 flex items-center justify-center"
              >
                <span className="text-void-600 text-lg">+</span>
              </div>
            );
          })}
        </div>

        {/* ── Actions ── */}
        <div className="bg-void-900 px-4 py-3 flex gap-2 border-t border-void-600/50">
          <Link
            to={`/builds/${build.id}/edit`}
            className="flex-1 bg-gold text-void-900 font-bold font-cinzel text-xs tracking-widest uppercase py-1.5 rounded-lg hover:bg-gold-light transition-colors text-center"
          >
            Edit
          </Link>
          <button
            className="flex-1 bg-red-900/60 text-red-300 font-bold font-cinzel text-xs tracking-widest uppercase py-1.5 rounded-lg hover:bg-red-800/80 transition-colors cursor-pointer border border-red-800/50"
            onClick={() => setShowModal(true)}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
}
