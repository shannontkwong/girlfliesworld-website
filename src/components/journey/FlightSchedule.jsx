import React from 'react';

const flightData = [
  {
    departure: 'Brussels (EBBR)',
    destination: 'Reykjavik (BIRK)',
    departureTime: '08:00 UTC',
    arrivalTime: '12:30 UTC',
    date: '2025/12/01',
    remarks: 'On Time',
  },
  {
    departure: 'Reykjavik (BIRK)',
    destination: 'Nuuk (BGGH)',
    departureTime: '14:00 UTC',
    arrivalTime: '17:00 UTC',
    date: '2025/12/02',
    remarks: 'TBD',
  },
];

const FlightRow = ({ flight }) => (
  <tr className={flight.remarks === 'Delayed' ? 'delayed' : ''}>
    <td>{flight.departure}</td>
    <td>{flight.destination}</td>
    <td>{flight.departureTime}</td>
    <td>{flight.arrivalTime}</td>
    <td>{flight.date}</td>
    <td>{flight.remarks}</td>
  </tr>
);

const FlightSchedule = () => {
  return (
    <>
      <style>{`
        .flight-schedule-container {
          padding: 1rem;
          max-width: 100%;
          overflow-x: auto;
          font-family: 'Arial', sans-serif;
        }

        .flight-schedule-container h2 {
          margin-bottom: 1rem;
          font-size: 1.5rem;
          text-align: center;
        }

        .flight-schedule-table {
          width: 100%;
          border-collapse: collapse;
          border: 1px solid #ccc;
          font-size: 0.95rem;
        }

        .flight-schedule-table th,
        .flight-schedule-table td {
          padding: 0.75rem;
          border: 1px solid #ccc;
          text-align: center;
        }

        .flight-schedule-table th {
          background-color: #f8f8f8;
          font-weight: bold;
        }

        .flight-schedule-table tr:hover {
          background-color: #f1f1f1;
        }

        .delayed {
          background-color: #ffe6e6;
          color: #cc0000;
          font-weight: bold;
        }

        .no-flights {
          text-align: center;
          color: #888;
          margin-top: 2rem;
        }
      `}</style>

      <div className="flight-schedule-container">
        <h2>Upcoming Flight Schedule</h2>
        {flightData.length > 0 ? (
          <table className="flight-schedule-table">
            <thead>
              <tr>
                <th>DEPARTURE</th>
                <th>DESTINATION</th>
                <th>DEP TIME</th>
                <th>ARR TIME</th>
                <th>DATE (Y/M/D)</th>
                <th>REMARKS</th>
              </tr>
            </thead>
            <tbody>
              {flightData.map((flight, index) => (
                <FlightRow key={index} flight={flight} />
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-flights">No scheduled flights yet.</p>
        )}
      </div>
    </>
  );
};

export default FlightSchedule;
