import { ReactNode, useEffect, useState } from "react"
import { coursesgetApis } from "../../../api/course.api"


const Profile = () => {

    const [profile,setProfile] = useState({});
    useEffect(() => {
      try {
          const instructorDetails = coursesgetApis("/users/instructor/details",{});
          setProfile(instructorDetails);
      } catch (error) {
        console.log(error)
      }

    },[])
  return (
    <div>
      <h1 className="p-10 pt-50">Hello, {profile as ReactNode}</h1>
    </div>
  )
}

export default Profile
