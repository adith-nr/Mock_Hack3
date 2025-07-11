import React, { useState, useEffect } from 'react';
import AirlineTicketCard from '../components/AirlineTicketCard';
import FlightInputs from '../components/FlightInputs'; // Import the form component
import flightData from '../info/flight-data.json';
import { sendFlightData } from '../components/sendFlightData';



const formatDate = (value) => {
  const digits = value.replace(/\D/g, '');
  let formatted = '';
  if (digits.length <= 4) {
    formatted = digits;
  } else if (digits.length <= 6) {
    formatted = `${digits.slice(0, 4)}-${digits.slice(4)}`;
  } else {
    formatted = `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6, 8)}`;
  }
  return formatted;
};

const initialData = {
  numberOfDays: '',
  budgetClass: '',
  destination: '',
  origin: '',
  layovers: [],
  arrivalDate: '',
  departureDate: ''
};



const Flights = () => {

  const [form, setForm] = useState(() => {
    const saved = localStorage.getItem('flightForm');
    return saved ? JSON.parse(saved) : initialData;
  });
  const [layoverInput, setLayoverInput] = useState({ destination: '', arrival: '', departure: '' });
  const [showTickets, setShowTickets] = useState(false);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    setTickets(tickets)
  }, [tickets]);

  useEffect(() => {
    localStorage.setItem('flightForm', JSON.stringify(form));
  }, [form]);

  // All handlers remain the same
  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value });
  const handleSelectChange = (field) => (e) => setForm({ ...form, [field]: e.target.value });
  const handleLayoverInputChange = (field) => (e) => setLayoverInput({ ...layoverInput, [field]: e.target.value });
  const addLayover = (e) => {
    e.preventDefault();
    if (
      layoverInput.destination.trim() &&
      layoverInput.arrival.trim() &&
      layoverInput.departure.trim()
    ) {
      setForm({
        ...form,
        layovers: [...form.layovers, { ...layoverInput }]
      });
      setLayoverInput({ destination: '', arrival: '', departure: '' });
    }
  };
  const removeLayover = (index) => {
    setForm({
      ...form,
      layovers: form.layovers.filter((_, i) => i !== index)
    });
  };
  const isFormComplete =
    form.numberOfDays &&
    form.budgetClass &&
    form.destination &&
    form.origin &&
    form.arrivalDate.length === 10 &&
    form.departureDate.length === 10;
  const handleSearch = async (e) =>{
    e.preventDefault();
    if (isFormComplete) {
      const responce = await sendFlightData(form);
      if (responce) {
        
        console.log('Flight data sent:', responce.flight_details);
        setTickets(Object.values(responce.flight_details)); 
        console.log(tickets)
        setShowTickets(true);

      } else {
        console.error('Failed to send search data');
      }
      // setShowTickets(true);
      // console.log('Search data:', form);
    }
  };

  

  return (
    <section
      className="flex-shrink-0 h-screen flex flex-col items-center justify-center bg-blue-100"
      style={{ width: '100vw', scrollSnapAlign: 'start', overflowY: 'auto' }}
    >
      <h1 className="text-4xl font-bold text-blue-700 mb-8">Flights</h1>
      <div className="flex flex-row items-start justify-center w-full">
        {/* Use FlightInputs instead of the form */}
        <FlightInputs
          form={form}
          layoverInput={layoverInput}
          handleChange={handleChange}
          handleSelectChange={handleSelectChange}
          handleLayoverInputChange={handleLayoverInputChange}
          addLayover={addLayover}
          removeLayover={removeLayover}
          isFormComplete={isFormComplete}
          handleSearch={handleSearch}
          formatDate={formatDate}
          setForm={setForm}
          setLayoverInput={setLayoverInput}
        />

        {/* Tickets (right) */}
        {showTickets && (
          <div
            className="flex flex-col items-center"
            style={{
              marginLeft: '3rem',
              background: 'rgba(255,255,255,0.18)',
              borderRadius: '1rem',
              maxWidth: '990px',
              width: '990px',
              maxHeight: '96vh',
              height: '80vh',
              overflowY: 'auto',
              padding: '8rem 2rem 2rem 2rem', // Increased top padding to 8rem
              display: 'flex',
              gap: '12rem',
              position: 'relative',
              alignItems: 'flex-start',
            }}
          >
            {tickets.map((ticket, idx) => (
              <AirlineTicketCard key={idx} ticket={ticket} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Flights;