export async function postUserData(data){
  const response = await fetch(`${import.meta.env.VITE_backend_api}/user`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  return await response.json()
}

export async function getAllChallenges(){
  const response = await fetch(`${import.meta.env.VITE_backend_api}/challenges`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
  return await response.json()
}

export async function getChallengeById(challengeId){
  const response = await fetch(`${import.meta.env.VITE_backend_api}/challenges/${challengeId}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
  return await response.json()
}