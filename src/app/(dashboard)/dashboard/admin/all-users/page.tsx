import AllUsersList from '@/components/dashboard/admin/AllUsersList';
import { getAllUsers } from '@/lib/api/blogs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "All Users | Admin",
  description: "A modern blogging platform to write and share your stories.",
};

const AllUsersPage = async () => {
  const allUsers = await getAllUsers();
  return (
    <div>
      <AllUsersList users={allUsers} />
    </div>
  );
};

export default AllUsersPage;