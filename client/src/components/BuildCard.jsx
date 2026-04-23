import { Link } from "react-router";
import DeleteModal from "./DeleteModal";
import { useState } from "react";

export default function BuildCard({ build, handleDelete }) {
  const [showModal, setShowModal] = useState(false);

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

      <div className="card p-4 flex flex-col gap-3">
        {/* Nama & deskripsi — ngembang */}
        <div className="flex-1">
          <h2 className="font-cinzel text-parchment text-base font-semibold">
            {build.name}
          </h2>
          <p className="font-nunito text-parchment-dim text-xs mt-1 line-clamp-2">
            {build.description}
          </p>
        </div>

        {/* Icons + Tombol — selalu nempel bersama di bawah */}
        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            {Array.from({ length: 4 }).map((_, i) => {
              const bc = build.BuildCharacters[i];
              return bc ? (
                <div
                  key={bc.id}
                  className="w-12 h-12 rounded-full overflow-hidden border border-gold/40 bg-void-800"
                >
                  <img
                    src={`https://genshin.jmp.blue/characters/${bc.characterId}/icon`}
                    alt={bc.characterId}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div
                  key={`empty-${i}`}
                  className="w-12 h-12 rounded-full border border-void-600 border-dashed bg-void-950/50"
                />
              );
            })}
          </div>

          <div className="flex gap-2 pt-3 border-t border-void-600">
            <Link
              to={`/builds/${build.id}/edit`}
              className="flex-1 bg-gold text-void-900 font-bold font-cinzel text-xs tracking-widest uppercase py-1.5 rounded-lg hover:bg-gold-light transition-colors text-center"
            >
              Edit
            </Link>
            <button
              className="flex-1 bg-red-800 text-red-100 font-bold font-cinzel text-xs tracking-widest uppercase py-1.5 rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
              onClick={() => setShowModal(true)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
