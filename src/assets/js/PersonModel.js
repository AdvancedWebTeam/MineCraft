var THREE=require('three')
PersonMesh=function (scene) {
  //material=null
  //material2=null

  this.headBox=null
  this.head2Box=null
  this.bodyBox=null
  this.body2Box=null
  this.rightArmBox=null
  this.leftArmBox=null
  this.rightLegBox=null
  this.leftLegBox=null
  this.rightArm2Box=null
  this.leftArm2Box=null
  this.rightLeg2Box=null
  this.leftLeg2Box=null
  this.headMesh=null
  this.head2Mesh=null
  this.bodyMesh=null
  this.body2Mesh=null
  this.rightArmMesh=null
  this.leftArmMesh=null
  this.rightLegMesh=null
  this.leftLegMesh=null
  this.rightArm2Mesh=null
  this.leftArm2Mesh=null
  this.rightLeg2Mesh=null
  this.leftLeg2Mesh=null

/*
  canvas = document.getElementById('canvas');
  canvas.width = 64;
  canvas.height = 64;
  var context = canvas.getContext("2d");
*/
  var img = new Image(/*'/#/assets/image/BlackEyeNoob.png'*/);
  img.crossOrigin = '';
  // I use crafatar because it allows CORS requests.
  // Minotar stopped working.
  //img.src = '/#/assets/image/BlackEyeNoob.png';
  img.src = 'http://crafatar.com/skins/BlackEyeNoob';
  console.log(window.location.href)
  //img.crossOrigin = '';
  var skinTexture = new THREE.Texture(img/*canvas*/);
  //skinTexture=new THREE.ImageUtils.loadTexture(/*img.src*/'/#/assets/image/BlackEyeNoob.png');
  skinTexture.magFilter = THREE.NearestFilter;
  skinTexture.minFilter = THREE.NearestMipMapNearestFilter;
  console.log(skinTexture)

// Get the texture for the skin
  var material = new THREE.MeshBasicMaterial({map: skinTexture, side: THREE.FrontSide});
  var material2 = new THREE.MeshBasicMaterial({map: skinTexture, transparent: true, opacity: 1, alphaTest: 0.5, side: THREE.DoubleSide});

  //skinTexture.needsUpdate = true;

  //material.map.needsUpdate = true;
  //material2.map.needsUpdate = true;
  console.log(material)
  console.log(material2)

/*
    // Erase what was on the canvas before
    context.clearRect(0, 0, 64, 64);

    // Draw the image to the canvas
    context.drawImage(img, 0, 0);
*/

    // Convert the image if need be
/*
    if(img.height == 32) Convert6432To6464(context);
    FixNonVisible(context);
    FixOverlay(context);
*/
  img.onload = function() {

    skinTexture.needsUpdate = true;

    material.needsUpdate = true;
    material2.needsUpdate = true;
  }
  this.renderSkin=function(scene) {
      // Head Parts
      var headTop = [
        new THREE.Vector2(0.125, 0.875),
        new THREE.Vector2(0.25, 0.875),
        new THREE.Vector2(0.25, 1),
        new THREE.Vector2(0.125, 1)
      ];
      var headBottom = [
        new THREE.Vector2(0.25, 0.875),
        new THREE.Vector2(0.375, 0.875),
        new THREE.Vector2(0.375, 1),
        new THREE.Vector2(0.25, 1)
      ];
      var headLeft = [
        new THREE.Vector2(0, 0.75),
        new THREE.Vector2(0.125, 0.75),
        new THREE.Vector2(0.125, 0.875),
        new THREE.Vector2(0, 0.875)
      ];
      var headBack = [
        new THREE.Vector2(0.125, 0.75),
        new THREE.Vector2(0.25, 0.75),
        new THREE.Vector2(0.25 ,0.875),
        new THREE.Vector2(0.125 ,0.875)
      ];
      var headRight = [
        new THREE.Vector2(0.25, 0.75),
        new THREE.Vector2(0.375, 0.75),
        new THREE.Vector2(0.375, 0.875),
        new THREE.Vector2(0.25, 0.875)
      ];
      var headFront = [
        new THREE.Vector2(0.375, 0.75),
        new THREE.Vector2(0.5, 0.75),
        new THREE.Vector2(0.5, 0.875),
        new THREE.Vector2(0.375, 0.875)
      ];
      this.headBox = new THREE.BoxGeometry(20, 20, 20, 0, 0, 0);
      this.headBox.faceVertexUvs[0] = [];
      this.headBox.faceVertexUvs[0][0] = [headRight[3], headRight[0], headRight[2]];
      this.headBox.faceVertexUvs[0][1] = [headRight[0], headRight[1], headRight[2]];
      this.headBox.faceVertexUvs[0][2] = [headLeft[3], headLeft[0], headLeft[2]];
      this.headBox.faceVertexUvs[0][3] = [headLeft[0], headLeft[1], headLeft[2]];
      this.headBox.faceVertexUvs[0][4] = [headTop[3], headTop[0], headTop[2]];
      this.headBox.faceVertexUvs[0][5] = [headTop[0], headTop[1], headTop[2]];
      this.headBox.faceVertexUvs[0][6] = [headBottom[0], headBottom[3], headBottom[1]];
      this.headBox.faceVertexUvs[0][7] = [headBottom[3], headBottom[2], headBottom[1]];
      this.headBox.faceVertexUvs[0][8] = [headFront[3], headFront[0], headFront[2]];
      this.headBox.faceVertexUvs[0][9] = [headFront[0], headFront[1], headFront[2]];
      this.headBox.faceVertexUvs[0][10] = [headBack[3], headBack[0], headBack[2]];
      this.headBox.faceVertexUvs[0][11] = [headBack[0], headBack[1], headBack[2]];
      this.headMesh = new THREE.Mesh(this.headBox, material);
      this.headMesh.name = "head";
      this.headMesh.position.y = 70;
      scene.add(this.headMesh);

      // Body Parts
      var bodyTop = [
        new THREE.Vector2(0.3125, 0.6875),
        new THREE.Vector2(0.4375, 0.6875),
        new THREE.Vector2(0.4375, 0.75),
        new THREE.Vector2(0.3125, 0.75)
      ];
      var bodyBottom = [
        new THREE.Vector2(0.4375, 0.6875),
        new THREE.Vector2(0.5625, 0.6875),
        new THREE.Vector2(0.5625, 0.75),
        new THREE.Vector2(0.4375, 0.75)
      ];
      var bodyLeft = [
        new THREE.Vector2(0.25, 0.5),
        new THREE.Vector2(0.3125, 0.5),
        new THREE.Vector2(0.3125, 0.6875),
        new THREE.Vector2(0.25, 0.6875)
      ];
      var bodyBack = [
        new THREE.Vector2(0.3125, 0.5),
        new THREE.Vector2(0.4375, 0.5),
        new THREE.Vector2(0.4375, 0.6875),
        new THREE.Vector2(0.3125, 0.6875)
      ];
      var bodyRight = [
        new THREE.Vector2(0.4375, 0.5),
        new THREE.Vector2(0.5, 0.5),
        new THREE.Vector2(0.5, 0.6875),
        new THREE.Vector2(0.4375, 0.6875)
      ];
      var bodyFront = [
        new THREE.Vector2(0.5, 0.5),
        new THREE.Vector2(0.625, 0.5),
        new THREE.Vector2(0.625, 0.6875),
        new THREE.Vector2(0.5, 0.6875)
      ];
      this.bodyBox = new THREE.BoxGeometry(20, 30, 10, 0, 0, 0);
      this.bodyBox.faceVertexUvs[0] = [];
      this.bodyBox.faceVertexUvs[0][0] = [bodyRight[3], bodyRight[0], bodyRight[2]];
      this.bodyBox.faceVertexUvs[0][1] = [bodyRight[0], bodyRight[1], bodyRight[2]];
      this.bodyBox.faceVertexUvs[0][2] = [bodyLeft[3], bodyLeft[0], bodyLeft[2]];
      this.bodyBox.faceVertexUvs[0][3] = [bodyLeft[0], bodyLeft[1], bodyLeft[2]];
      this.bodyBox.faceVertexUvs[0][4] = [bodyTop[3], bodyTop[0], bodyTop[2]];
      this.bodyBox.faceVertexUvs[0][5] = [bodyTop[0], bodyTop[1], bodyTop[2]];
      this.bodyBox.faceVertexUvs[0][6] = [bodyBottom[0], bodyBottom[3], bodyBottom[1]];
      this.bodyBox.faceVertexUvs[0][7] = [bodyBottom[3], bodyBottom[2], bodyBottom[1]];
      this.bodyBox.faceVertexUvs[0][8] = [bodyFront[3], bodyFront[0], bodyFront[2]];
      this.bodyBox.faceVertexUvs[0][9] = [bodyFront[0], bodyFront[1], bodyFront[2]];
      this.bodyBox.faceVertexUvs[0][10] = [bodyBack[3], bodyBack[0], bodyBack[2]];
      this.bodyBox.faceVertexUvs[0][11] = [bodyBack[0], bodyBack[1], bodyBack[2]];
      this.bodyMesh = new THREE.Mesh(this.bodyBox, material);
      this.bodyMesh.name = "body";
      this.bodyMesh.position.y = 45;
      scene.add(this.bodyMesh);

      // Right Arm Parts
      var rightArmTop = [
        new THREE.Vector2(0.6875, 0.6875),
        new THREE.Vector2(0.75, 0.6875),
        new THREE.Vector2(0.75, 0.75),
        new THREE.Vector2(0.6875, 0.75),
      ];
      var rightArmBottom = [
        new THREE.Vector2(0.75, 0.6875),
        new THREE.Vector2(0.8125, 0.6875),
        new THREE.Vector2(0.8125, 0.75),
        new THREE.Vector2(0.75, 0.75)
      ];
      var rightArmLeft = [
        new THREE.Vector2(0.625, 0.5),
        new THREE.Vector2(0.6875, 0.5),
        new THREE.Vector2(0.6875, 0.6875),
        new THREE.Vector2(0.625, 0.6875)
      ];
      var rightArmBack = [
        new THREE.Vector2(0.6875, 0.5),
        new THREE.Vector2(0.75, 0.5),
        new THREE.Vector2(0.75, 0.6875),
        new THREE.Vector2(0.6875, 0.6875)
      ];
      var rightArmRight = [
        new THREE.Vector2(0.75, 0.5),
        new THREE.Vector2(0.8125, 0.5),
        new THREE.Vector2(0.8125, 0.6875),
        new THREE.Vector2(0.75, 0.6875)
      ];
      var rightArmFront = [
        new THREE.Vector2(0.8125, 0.5),
        new THREE.Vector2(0.875, 0.5),
        new THREE.Vector2(0.875, 0.6875),
        new THREE.Vector2(0.8125, 0.6875)
      ];
      this.rightArmBox = new THREE.BoxGeometry(10, 30, 10, 0, 0, 0);
      this.rightArmBox.faceVertexUvs[0] = [];
      this.rightArmBox.faceVertexUvs[0][0] = [rightArmRight[3], rightArmRight[0], rightArmRight[2]];
      this.rightArmBox.faceVertexUvs[0][1] = [rightArmRight[0], rightArmRight[1], rightArmRight[2]];
      this.rightArmBox.faceVertexUvs[0][2] = [rightArmLeft[3], rightArmLeft[0], rightArmLeft[2]];
      this.rightArmBox.faceVertexUvs[0][3] = [rightArmLeft[0], rightArmLeft[1], rightArmLeft[2]];
      this.rightArmBox.faceVertexUvs[0][4] = [rightArmTop[3], rightArmTop[0], rightArmTop[2]];
      this.rightArmBox.faceVertexUvs[0][5] = [rightArmTop[0], rightArmTop[1], rightArmTop[2]];
      this.rightArmBox.faceVertexUvs[0][6] = [rightArmBottom[0], rightArmBottom[3], rightArmBottom[1]];
      this.rightArmBox.faceVertexUvs[0][7] = [rightArmBottom[3], rightArmBottom[2], rightArmBottom[1]];
      this.rightArmBox.faceVertexUvs[0][8] = [rightArmFront[3], rightArmFront[0], rightArmFront[2]];
      this.rightArmBox.faceVertexUvs[0][9] = [rightArmFront[0], rightArmFront[1], rightArmFront[2]];
      this.rightArmBox.faceVertexUvs[0][10] = [rightArmBack[3], rightArmBack[0], rightArmBack[2]];
      this.rightArmBox.faceVertexUvs[0][11] = [rightArmBack[0], rightArmBack[1], rightArmBack[2]];
      this.rightArmMesh = new THREE.Mesh(this.rightArmBox, material);
      this.rightArmMesh.name = "rightArm";
      this.rightArmMesh.position.y = 45;
      this.rightArmMesh.position.x = -15;
      scene.add(this.rightArmMesh);

      // Left Arm Parts
      var leftArmTop = [
        new THREE.Vector2(0.5625, 0.1875),
        new THREE.Vector2(0.625, 0.1875),
        new THREE.Vector2(0.625, 0.25),
        new THREE.Vector2(0.5625, 0.25),
      ];
      var leftArmBottom = [
        new THREE.Vector2(0.625, 0.1875),
        new THREE.Vector2(0.6875, 0.1875),
        new THREE.Vector2(0.6875, 0.25),
        new THREE.Vector2(0.625, 0.25)
      ];
      var leftArmLeft = [
        new THREE.Vector2(0.5, 0),
        new THREE.Vector2(0.5625, 0),
        new THREE.Vector2(0.5625, 0.1875),
        new THREE.Vector2(0.5, 0.1875)
      ];
      var leftArmBack = [
        new THREE.Vector2(0.5625, 0),
        new THREE.Vector2(0.625, 0),
        new THREE.Vector2(0.625, 0.1875),
        new THREE.Vector2(0.5625, 0.1875)
      ];
      var leftArmRight = [
        new THREE.Vector2(0.625, 0),
        new THREE.Vector2(0.6875, 0),
        new THREE.Vector2(0.6875, 0.1875),
        new THREE.Vector2(0.625, 0.1875)
      ];
      var leftArmFront = [
        new THREE.Vector2(0.6875, 0),
        new THREE.Vector2(0.75, 0),
        new THREE.Vector2(0.75, 0.1875),
        new THREE.Vector2(0.6875, 0.1875)
      ];
      this.leftArmBox = new THREE.BoxGeometry(10, 30, 10, 0, 0, 0);
      this.leftArmBox.faceVertexUvs[0] = [];
      this.leftArmBox.faceVertexUvs[0][0] = [leftArmRight[3], leftArmRight[0], leftArmRight[2]];
      this.leftArmBox.faceVertexUvs[0][1] = [leftArmRight[0], leftArmRight[1], leftArmRight[2]];
      this.leftArmBox.faceVertexUvs[0][2] = [leftArmLeft[3], leftArmLeft[0], leftArmLeft[2]];
      this.leftArmBox.faceVertexUvs[0][3] = [leftArmLeft[0], leftArmLeft[1], leftArmLeft[2]];
      this.leftArmBox.faceVertexUvs[0][4] = [leftArmTop[3], leftArmTop[0], leftArmTop[2]];
      this.leftArmBox.faceVertexUvs[0][5] = [leftArmTop[0], leftArmTop[1], leftArmTop[2]];
      this.leftArmBox.faceVertexUvs[0][6] = [leftArmBottom[0], leftArmBottom[3], leftArmBottom[1]];
      this.leftArmBox.faceVertexUvs[0][7] = [leftArmBottom[3], leftArmBottom[2], leftArmBottom[1]];
      this.leftArmBox.faceVertexUvs[0][8] = [leftArmFront[3], leftArmFront[0], leftArmFront[2]];
      this.leftArmBox.faceVertexUvs[0][9] = [leftArmFront[0], leftArmFront[1], leftArmFront[2]];
      this.leftArmBox.faceVertexUvs[0][10] = [leftArmBack[3], leftArmBack[0], leftArmBack[2]];
      this.leftArmBox.faceVertexUvs[0][11] = [leftArmBack[0], leftArmBack[1], leftArmBack[2]];
      this.leftArmMesh = new THREE.Mesh(this.leftArmBox, material);
      this.leftArmMesh.name = "leftArm";
      this.leftArmMesh.position.y = 45;
      this.leftArmMesh.position.x = 15;
      scene.add(this.leftArmMesh);

      // Right Leg Parts
      var rightLegTop = [
        new THREE.Vector2(0.0625, 0.6875),
        new THREE.Vector2(0.125, 0.6875),
        new THREE.Vector2(0.125, 0.75),
        new THREE.Vector2(0.0625, 0.75),
      ];
      var rightLegBottom = [
        new THREE.Vector2(0.125, 0.6875),
        new THREE.Vector2(0.1875, 0.6875),
        new THREE.Vector2(0.1875, 0.75),
        new THREE.Vector2(0.125, 0.75)
      ];
      var rightLegLeft = [
        new THREE.Vector2(0, 0.5),
        new THREE.Vector2(0.0625, 0.5),
        new THREE.Vector2(0.0625, 0.6875),
        new THREE.Vector2(0, 0.6875)
      ];
      var rightLegBack = [
        new THREE.Vector2(0.0625, 0.5),
        new THREE.Vector2(0.125, 0.5),
        new THREE.Vector2(0.125, 0.6875),
        new THREE.Vector2(0.0625, 0.6875)
      ];
      var rightLegRight = [
        new THREE.Vector2(0.125, 0.5),
        new THREE.Vector2(0.1875, 0.5),
        new THREE.Vector2(0.1875, 0.6875),
        new THREE.Vector2(0.125, 0.6875)
      ];
      var rightLegFront = [
        new THREE.Vector2(0.1875, 0.5),
        new THREE.Vector2(0.25, 0.5),
        new THREE.Vector2(0.25, 0.6875),
        new THREE.Vector2(0.1875, 0.6875)
      ];
      this.rightLegBox = new THREE.BoxGeometry(10, 30, 10, 0, 0, 0);
      this.rightLegBox.faceVertexUvs[0] = [];
      this.rightLegBox.faceVertexUvs[0][0] = [rightLegRight[3], rightLegRight[0], rightLegRight[2]];
      this.rightLegBox.faceVertexUvs[0][1] = [rightLegRight[0], rightLegRight[1], rightLegRight[2]];
      this.rightLegBox.faceVertexUvs[0][2] = [rightLegLeft[3], rightLegLeft[0], rightLegLeft[2]];
      this.rightLegBox.faceVertexUvs[0][3] = [rightLegLeft[0], rightLegLeft[1], rightLegLeft[2]];
      this.rightLegBox.faceVertexUvs[0][4] = [rightLegTop[3], rightLegTop[0], rightLegTop[2]];
      this.rightLegBox.faceVertexUvs[0][5] = [rightLegTop[0], rightLegTop[1], rightLegTop[2]];
      this.rightLegBox.faceVertexUvs[0][6] = [rightLegBottom[0], rightLegBottom[3], rightLegBottom[1]];
      this.rightLegBox.faceVertexUvs[0][7] = [rightLegBottom[3], rightLegBottom[2], rightLegBottom[1]];
      this.rightLegBox.faceVertexUvs[0][8] = [rightLegFront[3], rightLegFront[0], rightLegFront[2]];
      this.rightLegBox.faceVertexUvs[0][9] = [rightLegFront[0], rightLegFront[1], rightLegFront[2]];
      this.rightLegBox.faceVertexUvs[0][10] = [rightLegBack[3], rightLegBack[0], rightLegBack[2]];
      this.rightLegBox.faceVertexUvs[0][11] = [rightLegBack[0], rightLegBack[1], rightLegBack[2]];
      this.rightLegMesh = new THREE.Mesh(this.rightLegBox, material);
      this.rightLegMesh.name = "rightLeg"
      this.rightLegMesh.position.y = 15;
      this.rightLegMesh.position.x = -5;
      scene.add(this.rightLegMesh);

      // Left Leg Parts
      var leftLegTop = [
        new THREE.Vector2(0.3125, 0.1875),
        new THREE.Vector2(0.375, 0.1875),
        new THREE.Vector2(0.375, 0.25),
        new THREE.Vector2(0.3125, 0.25),
      ];
      var leftLegBottom = [
        new THREE.Vector2(0.375, 0.1875),
        new THREE.Vector2(0.4375, 0.1875),
        new THREE.Vector2(0.4375, 0.25),
        new THREE.Vector2(0.375, 0.25)
      ];
      var leftLegLeft = [
        new THREE.Vector2(0.25, 0),
        new THREE.Vector2(0.3125, 0),
        new THREE.Vector2(0.3125, 0.1875),
        new THREE.Vector2(0.25, 0.1875)
      ];
      var leftLegBack = [
        new THREE.Vector2(0.3125, 0),
        new THREE.Vector2(0.375, 0),
        new THREE.Vector2(0.375, 0.1875),
        new THREE.Vector2(0.3125, 0.1875)
      ];
      var leftLegRight = [
        new THREE.Vector2(0.375, 0),
        new THREE.Vector2(0.4375, 0),
        new THREE.Vector2(0.4375, 0.1875),
        new THREE.Vector2(0.375, 0.1875)
      ];
      var leftLegFront = [
        new THREE.Vector2(0.4375, 0),
        new THREE.Vector2(0.5, 0),
        new THREE.Vector2(0.5, 0.1875),
        new THREE.Vector2(0.4375, 0.1875)
      ];
      this.leftLegBox = new THREE.BoxGeometry(10, 30, 10, 0, 0, 0);
      this.leftLegBox.faceVertexUvs[0] = [];
      this.leftLegBox.faceVertexUvs[0][0] = [leftLegRight[3], leftLegRight[0], leftLegRight[2]];
      this.leftLegBox.faceVertexUvs[0][1] = [leftLegRight[0], leftLegRight[1], leftLegRight[2]];
      this.leftLegBox.faceVertexUvs[0][2] = [leftLegLeft[3], leftLegLeft[0], leftLegLeft[2]];
      this.leftLegBox.faceVertexUvs[0][3] = [leftLegLeft[0], leftLegLeft[1], leftLegLeft[2]];
      this.leftLegBox.faceVertexUvs[0][4] = [leftLegTop[3], leftLegTop[0], leftLegTop[2]];
      this.leftLegBox.faceVertexUvs[0][5] = [leftLegTop[0], leftLegTop[1], leftLegTop[2]];
      this.leftLegBox.faceVertexUvs[0][6] = [leftLegBottom[0], leftLegBottom[3], leftLegBottom[1]];
      this.leftLegBox.faceVertexUvs[0][7] = [leftLegBottom[3], leftLegBottom[2], leftLegBottom[1]];
      this.leftLegBox.faceVertexUvs[0][8] = [leftLegFront[3], leftLegFront[0], leftLegFront[2]];
      this.leftLegBox.faceVertexUvs[0][9] = [leftLegFront[0], leftLegFront[1], leftLegFront[2]];
      this.leftLegBox.faceVertexUvs[0][10] = [leftLegBack[3], leftLegBack[0], leftLegBack[2]];
      this.leftLegBox.faceVertexUvs[0][11] = [leftLegBack[0], leftLegBack[1], leftLegBack[2]];
      this.leftLegMesh = new THREE.Mesh(this.leftLegBox, material);
      this.leftLegMesh.name = "leftLeg";
      this.leftLegMesh.position.y = 15;
      this.leftLegMesh.position.x = 5;
      scene.add(this.leftLegMesh);

      // Head Overlay Parts
      var head2Top = [
        new THREE.Vector2(0.625, 0.875),
        new THREE.Vector2(0.75, 0.875),
        new THREE.Vector2(0.75, 1),
        new THREE.Vector2(0.625, 1)
      ];
      var head2Bottom = [
        new THREE.Vector2(0.75, 0.875),
        new THREE.Vector2(0.875, 0.875),
        new THREE.Vector2(0.875, 1),
        new THREE.Vector2(0.75, 1)
      ];
      var head2Left = [
        new THREE.Vector2(0.5, 0.75),
        new THREE.Vector2(0.625, 0.75),
        new THREE.Vector2(0.625, 0.875),
        new THREE.Vector2(0.5, 0.875)
      ];
      var head2Back = [
        new THREE.Vector2(0.625, 0.75),
        new THREE.Vector2(0.75, 0.75),
        new THREE.Vector2(0.75, 0.875),
        new THREE.Vector2(0.625, 0.875)
      ];
      var head2Right = [
        new THREE.Vector2(0.75, 0.75),
        new THREE.Vector2(0.875, 0.75),
        new THREE.Vector2(0.875, 0.875),
        new THREE.Vector2(0.75, 0.875)
      ];
      var head2Front = [
        new THREE.Vector2(0.875, 0.75),
        new THREE.Vector2(1, 0.75),
        new THREE.Vector2(1, 0.875),
        new THREE.Vector2(0.875, 0.875)
      ];
      this.head2Box = new THREE.BoxGeometry(22.5, 22.5, 22.5, 0, 0, 0);
      this.head2Box.faceVertexUvs[0] = [];
      this.head2Box.faceVertexUvs[0][0] = [head2Right[3], head2Right[0], head2Right[2]];
      this.head2Box.faceVertexUvs[0][1] = [head2Right[0], head2Right[1], head2Right[2]];
      this.head2Box.faceVertexUvs[0][2] = [head2Left[3], head2Left[0], head2Left[2]];
      this.head2Box.faceVertexUvs[0][3] = [head2Left[0], head2Left[1], head2Left[2]];
      this.head2Box.faceVertexUvs[0][4] = [head2Top[3], head2Top[0], head2Top[2]];
      this.head2Box.faceVertexUvs[0][5] = [head2Top[0], head2Top[1], head2Top[2]];
      this.head2Box.faceVertexUvs[0][6] = [head2Bottom[0], head2Bottom[3], head2Bottom[1]];
      this.head2Box.faceVertexUvs[0][7] = [head2Bottom[3], head2Bottom[2], head2Bottom[1]];
      this.head2Box.faceVertexUvs[0][8] = [head2Front[3], head2Front[0], head2Front[2]];
      this.head2Box.faceVertexUvs[0][9] = [head2Front[0], head2Front[1], head2Front[2]];
      this.head2Box.faceVertexUvs[0][10] = [head2Back[3], head2Back[0], head2Back[2]];
      this.head2Box.faceVertexUvs[0][11] = [head2Back[0], head2Back[1], head2Back[2]];
      this.head2Mesh = new THREE.Mesh(this.head2Box, material2);
      this.head2Mesh.name = "head2"
      this.head2Mesh.position.y = 70;
      scene.add(this.head2Mesh);

      // Body Overlay Parts
      var body2Top = [
        new THREE.Vector2(0.3125, 0.4375),
        new THREE.Vector2(0.4375, 0.4375),
        new THREE.Vector2(0.4375, 0.5),
        new THREE.Vector2(0.3125, 0.5)
      ];
      var body2Bottom = [
        new THREE.Vector2(0.4375, 0.4375),
        new THREE.Vector2(0.5625, 0.4375),
        new THREE.Vector2(0.5625, 0.5),
        new THREE.Vector2(0.4375, 0.5)
      ];
      var body2Left = [
        new THREE.Vector2(0.25, 0.25),
        new THREE.Vector2(0.3125, 0.25),
        new THREE.Vector2(0.3125, 0.4375),
        new THREE.Vector2(0.25, 0.4375)
      ];
      var body2Back = [
        new THREE.Vector2(0.3125, 0.25),
        new THREE.Vector2(0.4375, 0.25),
        new THREE.Vector2(0.4375, 0.4375),
        new THREE.Vector2(0.3125, 0.4375)
      ];
      var body2Right = [
        new THREE.Vector2(0.4375, 0.25),
        new THREE.Vector2(0.5, 0.25),
        new THREE.Vector2(0.5, 0.4375),
        new THREE.Vector2(0.4375, 0.4375)
      ];
      var body2Front = [
        new THREE.Vector2(0.5, 0.25),
        new THREE.Vector2(0.625, 0.25),
        new THREE.Vector2(0.625, 0.4375),
        new THREE.Vector2(0.5, 0.4375)
      ];
      this.body2Box = new THREE.BoxGeometry(22.5, 33.75, 11.25, 0, 0, 0);
      this.body2Box.faceVertexUvs[0] = [];
      this.body2Box.faceVertexUvs[0][0] = [body2Right[3], body2Right[0], body2Right[2]];
      this.body2Box.faceVertexUvs[0][1] = [body2Right[0], body2Right[1], body2Right[2]];
      this.body2Box.faceVertexUvs[0][2] = [body2Left[3], body2Left[0], body2Left[2]];
      this.body2Box.faceVertexUvs[0][3] = [body2Left[0], body2Left[1], body2Left[2]];
      this.body2Box.faceVertexUvs[0][4] = [body2Top[3], body2Top[0], body2Top[2]];
      this.body2Box.faceVertexUvs[0][5] = [body2Top[0], body2Top[1], body2Top[2]];
      this.body2Box.faceVertexUvs[0][6] = [body2Bottom[0], body2Bottom[3], body2Bottom[1]];
      this.body2Box.faceVertexUvs[0][7] = [body2Bottom[3], body2Bottom[2], body2Bottom[1]];
      this.body2Box.faceVertexUvs[0][8] = [body2Front[3], body2Front[0], body2Front[2]];
      this.body2Box.faceVertexUvs[0][9] = [body2Front[0], body2Front[1], body2Front[2]];
      this.body2Box.faceVertexUvs[0][10] = [body2Back[3], body2Back[0], body2Back[2]];
      this.body2Box.faceVertexUvs[0][11] = [body2Back[0], body2Back[1], body2Back[2]];
      this.body2Mesh = new THREE.Mesh(this.body2Box, material2);
      this.body2Mesh.name = "body2";
      this.body2Mesh.position.y = 45;
      scene.add(this.body2Mesh);

      // Right Arm Overlay Parts
      var rightArm2Top = [
        new THREE.Vector2(0.6875, 0.4375),
        new THREE.Vector2(0.75, 0.4375),
        new THREE.Vector2(0.75, 0.5),
        new THREE.Vector2(0.6875, 0.5),
      ];
      var rightArm2Bottom = [
        new THREE.Vector2(0.75, 0.4375),
        new THREE.Vector2(0.8125, 0.4375),
        new THREE.Vector2(0.8125, 0.5),
        new THREE.Vector2(0.75, 0.5)
      ];
      var rightArm2Left = [
        new THREE.Vector2(0.625, 0.25),
        new THREE.Vector2(0.6875, 0.25),
        new THREE.Vector2(0.6875, 0.4375),
        new THREE.Vector2(0.625, 0.4375)
      ];
      var rightArm2Back = [
        new THREE.Vector2(0.6875, 0.25),
        new THREE.Vector2(0.75, 0.25),
        new THREE.Vector2(0.75, 0.4375),
        new THREE.Vector2(0.6875, 0.4375)
      ];
      var rightArm2Right = [
        new THREE.Vector2(0.75, 0.25),
        new THREE.Vector2(0.8125, 0.25),
        new THREE.Vector2(0.8125, 0.4375),
        new THREE.Vector2(0.75, 0.4375)
      ];
      var rightArm2Front = [
        new THREE.Vector2(0.8125, 0.25),
        new THREE.Vector2(0.875, 0.25),
        new THREE.Vector2(0.875, 0.4375),
        new THREE.Vector2(0.8125, 0.4375)
      ];
      this.rightArm2Box = new THREE.BoxGeometry(11.25, 33.75, 11.25, 0, 0, 0);
      this.rightArm2Box.faceVertexUvs[0] = [];
      this.rightArm2Box.faceVertexUvs[0][0] = [rightArm2Right[3], rightArm2Right[0], rightArm2Right[2]];
      this.rightArm2Box.faceVertexUvs[0][1] = [rightArm2Right[0], rightArm2Right[1], rightArm2Right[2]];
      this.rightArm2Box.faceVertexUvs[0][2] = [rightArm2Left[3], rightArm2Left[0], rightArm2Left[2]];
      this.rightArm2Box.faceVertexUvs[0][3] = [rightArm2Left[0], rightArm2Left[1], rightArm2Left[2]];
      this.rightArm2Box.faceVertexUvs[0][4] = [rightArm2Top[3], rightArm2Top[0], rightArm2Top[2]];
      this.rightArm2Box.faceVertexUvs[0][5] = [rightArm2Top[0], rightArm2Top[1], rightArm2Top[2]];
      this.rightArm2Box.faceVertexUvs[0][6] = [rightArm2Bottom[0], rightArm2Bottom[3], rightArm2Bottom[1]];
      this.rightArm2Box.faceVertexUvs[0][7] = [rightArm2Bottom[3], rightArm2Bottom[2], rightArm2Bottom[1]];
      this.rightArm2Box.faceVertexUvs[0][8] = [rightArm2Front[3], rightArm2Front[0], rightArm2Front[2]];
      this.rightArm2Box.faceVertexUvs[0][9] = [rightArm2Front[0], rightArm2Front[1], rightArm2Front[2]];
      this.rightArm2Box.faceVertexUvs[0][10] = [rightArm2Back[3], rightArm2Back[0], rightArm2Back[2]];
      this.rightArm2Box.faceVertexUvs[0][11] = [rightArm2Back[0], rightArm2Back[1], rightArm2Back[2]];
      this.rightArm2Mesh = new THREE.Mesh(this.rightArm2Box, material2);
      this.rightArm2Mesh.name = "rightArm2";
      this.rightArm2Mesh.position.y = 45;
      this.rightArm2Mesh.position.x = -15;
      scene.add(this.rightArm2Mesh);

      // Left Arm Overlay Parts
      var leftArm2Top = [
        new THREE.Vector2(0.8125, 0.1875),
        new THREE.Vector2(0.875, 0.1875),
        new THREE.Vector2(0.875, 0.25),
        new THREE.Vector2(0.8125, 0.25),
      ];
      var leftArm2Bottom = [
        new THREE.Vector2(0.875, 0.1875),
        new THREE.Vector2(0.9375, 0.1875),
        new THREE.Vector2(0.9375, 0.25),
        new THREE.Vector2(0.875, 0.25)
      ];
      var leftArm2Left = [
        new THREE.Vector2(0.75, 0),
        new THREE.Vector2(0.8125, 0),
        new THREE.Vector2(0.8125, 0.1875),
        new THREE.Vector2(0.75, 0.1875)
      ];
      var leftArm2Back = [
        new THREE.Vector2(0.8125, 0),
        new THREE.Vector2(0.875, 0),
        new THREE.Vector2(0.875, 0.1875),
        new THREE.Vector2(0.8125, 0.1875)
      ];
      var leftArm2Right = [
        new THREE.Vector2(0.875, 0),
        new THREE.Vector2(0.9375, 0),
        new THREE.Vector2(0.9375, 0.1875),
        new THREE.Vector2(0.875, 0.1875)
      ];
      var leftArm2Front = [
        new THREE.Vector2(0.9375, 0),
        new THREE.Vector2(1, 0),
        new THREE.Vector2(1, 0.1875),
        new THREE.Vector2(0.9375, 0.1875)
      ];
      this.leftArm2Box = new THREE.BoxGeometry(11.75, 33.75, 11.75, 0, 0, 0);
      this.leftArm2Box.faceVertexUvs[0] = [];
      this.leftArm2Box.faceVertexUvs[0][0] = [leftArm2Right[3], leftArm2Right[0], leftArm2Right[2]];
      this.leftArm2Box.faceVertexUvs[0][1] = [leftArm2Right[0], leftArm2Right[1], leftArm2Right[2]];
      this.leftArm2Box.faceVertexUvs[0][2] = [leftArm2Left[3], leftArm2Left[0], leftArm2Left[2]];
      this.leftArm2Box.faceVertexUvs[0][3] = [leftArm2Left[0], leftArm2Left[1], leftArm2Left[2]];
      this.leftArm2Box.faceVertexUvs[0][4] = [leftArm2Top[3], leftArm2Top[0], leftArm2Top[2]];
      this.leftArm2Box.faceVertexUvs[0][5] = [leftArm2Top[0], leftArm2Top[1], leftArm2Top[2]];
      this.leftArm2Box.faceVertexUvs[0][6] = [leftArm2Bottom[0], leftArm2Bottom[3], leftArm2Bottom[1]];
      this.leftArm2Box.faceVertexUvs[0][7] = [leftArm2Bottom[3], leftArm2Bottom[2], leftArm2Bottom[1]];
      this.leftArm2Box.faceVertexUvs[0][8] = [leftArm2Front[3], leftArm2Front[0], leftArm2Front[2]];
      this.leftArm2Box.faceVertexUvs[0][9] = [leftArm2Front[0], leftArm2Front[1], leftArm2Front[2]];
      this.leftArm2Box.faceVertexUvs[0][10] = [leftArm2Back[3], leftArm2Back[0], leftArm2Back[2]];
      this.leftArm2Box.faceVertexUvs[0][11] = [leftArm2Back[0], leftArm2Back[1], leftArm2Back[2]];
      this.leftArm2Mesh = new THREE.Mesh(this.leftArm2Box, material2);
      this.leftArm2Mesh.name = "leftArm2";
      this.leftArm2Mesh.position.y = 45;
      this.leftArm2Mesh.position.x = 15;
      scene.add(this.leftArm2Mesh);

      // Right Leg Overlay Parts
      var rightLeg2Top = [
        new THREE.Vector2(0.0625, 0.4375),
        new THREE.Vector2(0.125, 0.4375),
        new THREE.Vector2(0.125, 0.5),
        new THREE.Vector2(0.0625, 0.5),
      ];
      var rightLeg2Bottom = [
        new THREE.Vector2(0.125, 0.4375),
        new THREE.Vector2(0.1875, 0.4375),
        new THREE.Vector2(0.1875, 0.5),
        new THREE.Vector2(0.125, 0.5)
      ];
      var rightLeg2Left = [
        new THREE.Vector2(0, 0.25),
        new THREE.Vector2(0.0625, 0.25),
        new THREE.Vector2(0.0625, 0.4375),
        new THREE.Vector2(0, 0.4375)
      ];
      var rightLeg2Back = [
        new THREE.Vector2(0.0625, 0.25),
        new THREE.Vector2(0.125, 0.25),
        new THREE.Vector2(0.125, 0.4375),
        new THREE.Vector2(0.0625, 0.4375)
      ];
      var rightLeg2Right = [
        new THREE.Vector2(0.125, 0.25),
        new THREE.Vector2(0.1875, 0.25),
        new THREE.Vector2(0.1875, 0.4375),
        new THREE.Vector2(0.125, 0.4375)
      ];
      var rightLeg2Front = [
        new THREE.Vector2(0.1875, 0.25),
        new THREE.Vector2(0.25, 0.25),
        new THREE.Vector2(0.25, 0.4375),
        new THREE.Vector2(0.1875, 0.4375)
      ];
      this.rightLeg2Box = new THREE.BoxGeometry(11.75, 33.75, 11.75, 0, 0, 0);
      this.rightLeg2Box.faceVertexUvs[0] = [];
      this.rightLeg2Box.faceVertexUvs[0][0] = [rightLeg2Right[3], rightLeg2Right[0], rightLeg2Right[2]];
      this.rightLeg2Box.faceVertexUvs[0][1] = [rightLeg2Right[0], rightLeg2Right[1], rightLeg2Right[2]];
      this.rightLeg2Box.faceVertexUvs[0][2] = [rightLeg2Left[3], rightLeg2Left[0], rightLeg2Left[2]];
      this.rightLeg2Box.faceVertexUvs[0][3] = [rightLeg2Left[0], rightLeg2Left[1], rightLeg2Left[2]];
      this.rightLeg2Box.faceVertexUvs[0][4] = [rightLeg2Top[3], rightLeg2Top[0], rightLeg2Top[2]];
      this.rightLeg2Box.faceVertexUvs[0][5] = [rightLeg2Top[0], rightLeg2Top[1], rightLeg2Top[2]];
      this.rightLeg2Box.faceVertexUvs[0][6] = [rightLeg2Bottom[0], rightLeg2Bottom[3], rightLeg2Bottom[1]];
      this.rightLeg2Box.faceVertexUvs[0][7] = [rightLeg2Bottom[3], rightLeg2Bottom[2], rightLeg2Bottom[1]];
      this.rightLeg2Box.faceVertexUvs[0][8] = [rightLeg2Front[3], rightLeg2Front[0], rightLeg2Front[2]];
      this.rightLeg2Box.faceVertexUvs[0][9] = [rightLeg2Front[0], rightLeg2Front[1], rightLeg2Front[2]];
      this.rightLeg2Box.faceVertexUvs[0][10] = [rightLeg2Back[3], rightLeg2Back[0], rightLeg2Back[2]];
      this.rightLeg2Box.faceVertexUvs[0][11] = [rightLeg2Back[0], rightLeg2Back[1], rightLeg2Back[2]];
      this.rightLeg2Mesh = new THREE.Mesh(this.rightLeg2Box, material2);
      this.rightLeg2Mesh.name = "rightLeg2"
      this.rightLeg2Mesh.position.y = 15;
      this.rightLeg2Mesh.position.x = -5;
      scene.add(this.rightLeg2Mesh);

      // Left Leg Overlay Parts
      var leftLeg2Top = [
        new THREE.Vector2(0.0625, 0.1875),
        new THREE.Vector2(0.125, 0.1875),
        new THREE.Vector2(0.125, 0.25),
        new THREE.Vector2(0.0625, 0.25),
      ];
      var leftLeg2Bottom = [
        new THREE.Vector2(0.125, 0.1875),
        new THREE.Vector2(0.1875, 0.1875),
        new THREE.Vector2(0.1875, 0.25),
        new THREE.Vector2(0.125, 0.25)
      ];
      var leftLeg2Left = [
        new THREE.Vector2(0, 0),
        new THREE.Vector2(0.0625, 0),
        new THREE.Vector2(0.0625, 0.1875),
        new THREE.Vector2(0, 0.1875)
      ];
      var leftLeg2Back = [
        new THREE.Vector2(0.0625, 0),
        new THREE.Vector2(0.125, 0),
        new THREE.Vector2(0.125, 0.1875),
        new THREE.Vector2(0.0625, 0.1875)
      ];
      var leftLeg2Right = [
        new THREE.Vector2(0.125, 0),
        new THREE.Vector2(0.1875, 0),
        new THREE.Vector2(0.1875, 0.1875),
        new THREE.Vector2(0.125, 0.1875)
      ];
      var leftLeg2Front = [
        new THREE.Vector2(0.1875, 0),
        new THREE.Vector2(0.25, 0),
        new THREE.Vector2(0.25, 0.1875),
        new THREE.Vector2(0.1875, 0.1875)
      ];
      this.leftLeg2Box = new THREE.BoxGeometry(11.75, 33.75, 11.75, 0, 0, 0);
      this.leftLeg2Box.faceVertexUvs[0] = [];
      this.leftLeg2Box.faceVertexUvs[0][0] = [leftLeg2Right[3], leftLeg2Right[0], leftLeg2Right[2]];
      this.leftLeg2Box.faceVertexUvs[0][1] = [leftLeg2Right[0], leftLeg2Right[1], leftLeg2Right[2]];
      this.leftLeg2Box.faceVertexUvs[0][2] = [leftLeg2Left[3], leftLeg2Left[0], leftLeg2Left[2]];
      this.leftLeg2Box.faceVertexUvs[0][3] = [leftLeg2Left[0], leftLeg2Left[1], leftLeg2Left[2]];
      this.leftLeg2Box.faceVertexUvs[0][4] = [leftLeg2Top[3], leftLeg2Top[0], leftLeg2Top[2]];
      this.leftLeg2Box.faceVertexUvs[0][5] = [leftLeg2Top[0], leftLeg2Top[1], leftLeg2Top[2]];
      this.leftLeg2Box.faceVertexUvs[0][6] = [leftLeg2Bottom[0], leftLeg2Bottom[3], leftLeg2Bottom[1]];
      this.leftLeg2Box.faceVertexUvs[0][7] = [leftLeg2Bottom[3], leftLeg2Bottom[2], leftLeg2Bottom[1]];
      this.leftLeg2Box.faceVertexUvs[0][8] = [leftLeg2Front[3], leftLeg2Front[0], leftLeg2Front[2]];
      this.leftLeg2Box.faceVertexUvs[0][9] = [leftLeg2Front[0], leftLeg2Front[1], leftLeg2Front[2]];
      this.leftLeg2Box.faceVertexUvs[0][10] = [leftLeg2Back[3], leftLeg2Back[0], leftLeg2Back[2]];
      this.leftLeg2Box.faceVertexUvs[0][11] = [leftLeg2Back[0], leftLeg2Back[1], leftLeg2Back[2]];
      this.leftLeg2Mesh = new THREE.Mesh(this.leftLeg2Box, material2);
      this.leftLeg2Mesh.name = "leftLeg2";
      this.leftLeg2Mesh.position.y = 15;
      this.leftLeg2Mesh.position.x = 5;
      scene.add(this.leftLeg2Mesh);

    }
    this.renderSkin(scene)
/*
    if(!hasAnimate)
    {
      RenderSkin();
      hasAnimate = true;
      Animate();
    }
*/
  img.onerror = function() {
    console.log("Failed loading " + img.src);
  }


/*
  function renderSkin(scene) {
  }
*/
  this.changePosition=function (x,y,z) {
    this.headMesh.position.x+=x
    this.headMesh.position.y+=y
    this.headMesh.position.z+=z
    this.head2Mesh.position.x+=x
    this.head2Mesh.position.y+=y
    this.head2Mesh.position.z+=z
    this.bodyMesh.position.x+=x
    this.bodyMesh.position.y+=y
    this.bodyMesh.position.z+=z
    this.body2Mesh.position.x+=x
    this.body2Mesh.position.y+=y
    this.body2Mesh.position.z+=z
    this.leftArmMesh.position.x+=x
    this.leftArmMesh.position.y+=y
    this.leftArmMesh.position.z+=z
    this.leftArm2Mesh.position.x+=x
    this.leftArm2Mesh.position.y+=y
    this.leftArm2Mesh.position.z+=z
    this.rightArmMesh.position.x+=x
    this.rightArmMesh.position.y+=y
    this.rightArmMesh.position.z+=z
    this.rightArm2Mesh.position.x+=x
    this.rightArm2Mesh.position.y+=y
    this.rightArm2Mesh.position.z+=z
    this.leftLegMesh.position.x+=x
    this.leftLegMesh.position.y+=y
    this.leftLegMesh.position.z+=z
    this.leftLeg2Mesh.position.x+=x
    this.leftLeg2Mesh.position.y+=y
    this.leftLeg2Mesh.position.z+=z
    this.rightLegMesh.position.x+=x
    this.rightLegMesh.position.y+=y
    this.rightLegMesh.position.z+=z
    this.rightLeg2Mesh.position.x+=x
    this.rightLeg2Mesh.position.y+=y
    this.rightLeg2Mesh.position.z+=z

  }
  this.rotate=function (alpha,theta) {
    this.leftLeg2Mesh.rotation.y = this.leftLegMesh.rotation.y = theta;
    this.leftLeg2Mesh.position.z = this.leftLegMesh.position.z = this.leftLeg2Mesh.position.z + 5*Math.sin(alpha)-5*Math.sin(theta)/*+6*Math.cos(alpha)*Math.sin(omega)-6*Math.sin(omega)*Math.cos(theta)*/;
    this.leftLeg2Mesh.position.x = this.leftLegMesh.position.x = this.leftLeg2Mesh.position.x - 5*Math.cos(alpha)+5*Math.cos(theta)/*+6*Math.sin(alpha)*Math.sin(omega)-6*Math.sin(omega)*Math.sin(theta)*/;
    /*leftLeg2Mesh.position.y = leftLegMesh.position.y = leftLeg2Mesh.position.y+6*Math.cos(omega-Math.PI/90)-6*Math.cos(omega);*/

    //rightLeg2Mesh.rotation.x=rightLegMesh.rotation.x=Math.cos(omega);
    this.rightLeg2Mesh.rotation.y = this.rightLegMesh.rotation.y = theta;
    this.rightLeg2Mesh.position.z = this.rightLegMesh.position.z = this.rightLeg2Mesh.position.z - 5*Math.sin(alpha)+5*Math.sin(theta);
    this.rightLeg2Mesh.position.x = this.rightLegMesh.position.x = this.rightLeg2Mesh.position.x + 5*Math.cos(alpha)-5*Math.cos(theta);
    //rightLeg2Mesh.position.y = rightLegMesh.position.y = rightLeg2Mesh.position.y+6*Math.cos(omega)-6*Math.cos(omega);

    this.bodyMesh.rotation.y+=theta-alpha;
    this.body2Mesh.rotation.y +=theta-alpha;
    this.headMesh.rotation.y+=theta-alpha;
    this.head2Mesh.rotation.y +=theta-alpha;

    //Arm Swing
    /*		leftArm2Mesh.rotation.x = leftArmMesh.rotation.x = Math.cos(alpha*4 + (Math.PI));
     leftArm2Mesh.position.z = leftArmMesh.position.z = 0 - 6*Math.sin(leftArmMesh.rotation.x);
     leftArm2Mesh.position.y = leftArmMesh.position.y = -4 - 6*Math.abs(Math.cos(leftArmMesh.rotation.x));
     rightArm2Mesh.rotation.x = rightArmMesh.rotation.x = Math.cos(alpha*4);
     rightArm2Mesh.position.z = rightArmMesh.position.z = 0 - 6*Math.sin(rightArmMesh.rotation.x);
     rightArm2Mesh.position.y = rightArmMesh.position.y = -4 - 6*Math.abs(Math.cos(rightArmMesh.rotation.x));*/
    this.leftArm2Mesh.rotation.y = this.leftArmMesh.rotation.y = theta;
    this.leftArm2Mesh.position.z = this.leftArmMesh.position.z = this.leftArm2Mesh.position.z + 15*Math.sin(alpha)-15*Math.sin(theta);
    this.leftArm2Mesh.position.x = this.leftArmMesh.position.x = this.leftArm2Mesh.position.x - 15*Math.cos(alpha)+15*Math.cos(theta);
    this.rightArm2Mesh.rotation.y = this.rightArmMesh.rotation.y = theta;
    this.rightArm2Mesh.position.z = this.rightArmMesh.position.z = this.rightArm2Mesh.position.z - 15*Math.sin(alpha)+15*Math.sin(theta);
    this.rightArm2Mesh.position.x = this.rightArmMesh.position.x = this.rightArm2Mesh.position.x + 15*Math.cos(alpha)-15*Math.cos(theta);

    //console.log(this.head2Mesh.rotation)
    //console.log(this.body2Mesh.rotation)

    //renderer.render(scene, camera);

  }
  this.remove = function() {
    scene.remove(this.headMesh);
    scene.remove(this.bodyMesh);
    scene.remove(this.rightArmMesh);
    scene.remove(this.leftArmMesh);
    scene.remove(this.rightLegMesh);
    scene.remove(this.leftLegMesh);
    scene.remove(this.head2Mesh);
    scene.remove(this.body2Mesh);
    scene.remove(this.rightArm2Mesh);
    scene.remove(this.leftArm2Mesh);
    scene.remove(this.rightLeg2Mesh);
    scene.remove(this.leftLeg2Mesh);

  }
}
module.exports=PersonMesh
