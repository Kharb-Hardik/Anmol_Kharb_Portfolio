type Tournament = {
  year: number;
  name: string;
  location: string;
  result: string;
};

const TournamentTable = ({ tournaments }: { tournaments: Tournament[] }) => {
  const getResultBadge = (result: string) => {
    const upperResult = result.toUpperCase();
    let badgeClass = "bg-gray-400 text-white";

    if (upperResult.includes("WINNER")) {
      badgeClass = "bg-green-600 text-white";
    } else if (upperResult.includes("RUNNER UP")) {
      badgeClass = "bg-blue-600 text-white";
    } else if (upperResult.includes("SEMI FINALIST")) {
      badgeClass = "bg-orange-500 text-white";
    } else if (upperResult.includes("QUARTER FINALIST")) {
      badgeClass = "bg-purple-600 text-white";
    }

    return (
      <span
        className={`px-3 py-1 text-xs font-bold rounded-full inline-block whitespace-nowrap ${badgeClass}`}
      >
        {result}
      </span>
    );
  };

  return (
    <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200">
      <table className="w-full text-left border-collapse bg-white">
        <thead>
          <tr className="bg-gray-50">
            <th className="py-4 px-8 font-bold uppercase text-sm text-gray-600 border-b border-gray-200">
              Year
            </th>
            <th className="py-4 px-8 font-bold uppercase text-sm text-gray-600 border-b border-gray-200">
              Tournament
            </th>
            <th className="py-4 px-8 font-bold uppercase text-sm text-gray-600 border-b border-gray-200 hidden md:table-cell">
              Location
            </th>
            <th className="py-4 px-8 font-bold uppercase text-sm text-gray-600 border-b border-gray-200 text-center">
              Result
            </th>
          </tr>
        </thead>
        <tbody>
          {tournaments.map((tour, index) => (
            <tr
              key={index}
              className="hover:bg-gray-50 transition-colors duration-200"
            >
              <td className="py-4 px-8 border-b border-gray-200 align-middle font-medium text-gray-700">
                {tour.year}
              </td>
              <td className="py-4 px-8 border-b border-gray-200 align-middle text-gray-800">
                {tour.name}
              </td>
              <td className="py-4 px-8 border-b border-gray-200 hidden md:table-cell align-middle text-gray-600">
                {tour.location}
              </td>
              <td className="py-4 px-8 border-b border-gray-200 align-middle text-center">
                {getResultBadge(tour.result.trim())}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TournamentTable;

