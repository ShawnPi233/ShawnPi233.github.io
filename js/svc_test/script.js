// // 引入 LeanCloud SDK
// const AV = require('leancloud-storage');

// // 初始化 LeanCloud 应用
// AV.init({
//   appId: 'YOUR_APP_ID',
//   appKey: 'YOUR_APP_KEY',
// });

// // 在页面加载时，检查是否存在保存的评分数据，如果有则恢复
// window.addEventListener('load', function() {
//   const savedRatings = JSON.parse(localStorage.getItem('audioRatings'));
//   if (savedRatings) {
//     const inputs = document.querySelectorAll('input[type="range"]');
//     inputs.forEach((input, index) => {
//       input.value = savedRatings[index];
//     });
//   }
// });

// // 监听表单提交事件
// document.getElementById('audioRatingForm').addEventListener('submit', function(event) {
//   event.preventDefault(); // 阻止表单默认提交行为

//   // 获取表单中每个音频的评分
//   const ratings = [];
//   document.querySelectorAll('input[type="range"]').forEach(input => {
//     ratings.push(parseFloat(input.value));
//   });

//   // 将评分数据发送到 LeanCloud 数据库
//   const AudioRating = AV.Object.extend('AudioRating');
//   const audioRating = new AudioRating();
//   audioRating.set('ratings', ratings);

//   audioRating.save().then(() => {
//     console.log('评分已成功保存到 LeanCloud 数据库');
//     // 提交成功后清除本地保存的数据
//     localStorage.removeItem('audioRatings');
//   }).catch(error => {
//     console.error('保存评分时出错:', error);
//   });
// });

// // 监听滑块变化事件，保存评分到本地存储
// document.querySelectorAll('input[type="range"]').forEach(input => {
//   input.addEventListener('input', function() {
//     const ratings = [];
//     document.querySelectorAll('input[type="range"]').forEach(input => {
//       ratings.push(input.value);
//     });
//     localStorage.setItem('audioRatings', JSON.stringify(ratings));
//   });
// });

// 在页面加载时，恢复保存的评分数据
// 更新悬浮数值的位置和数值
function updateTooltip(input) {
  const tooltip = input.parentElement.querySelector('.tooltip');
  const rect = input.getBoundingClientRect();
  tooltip.textContent = input.value;
  tooltip.style.left = rect.left + (input.offsetWidth / 2) - (tooltip.offsetWidth / 2) + 'px';
  tooltip.style.top = rect.top - 30 + 'px'; // 调整数值的上边距
}

// 监听滑块拖动事件，更新悬浮数值
document.querySelectorAll('input[type="range"]').forEach(input => {
  input.addEventListener('input', function() {
    updateTooltip(this);
    updateScale(this);
    saveRatings();
  });
});

// 在加载时隐藏悬浮数值
window.addEventListener('load', function() {
  document.querySelectorAll('.tooltip').forEach(tooltip => {
    tooltip.classList.remove('show');
  });
});

// 当用户拖动滑块时显示悬浮数值
document.querySelectorAll('input[type="range"]').forEach(input => {
  input.addEventListener('mousedown', function() {
    const tooltip = this.parentElement.querySelector('.tooltip');
    tooltip.classList.add('show');
  });
  input.addEventListener('mouseup', function() {
    const tooltip = this.parentElement.querySelector('.tooltip');
    tooltip.classList.remove('show');
  });
});
