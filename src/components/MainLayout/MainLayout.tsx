import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <main className="h-screen w-screen bg-default bg-cover p-4 cursor-fancy overflow-auto">
      <Outlet />
    </main>
  );
}
