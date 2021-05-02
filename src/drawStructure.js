const drawFunc = {
    source: drawSource,
    extension: drawExtension,
    rampart: drawRampart,
    tower: drawTower,
    link: drawLink,
    controller: drawController
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
    let geometryIn = new THREE.CylinderGeometry( 0.3, 0.3, 0.4, 32 );
    let materialIn = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    let cylinderIn = new THREE.Mesh( geometryIn, materialIn );
    cylinderIn.position.x = x;
    cylinderIn.position.z = y;
    cylinderIn.position.y = 0.2;

    let edges1 = new THREE.EdgesGeometry( geometryIn, 90 );
    let line1 = new THREE.LineSegments( edges1, new THREE.LineBasicMaterial( { color: 0xffffff } ) );
    line1.position.x = x;
    line1.position.z = y;
    line1.position.y = 0.2;

    let geometryOuter = new THREE.CylinderGeometry( 0.4, 0.4, 0.3, 32 );
    let materialOuter = new THREE.MeshBasicMaterial( {color: 0xa0a0a0} );
    let cylinderOuter = new THREE.Mesh( geometryOuter, materialOuter );
    cylinderOuter.position.x = x;
    cylinderOuter.position.z = y;
    cylinderOuter.position.y = 0.15;

    let edges2 = new THREE.EdgesGeometry( geometryOuter, 90 );
    let line2 = new THREE.LineSegments( edges2, new THREE.LineBasicMaterial( { color: 0xffffff } ) );
    line2.position.x = x;
    line2.position.z = y;
    line2.position.y = 0.15;

    cav.scene.add( cylinderIn );
    cav.scene.add( cylinderOuter );
    cav.scene.add( line1, line2 );
}

function drawRampart(x,y){
    let geometry = new THREE.BoxGeometry( 1, 2, 1);
    let material = new THREE.MeshBasicMaterial({color: 0xff0000,transparent: true,opacity: 0.3,});;
    let ram = new THREE.Mesh( geometry, material );
    ram.position.x = x;
    ram.position.z = y;
    ram.position.y = 1;
    cav.scene.add( ram );
}

function drawTower(x,y){
    let geometryRed = new THREE.CylinderGeometry( 0.4, 0.4, 0.2, 32 );
    let materialRed = new THREE.MeshBasicMaterial( {color: 0xff0000} );
    let cylinderRed = new THREE.Mesh( geometryRed, materialRed );
    cylinderRed.position.x = x;
    cylinderRed.position.z = y;
    cylinderRed.position.y = 0.1;

    let edges1 = new THREE.EdgesGeometry( geometryRed, 90 );
    let line1 = new THREE.LineSegments( edges1, new THREE.LineBasicMaterial( { color: 0xffffff } ) );
    line1.position.x = x;
    line1.position.z = y;
    line1.position.y = 0.1;

    let geometryBlack = new THREE.CylinderGeometry( 0.35, 0.3, 0.25, 32 );
    let materialBlack = new THREE.MeshBasicMaterial( {color: 0x000000} );
    let cylinderBlack = new THREE.Mesh( geometryBlack, materialBlack );
    cylinderBlack.position.x = x;
    cylinderBlack.position.z = y;
    cylinderBlack.position.y = 0.125;

    // let edges2 = new THREE.EdgesGeometry( geometryBlack, 90 );
    // let line2 = new THREE.LineSegments( edges2, new THREE.LineBasicMaterial( { color: 0xffffff } ) );
    // line2.position.x = x;
    // line2.position.z = y;
    // line2.position.y = 0.125;

    let geometryBody = new THREE.SphereGeometry( 0.3, 40, 40 ,0,Math.PI*2,0,Math.PI/2)
    let materialBody = new THREE.MeshBasicMaterial({color: 0xffff00});;
    let towerBody = new THREE.Mesh( geometryBody, materialBody );
    towerBody.position.x = x;
    towerBody.position.z = y;
    towerBody.position.y = 0.25;

    let geometryBarrel = new THREE.CylinderGeometry( 0.05, 0.05, 0.5, 32 );
    let materialBarrel = new THREE.MeshBasicMaterial( {color: 0x808080} );
    let cylinderBarrel = new THREE.Mesh( geometryBarrel, materialBarrel );
    cylinderBarrel.rotateX(Math.PI/2)
    cylinderBarrel.position.x = x;
    cylinderBarrel.position.z = y-0.25;
    cylinderBarrel.position.y = 0.35;

    cav.scene.add( cylinderBlack, cylinderRed, line1, towerBody, cylinderBarrel );
}

function drawLink(x,y){
    let geometryUp = new THREE.ConeGeometry( 0.3, 0.4, 32 );
    let materialUp = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    let linkUp = new THREE.Mesh( geometryUp, materialUp );
    linkUp.position.x = x;
    linkUp.position.z = y;
    linkUp.position.y = 0.725;

    let geometryDown = new THREE.ConeGeometry( 0.3, 0.4, 32 );
    let materialDown = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    let linkDown = new THREE.Mesh( geometryDown, materialDown );
    linkDown.position.x = x;
    linkDown.position.z = y;
    linkDown.position.y = 0.275;
    linkDown.rotateX(Math.PI)

    cav.scene.add( linkUp, linkDown );
}

function drawController(x,y){
    let geometryDown = new THREE.CylinderBufferGeometry( 0.5, 0.5, 0.18, 8 );
    let materialDown = new THREE.MeshBasicMaterial( {color: 0xa0a0a0} );
    let conDown = new THREE.Mesh( geometryDown, materialDown );
    conDown.position.x = x;
    conDown.position.z = y;
    conDown.position.y = 2.09;

    let edges1 = new THREE.EdgesGeometry( geometryDown, 45 );
    let line1 = new THREE.LineSegments( edges1, new THREE.LineBasicMaterial( { color: 0x0000 } ) );
    line1.position.x = x;
    line1.position.z = y;
    line1.position.y = 2.09;

    let geometryUp = new THREE.CylinderBufferGeometry( 0.3, 0.3, 0.2, 32 );
    let materialUp = new THREE.MeshBasicMaterial( {color: 0x000000} );
    let conUp = new THREE.Mesh( geometryUp, materialUp );
    conUp.position.x = x;
    conUp.position.z = y;
    conUp.position.y = 2.1;

    cav.scene.add( conDown, conUp, line1 );
}