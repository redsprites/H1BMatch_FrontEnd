import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <section className="h-screen grid place-items-center">
      <SignIn />
    </section>
  );
}
