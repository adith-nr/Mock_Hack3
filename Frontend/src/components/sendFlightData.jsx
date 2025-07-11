
export const sendFlightData = async ({ localStorageKey = 'flightForm', endpoint = 'http://localhost:3000/api/prompt/Flight' }) => {
    const data = localStorage.getItem(localStorageKey);

    if (!data) {
      setStatus('No data found in localStorage.');
      return;
    }
    console.log("Main: ", data)

    try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: data,
    });
    return response.json();
  } catch (error) {
    console.error('Error sending data:', error);
    return false;
  }
};
