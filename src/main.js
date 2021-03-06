let terrainData;
let structureData;
let animateId;

let near = 0.1;
let far = 1000;
let fov = 50;

let roadList = [];
// function mousewheel(e) {
// 	e.preventDefault();
// 	//e.stopPropagation();  
// 	if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件  
// 		if (e.wheelDelta > 0) { //当滑轮向上滚动时  
// 			fov -= (near < fov ? 1 : 0);
// 		}
// 		if (e.wheelDelta < 0) { //当滑轮向下滚动时  
// 			fov += (fov < far ? 1 : 0);
// 		}
// 	} else if (e.detail) {  //Firefox滑轮事件  
// 		if (e.detail > 0) { //当滑轮向上滚动时  
// 			fov -= 1;
// 		}
// 		if (e.detail < 0) { //当滑轮向下滚动时  
// 			fov += 1;
// 		}
// 	}
// 	cav.camera.fov = fov;
// 	cav.camera.updateProjectionMatrix();
// 	cav.renderer.render(cav.scene, cav.camera);
// }
// document.addEventListener('mousewheel', mousewheel, { passive: false });

// function controlRotate(){
//     if(document.getElementById('rotateRadio').checked){
//         timeStepCam = 0.001;
//     }
//     else{
//         timeStepCam = 0;
//     }
// }


async function getData(){
    let email = document.getElementById('email').value;
	let password = document.getElementById('password').value;
	let url = 'https://cors.bridged.cc/https://screeps.com/api/auth/signin?email=' + email + '&password='+ password;
    await axios.post(url, {}).then(function (response) {document.getElementById('token').value = response['data']['token'];})
    let room = document.getElementById('room').value;
	let shard = document.getElementById('shard').value;
    await initScene();
    await getTerrain(shard, room);
    getStruct(shard, room);
    drawTerrain();
}

//
let timeStepLight = 0.0005;
let stepLight = 0;
// let timeStepCam = 0.001;
// let stepCam = 0;
function initScene(){
    if(animateId){
		document.body.removeChild( cav.renderer.domElement );
		delCav();
	}
    cav.scene = new THREE.Scene();
	cav.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
	cav.renderer = new THREE.WebGLRenderer();
	cav.renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( cav.renderer.domElement );
    const sphere = new THREE.SphereGeometry( 0.5, 16, 8 );
	cav.light = new THREE.PointLight( 0x404040, 5, 100 );
	cav.light.position.set( 25, 25, 0 );
	cav.scene.add( cav.light );

	cav.allLight = new THREE.AmbientLight( 0x505050 ); // soft white light
	cav.scene.add( cav.allLight )

	cav.camera.position.x = 25;
	cav.camera.position.z = 70;
	cav.camera.position.y = 25;
	//cav.camera.lookAt(new THREE.Vector3(25,0,25))
	controls = new THREE.OrbitControls( cav.camera, cav.renderer.domElement );
	controls.enablePan = false;
	controls.target = new THREE.Vector3(25, 0, 25)
	function animate() {
		animateId = requestAnimationFrame( animate );
		controls.update();
		cav.light.position.y = 25 
		cav.light.position.x = Math.cos(stepLight) * 25 + 25;
		cav.light.position.z = Math.sin(stepLight) * 25 + 25;

		// cav.camera.position.z = Math.cos(stepCam) * 50 + 25;
		// cav.camera.position.x = Math.sin(stepCam) * 50 + 25;
		// cav.camera.lookAt(new THREE.Vector3(25,0,25));

		stepLight = timeStepLight + stepLight;
		// stepCam = timeStepCam + stepCam;
		cav.renderer.render( cav.scene, cav.camera );
	}
	animate();
}

function getRandStr(type, length){
    // 创建随机挑选的目标集合
    const target = (type === 'number') ? '0123456789' : 'abcdefghijklmnopqrstuvwxyz'

    let randStr = ''
    for (let i = 0; i < length; i++) {
        randStr += target.charAt(Math.floor(Math.random() * target.length))
    }
    return randStr
}

let count = 0;
/**
 * 获取建筑信息
 * @param {String} shard 
 * @param {String} room 
 */
