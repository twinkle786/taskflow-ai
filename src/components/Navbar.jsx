import { Search, Bell, Menu } from "lucide-react";

export default function Navbar({ onMenuClick, searchTerm, setSearchTerm }) {
  return (
    <header className="flex items-center justify-between bg-white border-b border-slate-200 px-4 md:px-6 py-3">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-lg hover:bg-slate-100"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-lg font-semibold text-slate-800">TaskFlow AI</h1>
      </div>

      <div className="hidden sm:flex items-center flex-1 max-w-md mx-6 relative">
        <Search size={18} className="absolute left-3 text-slate-400" />
        <input
          type="text"
          placeholder="Projects ya tasks search karo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 rounded-lg hover:bg-slate-100 relative">
          <Bell size={20} className="text-slate-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="w-9 h-9 rounded-full bg-indigo-500 text-white flex items-center justify-center text-sm font-medium">
          T
        </div>
      </div>
    </header>
  );
}