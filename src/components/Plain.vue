<template>
  <!--
    <div id="Action">
      {{currentTexture}}
    </div>
  -->
</template>

<script>

  var wsUri = 'ws://10.131.251.151:8081/websocket';
  var PersonMesh=require('@/assets/js/PersonModel')

  //var wsUri = 'ws://localhost:8080/mc_server_war_exploded/websocket';
  var websocket = new WebSocket(wsUri);
  var dosend = function () {
  };
  websocket.onopen = function (evt) {
    dosend = function (data) {
      websocket.send(data);
    };
  };
  websocket.onclose = function (evt) {
    dosend = function () {
    };
    websocket = new WebSocket(wsUri);
  };
  websocket.onerror = function (evt) {
      websocket.close();
  }
  websocket.onmessage = function (evt) {
    onMessage(evt)
  };
  function onMessage(evt) {

    var obj = JSON.parse(evt.data);

    if (obj.Person!==undefined) {
      if ((person_list[obj.Person.id]==undefined) && (obj.Person.id!==personal_id)) {
        var temp_person_mesh = new PersonMesh(scene)

        temp_person_mesh.changePosition(obj.Person.x,obj.Person.y,obj.Person.z)
        temp_person_mesh.rotate(0,obj.Person.rotation)
        person_list[obj.Person.id]=temp_person_mesh


      } else {
        if (obj.Person.id==personal_id) {
        } else {
          person_list[obj.Person.id].changePosition(obj.Person.x-person_list[obj.Person.id].bodyMesh.position.x,obj.Person.y-person_list[obj.Person.id].bodyMesh.position.y,obj.Person.z-person_list[obj.Person.id].bodyMesh.position.z)
          person_list[obj.Person.id].rotate(person_list[obj.Person.id].bodyMesh.rotation.y,obj.Person.rotation)
        }

      }
    } else {
      if (obj.Action!==undefined) {
        if (obj.Action.action == 0) {
          //console.log('Action')
          cubeMaterial = new THREE.MeshBasicMaterial(/*{color: 0xff0000, opacity: 0.5, transparent: true}*/{
            color: 0xfeb74c,
            opacity: 0,
            map: new THREE.TextureLoader().load(pathArr[obj.Action.material])
          })

          var voxel = new THREE.Mesh(cubeGeo, cubeMaterial)
          voxel.position.x = obj.Action.x;
          voxel.position.y = obj.Action.y;
          voxel.position.z = obj.Action.z;
          scene.add(voxel)
          objects.push(voxel)


        } else if (obj.Action.action == 1) {
          for (var i = 0; i < objects.length; i++) {

            if ((objects[i].position.x == obj.Action.x) && (objects[i].position.y == obj.Action.y) && (objects[i].position.z == obj.Action.z)) {
              scene.remove(objects[i])
              objects.splice(i, 1)
            }
          }
        }
      } else {
          if (obj.PersonLeave!==undefined) {
            if (person_list[obj.PersonLeave.id]!==undefined) {
                scene.remove(person_list[obj.PersonLeave.id])
                person_list[obj.PersonLeave.id]=undefined
            }
          }
      }
    }
    render()
  }

  var THREE = require('three')


  THREE.PointerLockControls = function ( camera ) {

    var scope = this;

    camera.rotation.set( 0, 0, 0 );

    var pitchObject = new THREE.Object3D();
    pitchObject.add( camera );

    var yawObject = new THREE.Object3D();
    yawObject.position.y = 80;
    yawObject.add( pitchObject );

    var PI_2 = Math.PI / 2;

    var onMouseMove = function ( event ) {

      if ( scope.enabled === false ) return;

      var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
      var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

      yawObject.rotation.y -= movementX * 0.002;
      pitchObject.rotation.x -= movementY * 0.002;

      pitchObject.rotation.x = Math.max( - PI_2, Math.min( PI_2, pitchObject.rotation.x ) );

    };

    this.dispose = function() {

      document.removeEventListener( 'mousemove', onMouseMove, false );

    };

    document.addEventListener( 'mousemove', onMouseMove, false );

    this.enabled = false;

    this.getObject = function () {

      return yawObject;


    };

    this.getDirection = function() {

      // assumes the camera itself is not rotated

      var direction = new THREE.Vector3( 0, 0, - 1 );
      var rotation = new THREE.Euler( 0, 0, 0, "YXZ" );

      return function( v ) {

        rotation.set( pitchObject.rotation.x, yawObject.rotation.y, 0 );

        v.copy( direction ).applyEuler( rotation );

        return v;

      };

    }();

  };

  var Detector = require('three/examples/js/Detector.js')
  var curBlk = 0
  var pathArr = []
  pathArr[0] = require('@/assets/three/examples/textures/minecraft/atlas.png');
  pathArr[1] = require('@/assets/three/examples/textures/minecraft/dirt.png');
  pathArr[2] = require('@/assets/three/examples/textures/minecraft/grass.png');
  pathArr[3] = require('@/assets/three/examples/textures/minecraft/grass_dirt.png');


  if (!Detector.webgl) Detector.addGetWebGLMessage()


  var person_mesh
  var plane
  var mouse
  var raycaster
  var isShiftDown = false
  var doBlkChange = false
  var rollOverMesh, rollOverMaterial
  var cubeGeo, cubeMaterial
  var objects = []
  var person_list=[]
  var personal_id=0

  var container
  var camera, controls, scene, renderer

  var clock = new THREE.Clock()
  var path
  var controlsEnabled = false;
  var count =0





