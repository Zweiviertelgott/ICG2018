class Object3D {

	constructor() {

		this.posVBO = gl.createBuffer();
		this.colorVBO = gl.createBuffer();
		this.indexVBO = gl.createBuffer();

		this.positions = [
			-1, -1, -1, // index 0
			-1, -1,  1, // index 1
			-1,  1, -1, // index 2
			-1,  1,  1, // index 3
			 1, -1, -1, // index 4
			 1, -1,  1, // index 5
			 1,  1, -1, // index 6
			 1,  1,  1  // index 7
		];

		this.indices = [
			1, 7, 3,	1, 5, 7, // Front
			5, 6, 7, 	5, 4, 6, // Right	 
			4, 2, 0, 	4, 6, 2, // Back
			0, 3, 2, 	0, 1, 3, // Left
			0, 5, 1, 	0, 4, 5, // Bottom
			3, 6, 2,	3, 7, 6  // Top
		];

		this.colors = [ 
			0, 0, 0, 1, // index 0
			1, 0, 0, 1, // index 1
			0, 1, 0, 1, // index 2
			0, 0, 1, 1, // index 3
			1, 1, 0, 1, // index 4 
			1, 0, 1, 1, // index 5
			0, 1, 1, 1, // index 6
			1, 1, 1, 1  // index 7
		];

		this.InitBuffers();
	}

	InitBuffers() {

		gl.bindBuffer(gl.ARRAY_BUFFER, this.posVBO);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.positions), gl.STATIC_DRAW);

		gl.bindBuffer(gl.ARRAY_BUFFER, this.colorVBO);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.colors), gl.STATIC_DRAW);
		
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexVBO);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), gl.STATIC_DRAW);
	}

	Render() {

		// Link data in VBO to shader variables
		gl.bindBuffer(gl.ARRAY_BUFFER, this.posVBO);
		gl.enableVertexAttribArray(posLoc);
		gl.vertexAttribPointer(posLoc, 3, gl.FLOAT, false, 0, 0);

	    // Link data in VBO to shader variables
	    gl.bindBuffer(gl.ARRAY_BUFFER, this.colorVBO);
		gl.enableVertexAttribArray(colorLoc);
		gl.vertexAttribPointer(colorLoc, 4, gl.FLOAT, false, 0, 0);

		// Render
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexVBO);
		gl.drawElements(gl.TRIANGLES, this.indices.length, gl.UNSIGNED_SHORT, 0);
	}
}

class Cloud extends Object3D {

	constructor(X,Y,Z,Height,Length, color0, color1, color2, color3) {

		super();

		//cloudX = X;
		//cloudY = Y;
		//cloudZ = Z;
		//cloHeight = Height;
		//cloLength = Length;
		//clocolor0 = color0;
		//clocolor1 = color1;
		//clocolor2 = color2;
		//clocolor3 = color3;

		this.positions = [ // A single Cloud-Bubble
			X,							Y,							Z,							//0 Bottom
	
			X-Length*Math.random()*2, 	Y+Math.random()/2, 			Z+Length*Math.random(),		//1
			X-Length*Math.random(), 	Y+Math.random()/2, 			Z-Length*Math.random()*2,	//2
			X+Length*Math.random(), 	Y+Math.random()/2, 			Z-Length*Math.random()*2,	//3 Upper Rim
			X+Length*Math.random()*2, 	Y+Math.random()/2,			Z+Length*Math.random(),		//4
			X+Length*Math.random(), 	Y+Math.random()/2, 			Z+Length*Math.random()*2,	//5
	
			X-Length, 					Y+Height, 					Z,							//6
			X, 							Y+Height, 					Z-Length,					//7
			X+Length*0.8, 				Y+Height, 					Z-Length/2,					//8 Middle
			X+Length*0.8, 				Y+Height, 					Z+Length/2,					//9
			X-Length*Math.random(), 	Y+Height, 					Z+Length,					//10
	
			X-Length*Math.random(), 	Y+Height*2-Math.random()/2, Z+Length*Math.random(),		//11
			X-Length*Math.random(), 	Y+Height*2-Math.random()/2, Z-Length*Math.random(),		//12
			X+Length*Math.random(), 	Y+Height*2-Math.random()/2, Z-Length*Math.random(),		//13 Lower Rim
			X+Length*Math.random(), 	Y+Height*2-Math.random()/2, Z,							//14
			X, 							Y+Height*2-Math.random()/2, Z+Length*Math.random(),		//!5
	
			X, 							Y+Height*2,					Z,							//16 Top
		];

		this.indices = [	// A single Cloud-Bubble
			0,1,2,
			0,2,3,
			0,3,4,
			0,4,5,
			0,5,1,
			1,2,6,
			1,6,11,
			1,11,16,
			1,16,5,
			2,3,7,
			2,7,12,
			2,12,6,
			3,4,8,
			3,8,13,
			3,13,7,
			4,5,9,
			4,9,14,
			4,14,8,
			5,10,15,
			5,15,9,
			6,11,12,
			7,12,13,
			8,13,14,
			9,14,15,
			10,15,11,
			16,11,12,
			16,12,13,
			16,13,14,
			16,14,15,
			16,15,11
			];

		var skyDarkness = Math.random()*3/2;
			
		this.colors = [];
		for(var i = 0; i < this.positions.length; i += 3) {
			this.colors.push(
				color0-Math.random()/6, 				// Red Dead Redemption
				color1-Math.random()/6, 				// Green Mile
				color2-Math.random()/8, 				// Blue Men Group
				color3); 							// Everybody- TAKE COVER!
		}	
			// (25,25,112)=Midnightblue		
			// (65,105,225)=Royalblue		
			// (176,224,230)=Powderblue

		this.InitBuffers();
	}
}

