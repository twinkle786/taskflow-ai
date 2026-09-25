import { useState } from "react";
import { Search, Bell, Menu, LogOut, X, AlertCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ searchTerm, setSearchTerm, tasks = [] }) {
  const { user, logout } = useAuth();
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // Bell icon ke liye - jo tasks "todo" ya "in-progress" hain unhe pending count karo
  const pendingTasks = tasks.filter((t) => t.status !== "done");

  return (
    <header className="relative bg-slate-900 border-b border-slate-800 px-4 md:px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Mobile pe search bar toggle karne ke liye */}
          <button
            onClick={() => setShowMobileSearch((prev) => !prev)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-800"
          >
            {showMobileSearch ? <X size={20} className="text-slate-300" /> : <Menu size={20} className="text-slate-300" />}
          </button>
          <h1 className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            ✨ TaskFlow AI
          </h1>
        </div>

        <div className="hidden sm:flex items-center flex-1 max-w-md mx-6 relative">
          <Search size={18} className="absolute left-3 text-slate-500" />
          <input
            type="text"
            placeholder="🔍 Projects ya tasks search karo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="flex items-center gap-3">
          {/* Notification bell - pending tasks dikhayega */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications((prev) => !prev);
                setShowProfile(false);
              }}
              className="p-2 rounded-lg hover:bg-slate-800 relative"
            >
              <Bell size={20} className="text-purple-400" />
              {pendingTasks.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full"></span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-12 w-72 bg-slate-900 border border-slate-800 rounded-xl shadow-xl z-50 max-h-80 overflow-y-auto">
                <div className="p-3 border-b border-slate-800">
                  <p className="text-sm font-medium text-slate-200">🔔 Notifications</p>
                </div>
                {pendingTasks.length === 0 ? (
                  <p className="text-sm text-slate-500 p-4 text-center">✨ Sab kuch up to date hai!</p>
                ) : (
                  pendingTasks.slice(0, 6).map((t) => (
                    <div key={t._id} className="flex items-start gap-2 p-3 border-b border-slate-800/50 last:border-0">
                      <AlertCircle size={14} className="text-amber-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm text-slate-300">{t.title}</p>
                        <p className="text-xs text-slate-500">Status: {t.status}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          <span className="text-sm text-slate-300 hidden sm:block">{user?.name}</span>

          {/* Avatar - click karke profile dropdown khulega jisme logout hai */}
          <div className="relative">
            <button
              onClick={() => {
                setShowProfile((prev) => !prev);
                setShowNotifications(false);
              }}
            >
              <img
                src={`https://ui-avatars.com/api/?name=${user?.name || "U"}&background=7c3aed&color=fff&bold=true`}
                alt="profile"
                className="w-9 h-9 rounded-full border-2 border-purple-500/50"
              />
            </button>

            {showProfile && (
              <div className="absolute right-0 top-12 w-56 bg-slate-900 border border-slate-800 rounded-xl shadow-xl z-50">
                <div className="p-3 border-b border-slate-800">
                  <p className="text-sm font-medium text-slate-200">{user?.name}</p>
                  <p className="text-xs text-slate-500">{user?.email}</p>
                </div>
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-red-400 hover:bg-slate-800 rounded-b-xl transition"
                >
                  <LogOut size={14} /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile search bar - hamburger click karne pe niche dikhta hai */}
      {showMobileSearch && (
        <div className="sm:hidden mt-3 relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="🔍 Search karo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      )}
    </header>
  );
}