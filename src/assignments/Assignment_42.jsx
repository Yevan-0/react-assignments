import { useEffect, useState, useRef } from 'react'
import './Assignment_42.css'

const playerHeight = 86.4;
const playerWidth = 45.4;


// constants for object of keys
const keys = {}

// movement speed for x axis (left and right movement)
const speed = 2;
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

  // Render road animation and other animations
  useEffect(() => {
    let frame = null;

    let previousTime = performance.now();

    let player = playerRef.current;

    let containerWidth = containerRef.current.offsetWidth;
    let playerWidth = player.offsetWidth;

    let positionX = (containerWidth - playerWidth) / 2;

    player.style.left = positionX + 'px';

    // Cars rendering time frame (sprite sheet)
    let lastTime = 0;
    let delay = 300;

    // controls
    window.onkeydown = (event) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
      }
      keys[event.key] = true;
    }

    window.onkeyup = (event) => {
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
            y: -120
          });
        }
        lastTime = time;
      }

      // move the car down with the road
      cars.current.forEach(car => {
        car.y += carsSpeed * delta
      })

      // removes the overflown cars
      cars.current = cars.current.filter(car => car.y < 480)

      cars.current.forEach(car => {
        const carX = car.x;
        const carY = car.y;
        const carW = car.sprite.w;
        const carH = car.sprite.h;

        // player hitbox
        const playerLeft = positionX - playerWidth / 2;
        const playerRight = positionX + playerWidth / 2;
        const playerTop = playerYRef.current - playerHeight / 2;
        const playerBottom = playerYRef.current + playerHeight / 2;

        // cars hitbox
        const carLeft = carX;
        const carRight = carX + carW;
        const carTop = carY;
        const carBottom = carY + carH;

        const collision =
          playerLeft < carRight &&
          playerRight > carLeft &&
          playerTop < carBottom &&
          playerBottom > carTop;

        if (collision && !collisionDetected) {
          console.log("Collision detected");
          setCollisionDetected(true);
          playerYRef.current += carsSpeed * delta;

          window.onkeydown = (event) => {
            if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
              event.preventDefault();
            }
            keys[event.key] = false;
          }
          window.onkeyup = (event) => {
            if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
              event.preventDefault();
            }
            keys[event.key] = false;
          }
        }
      })

      // position
      player.style.left = positionX + 'px';
      setCounter(value => value + 1);
    }

    frame = requestAnimationFrame(update)

    return (() => {
      cancelAnimationFrame(frame);
    })

  }, [])

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
          }}
        ></div>
        <div className="score"></div>
      </div>
    </div>
  )
}