const drawFunc = {
    source: drawSource,
    extension: drawExtension
}

function drawSource(x,y){
    let box = new THREE.BoxGeometry( 1, 2 ,1);
    let groundMesh = new THREE.Mesh( box ,
    //			new THREE.MeshPhongMaterial( { color: color} ) );
        new THREE.MeshLambertMaterial({ color: 0xffff00 }))
    
    groundMesh.position.y = 1;
    groundMesh.position.x = x;
    groundMesh.position.z = y;	
    cav.scene.add( groundMesh );
}

function drawExtension(x,y){
    let geometryIn = new THREE.CylinderGeometry( 0.4, 0.4, 0.3, 32 );
    let materialIn = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    let cylinderIn = new THREE.Mesh( geometryIn, materialIn );
    cylinderIn.position.x = x;
    cylinderIn.position.z = y;
    cylinderIn.position.y = 0.025;

    let geometryOuter = new THREE.CylinderGeometry( 0.6, 0.6, 0.2, 32 );
    let materialOuter = new THREE.MeshBasicMaterial( {color: 0xa0a0a0} );
    let cylinderOuter = new THREE.Mesh( geometryOuter, materialOuter );
    cylinderOuter.position.x = x;
    cylinderOuter.position.z = y;
    cylinderOuter.position.y = 0.015;

    cav.scene.add( cylinderIn );
    cav.scene.add( cylinderOuter );
}