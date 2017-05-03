<template>

</template>
<script>
  var THREE = require('Three')
  var Detector = require('Three/examples/js/Detector.js')
  var path = require('@/assets/three/examples/textures/square-outline-textured.png');

  if (!Detector.webgl) Detector.addGetWebGLMessage()
  var container
  var camera, scene, renderer
  var plane
  var mouse
  var raycaster
  var isShiftDown = false
  var rollOverMesh, rollOverMaterial
  var cubeGeo, cubeMaterial
  var objects = []
  init()
  render()
  function init () {
    container = document.createElement('div')
    document.body.appendChild(container)
    var info = document.createElement('div')
    info.style.position = 'absolute'
    info.style.top = '10px'
    info.style.width = '100%'
    info.style.textAlign = 'center'
    info.innerHTML = '<a href="http://threejs.org" target="_blank">three.js</a> - voxel painter - webgl<br><strong>click</strong>: add voxel, <strong>shift + click</strong>: remove voxel'
    container.appendChild(info)
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000)
    camera.position.set(500, 800, 1300)
    camera.lookAt(new THREE.Vector3())
    scene = new THREE.Scene()
    // roll-over helpers
    var rollOverGeo = new THREE.BoxGeometry(50, 50, 50)
    rollOverMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, opacity: 0.5, transparent: true })
    rollOverMesh = new THREE.Mesh(rollOverGeo, rollOverMaterial)
    scene.add(rollOverMesh)
    // cubes
    cubeGeo = new THREE.BoxGeometry(50, 50, 50)
    cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xfeb74c, map: new THREE.TextureLoader().load(path) })
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
    var material = new THREE.LineBasicMaterial({ color: 0x000000, opacity: 0.2, transparent: true })
    var line = new THREE.LineSegments(geometry, material)
    scene.add(line)
    //
    raycaster = new THREE.Raycaster()
    mouse = new THREE.Vector2()
    geometry = new THREE.PlaneBufferGeometry(1000, 1000)
    geometry.rotateX(-Math.PI / 2)
    plane = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ visible: false }))
    scene.add(plane)
    objects.push(plane)
    // Lights
    var ambientLight = new THREE.AmbientLight(0x606060)
    scene.add(ambientLight)
    var directionalLight = new THREE.DirectionalLight(0xffffff)
    directionalLight.position.set(1, 0.75, 0.5).normalize()
    scene.add(directionalLight)
    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setClearColor(0xf0f0f0)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    container.appendChild(renderer.domElement)
    document.addEventListener('mousemove', onDocumentMouseMove, false)
    document.addEventListener('mousedown', onDocumentMouseDown, false)
    document.addEventListener('keydown', onDocumentKeyDown, false)
    document.addEventListener('keyup', onDocumentKeyUp, false)
    //
    window.addEventListener('resize', onWindowResize, false)
  }
  function onWindowResize () {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
  function onDocumentMouseMove (event) {
    event.preventDefault()
    mouse.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1)
    raycaster.setFromCamera(mouse, camera)
    var intersects = raycaster.intersectObjects(objects)
    if (intersects.length > 0) {
      var intersect = intersects[ 0 ]
      rollOverMesh.position.copy(intersect.point).add(intersect.face.normal)
      rollOverMesh.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25)
    }
    render()
  }
  function onDocumentMouseDown (event) {
    event.preventDefault()
    mouse.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1)
    raycaster.setFromCamera(mouse, camera)
    var intersects = raycaster.intersectObjects(objects)
    if (intersects.length > 0) {
      var intersect = intersects[ 0 ]
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
  function onDocumentKeyDown (event) {
    switch (event.keyCode) {
      case 16: isShiftDown = true; break
    }
  }
  function onDocumentKeyUp (event) {
    switch (event.keyCode) {
      case 16: isShiftDown = false; break
    }
  }
  function render () {
    renderer.render(scene, camera)
  }
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
