import { getAllChallenges } from "../api/api";
import { useState } from "react";
import {
  defer,
  useLoaderData,
  useNavigate,
  useRevalidator,
} from "react-router-dom";
import { deleteChallengeById } from "../api/api";
import { toast } from "react-toastify";
import { BiSolidEdit, BiSolidTrash } from "react-icons/bi";
import { IoMdCreate } from "react-icons/io";
import { GrPowerReset } from "react-icons/gr";

export const loadChallenges = async () => {
  const challenges = await getAllChallenges();
  return defer({ challenges });
};

const ManageChallenges = () => {
  const navigate = useNavigate();
  let revalidator = useRevalidator();
  const { challenges } = useLoaderData();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");

  // Search challenges by title or author
  const searchedChallenges = challenges?.data.filter((challenge) => {
    const titleMatch = challenge.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const categoryMatch = challenge.challengeCategory
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const difficultyMatch = challenge.difficultyLevel
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return titleMatch || categoryMatch || difficultyMatch;
  });

  // Extract unique categories from the challenge data
  const categories = [
    ...new Set(
      challenges?.data.map((challenge) => challenge.challengeCategory)
    ),
  ];

  // Extract unique difficulties from the challenge data
  const difficulties = [
    ...new Set(challenges?.data.map((challenge) => challenge.difficultyLevel)),
  ];

  // Filter challenges by category
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Filter challenges by publication difficulty
  const handleDifficultyChange = (e) => {
    setSelectedDifficulty(e.target.value);
  };

  const filteredChallengesByCategoryAndDifficulty = searchedChallenges?.filter(
    (challenge) => {
      const categoryMatch =
        !selectedCategory ||
        challenge.challengeCategory.toLowerCase() ===
          selectedCategory.toLowerCase();
      const difficultyMatch =
        !selectedDifficulty ||
        challenge.difficultyLevel.toLowerCase() ===
          selectedDifficulty.toLowerCase();
      return categoryMatch && difficultyMatch;
    }
  );

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedDifficulty("");
  };

  const handleEditChallenge = (challengeId) => {
    navigate(`/manage-challenges/edit/${challengeId}`);
  };

  const handleDeleteChallenge = async (challengeId) => {
    const result = await deleteChallengeById(challengeId);
    if (result.success) {
      toast.success("Challenge Deleted!");
    } else {
      toast.error("Deletion Failed");
    }
    revalidator.revalidate();
  };

  return (
    <div>
      <div className="grid lg:grid-cols-10 grid-cols-1 gap-4 lg:p-12 p-4 bg-green-200">
        <div className="col-span-6">
          <input
            type="text"
            placeholder="Search by Title or Category"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400 w-full"
          />
        </div>

        <div className="flex lg:gap-4 gap-2 col-span-4">
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400 "
          >
            <option value="">Category</option>
            {categories.map((category, i) => (
              <option key={i} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            value={selectedDifficulty}
            onChange={handleDifficultyChange}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            <option value="">Difficulty</option>
            {difficulties.map((difficulty, i) => (
              <option key={i} value={difficulty}>
                {difficulty}
              </option>
            ))}
          </select>

          <button
            onClick={resetFilters}
            className="btn bg-gradient-to-r from-emerald-300 to-green-300 hover:from-emerald-400 hover:to-green-400 border-none"
          >
            <span className="hidden lg:flex">Reset Filters</span>
            <GrPowerReset className="text-xl"></GrPowerReset>
          </button>
        </div>
      </div>
      <div className="bg-green-100">
        <div className="flex lg:flex-row md:flex-row flex-col lg:gap-4 md:gap-4 justify-center items-center py-6">
          <h1 className="text-2xl py-6 text-center font-semibold text-gray-600">
            Manage Challenges
          </h1>
          <button
            className="btn bg-gradient-to-r from-emerald-300 to-green-300 hover:from-emerald-400 hover:to-green-400 border-none"
            onClick={() => navigate("/manage-challenges/create")}
          >
            Create new Challenge <IoMdCreate className="text-xl"></IoMdCreate>
          </button>
        </div>
        <div className=" overflow-x-auto flex items-center justify-center pb-6">
          <table className="table lg:w-[70%] md:w-[90%] w-[99%] shadow-lg bg-base-100 lg:p-4 p-2 rounded">
            {/* head */}
            <thead>
              <tr>
                <th>SL.NO</th>
                <th>Title</th>
                <th>Category</th>
                <th>Level</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {challenges?.success &&
                filteredChallengesByCategoryAndDifficulty.map(
                  (challenge, index) => (
                    <tr key={challenge._id}>
                      <th>{index + 1}</th>
                      <th>{challenge.title}</th>
                      <td>{challenge.challengeCategory}</td>
                      <td>{challenge.difficultyLevel}</td>
                      <td className="flex gap-2">
                        <button
                          onClick={() => handleEditChallenge(challenge._id)}
                          className="btn bg-gradient-to-r from-emerald-300 to-green-300 hover:from-emerald-400 hover:to-green-400 border-none btn-sm"
                        >
                          <span className="hidden lg:flex">Edit</span>
                          <BiSolidEdit className="text-xl"></BiSolidEdit>
                        </button>
                        <button
                          onClick={() => handleDeleteChallenge(challenge._id)}
                          className="btn btn-error btn-sm"
                        >
                          <span className="hidden lg:flex">Delete</span>
                          <BiSolidTrash className="text-xl"></BiSolidTrash>
                        </button>
                      </td>
                    </tr>
                  )
                )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageChallenges;
