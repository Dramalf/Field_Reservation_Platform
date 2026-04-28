const { getStore } = require('./_store');

module.exports = (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }
  res.status(200).json(getStore());
};
