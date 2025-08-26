import { removeUser } from "@/redux/features/user/userSlice";
import { useAppDispatch } from "@/redux/hooks";
import type { IUser } from "@/types/types";
import { Trash } from "lucide-react";

interface IProps {
  user: IUser;
}

const UserCard = ({user}:IProps) => {


  const dispatch = useAppDispatch();

  return (
    <div className="p-4 flex justify-between h-[100px] border-1  border-green-400 rounded-lg ">
      <h1>{user.name}</h1>
      <Trash onClick={()=> dispatch(removeUser(user.id))} className="text-red-500 cursor-pointer"/>
    </div>
  );
};

export default UserCard;