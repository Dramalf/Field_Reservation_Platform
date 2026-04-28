module.exports = (req, res) => {
  res.status(410).json({ message: '请改用 /api/reservation' });
};