class Sky extends Object3D {

	constructor(skyDarkness) {

		super();

		this.positions = [
				-11,-9,-5,
				-11,5,-5,
				3,5,-5,
				3,-6,-5
			];

		this.indices = [
				0,1,3,
				1,2,3
			];
			
		this.colors = [];
		for(var i = 0; i < this.positions.length; i += 3) {
			this.colors.push(
			skyDarkness*((146/255)-Math.random()/5), 	// Red Dead Redemption
			skyDarkness*((224/255)-Math.random()/5), 	// Green Mile
			skyDarkness*((230/255)), 				 	// Blue Men Group
			1.0); 										// Everybody- TAKE COVER!
		}

		this.InitBuffers();
	}
}

class Island extends Object3D {

	constructor() {

		super();

		this.positions = [
			-0.344503,-0.106899-1,-2.313329,
			0.254658,0.065420-1,-2.430170,
			0.506020,-0.293147-1,-2.207084,
			1.415955,0.064912-1,-1.957500,
			1.489208,-0.318759-1,-1.320762,
			1.685851,0.084184-1,-1.268915,
			2.014675,-0.126122-1,-0.782958,
			0.957233,-1.089151-1,-0.905606,
			0.454708,-1.256676-1,-0.897711,
			0.810208,-0.709404-1,-1.141590,
			0.739686,-1.249709-1,-0.541415,
			0.231851,-1.904112-1,-0.621845,
			0.052641,-1.633897-1,-0.758536,
			-0.020753,-0.743329-1,-1.377161,
			1.364762,-0.324582-1,0.647285,
			2.074500,0.090083-1,0.068582,
			1.608835,0.037777-1,0.559365,
			1.955554,-0.191974-1,0.132568,
			1.393132,0.037777-1,1.383312,
			1.210661,-0.322174-1,1.134609,
			0.514977,-0.286422-1,1.576757,
			0.507135,-1.581211-1,0.348922,
			0.342563,-2.052501-1,-0.027325,
			0.620568,-1.491335-1,-0.146730,
			0.745909,-0.723539-1,0.485115,
			0.089439,-1.345612-1,0.360167,
			1.089500,-0.770651-1,-0.314462,
			-0.123718,-0.298339-1,1.611730,
			-0.930959,0.037777-1,1.550149,
			-0.866234,-0.291222-1,1.300128,
			-0.414258,0.037777-1,1.808618,
			-1.444312,-0.282136-1,0.794076,
			-1.591571,0.097928-1,0.827036,
			-1.839477,-0.177971-1,0.145553,
			-0.936850,-0.751093-1,-0.176985,
			-0.611777,-1.317411-1,-0.262516,
			-0.326162,-1.310280-1,0.225784,
			0.289486,-0.743127-1,0.679448,
			0.020776,-1.770522-1,0.330532,
			-1.675519,-0.336500-1,-0.606829,
			-1.607249,0.010755-1,-1.680275,
			-0.625318,-0.725192-1,-1.039731,
			-2.011082,0.043485-1,-0.744422,
			-1.247727,0.059337-1,-1.332687,
			-0.934732,-0.314137-1,-1.943344,
			-0.184171,-0.491687-1,-2.096484,
			-0.707720,0.065178-1,-2.205832,
			-0.350659,-1.373304-1,-0.758204,
			-0.299529,-2.155551-1,-0.308846,
			-0.086080,-2.478361,-0.004677,
			0.091215,-2.267556-1,0.130842,
			-0.260030,-2.240649-1,0.060849,
			-0.470828,-1.954876-1,0.024811,
			-0.278168,0.037777-1,-0.209083,
			-0.914878,0.210568-1,-1.267986,
			-0.862298,0.231412-1,-0.781910,
			-0.302799,0.520691-1,-1.301783,
			-1.068480,0.101026-1,-0.360536,
			-1.736910,0.103204-1,0.106553,
			0.236277,0.037777-1,0.701510,
			0.656348,0.037777-1,-0.098120,
			0.501631,0.037777-1,1.688231,
			1.034499,0.275328-1,-1.269756,
			0.471459,0.267036-1,-1.698558,
			0.637660,0.376390-1,-1.207861,
			0.812177,0.491673-1,-0.567514,
			1.244986,0.398908-1,-0.324291,
			1.002755,0.639249-1,-0.717163,
			1.381545,0.288786-1,-0.765328,
			1.348978,0.284964-1,-1.076072,
			-0.505260,0.213488-1,-1.704558,
			-0.221831,0.306144-1,-1.838428,
			-0.274246,0.065420-1,-2.359878,
			2.054775,0.091828-1,-0.677912,
			-0.148262,0.773865-1,-0.947432,
			0.101020,0.922236-1,-0.839739,
			0.312442,0.779166-1,-1.109731,
			-0.262315,0.721321-1,-1.533752,
			-0.404757,0.197895-1,-0.782219,
			0.568488,0.537125-1,-0.913448,
			0.115069,0.760356-1,-1.450921,
			-0.061115,0.654189-1,-0.643377,
			0.205810,0.801703-1,-0.757537,
			0.344937,0.262088-1,-0.492076,
			0.077232,0.934717-1,-1.202342,
			-0.102879,0.422805-1,-0.489015,
			-0.269697,0.566033-1,-0.874217,
			-0.186512,0.743264-1,-1.152426
			];

		this.indices = [
				0,1,2,
				3,4,2,
				5,6,4,
				7,8,9,
				8,10,11,
				9,12,13,
				14,15,16,
				14,6,17,
				6,15,17,
				14,18,19,
				18,20,19,
				21,22,23,
				24,25,21,
				24,23,26,
				27,28,29,
				20,30,27,
				28,31,29,
				32,33,31,
				34,35,36,
				36,25,37,
				36,38,25,
				39,40,41,
				40,42,43,
				33,42,39,
				40,44,41,
				44,0,45,
				40,46,44,
				46,0,44,
				41,12,47,
				47,12,48,
				41,35,34,
				48,35,47,
				48,11,49,
				11,50,49,
				50,51,49,
				50,52,51,
				51,48,49,
				53,32,28,
				54,55,56,
				57,58,32,
				59,16,60,
				28,59,53,
				59,61,18,
				62,63,64,
				65,66,67,
				68,5,69,
				70,43,54,
				63,1,71,
				71,72,46,
				13,45,2,
				9,4,7,
				4,26,7,
				26,14,24,
				26,6,14,
				19,37,24,
				37,29,36,
				29,34,36,
				44,13,41,
				2,1,3,
				2,45,0,
				0,72,1,
				9,2,4,
				3,5,4,
				5,73,6,
				7,10,8,
				7,26,10,
				9,8,12,
				8,11,12,
				14,17,15,
				6,73,15,
				14,16,18,
				18,61,20,
				24,21,23,
				21,38,22,
				24,37,25,
				21,25,38,
				26,23,10,
				23,22,10,
				27,30,28,
				20,61,30,
				28,32,31,
				32,58,33,
				36,35,52,
				74,75,76,
				36,52,38,
				40,39,42,
				33,58,42,
				40,43,46,
				46,72,0,
				41,13,12,
				41,47,35,
				48,52,35,
				48,12,11,
				11,22,50,
				11,10,22,
				50,38,52,
				22,38,50,
				48,51,52,
				53,57,32,
				43,42,57,
				57,42,58,
				59,18,16,
				28,30,59,
				59,30,61,
				5,62,69,
				60,16,15,
				66,73,68,
				71,70,77,
				63,3,1,
				71,1,72,
				13,2,9,
				4,6,26,
				14,19,24,
				19,20,37,
				37,27,29,
				37,20,27,
				29,31,34,
				31,33,34,
				34,39,41,
				34,33,39,
				44,45,13,
				55,78,56,
				59,60,53,
				79,60,65,
				77,56,80,
				81,82,75,
				82,76,75,
				60,76,83,
				76,80,84,
				53,83,85,
				86,74,87,
				64,76,79,
				74,84,87,
				53,60,83,
				78,85,86,
				67,64,79,
				67,79,65,
				67,66,68,
				67,69,62,
				67,68,69,
				60,66,65,
				67,62,64,
				62,3,63,
				68,73,5,
				5,3,62,
				66,15,73,
				79,76,60,
				64,63,76,
				60,15,66,
				76,82,83,
				85,82,81,
				85,83,82,
				74,85,81,
				56,78,86,
				56,87,84,
				56,86,87,
				56,84,80,
				71,80,63,
				53,55,57,
				56,77,70,
				56,70,54,
				43,55,54,
				70,46,43,
				71,46,70,
				76,63,80,
				86,85,74,
				74,76,84,
				78,53,85,
				71,77,80,
				53,78,55,
				43,57,55,
				74,81,75
			];

		this.colors = [];
		for(var i = 0; i < this.positions.length; i += 3) {
			this.colors.push(0.5+Math.random()/8, 0.5+Math.random()/2, Math.random()/5, 1.0);
		}

		this.InitBuffers();
	}
}

