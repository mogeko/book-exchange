import { prisma } from "@/lib/database";
import { loginedUserStatus } from "@/lib/user-actions";
import { Separator } from "@/components/ui/separator";
import { ProfileForm } from "@/app/settings/(profile)/profile-form";

const ProfileSettingsPage: React.FC = async () => {
  const { uid } = await loginedUserStatus();
  const user = await prisma.user.findUnique({
    where: { id: uid },
    select: {
      profile: {
        select: { bio: true, location: true },
      },
      email: true,
      name: true,
      id: true,
    },
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
      <ProfileForm
        uid={user?.id ?? uid}
        initialValues={{
          bio: user?.profile?.bio ?? void 0,
          location: user?.profile?.location ?? void 0,
          name: user?.name,
          email: user?.email,
        }}
      />
    </div>
  );
};

export default ProfileSettingsPage;
