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
      <div>
        <label htmlFor="search" className="block text-sm font-medium mb-2">
          What kind of experience are you looking for?
        </label>
        <textarea
          id="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g., A chilled beach weekend with surfing vibes under $100"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 min-h-[100px]"
          disabled={loading}
        />
      </div>

      <button
        type="submit"
        disabled={loading || !query.trim()}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Searching..." : "Find Experiences"}
      </button>
    </form>
  );
}