class Ocean extends Object3D {

	constructor() {

		super();

		this.positions = [
				 +0.0,  -1.0, +0.0, // index 0
				 +5.0,  -1.0, -5.0, // index 1
				 +5.0,  -1.0, +5.0, // index 2
				 -5.0,  -1.0, +5.0, // index 3
				 -5.0,  -1.0, -5.0  // index 4
			];

		this.indices = [
				0, 1, 2,
				0, 2, 3,
				0, 3, 4,
				0, 4, 1
			];

		this.colors = [];
		for(var i = 0; i < this.positions.length; i += 3) {
			this.colors.push((30/255), (144/255)-Math.random()/3, (255/255)-Math.random()/2, 1.0); // 30,144,255 = Dodgerblue
		}

		this.InitBuffers();
	}
}

class River extends Object3D {

	constructor() {

		super();

		this.positions = [
				 0.0,  -1.0, 14.0, // index 0
				 1.0,  -1.0, 12.5, // index 1
				 1.5,  -1.0, 12.5, // index 2
				 1.3,  -1.0, 11.0, // index 3
				 2.3,  -1.0, 11.0, // index 4
				 1.0,  -1.0,  9.5, // index 5
				 2.5,  -1.0,  9.5, // index 6
				 0.0,  -1.0,  8.0, // index 7
				 2.0,  -1.0,  8.0, // index 8
				-2.4,  -1.0,  6.0, // index 9
				 0.1,  -1.0,  6.0, // index 10
				-3.0,  -1.0,  4.0, // index 11
				 0.0,  -1.0,  4.0, // index 12
				-2.4,  -1.0,  2.0, // index 13
				 1.1,  -1.0,  2.0, // index 14
				 0.0,  -1.0,  0.0, // index 15
				 4.0,  -1.0,  0.0, // index 16
				 0.0, -8.0,  0.0, // index 17 -> additional for waterfall
				 4.0, -7.0,  0.0  // index 18 -> additional for waterfall
			];

		this.indices = [
				0, 1, 2,
				1, 2, 3,
				2, 3, 4,
				3, 4, 5,
				4, 5, 6,
				5, 6, 7,
				6, 7, 8,
				7, 8, 9,
				8, 9, 10,
				9, 10, 11,
				10, 11, 12,
				11, 12, 13,
				12, 13, 14,
				13, 14, 15,
				14, 15, 16,
				15, 16, 17, // additional for waterfall
				16, 17, 18  // additional for waterfall
			];

		this.colors = [];
		for(var i = 0; i < this.positions.length; i += 3) {
			this.colors.push((30/255)-Math.random()/3, (144/255)-Math.random()/3, (255/255)-Math.random()/3, 1.0); // 30,144,255 = Dodgerblue
		}

		this.InitBuffers();
	}
}

