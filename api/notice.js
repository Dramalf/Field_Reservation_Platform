const { getStore } = require('./_store');

module.exports = (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  const fieldName = req.query.fieldName || 'xc';
  const store = getStore();
  const dateInfo = store.fields[fieldName] || store.fields.xc;
  res.status(200).json({ dateInfo, notice: store.notice });
};
