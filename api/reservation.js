const { getStore, computeReservationState } = require('./_store');

module.exports = (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  const { period, event, host, dateid, chosedField, day } = req.body || {};
  if (!period || !event || !host || !dateid || !chosedField) {
    res.status(400).json({ errMsg: '参数不完整' });
    return;
  }

  const store = getStore();
  const dateInfo = store.fields[chosedField] || [];
  let errMsg = '';

  dateInfo.forEach((item) => {
    if (String(item.id) !== String(dateid)) return;

    item.reservationInfo.forEach((rezObj) => {
      if (rezObj.period !== period) return;

      if (rezObj.state === 0) {
        errMsg = `该时段已被${rezObj.details.host}预定，请勿重复预定`;
        return;
      }

      if (rezObj.state === -1) {
        errMsg = '教学时间不可预约';
        return;
      }

      rezObj.state = 0;
      rezObj.details.host = host;
      rezObj.details.event = event;

      store.notice.unshift({
        msg: `${host} 预定了 ${chosedField === 'xc' ? '西操' : chosedField === 'zc' ? '中操' : '东操'} ${dateid}号${day}${period}场次`,
        event
      });
      store.notice = store.notice.slice(0, 50);
    });

    item.reservationState = computeReservationState(item.reservationInfo);
  });

  res.status(200).json({ dateInfo, cf: chosedField, errMsg });
};
