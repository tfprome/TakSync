// components/Navbar.tsx
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../app/store";
import { logout } from "../features/authslice";
import { CircleUserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  onAddTaskClick?: () => void; // optional
}

const Navbar: React.FC<NavbarProps> = () => {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const [isMounted, setIsMounted] = useState(false); 
  const [visible, setVisible] = useState(false);     
  const containerRef = useRef<HTMLDivElement | null>(null);
  const navigate=useNavigate();

  const openDropdown = () => {
    setIsMounted(true);
    requestAnimationFrame(() => setVisible(true));
  };

  const closeDropdown = () => {
    setVisible(false);
    setTimeout(() => setIsMounted(false), 220);
  };

  const toggleDropdown = () => {
    if (isMounted) closeDropdown();
    else openDropdown();
  };

  // click outside to close
  useEffect(() => {
    function handleClickOutside(e: MouseEvent | TouchEvent) {
      if (!containerRef.current) return;
      if (!(e.target instanceof Node)) return;
      if (!containerRef.current.contains(e.target)) {
        closeDropdown();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/')
    closeDropdown();
  };

  return (
    <nav className="bg-gray-200 shadow-md py-4 pr-6 flex justify-between items-center sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <img src="/tasklogo.png" alt="logo" height={40} width={40} className="rounded" />
        <h1 className="text-2xl font-bold">TaskSync</h1>
      </div>

      <div className="flex items-center gap-4 ">

        {/* User area */}
        {user && user.name && (
          // IMPORTANT: make just this wrapper relative — dropdown absolute will be positioned relative to it
          <div ref={containerRef} className="relative">
            <div className="flex items-center gap-2 bg-blue-400 py-2 px-4 rounded-lg hover:bg-blue-600 transition">
              <CircleUserRound className="" />
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-1 text-sm font-medium"
                aria-haspopup="true"
                aria-expanded={isMounted && visible}
              >
                {user.name}
                <span className="text-xs">▼</span>
              </button>
            </div>

            
            {isMounted && (
              <div
                className={
                  "absolute right-0 mt-1 bg-white border rounded shadow-lg z-50 " +
                  // transition classes:
                  (visible
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 translate-y-1 pointer-events-none") +
                  " transition-all duration-200 ease-out"
                }
                role="menu"
                aria-label="User menu"
              >
                <button
                  onClick={handleLogout}
                  className="block w-full bg-red-600 text-white text-sm px-6 py-2 hover:bg-red-700"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
