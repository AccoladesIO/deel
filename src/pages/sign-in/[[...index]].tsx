import { SignIn } from "@clerk/nextjs";

const SignInPage = () => (
    <SignIn path="/auth/signin" routing="path" signUpUrl="/auth/signup/" />
);
export default SignInPage;