//move
  var moveForward = false;
  var moveBackward = false;
  var moveLeft = false;
  var moveRight = false;


  var jumping = false;
  var falling = false;
  var jumpingHight = 0;


  var movementSpeed = 100;
  var target = new THREE.Vector3(0,0,0);


  init()
  animate()

  function init() {


    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 20000)


    camera.position.z=-11.25

    camera.up.x = 0;
    camera.up.y = 1;
    camera.up.z = 0;

    personal_id=uuid();

    container = document.createElement('div')
    document.body.appendChild(container)
    var info = document.createElement('div')
    info.style.position = 'absolute'
    info.style.top = '10px'
    info.style.width = '100%'
    info.style.textAlign = 'center'
    info.innerHTML = '<a href="http://threejs.org" target="_blank">three.js</a> - voxel painter - webgl<br><strong>click</strong>: add voxel, <strong>shift + click</strong>: remove voxel'
    container.appendChild(info)

    scene = new THREE.Scene()

    // roll-over helpers
    var rollOverGeo = new THREE.BoxGeometry(50, 50, 50)
    rollOverMaterial = new THREE.MeshBasicMaterial(/*{color: 0xff0000, opacity: 0.5, transparent: true}*/{
      color: 0xfeb74c,
      opacity: 0,
      map: new THREE.TextureLoader().load(pathArr[0])
    })
    rollOverMesh = new THREE.Mesh(rollOverGeo, rollOverMaterial)
    scene.add(rollOverMesh)


    path = pathArr[curBlk]

    // cubes
    cubeGeo = new THREE.BoxGeometry(50, 50, 50)

    // grid
    var size = 500
    var step = 50
    var geometry = new THREE.Geometry()
    for (var i = -size; i <= size; i += step) {
      geometry.vertices.push(new THREE.Vector3(-size, 0, i))
      geometry.vertices.push(new THREE.Vector3(size, 0, i))
      geometry.vertices.push(new THREE.Vector3(i, 0, -size))
      geometry.vertices.push(new THREE.Vector3(i, 0, size))
    }
    var material = new THREE.LineBasicMaterial({color: 0x000000, opacity: 0.2, transparent: true})
    var line = new THREE.LineSegments(geometry, material)
    scene.add(line)


    person_mesh=new PersonMesh(scene)

    controls = new THREE.PointerLockControls(camera);


    var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

    if ( havePointerLock ) {

      var element = document.body;

      element.addEventListener('click',function(event) {
        element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
        element.requestPointerLock();
      },false);

      var pointerlockchange = function ( event ) {
        if ( document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element ) {
          controlsEnabled = true;
          controls.enabled = true;
        } else {
          controls.enabled = false;
        }

      };

      var pointerlockerror = function ( event ) {
      };

      // Hook pointer lock state change events
      document.addEventListener( 'pointerlockchange', pointerlockchange, false );
      document.addEventListener( 'mozpointerlockchange', pointerlockchange, false );
      document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false );

      document.addEventListener( 'pointerlockerror', pointerlockerror, false );
      document.addEventListener( 'mozpointerlockerror', pointerlockerror, false );
      document.addEventListener( 'webkitpointerlockerror', pointerlockerror, false );
    }
    scene.add( controls.getObject() );



    raycaster = new THREE.Raycaster()
    mouse = new THREE.Vector2()
    geometry = new THREE.PlaneBufferGeometry(1000, 1000)
    geometry.rotateX(-Math.PI / 2)
    plane = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({visible: false}))
    scene.add(plane)
    objects.push(plane)
    //console.log(plane)
    // Lights
    var ambientLight = new THREE.AmbientLight(0x606060)
    scene.add(ambientLight)
    var directionalLight = new THREE.DirectionalLight(0xffffff)
    directionalLight.position.set(1, 0.75, 0.5).normalize()
    scene.add(directionalLight)
    renderer = new THREE.WebGLRenderer({antialias: true})
    renderer.setClearColor(0xf0f0f0)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    container.appendChild(renderer.domElement)
    document.addEventListener('keypress', onDocumentKeyPress, false)
    document.addEventListener('mousemove', onDocumentMouseMove, false)
    document.addEventListener('mousedown', onDocumentMouseDown, false)
    document.addEventListener('keydown', onDocumentKeyDown, false)
    document.addEventListener('keyup', onDocumentKeyUp, false)
    window.addEventListener('resize', onWindowResize, false)


  }
  function uuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
  }
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
    //controls.handleResize()
  }
  function onDocumentMouseMove(event) {
    event.preventDefault()
    mouse.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1)
    raycaster.setFromCamera(mouse, camera)
    var intersects = raycaster.intersectObjects(objects)
    if (intersects.length > 0) {
      var intersect = intersects[0]
      rollOverMesh.position.copy(intersect.point).add(intersect.face.normal)
      rollOverMesh.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25)
    }
    render()
  }
  function onDocumentMouseDown(event) {
    event.preventDefault()
    mouse.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1)
    raycaster.setFromCamera(mouse, camera)
    var intersects = raycaster.intersectObjects(objects)
