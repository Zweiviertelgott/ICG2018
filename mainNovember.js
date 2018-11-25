let gl;
let program;
let objects = [];
let posLoc,
	colorLoc;
// Globale Variablen, die erst einmal als Platzhalter dienen, 
// bis wir eine coole Werteeingabe über ein Userinterface gebastelt haben:
let treBraLength = +0.1,
	treBraBreadth = +0.2,	// Branch Breadth
	treHeight = +0.5,	
	treBreadth = +0.1		// Trunk Breadth
;

function main() {

	// Get canvas and setup WebGL context
    const canvas = document.getElementById("gl-canvas");
	gl = canvas.getContext('webgl2');

	// Configure viewport
	gl.viewport(0,0,canvas.width,canvas.height);
	gl.clearColor(1.0,1.0,1.0,1.0);

	gl.enable(gl.DEPTH_TEST);

	// Init shader program via additional function and bind it
	program = initShaders(gl, "vertex-shader", "fragment-shader");
	gl.useProgram(program);

	// Get locations of shader variables
	posLoc = gl.getAttribLocation(program, "vPosition");
	colorLoc = gl.getAttribLocation(program, "vColor");

	// Create object instances
//	let cube = new Object3D();
//	objects.push(cube);

	let island = new Island();
	objects.push(island);

	let ocean = new Ocean();
	objects.push(ocean);

//	let river = new River();
//	objects.push(river);

	let sky = new Sky(Math.random()*3/2);
	objects.push(sky);

	cloNumber=20;		// Left Cloud
	var i;
	for (i = 0; i < cloNumber; i++) {
	let cloud = new Cloud(
				-6+i*Math.random()/6, 	// x Cloud
				0+Math.random(), 		// y Cloud
				-1-i*Math.random()/5, 	// z Cloud
				0.3+Math.random()/2, 	// Height Cloud
				0.3+Math.random()/2,	// Length Cloud
				1.0,					// Color 0 Cloud
				1.0,					// Color 1 Cloud
				1.0,					// Color 2 Cloud
				1.0);					// Color 3 Cloud
	objects.push(cloud);
	}

	cloNumber=20;		// Right Cloud
	var i;
	for (i = 0; i < cloNumber; i++) {
	let cloud = new Cloud(
				4+i*Math.random()/6, 	// x Cloud
				2+Math.random()*2, 		// y Cloud
				1-i*Math.random()/6, 	// z Cloud
				0.3+Math.random()/2, 	// Height Cloud
				0.3+Math.random()/2,	// Length Cloud
				1.0,						// Color 0 Cloud
				1.0,						// Color 1 Cloud
				1.0,						// Color 2 Cloud
				1.0);						// Color 3 Cloud
	objects.push(cloud);
	}

	let trunk = new Trunk( 
		+0.0,			// Trunk X-Coordinate
		-1.0,			// Trunk Y-Coordinate
		+0.0,			// Trunk Z-Coordinate
		treBreadth		+Math.random()/5, 		// Trunk Breadth
		treHeight		+0.5+Math.random()/2,		// Trunk Height
		treBraBreadth	+0.2+Math.random()/3,		// Branch Breadth
		treBraLength	+0.1+Math.random()/5,		// Branch Length
		210/255-Math.random()/6,	// Trunk Red-Value
		105/255+Math.random()/8,	// Trunk Green-Value
		30/255+Math.random()/6, 	// Trunk Blue-Value
		1.0);					// Trunk Saturation-Value(?)
	objects.push(trunk);

	leafNumber=100;
	var i;
	for (i = 0; i < leafNumber; i++) {		// Batch of Leaves
		let leaf = new Leaf(
		Math.min(0.0-treBraLength+i*Math.random()/40, 0.0+treBraLength*2),	// leafX 
		+0.0+treHeight*3/4+Math.random(),	// leafY 
		Math.max(0.0+treBraLength-i*Math.random()/40, 0.0-treBraLength*2),	// leafZ 
		0.7,				// eafLength 
		0.2,			// leafDirectionX 
		0.1,			// leafDirectionY
		0.2);				// leafDirectionZ
	objects.push(leaf);
	}



	render();
};

function render() {
	
	// Only clear once
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	// Call render function of each scene object
    for(let object of objects) {
		object.Render();
	};
}

// translation function


// scaling function


// rotating function


// composition function?


main();
