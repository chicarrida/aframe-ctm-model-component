/*
* Taken from
* https://github.com/Cecropia/thehallaframe/blob/master/js/ctm_component.js
*/

if(typeof AFRAME === 'undefined'){
  throw new Error('Component attempted to register before AFRAME was available.');
}

AFRAME.registerComponent('ctm', {
    schema: {
        src: {type: 'asset'},
        side: {type: 'number', default: THREE.DoubleSide},
        scale: {type: 'number', default: 1},
        name: {type: 'string', default: ''},
    },

    multiple: true,


    init: function () {
        var ctmLoader = new THREE.CTMLoader();
        var that = this;

        var textureLoader = new THREE.TextureLoader();

        ctmLoader.load( this.data.src,   function( bufferGeometry ) {
          var meshPhongMaterial = undefined;
          if(that.data.name !== ''){
            meshPhongMaterial = new THREE.MeshPhongMaterial({color: 0xd9d9d9});
          }else{
            meshPhongMaterial = new THREE.MeshPhongMaterial({color: 0xd9d9d9,  vertexColors: THREE.VertexColors});
          }
          var mesh = new THREE.Mesh(bufferGeometry, meshPhongMaterial);
          mesh.material.side = that.data.side;

          var bBox = new THREE.Box3().setFromObject(mesh);
          let max = Math.max(bBox.getSize().x, bBox.getSize().y, bBox.getSize().z);
          let scaleFactor = that.data.scale/max;
          mesh.scale.multiplyScalar(scaleFactor);

          if(that.data.name !== ''){
            mesh.material.map = textureLoader.load(that.data.name);
          }

          that.el.setObject3D('mesh', mesh);

        }, { useWorker: true, worker: new Worker( "../js/CTMWorker.js" ), useBuffer: false} );
    },

    update: function(){

    },

    play: function(){

    },

    tick: function(){


    },

});
