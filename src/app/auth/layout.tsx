type AuthLayoutProps = {
  children: React.ReactNode;
};

export default async function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-svh items-center justify-center bg-background px-4 py-12">
      {children}
    </div>
  );
}
