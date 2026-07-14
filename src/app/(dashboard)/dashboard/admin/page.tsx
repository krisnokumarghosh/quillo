import AdminAnalytics from '@/components/dashboard/admin/AdminAnalytics';
import { getAllBlogs, getAllUsers } from '@/lib/api/blogs';


const AdminAnalyticsPage = async () => {
  const allUsers = await getAllUsers();
  const { blogs: allBlogs } = await getAllBlogs({ limit: 1000 }); // shob blog anার jonyo boro limit

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#0D1B2A] mt-6 mb-6 px-3">Analytics Overview</h1>
      <AdminAnalytics blogs={allBlogs} users={allUsers} />
    </div>
  );
};

export default AdminAnalyticsPage;