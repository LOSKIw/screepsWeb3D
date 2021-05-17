const drawFunc = {
    source: drawSource,
    extension: drawExtension,
    rampart: drawRampart,
    tower: drawTower,
    link: drawLink,
    controller: drawController,
    nuker: drawNuker,
    lab: drawLab,
    observer: drawObserver,
    road: drawRoad
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
    let materialIn = new THREE.MeshLambertMaterial( {color: 0xffff00} );
    let cylinderIn = new THREE.Mesh( geometryIn, materialIn );
    cylinderIn.position.x = x;
    cylinderIn.position.z = y;
    cylinderIn.position.y = 0.2;

    let geometryOuter = new THREE.CylinderGeometry( 0.4, 0.4, 0.3, 32 );
    let materialOuter = new THREE.MeshLambertMaterial( {color: 0xa0a0a0} );
    let cylinderOuter = new THREE.Mesh( geometryOuter, materialOuter );
    cylinderOuter.position.x = x;
    cylinderOuter.position.z = y;
    cylinderOuter.position.y = 0.15;

    cav.scene.add( cylinderIn );
    cav.scene.add( cylinderOuter );
}

function drawRampart(x,y){
    let geometry = new THREE.BoxGeometry( 1, 2, 1);
    let material = new THREE.MeshLambertMaterial({color: 0xff0000, transparent: true,opacity: 0.3,});;
    let ram = new THREE.Mesh( geometry, material );
    ram.position.x = x;
    ram.position.z = y;
    ram.position.y = 1;
    cav.scene.add( ram );
}

function drawTower(x,y){
    let geometryRed = new THREE.CylinderGeometry( 0.4, 0.4, 0.2, 32 );
    let materialRed = new THREE.MeshLambertMaterial( {color: 0xff0000} );
    let cylinderRed = new THREE.Mesh( geometryRed, materialRed );
    cylinderRed.position.x = x;
    cylinderRed.position.z = y;
    cylinderRed.position.y = 0.1;

    let geometryBlack = new THREE.CylinderGeometry( 0.35, 0.3, 0.25, 32 );
    let materialBlack = new THREE.MeshLambertMaterial( {color: 0x000000} );
    let cylinderBlack = new THREE.Mesh( geometryBlack, materialBlack );
    cylinderBlack.position.x = x;
    cylinderBlack.position.z = y;
    cylinderBlack.position.y = 0.125;

    let geometryBody = new THREE.SphereGeometry( 0.3, 40, 40 ,0,Math.PI*2,0,Math.PI/2)
    let materialBody = new THREE.MeshLambertMaterial({color: 0xffff00});;
    let towerBody = new THREE.Mesh( geometryBody, materialBody );
    towerBody.position.x = x;
    towerBody.position.z = y;
    towerBody.position.y = 0.25;

    let geometryBarrel = new THREE.CylinderGeometry( 0.05, 0.05, 0.5, 32 );
    let materialBarrel = new THREE.MeshLambertMaterial( {color: 0x808080} );
    let cylinderBarrel = new THREE.Mesh( geometryBarrel, materialBarrel );
    cylinderBarrel.rotateX(Math.PI/2)
    cylinderBarrel.position.x = x;
    cylinderBarrel.position.z = y-0.25;
    cylinderBarrel.position.y = 0.35;

    cav.scene.add( cylinderBlack, cylinderRed, towerBody, cylinderBarrel );
}

