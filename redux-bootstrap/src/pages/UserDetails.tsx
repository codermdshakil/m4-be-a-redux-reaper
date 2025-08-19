import { useParams } from "react-router";

const UserDetails = () => {

   const { userId } = useParams(); 
   console.log(userId);


  return (
    <div>
      <h1>UserDetails Component</h1>
    </div>
  );
};

export default UserDetails;