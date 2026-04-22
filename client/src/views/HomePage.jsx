import { Link } from "react-router";
import skirkImg from "../assets/skirk.webp";

export default function HomePage() {
  const isLoggedIn = !!localStorage.getItem("access_token");

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero section */}
      <div className="relative flex-1 flex items-center min-h-screen overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 bg-linear-to-r from-void-950 via-void-900 to-void-950" />
        <div className="absolute right-0 top-0 w-2/3 h-full opacity-20 bg-linear-to-l from-blue-900 to-transparent" />

        {/* Skirk image */}
        <div className="absolute left-[25%] right-0 top-0 bottom-0 items-center pt-16 overflow-hidden hidden md:flex">
          <img src={skirkImg} alt="Skirk" className="w-full object-contain" />
        </div>

        {/* Content */}
        <div className="relative z-10 px-12 max-w-6xl mx-auto w-full">
          <p className="font-nunito text-gold text-sm tracking-widest uppercase mb-3">
            Genshin Impact
          </p>
          <h1 className="font-cinzel text-5xl lg:text-6xl font-bold text-parchment leading-tight mb-4">
            Skirk <br />
            <span className="text-gold">Portal</span>
          </h1>
          <p className="font-nunito text-parchment-dim text-lg max-w-md mb-8 leading-relaxed">
            Explore characters, build your dream team, and analyze your synergy
            with the power of AI.
          </p>

          <div className="flex gap-4">
            <Link to="/characters" className="btn-gold w-fit px-8 py-3 text-sm">
              Explore Characters
            </Link>
            {!isLoggedIn && (
              <Link to="/login" className="btn-outline w-fit px-8 py-3 text-sm">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Feature section */}
      <div className="px-12 py-16 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card p-6 flex flex-col gap-2">
            <h3 className="font-cinzel text-gold text-base font-semibold">
              Characters
            </h3>
            <p className="font-nunito text-parchment-dim text-sm leading-relaxed">
              Browse all Genshin Impact characters — filter by element and
              weapon type.
            </p>
          </div>
          <div className="card p-6 flex flex-col gap-2">
            <h3 className="font-cinzel text-gold text-base font-semibold">
              Team Builds
            </h3>
            <p className="font-nunito text-parchment-dim text-sm leading-relaxed">
              Create and manage your team compositions. Save your favorite
              builds for quick access.
            </p>
          </div>
          <div className="card p-6 flex flex-col gap-2">
            <h3 className="font-cinzel text-gold text-base font-semibold">
              AI Analyzer
            </h3>
            <p className="font-nunito text-parchment-dim text-sm leading-relaxed">
              Let AI analyze your team synergy, elemental reactions, strengths
              and weaknesses.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
