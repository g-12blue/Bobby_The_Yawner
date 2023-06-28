SUPSI 2022-23  
Corso d’interaction design, CV427.01  
Docenti: A. Gysin, G. Profeta  

Elaborato 1: Marionetta digitale  

# Bobby_The_Yawner
Autrice: Giorgia Langianese 


## Introduzione e tema
Per il primo elaborato abbiamo dovuto progettare una marionetta in AR che interagisse con la mano attraverso un sistema di riconoscimento implementato nel codice.
Ho scelto di realizzare una marionetta semplice e piuttsoto astratta, costituita da un ellisse con riempimento rosa, con all’interno un altro ellisse di un rosa più scuro, in modo tale che sembrasse la bocca del primo. Alle due estremità orizzontali
del cerchio sono posizionati altri due gruppi di ellissi che rappresentano gli occhi.


## Riferimenti progettuali
Per questo progetto non ho alcun riferimento progettuale.


## Design dell’interfraccia e modalià di interazione
Ho progettato un'interfaccia estremamente semplice per la marionetta, sfruttando le mie competenze nel campo della programmazione. Ho scelto di mantenere uno sfondo bianco per garantire che l'attenzione sia interamente focalizzata sulla marionetta. Bobby, come accennato in precedenza, risponde in base alla distanza tra l'indice e il pollice, permettendo così all'utente di sperimentare un coinvolgente gioco interattivo.
Ho progettato la marionetta in modo che, quando le due dita vengono allargate, riproduca un suono che richiama un urlo, aggiungendo un elemento sorprendente e divertente all'esperienza interattiva. La combinazione di gesti e suoni offre agli utenti un coinvolgimento sensoriale unico e stimolante durante il gioco.

Ho scelto di evitare l'utilizzo di elementi fotografici creando l'intera marionetta attraverso il codice. Questo approccio mi ha permesso di esprimere la mia creatività e di imparare nuovi aspetti del codice.

[<img src="doc/screen-02.png" width="500" alt="Lui è Bobby, Bobby The Yawner">]()


## Tecnologia usata
Per la creazione di questa marionetta, ho sfruttato sia HTML che JavaScript come strumenti di sviluppo.


```HTML
<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html" charset="utf-8" />
		<title>Bobby The Yawner</title>
		
		<script src="https://unpkg.com/@tensorflow/tfjs-core@3.7.0/dist/tf-core.min.js"></script>
		<script src="https://unpkg.com/@tensorflow/tfjs-backend-webgl@3.7.0/dist/tf-backend-webgl.min.js"></script>
		<script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/hand-pose-detection@2.0.0/dist/hand-pose-detection.min.js"></script>
		<script src="https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4/hands.min.js"></script>
		
		
		<script src="https://cdn.jsdelivr.net/npm/p5@1.4.1/lib/p5.min.js"></script>

		<style>
			* {
				box-sizing: border-box;
				user-select: none;
			}
			html,
			body {
				height: 100%;
			}
			body {
				width: 100%;
				margin: 0;
				padding: 0;
				background-color: lightgray;
			}
			.container {
				margin: 20px 20px;
				position: relative;
			}
			.layer {
				position: absolute;
				top: 0;
				left: 0;
			}
			canvas {
				display: block;
			}
			/* video {
				transform: scaleX(-1);
				display: block;
			} */
		</style>
	</head>
	<body>		
		<script src="src/sketch.js"></script>
		<script src="lib/addons/p5.sound.js"></script>
	</body>
</html>
```

```JavaScript
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
```

## Target e contesto d’uso
Il target è rappresentato principalmente da bambini, ragazzi e tutti coloro che cercano un'esperienza ludica divertente e coinvolgente.
La marionetta potrebbe essere utilizzata come strumento didattico per coinvolgere i bambini in attività di apprendimento interattive, incoraggiando la creatività e lo sviluppo motorio.
