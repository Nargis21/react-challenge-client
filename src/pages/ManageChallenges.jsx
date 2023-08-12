import {useNavigate} from 'react-router-dom'

const ManageChallenges = () => {
  const navigate = useNavigate()
  return (
    <div>
      <h1>Manage Challenges</h1>

      <button className="btn btn-success" onClick={() => navigate('/manage-challenges/create')}>Create Challenge</button>
    </div>
  );
};

export default ManageChallenges;
