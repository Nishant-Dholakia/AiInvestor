import Dashboard from "../component/ui/Dashboard";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow p-4">{children}</main>
    </div>
  );
}
