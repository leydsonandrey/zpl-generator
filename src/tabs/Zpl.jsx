import { useState } from "react";
import Layout from "../Layout";

export default function GeradorZPL() {
  const [pedido, setPedido] = useState("");
  const [nome, setNome] = useState("");
  const [data, setData] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const [tipoEntrega, setTipoEntrega] = useState("ifood");
  const [numeroIfood, setNumeroIfood] = useState("");
  const [resultado, setResultado] = useState("");

  const gerarEAbrir = () => {
    if (quantidade <= 0) return;

    let etiquetas = [];

    for (let i = 1; i <= quantidade; i++) {
      let blocoEntrega = "";

      if (tipoEntrega === "ifood" && numeroIfood.trim() !== "") {
        blocoEntrega = `\n^A0,80,80\n^FO30,500^FD${numeroIfood} ^FS`;
      }
      if (tipoEntrega === "click") {
        blocoEntrega = `\n^A0,80,80\n^FO30,500^FDCLICK E RETIRE ^FS`;
      }
      if (tipoEntrega === "delivery") {
        blocoEntrega = `\n^A0,80,80\n^FO30,500^FDDELIVERY ^FS`;
      }

      const modelo = `
^XA

^CF0,60
^A0,80,80
^FO30,30^FD${pedido} ^FS
^FO150,110
^FO30,275^FD${nome} ^FS
^A0,40,40
^FO30,340^FD${data} ^FS
^A0,80,80
^FO610,500^FD${i}/${quantidade} ^FS
${blocoEntrega}

^XZ
`.trim();

      etiquetas.push(modelo);
    }

    const zpl = etiquetas.join("\n\n");
    setResultado(zpl);

    const blob = new Blob([zpl], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = url;

    document.body.appendChild(iframe);

    iframe.onload = () => {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
    };
  };

  return (
    <Layout title="Gerador de Etiquetas ZPL">
      <label className="font-semibold">Pedido:</label>
      <input
        className="w-full border rounded-lg p-2 mb-4"
        value={pedido}
        maxLength={26}
        onChange={(e) => setPedido(e.target.value)}
      />

      <label className="font-semibold">Nome:</label>
      <input
        className="w-full border rounded-lg p-2 mb-4"
        value={nome}
        maxLength={26}
        onChange={(e) => setNome(e.target.value)}
      />

      <label className="font-semibold">Data:</label>
      <input
        className="w-full border rounded-lg p-2 mb-4"
        value={data}
        maxLength={26}
        onChange={(e) => setData(e.target.value)}
      />

      <div className="flex flex-row justify-baseline gap-4">
        <div className="w-full">
          <label className="font-semibold">&#8470; de etiquetas:</label>
          <input
            type="number"
            min={1}
            max={99}
            maxLength={3}
            className="w-full border rounded-lg p-2 mb-4"
            value={quantidade}
            onChange={(e) => setQuantidade(parseInt(e.target.value))}
          />
        </div>
        <div className="w-full">
          <label className="font-semibold">Tipo de entrega:</label>
          <select
            className="w-full border rounded-lg p-2 mb-4"
            value={tipoEntrega}
            onChange={(e) => setTipoEntrega(e.target.value)}
          >
            <option value="ifood">iFood</option>
            <option value="click">Click e Retire</option>
            <option value="delivery">Delivery</option>
          </select>
        </div>
      </div>

      {tipoEntrega === "ifood" && (
        <div className="animate-fadeIn">
          <label className="font-semibold">Código iFood (4 dígitos):</label>
          <input
            className="w-full border rounded-lg p-2 mb-4"
            value={numeroIfood}
            maxLength={4}
            onChange={(e) => setNumeroIfood(e.target.value)}
          />
        </div>
      )}

      <button
        onClick={gerarEAbrir}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-lg mb-4 hover:cursor-pointer"
      >
        Gerar
      </button>

      <h3 className="font-bold text-lg mb-2">Resultado:</h3>
      <textarea
        readOnly
        className="w-full h-64 border rounded-lg p-3 font-mono"
        value={resultado}
      />
    </Layout>
  );
}
