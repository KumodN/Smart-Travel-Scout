export default function LoadingSpinner() {
  return (
    <div className="flex flex-col justify-center items-center mt-12 space-y-4">
      <div className="relative">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-100 dark:border-blue-900/30"></div>
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-blue-600 dark:border-t-blue-400 absolute inset-0"></div>
      </div>
      <p className="text-sm font-medium text-gray-400 dark:text-gray-500 animate-pulse">
        Scouting experiences...
      </p>
    </div>
  );
}
