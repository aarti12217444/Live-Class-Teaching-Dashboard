import {
  Users,
  MessageCircle,
  FileText,
  BarChart3,
} from "lucide-react";

function Sidebar({
  activePanel,
  setActivePanel,
}) {
  const menu = [
    {
      id: "participants",
      icon: Users,
    },
    {
      id: "chat",
      icon: MessageCircle,
    },
    {
      id: "files",
      icon: FileText,
    },
    {
      id: "attendance",
      icon: BarChart3,
    },
  ];

  return (
    <div className="w-20 bg-white border-r flex flex-col items-center py-6 gap-4">

      {menu.map((item) => {
        const Icon = item.icon;

        return (
          <button
            key={item.id}
            onClick={() =>
              setActivePanel(item.id)
            }
            className={`p-3 rounded-xl transition ${
              activePanel === item.id
                ? "bg-blue-100 text-blue-600"
                : "hover:bg-slate-100"
            }`}
          >
            <Icon size={22} />
          </button>
        );
      })}
    </div>
  );
}

export default Sidebar;