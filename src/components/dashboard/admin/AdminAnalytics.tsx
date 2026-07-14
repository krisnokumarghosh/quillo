"use client";

import { Blog, User } from "@/lib/dataInterface";
import { manropeFont } from "@/lib/fonts";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface AdminAnalyticsProps {
  blogs: Blog[];
  users: User[];
}

const CHART_COLORS = ["#0D1B2A", "#415A77", "#778DA9", "#A9BCD0"];

// ---- Data crunching helpers ----

const getMonthlyGrowth = (blogs: Blog[]) => {
  const monthMap: Record<string, number> = {};
  const now = new Date();

  // last 6 months, shuruteই 0 diye initialize kora holo
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = d.toLocaleDateString("en-US", { month: "short" });
    monthMap[key] = 0;
  }

  blogs.forEach((blog) => {
    const d = new Date(blog.createdAt);
    const key = d.toLocaleDateString("en-US", { month: "short" });
    if (key in monthMap) {
      monthMap[key] += 1;
    }
  });

  return Object.entries(monthMap).map(([month, count]) => ({ month, count }));
};

const getCategorySplit = (blogs: Blog[]) => {
  const categoryMap: Record<string, number> = {};
  blogs.forEach((blog) => {
    categoryMap[blog.category] = (categoryMap[blog.category] || 0) + 1;
  });

  return Object.entries(categoryMap)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
};

