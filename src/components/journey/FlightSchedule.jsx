import React from 'react';

const icaoToName = {
  LFMD: 'Cannes (LFMD)',
  EBKT: 'Kortrijk (EBKT)',
  EGHP: 'Popham (EGHP)',
  EGPC: 'Wick (EGPC)',
  BIRK: 'Reykjavik (BIRK)',
  BGQO: 'Nuuk (BGQO)',
  CYYR: 'Goose Bay (CYYR)',
  KBGR: 'Bangor (KBGR)',
  KBLM: 'Belmar (KBLM)',
  KJWN: 'Nashville (KJWN)',
  KASG: 'Springdale (KASG)',
  KFFC: 'Atlanta (KFFC)',
  KVRB: 'Vero Beach (KVRB)',
  MYNN: 'Nassau (MYNN)',
  TUPJ: 'Providenciales (TUPJ)',
  SBBE: 'Belém (SBBE)',
  SLTR: 'Trinidad (SLTR)',
  SGAS: 'Asunción (SGAS)',
  SCEL: 'Santiago (SCEL)',
  SAWH: 'Ushuaia (SAWH)',
  SAWB: 'Stanley (SAWB)',
  'WFR / NOVO': 'Wolf\'s Fang / Novo Runway',
  FACT: 'Cape Town (FACT)',
  FMMI: 'Antananarivo (FMMI)',
  VRMG: 'Malé (VRMG)',
  YPCC: 'Cocos Islands (YPCC)',
  YPKA: 'Karratha (YPKA)',
  YPDN: 'Darwin (YPDN)',
  WAPP: 'Ambon (WAPP)',
  RPMR: 'General Santos (RPMR)',
  RPLL: 'Manila (RPLL)',
  VHHH: 'Hong Kong (VHHH)',
  VVCR: 'Cam Ranh (VVCR)',
  VTBD: 'Bangkok (VTBD)',
  VEBS: 'Kolkata (VEBS)',
  VAAH: 'Ahmedabad (VAAH)',
  OOMS: 'Muscat (OOMS)',
  OERK: 'Riyadh (OERK)',
  HEGN: 'Hurghada (HEGN)',
  LGST: 'Santorini (LGST)',
};

// Serial date to MM/DD/YYYY
const excelDateToString = (serial) => {
  const date = new Date((serial - 25569) * 86400 * 1000);
  const m = String(date.getUTCMonth() + 1).padStart(2, '0');
  const d = String(date.getUTCDate()).padStart(2, '0');
  const y = date.getUTCFullYear();
  return `${m}/${d}/${y}`;
};

const rawLegs = [
  { date: 46300, dep: 'LFMD',       arr: 'EBKT',        dist: 458,  notes: '' },
  { date: 46301, dep: 'EBKT',       arr: 'EGHP',        dist: 170,  notes: '' },
  { date: 46302, dep: 'EGHP',       arr: 'EGPC',        dist: 442,  notes: '' },
  { date: 46304, dep: 'EGPC',       arr: 'BIRK',        dist: 649,  notes: '' },
  { date: 46305, dep: 'BIRK',       arr: 'BGQO',        dist: 700,  notes: '' },
  { date: 46306, dep: 'BGQO',       arr: 'CYYR',        dist: 650,  notes: '' },
  { date: 46307, dep: 'CYYR',       arr: 'KBGR',        dist: 608,  notes: '' },
  { date: 46309, dep: 'KBGR',       arr: 'KBLM',        dist: 364,  notes: '' },
  { date: 46310, dep: 'KBLM',       arr: 'KJWN',        dist: 650,  notes: '' },
  { date: 46311, dep: 'KJWN',       arr: 'KASG',        dist: 352,  notes: '' },
  { date: 46312, dep: 'KASG',       arr: 'KFFC',        dist: 501,  notes: '' },
  { date: 46320, dep: 'KFFC',       arr: 'KVRB',        dist: 404,  notes: '' },
  { date: 46321, dep: 'KVRB',       arr: 'MYNN',        dist: 224,  notes: '' },
  { date: 46322, dep: 'MYNN',       arr: 'TUPJ',        dist: 822,  notes: '' },
  { date: 46323, dep: 'TUPJ',       arr: 'SBBE',        dist: 1518, notes: '' },
  { date: 46325, dep: 'SBBE',       arr: 'SLTR',        dist: 1263, notes: '' },
  { date: 46326, dep: 'SLTR',       arr: 'SGAS',        dist: 750,  notes: '' },
  { date: 46327, dep: 'SGAS',       arr: 'SCEL',        dist: 850,  notes: '' },
  { date: 46328, dep: 'SCEL',       arr: 'SAWH',        dist: 1520, notes: 'Pat. Fields' },
  { date: 46329, dep: 'SAWH',       arr: 'SAWB',        dist: 666,  notes: '' },
  { date: 46357, dep: 'SAWB',       arr: 'WFR / NOVO',  dist: 1470, notes: '' },
  { date: 46360, dep: 'WFR / NOVO', arr: 'WFR / NOVO',  dist: 2240, notes: 'SP transit' },
  { date: 46363, dep: 'WFR / NOVO', arr: 'FACT',        dist: 2280, notes: '' },
  { date: 46367, dep: 'FACT',       arr: 'FMMI',        dist: 1791, notes: '' },
  { date: 46370, dep: 'FMMI',       arr: 'VRMG',        dist: 1861, notes: '' },
  { date: 46373, dep: 'VRMG',       arr: 'YPCC',        dist: 1570, notes: '' },
  { date: 46376, dep: 'YPCC',       arr: 'YPKA',        dist: 1256, notes: '' },
  { date: 46377, dep: 'YPKA',       arr: 'YPDN',        dist: 952,  notes: '' },
  { date: 46378, dep: 'YPDN',       arr: 'WAPP',        dist: 546,  notes: '' },
  { date: 46380, dep: 'WAPP',       arr: 'RPMR',        dist: 610,  notes: '' },
  { date: 46381, dep: 'RPMR',       arr: 'RPLL',        dist: 560,  notes: '' },
  { date: 46382, dep: 'RPLL',       arr: 'VHHH',        dist: 618,  notes: '' },
  { date: 46383, dep: 'VHHH',       arr: 'VVCR',        dist: 673,  notes: '' },
  { date: 46385, dep: 'VVCR',       arr: 'VTBD',        dist: 518,  notes: '' },
  { date: 46386, dep: 'VTBD',       arr: 'VEBS',        dist: 930,  notes: '' },
  { date: 46387, dep: 'VEBS',       arr: 'VAAH',        dist: 756,  notes: '' },
  { date: 46388, dep: 'VAAH',       arr: 'OOMS',        dist: 793,  notes: '' },
  { date: 46390, dep: 'OOMS',       arr: 'OERK',        dist: 640,  notes: '' },
  { date: 46391, dep: 'OERK',       arr: 'HEGN',        dist: 710,  notes: '' },
  { date: 46392, dep: 'HEGN',       arr: 'LGST',        dist: 623,  notes: '' },
  { date: 46394, dep: 'LGST',       arr: 'LFMD',        dist: 1018, notes: '' },
];

