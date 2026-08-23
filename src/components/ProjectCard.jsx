export default function ProjectCard({ project }) {
  const progress = Math.round((project.completedTasks / project.totalTasks) * 100) || 0;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition">
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-medium text-slate-800">{project.title}</h3>
        <span className="text-xs px-2 py-1 rounded-full bg-indigo-50 text-indigo-600 font-medium">
          {project.status}
        </span>
      </div>
      <p className="text-sm text-slate-500 mb-4 line-clamp-2">{project.description}</p>

      <div className="mb-2 flex justify-between text-xs text-slate-500">
        <span>Progress</span>
        <span>{progress}%</span>
      </div>
      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-indigo-500 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <p className="text-xs text-slate-400 mt-3">
        {project.completedTasks}/{project.totalTasks} tasks done
      </p>
    </div>
  );
}