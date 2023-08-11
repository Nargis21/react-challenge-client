import { useEffect, useState } from "react"
import Loading from "../utils/Loading"

const useAdmin = user => {
    const [admin, setAdmin] = useState(false)
    const [adminLoading, setAdminLoading] = useState(true)

    useEffect(() => {
        const email = user?.email
        if (email) {
            fetch(`http://localhost:5000/api/v1/user/admin/${email}`, {
                method: 'GET',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    setAdmin(data.data.admin)
                    setAdminLoading(false)
                })

        }
    }, [user])

    return [admin, adminLoading]
}
export default useAdmin