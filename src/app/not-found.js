import Link from "next/link";
export default function NotFound() {
  return (
    <div className="content-section">
      <div className="min-h-screen flex flex-col items-center justify-start text-white px-4">
        <h1 className="text-6xl font-bold text-purple-500 mb-4">404</h1>
        <p className="text-xl mb-6">
          Sorry, the page you’re looking for doesn’t exist.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-purple-600 hover:bg-purple-800 rounded-lg transition"
        >
          Go back to Home
        </Link>
      </div>
    </div>
  );
}
