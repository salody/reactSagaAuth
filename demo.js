/**
 * 功能描述:
 * @author: liuguanbang
 * 2017/10/10
 */

const fs = require('fs');
const request = require('request');
md5 = require('js-md5');
const originFile = '/Users/liuguanbang/work/yuanxin/APP/new/MobileApp46/src/Page/MeetingRoom/MeetingOrderPage.js';

fs.readFile(originFile, 'utf8', (err, data) => {
  let strArr = data.match(/'[\u4e00-\u9fa5]+'/g);
  // '[\u4e00-\u9fa5]+'|>\s+[\u4e00-\u9fa5]
  let newObj={};
  strArr.forEach((str) => {
    let transText = str.slice(1, str.length-1);
    console.log(transText);
    request.post({url:'http://openapi.youdao.com/api', form: {
      q: transText,
      from: 'zh-CHS',
      to: 'EN',
      appKey: '0719be2405162034',
      salt: '2773648',
      sign: md5('0719be2405162034' + transText + '2773648' + 'lcozOV3wVg9ZhqeMa9rzgdcrJ1Kerr9N')
    }}, function(err,httpResponse,body){
      body = JSON.parse(body);
      //newObj[transText] = body.translation[0];
      newObj[body.translation[0]] =transText ;
    })
  });

  setTimeout(() => {
    console.log(newObj);
  }, 5000)

});
