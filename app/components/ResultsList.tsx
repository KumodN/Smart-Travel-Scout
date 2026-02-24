interface ResultsListProps {
  results: any; // You can type this properly later
}

export default function ResultsList({ results }: ResultsListProps) {
  if (!results?.results?.length) {
    return (
      <div className="mt-12 p-12 text-center bg-white dark:bg-gray-800/50 rounded-3xl border border-dashed border-gray-200 dark:border-gray-700">
        <div className="mb-4 flex justify-center text-gray-300 dark:text-gray-600">
          <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-gray-600 dark:text-gray-400 font-medium italic">
          "I don't have the right information for this specific request. Try something else!"
        </p>
      </div>
    );
  }

  return (
    <div className="mt-12 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Discovery Results
        </h2>
        <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold rounded-full uppercase tracking-wider">
          {results.metadata.totalMatches} Matches
        </span>
      </div>

      <div className="space-y-6">
        {results.results.map((item: any, index: number) => (
          <div
            key={index}
            className="glass-card p-6 rounded-3xl relative overflow-hidden"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {item.package.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {item.package.location}
                </p>
              </div>
              <div className="text-2xl font-black text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-2xl">
                <span className="text-base font-normal opacity-60 mr-1">$</span>
                {item.package.price}
              </div>
            </div>

            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800/80 rounded-2xl border border-gray-100 dark:border-gray-700/50">
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <span className="inline-block px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-[10px] font-bold rounded mr-2 uppercase tracking-tighter align-middle">
                  Insight
                </span>
                {item.matchReason}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {item.package.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-600 text-gray-600 dark:text-gray-300 text-xs font-semibold rounded-full shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-8 text-center text-xs text-gray-400 dark:text-gray-600">
        Results grounded via Smart Travel Scout Inventory
      </div>
    </div>
  );
}
