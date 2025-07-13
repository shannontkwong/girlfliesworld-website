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
  {
    departure: 'Nuuk (BGGH)',
    destination: 'Iqaluit (CYFB)',
    departureTime: '09:00 UTC',
    arrivalTime: '13:45 UTC',
    date: '2025/12/05',
    remarks: 'Weather Dependent',
  },
  {
    departure: 'Iqaluit (CYFB)',
    destination: 'Yellowknife (CYZF)',
    departureTime: '10:30 UTC',
    arrivalTime: '15:20 UTC',
    date: '2025/12/08',
    remarks: 'TBD',
  }
];

const FlightRow = ({ flight }) => (
  <tr style={{ backgroundColor: flight.remarks === 'Delayed' ? '#ffe6e6' : 'transparent' }}>
    <td style={{ padding: '0.75rem', border: '1px solid #ccc', textAlign: 'center' }}>{flight.departure}</td>
    <td style={{ padding: '0.75rem', border: '1px solid #ccc', textAlign: 'center' }}>{flight.destination}</td>
    <td style={{ padding: '0.75rem', border: '1px solid #ccc', textAlign: 'center' }}>{flight.departureTime}</td>
    <td style={{ padding: '0.75rem', border: '1px solid #ccc', textAlign: 'center' }}>{flight.arrivalTime}</td>
    <td style={{ padding: '0.75rem', border: '1px solid #ccc', textAlign: 'center' }}>{flight.date}</td>
    <td style={{ padding: '0.75rem', border: '1px solid #ccc', textAlign: 'center' }}>{flight.remarks}</td>
  </tr>
);

const FlightSchedule = () => {
  return (
    <div style={{ 
      padding: '1rem', 
      maxWidth: '100%', 
      overflowX: 'auto', 
      fontFamily: 'Arial, sans-serif', 
      marginBottom: '3rem' 
    }}>
      <h2 style={{ 
        fontFamily: "'Impact', 'Arial Black', sans-serif",
        fontSize: '2rem',
        fontWeight: 900,
        textTransform: 'uppercase',
        color: '#000',
        marginBottom: '1.5rem',
        textAlign: 'center'
      }}>
        Upcoming Flight Schedule
      </h2>
      {flightData.length > 0 ? (
        <table style={{ 
          width: '100%', 
          borderCollapse: 'collapse', 
          border: '1px solid #ccc', 
          fontSize: '0.95rem' 
        }}>
          <thead>
            <tr>
              <th style={{ 
                padding: '0.75rem', 
                border: '1px solid #ccc', 
                backgroundColor: '#f8f8f8', 
                fontWeight: 'bold', 
                textAlign: 'center' 
              }}>DEPARTURE</th>
              <th style={{ 
                padding: '0.75rem', 
                border: '1px solid #ccc', 
                backgroundColor: '#f8f8f8', 
                fontWeight: 'bold', 
                textAlign: 'center' 
              }}>DESTINATION</th>
              <th style={{ 
                padding: '0.75rem', 
                border: '1px solid #ccc', 
                backgroundColor: '#f8f8f8', 
                fontWeight: 'bold', 
                textAlign: 'center' 
              }}>DEP TIME</th>
              <th style={{ 
                padding: '0.75rem', 
                border: '1px solid #ccc', 
                backgroundColor: '#f8f8f8', 
                fontWeight: 'bold', 
                textAlign: 'center' 
              }}>ARR TIME</th>
              <th style={{ 
                padding: '0.75rem', 
                border: '1px solid #ccc', 
                backgroundColor: '#f8f8f8', 
                fontWeight: 'bold', 
                textAlign: 'center' 
              }}>DATE (Y/M/D)</th>
              <th style={{ 
                padding: '0.75rem', 
                border: '1px solid #ccc', 
                backgroundColor: '#f8f8f8', 
                fontWeight: 'bold', 
                textAlign: 'center' 
              }}>REMARKS</th>
            </tr>
          </thead>
          <tbody>
            {flightData.map((flight, index) => (
              <FlightRow key={index} flight={flight} />
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{ textAlign: 'center', color: '#888', marginTop: '2rem' }}>
          No scheduled flights yet.
        </p>
      )}
    </div>
  );
};

export default FlightSchedule;
