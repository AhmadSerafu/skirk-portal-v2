import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { url } from "../constants/url";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import BuildFormPage from "../components/BuildFormPage";
import { useDispatch, useSelector } from "react-redux";
import { fetchCharacters } from "../features/characters/charactersSlice";

export default function EditBuildPage() {
  const { id } = useParams();

  const { data: characters, loading } = useSelector(
    (state) => state.characters,
  );
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState([]);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const fetchBuild = async () => {
    try {
      const { data } = await axios.get(`${url}/builds/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      setName(data.name);
      setDescription(data.description);
      setSelectedCharacter(
        data.BuildCharacters.map((char) => char.characterId),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const toggleCharacter = (characterId) => {
    if (selectedCharacter.includes(characterId)) {
      setSelectedCharacter(
        selectedCharacter.filter((id) => id !== characterId),
      );
    } else {
      if (selectedCharacter.length >= 4) {
        toast.warn("Maximum 4 characters per build");
        return;
      }
      setSelectedCharacter([...selectedCharacter, characterId]);
    }
  };

  const handleSubmit = async (e) => {
    try {
      setSubmitLoading(true);
      const { data } = await axios.put(
        `${url}/builds/${id}`,
        {
          name,
          description,
          characters: selectedCharacter,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        },
      );

      toast.success("Build Updated!");
      navigate("/builds");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create build");
    } finally {
      setSubmitLoading(false);
    }
  };

  useEffect(() => {
    fetchBuild();
    dispatch(fetchCharacters());
  }, []);

  return (
    <BuildFormPage
      characters={characters}
      selectedCharacter={selectedCharacter}
      toggleCharacter={toggleCharacter}
      name={name}
      setName={setName}
      description={description}
      setDescription={setDescription}
      handleSubmit={handleSubmit}
      loading={loading}
      search={search}
      setSearch={setSearch}
      onBack={() => navigate("/builds")}
      title={"Edit Build"}
      submitLabel={"Save Changes"}
      submitLoading={submitLoading}
    />
  );
}