class Trunk extends Object3D {

	constructor(treeX,treeY,treeZ,treBreadth,treHeight,treBraBreadth,treBraLength,treColor0,treColor1,treColor2,treColor3) {

		super();

		this.positions = [ // Trunk of the Tree
			// Ground Level of the Trunk
			treeX, treeY, treeZ,	//0
			treeX-treBreadth, treeY, treeZ-treBreadth,	//1
			treeX+treBreadth, treeY, treeZ-treBreadth,	//2
			treeX+1.5*treBreadth, treeY, treeZ+0.3*treBreadth,	//3
			treeX-0.3*treBreadth, treeY, treeZ+1.5*treBreadth,	//4
			treeX-1.5*treBreadth, treeY, treeZ+0.3*treBreadth,	//5
			// Beginning of the Branches
			treeX,	treeY+treHeight*1.2, treeZ,	//6
			treeX-treBreadth, treeY+treHeight, treeZ-treBreadth,	//7
			treeX+treBreadth, treeY+treHeight, treeZ-treBreadth,	//8
			treeX+1.5*treBreadth, treeY+treHeight, treeZ+0.3*treBreadth,	//9
			treeX-0.3*treBreadth, treeY+treHeight, treeZ+1.5*treBreadth,	//10
			treeX-1.5*treBreadth, treeY+treHeight, treeZ+0.3*treBreadth,	//11
				// First Row of Branches
				treeX, treeY+0.6*treHeight, treeZ-2*treBraLength,		//12
				treeX+4.5*treBraLength, treeY+0.8*treHeight, treeZ-2*treBraLength,	//13
				treeX+3.5*treBraLength, treeY+0.8*treHeight, treeZ+2*treBraLength,	//14
				treeX-3.5*treBraLength, treeY+0.8*treHeight, treeZ+2*treBraLength,	//15
				treeX-4.5*treBraLength, treeY+0.8*treHeight, treeZ-2*treBraLength,	//16
				// First Row of Branches 2
				treeX, treeY+1.2*treHeight, treeZ-3*treBraLength,		//17
				treeX+3.5*treBraLength, treeY+1.3*treHeight, treeZ-2*treBraLength,	//18
				treeX+2.5*treBraLength, treeY+1.3*treHeight, treeZ+2*treBraLength,	//19
				treeX-2.5*treBraLength, treeY+1.3*treHeight, treeZ+2*treBraLength,	//20
				treeX-3.5*treBraLength, treeY+1.3*treHeight, treeZ-2*treBraLength,	//21					
				// First Row of Branches 3
				treeX, treeY+1.8*treHeight, treeZ-1*treBraLength,		//22
				treeX+2.5*treBraLength, treeY+1.8*treHeight, treeZ-1*treBraLength,	//23
				treeX+1.5*treBraLength, treeY+1.8*treHeight, treeZ+1*treBraLength,	//24
				treeX-1.5*treBraLength, treeY+1.8*treHeight, treeZ+1*treBraLength,	//25
				treeX-2.5*treBraLength, treeY+1.8*treHeight, treeZ-1*treBraLength,	//26
			];

		this.indices = [// Trunk Wall of Five
			1,2,8,
			1,8,7,
			2,3,9,
			2,9,8,
			3,4,10,
			3,10,9,
			4,5,11,
			4,11,10,
			5,1,7,
			5,7,11,
				// First Row of Branches
				6,7,12,
				6,12,8,
				7,12,8,		//branch1
				6,8,13,
				6,13,9,
				8,13,9,		//branch2
				6,9,14,
				6,14,10,
				9,14,10,	//branch3
				6,10,15,
				6,15,11,
				10,15,11,	//branch4
				6,11,16,
				6,16,7,
				11,16,7,		//branch5
					// First Row of Branches 2
					6,7,17,
					6,17,8,
					7,17,8,		//branch1
					6,8,18,
					6,18,9,
					8,18,9,		//branch2
					6,9,19,
					6,19,10,
					9,19,10,	//branch3
					6,10,20,
					6,20,11,
					10,20,11,	//branch4
					6,11,21,
					6,21,7,
					11,21,7,		//branch5
						// First Row of Branches 3
						6,7,22,
						6,22,8,
						7,22,8,		//branch1
						6,8,23,
						6,23,9,
						8,23,9,		//branch2
						6,9,24,
						6,24,10,
						9,24,10,	//branch3
						6,10,25,
						6,25,11,
						10,25,11,	//branch4
						6,11,26,
						6,26,7,
						11,26,7,		//branch5
			];
			
		this.colors = [];
		for(var i = 0; i < this.positions.length; i += 3) {
			this.colors.push(
			treColor0+Math.random()/5,  		// Red Dead Redemption
			treColor1+Math.random()/5,  		// Green Mile
			treColor2+Math.random()/5, 			// Blue Men Group
			treColor3); 						// Everybody- TAKE COVER!
		}

		this.InitBuffers();
	}
}

