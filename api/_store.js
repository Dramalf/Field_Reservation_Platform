const SLOT_PERIODS = ['10:00~12:00', '12:00~14:00', '14:00~16:00'];
const FIELD_META = [
  { code: 'xc', name: '西操场' },
  { code: 'zc', name: '中操场' },
  { code: 'dc', name: '东操场' }
];

const weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

function formatDate(date) {
  return `${date.getMonth() + 1}月${date.getDate()}日`;
}

function createInitialState() {
  const today = new Date();

  const fields = FIELD_META.map((field) => {
    const schedule = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() + i);

      return {
        id: `${field.code}-${d.toISOString().slice(0, 10)}`,
        isoDate: d.toISOString().slice(0, 10),
        day: weekDays[d.getDay()],
        date: formatDate(d),
        slots: SLOT_PERIODS.map((period, idx) => ({
          period,
          state: idx === 0 ? 'disabled' : 'available',
          details: { host: '', event: '' }
        }))
      };
    });

    return { ...field, schedule };
  });

  return { fields, notices: [] };
}

if (!global.__FIELD_RESERVATION_STATE__) {
  global.__FIELD_RESERVATION_STATE__ = createInitialState();
}

function getState() {
  return global.__FIELD_RESERVATION_STATE__;
}

module.exports = { getState };
