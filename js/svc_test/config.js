// config.js
function uuid() {
    var temp_url = URL.createObjectURL(new Blob());
    var uuid = temp_url.toString(); 
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

var APP_ID = 'CeUVLldlJLanFDEVJFzbJCY9-MdYXbMMI';
var APP_KEY = 'YP7zqvfaSmXiZSGIGzOF79Gl';
AV.init({
  appId: APP_ID,
  appKey: APP_KEY,
  serverURLs: 'https://ceuvlldl.api.lncldglobal.com'
  // serverURLs: 'https://cn1-api.leancloud.cn' //国内版，华北节点
});

// 获取html表单元素
var form = document.getElementById('my-form');
var score_array = [];
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
    temp = checkinputValue('score_', i);
    score_array.push(temp);
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