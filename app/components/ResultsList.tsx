interface ResultsListProps {
  results: any; // You can type this properly later
}

export default function ResultsList({ results }: ResultsListProps) {
  if (!results?.results?.length) {
    return (
      <div className="mt-8 p-8 text-center bg-gray-50 rounded-lg">
        <p className="text-gray-600">
          No matches found. Try a different search!
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">
        Found {results.metadata.totalMatches} experiences
      </h2>

      <div className="space-y-4">
        {results.results.map((item: any, index: number) => (
          <div
            key={index}
            className="p-4 border rounded-lg hover:shadow-md transition"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium">{item.package.title}</h3>
                <p className="text-gray-600">{item.package.location}</p>
              </div>
              <div className="text-lg font-bold text-green-600">
                ${item.package.price}
              </div>
            </div>

            <div className="mt-2">
              <p className="text-sm text-gray-700 bg-blue-50 p-2 rounded">
                <span className="font-medium">Why this matches:</span>{" "}
                {item.matchReason}
              </p>
            </div>

            <div className="mt-2 flex gap-2">
              {item.package.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
