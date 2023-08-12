import React, { useState } from "react";
import { client } from "../api/api-client";
import { getAllChallenges, getUserChallenge } from "../api/api";
import { defer, useLoaderData, Await, useNavigate } from "react-router-dom";

export const loadUserChallenges = async ({ params }) => {
  const challenges = await getUserChallenge();
  return defer({ challenges });
};

const MyChallenges = () => {
  const navigate = useNavigate();
  const { challenges } = useLoaderData();

  return (
    <div>
      <h1>My Challenges</h1>

      <div className="overflow-x-auto">
        {challenges?.success && challenges?.data?.challenges.length > 0 ? (
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Difficulty level</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {challenges?.success &&
                challenges?.data?.challenges.map((challenge) => (
                  <tr
                    key={challenge._id}
                    onClick={() =>
                      navigate(`/challenges/${challenge.challengeId}`)
                    }
                    className="cursor-pointer"
                  >
                    <td>{challenge.title}</td>
                    <td>{challenge.challengeCategory}</td>
                    <td>{challenge.difficultyLevel}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <div>No Challenges Found</div>
        )}
      </div>
    </div>
  );
};

export default MyChallenges;
