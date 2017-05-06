<template>

</template>
<script>
  var THREE = require('three')
  //$.getScript
  //include ('three/examples/js/controls/FirstPersonControls.js');
  //document.write('<script src=\'' + '../asserts/three/examples/js/controls/FirstPersonControls.js\'' + '><\/script>')
  var ImprovedNoise = function () {

    var p = [ 151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,
      23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,
      174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,
      133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,
      89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,
      202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,
      248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,
      178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,
      14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,
      93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180 ];

    for (var i = 0; i < 256 ; i ++) {

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
      return ((h&1) == 0 ? u : -u) + ((h&2) == 0 ? v : -v);

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

  THREE.FirstPersonControls = function ( object, domElement ) {

    this.object = object;
    this.target = new THREE.Vector3( 0, 0, 0 );

    this.domElement = ( domElement !== undefined ) ? domElement : document;

    this.enabled = true;

    this.movementSpeed = 1.0;
    this.lookSpeed = 0.005;

    this.lookVertical = true;
    this.autoForward = false;

    this.activeLook = true;

    this.heightSpeed = false;
    this.heightCoef = 1.0;
    this.heightMin = 0.0;
    this.heightMax = 1.0;

    this.constrainVertical = false;
    this.verticalMin = 0;
    this.verticalMax = Math.PI;

    this.autoSpeedFactor = 0.0;

    this.mouseX = 0;
    this.mouseY = 0;
    this.doViewChange = false;

    this.lat = 0;
    this.lon = 0;
    this.phi = 0;
    this.theta = 0;

    this.moveForward = false;
    this.moveBackward = false;
    this.moveLeft = false;
    this.moveRight = false;
    this.jumping = false;
    this.falling = false;
    this.jumpingHight = 0;

    this.mouseDragOn = false;

    this.viewHalfX = 0;
    this.viewHalfY = 0;

    if ( this.domElement !== document ) {

      this.domElement.setAttribute( 'tabindex', - 1 );

    }

    //

    this.handleResize = function () {

      if ( this.domElement === document ) {

        this.viewHalfX = window.innerWidth / 2;
        this.viewHalfY = window.innerHeight / 2;

      } else {

        this.viewHalfX = this.domElement.offsetWidth / 2;
        this.viewHalfY = this.domElement.offsetHeight / 2;

      }

    };

/*
    this.onMouseDown = function ( event ) {

      if ( this.domElement !== document ) {

        this.domElement.focus();

      }

      event.preventDefault();
      event.stopPropagation();

      if ( this.activeLook ) {

        switch ( event.button ) {

          case 0: this.moveForward = true; break;
          case 2: this.moveBackward = true; break;

        }

      }

      this.mouseDragOn = true;

    };
*/

/*
    this.onMouseUp = function ( event ) {

      event.preventDefault();
      event.stopPropagation();

      if ( this.activeLook ) {

        switch ( event.button ) {

          case 0: this.moveForward = false; break;
          case 2: this.moveBackward = false; break;

        }

      }

      this.mouseDragOn = false;

    };
*/

    this.onMouseMove = function ( event ) {

      if ( this.domElement === document ) {

        this.mouseX = event.pageX - this.viewHalfX;
        this.mouseY = event.pageY - this.viewHalfY;

      } else {

        this.mouseX = event.pageX - this.domElement.offsetLeft - this.viewHalfX;
        this.mouseY = event.pageY - this.domElement.offsetTop - this.viewHalfY;

      }

    };

    this.onKeyDown = function ( event ) {

      //event.preventDefault();

      switch ( event.keyCode ) {

        case 38: /*up*/
        case 87: /*W*/ this.moveForward = true; break;

        case 37: /*left*/
        case 65: /*A*/ this.moveLeft = true; break;

        case 40: /*down*/
        case 83: /*S*/ this.moveBackward = true; break;

        case 39: /*right*/
        case 68: /*D*/ this.moveRight = true; break;

        case 90: /*Z*/
              this.doViewChange = true; break;

/*
        case 82: /!*R*!/ this.moveUp = true; break;
        case 70: /!*F*!/ this.moveDown = true; break;
*/

      }

    };

    this.onKeyUp = function ( event ) {

      switch ( event.keyCode ) {

        case 38: /*up*/
        case 87: /*W*/ this.moveForward = false; break;

        case 37: /*left*/
        case 65: /*A*/ this.moveLeft = false; break;

        case 40: /*down*/
        case 83: /*S*/ this.moveBackward = false; break;

        case 39: /*right*/
        case 68: /*D*/ this.moveRight = false; break;

        case 90: /*Z*/
            this.doViewChange = false; break;

/*
        case 82: /!*R*!/ this.moveUp = false; break;
        case 70: /!*F*!/ this.moveDown = false; break;
*/

      }

    };

    this.onKeyPress = function(event) {
        switch(event.keyCode){
          case 32: /*space*/
                this.jumping = true; break;
        }
    }

    this.update = function( delta,oooo ) {

      if ( this.enabled === false ) return;


      if (!this.doViewChange){
          this.mouseX = 0;
          this.mouseY = 0;
      }



      if ( this.heightSpeed ) {

        var y = THREE.Math.clamp( this.object.position.y, this.heightMin, this.heightMax );
        var heightDelta = y - this.heightMin;

        this.autoSpeedFactor = delta * ( heightDelta * this.heightCoef );

      } else {

        this.autoSpeedFactor = 0.0;

      }

      var actualLookSpeed = delta * this.lookSpeed;

      if ( ! this.activeLook ) {

        actualLookSpeed = 0;

      }

      var verticalLookRatio = 1;

      if ( this.constrainVertical ) {

        verticalLookRatio = Math.PI / ( this.verticalMax - this.verticalMin );

      }

      this.lon += this.mouseX * actualLookSpeed;
      if ( this.lookVertical ) this.lat -= this.mouseY * actualLookSpeed * verticalLookRatio;

      this.lat = Math.max( - 85, Math.min( 85, this.lat ) );
      this.phi = THREE.Math.degToRad( 90 - this.lat );

      this.theta = THREE.Math.degToRad( this.lon );

      if ( this.constrainVertical ) {

        this.phi = THREE.Math.mapLinear( this.phi, 0, Math.PI, this.verticalMin, this.verticalMax );

      }

      var actualMoveSpeed = delta * this.movementSpeed;
      var actualForwardMoveSpeed = actualMoveSpeed;
      var actualBackwardMoveSpeed = actualMoveSpeed;
      var actualLeftMoveSpeed = actualMoveSpeed;
      var actualRightMoveSpeed = actualMoveSpeed;
      var targetPosition = this.target,
        position = this.object.position
      targetPosition.x = position.x + 100 * Math.sin( this.phi ) * Math.cos( this.theta );
      targetPosition.y = position.y + 100 * Math.cos( this.phi );
      targetPosition.z = position.z + 100 * Math.sin( this.phi ) * Math.sin( this.theta );

      var localVertex = this.object.position.clone()
      var globalVertex = targetPosition.clone()
      var directionVector = globalVertex.sub(localVertex).normalize();

      var forwardCrash = collisionDetect(localVertex, directionVector, oooo, actualMoveSpeed+25);
      if (forwardCrash) {
        actualForwardMoveSpeed=0;
      }


      var directionVector1=directionVector.clone()
      directionVector1.x=-directionVector.x
      directionVector1.z=-directionVector.z
      var  backwardCrash = collisionDetect(localVertex, directionVector1, oooo, actualMoveSpeed+25);
      if (backwardCrash) {
        actualBackwardMoveSpeed=0;
      }

      var directionVector2=directionVector.clone()
      directionVector2.x = directionVector.z
      directionVector2.z = -directionVector.x
      var leftCrash = collisionDetect(localVertex, directionVector2, oooo, actualMoveSpeed+25);
      if (leftCrash) {
        actualLeftMoveSpeed=0;
      }

      var directionVector3=directionVector.clone()
      directionVector3.x = -directionVector.z
      directionVector3.z = directionVector.x
      var rightCrash = collisionDetect(localVertex, directionVector3, oooo, actualMoveSpeed+25);
      if (rightCrash) {
        actualRightMoveSpeed=0;
      }
//      document.getElementById('test').innerHTML=actualMoveSpeed+ " ha "+directionVector.length();

      this.object.lookAt( targetPosition );
      var nowPositionY = this.object.position.y;

      if ( this.moveForward || ( this.autoForward && ! this.moveBackward ) ) this.object.translateZ( - ( actualForwardMoveSpeed + this.autoSpeedFactor ) );
      if ( this.moveBackward ) this.object.translateZ( actualBackwardMoveSpeed );

      if (this.moveLeft) this.object.translateX(-actualLeftMoveSpeed);
      if (this.moveRight) this.object.translateX(actualRightMoveSpeed);

      this.object.position.y = nowPositionY;


      if (this.jumping) {
          //alert('jumping!: falling:'+ this.falling);
          if (this.falling) {
            this.jumping = false;
          }
          else{

            var upVector = new THREE.Vector3(0,1,0)
            var localV = localVertex.clone();
            var upCrash = collisionDetect(localV, upVector,oooo, 4);
            if (upCrash) {
              this.jumping = false;
              this.falling = true;
              this.jumpingHight = 0;
            }else{
              this.object.position.y +=5;
              this.jumpingHight += 5;
              if (this.jumpingHight>=60){
                this.jumping = false;
                this.jumpingHight = 0;
                this.falling =true;
              }
            }


          }

      }
      if (!this.jumping){
        var downVector =  new THREE.Vector3( 0, -1, 0 )
        var localV = localVertex.clone();
        var downCrash = collisionDetect(localV, downVector,oooo, 39)
        if ((downCrash)) this.falling = false;
        else if (this.object.position.y <=75){
          this.object.position.y = 75;
          this.falling = false;
        }
        else{
            this.falling = true;
            this.object.position.y -= 5;
        }

      }
      person_mesh.position.x=this.object.position.x;
      person_mesh.position.z=this.object.position.z;
      person_mesh.position.y=this.object.position.y-70;
      document.getElementById('test').innerHTML = this.object.position.y;
/*
      if ( this.moveUp ) this.object.translateY( actualMoveSpeed );
      if ( this.moveDown ) this.object.translateY( - actualMoveSpeed );
*/
/*
      var actualLookSpeed = delta * this.lookSpeed;

      if ( ! this.activeLook ) {

        actualLookSpeed = 0;

      }

      var verticalLookRatio = 1;

      if ( this.constrainVertical ) {

        verticalLookRatio = Math.PI / ( this.verticalMax - this.verticalMin );

      }

      this.lon += this.mouseX * actualLookSpeed;
      if ( this.lookVertical ) this.lat -= this.mouseY * actualLookSpeed * verticalLookRatio;

      this.lat = Math.max( - 85, Math.min( 85, this.lat ) );
      this.phi = THREE.Math.degToRad( 90 - this.lat );

      this.theta = THREE.Math.degToRad( this.lon );

        if ( this.constrainVertical ) {

          this.phi = THREE.Math.mapLinear( this.phi, 0, Math.PI, this.verticalMin, this.verticalMax );

      }
*/
/*
      var targetPosition = this.target,
        position = this.object.position
      targetPosition.x = position.x + 100 * Math.sin( this.phi ) * Math.cos( this.theta );
      targetPosition.y = position.y //+ 100 * Math.cos( this.phi );
      targetPosition.z = position.z + 100 * Math.sin( this.phi ) * Math.sin( this.theta );

      var localVertex = this.object.position.clone()
      localVertex.y -= 60
      var globalVertex = targetPosition.clone()
      globalVertex.y -=60
      var directionVector = globalVertex.sub(localVertex);
      var crash = false
      var ray=new THREE.Raycaster(localVertex,directionVector.clone().normalize())
      var collisionResults = ray.intersectObjects(oooo)
      if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
        crash = true;   // crash 是一个标记变量
      }
      if (crash) {

      }
      document.getElementById('test').innerHTML=crash;

      this.object.lookAt( targetPosition );
*/

    };

    function collisionDetect(localVertex, directionVector, oooo, checkdistance){

      var bodyHalfsize = 25;
      var bodyHalfHeight = 35;
      //detect 6 points
      var normalizedDirectionVector = directionVector.clone().normalize();

      var leftDeltaX = (-normalizedDirectionVector.z) * bodyHalfsize;
      var leftDeltaZ = normalizedDirectionVector.x * bodyHalfsize;
      var rightDeltaX = normalizedDirectionVector.z * bodyHalfsize;
      var rightDeltaZ = (-normalizedDirectionVector.x) * bodyHalfsize;

      var deltaX = [0, 0,               leftDeltaX, leftDeltaX,      rightDeltaX, rightDeltaX]
      var deltaY = [0, -bodyHalfHeight, 0,          -bodyHalfHeight, 0,           -bodyHalfHeight]
      var deltaZ = [0, 0,               leftDeltaZ, leftDeltaZ,      rightDeltaZ, rightDeltaZ]

      for (var i=0; i<deltaX.length; i++){
        var vertex = localVertex.clone();
        vertex.x = localVertex.x + deltaX[i];
        vertex.y = localVertex.y + deltaY[i];
        vertex.z = localVertex.z + deltaZ[i];
        var ray=new THREE.Raycaster(vertex,normalizedDirectionVector)
        var collisionResults = ray.intersectObjects(oooo)
        if (collisionResults.length > 0 && collisionResults[0].distance <= directionVector.length()+checkdistance) {
          return true;   // crash 是一个标记变量
        }
      }

      return false;
    }


    function contextmenu( event ) {

      event.preventDefault();

    }

    this.dispose = function() {

      this.domElement.removeEventListener( 'contextmenu', contextmenu, false );
      //this.domElement.removeEventListener( 'mousedown', _onMouseDown, false );
      this.domElement.removeEventListener( 'mousemove', _onMouseMove, false );
      //this.domElement.removeEventListener( 'mouseup', _onMouseUp, false );

      window.removeEventListener( 'keydown', _onKeyDown, false );
      window.removeEventListener( 'keyup', _onKeyUp, false );
      window.removeEventListener( 'keypress', _onKeyPress, false);

    };

    var _onMouseMove = bind( this, this.onMouseMove );
    //var _onMouseDown = bind( this, this.onMouseDown );
    //var _onMouseUp = bind( this, this.onMouseUp );
    var _onKeyDown = bind( this, this.onKeyDown );
    var _onKeyUp = bind( this, this.onKeyUp );
    var _onKeyPress = bind(this, this.onKeyPress);

    this.domElement.addEventListener( 'contextmenu', contextmenu, false );
    this.domElement.addEventListener( 'mousemove', _onMouseMove, false );
    //this.domElement.addEventListener( 'mousedown', _onMouseDown, false );
    //this.domElement.addEventListener( 'mouseup', _onMouseUp, false );

    window.addEventListener( 'keydown', _onKeyDown, false );
    window.addEventListener( 'keyup', _onKeyUp, false );
    window.addEventListener( 'keypress', _onKeyPress, false);
    function bind( scope, fn ) {

      return function () {

        fn.apply( scope, arguments );

      };

    }

    this.handleResize();

  };



  var Detector = require('three/examples/js/Detector.js')
  var path = require('@/assets/three/examples/textures/minecraft/atlas.png');
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
  document.write('<div style=\'fix\' id=\'test\'></div>')

  init()
  animate()
  //render()





  function init () {


    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 20000)
    //camera.position.y = getY(worldHalfWidth, worldHalfDepth) * 100 + 100
    camera.position.y = 75;
    camera.up.x = 0;
    camera.up.y = 1;
    camera.up.z = 0;
    controls = new THREE.FirstPersonControls(camera)
    controls.movementSpeed = 1000
    controls.lookSpeed = 0.125
    controls.lookVertical = true



    container = document.createElement('div')
    document.body.appendChild(container)
    var info = document.createElement('div')
    info.style.position = 'absolute'
    info.style.top = '10px'
    info.style.width = '100%'
    info.style.textAlign = 'center'
    info.innerHTML = '<a href="http://threejs.org" target="_blank">three.js</a> - voxel painter - webgl<br><strong>click</strong>: add voxel, <strong>shift + click</strong>: remove voxel'
    container.appendChild(info)
    /*
     camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000)
     camera.position.set(500, 800, 1300)
     camera.lookAt(new THREE.Vector3())
     */
    scene = new THREE.Scene()
    // roll-over helpers
    var rollOverGeo = new THREE.BoxGeometry(50, 50, 50)
    rollOverMaterial = new THREE.MeshBasicMaterial({color: 0xff0000, opacity: 0.5, transparent: true})
    rollOverMesh = new THREE.Mesh(rollOverGeo, rollOverMaterial)
    scene.add(rollOverMesh)
    // cubes
    cubeGeo = new THREE.BoxGeometry(50, 50, 50)
    cubeMaterial = new THREE.MeshLambertMaterial({color: 0xfeb74c, map: new THREE.TextureLoader().load(path)})
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
    var personMaterial = new THREE.MeshBasicMaterial({color: 0xfeb74c, map: new THREE.TextureLoader().load(path)})
    person_mesh = new THREE.Mesh(person, personMaterial)
    person_mesh.position.x = camera.position.x
    person_mesh.position.y = camera.position.y - 70
    person_mesh.position.z = camera.position.z

    scene.add(person_mesh)


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
    document.addEventListener('mousemove', onDocumentMouseMove, false)
    document.addEventListener('mousedown', onDocumentMouseDown, false)
    document.addEventListener('keydown', onDocumentKeyDown, false)
    document.addEventListener('keyup', onDocumentKeyUp, false)
    //
    //stats = new Stats()
    //container.appendChild(stats.dom)
    window.addEventListener('resize', onWindowResize, false)

    /*
    renderer = new THREE.WebGLRenderer()
    renderer.setClearColor(0xbfd1e5)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    container.innerHTML = ''
    container.appendChild(renderer.domElement)
    */

    //


  }
  /*
   function onWindowResize () {
   camera.aspect = window.innerWidth / window.innerHeight
   camera.updateProjectionMatrix()
   renderer.setSize(window.innerWidth, window.innerHeight)
   }
   */
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    controls.handleResize()
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
    if (intersects.length > 0) {
      var intersect = intersects[0]
      // delete cube
      if (isShiftDown) {
        if (intersect.object !== plane) {
          scene.remove(intersect.object)
          objects.splice(objects.indexOf(intersect.object), 1)
        }
        // create cube
      } else {
        var voxel = new THREE.Mesh(cubeGeo, cubeMaterial)
        voxel.position.copy(intersect.point).add(intersect.face.normal)
        voxel.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25)
        scene.add(voxel)
        objects.push(voxel)
      }
      render()
    }
  }
  function onDocumentKeyDown(event) {
    switch (event.keyCode) {
      case 16: isShiftDown = true; break
    }
  }
  function onDocumentKeyUp(event) {
    switch (event.keyCode) {
      case 16: isShiftDown = false; break
    }
  }

  function animate() {
    requestAnimationFrame(animate)
    render()
    //document.getElementById('test').innerHTML=camera.position.z;
    //stats.update()
  }
  function render() {
    controls.update(clock.getDelta(), objects, person_mesh)
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
    for (var j = 0 ;j < 4; j++) {
      if (j === 0) {
        for (var ii = 0; ii < size; ii++) data[ ii ] = 0
      }
      for (var i = 0; i < size; i++) {
        var x = i % width
        var y = (i / width) | 0
        data[ i ] += perlin.noise(x / quality, y / quality, z) * quality
      }
      quality *= 4
    }
    return data
  }
  function getY (x, z) {
    return (data[ x + z * worldWidth ] * 0.2) | 0
  }


  // http://mrl.nyu.edu/~perlin/noise/


