import { IoArrowBack } from "react-icons/io5";

const ELEMENT_COLORS = {
  Pyro: "border-red-500/60 shadow-red-500/20",
  Hydro: "border-blue-500/60 shadow-blue-500/20",
  Cryo: "border-cyan-400/60 shadow-cyan-400/20",
  Electro: "border-purple-500/60 shadow-purple-500/20",
  Anemo: "border-emerald-400/60 shadow-emerald-400/20",
  Geo: "border-yellow-500/60 shadow-yellow-500/20",
  Dendro: "border-green-500/60 shadow-green-500/20",
};

const ELEMENT_BG = {
  Pyro: "bg-red-500/10",
  Hydro: "bg-blue-500/10",
  Cryo: "bg-cyan-400/10",
  Electro: "bg-purple-500/10",
  Anemo: "bg-emerald-400/10",
  Geo: "bg-yellow-500/10",
  Dendro: "bg-green-500/10",
};

export default function BuildFormPage({
  characters = [],
  selectedCharacter = [],
  toggleCharacter,
  name,
  setName,
  description,
  setDescription,
  handleSubmit,
  loading,
  search,
  setSearch,
  onBack,
  title = "New Build",
  submitLabel = "Create Build",
  submitLoading,
}) {
  return (
    <div className="min-h-screen px-6 pt-20 pb-12">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col gap-1 mb-2">
          <button
            onClick={onBack}
            className="text-parchment-dim hover:text-gold transition-colors font-cinzel text-xs flex items-center gap-1 w-fit"
          >
            <IoArrowBack /> Back
          </button>
          <h1 className="page-title">{title}</h1>
          <p className="text-parchment-dim text-xs font-nunito">
            Select up to 4 characters to form your team
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* ── Left: form + team preview ── */}
          <div className="flex flex-col gap-5 lg:w-80 shrink-0">
            {/* Build name */}
            <div className="flex flex-col gap-1.5">
              <label className="form-label">Build Name *</label>
              <input
                type="text"
                className="input-field"
                placeholder="e.g. Freeze Comp"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1.5">
              <label className="form-label">Description</label>
              <textarea
                className="input-field resize-none h-24"
                placeholder="Describe your team strategy..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Team preview
                Mobile  : 4 kolom portrait (aspect-[2/5])
                Desktop : 2 kolom square  (lg:grid-cols-2 lg:aspect-square)
            */}
            <div className="grid grid-cols-4 lg:grid-cols-2 gap-2">
              {Array.from({ length: 4 }).map((_, i) => {
                const charId = selectedCharacter[i];
                const charObj = characters.find((c) => c.name === charId);
                const elemClass = ELEMENT_COLORS[charObj?.vision] || "";
                return (
                  <div
                    key={i}
                    onClick={() => charId && toggleCharacter(charId)}
                    className={`relative aspect-[2/5] lg:aspect-square rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                      charId
                        ? `${elemClass} cursor-pointer hover:opacity-75 shadow-lg`
                        : "border-void-600 border-dashed bg-void-950/50"
                    }`}
                  >
                    {charObj ? (
                      <>
                        <img
                          src={
                            charObj.images?.splash || charObj.images?.icon || ""
                          }
                          alt={charObj.name}
                          className="w-full h-full object-cover object-top"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-void-950/80 to-transparent" />
                        <p className="absolute bottom-1 left-0 right-0 text-center font-cinzel text-[9px] text-parchment leading-tight px-0.5 line-clamp-1">
                          {charObj.name}
                        </p>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-void-950/60 transition-opacity">
                          <span className="text-red-400 text-lg font-bold">
                            ✕
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-void-600 text-xl">+</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={handleSubmit}
                className="btn-gold"
                disabled={submitLoading}
              >
                {submitLoading ? (
                  <span className="loading loading-spinner loading-sm" />
                ) : (
                  submitLabel
                )}
              </button>
            </div>
          </div>

          {/* ── Right: character picker ── */}
          <div className="flex-1 flex flex-col gap-3">
            {loading ? (
              <div className="flex justify-center mt-12">
                <span className="loading loading-spinner text-gold w-10 h-10" />
              </div>
            ) : (
              <>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Search characters..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-7 gap-2 max-h-[560px] overflow-y-auto pr-1 no-scrollbar">
                  {characters
                    .filter((char) =>
                      char.name.toLowerCase().includes(search.toLowerCase()),
                    )
                    .map((char) => {
                      const isSelected = selectedCharacter.includes(char.name);
                      const elemBorder =
                        ELEMENT_COLORS[char.vision] || "border-void-600";
                      const elemBg = ELEMENT_BG[char.vision] || "";
                      return (
                        <button
                          key={char.name}
                          onClick={() => toggleCharacter(char.name)}
                          className={`relative flex flex-col items-center gap-1 p-1 rounded-xl border-2 transition-all duration-150 cursor-pointer ${
                            isSelected
                              ? `${elemBorder} ${elemBg} shadow-lg scale-95`
                              : "border-void-600 hover:border-void-500 bg-void-800"
                          }`}
                        >
                          {isSelected && (
                            <div className="absolute top-1 right-1 z-10 w-4 h-4 rounded-full bg-gold flex items-center justify-center">
                              <span className="text-void-900 text-[10px] font-black">
                                ✓
                              </span>
                            </div>
                          )}
                          <div className="w-full aspect-square overflow-hidden rounded-lg bg-void-950">
                            <img
                              src={char.images?.icon || ""}
                              alt={char.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="font-nunito text-parchment text-[9px] leading-tight text-center line-clamp-1 w-full">
                            {char.name}
                          </span>
                        </button>
                      );
                    })}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
