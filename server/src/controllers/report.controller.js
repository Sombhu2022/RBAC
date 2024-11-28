import { Reports } from "../models/report.model.js";


export const addNewReport = async (req, res) => {
    const { reportType, description, reportedOn } = req.body;
    const { id } = req.user
    if (!reportType || !reportedOn) {
        return res.status(400).json({ message: 'Missing required fields.' });
    }

    try {
        const report = await Reports.create({
            reportType,
            description,
            reportedBy: id,
            reportedOn,
        });

        return res.status(201).json({ message: 'Report submitted successfully!', data: report });
    } catch (error) {
        console.error('Error creating report:', error);
        return res.status(500).json({ message: 'Failed to submit report.' });
    }
}


// fetch all reports 

export const fetchAllReport = async (req, res) => {
    try {
        // Fetch all reports from the database
        const reports = await Reports.find({})
            .populate('reportedOn', 'title  content')  // Populate related blog details
            .populate('reportedBy', 'name email')  // Populate user details
            .sort({ createdAt: -1 });  // Sort reports by creation date, latest first

        console.log(reports);


        // If no reports found
        if (!reports || reports.length === 0) {
            return res.status(404).json({ message: 'No reports found' });
        }

        // Send back the reports in the response
        return res.status(200).json({ message: 'fetch all report success', data: reports });

    } catch (error) {
        console.error('Error fetching reports:', error);
        return res.status(500).json({ message: 'Server error while fetching reports' });
    }
};

// change report status , 

export const updateReportStatus = async (req, res) => {

    const { status, resolutionNotes } = req.body;  // Get the report ID and the new status from the request body
    const { reportId } = req.params;
    const { id } = req.user;

    try {
        // Validate the status value
        if (!['Pending', 'Reviewed', 'Resolved', 'Dismissed'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status value' });
        }

        // Find the report by ID and update its status
        const report = await Reports.findByIdAndUpdate(
            { _id: reportId },
            { $set: { status, resolutionNotes, resolvedBy: id } },  // Set the new status
            { new: true }  // Return the updated report
        )
            .populate('reportedOn', 'title  content')  // Populate related blog details
            .populate('reportedBy', 'name email')  // Populate user details
            .sort({ createdAt: -1 });  // Sort reports by creation date, latest first

        // If no report is found
        if (!report) {
            return res.status(404).json({ message: 'Report not found' });
        }

        // Return the updated report
        return res.status(200).json({ message: 'status update success', data: report });
    } catch (error) {
        console.error('Error updating report status:', error);
        return res.status(500).json({ message: 'Server error while updating report status' });
    }

}