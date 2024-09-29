import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    <section className="h-screen grid place-items-center">
      <SignUp />
    </section>
  );
}
