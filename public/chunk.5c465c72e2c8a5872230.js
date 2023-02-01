(()=>{var e,t={4383:(e,t,s)=>{"use strict";var i=s(88478),n=(s(38795),s(96064));class a{constructor(){this.DBKeypoints=[["nose_x","nose_y","left_eye_x","left_eye_y","right_eye_x","right_eye_y","left_ear_x","left_ear_y","right_ear_x","right_ear_y","left_shoulder_x","left_shoulder_y","right_shoulder_x","right_shoulder_y","left_elbow_x","left_elbow_y","right_elbow_x","right_elbow_y","left_wrist_x","left_wrist_y","right_wrist_x","right_wrist_y","left_hip_x","left_hip_y","right_hip_x","right_hip_y","left_knee_x","left_knee_y","right_knee_x","right_knee_y","left_ankle_x","left_ankle_y","right_ankle_x","right_ankle_y"]]}addKeypoints=e=>{this.DBKeypoints.push(e)};saveToCSV=()=>{const e=`data:text/csv;charset=utf-8,${this.DBKeypoints.map((e=>e.join(","))).join("\n")}`,t=encodeURI(e),s=document.createElement("a");s.setAttribute("href",t),s.setAttribute("download","datasetX.csv"),document.body.appendChild(s),s.click(),this.DBKeypoints=[this.DBKeypoints[0]],document.body.removeChild(s)}}var o=s(93202);class r{constructor(){this.model=null,this.label=[],this.stdConfig={}}setup=async e=>{this.label=e.label,this.stdConfig=e.stdConfig,this.model=await(0,o.FB)(e.path)};standarization=e=>e.map(((e,t)=>t%2==0?e/this.stdConfig.width:e/this.stdConfig.height));predict=async e=>{if(!this.model)return null;const t=(0,i.XeE)([this.standarization(e)]),s=await this.model.predict(t).data();return Array.from(s).map(((e,t)=>({class:this.label[t],confidence:e})))}}class l{constructor(e){this.count=0,this.rules=null,this.ctxPose=e,this.lastStage={},this.nextStage={},this.currStage={},this.sumObsPoints=0,this.obsStages=[],this.listAngles=[]}initStage=()=>{this.currStage={},this.obsStages=[],this.sumObsPoints=0,this.rules.nameStage.forEach(((e,t)=>{this.obsStages.push({idStage:t,nameStage:e,sum:0,detail:{}})})),this.obsStages.push({idStage:-1,nameStage:"None",sum:0,detail:{}})};setup=e=>{this.rules=e,this.initStage()};resetCount=()=>{this.count=0};determineCurrStage=()=>{if(0!==this.obsStages.length){const e=[...this.obsStages].sort(((e,t)=>t.sum-e.sum)),t=e[0].sum===this.sumObsPoints?"FULL":"PARTIAL";if(this.currStage={statusStage:t,idStage:e[0].idStage,nameStage:e[0].nameStage},"FULL"===t&&this.currStage.nameStage!==this.lastStage.nameStage&&this.currStage.idStage===this.rules.nameStage.length-1&&(this.count+=1),"FULL"===t&&"None"!==e[0].nameStage&&(0===Object.keys(this.lastStage).length||this.lastStage.nameStage!==e[0].nameStage)){this.lastStage={idStage:e[0].idStage,nameStage:e[0].nameStage};const t=this.lastStage.idStage+1!==this.rules.nameStage.length?this.lastStage.idStage+1:0;this.nextStage={idStage:t,nameStage:this.rules.nameStage[t]}}}};getAdvice=()=>{if(0===Object.keys(this.nextStage).length)return"";let e="",t=1;const s=this.obsStages[this.nextStage.idStage].detail;return this.obsStages.forEach((i=>{i.nameStage!==this.nextStage.nameStage&&Object.keys(i.detail).forEach((n=>{if(n in s)return;1===t&&(e+=`<p>To move ${this.nextStage.nameStage} :</p>`);const{rangeAngle:a}=this.rules.anglePoint[n];e+=`<p>${t}) Angle <b>${i.detail[n].name.split("_").map((e=>e.charAt(0).toUpperCase()+e.substr(1))).join(" ")}</b> (${i.detail[n].angle}°) must between ${a[this.nextStage.idStage].min}° and ${a[this.nextStage.idStage].max}°</p>`,t+=1}))})),e};detectAnglesAndStages=(e,t)=>{this.rules&&this.ctxPose&&t===this.rules.nameWorkout&&(e.forEach(((t,s)=>{if(!(s in this.rules.anglePoint))return;const{spouseIdx:i,rangeAngle:n}=this.rules.anglePoint[s],a=e[i[0]],o=e[i[1]];let r=Math.atan2(a.y-t.y,a.x-t.x),l=Math.atan2(o.y-t.y,o.x-t.x),c=parseInt((l-r)/Math.PI*180+360,10)%360;this.ctxPose.moveTo(t.x,t.y),c>180&&(c=360-c,[r,l]=[l,r]),this.ctxPose.arc(t.x,t.y,20,r,l),this.ctxPose.fill(),this.listAngles.push([c,t.x+5,t.y]),this.sumObsPoints+=1;let d=!0;n.forEach(((t,i)=>{c>=t.min&&c<=t.max&&(this.obsStages[i].sum+=1,this.obsStages[i].detail[s]={name:e[s].name,angle:c},d=!1)})),d&&(this.obsStages[this.obsStages.length-1].sum+=1,this.obsStages[this.obsStages.length-1].detail[s]={name:e[s].name,angle:c})})),this.determineCurrStage())}}class c{constructor(e,t="user"){this._webcamElement=e,this._addVideoConfig={},this._facingMode=t,this._webcamList=[],this._streamList=[],this._selectedDeviceId=""}get facingMode(){return this._facingMode}set facingMode(e){this._facingMode=e}get webcamList(){return this._webcamList}get webcamCount(){return this._webcamList.length}get selectedDeviceId(){return this._selectedDeviceId}getVideoInputs(e){return this._webcamList=[],e.forEach((e=>{"videoinput"===e.kind&&this._webcamList.push(e)})),1===this._webcamList.length&&(this._facingMode="user"),this._webcamList}getMediaConstraints(){let e={};return""===this._selectedDeviceId?e.facingMode=this._facingMode:e.deviceId={exact:this._selectedDeviceId},e={...e,...this._addVideoConfig},{video:e,audio:!1}}selectCamera(){for(const e of this._webcamList)if("user"===this._facingMode&&e.label.toLowerCase().includes("front")||"enviroment"===this._facingMode&&e.label.toLowerCase().includes("back")){this._selectedDeviceId=e.deviceId;break}}flip(e){this._facingMode=e,"user"===this._facingMode?this._webcamElement.style.transform="scale(-1,1)":this._webcamElement.style.transform="",this.selectCamera()}async start(e=!0){return new Promise(((t,s)=>{this.stop(),navigator.mediaDevices.getUserMedia(this.getMediaConstraints()).then((i=>{this._streamList.push(i),this.info().then((()=>{this.selectCamera(),e?this.stream().then((()=>{t(this._facingMode)})).catch((e=>{s(e)})):t(this._selectedDeviceId)})).catch((e=>{s(e)}))})).catch((e=>{s(e)}))}))}async info(){return new Promise(((e,t)=>{navigator.mediaDevices.enumerateDevices().then((t=>{this.getVideoInputs(t),e(this._webcamList)})).catch((e=>{t(e)}))}))}async stream(){return new Promise(((e,t)=>{navigator.mediaDevices.getUserMedia(this.getMediaConstraints()).then((t=>{this._streamList.push(t),this._webcamElement.srcObject=t,"user"===this._facingMode&&(this._webcamElement.style.transform="scale(-1,1)"),this._webcamElement.play(),e(this._facingMode)})).catch((e=>{console.log(e),t(e)}))}))}stop(){this._streamList.forEach((e=>{e.getTracks().forEach((e=>{e.stop()}))}))}}class d{constructor(e,t){this.DBHandler=new a,this.isExtractKeypoints=!1,this.camHandler=new c(e),this.isVideoMode=!1,this.scaler=null,this.classifier=new r,this.isClassify=!0,this.currClass="",this.frameClassify=6,this.frame=0,this.fps=0,this.times=[],this.isLoop=!1,this.additionalElem={},this.webcamElem=e,this.cnvPoseElem=t,this.ctxPose=this.cnvPoseElem.getContext?this.cnvPoseElem.getContext("2d"):null,this.nameModel="",this.model=null,this.detector=null,this.detectorConfig={},this.estimationConfig={},this.tresholdPoints=.3,this.lines={0:[[0,1],[0,2]],1:[[1,3]],2:[[2,4]],3:[],4:[],5:[[5,7],[5,6],[5,11]],6:[[6,8],[6,12]],7:[[7,9]],8:[[8,10]],9:[],10:[],11:[[11,12],[11,13]],12:[[12,14]],13:[[13,15]],14:[[14,16]],15:[],16:[]},this.counter=new l(this.ctxPose),this.isShowAdvice=!1,this.isShowDirectionSign=!0}setup=async e=>{this.estimationConfig=e.estimationConfig,this.nameModel===e.model&&JSON.stringify(this.detectorConfig)===JSON.stringify(e.detectorConfig)||(this.nameModel=e.model,this.model=n.oV[this.nameModel],this.detectorConfig=e.detectorConfig,this.detector=await n.cH(this.model,this.detectorConfig))};getPose=async()=>this.detector.estimatePoses(this.webcamElem,this.estimationConfig);drawSkeleton=e=>{if(!this.ctxPose)return null;this.ctxPose.clearRect(0,0,this.cnvPoseElem.width,this.cnvPoseElem.height),this.ctxPose.save(),this.ctxPose.beginPath(),"user"===this.camHandler._facingMode&&(this.ctxPose.translate(this.cnvPoseElem.width,0),this.ctxPose.scale(-1,1)),this.scaler&&this.ctxPose.scale(this.scaler.w,this.scaler.h),this.ctxPose.fillStyle="#eab308",this.counter.initStage(),this.counter.detectAnglesAndStages(e,this.currClass),this.ctxPose.stroke(),this.ctxPose.fill(),this.ctxPose.beginPath(),this.ctxPose.fillStyle="rgba(45,253,255,255)",this.ctxPose.strokeStyle="black";const t=[];return e.forEach(((s,i)=>{t.push(s.x,s.y),s.score>this.tresholdPoints&&(this.ctxPose.moveTo(s.x,s.y),this.ctxPose.arc(s.x,s.y,5,0,2*Math.PI),this.lines[i].forEach((t=>{e[t[1]].score>this.tresholdPoints&&(this.ctxPose.moveTo(s.x,s.y),this.ctxPose.lineTo(e[t[1]].x,e[t[1]].y))})))})),this.isExtractKeypoints&&this.DBHandler.addKeypoints(t),this.ctxPose.stroke(),this.ctxPose.fill(),this.ctxPose.strokeStyle="white",this.counter.listAngles.forEach((e=>{this.ctxPose.strokeText(`${e[0]}°`,e[1],e[2])})),this.counter.listAngles=[],this.ctxPose.restore(),t};drawPose=()=>{this.getPose().then((e=>{if(e&&0!==e.length){const t=this.drawSkeleton(e[0].keypoints);t&&this.isClassify&&this.additionalElem.confidenceElem&&this.frame%this.frameClassify==0&&this.classifier.predict(t).then((e=>{this.currClass=e[0].confidence>e[1].confidence?e[0].class:e[1].class,this.additionalElem.confidenceElem.style.clipPath=`inset(${100*(1-e[1].confidence.toFixed(6))}% 0 0 0)`}))}if(this.isClassify&&(this.additionalElem.countElem&&(this.additionalElem.countElem.innerText=this.counter.count),this.isShowDirectionSign&&this.additionalElem.imgDirectionSignElem&&0!==Object.keys(this.counter.nextStage).length&&(this.additionalElem.imgDirectionSignElem.style.display=this.counter.nextStage.nameStage?"block":"none",this.additionalElem.imgDirectionSignElem.src=this.counter.rules.pathImageStage[this.counter.nextStage.idStage]),this.isShowAdvice&&this.additionalElem.adviceWrapElem)){const e=this.counter.getAdvice();this.additionalElem.adviceWrapElem.style.display=e?"flex":"none",this.additionalElem.adviceWrapElem.children[0].innerText="Advice each frame",this.additionalElem.adviceWrapElem.children[1].innerHTML=e}if(this.isLoop&&window.requestAnimationFrame(this.drawPose),this.additionalElem.fpsElem){const e=performance.now();for(;this.times.length>0&&this.times[0]<=e-1e3;)this.times.shift();this.times.push(e),this.fps=this.times.length-1,this.frame+=1,this.fps<15?this.frameClassify=Math.ceil(this.fps/3):this.fps>=15&&this.fps<30?this.frameClassify=Math.floor(this.fps/5):this.fps>=30&&this.fps<45?this.frameClassify=Math.floor(this.fps/7):this.frameClassify=Math.floor(this.fps/10),this.additionalElem.fpsElem.innerText=`FPS: ${this.fps}`}}))}}class h{constructor(){this.currTime=0,this.targetTime=null,this.interval=1e3,this.duration=null,this.isPaused=!0,this.runner=null,this.type="INC",this.firstDelayDuration=null,this.currDelayTime=0,this.isFirstDelay=!0}setup=e=>{this.interval=e.interval,this.duration=e.duration,this.type=e.type,this.firstDelayDuration=e.firstDelayDuration,this.reset()};reset=()=>{this.isPaused=!1,this.currDelayTime=this.firstDelayDuration,this.targetTime="INC"===this.type?this.duration:0,this.currTime="INC"===this.type?0:this.duration};start=(e,t,s,i)=>{this.reset(),null===this.runner&&null!==this.targetTime&&(this.runner=setInterval((()=>{this.isPaused||(this.isFirstDelay?(e(this.currDelayTime),0===this.currDelayTime&&(t(),this.isFirstDelay=!1,this.isPaused=!1),this.currDelayTime-=1):("INC"===this.type&&(this.currTime+=1),"DEC"===this.type&&(this.currTime-=1),s(this.getCurrTime()),this.currTime===this.targetTime&&(i(),this.isPaused=!1,this.remove())))}),this.interval))};resume=()=>{this.isPaused&&(this.isPaused=!1)};pause=()=>{this.isPaused||(this.isPaused=!0)};remove=()=>{clearInterval(this.runner),this.runner=null};getCurrTime=()=>({minutes:Math.floor(this.currTime/60),seconds:this.currTime%60})}class u{constructor(){this.DBWOScore=[],this.isLocalStorageAvailable=null,this.keyData="DBWOScore",this.bestScore={}}setup=e=>{if(this.bestScore={},e.nameWorkout.forEach((t=>{this.bestScore[t]={},e.duration.forEach((e=>{this.bestScore[t][e]="0"}))})),"undefined"==typeof localStorage)return this.isLocalStorageAvailable=!1,void alert("Warning! Local storage unavailable. Please use newest browser");this.isLocalStorageAvailable=!0;const t=localStorage.getItem(this.keyData);null!==t?this.DBWOScore=JSON.parse(t):this.saveToLocalStorage()};saveToLocalStorage=()=>{this.isLocalStorageAvailable&&localStorage.setItem(this.keyData,JSON.stringify(this.DBWOScore))};addNewData=e=>{this.DBWOScore.push({id:+new Date,nameWorkout:e.nameWorkout,duration:e.duration,repetition:e.repetition,date:(new Date).toLocaleString()}),this.saveToLocalStorage()};getBestScoreByReps=()=>0===Object.keys(this.bestScore).length?{}:(this.DBWOScore.forEach((e=>{("None"===this.bestScore[e.nameWorkout][e.duration]||e.repetition>=this.bestScore[e.nameWorkout][e.duration])&&(this.bestScore[e.nameWorkout][e.duration]=e.repetition)})),this.bestScore)}class m{constructor(){this.DBWOSettings={},this.isGetPrevSettings=!1,this.isLocalStorageAvailable=null,this.keyData="DBWOSettings"}setup=(e,t)=>{if(0!==Object.keys(this.DBWOSettings).length)return;if("undefined"==typeof localStorage)return void alert("Warning! Local storage unavailable. Please use newest browser");this.isLocalStorageAvailable=!0;const s=localStorage.getItem(this.keyData);if(null!==s){const e=JSON.parse(s);"None"!==e.currWorkout&&(this.isGetPrevSettings=!0,this.change(e,t))}else this.DBWOSettings=e,this.saveToLocalStorage()};saveToLocalStorage=()=>{this.isLocalStorageAvailable&&localStorage.setItem(this.keyData,JSON.stringify(this.DBWOSettings))};getEffectChange=(e,t)=>{const s=this.DBWOSettings,i=0===Object.keys(s).length;Object.keys(t).forEach((n=>{"currWorkoutDuration"===n&&(e.currWorkout!==s.currWorkout||e.currDuration!==s.currDuration||i&&this.isGetPrevSettings)?t[n]({nameWO:{isChange:i?e.currWorkout:e.currWorkout!==s.currWorkout,value:e.currWorkout},durationWO:{isChange:i?e.currDuration:e.currDuration!==s.currDuration,value:e.currDuration}}):(i&&this.isGetPrevSettings||e[n]!==s[n])&&t[n](e[n])}))};change=(e,t={})=>{const s={...this.DBWOSettings,...e};this.getEffectChange(s,t),this.DBWOSettings=s,this.saveToLocalStorage()}}document.addEventListener("DOMContentLoaded",(async()=>{let e=document.getElementById("webcamBox");const t=document.getElementById("cnvPoseBox"),s=document.getElementById("parentWebcamBox"),i=document.getElementById("loaderBox"),n=document.getElementById("fpsBox"),a=document.getElementById("countBox"),o=document.getElementById("timerBox"),r=document.getElementById("delayBox"),l=document.getElementById("pauseBtn"),c=document.getElementById("resumeBtn"),g=document.getElementById("accessCamBtn"),y=document.getElementById("chooseWOBox"),p=document.getElementById("formChooseWOBox"),f=document.getElementById("accessCamBox"),x=document.getElementById("titleWOBox"),b=document.getElementById("confidenceBox"),v=document.getElementById("resultBox"),S=document.getElementById("resultRepBox"),E=document.getElementById("resultTitleBox"),w=document.getElementById("resultOKBtn"),B=document.getElementById("uploadVideoBtn"),D=document.getElementById("goWebcamBtn"),k=document.getElementById("settingsBtn"),_=document.getElementById("settingsBox"),L=document.getElementById("saveSettingsBtn"),C=document.getElementById("cancelSettingsBtn"),W=document.getElementById("segSettingsWOBtn"),O=document.getElementById("segSettingsAdvBtn"),P=document.getElementById("bodySettingsWOBox"),M=document.getElementById("bodySettingsAdvBox"),I=document.getElementById("scoresBtn"),T=document.getElementById("scoresBox"),$=document.getElementById("scoresOKBtn"),A=document.getElementById("segJourneyBtn"),V=document.getElementById("segBestBtn"),j=document.getElementById("bodyJourneyBox"),F=document.getElementById("bodyBestScoreBox"),N=document.getElementById("helpBox"),H=document.getElementById("helpBtn"),q=document.getElementById("segHowToUseBtn"),K=document.getElementById("segAboutBtn"),R=document.getElementById("bodyHowToUseBox"),U=document.getElementById("bodyAboutBox"),J=document.getElementById("helpOKBtn"),G=document.getElementById("developerModeBox"),z=document.getElementById("imgDirectionSignBox"),X=document.getElementById("goAdviceBtn"),Q=document.getElementById("adviceWrapBox"),Y=document.getElementById("sliderAdviceBox"),Z=document.getElementById("sliderCameraBox"),ee=document.getElementById("recordKeypointsBtn"),te=document.getElementById("pingRecordBox"),se=document.getElementById("restartBtn");let ie=!0,ne=!1,ae=640,oe=360,re=0,le=0;const ce=new d(e,t),de=new h,he=new u,ue=new m;ce.additionalElem={fpsElem:n,countElem:a,adviceWrapElem:Q,confidenceElem:b,imgDirectionSignElem:z};const me=()=>{re=window.innerWidth>1280?1280:window.innerWidth,le=Math.floor(re*(9/16)),le>window.innerHeight&&(le=window.innerHeight,re=Math.floor(le*(16/9))),s.setAttribute("style",`width:${re}px;height:${le}px`);for(let e=0;e<s.children.length;e+=1){const i=s.children[e];"CANVAS"===i.tagName?(t.width=re,t.height=le):(i.style.width=`${re}px`,i.style.height=`${le}px`)}ce.camHandler._addVideoConfig={width:ae,height:oe},ce.scaler={w:re/ae,h:le/oe}};me(),window.addEventListener("resize",(()=>{me()}));const ge=(e,t)=>{let s="";return s+=t?'\n      <div class="mb-3">What workout do you want?</div>\n      ':'\n      <div class="flex-1 overflow-y-auto flex flex-col items-center">\n        <h1 class="font-bold text-2xl mt-3 mb-5">AI Workout Assistant</h1>\n        <img\n          src="./img/undraw_pilates_gpdb.svg"\n          alt="Ilustration of Workout"\n          class="w-1/2"\n        />\n        <div class="mt-5 mb-3">What workout do you want?</div>\n      ',e.nameWorkout.forEach(((i,n)=>{0===n&&(s+='<fieldset class="grid grid-cols-2 gap-3 w-full">'),s+=`\n        <label\n          for="${t?`settingsName${n}`:`chooseName${n}`}"\n          class="flex cursor-pointer items-center pl-4 border border-gray-200 rounded-lg"\n        >\n          <input\n            id="${t?`settingsName${n}`:`chooseName${n}`}"\n            type="radio"\n            value="${e.slugWorkout[n]}"\n            name="${t?"settingsNameWO":"chooseNameWO"}"\n            class="w-4 h-4 text-yellow-600"\n            required\n          />\n          <span class="w-full py-4 ml-2 text-sm font-medium text-gray-600"\n            >${i}</span\n          >\n        </label>\n        `,n===e.nameWorkout.length-1&&(s+="</fieldset>")})),s+=`<div class="${t?"mt-3":"mt-5"} mb-3">How long?</div>`,e.duration.forEach(((i,n)=>{0===n&&(s+='<fieldset class="grid grid-cols-2 gap-3 w-full">'),s+=`\n        <label\n          for="${t?`settingsDuration${n}`:`chooseDuration${n}`}"\n          class="flex cursor-pointer items-center pl-4 border border-gray-200 rounded-lg"\n        >\n          <input\n            id="${t?`settingsDuration${n}`:`chooseDuration${n}`}"\n            type="radio"\n            value="${i}"\n            name="${t?"settingsDurationWO":"chooseDurationWO"}"\n            class="w-4 h-4 text-yellow-600"\n            required\n          />\n          <span class="w-full py-4 ml-2 text-sm font-medium text-gray-600"\n            >${i}</span\n          >\n        </label>\n        `,n===e.duration.length-1&&(s+="</fieldset>")})),s+=t?"":'\n        </div>\n        <button\n          id="submitWOBtn"\n          type="submit"\n          class="w-full bg-yellow-500 text-white py-2 text-xl font-bold rounded-lg mb-2 mt-5 hover:bg-amber-500"\n        >\n          Next\n        </button>\n      ',s},ye=async()=>{!e.paused&&ce.isLoop||(i.style.display="flex",await ce.camHandler.start().then((()=>{ue.change({isAccessCamera:!0}),i.style.display="none",f.style.display="none"})).catch((e=>{console.log("Permission Denied: Webcam Access is Not Granted"),console.error(e),alert("Webcam Access is Not Granted, Try to Refresh Page")})))},pe=()=>{const e=de.getCurrTime();o.innerHTML=`${`0${e.minutes}`.slice(-2)}:${`0${e.seconds}`.slice(-2)}`},fe=async t=>{await fetch(t).then((e=>{if(!e.ok)throw new Error(`HTTP error${e.status}`);return e.json()})).then((async t=>{ce.counter.setup(t.rulesCountConfig);const s=`${t.rulesCountConfig.nameWorkout} - ${ue.DBWOSettings.currDuration}`;x.innerText=s,E.innerText=s,de.setup({interval:1e3,duration:ce.isVideoMode?Math.floor(e.duration):60*+ue.DBWOSettings.currDuration.split(" ")[0],type:"DEC",firstDelayDuration:ce.isVideoMode?0:3}),de.isFirstDelay=!ce.isVideoMode,pe(),await ce.setup(t.poseDetectorConfig).then((()=>{console.log("Detector Loaded")})).catch((e=>{console.error(e)})),await ce.classifier.setup(t.classifierConfig).then((async()=>{console.log("Classifier Ready to Use"),y.style.display="none",ue.DBWOSettings.isAccessCamera?ce.isVideoMode||await ye():(i.style.display="none",f.style.display="flex")})).catch((e=>{console.error(e)}))})).catch((e=>{console.error(e)}))};H.addEventListener("click",(()=>{N.style.display="flex"})),J.addEventListener("click",(()=>{N.style.display="none"})),q.addEventListener("click",(()=>{"none"===R.style.display&&(U.style.display="none",R.style.display="flex",K.classList.remove("bg-amber-300","text-gray-600"),K.classList.add("bg-amber-200","text-gray-400"),q.classList.remove("bg-amber-200","text-gray-400"),q.classList.add("bg-amber-300","text-gray-600"))})),K.addEventListener("click",(()=>{"none"===U.style.display&&(R.style.display="none",U.style.display="flex",q.classList.remove("bg-amber-300","text-gray-600"),q.classList.add("bg-amber-200","text-gray-400"),K.classList.remove("bg-amber-200","text-gray-400"),K.classList.add("bg-amber-300","text-gray-600"))})),se.addEventListener("click",(()=>{i.style.display="flex",r.innerText="",de.setup({interval:1e3,duration:ce.isVideoMode?Math.floor(e.duration):60*+ue.DBWOSettings.currDuration.split(" ")[0],type:"DEC",firstDelayDuration:ce.isVideoMode?0:3}),ce.counter.resetCount(),a.innerText="0",de.isFirstDelay=!ce.isVideoMode,ce.isVideoMode&&0!==e.currentTime&&(e.currentTime=0,e.load()),pe(),de.pause(),e.pause(),ce.isLoop=!1,ie=!0,ne=!0,ce.counter.lastStage={},ce.counter.nextStage={},z.style.display="none",Q.style.display="none",c.style.display="flex",se.style.display="none",l.style.display="none",i.style.display="none"})),ee.addEventListener("click",(()=>{ce.isExtractKeypoints=!ce.isExtractKeypoints,ce.isExtractKeypoints?(te.classList.remove("bg-gray-500"),te.classList.add("bg-red-500"),te.children[0].style.display="block"):(te.classList.remove("bg-red-500"),te.classList.add("bg-gray-500"),te.children[0].style.display="none",ce.DBHandler.saveToCSV())})),I.addEventListener("click",(()=>{let e="",t="";const s=he.getBestScoreByReps();Object.keys(s).forEach((e=>{t+=`\n        <div class="mb-3 text-gray-500 font-bold border-t-2 pt-1">\n          ${e}\n        </div>\n      `,Object.keys(s[e]).forEach(((i,n)=>{0===n&&(t+='\n            <div class="mb-3 grid grid-cols-2 gap-3 w-full">\n          '),t+=`\n          <div\n            class="flex flex-col w-full bg-white rounded-lg overflow-hidden shadow-sm"\n          >\n            <div\n              class="p-1 bg-yellow-400 text-center font-medium text-sm text-gray-500"\n            >\n              ${i}\n            </div>\n            <div class="p-1 text-center text-gray-500 font-medium text-lg">\n              ${s[e][i]}<span class="text-xs"> Reps</span>\n            </div>\n          </div>\n        `,n===Object.keys(s[e]).length-1&&(t+="\n            </div>\n          ")}))})),0===he.DBWOScore.length&&(e+='\n      <div class="flex flex-row w-full h-full justify-center items-center">\n        <div class="flex flex-col items-center">\n          <img\n            src="./img/undraw_void_-3-ggu.svg"\n            alt="Ilustration of Void"\n            class="w-1/2"\n          />\n          <div class="p-3 text-sm text-gray-600 text-center">There are no Journey Scores. Let\'s do Workout to change that!</div>\n        </div>\n      </div>\n      '),[...he.DBWOScore].sort(((e,t)=>t.id-e.id)).forEach((t=>{e+=`\n        <div\n          class="mb-3 w-full border-t-2 border-yellow-200 bg-white flex flex-row justify justify-between px-3 py-1.5"\n        >\n          <div class="flex flex-col items-start justify-between">\n            <div class="flex flex-row items-center">\n              <div class="text-md text-gray-600 font-semibold mr-2">\n                ${t.nameWorkout}\n              </div>\n              <div\n                class="text-xs px-1 py-0.5 bg-gray-200 rounded-lg text-gray-600 font-semibold"\n              >\n                ${t.duration}\n              </div>\n            </div>\n            <div class="text-xs">${t.date}</div>\n          </div>\n          <div class="flex flex-col items-center justify-between">\n            <div class="text-xl font-semibold text-gray-600">${t.repetition}</div>\n            <div class="text-xs">Reps</div>\n          </div>\n        </div>\n      `})),j.innerHTML=e,F.innerHTML=t,T.style.display="flex"})),$.addEventListener("click",(()=>{T.style.display="none"})),A.addEventListener("click",(()=>{"none"===j.style.display&&(F.style.display="none",j.style.display="block",V.classList.remove("bg-amber-300","text-gray-600"),V.classList.add("bg-amber-200","text-gray-400"),A.classList.remove("bg-amber-200","text-gray-400"),A.classList.add("bg-amber-300","text-gray-600"))})),V.addEventListener("click",(()=>{"none"===F.style.display&&(j.style.display="none",F.style.display="block",A.classList.remove("bg-amber-300","text-gray-600"),A.classList.add("bg-amber-200","text-gray-400"),V.classList.remove("bg-amber-200","text-gray-400"),V.classList.add("bg-amber-300","text-gray-600"))})),W.addEventListener("click",(()=>{"none"===P.style.display&&(M.style.display="none",P.style.display="block",O.classList.remove("bg-amber-300","text-gray-600"),O.classList.add("bg-amber-200","text-gray-400"),W.classList.remove("bg-amber-200","text-gray-400"),W.classList.add("bg-amber-300","text-gray-600"))})),O.addEventListener("click",(()=>{"none"===M.style.display&&(P.style.display="none",M.style.display="block",W.classList.remove("bg-amber-300","text-gray-600"),W.classList.add("bg-amber-200","text-gray-400"),O.classList.remove("bg-amber-200","text-gray-400"),O.classList.add("bg-amber-300","text-gray-600"))})),k.addEventListener("click",(()=>{_.style.display="flex",document.querySelector(`input[value="${ue.DBWOSettings.currWorkout}"][name="settingsNameWO"]`).checked=!0,document.querySelector(`input[value="${ue.DBWOSettings.currDuration}"][name="settingsDurationWO"]`).checked=!0,document.querySelector('input[name="settingsFSBox"]').checked=ue.DBWOSettings.isFullscreen,document.querySelector('input[name="settingsFCBox"]').checked=ue.DBWOSettings.isFlipCamera,document.querySelector('input[name="settingsDSBox"]').checked=ue.DBWOSettings.isDirectionSign,document.querySelector('input[name="settingsDMBox"]').checked=ue.DBWOSettings.isDeveloperMode}));const xe={currWorkoutDuration:async t=>{if(i.style.display="flex",r.innerText="",e.pause(),ce.isLoop=!1,ie=!0,ne=!0,ce.counter.lastStage={},ce.counter.nextStage={},t.durationWO.isChange){de.setup({interval:1e3,duration:ce.isVideoMode?Math.floor(e.duration):60*+t.durationWO.value.split(" ")[0],type:"DEC",firstDelayDuration:ce.isVideoMode?0:3}),pe();const s=`${ce.counter.rules.nameWorkout} - ${t.durationWO.value}`;x.innerText=s,E.innerText=s}t.nameWO.isChange&&await fe(`./rules/${t.nameWO.value}.json`),de.isFirstDelay=!ce.isVideoMode,ce.isVideoMode&&0!==e.currentTime&&(e.currentTime=0,e.load()),de.pause(),z.style.display="none",Q.style.display="none",c.style.display="flex",se.style.display="none",l.style.display="none",i.style.display="none"},isFullscreen:e=>{e&&!document.fullscreenElement?document.documentElement.requestFullscreen():!e&&document.exitFullscreen&&document.fullscreenElement&&document.exitFullscreen()},isFlipCamera:e=>{const t=e?"enviroment":"user";ce.camHandler.flip(t)},isDirectionSign:e=>{ce.isShowDirectionSign=e,ce.isClassify&&(z.style.display=e?"block":"none")},isDeveloperMode:e=>{G.style.display=e?"flex":"none"}};L.addEventListener("click",(()=>{const e=document.querySelector('input[name="settingsNameWO"]:checked').value,t=document.querySelector('input[name="settingsDurationWO"]:checked').value,s=document.querySelector('input[name="settingsFSBox"]').checked,i=document.querySelector('input[name="settingsFCBox"]').checked,n=document.querySelector('input[name="settingsDSBox"]').checked,a=document.querySelector('input[name="settingsDMBox"]').checked;ue.change({currWorkout:e,currDuration:t,isFullscreen:s,isFlipCamera:i,isDirectionSign:n,isDeveloperMode:a},xe),_.style.display="none"})),C.addEventListener("click",(()=>{_.style.display="none"})),await(async e=>{await fetch("./mock-data/workout.json").then((e=>{if(!e.ok)throw new Error(`HTTP error${e.status}`);return e.json()})).then((async e=>{p.innerHTML=ge(e,!1),P.innerHTML=ge(e,!0),he.setup(e),ue.setup(e.settingsConfig,{isFlipCamera:xe.isFlipCamera,isDeveloperMode:xe.isDeveloperMode}),ue.isGetPrevSettings&&ue.DBWOSettings.currWorkout&&"None"!==ue.DBWOSettings.currWorkout?(i.style.display="flex",await fe(`./rules/${ue.DBWOSettings.currWorkout}.json`)):(y.style.display="flex",i.style.display="none")})).catch((e=>{console.error(e)}))})(),e.addEventListener("loadeddata",(()=>{ce.isVideoMode||(ce.isClassify&&(ce.isClassify=!1),ce.isLoop=!0,Z.checked=!0,ne&&(ne=!1),r.innerText="",de.pause(),ce.counter.resetCount(),ce.drawPose())})),g.addEventListener("click",(async()=>{await ye()})),p.addEventListener("submit",(async e=>{e.preventDefault();const t=document.querySelector('input[name="chooseNameWO"]:checked').value,s=document.querySelector('input[name="chooseDurationWO"]:checked').value;"submitWOBtn"===e.submitter.id&&(ue.change({currWorkout:t,currDuration:s}),y.style.display="flex",i.style.display="flex",await fe(`./rules/${t}.json`))}));const be=e=>{r.innerText=e},ve=()=>{r.innerText=""},Se=e=>{o.innerText=`${`0${e.minutes}`.slice(-2)}:${`0${e.seconds}`.slice(-2)}`},Ee=()=>{ce.isVideoMode||he.addNewData({id:+new Date,nameWorkout:ce.counter.rules.nameWorkout,duration:ue.DBWOSettings.currDuration,repetition:ce.counter.count,date:(new Date).toLocaleString()}),pe(),de.isFirstDelay=!ce.isVideoMode,S.innerText=ce.counter.count,de.start(be,ve,Se,Ee),de.pause(),e.pause(),ie=!0,ce.isLoop=!1,ce.counter.resetCount(),ce.counter.lastStage={},ce.counter.nextStage={},v.style.display="flex",c.style.display="flex",se.style.display="none",l.style.display="none",z.style.display="none",Q.style.display="none"};w.addEventListener("click",(()=>{v.style.display="none",ie&&ce.isVideoMode?(e.pause(),e.currentTime=0,e.load()):(de.reset(),pe())})),l.addEventListener("click",(()=>{de.pause(),e.pause(),ce.isLoop=!1,c.style.display="flex",se.style.display="flex",l.style.display="none"})),c.addEventListener("click",(()=>{if(!ie&&!e.paused&&ce.isLoop)return;l.style.display="flex",se.style.display="none",c.style.display="none";const t=ie;ie&&(ie=!1,ce.isClassify=!0,de.start(be,ve,Se,Ee)),de.resume(),ce.isLoop=!0,e.play().then((()=>{ne||!t||ce.isVideoMode?ce.drawPose():ne=!0}))})),B.addEventListener("change",(t=>{if(t.target.files&&t.target.files[0]){ce.camHandler.stop(),ce.isClassify=!0,ce.isLoop=!1,ce.isVideoMode=!0,e.pause(),e.remove();const i=document.createElement("video");i.setAttribute("id","webcamBox"),i.setAttribute("class","bg-gray-200 z-10"),i.setAttribute("style",`width: ${re}px; height: ${le}px`),i.muted=!0,s.insertBefore(i,s.firstChild),i.setAttribute("src",URL.createObjectURL(t.target.files[0])),i.load(),i.play(),ue.change({isFlipCamera:!0},{isFlipCamera:xe.isFlipCamera}),i.addEventListener("loadeddata",(()=>{ce.isVideoMode&&(e=i,ce.webcamElem=i,ce.camHandler._webcamElement=i),ce.counter.resetCount(),a.innerText="0",r.innerText="",de.setup({interval:1e3,duration:ce.isVideoMode?Math.floor(e.duration):60*+ue.DBWOSettings.currDuration.split(" ")[0],type:"DEC",firstDelayDuration:ce.isVideoMode?0:3}),de.isFirstDelay=!ce.isVideoMode,de.pause(),pe(),e.pause(),ce.counter.lastStage={},ce.counter.nextStage={},oe=i.videoHeight,ae=i.videoWidth,0!==ae&&ce.isVideoMode&&(ce.scaler={w:re/ae,h:le/oe}),c.style.display="flex",se.style.display="none",l.style.display="none",z.style.display="none",Q.style.display="none",Z.checked=!ce.isVideoMode}))}})),X.addEventListener("click",(e=>{e.preventDefault(),ce.isShowAdvice=!ce.isShowAdvice,Y.checked=ce.isShowAdvice,ce.isClassify&&(Q.style.display=ce.isShowAdvice?"flex":"none")})),D.addEventListener("click",(async e=>{e.preventDefault(),ce.isVideoMode&&(ce.isLoop=!1,Z.checked=!0,ce.isVideoMode=!1,await ce.camHandler.start())}))}))},75410:()=>{},48628:()=>{},75042:()=>{}},s={};function i(e){var n=s[e];if(void 0!==n)return n.exports;var a=s[e]={id:e,loaded:!1,exports:{}};return t[e].call(a.exports,a,a.exports,i),a.loaded=!0,a.exports}i.m=t,i.amdD=function(){throw new Error("define cannot be used indirect")},i.amdO={},e=[],i.O=(t,s,n,a)=>{if(!s){var o=1/0;for(d=0;d<e.length;d++){for(var[s,n,a]=e[d],r=!0,l=0;l<s.length;l++)(!1&a||o>=a)&&Object.keys(i.O).every((e=>i.O[e](s[l])))?s.splice(l--,1):(r=!1,a<o&&(o=a));if(r){e.splice(d--,1);var c=n();void 0!==c&&(t=c)}}return t}a=a||0;for(var d=e.length;d>0&&e[d-1][2]>a;d--)e[d]=e[d-1];e[d]=[s,n,a]},i.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return i.d(t,{a:t}),t},i.d=(e,t)=>{for(var s in t)i.o(t,s)&&!i.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},i.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),i.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),(()=>{var e={179:0};i.O.j=t=>0===e[t];var t=(t,s)=>{var n,a,[o,r,l]=s,c=0;if(o.some((t=>0!==e[t]))){for(n in r)i.o(r,n)&&(i.m[n]=r[n]);if(l)var d=l(i)}for(t&&t(s);c<o.length;c++)a=o[c],i.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return i.O(d)},s=self.webpackChunkai_workout_assistant=self.webpackChunkai_workout_assistant||[];s.forEach(t.bind(null,0)),s.push=t.bind(null,s.push.bind(s))})();var n=i.O(void 0,[572,50,887,985,370,320,306,858,73],(()=>i(4383)));n=i.O(n)})();