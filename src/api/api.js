const token = window.localStorage.getItem('accessToken')
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
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  })
  return await response.json()
}

// user 
export async function getUserChallenge(){

  const response = await fetch(`${import.meta.env.VITE_backend_api}/user/challenge`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  })
  return await response.json()
}

export async function getUserChallengeById(challengeId){
  const response = await fetch(`${import.meta.env.VITE_backend_api}/user/challenge/${challengeId}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  })
  return await response.json()
}

export async function removeUserChallengeById(challengeId){
  const response = await fetch(`${import.meta.env.VITE_backend_api}/user/challenge/${challengeId}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  })
  return await response.json()
}

// manage challenge
export async function deleteChallengeById(challengeId){
  const response = await fetch(`${import.meta.env.VITE_backend_api}/challenges/${challengeId}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  })
  return await response.json()
}