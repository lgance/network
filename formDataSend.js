
const FormData = require('form-data');
const fs = require('fs');
const axios = require('axios');

/** define config variable  */
const uploadFilePath = 'test-png.png';
const uploadUrl = 'http://127.0.0.1/upload';


(async ()=>{
  sendReport(uploadUrl,uploadFilePath);
})();

function sendReport(uploadUrl,uploadFilePath){
    const stream = fs.createReadStream(uploadFilePath);
    const form = new FormData();

    form.append('dump',stream);

    
    axios.post(uploadUrl,form,{
      headers:form.getHeaders(),
      // timeout:9000
    })
    .then(res=>console.log(`완료 ${res.data}`))
    .catch(err=>{
      console.log('에러');
      console.log(err.message);
    })
       
}


