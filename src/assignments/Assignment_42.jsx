import { useEffect, useState, useRef } from 'react'
import './Assignment_42.css'

const playerHeight = 86.4;
const playerWidth = 45.4;


// constants for object of keys
const keys = {}

// movement speed for x axis (left and right movement)
const speed = 3;
// road scroll speed
const roadSpeed = 0.375;

// track limits
const roadLeft = 35;
const roadRight = 290;

// car sprite sheet
const carSprites = [
  { x: 66.8, y: 16.0, w: 52, h: 92 },
  { x: 188.8, y: 16.0, w: 48, h: 94.8 },
  { x: 7.0, y: 192.2, w: 52.6, h: 136.4 },
  { x: 425.2, y: 19.8, w: 60.1, h: 137.3 }
]

// car ID for rendering cars at random
let carId = 0;

// car amount at render
const totalCars = 2;
const carsSpeed = 0.2;

// Number of lanes
const laneCount = 3;

export default function Assignment_42() {
  const scrollDown = useRef(0);
  const [counter, setCounter] = useState(0);
  const playerRef = useRef(null);
  const containerRef = useRef(null);
  const [direction, setDirection] = useState(null);
  const cars = useRef([]);
  const playerYRef = useRef(360);
  const [collisionDetected, setCollisionDetected] = useState(false);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState("start");

  // Render road animation and other animations
  useEffect(() => {
    let frame = null;

    let previousTime = performance.now();

    let player = playerRef.current;

    if (!player || !containerRef.current) return;

    let containerWidth = containerRef.current.offsetWidth;
    let playerWidth = player.offsetWidth;

    let positionX = (containerWidth - playerWidth) / 2;

    player.style.left = positionX + 'px';

    // Cars rendering time frame (sprite sheet)
    let lastTime = 0;
    let delay = 1000;

    // controls
    window.onkeydown = (event) => {
      if (gameState !== 'playing') return;
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
      }
      keys[event.key] = true;
    }

    window.onkeyup = (event) => {
      if (gameState !== 'playing') return;
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
      }
      keys[event.key] = false;
    }

    // render update
    const update = time => {

      frame = requestAnimationFrame(update);

      const delta = time - previousTime;

      scrollDown.current += roadSpeed * delta;

      previousTime = time;


      if (gameState === "playing") {
        // Movement render
        if (!collisionDetected) {
          if (keys["ArrowLeft"]) {
            positionX = Math.max(roadLeft + playerWidth / 2, positionX - speed);
            setDirection("left");
          }
          else if (keys["ArrowRight"]) {
            positionX = Math.min(roadRight - playerWidth / 2, positionX + speed);
            setDirection("right");
          }
          else {
            setDirection("idle");
          }
        }

        // render carSprite cars
        if (cars.current.length < totalCars && time - lastTime > delay) {
          const spriteIndex = Math.floor(Math.random() * carSprites.length);

          // divde lanes for cars
          const laneWidth = (roadRight - roadLeft) / laneCount;
          const lanes = Array.from({ length: laneCount }, (_, i) => roadLeft + i * laneWidth + laneWidth / 2)
          const laneX = lanes[Math.floor(Math.random() * lanes.length)]

          const rawX = laneX - carSprites[spriteIndex].w / 2;
          const clampedX = Math.max(roadLeft, Math.min(rawX, roadRight - carSprites[spriteIndex].w));

          // lane cooldown, to render cars
          const safeToSpawn = cars.current.every(car => {
            const sameLane = Math.abs(car.x - rawX) < 5;
            const distance = Math.abs(car.y - (-120));
            return !(sameLane && distance);
          });

          // cars object
          if (safeToSpawn) {
            cars.current.push({
              id: ++carId,
              sprite: carSprites[spriteIndex],
              x: clampedX,
              y: -120,
              nearMissAwarded: false
            });
          }
          lastTime = time;
        }

      }
      // move the car down with the road
      cars.current.forEach(car => {
        car.y += carsSpeed * delta
      })

      // removes the overflown cars
      cars.current = cars.current.filter(car => car.y < 480)

      // Collision Detection logic
      cars.current.forEach(car => {
        const carW = car.sprite.w;
        const carH = car.sprite.h;

        const carX = car.x + carW / 2;
        const carY = car.y + carH / 2;

        // player hitbox
        const playerLeft = positionX - playerWidth / 2;
        const playerRight = positionX + playerWidth / 2;
        const playerTop = playerYRef.current - playerHeight / 2;
        const playerBottom = playerYRef.current + playerHeight / 2;

        // cars hitbox
        const carLeft = carX - carW / 2;
        const carRight = carX + carW / 2;
        const carTop = carY - carH / 2;
        const carBottom = carY + carH / 2;

        const collision =
          playerLeft < carRight &&
          playerRight > carLeft &&
          playerTop < carBottom &&
          playerBottom > carTop;

        if (collision && !collisionDetected) {
          console.log("Collision detected");
          setCollisionDetected(true);
          setGameState("gameOver");

          window.onkeydown = (event) => { keys[event.key] = false; }
          window.onkeyup = (event) => { keys[event.key] = false; }


        }

        // Near miss and scoring
        const margin = 10;
        const nearMissX =
          Math.abs(playerRight - carLeft) < margin ||
          Math.abs(carRight - playerLeft) < margin;

        const nearMiss = !collision && nearMissX;

        if (car.y > 0 && nearMiss && !car.nearMissAwarded) {
          car.nearMissAwarded = true;
          setScore(prev => prev + 1);
        }
      })

      // position
      player.style.left = positionX + 'px';
      player.style.top = playerYRef.current + 'px';
      setCounter(value => value + 1);
    }

    frame = requestAnimationFrame(update)

    return (() => {
      cancelAnimationFrame(frame);;
    })
  }, [gameState, collisionDetected]);

  const restart = () => {
    setGameState("playing");
    setCollisionDetected(false);
    setScore(0);
    cars.current = [];
    scrollDown.current = 0;
    playerYRef.current = 360;
    setDirection("idle");

    Object.keys(keys).forEach(k => {
      keys[k] = false;
    });

    if (playerRef.current && containerRef.current) {
      const containerW = containerRef.current.offsetWidth;
      playerRef.current.style.left = (containerW - playerWidth) / 2 + "px";
      playerRef.current.style.top = playerYRef.current + "px";
    }
  };

  return (
    <div>
      <div
        ref={containerRef}
        className="container"
        data-counter={counter}
        style={{ backgroundPosition: `center ${scrollDown.current}px` }}
      >

        <div className="cars">
          {cars.current.map(car => (

            <div
              className="car"
              key={car.id}
              style={{
                width: car.sprite.w,
                height: car.sprite.h,
                top: car.y,
                left: car.x,
                backgroundPosition: `-${car.sprite.x}px -${car.sprite.y}px`
              }}
            />
          ))}
        </div>

        <div
          className="player"
          data-direction={direction}
          ref={playerRef}
          style={{
            width: playerWidth,
            height: playerHeight,
            top: playerYRef.current + "px",
            visibility: gameState === "playing" ? "visible" : "hidden"
          }}
        />

        <div className="score">Score: {score}</div>

        {gameState !== "playing" && (
          <div className="overlay">
            <div className="overlay-box">
              <div className="overlay-title">
                {gameState === "gameOver" ? "Game Over" : "Highway Rush"}
              </div>
              <div className="overlay-description">
                {gameState === "gameOver"
                  ? "Click Restart to try again"
                  : "Use arrow keys <= or =>, to score commit near misses"}
              </div>
              <button className="overlay-button" onClick={restart}>
                {gameState === "start" ? "Start" : "Restart"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}