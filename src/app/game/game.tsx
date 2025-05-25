"use client";

import { useEffect, useRef, useState } from 'react';
import * as Phaser from 'phaser';

const GamePage = () => {
  const gameRef = useRef<HTMLDivElement>(null);
  const [finalScore, setFinalScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [restartKey, setRestartKey] = useState(0);

  useEffect(() => {
    let game: Phaser.Game;

    if (gameRef.current) {
      class GameScene extends Phaser.Scene {
        player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
        aiChaser!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
        cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
        obstacles!: Phaser.Physics.Arcade.Group;
        powerUps!: Phaser.Physics.Arcade.Group;
        scoreText!: Phaser.GameObjects.Text;
        highScoreText!: Phaser.GameObjects.Text;
        statusText!: Phaser.GameObjects.Text;
        score: number = 0;
        highScore: number = 0;
        isGameOver: boolean = false;
        ground!: Phaser.GameObjects.Rectangle;
        gameOverImage?: Phaser.GameObjects.Image;
        gameSpeed: number = 300;
        lastObstacleTime: number = 0;
        lastPowerUpTime: number = 0;
        obstacleInterval: number = 1800;
        powerUpInterval: number = 10000; // 10 seconds between power-ups
        obstacleTypes: string[] = ['jenkins', 'docker'];
        powerUpTypes: string[] = ['shield', 'cloud', 'slowdown'];
        gridGraphics?: Phaser.GameObjects.Graphics;
        dangerZone?: Phaser.GameObjects.Rectangle;
        hasShield: boolean = false;
        shieldTimer?: Phaser.Time.TimerEvent;
        cloudJumpTimer?: Phaser.Time.TimerEvent;
        slowDownTimer?: Phaser.Time.TimerEvent;
        shieldEffect?: Phaser.GameObjects.Ellipse;

        preload() {
          this.load.image('human', '/assets/game/human.png');
          this.load.image('ai', '/assets/game/ai.png');
          this.load.image('jenkins', '/assets/game/jenkins.svg');
          this.load.image('docker', '/assets/game/docker.svg');
          
          // Load power-up images
          this.load.image('shield', '/assets/game/shield.svg');
          this.load.image('cloud', '/assets/game/cloud.svg');
          this.load.image('slowdown', '/assets/game/slowdown.svg');
        }

        create() {
          // Reset game state
          this.score = 0;
          this.isGameOver = false;
          this.gameSpeed = 300;

          // Set world bounds
          const width = this.sys.game.canvas.width;
          const height = this.sys.game.canvas.height;
          this.physics.world.setBounds(0, 0, width, height);

          // Create ground as a scrolling platform
          this.ground = this.add.rectangle(width/2, height - 30, width, 60, 0x333333);
          this.physics.add.existing(this.ground, true);

          // Add background with grid pattern
          this.add.rectangle(0, 0, width, height, 0x16213e).setOrigin(0, 0);
          
          // Grid lines with scrolling effect
          this.gridGraphics = this.add.graphics();
          if (this.gridGraphics) {
            this.gridGraphics.lineStyle(1, 0xffffff, 0.1);
            
            // Draw horizontal grid lines
            for (let y = 0; y < height; y += 30) {
              this.gridGraphics.moveTo(0, y);
              this.gridGraphics.lineTo(width, y);
            }
            
            // Draw vertical grid lines
            for (let x = 0; x < width; x += 30) {
              this.gridGraphics.moveTo(x, 0);
              this.gridGraphics.lineTo(x, height);
            }
            this.gridGraphics.strokePath();
          }
          
          // Create player fixed in the left side (similar to Chrome dino)
          this.player = this.physics.add.sprite(width * 0.2, height - 100, 'human').setScale(0.5);
          this.player.setCollideWorldBounds(true);
          this.player.setGravityY(1200);
          // Fix X position
          this.player.body.setAllowGravity(true);
          
          // Create AI chaser slightly behind the player (fixed distance)
          this.aiChaser = this.physics.add.sprite(width * 0.1, height - 100, 'ai').setScale(0.5);
          this.aiChaser.setCollideWorldBounds(true);
          this.aiChaser.setGravityY(1200);
          
          // Visual distance indicator between human and AI
          this.dangerZone = this.add.rectangle(
            width * 0.15, 
            height - 10, 
            width * 0.1, 
            5, 
            0xff0000
          ).setOrigin(0, 0.5);
          this.dangerZone.setAlpha(0.6);

          // Setup collisions
          this.physics.add.collider(this.player, this.ground);
          this.physics.add.collider(this.aiChaser, this.ground);

          // Setup keyboard controls
          this.cursors = this.input.keyboard?.createCursorKeys() || {} as Phaser.Types.Input.Keyboard.CursorKeys;
          
          // Create obstacle group
          this.obstacles = this.physics.add.group();
          this.physics.add.collider(this.obstacles, this.ground);

          // Collider between player and obstacles (with shield check)
          this.physics.add.collider(this.player, this.obstacles, (player, obstacle) => {
            // If player has a shield, destroy the obstacle instead of game over
            if (this.hasShield) {
              (obstacle as Phaser.Physics.Arcade.Sprite).destroy();
              // Shield gets used up
              this.hasShield = false;
              if (this.shieldEffect) {
                this.shieldEffect.setVisible(false);
              }
              this.statusText.setText('SHIELD BROKEN');
              this.time.delayedCall(1000, () => {
                this.statusText.setText('');
              });
              return;
            }
            
            // Otherwise, game over
            this.gameOver();
          }, undefined, this);

          // Create power-up group
          this.powerUps = this.physics.add.group();

          // Load high score from local storage
          const storedHighScore = localStorage.getItem('devops-runner-highscore');
          this.highScore = storedHighScore ? parseInt(storedHighScore) : 0;
          
          // Score display
          this.scoreText = this.add.text(16, 16, 'Score: 0', { 
            fontSize: '20px', 
            color: '#ffffff',
            fontFamily: 'Arial, sans-serif',
            stroke: '#000000',
            strokeThickness: 3
          });
          
          // High score display
          this.highScoreText = this.add.text(16, 48, `High Score: ${this.highScore}`, { 
            fontSize: '16px', 
            color: '#ffcc66',
            fontFamily: 'Arial, sans-serif',
            stroke: '#000000',
            strokeThickness: 2
          });
          
          // Status text for power-ups
          this.statusText = this.add.text(width - 16, 16, '', { 
            fontSize: '16px', 
            color: '#6ee7b7',
            fontFamily: 'Arial, sans-serif',
            stroke: '#000000',
            strokeThickness: 2
          }).setOrigin(1, 0);
          
          // Add instruction text
          const instructions = this.add.text(width/2, 50, 'Press SPACE or UP ARROW to Jump', {
            fontSize: '16px',
            color: '#ffff99',
            fontFamily: 'Arial, sans-serif',
          }).setOrigin(0.5);
          
          // Delay first obstacle to give player time to get started
          this.time.delayedCall(2000, () => {
            this.lastObstacleTime = this.time.now;
            // Start with a slower speed that gradually increases
            this.gameSpeed = 300;
          });
        }

        update(time: number) {
          // If game over, don't update anything
          if (this.isGameOver) return;

          const width = this.sys.game.canvas.width;
          const height = this.sys.game.canvas.height;
          
          // Lock player X position (Chrome dino style)
          // Reset X position if it moved somehow
          this.player.x = width * 0.2;
          
          // AI chaser movement (slowly getting closer)
          // Gradually move AI closer to player as score increases
          const targetX = Math.min(width * 0.15, width * 0.05 + (this.score * 0.0005 * width));
          this.aiChaser.x = Phaser.Math.Linear(this.aiChaser.x, targetX, 0.01);
          
          // Jump controls - more like Chrome dino game
          // Allow jumping with both up arrow and space
          if ((this.cursors.up?.isDown || this.cursors.space?.isDown) && this.player.body.touching.down) {
            this.player.setVelocityY(-700); // Higher jump
            // Play jump sound if we had one
          }
          
          // Game speed increases with score
          this.gameSpeed = Math.min(800, 300 + this.score * 0.5);
          
          // Spawn obstacles at intervals
          if (time > this.lastObstacleTime + this.obstacleInterval) {
            this.spawnObstacle();
            this.lastObstacleTime = time;
            
            // Gradually decrease interval (increase difficulty)
            this.obstacleInterval = Math.max(800, 2000 - this.score);
          }
          
          // Spawn power-ups occasionally
          if (time > this.lastPowerUpTime + this.powerUpInterval) {
            this.spawnPowerUp();
            this.lastPowerUpTime = time;
            
            // Power-ups appear less frequently as the game progresses
            this.powerUpInterval = Math.min(15000, 10000 + this.score * 10);
          }
          
          // Clean up obstacles that are off-screen and increase score
          this.obstacles.getChildren().forEach(obstacle => {
            const sprite = obstacle as Phaser.Physics.Arcade.Sprite;
            if (sprite.x < -100) {
              sprite.destroy();
              // Increase score when passing an obstacle
              this.score += 10;
              this.scoreText.setText(`Score: ${this.score}`);
            }
          });
          
          // Handle power-ups
          this.powerUps.getChildren().forEach(powerUp => {
            const sprite = powerUp as Phaser.Physics.Arcade.Sprite;
            if (sprite.x < -100) {
              sprite.destroy();
            }
          });
          
          // Collision with power-ups
          this.physics.overlap(this.player, this.powerUps, this.collectPowerUp, undefined, this);
          
          // Game over if AI catches player
          // As score increases, required distance gets smaller
          const safeDistance = Math.max(width * 0.05, width * 0.1 - (this.score * 0.0001 * width));
          if (this.player.x - this.aiChaser.x < safeDistance) {
            this.gameOver();
          }
          
          // Parallax effect for background (optional enhancement)
          if (this.gridGraphics && this.gridGraphics.x > -30) {
            this.gridGraphics.x -= 1;
          } else if (this.gridGraphics) {
            this.gridGraphics.x = 0;
          }
          
          // Update shield position if active
          if (this.hasShield && this.shieldEffect) {
            this.shieldEffect.setPosition(this.player.x, this.player.y);
          }
        }

        spawnObstacle() {
          // Choose random obstacle type
          const obstacleType = Phaser.Math.RND.pick(this.obstacleTypes);
          const height = this.sys.game.canvas.height;
          const width = this.sys.game.canvas.width;
          
          // Random Y position for variation (some obstacles higher than others)
          const heightVariation = Phaser.Math.Between(0, 2);
          let obstacleY = height - 80;
          
          // For challenging obstacles, make them higher
          if (heightVariation > 0 && this.score > 100) {
            obstacleY = height - 90 - (heightVariation * 30);
          }
          
          // Position obstacle at the right edge of the screen
          const obstacle = this.obstacles.create(
            width + 100,
            obstacleY,
            obstacleType
          ).setScale(0.3) as Phaser.Physics.Arcade.Sprite;
          
          // Speed increases with game progress
          obstacle.setVelocityX(-this.gameSpeed);
          obstacle.setImmovable(true);
          
          // Make sure the obstacle isn't affected by gravity
          this.physics.world.enableBody(obstacle, Phaser.Physics.Arcade.DYNAMIC_BODY);
          if (obstacle.body) {
            // @ts-ignore - This property exists but TypeScript doesn't recognize it
            obstacle.body.allowGravity = false;
          }
          
          // Occasionally add double obstacles if score is high enough
          if (this.score > 300 && Phaser.Math.Between(1, 10) > 7) {
            const secondObstacle = this.obstacles.create(
              width + 150,
              height - 80,
              Phaser.Math.RND.pick(this.obstacleTypes)
            ).setScale(0.3) as Phaser.Physics.Arcade.Sprite;
            
            secondObstacle.setVelocityX(-this.gameSpeed);
            secondObstacle.setImmovable(true);
            
            this.physics.world.enableBody(secondObstacle, Phaser.Physics.Arcade.DYNAMIC_BODY);
            if (secondObstacle.body) {
              // @ts-ignore - This property exists but TypeScript doesn't recognize it
              secondObstacle.body.allowGravity = false;
            }
          }
          
          // Randomize time of next obstacle (more unpredictable)
          this.obstacleInterval = Phaser.Math.Between(1500, 2200);
        }

        spawnPowerUp() {
          // Choose random power-up type
          const powerUpType = Phaser.Math.RND.pick(this.powerUpTypes);
          const height = this.sys.game.canvas.height;
          const width = this.sys.game.canvas.width;
          
          // Position power-up at a random height
          const powerUp = this.powerUps.create(
            width + 100,
            Phaser.Math.Between(height - 200, height - 100),
            powerUpType
          ).setScale(0.4) as Phaser.Physics.Arcade.Sprite;
          
          // Add a shiny effect to make it stand out
          powerUp.setTint(0xffff99);
          
          // Move with game speed
          powerUp.setVelocityX(-this.gameSpeed);
          
          // Enable physics but don't apply gravity
          this.physics.world.enableBody(powerUp, Phaser.Physics.Arcade.DYNAMIC_BODY);
          if (powerUp.body) {
            // @ts-ignore
            powerUp.body.allowGravity = false;
          }
          
          // Make it bob up and down slightly
          this.tweens.add({
            targets: powerUp,
            y: powerUp.y - 20,
            duration: 1000,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
          });
        }
        
        collectPowerUp(player: Phaser.Physics.Arcade.Sprite, powerUp: Phaser.Physics.Arcade.Sprite) {
          // Remove the power-up
          powerUp.destroy();
          
          // Apply different effects based on power-up type
          const powerUpType = powerUp.texture.key;
          
          switch (powerUpType) {
            case 'shield':
              this.activateShield();
              break;
            case 'cloud':
              this.activateCloudJump();
              break;
            case 'slowdown':
              this.activateSlowDown();
              break;
          }
        }
        
        activateShield() {
          // Clear existing shield timer if there is one
          if (this.shieldTimer) {
            this.shieldTimer.remove();
          }
          
          // Create shield effect around player
          if (!this.shieldEffect) {
            this.shieldEffect = this.add.ellipse(
              this.player.x,
              this.player.y,
              100,
              100,
              0x4c6ef5,
              0.4
            );
          } else {
            this.shieldEffect.setVisible(true);
          }
          
          // Set shield status
          this.hasShield = true;
          this.statusText.setText('SHIELD ACTIVE');
          this.statusText.setColor('#4c6ef5');
          
          // Shield lasts for 5 seconds
          this.shieldTimer = this.time.delayedCall(5000, () => {
            this.hasShield = false;
            if (this.shieldEffect) {
              this.shieldEffect.setVisible(false);
            }
            this.statusText.setText('');
          });
        }
        
        activateCloudJump() {
          // Clear existing cloud jump timer if there is one
          if (this.cloudJumpTimer) {
            this.cloudJumpTimer.remove();
          }
          
          // Add cloud effect to player (particle emitter would be better)
          this.player.setTint(0xffcc66);
          
          // Modify jump velocity
          const originalGravity = this.player.body.gravity.y;
          this.player.setGravityY(originalGravity * 0.6);
          
          // Display status
          this.statusText.setText('SUPER JUMP');
          this.statusText.setColor('#ffcc66');
          
          // Effect lasts for 7 seconds
          this.cloudJumpTimer = this.time.delayedCall(7000, () => {
            this.player.clearTint();
            this.player.setGravityY(originalGravity);
            this.statusText.setText('');
          });
        }
        
        activateSlowDown() {
          // Clear existing slow down timer if there is one
          if (this.slowDownTimer) {
            this.slowDownTimer.remove();
          }
          
          // Store original game speed
          const originalSpeed = this.gameSpeed;
          
          // Slow down all obstacles
          this.gameSpeed = this.gameSpeed * 0.5;
          this.obstacles.getChildren().forEach(obstacle => {
            const sprite = obstacle as Phaser.Physics.Arcade.Sprite;
            sprite.setVelocityX(-this.gameSpeed);
          });
          
          // Visual effect
          this.cameras.main.setTint(0xe0ffec);
          
          // Display status
          this.statusText.setText('TIME SLOW');
          this.statusText.setColor('#6ee7b7');
          
          // Effect lasts for 6 seconds
          this.slowDownTimer = this.time.delayedCall(6000, () => {
            this.gameSpeed = originalSpeed;
            this.cameras.main.clearTint();
            this.statusText.setText('');
          });
        }

        gameOver() {
          if (this.isGameOver) return;
          
          this.isGameOver = true;
          
          // Stop obstacles
          this.obstacles.getChildren().forEach(obstacle => {
            const sprite = obstacle as Phaser.Physics.Arcade.Sprite;
            sprite.setVelocityX(0);
          });
          
          // Stop power-ups
          this.powerUps.getChildren().forEach(powerUp => {
            const sprite = powerUp as Phaser.Physics.Arcade.Sprite;
            sprite.setVelocityX(0);
          });
          
          // Game over text
          const width = this.sys.game.canvas.width;
          const height = this.sys.game.canvas.height;
          
          const gameOverPanel = this.add.rectangle(
            width/2, 
            height/2, 
            300, 
            220, 
            0x000000, 
            0.8
          );
          
          this.add.text(
            width/2, 
            height/2 - 60, 
            'GAME OVER', 
            { 
              fontSize: '32px', 
              color: '#ff0000',
              fontFamily: 'Arial, sans-serif',
            }
          ).setOrigin(0.5);
          
          this.add.text(
            width/2, 
            height/2 - 10, 
            `Score: ${this.score}`, 
            { 
              fontSize: '24px', 
              color: '#ffffff',
              fontFamily: 'Arial, sans-serif',
            }
          ).setOrigin(0.5);
          
          // Check for high score
          let newHighScore = false;
          if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('devops-runner-highscore', this.score.toString());
            newHighScore = true;
          }
          
          // Show high score message
          if (newHighScore) {
            this.add.text(
              width/2, 
              height/2 + 30, 
              'New High Score!', 
              { 
                fontSize: '20px', 
                color: '#ffcc66',
                fontFamily: 'Arial, sans-serif',
              }
            ).setOrigin(0.5);
          }
          
          // Update React state
          setFinalScore(this.score);
          setIsGameOver(true);
        }
      }

      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        width: Math.min(window.innerWidth - 40, 950),
        height: 550,
        backgroundColor: '#16213e',
        physics: {
          default: 'arcade',
          arcade: {
            gravity: { y: 1200, x: 0 }, // Adjusted gravity for higher jumps
            debug: false
          },
        },
        scene: [GameScene],
        parent: gameRef.current,
        pixelArt: true,
        roundPixels: true,
      };

      game = new Phaser.Game(config);
    }

    return () => {
      game?.destroy(true);
      setIsGameOver(false);
    };
  }, [restartKey]);

  const handleRestart = () => {
    setIsGameOver(false);
    setFinalScore(0);
    setRestartKey(prev => prev + 1);
  };

  return (
    <div className="relative flex flex-col items-center">
      <div 
        ref={gameRef} 
        className="rounded-xl overflow-hidden border-2 border-gray-800 shadow-2xl"
      />
      
      {isGameOver && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl">
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-8 shadow-2xl max-w-md mx-4">
            <h2 className="text-3xl font-bold text-white mb-4">Game Over!</h2>
            <p className="text-xl mb-6 text-gray-200">Your score: <span className="text-orange-500 font-bold">{finalScore}</span></p>
            <button
              onClick={handleRestart}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-500 hover:to-indigo-500 transition-all shadow-lg shadow-indigo-600/30 text-lg"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
      
      <div className="mt-6 text-center text-gray-400 space-y-2 bg-gray-800/50 p-4 rounded-lg">
        <p className="font-medium text-white">Game Controls:</p>
        <p><span className="text-white font-medium">↑ Up Arrow</span> or <span className="text-white font-medium">Space</span> - Jump</p>
        <div className="flex justify-center gap-4 mt-2">
          <div className="flex items-center gap-1">
            <span className="inline-block w-3 h-3 rounded-full bg-blue-400"></span>
            <span className="text-blue-400 text-xs">Shield</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="inline-block w-3 h-3 rounded-full bg-yellow-400"></span>
            <span className="text-yellow-400 text-xs">Super Jump</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="inline-block w-3 h-3 rounded-full bg-green-400"></span>
            <span className="text-green-400 text-xs">Slow Time</span>
          </div>
        </div>
        <p className="text-yellow-300 text-xs mt-1">Collect power-ups and beat your high score!</p>
      </div>
    </div>
  );
};

export default GamePage;
