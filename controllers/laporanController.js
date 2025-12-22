// backend/controller/laporanController.js

export const downloadLaporanExcel = async (req, res) => {
  return res.status(501).json({
    message: "Fitur laporan Excel belum diaktifkan",
  });
};

export const downloadLaporanPDF = async (req, res) => {
  return res.status(501).json({
    message: "Fitur laporan PDF belum diaktifkan",
  });
};
