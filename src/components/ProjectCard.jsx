// ProjectCard - cover image (auto-generated) + emoji status ke saath
export default function ProjectCard({ project }) {
  const progress = Math.round((project.completedTasks / project.totalTasks) * 100) || 0;
  const statusEmoji = { active: "🚀", planning: "📝", done: "🎉" };

  return (
    <div className="bg-white rounded-xl border border-purple-100 overflow-hidden hover:shadow-lg hover:shadow-purple-100 transition">
      {/* Cover image - auto-generated abstract art, koi copyright issue nahi */}
      <img
        src={`https://api.dicebear.com/7.x/shapes/svg?seed=${project.title}&backgroundColor=7c3aed,ec4899`}
        alt={project.title}
        className="w-full h-24 object-cover bg-gradient-to-r from-purple-400 to-pink-400"
      />
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-medium text-slate-800">{project.title}</h3>
          <span className="text-xs px-2 py-1 rounded-full bg-purple-50 text-purple-600 font-medium">
            {statusEmoji[project.status]} {project.status}
          </span>
        </div>
        <p className="text-sm text-slate-500 mb-4 line-clamp-2">{project.description}</p>

        <div className="mb-2 flex justify-between text-xs text-slate-500">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full h-2 bg-purple-50 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <p className="text-xs text-slate-400 mt-3">
          ✅ {project.completedTasks}/{project.totalTasks} tasks done
        </p>
      </div>
    </div>
  );
}