function drawLink(x,y){
    let geometryUp = new THREE.ConeGeometry( 0.3, 0.4, 32 );
    let materialUp = new THREE.MeshLambertMaterial( {color: 0xffff00} );
    let linkUp = new THREE.Mesh( geometryUp, materialUp );
    linkUp.position.x = x;
    linkUp.position.z = y;
    linkUp.position.y = 0.7;

    let geometryDown = new THREE.ConeGeometry( 0.3, 0.4, 32 );
    let materialDown = new THREE.MeshLambertMaterial( {color: 0xffff00} );
    let linkDown = new THREE.Mesh( geometryDown, materialDown );
    linkDown.position.x = x;
    linkDown.position.z = y;
    linkDown.position.y = 0.3;
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

    let edges1 = new THREE.EdgesGeometry( geometryDown, 30 );
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

function drawNuker(x,y){
    let geometryB1 = new THREE.CylinderGeometry( 0.38, 0.4, 0.05, 32 );
    let materialB1 = new THREE.MeshLambertMaterial( {color: 0x000000} );
    let cylinderB1 = new THREE.Mesh( geometryB1, materialB1 );
    cylinderB1.position.x = x;
    cylinderB1.position.z = y;
    cylinderB1.position.y = 0.025;

    let geometryB2 = new THREE.CylinderGeometry( 0.36, 0.38, 0.1, 32 );
    let materialB2 = new THREE.MeshLambertMaterial( {color: 0xffffff} );
    let cylinderB2 = new THREE.Mesh( geometryB2, materialB2 );
    cylinderB2.position.x = x;
    cylinderB2.position.z = y;
    cylinderB2.position.y = 0.1;

    let geometryB3 = new THREE.CylinderGeometry( 0.34, 0.36, 0.05, 32 );
    let materialB3 = new THREE.MeshLambertMaterial( {color: 0x000000} );
    let cylinderB3 = new THREE.Mesh( geometryB3, materialB3 );
    cylinderB3.position.x = x;
    cylinderB3.position.z = y;
    cylinderB3.position.y = 0.175;

    let geometryUp = new THREE.ConeGeometry( 0.34, 0.80, 32 );
    let materialUp = new THREE.MeshLambertMaterial( {color: 0xffff00} );
    let cylinderUp = new THREE.Mesh( geometryUp, materialUp );
    cylinderUp.position.x = x;
    cylinderUp.position.z = y;
    cylinderUp.position.y = 0.6;

    cav.scene.add( cylinderB1, cylinderB2, cylinderB3 );
    cav.scene.add( cylinderUp );
}

function drawLab(x,y){
    let geometry = new THREE.SphereGeometry( 0.5, 64, 64 );
    let material = new THREE.MeshLambertMaterial( { color: 0xffffff } );
    let sphere = new THREE.Mesh( geometry, material );
    sphere.position.x = x;
    sphere.position.z = y;
    sphere.position.y = 0.5;

    let geometryB = new THREE.CylinderGeometry( 0.4, 0.4, 0.3, 32 );
    let materialB = new THREE.MeshLambertMaterial( {color: 0xffff00 } );
    let cylinderB = new THREE.Mesh( geometryB, materialB );
    cylinderB.position.x = x;
    cylinderB.position.z = y;
    cylinderB.position.y = 0.15;

    cav.scene.add( cylinderB );
    cav.scene.add( sphere );
}

function drawObserver(x,y){

    let geometryB = new THREE.CylinderGeometry( 0.1, 0.3, 0.5, 32 );
    let materialB = new THREE.MeshLambertMaterial( {color: 0x808080 } );
    let cylinderB = new THREE.Mesh( geometryB, materialB );
    cylinderB.position.x = x;
    cylinderB.position.z = y;
    cylinderB.position.y = 0.25;

    let geometryUp = new THREE.ConeGeometry( 0.05, 0.9, 32 );
    let materialUp = new THREE.MeshLambertMaterial( {color: 0x808080 } );
    let cylinderUp = new THREE.Mesh( geometryUp, materialUp );
    cylinderUp.position.x = x;
    cylinderUp.position.z = y;
    cylinderUp.position.y = 0.95;

    let geometry = new THREE.SphereGeometry( 0.05, 64, 64 );
    let material = new THREE.MeshLambertMaterial( { color: 0xff0000 } );
    let sphere = new THREE.Mesh( geometry, material );
    sphere.position.x = x;
    sphere.position.z = y;
    sphere.position.y = 1.375;

    cav.scene.add( cylinderB, cylinderUp, sphere)

    let geometryR1 = new THREE.TorusGeometry( 0.4, 0.05, 32, 100 );
    let materialR1 = new THREE.MeshLambertMaterial( { color: 0x808080 } );
    let torusR1 = new THREE.Mesh( geometryR1, materialR1 );
    torusR1.rotateX(Math.PI/2)
    torusR1.position.x = x;
    torusR1.position.z = y;
    torusR1.position.y = 0.5;

    let geometryR2 = new THREE.TorusGeometry( 0.25, 0.05, 32, 100 );
    let materialR2 = new THREE.MeshLambertMaterial( { color: 0xff8080 } );
    let torusR2 = new THREE.Mesh( geometryR2, materialR2 );
    torusR2.rotateX(Math.PI/2)
    torusR2.position.x = x;
    torusR2.position.z = y;
    torusR2.position.y = 0.8;

    let geometryR3 = new THREE.TorusGeometry( 0.1, 0.05, 32, 100 );
    let materialR3 = new THREE.MeshLambertMaterial( { color: 0xff0000 } );
    let torusR3 = new THREE.Mesh( geometryR3, materialR3 );
    torusR3.rotateX(Math.PI/2)
    torusR3.position.x = x;
    torusR3.position.z = y;
    torusR3.position.y = 1.1;

    cav.scene.add( torusR1, torusR2, torusR3 );
}

function drawRoad(x,y){
    // let geometry = new THREE.CylinderGeometry( 0.4, 0.2, 0.15, 32 );
    let geometry = new THREE.BoxGeometry( 1, 0.2, 1);
    let material = new THREE.MeshLambertMaterial( {color: 0xa0a0a0} );
    let cylinder = new THREE.Mesh( geometry, material );
    cylinder.position.x = x;
    cylinder.position.z = y;
    cylinder.position.y = 0.075;

    cav.scene.add( cylinder );
}

const dirLoc = [[-1,0],[1,0],[0,1],[0,-1]];
const unDirLoc = [[-1,-1],[1,1],[-1,1],[1,-1]];


function isContained(array, element) {  // 判断二维数组array中是否存在一维数组element
    for (let el of array) {
        if (el.length === element.length) {
            for (let index in el) {
                if (el[index] !== element[index]) {
                    break;
                }
                if (index == (el.length - 1)) {    // 到最后一个元素都没有出现不相等，就说明这两个数组相等。
                    return true;
                }
            }
        }
    }
    return false;
}

function connectRoad(){
    while(roadList.length > 0){
        let node = roadList.shift();
        for(let dir of dirLoc){
            let temp = [node[0]+dir[0],node[1]+dir[1]];
            if(isContained(roadList,temp)){
                let geometry = new THREE.BoxGeometry( 1, 0.2, 0.2 );
                let material = new THREE.MeshLambertMaterial( {color: 0x808080} );
                let cube = new THREE.Mesh( geometry, material );
                //cube.lookAt(new THREE.Vector3(temp[0],0.1,temp[1]))
                cube.position.x = node[0];
                cube.position.z = node[1];
                cube.position.y = 0.1;
                
                cav.scene.add( cube );
            }
        }
    }
}