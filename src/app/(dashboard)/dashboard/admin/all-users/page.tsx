import AllUsersList from '@/components/dashboard/admin/AllUsersList';
import { getAllUsers } from '@/lib/api/blogs';


const AllUsersPage = async () => {
  const allUsers = await getAllUsers();
  return (
    <div>
      <AllUsersList users={allUsers} />
    </div>
  );
};

export default AllUsersPage;