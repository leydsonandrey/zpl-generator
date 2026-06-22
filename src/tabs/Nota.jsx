import { useState } from "react";
import Layout from "../Layout";

export default function GeradorNotasZPL() {
  const [nota, setNota] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const [tamanhoFonte, setTamanhoFonte] = useState(35);
  const [resultado, setResultado] = useState("");

  const gerarEAbrir = () => {
    if (!nota.trim()) return;
    if (quantidade <= 0) return;

    const notas = [];

    const textoTratado = nota
      .replace(/\^/g, "")
      .replace(/~/g, "")
      .replace(/\r\n/g, "\n")
      .replace(/\n/g, "\\&");

    for (let i = 1; i <= quantidade; i++) {
      const modelo = `
^XA
^PW800
^LL1200

^FO30,30
^A0N,${tamanhoFonte},${tamanhoFonte}
^FB740,40,0,L,0
^FH\\
^FD${textoTratado}^FS

^FO650,1150
^A0N,30,30
^FD${i}/${quantidade}^FS

^XZ
`.trim();

      notas.push(modelo);
    }

    const zpl = notas.join("\n\n");

    setResultado(zpl);

    const blob = new Blob([zpl], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = url;

    document.body.appendChild(iframe);

    iframe.onload = () => {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
    };
  };

  return (
    <Layout title="Gerador de Notas ZPL">
      <label className="font-semibold">
        Texto da nota:
      </label>

      <textarea
        className="w-full border rounded-lg p-2 mb-4"
        rows={12}
        value={nota}
        onChange={(e) => setNota(e.target.value)}
        placeholder="Digite qualquer texto..."
      />

      <label className="font-semibold">
        Nº de cópias:
      </label>

      <input
        type="number"
        min={1}
        max={99}
        className="w-full border rounded-lg p-2 mb-4"
        value={quantidade}
        onChange={(e) =>
          setQuantidade(
            Math.max(
              1,
              parseInt(e.target.value) || 1
            )
          )
        }
      />

      <label className="font-semibold">
        Tamanho da fonte: {tamanhoFonte}
      </label>

      <input
        type="range"
        min="10"
        max="120"
        value={tamanhoFonte}
        onChange={(e) =>
          setTamanhoFonte(Number(e.target.value))
        }
        className="w-full mb-4"
      />

      <button
        onClick={gerarEAbrir}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-lg mb-4 hover:cursor-pointer"
      >
        Gerar Nota
      </button>

      <h3 className="font-bold text-lg mb-2">
        Resultado:
      </h3>

      <textarea
        readOnly
        className="w-full h-64 border rounded-lg p-3 font-mono"
        value={resultado}
      />
    </Layout>
  );
}