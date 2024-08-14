import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => (
    <SignUp path="/auth/signup/" routing="path" signInUrl="/auth/signin/" />
);
export default SignUpPage;