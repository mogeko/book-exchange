import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const DashboardPage: React.FC = () => {
  const uid = cookies().get("uid")?.value;
  redirect(uid ? `/dashboard/${uid}` : "/login");
};

export default DashboardPage;
