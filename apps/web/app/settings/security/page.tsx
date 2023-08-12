import { loginedUserStatus } from "@/actions/user-status";

import { Separator } from "@/components/ui/separator";
import { SecurityForm } from "@/app/settings/security/security-form";

const SecuritySettingsPage: React.FC = async () => {
  const { uid } = await loginedUserStatus();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Change password</h3>
      </div>
      <Separator />
      <SecurityForm uid={uid} />
    </div>
  );
};

export default SecuritySettingsPage;
