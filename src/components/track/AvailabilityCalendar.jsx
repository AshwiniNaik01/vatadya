import { Check, Calendar } from "lucide-react";

const AvailabilityCalendar = ({ trek }) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const fullMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const isAvailable = (index) => {
    return trek?.availableMonths?.includes(fullMonths[index]);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border-3 border-blue-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 border-b border-blue-800 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
            <Calendar className="w-5 h-5 text-blue-100" />
          </div>

          <div>
            <h3 className="font-semibold text-white">Availability Calendar</h3>
            <p className="text-xs text-blue-200 mt-0.5">
              Months when this trek is available
            </p>
          </div>
        </div>
      </div>

      {/* Calendar Body */}
      <div className="p-6 bg-slate-50">
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
          {months.map((m, i) => {
            const available = isAvailable(i);

            return (
              <div
                key={i}
                className={`
                  relative h-18 rounded-xl flex flex-col items-center justify-center
                  border transition-all duration-300

                  ${
                    available
                      ? "bg-green-600 border-green-400 text-white shadow-sm"
                      : "bg-slate-100 border-blue-800 text-slate-400"
                  }
                `}
              >
                {/* Month */}
                <span className="text-sm font-semibold tracking-wide">{m}</span>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-8 pt-5 border-t border-slate-200 flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-green-600"></div>
            <span className="text-slate-600">Available</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-slate-300 border border-blue-800"></div>
            <span className="text-slate-500">Unavailable</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityCalendar;
