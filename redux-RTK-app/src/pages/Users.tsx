import { AddUserModal } from "@/components/modules/users/AddUserModal";

const Users = () => {
   
  return (
    <div>
      <div className="flex justify-between">
        <div>
          <h3 className="text-xl">Users:</h3>
        </div>
        <div>
          <AddUserModal />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 my-4">
        {/* {users.map((user: IUser) => (
          <UserCard key={user.id} user={user}></UserCard>
        ))} */}
      </div>
    </div>
  );
};

export default Users;
