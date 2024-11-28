import React, { useState } from 'react';
import { updateReportStatus } from '../../../store/report/reportController';
import { useDispatch, useSelector } from 'react-redux';

function UpdateReportStatus({ selectedReport, onClose, reportStatus }) {
  const [newStatus, setNewStatus] = useState(reportStatus);
  const [resolutionNotes, setResolutionNotes] = useState("");
  const dispatch = useDispatch()
  const { status , message , loading } = useSelector((state)=>state.report)

  // Update report status
  const handleUpdateStatus = async () => {
    if (!newStatus) return;

    // Dispatch your update action here
    // Example:
    dispatch(updateReportStatus({
      reportId: selectedReport._id,
      status: newStatus,
      resolutionNotes,
    }));
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg w-96">
      <h2 className="text-xl font-semibold mb-4">Update Report Status</h2>
      <p className="text-sm text-gray-600 mb-2">
        <strong>Report Type:</strong> {selectedReport?.reportType}
      </p>
      <p className="text-sm text-gray-600 mb-4">
        <strong>Description:</strong> {selectedReport?.description}
      </p>

      <label
        htmlFor="status"
        className="block text-sm font-semibold text-gray-700 mb-2"
      >
        New Status
      </label>
      <select
        id="status"
        value={newStatus}
        onChange={(e) => setNewStatus(e.target.value)}
        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="Pending">Pending</option>
        <option value="Reviewed">Under Investigation</option>
        <option value="Resolved">Resolved</option>
        <option value="Dismissed">Dismissed</option>
      </select>

      <label
        htmlFor="resolutionNotes"
        className="block text-sm font-semibold text-gray-700 mt-4 mb-2"
      >
        Resolution Notes (Optional)
      </label>
      <textarea
        id="resolutionNotes"
        value={resolutionNotes}
        onChange={(e) => setResolutionNotes(e.target.value)}
        rows="3"
        placeholder="Add any additional notes about the resolution..."
        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      ></textarea>

      <div className="mt-4 flex justify-end space-x-2">
        <button
          onClick={() => onClose()}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleUpdateStatus}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
         { loading.UpdateReportStatusLoading ? 'updating...' : 'Update'}
        </button>
      </div>
    </div>
  );
}

export default UpdateReportStatus;
