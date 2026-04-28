const { getState } = require('./_store');

module.exports = (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  const { fieldCode, isoDate, period, host, event } = req.body || {};

  if (!fieldCode || !isoDate || !period || !host || !event) {
    res.status(400).json({ message: '参数不完整，请补充场地、日期、时段、预约人、活动名称。' });
    return;
  }

  const state = getState();
  const field = state.fields.find((f) => f.code === fieldCode);
  if (!field) {
    res.status(404).json({ message: '场地不存在。' });
    return;
  }

  const day = field.schedule.find((d) => d.isoDate === isoDate);
  if (!day) {
    res.status(404).json({ message: '日期不存在。' });
    return;
  }

  const slot = day.slots.find((s) => s.period === period);
  if (!slot) {
    res.status(404).json({ message: '时段不存在。' });
    return;
  }

  if (slot.state === 'disabled') {
    res.status(409).json({ message: '该时段为教学时段，不可预约。' });
    return;
  }

  if (slot.state === 'reserved') {
    res.status(409).json({ message: `该时段已被 ${slot.details.host} 预约。` });
    return;
  }

  slot.state = 'reserved';
  slot.details = { host, event };

  state.notices.unshift({
    id: `${fieldCode}-${isoDate}-${period}`,
    message: `${host} 预约了 ${field.name} ${day.date} ${day.day} ${period}`,
    event,
    createdAt: new Date().toISOString()
  });

  state.notices = state.notices.slice(0, 20);

  res.status(200).json({ ok: true, state });
};
