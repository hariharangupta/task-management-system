export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-stone-100">
      <h1 className="text-5xl font-bold text-stone-800">404</h1>
      <h2 className="mt-4 text-2xl text-stone-600">Page Not Found</h2>
      <p className="mt-2 text-stone-500">
        Sorry, the page you are looking for does not exist.
      </p>
      <a href="/" className="mt-4 text-stone-900 hover:underline">
        Go back home
      </a>
    </div>
  );
}
