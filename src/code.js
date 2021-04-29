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

function drawRoom(data){
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

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
			
		scene.add( groundMesh );
	}
	
	let box = new THREE.BoxGeometry( 50, 0.05 ,50);
	let groundMesh = new THREE.Mesh( box ,
	//			new THREE.MeshPhongMaterial( { color: color} ) );
		new THREE.MeshLambertMaterial({ color: 0x808080 }))
	groundMesh.position.y = 0;
	groundMesh.position.x = 25;
	groundMesh.position.z = 25;	
	scene.add( groundMesh );

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
	var light = new THREE.PointLight( 0x404040, 10, 100 );
	light.position.set( 25, 10, 25 );
	scene.add( light );

	camera.position.x = 25;
	camera.position.z = 70;
	camera.position.y = 25;
	camera.lookAt(new THREE.Vector3(25,0,25));

	function animate() {
		requestAnimationFrame( animate );
		renderer.render( scene, camera );
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