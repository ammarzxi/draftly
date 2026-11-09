import AuthLayout from "../components/auth/AuthLayout";
import LoginForm from "../components/auth/LoginForm";
import LoginVideo from "../components/auth/LoginVideo";

export default function SignupPage() {
  return <AuthLayout form={<LoginForm />} video={<LoginVideo />} />;
}
