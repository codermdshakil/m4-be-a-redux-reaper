import { Trash } from "lucide-react";

 
const UserCard = ( ) => {

  return (
    <div className="p-4 flex justify-between h-[100px] border-1  border-green-400 rounded-lg ">
      <h1>Shakil</h1>
      <Trash className="text-red-500 cursor-pointer"/>
    </div>
  );
};

export default UserCard;