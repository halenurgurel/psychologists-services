export default function Spinner({ fullPage = false }: { fullPage?: boolean }) {
  const spinner = (
    <div className="flex items-center justify-center">
      <div className="relative h-12 w-12">
        <div className="border-primary/20 absolute inset-0 rounded-full border-4" />
        <div className="border-primary absolute inset-0 animate-spin rounded-full border-4 border-t-transparent" />
        <div
          className="bg-primary absolute inset-0 m-auto h-2 w-2 rounded-full opacity-80"
          style={{ animationDelay: "0.3s" }}
        />
      </div>
    </div>
  );

  if (fullPage) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">{spinner}</div>
    );
  }

  return spinner;
}
