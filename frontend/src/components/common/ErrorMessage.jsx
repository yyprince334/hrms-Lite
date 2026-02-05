export default function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <p className="text-red-600 text-sm mb-4">
      {message}
    </p>
  );
}