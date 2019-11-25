console.log('checkSystemRequirements');
console.log(JSON.stringify(ZoomMtg.checkSystemRequirements()));

// it's option if you want to change the jssdk dependency link resources.
// ZoomMtg.setZoomJSLib('https://source.zoom.us/1.6.1/lib', '/av'); // CDN version default
// ZoomMtg.setZoomJSLib('https://jssdk.zoomus.cn/1.6.1/lib', '/av'); // china cdn option
// ZoomMtg.setZoomJSLib('http://localhost:9999/node_modules/zoomus-jssdk/dist/lib', '/av'); // Local version defaultZoomMtg.preLoadWasm();
ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();


const API_KEY = '';

/**
 * NEVER PUT YOUR ACTUAL API SECRET IN CLIENT SIDE CODE, THIS IS JUST FOR QUICK PROTOTYPING
 * The below generateSignature should be done server side as not to expose your api secret in public
 * You can find an eaxmple in here: https://marketplace.zoom.us/docs/sdk/native-sdks/Web-Client-SDK/tutorial/generate-signature
 */
const API_SECRET = '';

document.getElementById('join_meeting').addEventListener('click', (e) => {
  e.preventDefault();

  const meetConfig = {
    apiKey: API_KEY,
    apiSecret: API_SECRET,
    meetingNumber: parseInt(document.getElementById('meeting_number').value, 10),
    userName: document.getElementById('display_name').value,
    passWord: '',
    leaveUrl: 'https://zoom.us',
    role: 1
  };

  ZoomMtg.generateSignature({
    meetingNumber: meetConfig.meetingNumber,
    apiKey: meetConfig.apiKey,
    apiSecret: meetConfig.apiSecret,
    role: meetConfig.role,
    success(res) {
      console.log('signature', res.result);
      ZoomMtg.init({
        leaveUrl: 'http://www.zoom.us',
        success() {
          ZoomMtg.join({
            meetingNumber: meetConfig.meetingNumber,
            userName: meetConfig.userName,
            signature: res.result,
            apiKey: meetConfig.apiKey,
            userEmail: 'email@gmail.com',
            passWord: meetConfig.passWord,
            success() {
              $('#nav-tool').hide();
              console.log('join meeting success');
            },
            error(res) {
              console.log(res);
            }
          });
        },
        error(res) {
          console.log(res);
        }
      });
    }
  });
})
