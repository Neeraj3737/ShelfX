import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgress } from '@mui/material';

const RequestList = ({ sellerId }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/requests/${sellerId}`, {
          withCredentials: true,
        });
        console.log(response.data);
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching requests:', error);
      } finally {
        setLoading(false);
      }
    };

    if (sellerId) {
      fetchRequests();
    }
  }, [sellerId]);

  const handleApproveRequest = async (bookId, sellerId) => {
    try {
      await axios.put(`http://localhost:5000/requests/${bookId}/approve`, { sellerId });
      setRequests((prevRequests) =>
        prevRequests.map((req) =>
          req.bookId === bookId && req.id === sellerId ? { ...req, status: 'approved' } : req
        )
      );
    } catch (error) {
      console.error('Error approving request:', error);
    }
  };

  const handleRejectRequest = async (bookId, sellerId) => {
    try {
      await axios.put(`http://localhost:5000/requests/${bookId}/reject`, { sellerId });
      setRequests((prevRequests) =>
        prevRequests.map((req) =>
          req.bookId === bookId && req.id === sellerId ? { ...req, status: 'rejected' } : req
        )
      );
    } catch (error) {
      console.error('Error rejecting request:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[100px]">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="mt-8 p-8">
      <h3 className="text-2xl font-extrabold text-[#393E46] mb-6">Manage Rental Requests</h3>
      <div className="flex flex-wrap gap-6 justify-start">
        {requests.length > 0 ? (
          requests.map((request) => (
            <div
              key={request.bookId}
              className="flex flex-col items-start border border-gray-200 p-6 rounded-lg shadow-lg bg-white w-full sm:w-[350px] md:w-[400px]"
            >
              <h4 className="text-xl font-semibold mb-2">{request.bookName}</h4>
              <div className="mt-2 mb-4 space-y-1 text-sm text-gray-700">
                <p><strong>Buyer Email:</strong> {request.email}</p>
                <p><strong>Pincode:</strong> {request.pincode}</p>
                <p><strong>State:</strong> {request.state}</p>
              </div>
              <div className="mt-auto">
                {request.status !== 'approved' && request.status !== 'rejected' ? (
                  <>
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
                      onClick={() => handleApproveRequest(request.bookId, request.id)}
                    >
                      Approve
                    </button>
                    <button
                      className="ml-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                      onClick={() => handleRejectRequest(request.bookId, request.id)}
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <p className="text-gray-600">{`Request ${request.status}`}</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No requests available.</p>
        )}
      </div>
    </div>
  );
};

export default RequestList;