const flightData = rawLegs.map(leg => ({
  departure: icaoToName[leg.dep] || leg.dep,
  destination: icaoToName[leg.arr] || leg.arr,
  departureTime: '—',
  arrivalTime: '—',
  date: excelDateToString(leg.date),
  remarks: leg.notes || 'TBD',
}));

const FlightRow = ({ flight, index }) => (
  <tr style={{ backgroundColor: index % 2 === 0 ? '#fafafa' : '#fff' }}>
    <td style={{ padding: '0.65rem 0.75rem', border: '1px solid #e5e5e5', textAlign: 'center', fontSize: '0.82rem' }}>{flight.departure}</td>
    <td style={{ padding: '0.65rem 0.75rem', border: '1px solid #e5e5e5', textAlign: 'center', fontSize: '0.82rem' }}>{flight.destination}</td>
    <td style={{ padding: '0.65rem 0.75rem', border: '1px solid #e5e5e5', textAlign: 'center', fontSize: '0.82rem', color: '#aaa' }}>{flight.departureTime}</td>
    <td style={{ padding: '0.65rem 0.75rem', border: '1px solid #e5e5e5', textAlign: 'center', fontSize: '0.82rem', color: '#aaa' }}>{flight.arrivalTime}</td>
    <td style={{ padding: '0.65rem 0.75rem', border: '1px solid #e5e5e5', textAlign: 'center', fontSize: '0.82rem' }}>{flight.date}</td>
    <td style={{ padding: '0.65rem 0.75rem', border: '1px solid #e5e5e5', textAlign: 'center', fontSize: '0.82rem',
      color: flight.remarks === 'SP transit' ? '#D4AF37' : flight.remarks === 'TBD' ? '#999' : '#000',
      fontWeight: flight.remarks === 'SP transit' ? 700 : 400,
    }}>{flight.remarks || 'TBD'}</td>
  </tr>
);

const FlightSchedule = () => (
  <div style={{ padding: '1rem', maxWidth: '100%', overflowX: 'auto', fontFamily: 'Arial, sans-serif', marginBottom: '3rem' }}>
    <h2 style={{
      fontFamily: "'Impact', 'Arial Black', sans-serif",
      fontSize: '2rem', fontWeight: 900, textTransform: 'uppercase',
      color: '#000', marginBottom: '0.5rem', textAlign: 'center',
    }}>
      Planned Flight Schedule
    </h2>
    <p style={{
      textAlign: 'center', fontSize: '0.75rem', color: '#aaa',
      marginBottom: '1.5rem', fontFamily: "'Outfit', sans-serif",
      letterSpacing: '0.08em', textTransform: 'uppercase',
    }}>
      41 legs · 7 continents · Departure times TBC closer to departure
    </p>
    <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #e5e5e5', fontSize: '0.9rem' }}>
      <thead>
        <tr>
          {['DEPARTURE', 'DESTINATION', 'DEP TIME', 'ARR TIME', 'DATE (M/D/Y)', 'REMARKS'].map(h => (
            <th key={h} style={{
              padding: '0.75rem', border: '1px solid #e5e5e5',
              backgroundColor: '#000', color: '#fff',
              fontWeight: 700, textAlign: 'center',
              fontFamily: "'Impact', 'Arial Black', sans-serif",
              fontSize: '0.8rem', letterSpacing: '0.05em',
            }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {flightData.map((flight, index) => (
          <FlightRow key={index} flight={flight} index={index} />
        ))}
      </tbody>
    </table>
  </div>
);

export default FlightSchedule;
