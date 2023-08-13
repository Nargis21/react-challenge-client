import { getUserChallenge, removeUserChallengeById } from "../api/api";
import { Link, defer, useLoaderData, useRevalidator } from "react-router-dom";
import MyChallengeCard from "../components/MyChallengeCard";
import { toast } from "react-toastify";

export const loadUserChallenges = async () => {
  const challenges = await getUserChallenge();
  return defer({ challenges });
};

const MyChallenges = () => {
  const { challenges } = useLoaderData();
  let revalidator = useRevalidator();

  async function handleRemoveChallenge(challengeId) {
    const result = await removeUserChallengeById(challengeId);
    if (result.success) {
      toast.success("Successfully Removed.");
    } else {
      toast.error("Remove Failed");
    }
    revalidator.revalidate();
  }

  return (
    <div className="h-screen bg-green-100">
      {challenges?.success && challenges?.data?.challenges.length > 0 ? (
        <div className=" p-10 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-6 ">
          {challenges?.success &&
            challenges?.data?.challenges.map((challenge) => (
              <MyChallengeCard
                key={challenge._id}
                challenge={challenge}
                deleteHandler={handleRemoveChallenge}
              ></MyChallengeCard>
            ))}
        </div>
      ) : (
        <div className="text-center lg:py-36 md:py-24 py-12">
          <p className="lg:text-5xl md:text-3xl text-2xl font-semibold">
            You have no attempted challenge.
          </p>
          <Link
            to="/challenges"
            className="btn bg-gradient-to-r from-emerald-300 to-green-300 hover:from-emerald-400 hover:to-green-400 border-none mt-10"
          >
            Explore Now
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyChallenges;
