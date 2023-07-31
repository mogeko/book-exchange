import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserLoginForm } from "@/app/login/components/user-login-form";
import { UserSignupForm } from "@/app/login/components/user-signup-form";

const LoginPage: React.FC = () => {
  return (
    <div className="container flex flex-col items-center justify-center flex-1">
      <div className="">
        <Tabs defaultValue="signin" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign in</TabsTrigger>
            <TabsTrigger value="signup">Sgin up</TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
            <UserLoginForm
              title="Sign in to Bookworm"
              description="Enter your email address and password to access your account."
            />
          </TabsContent>
          <TabsContent value="signup">
            <UserSignupForm
              title="Create a new account"
              description="Enter your email address and password to create a new account."
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LoginPage;
