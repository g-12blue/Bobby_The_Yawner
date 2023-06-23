let capture
let detector

//suono
let song;

function preload(){
	song = loadSound("woah.mp3")

}

async function setup() {
  
	createCanvas(640, 480)

	capture = createCapture(VIDEO)
	capture.size(640, 480)
	capture.hide()
	
	console.log("Carico modello...")
	detector = await createDetector()
	console.log("Modello caricato.")

}

async function draw() {
	
	background(255)

	// Disegna la webcam sullo stage, a specchio
	// push()
	// scale(-1, 1)
	// image(capture, -640, 0)
	// pop()

	if (detector && capture.loadedmetadata) {
		
		const hands = await detector.estimateHands(capture.elt, { flipHorizontal: true })

		if (hands.length == 1) {
		
			const mano = hands[0]
		

			const indice  = mano.keypoints[8]
			const pollice = mano.keypoints[4]
			
		
			
			noStroke()
			
			
			
			const cx = (indice.x-pollice.x)/2+pollice.x
			const cy = (indice.y-pollice.y)/2+pollice.y
			const d= dist(indice.x, indice.y, pollice.x, pollice.y)
			
			//faccia
			fill(231, 84, 128)
			ellipse (cx, cy, d, d)
			
			//bocca
			fill(100, 28, 52)
			ellipse (cx, cy + 10, d - 40, d - 40)

			//fill(255, 255, 255)
			//ellipse (cx + 20, cy - 20, d - 80, d - 80)
			
			//occhio pollice
			stroke(0);
			strokeWeight(4);
			fill(255, 255, 255)
			ellipse (pollice.x - 10, pollice.y - 10, 30, 30)

			fill(0, 0, 0)
			ellipse (pollice.x - 8, pollice.y - 10, 10, 10)

			//occhio indice
			stroke(0);
			strokeWeight(4);
			fill(255, 255, 255)
			ellipse (indice.x + 10, indice.y + 10, 30, 30)

			fill(0, 0, 0)
			ellipse (indice.x + 8, indice.y + 10, 10, 10)



			if (d > 100) {
				song.play()
				}
				else{
					song.stop()
				}
		
		}		
	}
}

async function createDetector() {
	// Configurazione Media Pipe
	// https://google.github.io/mediapipe/solutions/hands
	const mediaPipeConfig = {
		runtime: "mediapipe",
		modelType: "full",
		maxHands: 1,
		solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/hands`,
	}
	return window.handPoseDetection.createDetector( window.handPoseDetection.SupportedModels.MediaPipeHands, mediaPipeConfig )
}
