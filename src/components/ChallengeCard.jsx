import { useNavigate } from "react-router-dom";

const ChallengeCard = ({ challenge }) => {
  const { _id, title, difficultyLevel, challengeCategory } = challenge;
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/challenges/${_id}`)}
      data-aos="zoom-in"
      className="cursor-pointer p-6 shadow-xl  rounded-2xl bg-base-100 bg-gradient-to-r hover:from-emerald-300 hover:to-green-300"
    >
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="flex justify-between items-center">
        <p className="px-4 py-1 rounded-full bg-gradient-to-r from-emerald-300 to-green-300 font-semibold border-2 border-white">
          {challengeCategory}
        </p>
        <p className="text-sm font-semibold">
          Difficulty:{" "}
          <span className="text-emerald-500  ">{difficultyLevel}</span>
        </p>
      </div>
    </div>
  );
};

export default ChallengeCard;
