export default function AuthLayout({ form, video }) {
  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-[1.5fr_1fr]">
      <div className="flex items-center justify-center p-8">{form}</div>

      <div className="hidden md:block">{video}</div>
    </main>
  );
}
