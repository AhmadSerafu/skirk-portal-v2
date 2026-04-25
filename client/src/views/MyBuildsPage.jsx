import { useEffect } from "react";
import { Link } from "react-router";
import BuildCard from "../components/BuildCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchBuilds } from "../features/builds/buildsSlice";
import { toast } from "react-toastify";
import axios from "axios";
import { url } from "../constants/url";

export default function MyBuildsPage() {
  const { data: builds, loading } = useSelector((state) => state.builds);
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${url}/builds/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      toast.success("Build Deleted!");
      dispatch(fetchBuilds());
    } catch (error) {
      toast.error("Failed to delete build!");
    }
  };

  useEffect(() => {
    dispatch(fetchBuilds());
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner text-gold w-16 h-16"></span>
      </div>
    );

  return (
    <div className="min-h-screen px-6 pt-24 pb-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="page-title">My Builds</h1>
          <Link
            to="/builds/create"
            className="btn-gold text-xs px-6 py-2.5 w-fit"
          >
            + New Build
          </Link>
        </div>

        {/* Empty state */}
        {builds.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-24 gap-5 text-center">
            <div className="text-7xl opacity-20">⚔️</div>
            <div>
              <p className="font-cinzel text-parchment text-lg font-semibold">
                No Builds Yet
              </p>
              <p className="font-nunito text-parchment-dim text-sm mt-1 max-w-xs">
                Start building your dream team. Create your first build and
                analyze it with AI.
              </p>
            </div>
            <Link
              to="/builds/create"
              className="btn-gold text-xs px-6 py-2.5 w-fit mt-2"
            >
              + Create Your First Build
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {builds.map((build, index) => (
              <BuildCard
                build={build}
                key={index}
                handleDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
