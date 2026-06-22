import { useState } from "react";
import Layout from "../Layout";
import ReactDOM from "react-dom";
import { QRCodeSVG } from "qrcode.react";

export default function Peso() {
  const [codigo, setCodigo] = useState("");
  const [peso, setPeso] = useState("");

  return (
    <Layout title="Gerador de Peso">
      <div className="flex flex-row justify-between gap-2">
        <div className="w-full">
          <label className="font-semibold">Código:</label>
          <input
            className="w-full border rounded-lg p-2 mb-4"
            value={codigo}
            maxLength={4}
            onChange={(e) => setCodigo(e.target.value)}
          />
        </div>
        <div className="w-full">
          <label className="font-semibold">Peso:</label>
          <input
            className="w-full border rounded-lg p-2 mb-4"
            value={peso}
            maxLength={4}
            onChange={(e) => setPeso(e.target.value)}
          />
        </div>
      </div>
      <p>Obs. 1: O peso precisa conter 4 dígitos. Ex.: 1,3kg = 1300</p>
      <p>
        Obs. 2: Peso abaixo de 1kg precisa começar com 0. Ex.: 150 gramas = 0150{" "}
      </p>
      {codigo && peso ? (
        <div>
        <QRCodeSVG
          className="w-full size-44 mt-4"
          value={`20${codigo}000000000${peso}`}
        />
        <p className="mt-2">{`20${codigo}000000000${peso}`}</p>
</div>
      ) : (
        <p className="mt-4">Por favor, insira o código e o peso.</p>
      )}
    </Layout>
  );
}
