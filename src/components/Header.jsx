function Header() {
  return (
    <header className="h-16 bg-slate-900 text-white flex items-center justify-between px-6 shadow-lg">
      <div>
        <h1 className="text-xl font-bold">
          Vedic Class Dashboard
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <span className="w-3 h-3 rounded-full bg-green-500"></span>

        <span className="text-sm text-slate-300">
          Live Class Active
        </span>
      </div>
    </header>
  );
}

export default Header;