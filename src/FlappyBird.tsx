import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback } from "react-native";
import { GameEngine } from "react-native-game-engine";
import Matter from "matter-js";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const PIPE_WIDTH = 70;
const PIPE_GAP = 150; // ✅ Adjust gap between pipes
const PIPE_SPEED = 2;
const GRAVITY = 0.5;
const JUMP_FORCE = -8;

// 🎯 Generate a random Y position for the pipes
const getRandomGapY = () => {
  return Math.floor(Math.random() * (SCREEN_HEIGHT - PIPE_GAP - 200)) + 100;
};

// 🎯 Create game physics world
const createWorld = (dispatch: any) => {
  let engine = Matter.Engine.create({ enableSleeping: false });
  let world = engine.world;

  let bird = Matter.Bodies.circle(100, SCREEN_HEIGHT / 2, 20, {
    restitution: 0.5,
    label: "bird",
  });

  let initialGapY = getRandomGapY();

  let pipeTop = Matter.Bodies.rectangle(
    SCREEN_WIDTH,
    initialGapY - PIPE_GAP / 2 - SCREEN_HEIGHT / 2, // ✅ Fix top pipe alignment
    PIPE_WIDTH,
    SCREEN_HEIGHT, // ✅ Make sure it extends to the top
    { isStatic: true, label: "pipe" }
  );

  let pipeBottom = Matter.Bodies.rectangle(
    SCREEN_WIDTH,
    initialGapY + PIPE_GAP / 2 + SCREEN_HEIGHT / 2, // ✅ Fix bottom pipe alignment
    PIPE_WIDTH,
    SCREEN_HEIGHT, // ✅ Make sure it extends to the bottom
    { isStatic: true, label: "pipe" }
  );

  Matter.World.add(world, [bird, pipeTop, pipeBottom]);

  // ✅ Detect collision with pipes
  Matter.Events.on(engine, "collisionStart", (event) => {
    event.pairs.forEach((collision) => {
      if (collision.bodyA.label === "bird" || collision.bodyB.label === "bird") {
        dispatch({ type: "GAME_OVER" });
      }
    });
  });

  return {
    physics: { engine, world },
    bird: { body: bird, renderer: Bird },
    pipeTop: { body: pipeTop, renderer: Pipe },
    pipeBottom: { body: pipeBottom, renderer: Pipe },
    score: { value: 0 },
  };
};

// 🎯 Bird Component
const Bird = ({ body }: any) => {
  return (
    <View
      style={{
        position: "absolute",
        left: body.position.x - 20,
        top: body.position.y - 20,
        width: 40,
        height: 40,
        backgroundColor: "yellow",
        borderRadius: 20,
      }}
    />
  );
};

// 🎯 Pipe Component
const Pipe = ({ body }: any) => {
  return (
    <View
      style={{
        position: "absolute",
        left: body.position.x - PIPE_WIDTH / 2,
        top: body.position.y - SCREEN_HEIGHT / 2, // ✅ Fix alignment
        width: PIPE_WIDTH,
        height: SCREEN_HEIGHT, // ✅ Ensure it extends fully
        backgroundColor: "green",
      }}
    />
  );
};

// 🎯 Physics system to handle game logic
const Physics = (entities: any, { time, dispatch }: any) => {
  let engine = entities.physics.engine;
  Matter.Engine.update(engine, time.delta);

  let bird = entities.bird.body;
  let pipes = [entities.pipeTop.body, entities.pipeBottom.body];

  // ✅ Check for pipe collisions
  pipes.forEach((pipe) => {
    if (Matter.Collision.collides(bird, pipe)) {
      dispatch({ type: "GAME_OVER" });
    }
  });

  // ✅ Check if bird hits the ground or top of screen
  if (bird.position.y >= SCREEN_HEIGHT || bird.position.y <= 0) {
    dispatch({ type: "GAME_OVER" });
  }

  // ✅ Reposition pipes when they leave the screen
  if (entities.pipeTop.body.position.x < -PIPE_WIDTH) {
    let newGapY = getRandomGapY();

    Matter.Body.setPosition(entities.pipeTop.body, {
      x: SCREEN_WIDTH,
      y: newGapY - PIPE_GAP / 2 - SCREEN_HEIGHT / 2, // ✅ Align top pipe
    });

    Matter.Body.setPosition(entities.pipeBottom.body, {
      x: SCREEN_WIDTH,
      y: newGapY + PIPE_GAP / 2 + SCREEN_HEIGHT / 2, // ✅ Align bottom pipe
    });

    // ✅ Increase score
    entities.score.value += 1;
  }

  // ✅ Move pipes to the left
  [entities.pipeTop, entities.pipeBottom].forEach((pipe) => {
    Matter.Body.setPosition(pipe.body, {
      x: pipe.body.position.x - PIPE_SPEED,
      y: pipe.body.position.y,
    });
  });

  return entities;
};

// 🎯 Main Flappy Bird Game Component
const FlappyBird = () => {
  const [running, setRunning] = useState(true);
  const [entities, setEntities] = useState(() => createWorld(() => {}));
  const [gameKey, setGameKey] = useState(0);
  const gameEngineRef = useRef<GameEngine | null>(null);
  const [score, setScore] = useState(0);

  const jump = () => {
    if (!running) return;
    let bird = entities.bird.body;
    Matter.Body.setVelocity(bird, { x: 0, y: JUMP_FORCE });
  };

  const restartGame = () => {
    setEntities(createWorld(() => {}));
    setRunning(true);
    setScore(0);
    setGameKey((prev) => prev + 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (running) {
        setScore(entities.score.value);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [running, entities.score.value]);

  return (
    <TouchableWithoutFeedback onPress={jump}>
      <View style={styles.container}>
        <GameEngine
          key={gameKey} // ✅ Forces restart
          ref={gameEngineRef}
          style={styles.gameContainer}
          systems={[Physics]}
          entities={entities}
          running={running}
          onEvent={(e: any) => {
            if (e.type === "GAME_OVER") {
              setRunning(false);
            }
          }}
        />
        <Text style={styles.scoreText}>{score}</Text>
        {!running && (
          <View style={styles.gameOverScreen}>
            <Text style={styles.gameOverText}>Game Over</Text>
            <Text style={styles.restartText} onPress={restartGame}>
              Tap to Restart
            </Text>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

// 🎯 Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#70c5ce",
  },
  gameContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    position: "absolute",
    top: 0,
    left: 0,
  },
  scoreText: {
    position: "absolute",
    top: 50,
    left: SCREEN_WIDTH / 2 - 30,
    fontSize: 40,
    fontWeight: "bold",
    color: "#fff",
  },
  gameOverScreen: {
    position: "absolute",
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  gameOverText: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
  },
  restartText: {
    fontSize: 20,
    color: "#fff",
    marginTop: 20,
    textDecorationLine: "underline",
  },
});

export default FlappyBird;
