import '@userCSS/tqm-test-module.css'
import '@userCSS/main/main.css'

// https://tc39.github.io/ecma262/#sec-array.prototype.includes
if (!Array.prototype.includes) {
  Object.defineProperty(Array.prototype, 'includes', {
    value: function(searchElement, fromIndex) {

      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      // 1. Let O be ? ToObject(this value).
      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If len is 0, return false.
      if (len === 0) {
        return false;
      }

      // 4. Let n be ? ToInteger(fromIndex).
      //    (If fromIndex is undefined, this step produces the value 0.)
      var n = fromIndex | 0;

      // 5. If n ≥ 0, then
      //  a. Let k be n.
      // 6. Else n < 0,
      //  a. Let k be len + n.
      //  b. If k < 0, let k be 0.
      var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

      function sameValueZero(x, y) {
        return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
      }

      // 7. Repeat, while k < len
      while (k < len) {
        // a. Let elementK be the result of ? Get(O, ! ToString(k)).
        // b. If SameValueZero(searchElement, elementK) is true, return true.
        if (sameValueZero(o[k], searchElement)) {
          return true;
        }
        // c. Increase k by 1. 
        k++;
      }

      // 8. Return false
      return false;
    }
  });
}


var Ajax = function(){
    function Ajax(){}
    Ajax.call = function(url,settings){
        if(typeof url ==='object'&& typeof settings==='undefined'){
            var settings = url;
            url = settings.url;
        }
        var type = settings.type ? settings.type :'get';
        var async = settings.async !==undefined ? settings.async : true;
        var responseType = settings.dataType !==undefined ? settings.dataType :"";
        var _success = settings.success;
        var _error = settings.error;
        var _complete = settings.complete;
        if(type.toLowerCase()==='get' && settings.data){
            url += Ajax.toQueryString(settings.data);
        }
        var xhr = new XMLHttpRequest;
        xhr.open(type,url,async);
        if(async)
            xhr.responseType = responseType;
        xhr.onload = function(){
	    if(xhr.status ===200){
                if(typeof _success ==='function'){
                    _success(xhr.response,xhr.status,xhr);
                }
            } 
	    
            else{
                    _error(xhr.response,xhr.status,xhr);
            } 
            if(typeof _complete ==='function'){
                _complete(xhr.response,xhr.status,xhr);
            } 
        } 
        xhr.send();
    }

    Ajax.toQueryString = function(data){
        if(typeof data==='string'){
            return "?" + data;
        }
        else if(typeof data==='object'){
     
        }
    }
    return Ajax
}();




