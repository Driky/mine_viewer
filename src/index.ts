/// <reference path="../node_modules/@types/three/index.d.ts" />

//import * as THREE from "three";
// this line does't work. Error: Cannot find module 'three' from ...
// https://github.com/pinqy520/three-typescript-starter/blob/master/src/index.ts

class Game
{
    private _scene: THREE.Scene;
    //private _canvas: HTMLCanvasElement;
    private _camera: THREE.PerspectiveCamera;
    private _renderer: THREE.WebGLRenderer;
    private _axis: THREE.AxisHelper;
    private _light: THREE.DirectionalLight;
    private _light2: THREE.DirectionalLight;
    private _material: THREE.MeshBasicMaterial;
    private _box: THREE.Mesh;
    private _plane: THREE.Mesh;
    private _texture: THREE.Texture;
    private _material2: THREE.Material;
    private _skyBox: THREE.Mesh;
    private _controls : THREE.OrbitControls;

    public constructor()
    {
        //this._canvas = <HTMLCanvasElement>document.getElementById(canvasElement);
        this._scene = new THREE.Scene(); // create the scene
        // create the camera
        this._camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100000000);
        this._renderer = new THREE.WebGLRenderer();
        this._controls = new THREE.OrbitControls( this._camera, this._renderer.domElement );
        this._axis = new THREE.AxisHelper(10); // add axis to the scene
        this._light = new THREE.DirectionalLight(0xffffff, 1.0); // add light1
        this._light2 = new THREE.DirectionalLight(0xffffff, 1.0); // add light2
        this._material = new THREE.MeshBasicMaterial({
            color: 0xaaaaaa,
            wireframe: true
        });
        // create a box and add it to the scene
        this._box = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), this._material);
   
        console.log("before");
        //this._texture = new THREE.TextureLoader().load( "https://i.cubeupload.com/e5om7n.png" );
        this._texture = new THREE.TextureLoader().load( "http://34.231.100.253/data/maps/1767_2.png" );
        
        console.log("After");
        this._material2 = new THREE.MeshBasicMaterial({ map : this._texture, side: THREE.DoubleSide });
        this._plane = new THREE.Mesh(new THREE.PlaneGeometry(1000, 1000, 10, 10), this._material2);
      
        var skyBoxGeometry = new THREE.CubeGeometry( 10000, 10000, 10000 );
	      var skyBoxMaterial = new THREE.MeshBasicMaterial( { color: 0x9999ff, side: THREE.BackSide } );
	      this._skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
        // scene.add(skyBox);
        this._scene.fog = new THREE.FogExp2( 0x9999ff, 0.00025 );
    }

    public createScene(): void
    {
        // set size
        this._renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this._renderer.domElement); // add canvas to dom
        this._scene.add(this._axis);
        this._light.position.set(100, 100, 100);
        this._scene.add(this._light);
        this._light2.position.set(0, 150, 100)
        this._scene.add(this._light2);
        this._scene.add(this._box)
        this._box.position.x = 0.5;
        this._box.rotation.y = 0.5;
        this._scene.add(this._plane);
        this._plane.position.x = -10.0;
        this._plane.position.y = 0.0;
      
        this._skyBox.position.x = 0.0;
        this._skyBox.position.y = 5000.0;
        this._scene.add(this._skyBox);

        this._camera.position.x = 5;
        this._camera.position.y = 5;
        this._camera.position.z = 5;

        this._camera.lookAt(this._scene.position);
    }

    public animate(): void
    {
        requestAnimationFrame(this.animate.bind(this));
        this._render();
    }

    private _render(): void
    {
        let timer = 0.002 * Date.now();
        this._box.position.y = 0.5 + 0.5 * Math.sin(timer);
        this._box.rotation.x += 0.1;
        this._renderer.render(this._scene, this._camera);
    }
}

window.onload = () =>
{
    let game = new Game();
    game.createScene();
    game.animate();
}
