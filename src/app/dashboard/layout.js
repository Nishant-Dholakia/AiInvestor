import { SidebarDemo } from "../component/Sidebar";


export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <SidebarDemo />
      <main className="flex-grow p-4">{children}</main>
    </div>
  );
}
