THREE.renderTiledScene = function( renderer, scene , camera, numCols, numRows , title ){
  
  var numCols           = numCols || 3;
  var numRows           = numRows || 3;
  var title             = title   || 'TiledImage';

  var totalWidth        = renderer.domElement.width  * numCols;
  var totalHeight       = renderer.domElement.height * numRows;

  // Sets up an array that will hold all the different cameras
  // That while write every 'tile'
  var cameras = [];


   // setting up cameras
  for( var i = 0 ; i < numCols; i++ ){
  
    for( var j = 0; j < numRows; j++ ){

      // Mimics the camera passed into the tileRenderer
      var cam = new THREE.PerspectiveCamera(
        camera.fov,
        camera.aspect,
        camera.near,
        camera.far
      )

      camera.add( cam );

      cam.setViewOffset(
        totalWidth ,
        totalHeight ,
        renderer.domElement.width  * i,
        renderer.domElement.height * j,
        renderer.domElement.width      ,
        renderer.domElement.height    
      );

      cameras.push( cam );

    }

  }

  renderer.render( scene ,camera );
    
  //console logs the regular image for comparison
  imgData = renderer.domElement.toDataURL();  

  var a = document.createElement('a');
  a.href = imgData;
  a.download = title + "_full.png";
  a.click();
  
  var imageData = [];

  for( var i = 0; i < cameras.length; i++ ){

    var x = Math.floor( i / numCols );
    var y = i % numRows;

    renderer.render( scene , cameras[i] );
    imgData = renderer.domElement.toDataURL();      

    imageData.push( imgData );

    var a = document.createElement('a');

    a.href = imgData;
    a.download = title + "_"+x+"_"+y+".png";
    a.click();

  }

  return imageData;

}

