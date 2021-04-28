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

function drawRoom(data){
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	for(let node of data){
		let color = 0x808080;
		if(node.type == 'swamp'){
			color = 0x00ff00;
		}
		let groundMesh = new THREE.Mesh( new THREE.BoxGeometry( 1, 0.1 ,1),
					new THREE.MeshPhongMaterial( { color: color} ) );
		groundMesh.position.y = 0;
		groundMesh.position.x = node.x;
		groundMesh.position.z = node.y;
		scene.add( groundMesh );
	}
	var light = new THREE.AmbientLight( 0x404040 ); // soft white light
	scene.add( light );
	camera.position.z = 10;
	camera.position.y = 10;
	camera.lookAt(new THREE.Vector3(0,0,0));

	function animate() {
		requestAnimationFrame( animate );
		renderer.render( scene, camera );
	}
	var controls = new THREE.OrbitControls(camera,renderer.domElement)
	controls.addEventListener('change', animate)
	animate();
}