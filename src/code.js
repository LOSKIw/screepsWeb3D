function getData(){
	let url = getUrl();
	let data = undefined;
    axios.get(url, {
      })
      .then(function (response) {
        data = response.data.terrain;
		drawRoom(data)
      })
      .catch(function (error) {
        console.log(error);
    });
}

function getUrl(){
	let room = document.getElementById('room').value;
	let shard = document.getElementById('shard').value;
	let url = 'https://cors.bridged.cc/https://screeps.com/api/game/room-terrain?shard=' + shard + '&room=' + room;
	return url
}

const terrainDic = {
	swamp:2,
	wall:3
}

let cav = {}

let animateId = undefined;

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
	// for (let i = cav.scene.children.length - 1; i >= 0; i--) { 
	// 	if(cav.scene.children[i].type === "Mesh") {
	// 		cav.scene.remove(cav.scene.children[i]); 
	// 	}
	// } 
	// cav.scene.dispose();
	// cav.camera.dispose();
	// cav.renderer.dispose();
	cancelAnimationFrame(animateId);
	animateId = undefined;
}

let timeStep = 0.005;
let step = 0;
function drawRoom(data){
	if(animateId){
		document.body.removeChild( cav.renderer.domElement )
		delCav();
	}
	cav.scene = new THREE.Scene();
	cav.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
	cav.renderer = new THREE.WebGLRenderer();
	cav.renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( cav.renderer.domElement );

	let roomMap = initMap()

	for(let node of data){
		roomMap[node.x][node.y] = terrainDic[node.type];
	}
	async function addBlock(x,y){
		let color = 0x808080;
		let height = 0.1;
		if(roomMap[x][y] == 2){
			color = 0x00ff00;
		}
		else if(roomMap[x][y] == 3){
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
	
	let box = new THREE.BoxGeometry( 50, 0.05 ,50);
	let groundMesh = new THREE.Mesh( box ,
	//			new THREE.MeshPhongMaterial( { color: color} ) );
		new THREE.MeshLambertMaterial({ color: 0x808080 }))
	groundMesh.position.y = 0;
	groundMesh.position.x = 25;
	groundMesh.position.z = 25;	
	cav.scene.add( groundMesh );

	for(let i=0;i<50;i++){
		for(let j=0;j<50;j++){
			if(roomMap[i][j] == 1){
				continue;
			}
			addBlock(i,j)
		}
	}
	// var light = new THREE.AmbientLight( 0x404040 ); // soft white light
	// scene.add( light );
	const sphere = new THREE.SphereGeometry( 0.5, 16, 8 );
	cav.light = new THREE.PointLight( 0x404040, 5, 100 );
	//cav.light.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xffff80 } ) ) );
	cav.light.position.set( 25, 25, 0 );
	cav.scene.add( cav.light );

	cav.camera.position.x = 25;
	cav.camera.position.z = 70;
	cav.camera.position.y = 25;
	cav.camera.lookAt(new THREE.Vector3(25,0,25));

	function animate() {
		animateId = requestAnimationFrame( animate );
		cav.light.position.y = 25 
		cav.light.position.x = Math.cos(step) * 25 + 25;
		cav.light.position.z = Math.sin(step) * 25 + 25;
		step = timeStep + step;
		cav.renderer.render( cav.scene, cav.camera );
	}
	// var controls = new THREE.OrbitControls(camera,renderer.domElement)
	// controls.addEventListener('change', animate)
	animate();
}


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