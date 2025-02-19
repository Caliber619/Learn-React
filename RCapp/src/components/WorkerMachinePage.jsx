import { useState } from 'react';

function WorkerMachinePage() {
  const [formData, setFormData] = useState({
    cid: '',
    workerId: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // In a real application, this would be an API call to verify the cid and workerId
    // For now, we'll simulate a successful submission
    
    // Validation (simple example)
    if (formData.cid.length !== 6) {
      setError('The Completion ID must be 6 digits');
      return;
    }
    
    if (formData.workerId.length < 3) {
      setError('Please enter a valid Worker ID');
      return;
    }
    
    setError('');
    setSubmitted(true);
    console.log('Work completion submitted:', formData);
    
    // Here you would typically post this data to your backend
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Worker Machine</h1>
      
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="cid">
              Completion ID (c-id)
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              id="cid"
              name="cid"
              value={formData.cid}
              onChange={handleChange}
              placeholder="Enter the 6-digit code"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="workerId">
              Worker ID
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              id="workerId"
              name="workerId"
              value={formData.workerId}
              onChange={handleChange}
              placeholder="Enter your worker ID"
              required
            />
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition duration-200 text-lg font-semibold"
          >
            SUBMIT
          </button>
        </form>
      ) : (
        <div className="mt-6 p-4 bg-green-100 border border-green-300 rounded-md text-center">
          <h2 className="text-xl font-semibold text-green-800 mb-2">Work Completed!</h2>
          <p className="text-md">
            Thank you for confirming the work completion.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({ cid: '', workerId: '' });
            }}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Enter Another Completion
          </button>
        </div>
      )}
    </div>
  );
}

export default WorkerMachinePage;