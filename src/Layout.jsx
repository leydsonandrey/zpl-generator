export default function Layout({ title, children }) {
  return (
    <div className="max-w-xl mx-auto bg-white p-6 mt-6 rounded-2xl shadow">
      <h2 className="text-center text-2xl font-bold mb-6">{title}</h2>
      {children}
    </div>
  );
}
