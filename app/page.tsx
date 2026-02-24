"use client";

import { useState } from "react";
import SearchForm from "./components/SearchForm";
import ResultsList from "./components/ResultsList";
import LoadingSpinner from "./components/LoadingSpinner";

export default function Home() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Search failed");
      }

      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Smart Travel Scout</h1>
      <p className="text-gray-600 mb-8">
        Find your perfect Sri Lankan adventure
      </p>

      <SearchForm onSearch={handleSearch} loading={loading} />

      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-700 rounded">{error}</div>
      )}

      {loading && <LoadingSpinner />}

      {results && !loading && <ResultsList results={results} />}
    </main>
  );
}