</script>
<!--<template>
&lt!&ndash
  <div id="container"><br /><br /><br /><br /><br />Generating world...</div>
  <div id="info"><a href="http://threejs.org" target="_blank">three.js</a> -<a href="http://www.minecraft.net/" target="_blank">minecraft</a> demo. featuring <a href="http://painterlypack.net/" target="_blank">painterly pack</a><br />(left click: forward, right click: backward)</div>
&ndash&gt
</template>

<script>
  var THREE = require('Three')
  var Detector = require('Three/examples/js/Detector.js')
  var Stats = require('Three/examples/js/libs/stats.min.js')
  var ImprovedNoise = require('Three/examples/js/ImprovedNoise.js')

  if (!Detector.webgl) {
    Detector.addGetWebGLMessage()
    document.getElementById('container').innerHTML = ''
  }
  var container, stats
  var camera, controls, scene, renderer
  var worldWidth = 128
  var worldDepth = 128
  var worldHalfWidth = worldWidth / 2
  var worldHalfDepth = worldDepth / 2
  var data = generateHeight(worldWidth, worldDepth)
  var clock = new THREE.Clock()
  init()
  animate()
  function init () {
    container = document.getElementById('container')
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 20000)
    camera.position.y = getY(worldHalfWidth, worldHalfDepth) * 100 + 100
    controls = new THREE.FirstPersonControls(camera)
    controls.movementSpeed = 1000
    controls.lookSpeed = 0.125
    controls.lookVertical = true
    scene = new THREE.Scene()
    // sides
    var matrix = new THREE.Matrix4()
    var pxGeometry = new THREE.PlaneBufferGeometry(100, 100)
    pxGeometry.attributes.uv.array[ 1 ] = 0.5
    pxGeometry.attributes.uv.array[ 3 ] = 0.5
    pxGeometry.rotateY(Math.PI / 2)
    pxGeometry.translate(50, 0, 0)
    var nxGeometry = new THREE.PlaneBufferGeometry(100, 100)
    nxGeometry.attributes.uv.array[ 1 ] = 0.5
    nxGeometry.attributes.uv.array[ 3 ] = 0.5
    nxGeometry.rotateY(-Math.PI / 2)
    nxGeometry.translate(-50, 0, 0)
    var pyGeometry = new THREE.PlaneBufferGeometry(100, 100)
    pyGeometry.attributes.uv.array[ 5 ] = 0.5
    pyGeometry.attributes.uv.array[ 7 ] = 0.5
    pyGeometry.rotateX(-Math.PI / 2)
    pyGeometry.translate(0, 50, 0)
    var pzGeometry = new THREE.PlaneBufferGeometry(100, 100)
    pzGeometry.attributes.uv.array[ 1 ] = 0.5
    pzGeometry.attributes.uv.array[ 3 ] = 0.5
    pzGeometry.translate(0, 0, 50)
    var nzGeometry = new THREE.PlaneBufferGeometry(100, 100)
    nzGeometry.attributes.uv.array[ 1 ] = 0.5
    nzGeometry.attributes.uv.array[ 3 ] = 0.5
    nzGeometry.rotateY(Math.PI)
    nzGeometry.translate(0, 0, -50)
    //
    // BufferGeometry cannot be merged yet.
    var tmpGeometry = new THREE.Geometry()
    var pxTmpGeometry = new THREE.Geometry().fromBufferGeometry(pxGeometry)
    var nxTmpGeometry = new THREE.Geometry().fromBufferGeometry(nxGeometry)
    var pyTmpGeometry = new THREE.Geometry().fromBufferGeometry(pyGeometry)
    var pzTmpGeometry = new THREE.Geometry().fromBufferGeometry(pzGeometry)
    var nzTmpGeometry = new THREE.Geometry().fromBufferGeometry(nzGeometry)
    for (var z = 0 z < worldDepth z++) {
      for (var x = 0 x < worldWidth x++) {
        var h = getY(x, z)
        matrix.makeTranslation(
          x * 100 - worldHalfWidth * 100,
          h * 100,
          z * 100 - worldHalfDepth * 100
      )
        var px = getY(x + 1, z)
        var nx = getY(x - 1, z)
        var pz = getY(x, z + 1)
        var nz = getY(x, z - 1)
        tmpGeometry.merge(pyTmpGeometry, matrix)
        if ((px !== h && px !== h + 1) || x === 0) {
          tmpGeometry.merge(pxTmpGeometry, matrix)
        }
        if ((nx !== h && nx !== h + 1) || x === worldWidth - 1) {
          tmpGeometry.merge(nxTmpGeometry, matrix)
        }
        if ((pz !== h && pz !== h + 1) || z === worldDepth - 1) {
          tmpGeometry.merge(pzTmpGeometry, matrix)
        }
        if ((nz !== h && nz !== h + 1) || z === 0) {
          tmpGeometry.merge(nzTmpGeometry, matrix)
        }
      }
    }
    var geometry = new THREE.BufferGeometry().fromGeometry(tmpGeometry)
    geometry.computeBoundingSphere()
    var texture = new THREE.TextureLoader().load('textures/minecraft/atlas.png')
    texture.magFilter = THREE.NearestFilter
    texture.minFilter = THREE.LinearMipMapLinearFilter
    var mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ map: texture }))
    scene.add(mesh)
    var ambientLight = new THREE.AmbientLight(0xcccccc)
    scene.add(ambientLight)
    var directionalLight = new THREE.DirectionalLight(0xffffff, 2)
    directionalLight.position.set(1, 1, 0.5).normalize()
    scene.add(directionalLight)
    renderer = new THREE.WebGLRenderer()
    renderer.setClearColor(0xbfd1e5)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    container.innerHTML = ''
    container.appendChild(renderer.domElement)
    stats = new Stats()
    container.appendChild(stats.dom)
    //
    window.addEventListener('resize', onWindowResize, false)
  }
  function onWindowResize () {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    controls.handleResize()
  }
  function generateHeight (width, height) {
    var data = []
    var perlin = new ImprovedNoise()
    var size = width * height
    var quality = 2
    var z = Math.random() * 100
    for (var j = 0 j < 4 j++) {
      if (j === 0) {
        for (var ii = 0 ii < size ii++) data[ ii ] = 0
      }
      for (var i = 0 i < size i++) {
        var x = i % width
        var y = (i / width) | 0
        data[ i ] += perlin.noise(x / quality, y / quality, z) * quality
      }
      quality *= 4
    }
    return data
  }
  function getY (x, z) {
    return (data[ x + z * worldWidth ] * 0.2) | 0
  }
  //
  function animate () {
    requestAnimationFrame(animate)
    render()
    stats.update()
  }
  function render () {
    controls.update(clock.getDelta())
    renderer.render(scene, camera)
  }
