<template>
  <!--
    <div id="Action">
      {{currentTexture}}
    </div>
  -->
</template>

<script>
  /*
   var Vue=require('vue')
   var vm=new Vue({
   el:"#Action",
   data: {
   currentTexture:'a'
   }
   })
   vm.currentTexture='b'
   */
/*
   var wsUri = 'ws://10.131.251.151:8081/websocket';
  //var wsUri = 'ws://localhost:8081/websocket';
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
    websocket = new WebSocket(wsUri);
  }
  websocket.onmessage = function (evt) {
    onMessage(evt)
  };
  function onMessage(evt) {
    //writeToScreen('<span style="color: blue;">RESPONSE: '+ evt.data+'</span>');
    var obj = JSON.parse(evt.data);
    console.log(obj.Action.action)
    if (obj.Action.action == 0) {
      //console.log('Action')
      cubeMaterial = new THREE.MeshBasicMaterial(/!*{color: 0xff0000, opacity: 0.5, transparent: true}*!/{
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
      console.log(objects)

    } else if (obj.Action.action == 1) {
      for (var i = 0; i < objects.length; i++) {
        console.log(objects[i].position.x)
        if ((objects[i].position.x == obj.Action.x) && (objects[i].position.y == obj.Action.y) && (objects[i].position.z == obj.Action.z)) {
          scene.remove(objects[i])
          objects.splice(i, 1)
        }
      }
    }
    render()
    //websocket.close();
  }
*/
  /*dosend(1)*/
  var THREE = require('three')
  //$.getScript
  //include ('three/examples/js/controls/FirstPersonControls.js');
  //document.write('<script src=\'' + '../asserts/three/examples/js/controls/FirstPersonControls.js\'' + '><\/script>')
  var ImprovedNoise = function () {

    var p = [151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10,
      23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237, 149, 56, 87,
      174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211,
      133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208,
      89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5,
      202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119,
      248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232,
      178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249,
      14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205,
      93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180];

    for (var i = 0; i < 256; i++) {

      p[256 + i] = p[i];

    }

    function fade(t) {

      return t * t * t * (t * (t * 6 - 15) + 10);

    }

    function lerp(t, a, b) {

      return a + t * (b - a);

    }

    function grad(hash, x, y, z) {

      var h = hash & 15;
      var u = h < 8 ? x : y, v = h < 4 ? y : h == 12 || h == 14 ? x : z;
      return ((h & 1) == 0 ? u : -u) + ((h & 2) == 0 ? v : -v);

    }

    return {

      noise: function (x, y, z) {

        var floorX = Math.floor(x), floorY = Math.floor(y), floorZ = Math.floor(z);

        var X = floorX & 255, Y = floorY & 255, Z = floorZ & 255;

        x -= floorX;
        y -= floorY;
        z -= floorZ;

        var xMinus1 = x - 1, yMinus1 = y - 1, zMinus1 = z - 1;

        var u = fade(x), v = fade(y), w = fade(z);

        var A = p[X] + Y, AA = p[A] + Z, AB = p[A + 1] + Z, B = p[X + 1] + Y, BA = p[B] + Z, BB = p[B + 1] + Z;

        return lerp(w, lerp(v, lerp(u, grad(p[AA], x, y, z),
          grad(p[BA], xMinus1, y, z)),
          lerp(u, grad(p[AB], x, yMinus1, z),
            grad(p[BB], xMinus1, yMinus1, z))),
          lerp(v, lerp(u, grad(p[AA + 1], x, y, zMinus1),
            grad(p[BA + 1], xMinus1, y, z - 1)),
            lerp(u, grad(p[AB + 1], x, yMinus1, zMinus1),
              grad(p[BB + 1], xMinus1, yMinus1, zMinus1))));

      }
    }
  };


  /**
   * @author mrdoob / http://mrdoob.com/
   * @author alteredq / http://alteredqualia.com/
   * @author paulirish / http://paulirish.com/
   */

  THREE.PointerLockControls = function ( camera,oooo ) {

    var scope = this;

    camera.rotation.set( 0, 0, 0 );
    oooo.rotation.set(0,0,0);

    var pitchObject = new THREE.Object3D();
    pitchObject.add( camera );
    //pitchObject.add( oooo );

    var yawObject = new THREE.Object3D();
    yawObject.position.y = 70;
    yawObject.add( pitchObject );

    var PI_2 = Math.PI / 2;

    var onMouseMove = function ( event ) {

      if ( scope.enabled === false ) return;

      var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
      var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

      yawObject.rotation.y -= movementX * 0.002;
      pitchObject.rotation.x -= movementY * 0.002;
      oooo.rotation.y -= movementX * 0.002

      pitchObject.rotation.x = Math.max( - PI_2, Math.min( PI_2, pitchObject.rotation.x ) );
      //oooo.rotation.x = Math.max( - PI_2, Math.min( PI_2, oooo.rotation.x ) );

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
  //var path=pathArr[curBlk]
  // var Detector = require('three/examples/js/Detector.js')
  var Stats = require('three/examples/js/libs/stats.min.js')


  if (!Detector.webgl) Detector.addGetWebGLMessage()
  var container
  var camera, scene, renderer
  var person_mesh
  var plane
  var mouse
  var raycaster
  var isShiftDown = false
  var doBlkChange = false
  var rollOverMesh, rollOverMaterial
  var cubeGeo, cubeMaterial
  var objects = []

  var container, stats
  var camera, controls, scene, renderer
  var worldWidth = 128
  var worldDepth = 128
  var worldHalfWidth = worldWidth / 2
  var worldHalfDepth = worldDepth / 2
  var data = generateHeight(worldWidth, worldDepth)
  var clock = new THREE.Clock()
  var path
  var controlsEnabled = false;

  var moveForward = false;
  var moveBackward = false;
  var moveLeft = false;
  var moveRight = false;
  var canJump = false;

  var prevTime = performance.now();
  var velocity = new THREE.Vector3();



  init()
  animate()
  //render()



  function init() {


    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 20000)
    //camera.position.y = getY(worldHalfWidth, worldHalfDepth) * 100 + 100
    camera.position.y = 75;
    camera.up.x = 0;
    camera.up.y = 1;
    camera.up.z = 0;
/*
    controls = new THREE.FirstPersonControls(camera)
    controls.movementSpeed = 1000
    controls.lookSpeed = 0.125
    controls.lookVertical = true
*/


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
    /*
     if (doBlkChange) {
     curBlk += 1
     if (curBlk>3) {
     curBlk = 0
     }
     console.log(curBlk)
     path = pathArr[curBlk]
     }
     */
    path = pathArr[curBlk]
    console.log(curBlk)
    console.log(path)
    // cubes
    cubeGeo = new THREE.BoxGeometry(50, 50, 50)
/*
    var blockInfo = require('minecraft-blockinfo')
    var minecraftBlockIdentifier = '_2'
    blockInfo.blocks[minecraftBlockIdentifier]
*/
    /*
     cubeMaterial = new THREE.MeshLambertMaterial({color: 0xfeb74c, map: new THREE.TextureLoader().load(pathArr[1])})
     */
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

    var person = new THREE.BoxGeometry(50, 100, 50)
    var personMaterial = new THREE.MeshBasicMaterial({color: 0xfeb74c, map: new THREE.TextureLoader().load(pathArr[1])})
    person_mesh = new THREE.Mesh(person, personMaterial)
    person_mesh.position.x = camera.position.x
    person_mesh.position.y = camera.position.y - 10
    person_mesh.position.z = camera.position.z

    scene.add(person_mesh)
    controls = new THREE.PointerLockControls( camera ,person_mesh);
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

        //instructions.style.display = '';

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

    var onKeyDown = function ( event ) {

      switch ( event.keyCode ) {

        case 38: // up
        case 87: // w
          moveForward = true;
          break;

        case 37: // left
        case 65: // a
          moveLeft = true; break;

        case 40: // down
        case 83: // s
          moveBackward = true;
          break;

        case 39: // right
        case 68: // d
          moveRight = true;
          break;

        case 32: // space
          if ( canJump === true ) velocity.y += 350;
          canJump = false;
          break;

      }

    };

    var onKeyUp = function ( event ) {

      switch( event.keyCode ) {

        case 38: // up
        case 87: // w
          moveForward = false;
          break;

        case 37: // left
        case 65: // a
          moveLeft = false;
          break;

        case 40: // down
        case 83: // s
          moveBackward = false;
          break;

        case 39: // right
        case 68: // d
          moveRight = false;
          break;

      }

    };

    document.addEventListener( 'keydown', onKeyDown, false );
    document.addEventListener( 'keyup', onKeyUp, false );


    raycaster = new THREE.Raycaster()
    mouse = new THREE.Vector2()
    geometry = new THREE.PlaneBufferGeometry(1000, 1000)
    geometry.rotateX(-Math.PI / 2)
    plane = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({visible: false}))
    scene.add(plane)
    objects.push(plane)
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
    console.log(objects)
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
          console.log(temp)
          console.log(JSON.stringify(temp))
          dosend(JSON.stringify(temp))
          //scene.remove(intersect.object)
          console.log(intersect.object)
          //objects.splice(objects.indexOf(intersect.object), 1)
        }
        // create cube
      } else {
        console.log(curBlk)
        cubeMaterial = new THREE.MeshBasicMaterial(/*{color: 0xff0000, opacity: 0.5, transparent: true}*/{
          color: 0xfeb74c,
          opacity: 0,
          map: new THREE.TextureLoader().load(pathArr[curBlk])
        })

        var voxel = new THREE.Mesh(cubeGeo, cubeMaterial)
        voxel.position.copy(intersect.point).add(intersect.face.normal)
        voxel.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25)
        //scene.add(voxel)
        //objects.push(voxel)
        var temp = {}
        temp['Action'] = {}
        temp['Action']['action'] = 0
        temp['Action']['x'] = voxel.position.x
        temp['Action']['y'] = voxel.position.y
        temp['Action']['z'] = voxel.position.z
        temp['Action']['material'] = curBlk
        console.log(temp)
        /* add blk
         cubeMaterial = new THREE.MeshLambertMaterial({color: 0xfeb74c, map: new THREE.TextureLoader().load(pathArr[curBlk])})
         var voxel = new THREE.Mesh(cubeGeo,cubeMaterial)
         voxel.position.x=50
         voxel.position.y=50
         voxel.position.z=0
         scene.add(voxel)
         objects.push(voxel)
         */
        /* remove blk
         for (var i=0;i<objects.length;i++) {
         console.log(objects[i].position.x)
         if ((objects[i].position.x==50) && (objects[i].position.y==50) && (objects[i].position.z==0)) {
         scene.remove(objects[i])
         objects.splice(i,1)
         }
         }
         */
        console.log(JSON.stringify(temp))
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
        console.log(curBlk);
        path = pathArr[curBlk];
        console.log(path);
        rollOverMaterial.map = new THREE.TextureLoader().load(path);
        rollOverMaterial.map.needsUpdate = true;
        break
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
    }
  }
  function onDocumentKeyPress(event) {
    switch (event.keyCode) {
      case 69:/*E*/
        doBlkChange = true;
        console.log("E");
        break
    }
  }

  function animate() {
    requestAnimationFrame(animate)
    if (controlsEnabled ) {
      raycaster.ray.origin.copy( controls.getObject().position );
      raycaster.ray.origin.y -= 70;

      var intersections = raycaster.intersectObjects( objects );

      var isOnObject = intersections.length > 0;

      var time = performance.now();
      //console.log(time);
      var delta = ( time - prevTime ) / 1000;

      velocity.x -= velocity.x * 10.0 * delta;
      velocity.z -= velocity.z * 10.0 * delta;

      velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

      if ( moveForward ) velocity.z -= 400.0 * delta;
      if ( moveBackward ) velocity.z += 400.0 * delta;

      if ( moveLeft ) velocity.x -= 400.0 * delta;
      if ( moveRight ) velocity.x += 400.0 * delta;

      if ( isOnObject === true ) {
        velocity.y = Math.max( 0, velocity.y );

        canJump = true
      };


      controls.getObject().translateX( velocity.x * delta );
      controls.getObject().translateY( velocity.y * delta );
      controls.getObject().translateZ( velocity.z * delta );
      if ( controls.getObject().position.y < 70 )
      {
        velocity.y = 0;
        controls.getObject().position.y = 70;

        canJump = true;

      }

      prevTime = time;

    }
    person_mesh.position.x=controls.getObject().position.x;
    person_mesh.position.y=controls.getObject().position.y-70;
    person_mesh.position.z=controls.getObject().position.z;
/*    console.log(controls.getObject())
    console.log(person_mesh.position.y)
    console.log(velocity.y);*/

    render()
    //document.getElementById('Action').innerHTML=camera.position.z;
    //stats.update()
  }
  function render() {
    //controls.update(clock.getDelta(), objects, person_mesh)
    renderer.render(scene, camera)
  }

  /*
   function render () {
   renderer.render(scene, camera)
   }
   */
  function generateHeight(width, height) {

    //import()
    //var inosie = require('three/examples/js/ImprovedNoise.js');
    var data = []
    var perlin = new ImprovedNoise()
    var size = width * height
    var quality = 2
    var z = Math.random() * 100
    for (var j = 0; j < 4; j++) {
      if (j === 0) {
        for (var ii = 0; ii < size; ii++) data[ii] = 0
      }
      for (var i = 0; i < size; i++) {
        var x = i % width
        var y = (i / width) | 0
        data[i] += perlin.noise(x / quality, y / quality, z) * quality
      }
      quality *= 4
    }
    return data
  }
  function getY(x, z) {
    return (data[x + z * worldWidth] * 0.2) | 0
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
