function init() {
	
	$("canvas").width  = document.documentElement.clientWidth;
	$("canvas").height = document.documentElement.clientHeight;
	
	world = [];
	alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ ";
	alphabet = "1010 ";
	canvas = $("canvas");
	ctx = canvas.getContext("2d");
	ctx.align = "center";
	
	// temporary
	world.push(createRandomChain());
	matrix = loop();
	
}

function createRandomChain() {
	
	var dist = randInt(6) + 8;
	return createChain(dist,
		[randInt(document.documentElement.clientWidth), -30 * (dist * 2)],
		randInt(20) + 10);
	
}

function createChain(distance, position, len) {
	
	return {"dist": distance, "pos": position, "text": createTextArray(len)};
	
}

function createTextArray(len) {
	
	text = [];
	for (var i = 0; i < len; i++) {
		
		text.push(alphabet[randInt(alphabet.length)]);
		
	}
	return text;
	
}

function moveChain(chain) {
	
	chain.text.shift(); // essentially moves chain up one
	chain.pos[1] += (chain.dist * 2) ; // move down one
	chain.text.push(alphabet[randInt(alphabet.length)]); // prevent length loss
	
}

function deleteChain(chain) {
	
	world.splice(world.indexOf(chain), 1);
	
}

function drawChain(chain) {
	
	posX = chain.pos[0];
	posY = chain.pos[1];
	
	for (var i = 0; i  < chain.text.length; i++) {
		
		// creates illusion of distance
		ctx.font = (chain.dist * 2) + "px 'Lucida Console' monospace";
		ctx.globalAlpha = (chain.dist - 4) / 10;
		
		ctx.fillStyle="green";
		ctx.fillText(chain.text[i], posX, posY)
		posY += (chain.dist * 2);
		
	}
	
}

function clear() {
				
				// smaller numbers make chains fade in/out more.
				ctx.fillStyle = "rgba(0, 0, 0, .1)";
				ctx.fillRect(0, 0, canvas.width, canvas.height);
				
}

function loop() {
	
	return setInterval(function() {
		
		clear();
		for (var i = 0; i < world.length; i++) {
			
			drawChain(world[i]);
			moveChain(world[i]);
			if (world[i].pos[1] > document.documentElement.clientHeight) {
				
				deleteChain(world[i]);
				i--;
				
			}
			
		}
		
		if (randInt(10) < 4) { // controls chain spawn rate
			
			world.push(createRandomChain());
			
		}
		
	}, 100);
	
}