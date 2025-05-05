/**
 * RPG-Style Effects for Ancient Greek Musical Odyssey (Final Version)
 * This script adds Pokemon-style text animations, sound effects, mouse movement,
 * and Works Cited functionality to the experience.
 */

(function() {
    console.log("Loading final fixed RPG effects...");
    
    // Create styling for RPG dialog box and Works Cited
    function addStyles() {
        const styleEl = document.createElement('style');
        styleEl.textContent = `
            /* Pokemon-style text box styling */
            #rpg-dialog-box {
                position: absolute;
                bottom: 15%;
                left: 50%;
                transform: translateX(-50%);
                width: 80%;
                max-width: 800px;
                background-color: rgba(0, 0, 0, 0.8);
                border: 4px solid #f5deb3;
                border-radius: 10px;
                padding: 20px;
                color: white;
                z-index: 1000; /* Make sure this is above other elements */
                font-family: 'Courier New', monospace;
                line-height: 1.5;
                display: none;
            }
            
            #rpg-dialog-name {
                color: #f5deb3;
                font-size: 20px;
                margin-bottom: 10px;
                font-weight: bold;
            }
            
            #rpg-dialog-text {
                font-size: 18px;
                margin-bottom: 15px;
                min-height: 3em;
            }
            
            #rpg-dialog-continue {
                color: #f5deb3;
                text-align: right;
                font-style: italic;
                cursor: pointer;
                animation: blink 1s infinite;
            }
            
            @keyframes blink {
                0%, 49% { opacity: 1; }
                50%, 100% { opacity: 0; }
            }
            
            /* Works Cited page styling */
            #works-cited {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.9);
                color: white;
                display: none;
                z-index: 2000;
                overflow-y: auto;
            }
            
            #works-cited-content {
                max-width: 800px;
                margin: 40px auto;
                padding: 20px;
                font-family: 'Georgia', serif;
                line-height: 1.6;
            }
            
            #works-cited h1 {
                text-align: center;
                color: #f5deb3;
                margin-bottom: 30px;
                font-size: 36px;
            }
            
            #works-cited ol {
                padding-left: 20px;
            }
            
            #works-cited li {
                margin-bottom: 15px;
            }
            
            #works-cited-close {
                display: block;
                width: 200px;
                margin: 30px auto;
                padding: 10px;
                background-color: #8b5a2b;
                color: white;
                text-align: center;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-size: 18px;
            }
            
            #works-cited-close:hover {
                background-color: #a67c52;
            }
        `;
        document.head.appendChild(styleEl);
    }
    
    // Create DOM elements for RPG dialog and Works Cited
    function createElements() {
        // Create RPG dialog box if it doesn't exist
        if (!document.getElementById('rpg-dialog-box')) {
            const dialogBox = document.createElement('div');
            dialogBox.id = 'rpg-dialog-box';

            const dialogName = document.createElement('div');
            dialogName.id = 'rpg-dialog-name';

            const dialogText = document.createElement('div');
            dialogText.id = 'rpg-dialog-text';

            const dialogContinue = document.createElement('div');
            dialogContinue.id = 'rpg-dialog-continue';
            dialogContinue.textContent = 'Continue';

            dialogBox.appendChild(dialogName);
            dialogBox.appendChild(dialogText);
            dialogBox.appendChild(dialogContinue);
            document.body.appendChild(dialogBox);

            // Add event listener for the entire dialog box
            dialogBox.addEventListener('click', function(e) {
                if (window.gameManager && window.gameManager.textDisplayController) {
                    if (window.gameManager.textDisplayController.isDisplaying) {
                        window.gameManager.textDisplayController.skipToEnd();
                    } else {
                        if (window.sceneManager && window.sceneManager.continueDialog) {
                            window.sceneManager.continueDialog();
                        } else if (window.sceneManager && window.sceneManager.onDialogComplete) {
                            window.sceneManager.onDialogComplete();
                        } else {
                            dialogBox.style.display = 'none';
                        }
                    }
                }
            });
        }

        // Create Works Cited panel if it doesn't exist
        if (!document.getElementById('works-cited')) {
            const worksCited = document.createElement('div');
            worksCited.id = 'works-cited';
            
            const content = document.createElement('div');
            content.id = 'works-cited-content';
            
            const title = document.createElement('h1');
            title.textContent = 'Works Cited';
            
            const list = document.createElement('ol');
            const citations = [
                '<i>Homeric Hymn to Hermes</i> - English translation by H.G. Evelyn-White',
                'M. L. West, <i>Ancient Greek Music</i> (Oxford: OUP, 1992)',
                'J. G. Landels, <i>Music in Ancient Greece and Rome</i> (London: Routledge, 1999)',
                'T. J. Mathiesen, <i>Apollo\'s Lyre: Greek Music and Music Theory in Antiquity and the Middle Ages</i> (Lincoln: U. of Nebraska Press, 1999)',
                'S. Hagel, <i>Ancient Greek Music: A New Technical History</i> (Cambridge: CUP, 2010)',
                'VMFA 62.1.3, side A: dancer and female auletris leading a komos, Attic red-figure column-krater, c. 470 BCE.',
                'The Metropolitan Museum of Art. Terracotta amphora (jar). Attributed to the Berlin Painter, Greek, Attic, ca. 490 BCE. Terracotta, red-figure. Acc. no. 56.171.38. The Met Collection Online. Accessed April 30, 2025.',
                'Music of the Ancient Greek Olympia… \'Procession of the Olympians\' (Composition for Replica Lyre in the Ancient Greek Lydian Mode). <i>YouTube</i>, uploaded by Michael Levy, 2010. Accessed 4 May 2025.',
                'Landon, Mark, photographer. "Red‑figure Phiale Woman Dancing with Crotoa (Boston MFA 97.371)." Wikimedia Commons, 30 Mar. 2025. Accessed 4 May 2025.'
            ];
            
            citations.forEach(citation => {
                const item = document.createElement('li');
                item.innerHTML = citation;
                list.appendChild(item);
            });
            
            const closeButton = document.createElement('button');
            closeButton.id = 'works-cited-close';
            closeButton.textContent = 'Return';
            
            content.appendChild(title);
            content.appendChild(list);
            content.appendChild(closeButton);
            worksCited.appendChild(content);
            document.body.appendChild(worksCited);
            
            // Add event listener to close button
            closeButton.addEventListener('click', () => {
                worksCited.style.display = 'none';
            });
        }
    }
    
    // Audio Controller
    class AudioController {
        constructor() {
            this.bgMusic = null;
            this.textSound = null;
            this.bgMusicSource = null;
            this.isInitialized = false;
            this.audioContext = null;
            
            // Initialize on user interaction
            document.addEventListener('click', () => {
                if (!this.isInitialized) {
                    this.init();
                }
            }, { once: true });
        }
        
        // Initialize audio system
        async init() {
            if (this.isInitialized) return;
            
            try {
                // Create audio context
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
                
                // Load audio files
                Promise.all([
                    this.loadAudio('theme.mp3'),
                    this.loadAudio('pop.mp3')
                ]).then(([bgMusic, textSound]) => {
                    this.bgMusic = bgMusic;
                    this.textSound = textSound;
                    
                    // Start background music
                    this.playBackgroundMusic();
                }).catch(err => {
                    console.warn('Error loading audio files:', err);
                });
                
                this.isInitialized = true;
                console.log('Audio system initialized');
            } catch (error) {
                console.error('Failed to initialize audio system:', error);
            }
        }
        
        // Load audio file
        async loadAudio(path) {
            try {
                const response = await fetch(path);
                if (!response.ok) {
                    console.warn(`Failed to load audio file ${path}: ${response.status}`);
                    return null;
                }
                
                const arrayBuffer = await response.arrayBuffer();
                return await this.audioContext.decodeAudioData(arrayBuffer);
            } catch (error) {
                console.warn(`Failed to load audio file: ${path}`, error);
                return null;
            }
        }
        
        // Play background music with looping
        playBackgroundMusic() {
            if (!this.isInitialized || !this.bgMusic || this.bgMusicSource) return;
            
            try {
                // Create source node
                const source = this.audioContext.createBufferSource();
                source.buffer = this.bgMusic;
                source.loop = true;
                source.connect(this.audioContext.destination);
                source.start(0);
                
                this.bgMusicSource = source;
                console.log('Background music started');
            } catch (error) {
                console.error('Failed to play background music:', error);
            }
        }
        
        // Play text sound effect
        playTextSound() {
            if (!this.isInitialized || !this.textSound) return;
            
            try {
                const source = this.audioContext.createBufferSource();
                source.buffer = this.textSound;
                source.connect(this.audioContext.destination);
                source.start(0);
            } catch (error) {
                console.warn('Failed to play text sound:', error);
            }
        }
    }
    
    // Text Display Controller
    class TextDisplayController {
        constructor(audioController) {
            this.audioController = audioController;
            this.textSpeed = 50; // ms per character
            this.currentText = '';
            this.targetText = '';
            this.textIndex = 0;
            this.textInterval = null;
            this.isDisplaying = false;
            this.onComplete = null;
            this.speakerName = null;
            
            this.dialogBox = document.getElementById('rpg-dialog-box');
            this.dialogName = document.getElementById('rpg-dialog-name');
            this.dialogText = document.getElementById('rpg-dialog-text');
            this.dialogContinue = document.getElementById('rpg-dialog-continue');
            
            // Set up keyboard event for ANY key to continue/skip
            document.addEventListener('keydown', (event) => {
                // Only process if our dialog is showing
                if (this.dialogBox && this.dialogBox.style.display === 'block') {
                    // Make sure we're not handling special keys like F5, etc.
                    if (event.code === 'Enter' || event.code === 'Space') {
                        if (this.isDisplaying) {
                            this.skipToEnd();
                        } else if (window.sceneManager && window.sceneManager.continueDialog) {
                            window.sceneManager.continueDialog();
                        } else if (this.onComplete) {
                            this.onComplete();
                        }
                        
                        // Prevent default actions for space/enter
                        event.preventDefault();
                    }
                }
            });
        }
        
        // Display text with typewriter effect
        displayText(text, speakerName = null, callback = null) {
            // Skip empty texts
            if (!text || text.trim() === '') {
                if (callback) callback();
                return;
            }
            
            this.targetText = text;
            this.currentText = '';
            this.textIndex = 0;
            this.isDisplaying = true;
            this.onComplete = callback;
            this.speakerName = speakerName;
            
            // Show speaker name if provided
            if (this.dialogName) {
                if (speakerName) {
                    this.dialogName.textContent = speakerName;
                    this.dialogName.style.display = 'block';
                } else {
                    this.dialogName.style.display = 'none';
                }
            }
            
            // Show dialog box
            this.dialogBox.style.display = 'block';
            this.dialogText.textContent = '';
            this.dialogContinue.style.display = 'none';
            
            // Clear previous interval if it exists
            if (this.textInterval) {
                clearInterval(this.textInterval);
            }
            
            // Handle case where text has format "Speaker: Text"
            if (!speakerName && text.includes(':')) {
                const parts = text.split(':');
                if (parts.length >= 2) {
                    const possibleName = parts[0].trim();
                    // If the first part seems like a name
                    if (possibleName.length < 30 && this.dialogName) {
                        this.dialogName.textContent = possibleName;
                        this.dialogName.style.display = 'block';
                        // Remove the name part from the text
                        this.targetText = parts.slice(1).join(':').trim();
                    }
                }
            }
            
            // Start the typewriter effect
            this.textInterval = setInterval(() => {
                if (this.textIndex < this.targetText.length) {
                    // Get next character
                    const nextChar = this.targetText.charAt(this.textIndex);
                    this.currentText += nextChar;
                    this.dialogText.textContent = this.currentText;
                    this.textIndex++;
                    
                    // Play sound for each character (but not for spaces)
                    if (nextChar !== ' ') {
                        this.audioController.playTextSound();
                    }
                } else {
                    // Text is complete
                    clearInterval(this.textInterval);
                    this.textInterval = null;
                    this.isDisplaying = false;
                    
                    // Show continue indicator
                    this.dialogContinue.style.display = 'block';
                }
            }, this.textSpeed);
        }
        
        // Skip to end of text
        skipToEnd() {
            if (!this.isDisplaying) return;
            
            // Clear interval
            if (this.textInterval) {
                clearInterval(this.textInterval);
                this.textInterval = null;
            }
            
            // Show full text
            this.currentText = this.targetText;
            this.dialogText.textContent = this.currentText;
            this.isDisplaying = false;
            
            // Show continue indicator
            this.dialogContinue.style.display = 'block';
        }
        
        // Hide dialog box
        hideDialog() {
            if (this.dialogBox) {
                this.dialogBox.style.display = 'none';
            }
            
            // Clear interval if it exists
            if (this.textInterval) {
                clearInterval(this.textInterval);
                this.textInterval = null;
            }
            
            this.isDisplaying = false;
        }
    }
    
    // Mouse Look Controller
    class MouseLookController {
        constructor(camera) {
            if (!window.THREE || !camera) return;
            
            this.camera = camera;
            this.isEnabled = false;
            this.isLocked = false;
            this.euler = new THREE.Euler(0, 0, 0, 'YXZ');
            this.mouseSensitivity = 0.002;
            
            // Bind methods
            this.onMouseMove = this.onMouseMove.bind(this);
            this.onPointerLockChange = this.onPointerLockChange.bind(this);
            
            // Add event listeners
            document.addEventListener('pointerlockchange', this.onPointerLockChange);
            
            // Add click event to request pointer lock
            document.addEventListener('click', () => {
                if (this.isEnabled && !this.isLocked) {
                    document.body.requestPointerLock();
                }
            });
        }
        
        // Enable mouse look
        enable() {
            this.isEnabled = true;
            document.addEventListener('mousemove', this.onMouseMove);
        }
        
        // Disable mouse look
        disable() {
            this.isEnabled = false;
            document.removeEventListener('mousemove', this.onMouseMove);
            
            if (document.exitPointerLock) {
                document.exitPointerLock();
            }
        }
        
        // Handle pointer lock change event
        onPointerLockChange() {
            this.isLocked = document.pointerLockElement === document.body;
        }
        
        // Handle mouse movement
        onMouseMove(event) {
            if (!this.isEnabled || !this.isLocked) return;
            
            // Calculate rotation based on mouse movement
            const movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
            const movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
            
            // Update camera rotation
            this.euler.setFromQuaternion(this.camera.quaternion);
            this.euler.y -= movementX * this.mouseSensitivity;
            this.euler.x -= movementY * this.mouseSensitivity;
            
            // Limit vertical rotation
            this.euler.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.euler.x));
            
            this.camera.quaternion.setFromEuler(this.euler);
        }
    }
    
    // Set up event handlers
    function setupEventHandlers() {
        // Setup Works Cited button
        const creditsButton = document.getElementById('credits-button');
        if (creditsButton) {
            creditsButton.addEventListener('click', () => {
                const worksCited = document.getElementById('works-cited');
                if (worksCited) {
                    worksCited.style.display = 'block';
                }
            });
        }
    }
    
    // Override scene manager methods if present
    function overrideSceneManagerMethods() {
        // Wait for scene manager to be available
        const checkForSceneManager = setInterval(() => {
            if (window.sceneManager) {
                clearInterval(checkForSceneManager);
                
                const sm = window.sceneManager;
                
                // Immediately hide any original dialog boxes
                const originalDialogBox = document.getElementById('dialog-box');
                if (originalDialogBox) {
                    originalDialogBox.style.display = 'none';
                }
                
                // Override showSubtitle
                if (sm.showSubtitle) {
                    const originalShowSubtitle = sm.showSubtitle.bind(sm);
                    sm.showSubtitle = function(text, duration) {
                        // Hide original subtitle
                        if (sm.subtitle) {
                            sm.subtitle.style.opacity = '0';
                        }
                        
                        // Show RPG style text
                        window.gameManager.textDisplayController.displayText(text, null, () => {
                            if (duration) {
                                setTimeout(() => {
                                    window.gameManager.textDisplayController.hideDialog();
                                }, duration);
                            }
                        });
                    };
                }
                
                // Override dialog methods for Temple Guardian
                if (sm.showDialogMessage) {
                    const originalShowDialogMessage = sm.showDialogMessage.bind(sm);
                    sm.showDialogMessage = function(dialogKey, index) {
                        // Hide default dialog box
                        if (sm.dialogBox) {
                            sm.dialogBox.style.display = 'none';
                        }
                        
                        // Get dialog data
                        const dialogSequence = sm.dialogSequences[dialogKey];
                        if (!dialogSequence || index >= dialogSequence.length) {
                            if (sm.endDialog) sm.endDialog();
                            return;
                        }
                        
                        const dialog = dialogSequence[index];
                        
                        // Handle different dialog formats
                        let name = null;
                        let text = '';
                        
                        if (dialog.name && dialog.text) {
                            // Format 1: {name: "Name", text: "Text"}
                            name = dialog.name;
                            text = dialog.text;
                        } else if (typeof dialog === 'string') {
                            // Format 2: "Text"
                            text = dialog;
                        } else {
                            console.warn('Unknown dialog format:', dialog);
                            return;
                        }
                        
                        // Use RPG style text with name
                        window.gameManager.textDisplayController.displayText(text, name);
                    };
                }
                
                // Override continue dialog - THIS IS THE CRITICAL FIX
                if (sm.continueDialog) {
                    const originalContinueDialog = sm.continueDialog.bind(sm);
                    sm.continueDialog = function() {
                        console.log("Continue dialog called");
                        
                        // Skip current text if still animating
                        if (window.gameManager.textDisplayController.isDisplaying) {
                            window.gameManager.textDisplayController.skipToEnd();
                            return;
                        }
                        
                        // Hide our dialog box
                        window.gameManager.textDisplayController.hideDialog();
                        
                        // Store the current dialog index before continuing
                        const currentIndex = sm.currentDialogIndex;
                        const maxIndex = sm.dialogSequences && 
                                        sm.currentDialogIndex !== undefined &&
                                        sm.dialogSequences.templeGuardian && 
                                        sm.dialogSequences.templeGuardian.length - 1;
                        
                        // Manually increment the dialog index
                        sm.currentDialogIndex++;
                        
                        // If we're at the end of the dialog, call endDialog
                        if (sm.currentDialogIndex >= sm.dialogSequences.templeGuardian.length) {
                            console.log("End of dialog reached");
                            sm.endDialog();
                        } else {
                            // Otherwise, show the next dialog
                            console.log("Showing next dialog", sm.currentDialogIndex);
                            sm.showDialogMessage('templeGuardian', sm.currentDialogIndex);
                        }
                    };
                }
                
                // For temple-entrance.html - hook into endDialog
                if (sm.endDialog) {
                    const originalEndDialog = sm.endDialog.bind(sm);
                    sm.endDialog = function() {
                        // Hide RPG dialog box
                        window.gameManager.textDisplayController.hideDialog();
                        
                        // Force original dialog box to be hidden
                        if (sm.dialogBox) {
                            sm.dialogBox.style.display = 'none';
                        }
                        
                        // Ensure player can move
                        sm.playerCanMove = true;
                        sm.inDialog = false;
                        
                        // Call original method
                        originalEndDialog();
                    };
                }
                
                console.log('Scene manager methods overridden');
            }
        }, 100);
    }
    
    // Initialize the gameManager
    function initGameManager() {
        // Add styles and create elements
        addStyles();
        createElements();
        
        // Create audio controller
        const audioController = new AudioController();
        
        // Create text display controller
        const textDisplayController = new TextDisplayController(audioController);
        
        // Create game manager
        window.gameManager = {
            audioController,
            textDisplayController,
            mouseLookController: null,
            
            // Initialize mouse look with camera
            initMouseLook: function(camera) {
                if (window.THREE && camera) {
                    this.mouseLookController = new MouseLookController(camera);
                    console.log('Mouse look initialized');
                }
            },
            
            // Enable mouse look
            enableMouseLook: function() {
                if (this.mouseLookController) {
                    this.mouseLookController.enable();
                }
            },
            
            // Disable mouse look
            disableMouseLook: function() {
                if (this.mouseLookController) {
                    this.mouseLookController.disable();
                }
            },
            
            // Display text with RPG-style animation
            displayText: function(text, speakerName, callback) {
                this.textDisplayController.displayText(text, speakerName, callback);
            },
            
            // Skip current text animation
            skipTextAnimation: function() {
                this.textDisplayController.skipToEnd();
            },
            
            // Hide text box
            hideText: function() {
                this.textDisplayController.hideDialog();
            }
        };
        
        // Setup event handlers
        setupEventHandlers();
        
        // Override scene manager methods
        overrideSceneManagerMethods();
        
        // Try to initialize mouse look if THREE and camera are available
        if (window.THREE && window.sceneManager && window.sceneManager.camera) {
            window.gameManager.initMouseLook(window.sceneManager.camera);
        }
        
        // Detect when scene manager is initialized
        window.addEventListener('sceneManagerInitialized', function(e) {
            if (e.detail && e.detail.sceneManager && e.detail.sceneManager.camera) {
                window.gameManager.initMouseLook(e.detail.sceneManager.camera);
                
                // Override methods for this instance
                overrideSceneManagerMethods();
            }
        });
        
        console.log('Game manager initialized');
    }
    
    // Initialize everything
    initGameManager();
})();