//    console.log(objects)
    if (intersects.length > 0) {
      var intersect = intersects[0]
      // delete cube
      if (isShiftDown) {
        if (intersect.object !== plane) {
          var temp = {}
          temp['Action'] = {}
          temp['Action']['action'] = 1
          temp['Action']['x'] = intersect.object.position.x
          temp['Action']['y'] = intersect.object.position.y
          temp['Action']['z'] = intersect.object.position.z
          temp['Action']['material'] = curBlk

          dosend(JSON.stringify(temp))

        }
        // create cube
      } else {

        cubeMaterial = new THREE.MeshBasicMaterial(/*{color: 0xff0000, opacity: 0.5, transparent: true}*/{
          color: 0xfeb74c,
          opacity: 0,
          map: new THREE.TextureLoader().load(pathArr[curBlk])
        })

        var voxel = new THREE.Mesh(cubeGeo, cubeMaterial)
        voxel.position.copy(intersect.point).add(intersect.face.normal)
        voxel.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25)

        var temp = {}
        temp['Action'] = {}
        temp['Action']['action'] = 0
        temp['Action']['x'] = voxel.position.x
        temp['Action']['y'] = voxel.position.y
        temp['Action']['z'] = voxel.position.z
        temp['Action']['material'] = curBlk

        dosend(JSON.stringify(temp))
      }
      render()
    }
  }
  function onDocumentKeyDown(event) {
    switch (event.keyCode) {
      case 16:
        isShiftDown = true;
        break
      case 69:/*E*/
        doBlkChange = true;
        curBlk += 1;
        if (curBlk > 3) {
          curBlk = 0
        }
        path = pathArr[curBlk];

        rollOverMaterial.map = new THREE.TextureLoader().load(path);
        rollOverMaterial.map.needsUpdate = true;
        break
      case 38: /*up*/
      case 87: /*W*/
        moveForward = true;
        break;

      case 37: /*left*/
      case 65: /*A*/
        moveLeft = true;
        break;

      case 40: /*down*/
      case 83: /*S*/
        moveBackward = true;
        break;

      case 39: /*right*/
      case 68: /*D*/
        moveRight = true;
        break;



    }
  }
  function onDocumentKeyUp(event) {
    switch (event.keyCode) {
      case 16:
        isShiftDown = false;
        break
      case 69:/*E*/
        doBlkChange = false;
        break
      case 38: /*up*/
      case 87: /*W*/
        moveForward = false;
        break;

      case 37: /*left*/
      case 65: /*A*/
        moveLeft = false;
        break;

      case 40: /*down*/
      case 83: /*S*/
        moveBackward = false;
        break;

      case 39: /*right*/
      case 68: /*D*/
        moveRight = false;
        break;

    }
  }
  function onDocumentKeyPress(event) {
    switch (event.keyCode) {
      case 69:/*E*/
        doBlkChange = true;
        break
      case 32: /*space*/
          jumping = true;
          break;
    }
  }

  function animate() {

    requestAnimationFrame(animate)
    moveUpdate();
    render()

  }
  function render() {
    renderer.render(scene, camera)
  }

  function moveUpdate() {

    var controlObject = controls.getObject();
    var delta = clock.getDelta();

    count+=1
    if (count==20) count=0


//--------------------------------------------------------------------------------------------------

    var actualMoveSpeed = delta * movementSpeed;




    var target;

    for (var i in person_list) {
      if (person_list[i]!==undefined) {
          target = person_list[i].bodyMesh;
          break;
      }
    }

    var localVertex = controlObject.position.clone()
    if (target!==undefined) {
      var controlObject1 = controlObject.clone();

      controlObject1.lookAt(target.position);
      controlObject1.translateZ(actualMoveSpeed);
      controlObject1.position.y = controlObject.position.y;

      var targetPosition = controlObject1.position.clone();



      var directionVector = targetPosition.sub(localVertex).normalize();

      var crash = collisionDetect(localVertex, directionVector, objects, 20+actualMoveSpeed);


      if (!crash) {
        controlObject.position.x = controlObject1.position.x;
        controlObject.position.y = controlObject1.position.y;
        controlObject.position.z = controlObject1.position.z;


      }

      else jumping = true;

    }




    if (jumping) {
      if (falling) {
        jumping = false;
      }
      else {

        var upVector = new THREE.Vector3(0, 1, 0)
        var localV = localVertex.clone();
        var upCrash = collisionDetect(localV, upVector, objects, 5);
        if (upCrash) {
          jumping = false;
          falling = true;
          jumpingHight = 0;
        } else {
          controlObject.position.y += 5;
          jumpingHight += 5;
          if (jumpingHight >= 60) {
            jumping = false;
            jumpingHight = 0;
            falling = true;
          }
        }


      }

    }
    if (!jumping) {
      var downVector = new THREE.Vector3(0, -1, 0)
      var localV = localVertex.clone();
      var downCrash = collisionDetect(localV, downVector, objects, 5)
      if ((downCrash)) falling = false;
      else if (controlObject.position.y <= 80) {
        controlObject.position.y = 80;
        falling = false;
      }
      else {
        falling = true;
        controlObject.position.y -= 5;
      }

    }
    person_mesh.changePosition(controlObject.position.x-person_mesh.bodyMesh.position.x,controlObject.position.y-35-person_mesh.bodyMesh.position.y,controlObject.position.z-person_mesh.bodyMesh.position.z)
    var previousRotation=person_mesh.bodyMesh.rotation.y
    var currentRotation=controlObject.rotation.y;
    person_mesh.rotate(previousRotation,currentRotation)

    var temp = {}
    temp['Person'] = {}
    temp['Person']['id'] = personal_id
    temp['Person']['x'] = person_mesh.bodyMesh.position.x
    temp['Person']['y'] = person_mesh.bodyMesh.position.y
    temp['Person']['z'] = person_mesh.bodyMesh.position.z
    temp['Person']['rotation'] = person_mesh.bodyMesh.rotation.y

    if (count==0)
    dosend(JSON.stringify(temp))

  }

  function collisionDetect(localVertex, directionVector, objects, checkdistance) {

    var bodyHalfSize = 20;
    var bodyHeight = 75;
    //detect 8 points
    var normalizedDirectionVector = directionVector.clone().normalize();

    var leftDeltaX = (-normalizedDirectionVector.z) * bodyHalfSize;
    var leftDeltaZ = normalizedDirectionVector.x * bodyHalfSize;
    var rightDeltaX = normalizedDirectionVector.z * bodyHalfSize;
    var rightDeltaZ = (-normalizedDirectionVector.x) * bodyHalfSize;

    var deltaX = [0, 0,           0,              leftDeltaX, leftDeltaX,   leftDeltaX,     rightDeltaX,  rightDeltaX,  rightDeltaX]
    var deltaY = [0, -bodyHeight, -bodyHeight/2,  0,          -bodyHeight,  -bodyHeight/2,  0,            -bodyHeight,  -bodyHeight/2]
    var deltaZ = [0, 0,           0,              leftDeltaZ, leftDeltaZ,   leftDeltaZ,     rightDeltaZ,  rightDeltaZ,  rightDeltaZ]

    for (var i = 0; i < deltaX.length; i++) {
      var vertex = localVertex.clone();
      vertex.x = localVertex.x + deltaX[i];
      vertex.y = localVertex.y + deltaY[i];
      vertex.z = localVertex.z + deltaZ[i];
      var ray = new THREE.Raycaster(vertex, normalizedDirectionVector)
      var collisionResults = ray.intersectObjects(objects)
      if (collisionResults.length > 0 && collisionResults[0].distance <= checkdistance) {
        return true;   // crash 是一个标记变量
      }
    }

    return false;
  }

</script>
<style>
  html, body {
    width: 100%;
    height: 100%;
  }

  body {
    background-color: #ffffff;
    margin: 0;
    overflow: hidden;
    font-family: arial;
  }
  #blocker {

    position: absolute;

    width: 100%;
    height: 100%;

    background-color: rgba(0,0,0,0.5);

  }

  #instructions {

    width: 100%;
    height: 100%;

    display: -webkit-box;
    display: -moz-box;
    display: box;

    -webkit-box-orient: horizontal;
    -moz-box-orient: horizontal;
    box-orient: horizontal;

    -webkit-box-pack: center;
    -moz-box-pack: center;
    box-pack: center;

    -webkit-box-align: center;
    -moz-box-align: center;
    box-align: center;

    color: #ffffff;
    text-align: center;

    cursor: pointer;

  }

</style>
