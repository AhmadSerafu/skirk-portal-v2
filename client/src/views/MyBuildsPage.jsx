import axios from "axios";
import { useEffect, useState } from "react";
import { url } from "../constants/url";
import { Link } from "react-router";
import BuildCard from "../components/BuildCard";

export default function MyBuildsPage() {
  const [builds, setBuilds] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBuilds = async () => {
    try {
      const { data } = await axios.get(`${url}/builds`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      setBuilds(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBuilds();
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
          <p className="font-nunito text-parchment-dim text-center mt-20">
            No builds yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {builds.map((build, index) => (
              <BuildCard build={build} key={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
