const FIELD_CODES = ['xc', 'zc', 'dc'];
const PERIODS = ['10:00~12:00', '12:00~14:00', '14:00~16:00'];
const WEEK = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

function computeReservationState(reservationInfo) {
  const available = reservationInfo.filter((x) => x.state === 1).length;
  const reserved = reservationInfo.filter((x) => x.state === 0).length;

  if (reserved === 0) return -1;
  if (available > 0) return 0;
  return 1;
}

function createDateInfo(fieldName, offset) {
  const d = new Date();
  d.setDate(d.getDate() + offset);

  const reservationInfo = PERIODS.map((period, i) => ({
    period,
    state: i === 0 ? -1 : 1,
    details: { host: '', userid: '', event: '' }
  }));

  return {
    id: d.getDate(),
    day: WEEK[d.getDay()],
    fieldName,
    isoDate: d.toISOString().slice(0, 10),
    reservationState: computeReservationState(reservationInfo),
    reservationInfo
  };
}

function createInitialStore() {
  const fields = {};
  FIELD_CODES.forEach((field) => {
    fields[field] = Array.from({ length: 7 }).map((_, i) => createDateInfo(field, i));
  });

  return {
    fields,
    notice: []
  };
}

if (!global.__FIELD_RESERVATION_STORE__) {
  global.__FIELD_RESERVATION_STORE__ = createInitialStore();
}

function getStore() {
  return global.__FIELD_RESERVATION_STORE__;
}

module.exports = { getStore, computeReservationState };
