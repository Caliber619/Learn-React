import { useState } from 'react';

function StudentPage() {
  const [formData, setFormData] = useState({
    name: '',
    room: '',
    time: '',
    registrationNumber: ''
  });
  const [cid, setCid] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const generateToken = (e) => {
    e.preventDefault();
    
    // In a real application, this would be an API call
    // For now, we'll just generate a random c-id
    const generatedCid = Math.floor(100000 + Math.random() * 900000).toString();
    
    setCid(generatedCid);
    
    console.log('Token generated for:', formData);
    console.log('Completion ID (c-id):', generatedCid);
    
    // Here you would typically post this data to your backend
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Student Token Generation</h1>
      
      <form onSubmit={generateToken}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="room">
            Room
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            id="room"
            name="room"
            value={formData.room}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="time">
            Preferred Time
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="registrationNumber">
            Registration Number
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            id="registrationNumber"
            name="registrationNumber"
            value={formData.registrationNumber}
            onChange={handleChange}
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Generate Token
        </button>
      </form>
      
      {cid && (
        <div className="mt-6 p-4 bg-green-100 border border-green-300 rounded-md">
          <h2 className="text-lg font-semibold text-green-800 mb-2">Token Generated!</h2>
          <p className="mb-1">
            <span className="font-medium">Completion ID (c-id):</span> {cid}
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Please save this Completion ID. After the worker completes the room cleaning, 
            provide this ID to them for verification.
          </p>
        </div>
      )}
    </div>
  );
}

export default StudentPage;