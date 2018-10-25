var clock = new THREE.Clock();
var delta = clock.getDelta(); // seconds.
var rotateAngle = Math.PI / 2 * delta;   // pi/2 radians (90 degrees) per second
var container, stats;

var camera, scene, renderer;
var uniforms, material, mesh, starMaterial;
var obj;
var obj2;
var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

init()

function init() {

    container = document.createElement( 'div' );
    document.body.appendChild( container );

    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
    camera.position.z = 600;

    // scene

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xFF7619 );
    uniforms = {
			time: { type: "f", value: 1.0 },
			resolution: { type: "v2", value: new THREE.Vector2() }
		};

    material = new THREE.ShaderMaterial( {
        uniforms: uniforms,
        vertexShader: document.getElementById( 'vertexShader' ).textContent,
        fragmentShader: document.getElementById( 'fragmentShader' ).textContent
    });

    var ambient = new THREE.AmbientLight( 0x101030 );
    scene.add( ambient );

    var directionalLight = new THREE.DirectionalLight( 0xffeedd );
    directionalLight.position.set( 0, 0, 1 );
    scene.add( directionalLight );

    // texture

    var manager = new THREE.LoadingManager();
    manager.onProgress = function ( item, loaded, total ) {

        console.log( item, loaded, total );

    };

    // model
    var loader = new THREE.OBJLoader( manager );
    loader.load( 'tinker1.obj', function ( object ) {

        object.traverse( function ( child ) {

            if ( child instanceof THREE.Mesh ) {

                child.material = material;
            }
        } );
        object.rotation.x = -90*Math.PI / 180;
//        object.rotation.y = 20* Math.PI / 180;
//        object.rotation.z = 20* Math.PI / 180;
        object.scale.x = 2;
        object.scale.y = 2;
        object.scale.z = 2;
        obj = object
        scene.add( obj );

    } );


    starMaterial = new THREE.MeshStandardMaterial( {
        metalness: 1,   // between 0 and 1
        roughness: 0.5, // between 0 and 1
        color: 0xADFF2F
    } );

        // model
    var loader = new THREE.OBJLoader( manager );
    loader.load( 'tinker2.obj', function ( object ) {

        object.traverse( function ( child ) {

            if ( child instanceof THREE.Mesh ) {

                child.material = starMaterial;
            }
        } );
        object.rotation.x = -90*Math.PI / 180;
//        object.rotation.y = 20* Math.PI / 180;
//        object.rotation.z = 20* Math.PI / 180;
        object.position.x = -5
        object.scale.x = 1;
        object.scale.y = 1;
        object.scale.z = 1;
        obj2 = object
        scene.add( obj2 );

    } );

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.vr.enabled = true;
    container.appendChild( renderer.domElement );
    /* 3. Add the WebVR button */
    document.body.appendChild( WEBVR.createButton( renderer ) );

    document.addEventListener( 'mousemove', onDocumentMouseMove, false );

    window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}

function onDocumentMouseMove( event ) {
    mouseX = ( event.clientX - windowHalfX ) / 2;
    mouseY = ( event.clientY - windowHalfY ) / 2;
}

window.onload = function() {

//    init();

    renderer.setAnimationLoop( mainLoop );

    function mainLoop()
    {
    processInput();
    update();
    draw();

    }


    function processInput()
    {

    }

    function draw()
    {
        renderer.render(scene,camera);
    }

    function update()
    {
        obj.rotation.z += (0.2*(Math.PI / 180));
        obj.rotation.z %=360;

        obj2.rotation.z += (0.2*(Math.PI / 180));
        obj2.rotation.z %=360;
//
        camera.position.x += ( mouseX - camera.position.x ) * .05;
        camera.position.y += ( - mouseY - camera.position.y ) * .05;

        camera.lookAt( scene.position );
    }

}