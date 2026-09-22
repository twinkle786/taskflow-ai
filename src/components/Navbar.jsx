import { Search, Bell, Menu } from "lucide-react";

export default function Navbar({ onMenuClick, searchTerm, setSearchTerm }) {
  return (
    <header className="flex items-center justify-between bg-slate-900 border-b border-slate-800 px-4 md:px-6 py-3">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-lg hover:bg-slate-800"
        >
          <Menu size={20} className="text-slate-300" />
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

      <div className="flex items-center gap-4">
        <button className="p-2 rounded-lg hover:bg-slate-800 relative">
          <Bell size={20} className="text-purple-400" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full"></span>
        </button>
        <img
          src="https://ui-avatars.com/api/?name=Twinkle&background=7c3aed&color=fff&bold=true"
          alt="profile"
          className="w-9 h-9 rounded-full border-2 border-purple-500/50"
        />
      </div>
    </header>
  );
}
