import AuthLayout from "../components/auth/AuthLayout";
import SignupForm from "../components/auth/SignupForm";
import SignupVideo from "../components/auth/SignupVideo";

export default function SignupPage() {
  return <AuthLayout form={<SignupForm />} video={<SignupVideo />} />;
}
