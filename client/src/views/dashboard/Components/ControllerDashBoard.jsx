import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllReport } from '../../../store/report/reportController';
import { toast } from 'react-toastify';
import { resetReportState } from '../../../store/report/reportSlice';
import { FaEdit } from 'react-icons/fa'; // FontAwesome Edit Icon

function ControllerDashBoard() {
  const [selectedReport, setSelectedReport] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newStatus, setNewStatus] = useState('');

  const dispatch = useDispatch();
  const { reports, loading, status, message } = useSelector((state) => state.report);

  // Fetch all reports on component mount
  useEffect(() => {
    dispatch(fetchAllReport());
  }, [dispatch]);

  // Handle status updates
  useEffect(() => {
    if (status.updateReport === 'success') {
      toast.success(message || 'Report status updated successfully!');
      dispatch(resetReportState());
      setIsPopupOpen(false);
    } else if (status.updateReport === 'rejected') {
      toast.error(message || 'Failed to update report status.');
    }
  }, [status.updateReport, message, dispatch]);

  // Open popup to update report status
  const handleOpenPopup = (report) => {
    setSelectedReport(report);
    setNewStatus(report.status);
    setIsPopupOpen(true);
  };

  // Update report status
  const handleUpdateStatus = async () => {
    if (!selectedReport || !newStatus) return;

    // dispatch(updateReportStatus({ id: selectedReport._id, status: newStatus }));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Controller Dashboard</h1>

      {loading.fetchAllReportLoading ? (
        <p className="text-center text-lg">Loading reports...</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {reports && reports?.map((report) => (
            <div
              key={report._id}
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold">{report?.reportType}</h2>
              <p className="text-sm text-gray-600 mt-2">Report Description: {report?.description}</p>
              <p className="text-sm text-gray-600">Reported By: {report?.userId?.name || 'N/A'}</p>
              <p className="text-sm text-gray-600">Blog ID: {report?.blogId || 'N/A'}</p>
              <p className="text-sm text-gray-600">Status: {report?.status}</p>
              <button
                onClick={() => handleOpenPopup(report)}
                className="mt-4 flex items-center justify-center w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition"
              >
                <FaEdit className="mr-2" /> Update Status
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Popup for updating report status */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Update Report Status</h2>
            <p className="text-sm text-gray-600 mb-2">
              <strong>Report Type:</strong> {selectedReport?.reportType}
            </p>
            <p className="text-sm text-gray-600 mb-4">
              <strong>Description:</strong> {selectedReport?.description}
            </p>
            <label htmlFor="status" className="block text-sm font-semibold text-gray-700 mb-2">
              New Status
            </label>
            <select
              id="status"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="Pending">Pending</option>
              <option value="Under Investigation">Under Investigation</option>
              <option value="Resolved">Resolved</option>
              <option value="Dismissed">Dismissed</option>
            </select>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setIsPopupOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateStatus}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ControllerDashBoard;
