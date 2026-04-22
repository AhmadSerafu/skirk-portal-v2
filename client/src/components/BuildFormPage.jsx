import { useNavigate } from "react-router";

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
}) {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen px-6 pt-24 pb-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="page-title mb-2">{title}</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left — form */}
          <div className="flex flex-col gap-5 lg:w-72 shrink-0">
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

            <div className="flex flex-col gap-1.5">
              <label className="form-label">Description</label>
              <textarea
                className="input-field resize-none h-28"
                placeholder="Describe your team strategy..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Team preview */}
            <div className="flex flex-col gap-2">
              <label className="form-label">
                Team ({selectedCharacter.length}/4)
              </label>
              <div className="flex gap-2">
                {Array.from({ length: 4 }).map((_, i) => {
                  const charId = selectedCharacter[i];
                  return (
                    <div
                      key={i}
                      onClick={() => charId && toggleCharacter(charId)}
                      className={`w-16 h-16 rounded-full overflow-hidden border-2 bg-void-950 ${
                        charId
                          ? "border-gold/60 cursor-pointer hover:opacity-75 transition-opacity"
                          : "border-void-600 border-dashed"
                      }`}
                    >
                      {charId && (
                        <img
                          src={`https://genshin.jmp.blue/characters/${charId}/icon`}
                          alt={charId}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <button onClick={handleSubmit} className="btn-gold">
              {submitLabel}
            </button>
            <button onClick={onBack} className="btn-outline">
              Back
            </button>
          </div>

          {/* Right — character picker */}
          <div className="flex-1 flex flex-col gap-4">
            {loading ? (
              <div className="flex justify-center mt-12">
                <span className="loading loading-spinner text-gold w-10 h-10"></span>
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
                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2 max-h-140 overflow-y-auto pr-1">
                  {characters
                    .filter((char) =>
                      char.name.toLowerCase().includes(search.toLowerCase()),
                    )
                    .map((char) => {
                      const isSelected = selectedCharacter.includes(char.id);
                      return (
                        <button
                          key={char.id}
                          onClick={() => toggleCharacter(char.id)}
                          className={`card p-1.5 flex flex-col items-center gap-1 cursor-pointer transition-all ${
                            isSelected
                              ? "border-gold/60 ring-1 ring-gold/30"
                              : "hover:border-gold/20"
                          }`}
                        >
                          <div className="w-full aspect-square overflow-hidden rounded-md bg-void-950">
                            <img
                              src={`https://genshin.jmp.blue/characters/${char.id}/icon`}
                              alt={char.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="font-nunito text-parchment text-[10px] leading-tight text-center line-clamp-2">
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
