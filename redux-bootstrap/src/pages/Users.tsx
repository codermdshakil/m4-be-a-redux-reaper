import { AddUserModal } from "@/components/modules/users/AddUserModal";
import UserCard from "@/components/modules/users/UserCard";
import { selectorUsers } from "@/redux/features/user/userSlice";
import { useAppSelector } from "@/redux/hooks";
import type { IUser } from "@/types/types";

const Users = () => {
  const { users } = useAppSelector(selectorUsers);
  console.log(users, "users");

  return (
    <div>
      <div className="flex items-end">
        <AddUserModal />
      </div>
      <div className="grid grid-cols-3 gap-4 my-4">
        {users.map((user: IUser) => (
          <UserCard key={user.id} user={user}></UserCard>
        ))}
      </div>
    </div>
  );
};

export default Users;
