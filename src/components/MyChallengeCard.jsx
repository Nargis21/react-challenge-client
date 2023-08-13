import { Link, useNavigate } from "react-router-dom";

const MyChallengeCard = ({ challenge, deleteHandler }) => {
  const { challengeId, title, difficultyLevel, challengeCategory } = challenge;
  const navigate = useNavigate();

  return (
    <div
      data-aos="zoom-in"
      className="p-6 shadow-xl  rounded-2xl bg-base-100 bg-gradient-to-r hover:from-emerald-300 hover:to-green-300 "
    >
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="flex justify-between items-center">
        <p className="px-4 py-1 rounded-full bg-gradient-to-r from-emerald-300 to-green-300 font-semibold border-2 border-white">
          {challengeCategory}
        </p>
        <p className="text-sm font-semibold">
          Difficulty:{" "}
          <span className="text-emerald-500 ">{difficultyLevel}</span>
        </p>
      </div>
      <div className="flex justify-between items-center mt-4">
        <h1
          className="cursor-pointer font-semibold text-emerald-500 hover:text-white underline"
          onClick={() => navigate(`/challenges/${challengeId}`)}
        >
          Continue Challenge
        </h1>
        <label
          onClick={() => deleteHandler(challengeId)}
          className="btn btn-sm bg-red-200 hover:bg-red-400 border-none"
          htmlFor="delete-book-modal"
        >
          Remove
        </label>
      </div>
    </div>
  );
};

export default MyChallengeCard;
