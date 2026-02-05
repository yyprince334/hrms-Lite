export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-light tracking-tight text-slate-900">
                Employee <span className="font-semibold">Management</span>
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Streamline workforce operations
              </p>
            </div>
          </div>
        </div>
      </header>
  );
}