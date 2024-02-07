import logo from "./assets/logo-nlw-expert.svg";
import NewNodeCard from "./components/new-node-card";
import NodeCard from "./components/node-card";

function App() {
  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6">
      <img src={logo} alt="logo_nlw_expert" className="w-32" />

      <form className="w-full">
        <input
          type="text"
          placeholder="Busque em suas notas..."
          className="w-full text-3xl tracking-tight bg-transparent 
                    text-slate-500 placeholder:text-slate-500 outline-none"
        />
      </form>

      <div className="w-full h-px bg-slate-500" />

      <div className="grid grid-cols-3 gap-6 auto-rows-[250px]">
        <NewNodeCard />
        <NodeCard />
        <NodeCard />
        <NodeCard />
        <NodeCard />
      </div>
    </div>
  );
}

export default App;
