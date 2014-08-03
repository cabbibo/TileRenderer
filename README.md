Three.js Tile Renderer
=====

Hey Friends!

This is a simple extra script that will help you download a rendered scene broken into several larger images, so that you can make a big poster to impress your friends or try and make that $$$.

To use , simply:

a) Include your script

```javascript
<script src="path/to/TileRenderer.js"></script>
```

b) Whenever you want to render a tiled scene ( *hint* its not every frame ) , call the following:

```javascript

/*

   THREE.renderTiledScene(

    your renderer,
    your scene,
    your camera,
    the number of columns,                || Defaults to 3
    the number of rows,                   || Defaults to 3
    the title you want it to be saved as  || Defaults to 'TiledImage

   );


*/

THREE.renderTiledScene( renderer , scene , camera , 2 , 2 , 'HELLO' );


```

Thats it! You are going to have to stitch together the images yourself in photochop, I'm sorry, but if anybody has any ideas for that, get at me

[ @Cabbibo ]( http://twitter.com/cabbibo )
