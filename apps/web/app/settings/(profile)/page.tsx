import { loginedUserStatus } from "@/actions/user-status";

import { prisma } from "@/lib/database";
import { Separator } from "@/components/ui/separator";
import { ProfileForm } from "@/app/settings/(profile)/profile-form";

const ProfileSettingsPage: React.FC = async () => {
  const { uid } = await loginedUserStatus();
  const user = await prisma.user.findUnique({
    where: { id: uid },
  });

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-muted-foreground text-sm">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <ProfileForm initialValues={user ?? {}} />
    </div>
  );
};

export default ProfileSettingsPage;
