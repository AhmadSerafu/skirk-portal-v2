import { Link } from "react-router";
import skirkImg from "../assets/skirk.webp";
import { GiSwordwoman, GiTeamIdea } from "react-icons/gi";
import { RiRobot2Line } from "react-icons/ri";

const FEATURES = [
  {
    number: "01",
    icon: GiSwordwoman,
    title: "Characters",
    description:
      "Browse all Genshin Impact characters — filter by element and weapon type.",
    to: "/characters",
  },
  {
    number: "02",
    icon: GiTeamIdea,
    title: "Team Builds",
    description:
      "Create and manage your team compositions. Save your favorite builds for quick access.",
    to: "/builds",
  },
  {
    number: "03",
    icon: RiRobot2Line,
    title: "AI Analyzer",
    description:
      "Let AI analyze your team synergy, elemental reactions, strengths and weaknesses.",
    to: "/ai",
  },
];

export default function HomePage() {
  const isLoggedIn = !!localStorage.getItem("access_token");

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero section */}
      <div className="relative flex-1 flex items-center min-h-screen overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 bg-linear-to-r from-void-950 via-void-900 to-void-950" />
        <div className="absolute right-0 top-0 w-2/3 h-full opacity-20 bg-linear-to-l from-blue-900 to-transparent" />

        {/* Skirk image — desktop: kanan, mobile: background */}
        <div className="absolute left-[25%] right-0 top-0 bottom-0 items-center pt-16 overflow-hidden hidden md:flex">
          <img src={skirkImg} alt="Skirk" className="w-full object-contain" />
        </div>

        {/* Skirk mobile — background dengan opacity */}
        <div className="absolute inset-0 flex items-start justify-end md:hidden overflow-hidden">
          <img
            src={skirkImg}
            alt="Skirk"
            className="h-5/6 object-contain opacity-10 translate-y-8 translate-x-8 scale-150"
          />
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
          <p className="font-nunito text-parchment-dim text-lg max-w-sm mb-8 leading-relaxed">
            Explore characters, build your dream team, and analyze your synergy
            with the power of AI.
          </p>

          <div className="flex gap-4">
            <Link to="/characters" className="btn-gold w-fit px-6 py-3 text-sm">
              <span className="hidden sm:inline">Explore Characters</span>
              <span className="sm:hidden">Explore</span>
            </Link>
            {!isLoggedIn && (
              <Link
                to="/login"
                className="btn-outline w-fit px-8 py-3 text-sm flex items-center justify-center"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Feature section */}
      <div className="px-12 py-16 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURES.map((feature) => (
            <Link
              key={feature.number}
              to={feature.to}
              className="card p-6 flex flex-col gap-4 border-t-2 border-t-gold/40 hover:border-t-gold hover:shadow-[0_0_20px_rgba(201,168,76,0.1)] transition-all duration-300 group"
            >
              {/* Top row: icon + nomor dekoratif */}
              <div className="flex items-start justify-between">
                <feature.icon className="text-gold text-2xl" />
                {/* Nomor besar sebagai dekorasi — opacity rendah */}
                <span className="font-cinzel text-5xl font-bold text-gold/10 leading-none group-hover:text-gold/20 transition-colors duration-300">
                  {feature.number}
                </span>
              </div>

              {/* Title + description */}
              <div className="flex flex-col gap-1.5">
                <h3 className="font-cinzel text-gold text-base font-semibold">
                  {feature.title}
                </h3>
                <p className="font-nunito text-parchment-dim text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Arrow link di bawah */}
              <span className="font-cinzel text-xs text-parchment-dim group-hover:text-gold transition-colors duration-300 mt-auto tracking-widest uppercase">
                Explore →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
