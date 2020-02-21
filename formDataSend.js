
const FormData = require('form-data');
const fs = require('fs');
const axios = require('axios');

/** define config variable  */
const uploadFilePath = 'jest.config.js';
const uploadUrl = 'http://localhost/upload';


// const uploadUrl = `http://106.10.51.104:9428/upload/`;
/** Upload Stream Settings */
const stream = fs.createReadStream(uploadFilePath);

/** Form Settings  */
const form = new FormData();
form.append('dump',stream);
const formHeaders = form.getHeaders();

/** Multi-part Form-Data upload */
axios.post(uploadUrl,form,{
  headers:{
    ...formHeaders
  }  
})
.then(res=>console.log(res))
.catch(err=>console.error(err));

