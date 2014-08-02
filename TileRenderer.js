
var tileRenderer;


/*** ADDING SCREEN SHOT ABILITY ***/
window.addEventListener("keyup", function(e){
    
    var imgData, imgNode;
    //Listen to 'P' key
    if(e.which !== 80) return;  
      
    tileRenderer = new TileRenderer( renderer , scene , camera , 2 , 2 );

    if( tileRenderer.renderer.stop ){

      tileRenderer.renderer.stop();
      tileRenderer.createImage();

    }else{

      tileRenderer.createImage();

    }

});


function TileRenderer( renderer, scene , camera, numCols, numRows ){

  console.log( 'renderer' );
  console.log( renderer );
  // Gets the DPI to render properly
  
  this.renderer         = renderer;
  this.scene            = scene;
  this.camera           = camera;

  this.numberOfColumns  = numCols;
  this.numberOfRows     = numRows;

  this.totalWidth       = this.renderer.domElement.width  * numCols;
  this.totalHeight      = this.renderer.domElement.height * numRows;


  // Creating a canvas to stitch all the images in.
  // This is the canvas which will be our final output image
  this.stitchedCanvas         = document.createElement( 'canvas' );

  // Setting up the stitchedCanvas so it will be the size of
  // our total image
  this.stitchedCanvas.width   = this.totalWidth  ;
  this.stitchedCanvas.height  = this.totalHeight ;

  // scc = stitchedCanvasContext
  // used for drawing our new data
  this.scc = this.stitchedCanvas.getContext( '2d' );

  // Sets up an array that will hold all the different cameras
  // That while write every 'tile'
  this.cameras = [];

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

      this.camera.add( cam );

      cam.setViewOffset(
        this.totalWidth ,
        this.totalHeight ,
        this.renderer.domElement.width  * i,
        this.renderer.domElement.height * j,
        this.renderer.domElement.width      ,
        this.renderer.domElement.height    
      );

      this.cameras.push( cam );

    }

  }

  

}

TileRenderer.prototype = {


  createImage: function(){
   
    this.updateBoundingSpheres();
    this.renderer.render( this.scene , this.camera );
    
    //console logs the regular image for comparison
    imgData = this.renderer.domElement.toDataURL();  

    for( var i = 0; i < this.cameras.length; i++ ){

      this.cameras[i].position = this.camera.position.clone();
      this.cameras[i].rotation = this.camera.rotation.clone();
      var x = Math.floor( i / this.numberOfColumns );
      var y = i % this.numberOfRows;

      this.renderer.render( this.scene , this.cameras[i] );
      imgData = renderer.domElement.toDataURL();      
      console.log(imgData);

      imgNode = document.createElement("img");
      imgNode.src = imgData;

      this.scc.drawImage( 
        imgNode ,
        this.renderer.domElement.width * x , 
        this.renderer.domElement.height * y     
      );

    }

    var fullImg = this.stitchedCanvas.toDataURL();

    console.log( fullImg );

  },



  // Updates every single objects bounding sphere,
  // so we can tell what is rendered where
  updateBoundingSpheres: function(){

    for( var i = 0; i < scene.__webglObjects.length; i ++ ){
    
      var obj = scene.__webglObjects[i];
      if( obj.object instanceof THREE.Mesh ){
        obj.object.geometry.computeBoundingSphere();
      }

    }

  },

  resize:function( w , h  ){



  },

  freezeScene:function(){


  }

}



