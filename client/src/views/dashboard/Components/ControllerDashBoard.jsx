import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllReport } from "../../../store/report/reportController";
import { toast } from "react-toastify";
import { resetReportState } from "../../../store/report/reportSlice";
import { FaEdit } from "react-icons/fa"; // FontAwesome Edit Icon
import { Link } from "react-router-dom";
import UpdateReportStatus from "./UpdateReportStatus";

function ControllerDashBoard() {
  const [selectedReport, setSelectedReport] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newStatus, setNewStatus] = useState("");

    // Get color class based on status
    const getStatusColor = (status) => {
      switch (status) {
        case "Pending":
          return " text-yellow-800";
        case "Reviewed":
          return " text-blue-800";
        case "Resolved":
          return " text-green-800";
        case "Dismissed":
          return " text-red-800";
        default:
          return " text-gray-800";
      }
    };

  const dispatch = useDispatch();
  const { reports, loading, status, message } = useSelector(
    (state) => state.report
  );

  // Fetch all reports on component mount
  useEffect(() => {
    dispatch(fetchAllReport());
  }, [dispatch]);

  // Handle status updates
  useEffect(() => {
    if (message) {
      if (status.fetchAllReport === "success") {
        toast.success(message);
        dispatch(resetReportState());
        setIsPopupOpen(false);
      } else if (status.fetchAllReport === "rejected") {
        toast.error(message);
      }
    }
  }, [status.fetchAllReport, message, dispatch]);

  // Open popup to update report status
  const handleOpenPopup = (report) => {
    setSelectedReport(report);
    setNewStatus(report.status);
    setIsPopupOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        Controller Dashboard
      </h1>

      {loading.fetchAllReportLoading ? (
        <p className="text-center text-lg">Loading reports...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left text-gray-700 font-semibold">
                  Report Type
                </th>
                <th className="px-4 py-2 text-left text-gray-700 font-semibold">
                  Description
                </th>
                <th className="px-4 py-2 text-left text-gray-700 font-semibold">
                  Reported By
                </th>
                <th className="px-4 py-2 text-left text-gray-700 font-semibold">
                  Blog ID
                </th>
                <th className="px-4 py-2 text-left text-gray-700 font-semibold">
                  Status
                </th>
                <th className="px-4 py-2 text-center text-gray-700 font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {reports &&
                reports.map((report) => (
                  <tr key={report._id} className="hover:bg-gray-100">
                    <td className="border px-4 py-2">{report?.reportType}</td>
                    <td className="border px-4 py-2">
                      <div className="line-clamp-2 max-w-[300px]">{report?.description}</div>
                    </td>
                    <td className="border px-4 py-2">
                      <div className="line-clamp-1">
                        {report?.reportedBy?.email || "N/A"}
                      </div>
                    </td>
                    <td className="border px-4 py-2">
                      <Link to={`/blog/${report?.reportedOn?._id}`}>
                        <div className="line-clamp-1 text-blue-600">
                          {report?.reportedOn?.title || "N/A"}
                        </div>
                      </Link>
                    </td>
                    <td className={`border px-4 py-2 ${getStatusColor(report?.status)}`}>{report?.status}</td>
                    <td className="border px-4 py-2 text-center">
                      <button
                        onClick={() => handleOpenPopup(report)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                      >
                        <FaEdit className="inline-block mr-2" /> Edit
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Popup for updating report status */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <UpdateReportStatus selectedReport={selectedReport} onClose={()=>setIsPopupOpen(false) } reportStatus={newStatus}/>
        </div>
      )}
    </div>
  );
}

export default ControllerDashBoard;
