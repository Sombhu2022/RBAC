import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addNewReport } from "../../store/report/reportController";
import { resetReportState } from "../../store/report/reportSlice";

const AddReport = ({ blogId, userId, onClose }) => {
  const [reportType, setReportType] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const { loading, status, message, report } = useSelector(
    (state) => state.report
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!reportType) {
      toast.error("Please select a report type.");
      return;
    }
      dispatch(addNewReport({ reportType, description, reportedOn: blogId }));
  };


  useEffect(()=>{
     if(status.addNewReport === 'success'){
        toast.success(message)
        onClose()
     } else if(status.addNewReport === 'rejected'){
        toast.error(message)
     }

     return ()=>{
        dispatch(resetReportState())
     }
  }, [status , message])

  return (
    <div className="bg-white  p-6 rounded-md shadow-md md:min-w-[700px] sm:min-w-[500px]">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Report Blog</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="reportType"
            className="block text-sm font-medium text-gray-700 mb-4"
          >
            Report Type
          </label>
          <select
            id="reportType"
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="custom_input"
          >
            <option value="">Select a report type</option>
            <option value="Spam">Spam</option>
            <option value="Sexual Content">Sexual Content</option>
            <option value="Harassment">Harassment</option>
            <option value="Hate Speech">Hate Speech</option>
            <option value="Misinformation">Misinformation</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-4"
          >
            Description (optional)
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Provide additional details (optional)"
            className="custom_input"
          />
        </div>
        <div className="flex justify-end items-center gap-4">
          <button
            type="submit"
            className="custom_button"
            disabled={loading.addNewReportLoading}
          >
            {loading.addNewReportLoading ? "Submitting..." : "Submit Report"}
          </button>

          <button
            type="button"
            className=" bg-gray-500 hover:bg-gray-600 w-full p-3 rounded-md text-white "
            onClick={onClose}
          >
            close
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddReport;
