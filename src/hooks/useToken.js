import { useEffect, useState } from "react"

const useToken = (user, authType) => {
    const [token, setToken] = useState('')
    useEffect(() => {
        const email = user?.user?.email
        const currentUser = { email: email }
        if (email) {
            fetch(`http://localhost:5000/api/v1/user/auth/${email}`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(currentUser)
            })
                .then(res => res.json())
                .then(data => {

                    const accessToken = data.data.accessToken
                    setToken(accessToken)
                    localStorage.setItem('accessToken', accessToken)
                })
        }
    }, [user, authType])

    return [token]
}

export default useToken
