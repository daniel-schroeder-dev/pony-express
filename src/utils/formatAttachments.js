const formatAttachments = files => {
  if (!files) return [];
  return files.map(file => (
    {
      path: `/uploads/${file.filename}`,
      originalName: file.originalname,
      size: file.size,
    }
  ));
};

module.exports = formatAttachments;
