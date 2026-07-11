import SignupForm from "@/components/authentication/SignupForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
  description: "Create your Quillo account and start writing today.",
};

const RegisterPage = () => {
  return (
    <div>
      <SignupForm />
    </div>
  );
};

export default RegisterPage;