class Leaf extends Object3D {
	
	constructor(leafX, leafY, leafZ, leafLength, leafDirectionX, leafDirectionY, leafDirectionZ) {

		super();

		this.positions = [	// Leaf Positions
			leafX+leafDirectionX/2,					leafY+leafLength*leafDirectionX/2,		leafZ+leafDirectionZ/2,						//16 The middle of the Leaf
			leafX,									leafY,									leafZ,										//04 Start of the Leaf
	
			leafX+leafDirectionX/10,				leafY+leafDirectionY/10,				leafZ-leafDirectionZ/3,						//05
			leafX+leafDirectionX/10*3,				leafY+leafDirectionY/10*3,				leafZ-leafDirectionZ/3*2,					//06
			leafX+leafDirectionX/10*5,				leafY+leafDirectionY/10*5,				leafZ-leafDirectionZ,						//07
			leafX+leafDirectionX/10*7,				leafY+leafDirectionY/10*7,				leafZ-leafDirectionZ/3*2,					//08
			leafX+leafDirectionX/10*9,				leafY+leafDirectionY/10*9,				leafZ-leafDirectionZ/3,						//09
		
			leafX+leafLength*leafDirectionX,		leafY+leafDirectionY,					leafZ+leafLength*leafDirectionZ,			//10 JUST THE TIP!!!
			
			leafX-leafDirectionX/10*9,				leafY+leafDirectionY/10*9,				leafZ+leafDirectionZ/3,						//11
			leafX-leafDirectionX/10*7,				leafY+leafDirectionY/10*7,				leafZ+leafDirectionZ/3*2,					//12
			leafX-leafDirectionX/10*5,				leafY+leafDirectionY/10*5,				leafZ+leafDirectionZ,						//13
			leafX-leafDirectionX/10*3,				leafY+leafDirectionY/10*3,				leafZ+leafDirectionZ/3*2,					//14
			leafX-leafDirectionX/10,				leafY+leafDirectionY/10,				leafZ+leafDirectionZ/3,						//15
		];

		this.indices = [	// Leaf Indices
			0,1,2,
			0,2,3,
			0,3,4,
			0,4,5,
			0,5,6,
			0,6,7,
			0,7,8,
			0,8,9,
			0,9,10,
			0,10,11,
			0,11,12,
			0,12,1
			];
			
		this.colors = [];
		for(var i = 0; i < this.positions.length; i += 3) {
			this.colors.push(
			(50/255)+Math.random()/2, 	// Red Dead Redemption
			(205/255)-Math.random()/3, 	// Green Mile
			(50/255), 				 	// Blue Men Group
			1.0); 						// Everybody- TAKE COVER!

			// 50,205,50 = Limegreen
		}

		this.InitBuffers();
	}

}


class Object extends Object3D {
	
	constructor() {

		super();

		this.positions = [
				-11,-9,-5
			];

		this.indices = [
				0,1,3
			];
			
		this.colors = [];
		for(var i = 0; i < this.positions.length; i += 3) {
			this.colors.push(
			((146/255)-Math.random()/5), 	// Red Dead Redemption
			((224/255)-Math.random()/5), 	// Green Mile
			((230/255)), 				 	// Blue Men Group
			1.0); 							// Everybody- TAKE COVER!
		}

		this.InitBuffers();
	}

}