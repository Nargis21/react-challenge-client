import { getAllChallenges } from "../api/api";
import {useState} from 'react'
import { defer, useLoaderData, Await, useNavigate, useRevalidator } from "react-router-dom";
import ChallengeCard from "../components/ChallengeCard";
import { deleteChallengeById } from "../api/api";
import { toast } from "react-toastify";

export const loadChallenges = async ({ params }) => {
  const challenges = await getAllChallenges();
  return defer({ challenges });
};

const ManageChallenges = () => {
  const navigate = useNavigate()
  let revalidator = useRevalidator()
  const { challenges } = useLoaderData();
  const [token, setToken] = useState(() =>
    window.localStorage.getItem("accessToken")
  );

  const handleEditChallenge = (challengeId) => {
    navigate(`/manage-challenges/edit/${challengeId}`)
  }

  const handleDeleteChallenge = async (challengeId) => {
    const result = await deleteChallengeById(challengeId)
    console.log('result : ', result)
    if(result.success){
      toast.success('Successfully Deleted.')
    }else{
      toast.error('Deletion Failed')
    }
    revalidator.revalidate()
  }

  return (
    <div>
      <h1>Manage Challenges</h1>

      <div>
      <button className="btn btn-success" onClick={() => navigate('/manage-challenges/create')}>Create Challenge</button>
      </div>

      <div className="bg-green-100">
        <div className="">
        <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>Title</th>
        <th>Category</th>
        <th>Level</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>

           {challenges?.success &&
            challenges?.data?.map((challenge) => (
              <tr key={challenge._id}>
              <th>{challenge.title}</th>
              <td>{challenge.challengeCategory}</td>
              <td>{challenge.difficultyLevel}</td>
              <td className="flex">
                <button onClick={() => handleEditChallenge(challenge._id)} className="btn btn-success">Edit</button>
                <button onClick={() => handleDeleteChallenge(challenge._id)} className="btn btn-error">Delete</button>
              </td>
            </tr>
          ))}
      
      

    </tbody>
  </table>
</div>
         
        </div>
      </div>

    </div>
  );
};

export default ManageChallenges;