async function getStruct(shard, room){
    count = 0;
    let url = 'wss://screeps.com/socket/' + getRandStr('number', 3) + '/' + getRandStr('string', 8) + '/websocket';
    let ws = new WebSocket(url);
    let token = document.getElementById('token').value;
    ws.onmessage = function(event){
		count += 1;
		if(count == 5){
			ws.send('"subscribe room:'+shard+'/'+room+'"');
		}
		else if(count == 6){
			let data = event.data.slice(3,-2);
			data = data.replace(/\\\\\\"/g, '"');
			data = data.replace(/\\\\"/g,'"');
			data = data.replace(/\\"/g, '"');
			data = data.slice(0,data.indexOf(',"users"')) + '}';
			data = data.slice(0,data.indexOf(',"visual"')) + '}';
			data = data.slice(data.indexOf(',')+1);
			if(data[-1] == ']'){
				data = data.slice(0,-1)
			}
			structureData = JSON.parse(data);
            drawStructure();
			ws.send('"unsubscribe room:'+shard+'/'+room+'"')
			ws.close()
		}
    }
    ws.onopen = function(){
		ws.send('["auth ' + token + '"]');
	}
}

/**
 * 获取房间地形
 * @param {String} shard
 * @param {String} room 
 */
async function getTerrain(shard, room){
    let url = 'https://cors.bridged.cc/https://screeps.com/api/game/room-terrain?shard=' + shard + '&room=' + room;
    await axios.get(url, {}).then(function (response) {terrainData = response.data.terrain;});
}

// 地形区分用
const terrainDic = {
	swamp:2,
	wall:3
}

// 保存场景重要组件
let cav = {}

// 清空画布，终止渲染
function delCav(){
	let arr = cav.scene.children.filter(x=>x)
	arr.forEach(a=>{
		dispose(cav.scene,a);
	})
	cav.scene.remove();
	cav.renderer.dispose();
	cav.renderer.forceContextLoss();
	cav.renderer.content = null;
	cav.renderer.domElement = null;
	cancelAnimationFrame(animateId);
	animateId = undefined;
}

function dispose(parent,child){
	if(child.children.length){
		let arr  = child.children.filter(x=>x);
		arr.forEach(a=>{
			dispose(child,a)
		})
	}
	if(child instanceof THREE.Mesh||child instanceof THREE.Line){
		if(child.material.map) child.material.map.dispose();
		child.material.dispose();
		child.geometry.dispose();
	}else if(child.material){
		child.material.dispose();
	}
	child.remove();
	parent.remove(child);
}

function drawTerrain(){
    let roomMap = initMap()
	for(let node of terrainData){
		roomMap[node.x][node.y] = terrainDic[node.type];
	}

    let box = new THREE.BoxGeometry( 50, 0.01 ,50);
	let groundMesh = new THREE.Mesh( box ,
		new THREE.MeshLambertMaterial({ color: 0x404040 }))
	groundMesh.position.y = 0;
	groundMesh.position.x = 24.5;
	groundMesh.position.z = 24.5;	
	cav.scene.add( groundMesh );

	for(let i=0;i<50;i++){
		for(let j=0;j<50;j++){
			if(roomMap[i][j] == 1){
				continue;
			}
			addBlock(i,j,roomMap[i][j])
		}
	}
}

function addBlock(x,y,type){
    let color = 0x404040;
    let height = 0.1;
    if(type == 2){
        color = 0x00ff00;
    }
    else if(type == 3){
        height = 2;
    }
    let box = new THREE.BoxGeometry( 1, height ,1);

    let groundMesh = new THREE.Mesh( box ,
    //			new THREE.MeshPhongMaterial( { color: color} ) );
        new THREE.MeshLambertMaterial({ color: color }))
    
    groundMesh.position.y = height/2;
    groundMesh.position.x = x;
    groundMesh.position.z = y;
    cav.scene.add( groundMesh );
}

// 初始化[50][50]数组
function initMap(){
	let map = [];
	for(let i = 0;i<50;i++){
		map.push(new Array(50));
	}
	for(let i=0;i<50;i++){
		for(let j=0;j<50;j++){
			map[i][j] = 1;
		}
	}
	return map;
}

function drawStructure(){
	roadList = [];
    let structData = structureData.objects;
    for(let node in structData){
        let x = structData[node].x;
        let y = structData[node].y;
		if(structData[node].type == 'road'){
			roadList.push([x,y]);
		}
        if(drawFunc[structData[node].type] != undefined){
            drawFunc[structData[node].type](x,y)
        }
    }
	//connectRoad();
}