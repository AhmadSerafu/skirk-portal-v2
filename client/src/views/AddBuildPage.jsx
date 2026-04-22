import { useState, useEffect } from "react";
import { url } from "../constants/url";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import BuildFormPage from "../components/BuildFormPage";
import { useDispatch, useSelector } from "react-redux";
import { fetchCharacters } from "../features/characters/charactersSlice";

export default function AddBuildPage() {
  const { data: characters, loading } = useSelector(
    (state) => state.characters,
  );
  const dispatch = useDispatch();

  const [selectedCharacter, setSelectedCharacter] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

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
      const { data } = await axios.post(
        `${url}/builds`,
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

      toast.success("Build Created!");
      navigate("/builds");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create build");
    }
  };

  useEffect(() => {
    dispatch(fetchCharacters());
  }, []);

  return (
    <BuildFormPage
      characters={characters}
      selectedCharacter={selectedCharacter}
      loading={loading}
      search={search}
      setSearch={setSearch}
      toggleCharacter={toggleCharacter}
      name={name}
      setName={setName}
      description={description}
      setDescription={setDescription}
      handleSubmit={handleSubmit}
      onBack={() => navigate("/builds")}
    />
  );
}
