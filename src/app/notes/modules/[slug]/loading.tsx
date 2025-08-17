export default function Loading() {
  return (
    <div className="min-h-[60vh] w-full flex items-center justify-center py-16">
      <div className="h-8 w-8 rounded-full border-2 border-orange-500 border-t-transparent animate-spin" aria-hidden="true"></div>
      <span className="sr-only">Loading</span>
    </div>
  );
}