</script>

<style>
  body {
    color: #61443e
    font-family:Monospace
    font-size:13px
    text-align:center
    background-color: #bfd1e5
    margin: 0px
    overflow: hidden
  }
  #info {
    position: absolute
    top: 0px width: 100%
    padding: 5px
  }
  a {
    color: #a06851
  }
  #oldie {
    background:rgb(100,0,0) !important
    color:#fff !important
    margin-top:10em !important
  }
  #oldie a { color:#fff }
</style>-->
<!--
<template>

</template>

<script>
    var path = require('@/assets/three/examples/textures/crate.gif')
    var THREE = require('Three')
    var camera, scene, renderer
    var mesh
    init()
    animate()
    function init () {
      camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000)
      camera.position.z = 400
      scene = new THREE.Scene()
      var texture = new THREE.TextureLoader().load(path)
      var geometry = new THREE.BoxBufferGeometry(200, 200, 200)
      var material = new THREE.MeshBasicMaterial({map: texture})
      mesh = new THREE.Mesh(geometry, material)
      scene.add(mesh)
      renderer = new THREE.WebGLRenderer()
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(window.innerWidth, window.innerHeight)
      document.body.appendChild(renderer.domElement)
      //
      window.addEventListener('resize', onWindowResize, false)
    }

    function onWindowResize () {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    function animate () {
      requestAnimationFrame(animate)
      mesh.rotation.x += 0.005
      mesh.rotation.y += 0.01
      renderer.render(scene, camera)
    }

</script>

<style>
  body {
    margin: 0px
    background-color: #000000
    overflow: hidden
  }
</style>

-->
