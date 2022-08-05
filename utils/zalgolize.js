let souls = [
 // Highs
  [
    '̍', '̎', '̄', '̅', '̿', '̑', '̆', '̐', '͒',  '͗',
    '͑',  '̇', '̈', '̊', '͂',  '̓', '̈', '͊',  '͋',  '͌',
    '̃', '̂', '̌', '͐',  '̀', '́', '̋', '̏', '̒', '̓',
    '̔', '̽', '̉', 'ͣ',  'ͤ',  'ͥ',  'ͦ',  'ͧ',  'ͨ',  'ͩ',
    'ͪ',  'ͫ',  'ͬ',  'ͭ',  'ͮ',  'ͯ',  '̾', '͛',  '͆',  '̚'
  ],
  // Mids
  [
    '̕', '̛', '̀', '́', '͘', '̡', '̢', '̧', '̨', '̴', '̵',
    '̶', '͜',  '͝',  '͞',  '͟',  '͠',  '͢',  '̸', '̷', '͡', '҉'
  ],
  // Lows
  [
    '̖', '̗', '̘', '̙', '̜', '̝', '̞', '̟', '̠', '̤',
    '̥', '̦', '̩', '̪', '̫', '̬', '̭', '̮', '̯', '̰',
    '̱', '̲', '̳', '̹', '̺', '̻', '̼', 'ͅ',  '͇',  '͈',
    '͉',  '͍',  '͎',  '͓',  '͔',  '͕',  '͖',  '͙',  '͚',  '̣'
  ]
];
module.exports = (string) => {
  let res = '';
  for (let i = 0; i < string.length; i += 1) {
    res += string[i];
    for (let k = 0; k < Math.floor(Math.random() * (souls.length + 1)); k += 1) {
      res += souls[Math.floor(Math.random() * souls.length)][Math.floor(Math.random() * souls.length)];
    }
  }
  return res;
};