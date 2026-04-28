module.exports = (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  const { userid, username } = req.body || {};
  if (!userid || !username) {
    res.status(400).json({ ret_code: 1, ret_msg: '请输入学号和姓名' });
    return;
  }

  res.status(200).json({
    ret_code: 0,
    ret_msg: '登陆成功',
    host: '计算机科学与技术学院',
    userid,
    username
  });
};
