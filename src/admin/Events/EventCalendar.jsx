import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Clock, MapPin, Users } from "lucide-react";

const EventCalendar = ({
  events,
  onDateClick,
  onEventClick,
  initialView = "month",
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState(initialView);

  const monthNames = [
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

  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const weekDaysShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const navigateDate = (direction) => {
    const newDate = new Date(currentDate);
    if (view === "month") {
      newDate.setMonth(newDate.getMonth() + direction);
    } else if (view === "week") {
      newDate.setDate(newDate.getDate() + direction * 7);
    } else if (view === "day") {
      newDate.setDate(newDate.getDate() + direction);
    }
    setCurrentDate(newDate);
  };

  const getEventsForDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const dateStr = `${year}-${month}-${day}`;
    return events.filter((event) => event.date === dateStr);
  };

  const getWeekDates = () => {
    const startOfWeek = new Date(currentDate);
    const day = startOfWeek.getDay();
    startOfWeek.setDate(startOfWeek.getDate() - day);

    const week = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      week.push(date);
    }
    return week;
  };

  const getTimeSlots = () => {
    const slots = [];
    for (let hour = 0; hour < 24; hour++) {
      slots.push(`${String(hour).padStart(2, "0")}:00`);
    }
    return slots;
  };

  const isEventInTimeSlot = (event, timeSlot) => {
    if (event.isFullDay) return true;
    const slotHour = parseInt(timeSlot.split(":")[0]);
    const startHour = parseInt(event.startTime.split(":")[0]);
    const endHour = parseInt(event.endTime.split(":")[0]);
    return slotHour >= startHour && slotHour < endHour;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "from-green-500 to-green-600";
      case "planning":
        return "from-yellow-500 to-orange-500";
      case "cancelled":
        return "from-red-500 to-red-600";
      default:
        return "from-blue-500 to-blue-600";
    }
  };

  const getHeaderTitle = () => {
    if (view === "month") {
      return `${
        monthNames[currentDate.getMonth()]
      } ${currentDate.getFullYear()}`;
    } else if (view === "week") {
      const weekDates = getWeekDates();
      const startDate = weekDates[0];
      const endDate = weekDates[6];
      return `${startDate.getDate()} - ${endDate.getDate()} ${
        monthNames[currentDate.getMonth()]
      } ${currentDate.getFullYear()}`;
    } else if (view === "day") {
      return `${weekDays[currentDate.getDay()]}, ${
        monthNames[currentDate.getMonth()]
      } ${currentDate.getDate()}, ${currentDate.getFullYear()}`;
    }
  };

  const renderMonthView = () => {
    const firstDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      days.push(date);
    }

    return (
      <div className="grid grid-cols-7 gap-1">
        {weekDaysShort.map((day) => (
          <div
            key={day}
            className="p-3 text-center font-medium text-slate-600 dark:text-slate-400 text-sm"
          >
            {day}
          </div>
        ))}
        {days.map((date, index) => {
          const eventsForDate = getEventsForDate(date);
          const isCurrentMonth = date.getMonth() === currentDate.getMonth();
          const isToday = date.toDateString() === new Date().toDateString();
          const hasEvent = eventsForDate.length > 0;

          return (
            <div
              key={index}
              onClick={() => onDateClick(date)}
              className={`min-h-[120px] p-2 border border-slate-200 dark:border-slate-700 cursor-pointer transition-all rounded-lg ${
                isCurrentMonth
                  ? "bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                  : "bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800/50"
              } ${isToday ? "ring-2 ring-blue-500" : ""} ${
                hasEvent ? "bg-red-50 dark:bg-red-900/20" : ""
              }`}
            >
              <div
                className={`text-sm font-medium mb-2 ${
                  isCurrentMonth
                    ? "text-slate-800 dark:text-white"
                    : "text-slate-400 dark:text-slate-600"
                } ${isToday ? "text-blue-600 dark:text-blue-400" : ""} ${
                  hasEvent ? "text-red-600 dark:text-red-400" : ""
                }`}
              >
                {date.getDate()}
              </div>
              <div className="space-y-1">
                {eventsForDate.slice(0, 2).map((event) => (
                  <div
                    key={event.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      onEventClick(event);
                    }}
                    className={`p-2 rounded-lg bg-gradient-to-r ${getStatusColor(
                      event.status
                    )} text-white text-xs cursor-pointer hover:opacity-90 transition-all`}
                  >
                    <div className="font-medium truncate">{event.title}</div>
                    <div className="flex items-center gap-1 opacity-90">
                      {!event.isFullDay && (
                        <>
                          <Clock className="w-3 h-3" />
                          <span>
                            {event.startTime}-{event.endTime}
                          </span>
                        </>
                      )}
                      {event.location && (
                        <>
                          <MapPin className="w-3 h-3" />
                          <span className="truncate">{event.location}</span>
                        </>
                      )}
                    </div>
                  </div>
                ))}
                {eventsForDate.length > 2 && (
                  <div className="text-xs text-slate-500 dark:text-slate-400 p-1">
                    +{eventsForDate.length - 2} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderWeekView = () => {
    const weekDates = getWeekDates();
    const timeSlots = getTimeSlots();

    return (
      <div className="flex flex-col">
        {/* Week header */}
        <div className="grid grid-cols-8 gap-1 mb-4">
          <div className="p-3"></div>
          {weekDates.map((date, index) => {
            const isToday = date.toDateString() === new Date().toDateString();
            const hasEvent = getEventsForDate(date).length > 0;

            return (
              <div
                key={index}
                className={`p-3 text-center rounded-lg cursor-pointer transition-all ${
                  isToday
                    ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                    : hasEvent
                    ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                    : "text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700"
                }`}
                onClick={() => onDateClick(date)}
              >
                <div className="text-sm font-medium">
                  {weekDaysShort[date.getDay()]}
                </div>
                <div className="text-lg">{date.getDate()}</div>
              </div>
            );
          })}
        </div>

        {/* Time slots */}
        <div className="max-h-[600px] overflow-y-auto">
          <div className="grid grid-cols-8 gap-1">
            {timeSlots.map((timeSlot) => (
              <React.Fragment key={timeSlot}>
                <div className="p-2 text-xs text-slate-600 dark:text-slate-400 text-right">
                  {timeSlot}
                </div>
                {weekDates.map((date, dayIndex) => {
                  const eventsForDate = getEventsForDate(date);
                  const eventsInSlot = eventsForDate.filter((e) =>
                    isEventInTimeSlot(e, timeSlot)
                  );

                  return (
                    <div
                      key={`${timeSlot}-${dayIndex}`}
                      className="min-h-[40px] border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-all p-1"
                      onClick={() => onDateClick(date, timeSlot)}
                    >
                      {eventsInSlot.map((event) => (
                        <div
                          key={event.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            onEventClick(event);
                          }}
                          className={`text-xs p-1 bg-gradient-to-r ${getStatusColor(
                            event.status
                          )} text-white rounded truncate cursor-pointer hover:opacity-90 transition-all`}
                        >
                          {event.title}
                        </div>
                      ))}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderDayView = () => {
    const timeSlots = getTimeSlots();
    const eventsForDate = getEventsForDate(currentDate);

    return (
      <div className="max-h-[600px] overflow-y-auto">
        <div className="space-y-1">
          {timeSlots.map((timeSlot) => {
            const eventsInSlot = eventsForDate.filter((e) =>
              isEventInTimeSlot(e, timeSlot)
            );

            return (
              <div
                key={timeSlot}
                className="flex items-center gap-4 p-3 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-all cursor-pointer"
                onClick={() => onDateClick(currentDate, timeSlot)}
              >
                <div className="w-16 text-sm text-slate-600 dark:text-slate-400">
                  {timeSlot}
                </div>
                <div className="flex-1">
                  {eventsInSlot.map((event) => (
                    <div
                      key={event.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEventClick(event);
                      }}
                      className={`mb-2 p-4 bg-gradient-to-r ${getStatusColor(
                        event.status
                      )} text-white rounded-lg cursor-pointer hover:opacity-90 transition-all`}
                    >
                      <div className="font-semibold text-lg mb-1">
                        {event.title}
                      </div>
                      <div className="text-sm opacity-90 mb-2">
                        {event.description}
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          <span>{event.attendees} attendees</span>
                        </div>
                        {!event.isFullDay && (
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>
                              {event.startTime} - {event.endTime}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/20 overflow-hidden shadow-lg">
      {/* Calendar Header */}
      <div className="p-6 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
            Event Calendar
          </h2>
          <div className="flex items-center gap-2">
            <select
              value={view}
              onChange={(e) => setView(e.target.value)}
              className="px-3 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-lg text-sm"
            >
              <option value="month">Month</option>
              <option value="week">Week</option>
              <option value="day">Day</option>
            </select>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigateDate(-1)}
            className="p-3 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-all"
          >
            <ChevronLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </button>

          <h3 className="text-xl font-semibold text-slate-800 dark:text-white">
            {getHeaderTitle()}
          </h3>

          <button
            onClick={() => navigateDate(1)}
            className="p-3 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-all"
          >
            <ChevronRight className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </button>
        </div>
      </div>

      {/* Calendar Content */}
      <div className="p-6">
        {view === "month" && renderMonthView()}
        {view === "week" && renderWeekView()}
        {view === "day" && renderDayView()}
      </div>

      {/* Legend */}
      <div className="px-6 pb-6">
        <div className="flex items-center gap-4 text-sm flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-green-600 rounded"></div>
            <span className="text-slate-600 dark:text-slate-400">
              Confirmed
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded"></div>
            <span className="text-slate-600 dark:text-slate-400">Planning</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 border-2 border-blue-500 rounded"></div>
            <span className="text-slate-600 dark:text-slate-400">Today</span>
          </div>
          {(view === "week" || view === "day") && (
            <div className="flex items-center gap-2">
              <Clock className="w-3 h-3 text-slate-600 dark:text-slate-400" />
              <span className="text-slate-600 dark:text-slate-400">
                Time-based view
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCalendar;
