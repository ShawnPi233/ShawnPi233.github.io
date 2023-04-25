// config.js
function uuid() {
    var temp_url = URL.createObjectURL(new Blob());
    var uuid = temp_url.toString(); // blob:https://xxx.com/b250d159-e1b6-4a87-9002-885d90033be3
    URL.revokeObjectURL(temp_url);
    return uuid.substr(uuid.lastIndexOf("/") + 1);
  }
  function checkRadioValue(name, i) {
  // 获取单选框的值
  var checked = document.querySelector(`input[name='${name}_${i}']:checked`);
  var value = checked ? checked.value : "";
  // 判断单选框的值是否为空
  if (value == "") {
    var dict = {is_generated: "Q1", music_class: "Q2", harmony_score: "Q3", creative_score: "Q4", music_score: "Q5"};
    // 弹出一个警告框，提示用户重新输入
    question = dict[name]
    alert(`第${i}个音乐片段的${question}问题未填写，请重新填写！`);
    // 返回空值
    return "";
  } else {
    // 单选框的值不为空，返回该值
    return value;
  }
}

// 初始化leancloud的应用ID和应用Key
// var APP_ID = 'bW7ca26Fgl1LvXlJpBq0w9uG-MdYXbMMI'; //国际版
// var APP_KEY = 'U85ANTgGGYMiLY7tUHYWPGkN';

// var APP_ID = 'xBfywiBcWnaBX5res3WKixrN-gzGzoHsz';
// var APP_KEY = 'V1kk03BwJEHc3dLLYtKqCvnN';
AV.init({
  appId: APP_ID,
  appKey: APP_KEY,
  serverURLs: 'https://xbfywibc.lc-cn-n1-shared.com'
  // serverURLs: 'https://cn1-api.leancloud.cn' //国内版，华北节点
});

// 获取html表单元素
var form = document.getElementById('my-form');
// function getIPFromAmazon () {
//   return fetch ("https://checkip.amazonaws.com/")
//   .then (res => res.text ())
//   .then (data => data)
// }
// var ip = "";
// var $ = require('jquery');
// ip = VIH_DisplayFormat?VIH_DisplayFormat:"";

// $.get ('https://yacdn.org/proxy/http://www.hashemian.com/js/visitorIP.js.php', function (data) {
//   console.log (data); 
//   ip = data;
// });
// $.get ('http://www.hashemian.com/js/visitorIP.js.php', function (data) {
//   console.log (data); 
//   ip = data;
// });
// var uip = getIPFromAmazon()
// .then (uip => {
//   console.log (uip);
//   //只能在这里调用uip
//   ip = uip;
// })

var content = "";
// 监听表单的提交事件
var startTime = new Date();
var uid = uuid();
form.addEventListener('submit', function(event) {
  // 阻止表单的默认提交行为
  event.preventDefault();
  var endTime = new Date();
  // 获取填写表单的时间（s）
  var timeSpent = (endTime - startTime) / 1000;
  for (var i = 1;i <= 7; i++){
    var A1 = checkRadioValue('is_generated', i);
    var A2 = checkRadioValue('music_class', i);
    var A3 = checkRadioValue('harmony_score', i);
    var A4 = checkRadioValue('creative_score', i);
    content = content + 'music_' + i + '=Q1:'+ A1 +',' + 'Q2:'+ A2 +','+ 'Q3:'+ A3 +',' + 'Q4:'+ A4 +';';
  }
  for (var i = 1;i <= 4; i++){
    var A1 = checkRadioValue('is_generated', i + 'a');
    var A2 = checkRadioValue('music_class', i + 'a');
    var A3 = checkRadioValue('harmony_score', i + 'a');
    var A4 = checkRadioValue('creative_score', i + 'a');
    
    
    var B1 = checkRadioValue('is_generated', i + 'b');
    var B2 = checkRadioValue('music_class', i + 'b');
    var B3 = checkRadioValue('harmony_score', i + 'b');
    var B4 = checkRadioValue('creative_score', i + 'b');
    var B5 = checkRadioValue('music_score', i + 'b');

    if (B5 == 'B'){
        A5 = 0;
        B5 = 1;
    }
    else{
        A5 = 1;
        B5 = 0;
    }
    content = content + 'music_' + i + 'a' + '=Q1:'+ A1 +',' + 'Q2:'+ A2 +','+ 'Q3:'+ A3 +',' + 'Q4:'+ A4 + ',' + 'Q5:'+ A5 +';';
    content = content + 'music_' + i + 'b' + '=Q1:'+ B1 +',' + 'Q2:'+ B2 +','+ 'Q3:'+ B3 +',' + 'Q4:'+ B4 + ',' + 'Q5:'+ B5 +';';
  }
  // 创建一个leancloud的对象类，用于存储表单信息
  var FormInfo = AV.Object.extend('form_data'); //这里form_data即我们创建好的class的类名，主要大小写也要一致

  // 创建一个FormInfo的实例
  var formInfo = new FormInfo();
  var submitButton = document.getElementById("my_submit");

  var checked = document.querySelector("input[name='level']:checked");
  var level = checked ? checked.value : "";
  if (level == ''){
     alert("请填写您的身份！")
  }
  var uname = document.getElementById("uname").value;
  var email = document.getElementById("email").value;
  // 设置实例的属性值
  formInfo.set('result', content);
  formInfo.set('uid', uid);
  formInfo.set('level', level);
  formInfo.set('spendTime', timeSpent)
  if(uname){
    formInfo.set('uname', uname);
  }
  if(email){
    formInfo.set('email', email);
  }
  // 将实例保存到leancloud的后端服务中
  formInfo.save().then(function (formInfo) {
    submitButton.disabled = true;
    // 成功保存后，打印日志并显示提示信息
    console.log('保存成功，表单信息为' + formInfo.result);
    alert('提交成功，感谢您的反馈！');
  }, function (error) {
    // 失败保存后，打印错误信息并显示提示信息
    console.error(error);
    alert('提交失败，可能您当前网络较差，请稍后重试！');
  });
});