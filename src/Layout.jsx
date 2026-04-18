export default function Layout({ title, children }) {
  return (
    <div className="w-full flex justify-center">
      <div className="max-w-xl p-6 m-6 rounded-2xl shadow-lg">
        <h2 className="text-center text-2xl font-bold mb-6">{title}</h2>
        {children}
      </div>
    </div>
  );
}
