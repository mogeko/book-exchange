import { prisma } from "@/lib/database";
import { loginedUserStatus } from "@/lib/user-actions";
import { Separator } from "@/components/ui/separator";
import { AccountForm } from "@/app/settings/account/account-form";

const AccountSettingsPage: React.FC = async () => {
  const { uid } = await loginedUserStatus();
  const profile = await prisma.profile.findUnique({
    where: { userId: uid },
    select: { birthday: true, userId: true },
  });

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-muted-foreground text-sm">
          Update your account settings.
        </p>
      </div>
      <Separator />
      <AccountForm
        uid={profile?.userId ?? uid}
        initialValues={{
          birthday: profile?.birthday ?? void 0,
        }}
      />
    </div>
  );
};

export default AccountSettingsPage;
