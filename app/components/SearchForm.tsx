import { useState, FormEvent } from "react";

interface SearchFormProps {
  onSearch: (query: string) => void;
  loading: boolean;
}

export default function SearchForm({ onSearch, loading }: SearchFormProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative group">
        <textarea
          id="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Describe your ideal trip (e.g., 'A chilled beach weekend with surfing vibes under $100')"
          className="w-full p-4 pr-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none min-h-[120px] resize-none text-gray-700 dark:text-gray-200 placeholder-gray-400 leading-relaxed"
          disabled={loading}
        />
        <div className="absolute bottom-4 right-4 text-xs text-gray-400 pointer-events-none">
          {query.length} chars
        </div>
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Searching...
            </span>
          ) : (
            "Scout Experiences"
          )}
        </button>
      </div>
    </form>
  );
}