var Browser = function(){
    'use strict'
    function Browser(){}

    Browser.IS_IE  =  navigator.userAgent.indexOf('MSIE') >= 0;
    Browser.IS_IE6 = navigator.userAgent.indexOf('MSIE 6') >= 0;
    Browser.IS_IE11 = !!navigator.userAgent.match(/Trident\/7\./);
    Browser.IS_EDGE = !!navigator.userAgent.match(/Edge\//);
    Browser.IS_CHROME = !!navigator.userAgent.match(/chrome/i);
    Browser.IS_SAFARI =!!navigator.userAgent.match(/macintosh/i);
    Browser.IS_MOBILE  = (!!navigator.userAgent.match('CriOS') || navigator.userAgent.match(/mobile/i));
    Browser.IS_IPHONE  = !!navigator.userAgent.match(/iPad|iPhone|iPod/i);


    Browser.getBrowser = function(){
      /* Chrome 크롬 */
      return !!navigator.userAgent.match(/chrome/i) ? 'chrome' :
      /*  모바일 */
         (!!navigator.userAgent.match('CriOS') || navigator.userAgent.match(/mobile/i)) ? 'mobile' :
      /* 사파리 */
         !!navigator.userAgent.match(/macintosh/i) ? 'safari' :
      /* 아이패드 아이팟 아이폰 */
         !!navigator.userAgent.match(/iPad|iPhone|iPod/i) ? 'iPhone' :
      /* IE 11 */
         !!navigator.userAgent.match(/Trident\/7\./) ? 'IE11' :
      /* Edge */
         !!navigator.userAgent.match(/Edge\//) ? 'Edge':
      /* IE 10 <= */
         navigator.userAgent.indexOf('MSIE') >= 0 ? 'IE' :
      /* Unknown */
         'unknown';
    }

    return Browser
}();




let tempObj = {
   "sample":"실패하는 개수를 확인합니다."
};
function setErrorCount(url){
	tempObj[url] = typeof tempObj[url]==="undefined" ? 1 : tempObj[url]+1;
	document.querySelector(".testDump").value="";
	document.querySelector(".testDump").value=getStr();
}

var getStr = () =>{
   let tempKeys = Object.keys(tempObj);
   let returnStr = tempKeys.reduce((prev,curr,index,arr)=>{
        prev = prev + curr + " : " + tempObj[curr] + "\r\n";
        return prev;
   },"");

   return returnStr;
}

setTimeout(()=>{
     document.querySelector(".testDump").value = getStr();
},1000);



/* Task Module  Check  */
Task = (function(){

    /* use Interval Variable */
    let vpcTimer;
    let firstStart = 10000;
    

    /* Temporary Variable to do remove variable  */

    let colCnt ;

    /* let serverUrl = document.querySelector(".taskInfos header .taskInfos__title--server").textContent; */
    let serverUrl = document.getElementById("server_addr").textContent;
    /* const baseUrl = `http://${serverUrl}:9428/`; */
    const baseUrl = 'http://'+serverUrl+':9428/';

   /* TestCase Total 31 */
   var sampleListObj = {
    "kr2/basic/comm":{},
    "kr2/basic/comm/ruleviolation":{},
    "kr2/basic/comm/publicIp":{},
    "kr2/basic/comm/publicIp/udp":{},
    "kr2/basic/comm/internet":{},
    "kr2/basic/comm/internet/udp":{},
    "kr2/private_subnet/comm":{},
    "kr2/internet_to_private/comm":{},
    "kr2/internet_to_public/comm":{},
    "kr2/natgw/external/comm":{},
    "kr1/basic/comm":{},
    "kr1/basic/comm/ruleviolation":{},
    "kr1/basic/comm/publicIp":{},
    "kr1/basic/comm/publicIp/udp":{},
    "kr1/private_subnet/comm":{},
    "kr1/internet_to_private/comm":{},
    "kr1/internet_to_public/comm":{},
    "kr1/basic/comm/internet":{},
    "kr1/basic/comm/internet/udp":{},
    "kr1/natgw/external/comm":{}

   }
  
    let taskButtonList = [];
    Task.allTestStart = function(){
	taskButtonList.forEach(function(item,index){
		item.click();
  	});
    };
    function Task(){}

    /* task Module Internal Function  */
    function createRow(obj,index){

        let tc = obj && obj.tc ? obj.tc : (obj ? obj : false);
        if(!tc) return;
        if(typeof index!== "number") return false;
        const taskInfoRow = document.createElement('div');
        taskInfoRow.className='taskInfos__row';
        
        /* Row Index */
        const taskInfoRowCol_1 = document.createElement('div');
        taskInfoRowCol_1.className ='taskInfos__row--col-1';
        taskInfoRowCol_1.textContent = index;
        taskInfoRowCol_1.style.width = "5%";
    
        /* TestCase  */
        const taskInfoRowCol_2 = document.createElement('div');
        taskInfoRowCol_2.className ='taskInfos__row--col-2';
        taskInfoRowCol_2.textContent = tc;
        taskInfoRowCol_2.style.width = "30%";
    
        const taskInfoRowCol_3 = document.createElement('div');
        taskInfoRowCol_3.className ='taskInfos__row--col-3';
        taskInfoRowCol_3.textContent = "Ready";
        taskInfoRowCol_3.style.width ="10%"
    
        /* Comment if Empty Input Not Comment */
        const taskInfoRowCol_4 = document.createElement('div');
        taskInfoRowCol_4.className ='taskInfos__row--col-4';
        taskInfoRowCol_4.textContent = typeof obj.comment ==="undefined" ? "empty"
                                        :obj.comment;
        taskInfoRowCol_4.style.width ="15%"
    
        /* TBD Button Component */                                    
        const taskInfoRowCol_btn = document.createElement('div');
        taskInfoRowCol_btn.className ='taskInfos__row--col-button';
        taskInfoRowCol_btn.textContent = "Button Component";
        taskInfoRowCol_btn.style.width ="10%";
    
        /* Detail View  */
        const taskInfoRowCol_detail = document.createElement('div');
        taskInfoRowCol_detail.className="taskInfos__row--col-detail";
        taskInfoRowCol_detail.textContent="View Detail";
        taskInfoRowCol_detail.style.width="10%";

        taskInfoRow.appendChild(taskInfoRowCol_1);
        taskInfoRow.appendChild(taskInfoRowCol_2);
        taskInfoRow.appendChild(taskInfoRowCol_3);
        taskInfoRow.appendChild(taskInfoRowCol_4);
        taskInfoRow.appendChild(taskInfoRowCol_btn);
        taskInfoRow.appendChild(taskInfoRowCol_detail);
    
        return taskInfoRow;
    }


    function vpcStatus(){
        let taskButton = document.querySelectorAll(".taskInfos__row--col-button");
        taskButton.forEach(function(item,index){
                item.click();
        });
       
    }

/*
 ** @description tqm-module 
 *  usage param create Task Info 
 * {
 *     tc:"TestCase API "
 * }
 ** 
 ** 
 **/
    Task.createTaskInfo = function(item){
        if(!item){
            console.log('item 이 없습니다. item 을 임시 로 대체합니다.');

            item = Object.keys(sampleListObj);
            console.log('대체된 item ');
            console.warn(item);
        }
 /**
 ** <section class="taskInfos">
 ** 
 ** </section>
 **/
        const taskInfoSection = document.createElement('section');
        taskInfoSection.className = 'taskInfos';

        /* Create Header */
        const taskHeader = document.createElement('header');
        let taskHeaderTitle = document.createElement('div');
        taskHeaderTitle.className="taskInfos__title";
        taskHeaderTitle.textContent="TASK INFOS";

        let taskHeaderInputServer = document.createElement('div');
        taskHeaderInputServer.className="taskInfos__title--server";
        /* Temporary Way  */
        taskHeaderInputServer.textContent =  serverUrl
        

        let taskheaderRightMenu = document.createElement('div');
        taskheaderRightMenu.className = "taskInfos__rightmenu";
        
        let taskHeaderRightMenuCheckBox= document.createElement('input');
        taskHeaderRightMenuCheckBox.className="qa-checkbox";
        taskHeaderRightMenuCheckBox.type="checkbox";

        let taskHeaderRightMenuSwitch  = document.createElement('label');
        taskHeaderRightMenuSwitch.className="qa-switch";

        taskHeaderRightMenuSwitch.addEventListener('click',function(e){
            let _input = e.target.previousElementSibling;
            _input.checked = !_input.checked
            if(!!_input.checked){
                
                vpcStatus();
            }
            else{
                clearInterval(vpcTimer);
            }
        })
        taskheaderRightMenu.appendChild(taskHeaderRightMenuCheckBox);
        taskheaderRightMenu.appendChild(taskHeaderRightMenuSwitch);

        taskHeader.appendChild(taskHeaderTitle);
        taskHeader.appendChild(taskHeaderInputServer);
        taskHeader.appendChild(taskheaderRightMenu);

        taskInfoSection.appendChild(taskHeader);

        /* Create TaskInfos Seperator */
        const _sep = document.createElement('div');
        _sep.className="taskInfos__item--separator";

        taskInfoSection.appendChild(_sep);

        /* Create Body  */
        const taskInfoBody = document.createElement('div');
        taskInfoBody.className = 'taskInfos__body';

        /* Create Row */
        item.forEach(function(item,index){
            const row = createRow(item,(index+1));
            taskInfoBody.appendChild(row);
        });
        taskInfoBody.addEventListener('click',function(e){
            if(!!e.target.classList.contains('taskInfos__row--col-button')){
                const rowIndex = parseInt(e.target.parentElement.firstChild.textContent);
                const testCase = e.target.parentElement.parentElement.children[rowIndex-1].children[1].textContent;
    
                const serverURL = baseUrl+testCase;
    
                console.log(serverURL);
    
                const testStateEle = e.target.parentElement.parentElement.children[rowIndex-1].children[2];
                testStateEle.textContent="Start";
    
    
                testStateEle.classList.remove('complete');
                testStateEle.classList.add("start");
    
                const testResultEle = e.target.parentElement.parentElement.children[rowIndex-1].children[3];
                testResultEle.textContent="Wait";
                testResultEle.classList.remove('pass');
                testResultEle.classList.remove('fail');
    
                Ajax.call({
                    url:serverURL,
                    type:'get',
                    success:function(data,textStatus,jqxhr){
              try{
                              console.log(data);
                              console.log(e);
    
                            var resData = JSON.parse(data);
                            const testStateEle = e.target.parentElement.parentElement.children[rowIndex-1].children[2];
                            const testResultEle = e.target.parentElement.parentElement.children[rowIndex-1].children[3];
                            testStateEle.textContent = "Complete";
                            testStateEle.classList.add("complete");
                            testStateEle.classList.remove('start');
                            
                            sampleListObj[testCase].origin = data;
                            sampleListObj[testCase].response = resData;
                        
                            if(resData.result==="pass"){  
                                testResultEle.classList.add('pass');
                                testResultEle.textContent= resData.result;
                            }
                            else{/* (resData.result==="fail"){  */
                                testResultEle.classList.add('fail');
                                testResultEle.textContent="fail";
                            }
                            
              }
              catch(err){
                            const testStateEle = e.target.parentElement.parentElement.children[rowIndex-1].children[2];
                            const testResultEle = e.target.parentElement.parentElement.children[rowIndex-1].children[3];
                            testStateEle.textContent = "Complete";
                            testStateEle.classList.add("complete");
                          
                            testStateEle.classList.remove('start');
                            testResultEle.textContent= "fail";
                            console.error(err);


                            
                            sampleListObj[testCase].origin = err;
                            sampleListObj[testCase].response = 'Code Error';
    
                            testResultEle.classList.add('fail');
                
              }
                    },
                    error:function(data,textStatus,jqxhr){
               try{
                            const testStateEle = e.target.parentElement.parentElement.children[rowIndex-1].children[2];
                            const testResultEle = e.target.parentElement.parentElement.children[rowIndex-1].children[3];
                            var resData = JSON.parse(data);
    
                            testStateEle.textContent = "Complete";
                            
                            testStateEle.classList.remove('start');
                            testResultEle.textContent= resData.result;
                            testResultEle.classList.add('fail');


                            
                            sampleListObj[testCase].origin = data;
                            sampleListObj[testCase].response = resData;
              }
              catch(err){
                            const testStateEle = e.target.parentElement.parentElement.children[rowIndex-1].children[2];
                            const testResultEle = e.target.parentElement.parentElement.children[rowIndex-1].children[3];
    
                            testStateEle.textContent = "Complete";
                            console.error(data);
                            testStateEle.classList.remove('start');
                            testResultEle.textContent= "fail"; 
                            testResultEle.classList.add('fail');

                            
                            sampleListObj[testCase].origin = err;
                            sampleListObj[testCase].response = 'Code Error';
              }
                    }
                })
    
            }
            /* View Detail */
            else if(!!e.target.classList.contains('taskInfos__row--col-detail')){
                console.log('View Select');
                const rowIndex = parseInt(e.target.parentElement.firstChild.textContent);
                const testCase = e.target.parentElement.parentElement.children[rowIndex-1].children[1].textContent;
                const arr = sampleListObj[testCase];




                console.log(arr);

                
            }
        });
        taskInfoSection.appendChild(taskInfoBody);

        return taskInfoSection
    }

    Task.createDialog = function(){
        const dialogBody = document.createElement('div');
        dialogBody.className="taskDialog__body";
        return dialogBody;
    }

/**
 ** @description
 ** create for Task Table with testCase ( js Object ) 
 ** @param {*} item 
 ** @returns HTMLElement( <div class="task__status"> anithing table tag   </div>)
 ** 
 ** 
 ** 
 *   <div class="task__status"></div>
 *   <section class="taskInfos">
 *     <header>
 *       <div class="taskInfos__title">TASK INFOS</div>
 *       <div class="taskInfos__title--server"></div>
 *       <div class="taskInfos__rightmenu">
 *          <input type="checkbox"  class="qa-checkbox" />
 *          <label class="qa-switch"></label>
 *       </div>
 *    </header>
 *   
 *  <div class="taskInfos__item--separator"></div>
 *     <div class="taskInfos__body"> 
 *  </div>
 *   </section> 
 * </div>
 **/

    Task.createTaskTable = function(item){
        if(!item){
            console.log('item 이 없습니다. item 을 임시 로 대체합니다.');
            /* item = sampleList; */
            item = Object.keys(sampleListObj);
            console.log('대체된 item ');
            console.warn(item);
        }

        const tableEle = document.createElement('table');
        tableEle.className = 'task__table';

/* 
 *    col Group  
 *    col Group은 일단 고정 keeper와 맞춤 
 ** IE 에서는 col tag 에 * 을 인자로 넣을수 없다. 
 *
 *
 */
        const colGroupEle = document.createElement('colgroup');
        const colWidth = ['100px','*','90px','160px','120px','50px','50px'];

        colWidth.forEach(function(item,index){
            let colEle = document.createElement('col');
            if(item==='*' && Browser.IS_IE11){
                /** IE에서는 col width 에 '*' 태그가 먹지 않음  */
                item = '500px';
                alert("is Browser IE11");
            }
           colEle.width = item;
            colGroupEle.appendChild(colEle);
        });

/*
 * table Header
 * col Group 과 연결되는 TableHeader
 *
 */
        const theadEle = document.createElement('thead');
        /* const headEleName = ['Index','Service Name','Result','Pass','Fail','Running','N/A','Time','Note','Link']; */
        const headEleName = ['SQ No','Test Case','State','Result','Test Run','Detail','Note'];
                            
        for(let i=0;i<headEleName.length;i++){
            let headEle = document.createElement('th');
            headEle.textContent = headEleName[i];
            theadEle.appendChild(headEle);
        }
 /*
 *    table Body
 *       table
 *         시퀀스 넘버,
 *         테스트케이스,
 *         결과,
 *         확인시간,
 *         지정내용, 
 *         메모,
 *         디테일뷰
 **/
        const tableBody = document.createElement('tbody');

        for(let i=0;i<item.length;i++){
            const row = createTableRow(item,i);
            tableBody.appendChild(row);
        }





        function testResultEleBefore(testResultEle){

            testResultEle.classList.remove('block');
            testResultEle.classList.remove('fail');
            testResultEle.classList.remove('pass');
            testResultEle.classList.add('wait');

            testResultEle.textContent="Wait";
        }
        function testResultEleAfterSuccessCallback(testResultEle,flags,resResult,serverURL){
            testResultEle.classList.remove('wait');
            
            /* success Callback  */
            if(flags===true  && resResult==="pass"){
                testResultEle.classList.add('success');
                testResultEle.textContent = resResult;
            }
            else{
                testResultEle.classList.add('fail');
                testResultEle.textContent="Failed";

		setErrorCount(serverURL);
            }
        }

        function testResultEleAfterErrorCallback(testResultEle,flags,resResult,serverURL){
            testResultEle.classList.remove('wait');
            
            /* Error Callback  */
            if(flags===true){
                testResultEle.classList.add('fail');
                testResultEle.textContent = resResult;
            }
            else{
                testResultEle.classList.add('fail');
                testResultEle.textContent="Failed";
            }

        }
        function testStateEleEndCallback(testStateEle){
            testStateEle.textContent = "Complete";
            testStateEle.classList.add("complete");
            testStateEle.classList.remove('start');
        }
       tableBody.addEventListener('click',function(e){
            if(['I','i'].includes(e.target.tagName.toLowerCase()) && e.target.classList.contains('button')){
                    console.log('Button is Click');

                    const tableRecord = e.target.parentElement.parentElement.children;

                    const rowIndex = tableRecord[0].textContent;
                    const testCase = tableRecord[1].textContent;

                    const serverURL = baseUrl+testCase;


                    const testStateEle = tableRecord[2];
                    testStateEle.textContent="Start";
                    testStateEle.classList.add("start");
                    testStateEle.classList.remove('complete');


                    const testResultEle = tableRecord[3].children[0];

                    /** Before Test  */
                    testResultEleBefore(testResultEle);

                    console.log(serverURL);

                    Ajax.call({
                        url:serverURL,
                        type:'get',
                        success:function(data,textStatus,jqxhr){
                            try{
                                console.log(data);
                                console.log(e);
                                var resData = JSON.parse(data);
                                testStateEleEndCallback(testStateEle);                            
                                testResultEleAfterSuccessCallback(testResultEle,true,resData.result,serverURL);
                            }
                            catch(err){
                                testStateEleEndCallback(testStateEle);
                                console.error(err);
                                testResultEleAfterSuccessCallback(testResultEle,false,resData.result,serverURL);
                            }
              
                        },
                        error:function(data,textStatus,jqxhr){
                            try{
				setErrorCount(serverURL);
				

                                var resData = JSON.parse(data);
        
                                testStateEleEndCallback(testStateEle);
                                testResultEleAfterErrorCallback(testResultEle,true,resData.result);

                                testResultEle.textContent= resData.result;
                                testResultEle.classList.add('fail');
                            }
                            catch(err){
                                testStateEleEndCallback(testStateEle);
                                testResultEleAfterErrorCallback(testResultEle,false,'fail');
				console.log(data);
                            }

                        }
                    });

            }
       });

        tableEle.appendChild(colGroupEle);
        tableEle.appendChild(theadEle);
        tableEle.appendChild(tableBody);



        return tableEle;
    }
    function createTableRow(item,index){
        const tableRow = document.createElement('tr');
        for(let i=0;i<7;i++){
            const tableDataEle = document.createElement('td');
            /* SQ No - Sequence Number*/
            if(i===0){tableDataEle.textContent = index+1;}

/* TestCase  call  http://serverIp:serverPort/TestCase     
 * response -> {
 *    result:"pass"  or result:"fail"
 *  }
 **/
            if(i===1){tableDataEle.textContent = item[index];}

/* Test State
 * Ready -> Start      -> Complete 
 * (blue)   (whie blue)    ( Brown ) 
 **/
           if(i===2){
                tableDataEle.textContent="Ready"
                tableDataEle.className="ready";
            
            }

/*
 **  Test Result
 **         pass  (green background )
 **         empty - (yellow background ) 
 **         fail  ( red background )
 **/     
            if(i===3){
                
                let iEle = document.createElement('i');
                iEle.className="badge block ";
                iEle.textContent="Empty";
                tableDataEle.appendChild(iEle);
            
            }
            if(i===4){

                let iEle = document.createElement('i');
                iEle.className="button";
                iEle.textContent="Run";

		/* 임시 전부 실행 버튼 */
		taskButtonList.push(iEle);

                tableDataEle.appendChild(iEle);
            }
            tableRow.appendChild(tableDataEle);
        }

        return tableRow;
    }
    return Task;
})();
