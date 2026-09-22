import { Trash2 } from "lucide-react";
import api from "../api/axios";

export default function ProjectCard({ project, taskCount, doneCount, onDeleted }) {
  const progress = Math.round((doneCount / taskCount) * 100) || 0;
  const statusEmoji = { active: "🚀", planning: "📝", done: "🎉" };

  async function handleDelete() {
    await api.delete(`/projects/${project._id}`);
    onDeleted(project._id);
  }

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden hover:border-purple-500/50 transition group relative">
      <img
        src={`https://api.dicebear.com/7.x/shapes/svg?seed=${project.title}&backgroundColor=7c3aed,ec4899`}
        alt={project.title}
        className="w-full h-24 object-cover"
      />
      <button
        onClick={handleDelete}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-slate-900/80 text-slate-400 hover:text-red-400 transition p-1.5 rounded-lg"
      >
        <Trash2 size={14} />
      </button>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-medium text-slate-100">{project.title}</h3>
          <span className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-300 font-medium">
            {statusEmoji[project.status]} {project.status}
          </span>
        </div>
        <p className="text-sm text-slate-400 mb-4 line-clamp-2">{project.description}</p>

        <div className="mb-2 flex justify-between text-xs text-slate-500">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <p className="text-xs text-slate-500 mt-3">
          ✅ {doneCount}/{taskCount} tasks done
        </p>
      </div>
    </div>
  );
}