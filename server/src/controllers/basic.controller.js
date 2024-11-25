

export const fetchData = async(req , res) =>{
    return res.status(200).json({
        message: "Data fetch successful",
        data: [{ name: "Sombhu Das" }, { name: "Pritam Paul" }],
        success: true,
      });
}