const getTopAuthors = (blogs: Blog[]) => {
  const authorMap: Record<string, number> = {};
  blogs.forEach((blog) => {
    authorMap[blog.userName] = (authorMap[blog.userName] || 0) + 1;
  });

  const maxCount = Math.max(...Object.values(authorMap), 1);

  return Object.entries(authorMap)
    .map(([name, count]) => ({
      name,
      count,
      percent: (count / maxCount) * 100,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
};

interface ActivityItem {
  type: "user" | "blog";
  title: string;
  date: string;
}

const getRecentActivity = (blogs: Blog[], users: User[]): ActivityItem[] => {
  const blogActivity: ActivityItem[] = blogs.map((b) => ({
    type: "blog",
    title: `${b.userName} published "${b.title}"`,
    date: b.createdAt,
  }));

  const userActivity: ActivityItem[] = users.map((u) => ({
    type: "user",
    title: `New user ${u.name} registered`,
    date: u.createdAt,
  }));

  return [...blogActivity, ...userActivity]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6);
};

const timeAgo = (date: string) => {
  const diffMs = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min${mins > 1 ? "s" : ""} ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? "s" : ""} ago`;
};

// ---- Stat card ----

const StatCard = ({
  label,
  value,
  sublabel,
  badge,
}: {
  label: string;
  value: string | number;
  sublabel: string;
  badge?: string;
}) => (
  <div className="bg-white border border-[#778DA9]/15 rounded-2xl p-5">
    <div className="flex items-start justify-between mb-3">
      <div className="w-9 h-9 rounded-xl bg-[#415A77]/10 flex items-center justify-center">
        <div className="w-4 h-4 rounded-sm bg-[#415A77]" />
      </div>
      {badge && (
        <span className="text-[11px] font-bold text-[#415A77] bg-[#415A77]/10 px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </div>
    <p className="text-xs text-[#1B263B]/50 mb-1">{label}</p>
    <p className={`${manropeFont.className} text-2xl font-bold text-[#0D1B2A]`}>
      {value}
    </p>
    <p className="text-[11px] text-[#1B263B]/40 mt-1">{sublabel}</p>
  </div>
);

// ---- Main component ----

const AdminAnalytics = ({ blogs, users }: AdminAnalyticsProps) => {
  const totalBlogs = blogs.length;
  const totalUsers = users.length;
  const getThisMonthCount = (items: { createdAt: string }[]) => {
    const now = new Date();
    return items.filter((item) => {
      const d = new Date(item.createdAt);
      return (
        d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
      );
    }).length;
  };

  const getLastMonthCount = (items: { createdAt: string }[]) => {
    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    return items.filter((item) => {
      const d = new Date(item.createdAt);
      return (
        d.getMonth() === lastMonth.getMonth() &&
        d.getFullYear() === lastMonth.getFullYear()
      );
    }).length;
  };

  const blogsThisMonth = getThisMonthCount(blogs);
  const blogsLastMonth = getLastMonthCount(blogs);
  const blogGrowth = blogsLastMonth
    ? Math.round(((blogsThisMonth - blogsLastMonth) / blogsLastMonth) * 100)
    : blogsThisMonth > 0
      ? 100
      : 0;

  const monthlyGrowth = getMonthlyGrowth(blogs);
  const categorySplit = getCategorySplit(blogs);
  const topAuthors = getTopAuthors(blogs);
  const recentActivity = getRecentActivity(blogs, users);

  return (
    <div className="flex flex-col gap-5 px-3">
      {/* Stat cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Blogs"
          value={totalBlogs}
          sublabel="All time published stories"
        />
        <StatCard
          label="New Blogs This Month"
          value={blogsThisMonth}
          sublabel={`${blogGrowth >= 0 ? "+" : ""}${blogGrowth}% vs last month`}
          badge={`${blogGrowth >= 0 ? "+" : ""}${blogGrowth}%`}
        />
        <StatCard
          label="Total Users"
          value={totalUsers.toLocaleString()}
          sublabel="Registered accounts"
        />
        <StatCard
          label="Categories"
          value={categorySplit.length}
          sublabel="Distinct topics covered"
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Monthly growth bar chart */}
        <div className="lg:col-span-2 bg-white border border-[#778DA9]/15 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-1">
            <h3
              className={`${manropeFont.className} text-[15px] font-bold text-[#0D1B2A]`}
            >
              Monthly Platform Growth
            </h3>
          </div>
          <p className="text-xs text-[#1B263B]/45 mb-4">
            Blogs published across the last 6 months
          </p>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={monthlyGrowth}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#778DA9"
                strokeOpacity={0.15}
                vertical={false}
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#1B263B", fontSize: 12, opacity: 0.5 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#1B263B", fontSize: 12, opacity: 0.5 }}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0D1B2A",
                  border: "none",
                  borderRadius: "12px",
                  fontSize: "12px",
                }}
                labelStyle={{ color: "#E0E1DD" }}
                itemStyle={{ color: "#E0E1DD" }}
              />
              <Bar
                dataKey="count"
                fill="#415A77"
                radius={[8, 8, 0, 0]}
                maxBarSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category split pie chart */}
        <div className="bg-white border border-[#778DA9]/15 rounded-2xl p-5">
          <h3
            className={`${manropeFont.className} text-[15px] font-bold text-[#0D1B2A]`}
          >
            Category Split
          </h3>
          <p className="text-xs text-[#1B263B]/45 mb-4">
            Popular topics by volume
          </p>

          <div className="relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={categorySplit}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={3}
                >
                  {categorySplit.map((_, index) => (
                    <Cell
                      key={index}
                      fill={CHART_COLORS[index % CHART_COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute flex flex-col items-center">
              <span
                className={`${manropeFont.className} text-2xl font-bold text-[#0D1B2A]`}
              >
                {categorySplit.length}
              </span>
              <span className="text-[10px] text-[#1B263B]/40">Categories</span>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 mt-2">
            {categorySplit.slice(0, 4).map((cat, index) => (
              <div
                key={cat.name}
                className="flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{
                      backgroundColor:
                        CHART_COLORS[index % CHART_COLORS.length],
                    }}
                  />
                  <span className="text-[#1B263B]/70">{cat.name}</span>
                </div>
                <span className="text-[#1B263B]/40">
                  {Math.round((cat.value / totalBlogs) * 100)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top authors + Recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Top authors */}
        <div className="bg-white border border-[#778DA9]/15 rounded-2xl p-5">
          <h3
            className={`${manropeFont.className} text-[15px] font-bold text-[#0D1B2A] mb-4`}
          >
            Top Authors
          </h3>
          <div className="flex flex-col gap-4">
            {topAuthors.map((author) => (
              <div key={author.name}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="font-semibold text-[#0D1B2A]">
                    {author.name}
                  </span>
                  <span className="text-[#1B263B]/45 text-xs">
                    {author.count} article{author.count > 1 ? "s" : ""}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-[#0D1B2A]/8 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#415A77] rounded-full"
                    style={{ width: `${author.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div className="bg-white border border-[#778DA9]/15 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3
              className={`${manropeFont.className} text-[15px] font-bold text-[#0D1B2A]`}
            >
              Recent Activity
            </h3>
            <span className="text-xs font-semibold text-[#415A77] cursor-pointer">
              View All
            </span>
          </div>
          <div className="flex flex-col gap-4">
            {recentActivity.map((activity, i) => (
              <div key={i} className="flex items-start gap-3">
                <div
                  className={`w-7 h-7 rounded-full flex-none flex items-center justify-center ${
                    activity.type === "user"
                      ? "bg-[#778DA9]/15"
                      : "bg-[#415A77]/15"
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      activity.type === "user" ? "bg-[#778DA9]" : "bg-[#415A77]"
                    }`}
                  />
                </div>
                <div>
                  <p className="text-[13px] text-[#0D1B2A] leading-snug">
                    {activity.title}
                  </p>
                  <p className="text-[11px] text-[#1B263B]/40 mt-0.5">
                    {timeAgo(activity.date)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
