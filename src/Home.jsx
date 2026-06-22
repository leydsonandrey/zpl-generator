import { useState } from "react";
import Zpl from "./tabs/Zpl";
import Peso from "./tabs/Peso";
import Nota from "./tabs/Nota";

function Button({ active, onClick, children }) {
  return (
    <button
      className={`text-white bg-blue-500 p-2 rounded-sm ${active ? "bg-blue-600 hover:bg-blue-600 cursor-not-allowed" : "hover:bg-blue-800 hover:shadow cursor-pointer"}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default function Home() {
  const [tab, setTab] = useState("zpl");
  return (
    <div className="w-full">
      <div className="w-full h-14 flex justify-center items-center gap-2 bg-blue-500 shadow-lg">
        <Button active={tab === "zpl"} onClick={() => setTab("zpl")}>
          Gerador de ZPL
        </Button>
        <Button active={tab === "peso"} onClick={() => setTab("peso")}>
          Gerador de Peso
        </Button>
        <Button active={tab === "nota"} onClick={() => setTab("nota")}>
          Gerador de Nota
        </Button>
      </div>
      <div>
        {tab === "zpl" && <Zpl />}
        {tab === "peso" && <Peso />}
        {tab === "nota" && <Nota />}
      </div>
    </div>
  );
}
