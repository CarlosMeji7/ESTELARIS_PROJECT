// ============================================================================
// ESTELARIS — OBSERVATORIO & SIMULADOR ASTRONÓMICO / N-BODY KEPLERIANO 3D
// ============================================================================

// --- VARIABLES GLOBALES & ESCENA THREE.JS ---
let scene, camera, renderer, controls;
let ambientLight = null;
let sunLight = null;
let bodies = [];
let orbitsVisible = true;
let vectorsVisible = false;
let moonsVisible = true;
let kuiperVisible = true;
let milkyWayVisible = true;
let gridHelper;
let isPaused = false;
let timeSpeed = 1.0;
let isDayToDayMode = false;
let G = 0.05; // Constante gravitatoria base
let simulatedTime = 0; // Años simulados acumulados
const BASE_DATE = new Date(2026, 0, 1); // 01 de Enero de 2026

// Rendimiento & FPS
let lastFrameTime = performance.now();
let lastFpsUpdateTime = performance.now();
let frameCount = 0;
let fps = 60;
let initialCameraPos = null;
let initialControlsTarget = null;

// Selección e interactividad
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();
let selectedBody = null;
let hoveredBody = null;
let selectionReticle = null;
let focusBody = null;
let touchDragStartX = 0;
let touchDragStartY = 0;
let touchDragStartTime = 0;
let lowFpsCounter = 0;

// Memoria y transición de cámara
let savedPreFocusCameraPos = new THREE.Vector3();
let savedPreFocusControlsTarget = new THREE.Vector3();
let hasSavedPreFocus = false;
let isTransitioningToFocus = false;
let isTransitioningBack = false;
let focusOffset = new THREE.Vector3();
let transitionProgress = 0;
let transitionDuration = 1.0;
let transitionStartCamPos = new THREE.Vector3();
let transitionStartControlsTarget = new THREE.Vector3();
const baseCameraFov = 60;

// --- DIRECTOR CINEMATOGRÁFICO ELEGANTE & CALIBRADO (T & SHIFT+T) ---
let isCinematicMode = false;
let cinematicStyle = 'documentary'; // 'documentary' (cortes directos nítidos) o 'intense' (vuelo dinámico y zoom)
let isCameraLocked = false;
let currentShot = null;
let shotTimer = 0;
let lastShotBodyName = '';

// Viento Espacial Lateral 2D
let warpCanvas = null;
let warpCtx = null;
let lateralParticles = [];
const lateralParticleCount = 140;

// Campos Estelares & Entorno Cósmico
let starfieldPoints = null;
let milkyWayPoints = null;
let cosmicNebulaMeshes = [];
let asteroidBeltParticles = null;
const asteroidBeltCount = 1800;
let kuiperBeltParticles = null;
const kuiperBeltCount = 2800;

// Vectores 3D de Estado (Velocidad y Gravedad)
let velocityArrow = null;
let gravityArrow = null;

// Referencias DOM
const statBodies = document.getElementById('stat-bodies');
const statTime = document.getElementById('stat-time');
const statDate = document.getElementById('stat-date');
const statFps = document.getElementById('stat-fps');

const sliderTimeSpeed = document.getElementById('time-speed');
const valTimeSpeed = document.getElementById('time-speed-val');
const sliderGravity = document.getElementById('grav-const');
const valGravity = document.getElementById('grav-const-val');

const btnPlayPause = document.getElementById('btn-play-pause');
const btnReset = document.getElementById('btn-reset');
const chkOrbits = document.getElementById('chk-orbits');
const chkVectors = document.getElementById('chk-vectors');
const chkGravityField = document.getElementById('chk-gravity-field');
const chkMoons = document.getElementById('chk-moons');
const chkKuiper = document.getElementById('chk-kuiper');
const chkMilkyway = document.getElementById('chk-milkyway');
const chkGrid = document.getElementById('chk-grid');
let gravityFieldVisible = true;

const btnCinematicTour = document.getElementById('btn-cinematic-tour');
const btnLockCamera = document.getElementById('btn-lock-camera');

// UI Panel Derecho (Telemetría & Astrofísica)
const infoPanel = document.getElementById('info-panel');
const infoName = document.getElementById('info-name');
const infoType = document.getElementById('info-type');
const infoRadius = document.getElementById('info-radius');
const infoMass = document.getElementById('info-mass');
const infoSpeed = document.getElementById('info-speed');
const infoStatus = document.getElementById('info-status');
const infoEccentricity = document.getElementById('info-eccentricity');
const infoInclination = document.getElementById('info-inclination');
const infoCurrentDist = document.getElementById('info-current-dist');
const infoPeriod = document.getElementById('info-period');
const infoEnergyK = document.getElementById('info-energy-k');
const infoEnergyP = document.getElementById('info-energy-p');
const btnCloseInfo = document.getElementById('btn-close-info');
const btnFocusBody = document.getElementById('btn-focus-body');
const btnFocusText = document.getElementById('btn-focus-text');

// --- SISTEMA DE EVENTOS, SANDBOX & FÍSICA DINÁMICA ---
let isNBodyMode = false;
let habitableZoneVisible = true;
let habitableZoneMesh = null;
let projectiles = [];
let dynamicParticles = [];
let shockwaves = [];
let activeDebrisRings = [];
let rogueStars = [];

// DOM Sandbox & Eventos
const chkHabitableZone = document.getElementById('chk-habitable-zone');
const simModeBadge = document.getElementById('sim-mode-badge');
const simModeText = document.getElementById('sim-mode-text');
const btnNBodyToggle = document.getElementById('btn-nbody-toggle');
const nbodyToggleText = document.getElementById('nbody-toggle-text');
const btnLaunchAsteroid = document.getElementById('btn-launch-asteroid');
const btnRandomEvent = document.getElementById('btn-random-event');
const btnResetUniverse = document.getElementById('btn-reset-universe');

const btnScenarioRedGiant = document.getElementById('btn-scenario-redgiant');
const btnScenarioDeleteSun = document.getElementById('btn-scenario-deletesun');
const btnScenarioJupiterStar = document.getElementById('btn-scenario-jupiterstar');
const btnScenarioRogueStar = document.getElementById('btn-scenario-roguestar');
const btnScenarioImpact = document.getElementById('btn-scenario-impact');

// DOM Mutador Cósmico
const sliderBodyRadius = document.getElementById('body-radius-slider');
const valBodyRadius = document.getElementById('body-radius-val');
const sliderBodyMass = document.getElementById('body-mass-slider');
const valBodyMass = document.getElementById('body-mass-val');
const infoGravityReach = document.getElementById('info-gravity-reach');
const btnTargetImpact = document.getElementById('btn-target-impact');
const btnResetBody = document.getElementById('btn-reset-body');
let gravityFieldMesh = null;

// DOM Elementos Astro Seleccionado & Eliminación
const leftSelectedCard = document.getElementById('left-selected-card');
const leftSelectedName = document.getElementById('left-selected-name');
const leftSelectedType = document.getElementById('left-selected-type');
const btnLeftDeleteBody = document.getElementById('btn-left-delete-body');
const btnDeleteSelectedBody = document.getElementById('btn-delete-selected-body');

// --- SISTEMA DE PROPAGACIÓN RELATIVISTA A VELOCIDAD DE LA LUZ (c) ---
let activeGravitationalWaves = [];
// Calibración de la velocidad c: en la Tierra (R = 395 unidades Three.js)
// tarda exactamente 8.0 segundos a velocidad temporal 1.0x (equivalente a sus 8.32 min luz reales).
const SPEED_OF_LIGHT_SIM = 395.0 / 8.0; 

const hudGravWaveCard = document.getElementById('hud-grav-wave-card');
const hudGravWaveDesc = document.getElementById('grav-wave-desc');
const hudGravWaveRadius = document.getElementById('grav-wave-radius');
const hudGravWaveNext = document.getElementById('grav-wave-next');

const ASTRONOMICAL_LIGHT_DELAYS = {
    'Mercurio': { realSec: 193, realDesc: '3.2 min luz', realDistAU: 0.387 },
    'Venus': { realSec: 361, realDesc: '6.0 min luz', realDistAU: 0.723 },
    'Tierra': { realSec: 499, realDesc: '8.3 min luz', realDistAU: 1.000 },
    'Marte': { realSec: 760, realDesc: '12.7 min luz', realDistAU: 1.524 },
    'Ceres': { realSec: 1380, realDesc: '23.0 min luz', realDistAU: 2.766 },
    'Júpiter': { realSec: 2597, realDesc: '43.3 min luz', realDistAU: 5.204 },
    'Saturno': { realSec: 4782, realDesc: '79.7 min luz (1.33 h)', realDistAU: 9.582 },
    'Urano': { realSec: 9581, realDesc: '159.7 min luz (2.66 h)', realDistAU: 19.201 },
    'Neptuno': { realSec: 14994, realDesc: '249.9 min luz (4.16 h)', realDistAU: 30.047 },
    'Plutón': { realSec: 19702, realDesc: '328.4 min luz (5.47 h)', realDistAU: 39.482 },
    'Luna': { realSec: 1.28, realDesc: '1.28 s luz', realDistAU: 0.00257 },
    'Ío': { realSec: 1.41, realDesc: '1.41 s luz', realDistAU: 0.00282 },
    'Europa': { realSec: 2.24, realDesc: '2.24 s luz', realDistAU: 0.00448 },
    'Ganímedes': { realSec: 3.57, realDesc: '3.57 s luz', realDistAU: 0.00715 },
    'Calisto': { realSec: 6.28, realDesc: '6.28 s luz', realDistAU: 0.01258 },
    'Titán': { realSec: 4.08, realDesc: '4.08 s luz', realDistAU: 0.00817 },
    'Encélado': { realSec: 0.79, realDesc: '0.79 s luz', realDistAU: 0.00159 },
    'Tritón': { realSec: 1.18, realDesc: '1.18 s luz', realDistAU: 0.00237 },
    'Caronte': { realSec: 0.065, realDesc: '0.065 s luz', realDistAU: 0.00013 }
};

function getAstronomicalLightDelayInfo(bodyName, distUnits) {
    if (ASTRONOMICAL_LIGHT_DELAYS[bodyName]) {
        return ASTRONOMICAL_LIGHT_DELAYS[bodyName];
    }
    const au = (distUnits || 395.0) / 395.0;
    const realSec = au * 499.0;
    const realDesc = (realSec / 60.0).toFixed(1) + ' min luz';
    return { realSec, realDesc, realDistAU: au };
}

function createGravitationalWave(origin, sourceName = 'Sol', isSunExtinction = true, customSpeed = null) {
    const waveGroup = new THREE.Group();
    waveGroup.position.copy(origin);

    // 1. Anillo primario en el plano ecuatorial/orbital
    const primaryRingGeo = new THREE.RingGeometry(0.97, 1.03, 128);
    const primaryRingMat = new THREE.MeshBasicMaterial({
        color: isSunExtinction ? 0x38bdf8 : 0xff4757,
        transparent: true,
        opacity: 0.85,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });
    const primaryRing = new THREE.Mesh(primaryRingGeo, primaryRingMat);
    primaryRing.rotation.x = Math.PI / 2;
    waveGroup.add(primaryRing);

    // 2. Anillo secundario de estela de interferencia
    const secondaryRingGeo = new THREE.RingGeometry(0.91, 0.95, 128);
    const secondaryRingMat = new THREE.MeshBasicMaterial({
        color: isSunExtinction ? 0x818cf8 : 0xff6b81,
        transparent: true,
        opacity: 0.45,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });
    const secondaryRing = new THREE.Mesh(secondaryRingGeo, secondaryRingMat);
    secondaryRing.rotation.x = Math.PI / 2;
    waveGroup.add(secondaryRing);

    // 3. Cascarón esférico 3D translúcido (frente relativista de Einstein)
    const sphereGeo = new THREE.SphereGeometry(1.0, 36, 24);
    const sphereMat = new THREE.MeshBasicMaterial({
        color: isSunExtinction ? 0x38bdf8 : 0xff4757,
        wireframe: true,
        transparent: true,
        opacity: 0.05,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    waveGroup.add(sphereMesh);

    scene.add(waveGroup);

    const speed = customSpeed || SPEED_OF_LIGHT_SIM;

    const waveObj = {
        id: 'wave_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
        origin: origin.clone(),
        meshGroup: waveGroup,
        radius: 2.0,
        speed: speed,
        maxRadius: 7500.0,
        sourceName: sourceName,
        isSunExtinction: isSunExtinction,
        elapsedSeconds: 0,
        affectedBodies: new Set()
    };

    activeGravitationalWaves.push(waveObj);

    if (hudGravWaveCard) {
        hudGravWaveCard.style.display = 'flex';
        if (hudGravWaveDesc) {
            hudGravWaveDesc.textContent = isSunExtinction 
                ? 'El Sol ha colapsado: el apagón y la pérdida de gravedad viajan a la velocidad c.' 
                : `Colapso de ${sourceName}: la perturbación viaja a sus lunas a velocidad c.`;
        }
    }

    return waveObj;
}

function liberateMoonToHeliocentric(moon, parentName, parentPos, parentVelocity = null) {
    const moonWorldPos = new THREE.Vector3();
    if (moon.mesh) moon.mesh.getWorldPosition(moonWorldPos);

    if (moon.orbitLine) scene.remove(moon.orbitLine);

    moon.parentBody = null;
    moon.isMoon = false;
    moon.isPlanet = true;
    moon.isLiberated = true;
    moon.isWaitingMoonLiberation = false;
    moon.type = 'Planeta Enano (Ex-satélite de ' + parentName + ')';

    const distFromStar = Math.max(20, moonWorldPos.length());
    moon.orbitRadius = distFromStar;
    moon.baseOrbitRadius = distFromStar;
    moon.eccentricity = Math.min(0.25, (moon.eccentricity || 0.02) + 0.025);
    moon.inclination = (moon.inclination || 0) * 0.5;
    moon.currentM = Math.atan2(moonWorldPos.z, moonWorldPos.x);
    moon.orbitalSpeed = Math.max(0.0004, 0.038 / Math.sqrt(distFromStar));

    if (moon.mesh && moon.mesh.parent !== scene) {
        scene.attach(moon.mesh);
    }

    moon.orbitLine = createKeplerianOrbitLine(moon, 0x64748b);
    scene.add(moon.orbitLine);
    moon.orbitLine.visible = orbitsVisible;

    if (moon.velocity && parentVelocity) {
        moon.velocity.add(parentVelocity);
    }

    createShockwave(moonWorldPos, Math.max(15, (moon.radius || 3) * 4), 0x38bdf8);

    const delayInfo = getAstronomicalLightDelayInfo(moon.name, 0);
    logToConsole(`⚡ [Relatividad Local c] ¡Onda de colapso alcanzó a ${moon.name} (${delayInfo.realDesc})! Satélite liberado en órbita heliocéntrica independiente.`, 'warning');
}

// --- SISTEMA DE TOASTS & NOTIFICACIONES ---
function logToConsole(message, type = 'system') {
    const stack = document.getElementById('toast-stack');
    if (!stack) return;

    while (stack.children.length >= 3) {
        stack.firstChild.remove();
    }

    const toast = document.createElement('div');
    toast.className = 'toast toast--' + type;
    const iconMap = { system: 'fa-circle-info', action: 'fa-check', warning: 'fa-triangle-exclamation', danger: 'fa-trash-can', success: 'fa-circle-check' };
    const icon = iconMap[type] || 'fa-circle-info';
    
    toast.innerHTML = '<i class="fa-solid ' + icon + '"></i>' +
        '<span class="toast-text">' + message + '</span>' +
        '<button class="toast-close-btn" aria-label="Cerrar notificación" title="Cerrar">&times;</button>';
    
    let isDismissed = false;
    const dismiss = () => {
        if (isDismissed) return;
        isDismissed = true;
        toast.classList.remove('is-visible');
        setTimeout(() => toast.remove(), 260);
    };

    const closeBtn = toast.querySelector('.toast-close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dismiss();
        });
    }

    toast.addEventListener('click', dismiss);
    stack.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('is-visible'));
    setTimeout(dismiss, 3500);
}

// --- SOLUCIONADOR DE LA ECUACIÓN DE KEPLER (NEWTON-RAPHSON) ---
function solveKepler(M, e) {
    let E = M;
    for (let i = 0; i < 12; i++) {
        const f = E - e * Math.sin(E) - M;
        const fPrime = 1 - e * Math.cos(E);
        const dE = f / fPrime;
        E -= dE;
        if (Math.abs(dE) < 1e-6) break;
    }
    return E;
}

// Calcula la posición y velocidad 3D de un cuerpo según sus 6 parámetros keplerianos
function getKeplerianState(body, M) {
    const a = body.orbitRadius;
    const e = body.eccentricity !== undefined ? body.eccentricity : 0.0001;
    const inc = body.inclination || 0;
    const node = body.ascendingNode || 0;
    const peri = body.argPeriapsis || 0;

    const E = solveKepler(M, e);
    const nu = 2 * Math.atan2(Math.sqrt(1 + e) * Math.sin(E * 0.5), Math.sqrt(Math.max(0.0001, 1 - e)) * Math.cos(E * 0.5));
    const r = a * (1 - e * Math.cos(E));

    // Matrices de rotación 3D para vectores unitarios de plano orbital (P y Q)
    const cosN = Math.cos(node), sinN = Math.sin(node);
    const cosI = Math.cos(inc), sinI = Math.sin(inc);
    const cosP = Math.cos(peri), sinP = Math.sin(peri);

    const Px = cosN * cosP - sinN * sinP * cosI;
    const Py = sinP * sinI;
    const Pz = sinN * cosP + cosN * sinP * cosI;

    const Qx = -cosN * sinP - sinN * cosP * cosI;
    const Qy = cosP * sinI;
    const Qz = -sinN * sinP + cosN * cosP * cosI;

    // Coordenadas cartesianas
    const xOrb = r * Math.cos(nu);
    const zOrb = r * Math.sin(nu);

    const posX = xOrb * Px + zOrb * Qx;
    const posY = xOrb * Py + zOrb * Qy;
    const posZ = xOrb * Pz + zOrb * Qz;

    // Velocidad instantánea tangencial y radial según la constante de gravitación universal G
    const gScale = Math.max(0.01, G / 0.05);
    const mu = (body.isMoon ? 600.0 : 25000.0) * gScale;
    const p = a * Math.max(0.001, 1 - e * e);
    const h = Math.sqrt(mu * p);
    const vxOrb = -(mu / h) * Math.sin(nu);
    const vzOrb = (mu / h) * (e + Math.cos(nu));

    const velX = vxOrb * Px + vzOrb * Qx;
    const velY = vxOrb * Py + vzOrb * Qy;
    const velZ = vxOrb * Pz + vzOrb * Qz;

    return {
        pos: new THREE.Vector3(posX, posY, posZ),
        vel: new THREE.Vector3(velX, velY, velZ),
        r: r,
        nu: nu,
        trueSpeed: Math.sqrt(velX * velX + velY * velY + velZ * velZ)
    };
}

// Actualiza de forma físicamente realista los elementos keplerianos a partir del vector posición y nuevo vector velocidad (Astrodinámica)
function applyOrbitalImpulse(body, rVec, vNew) {
    if (!body || body.isStatic) return;

    const mu = body.isMoon ? 600.0 : 25000.0;
    const rx = rVec.x, ry = rVec.y, rz = rVec.z;
    const vx = vNew.x, vy = vNew.y, vz = vNew.z;

    const rMag = Math.sqrt(rx * rx + ry * ry + rz * rz) || 1e-4;
    const vSq = vx * vx + vy * vy + vz * vz;

    // Energía orbital específica: eps = v^2 / 2 - mu / r
    const eps = (vSq * 0.5) - (mu / rMag);
    let a;
    if (eps >= -1e-4) {
        // En caso de alcanzar velocidad de escape, mantenemos una elipse altamente elongada y estable para la simulación
        a = rMag * 2.5;
    } else {
        a = -mu / (2 * eps);
    }
    a = Math.max(65, Math.min(3000, a));

    // Momento angular específico: h = r x v
    const hx = ry * vz - rz * vy;
    const hy = rz * vx - rx * vz;
    const hz = rx * vy - ry * vx;
    const hMag = Math.sqrt(hx * hx + hy * hy + hz * hz) || 1e-4;

    // Vector unitario normal al plano orbital: W = h / |h|
    const Wx = hx / hMag, Wy = hy / hMag, Wz = hz / hMag;

    // En el marco orbital de Estelaris: Wy = -cos(inc)
    const inc = Math.acos(Math.max(-1, Math.min(1, -Wy)));

    // Longitud del nodo ascendente (Omega): Wx = -sin(N)sin(I), Wz = cos(N)sin(I)
    let node = body.ascendingNode || 0;
    const sinInc = Math.sin(inc);
    if (sinInc > 1e-4) {
        node = Math.atan2(-Wx, Wz);
        if (node < 0) node += Math.PI * 2;
    }

    // Vector de excentricidad (Laplace-Runge-Lenz): e_vec = (v x h)/mu - r/|r|
    const vxhx = vy * hz - vz * hy;
    const vxhy = vz * hx - vx * hz;
    const vxhz = vx * hy - vy * hx;

    let ex = vxhx / mu - rx / rMag;
    let ey = vxhy / mu - ry / rMag;
    let ez = vxhz / mu - rz / rMag;
    let e = Math.sqrt(ex * ex + ey * ey + ez * ez);

    // Limitar excentricidad máxima para que la órbita no colapse numéricamente
    e = Math.max(0.001, Math.min(0.85, e));

    // Vector unitario hacia el periapsis: P = e_vec / e
    const Px = ex / e, Py = ey / e, Pz = ez / e;

    const cosN = Math.cos(node), sinN = Math.sin(node);
    const cosPeri = Px * cosN + Pz * sinN;
    const sinPeri = sinInc > 1e-4 ? Py / sinInc : (Pz * cosN - Px * sinN);
    let peri = Math.atan2(sinPeri, cosPeri);
    if (peri < 0) peri += Math.PI * 2;

    // Vector unitario Q en el plano orbital perpendicular a P
    const cosI = Math.cos(inc), sinI = Math.sin(inc);
    const cosP = Math.cos(peri), sinP = Math.sin(peri);

    const Qx = -cosN * sinP - sinN * cosP * cosI;
    const Qy = cosP * sinI;
    const Qz = -sinN * sinP + cosN * cosP * cosI;

    // Proyecciones de r sobre P y Q para obtener la anomalía verdadera nu
    const rDotP = rx * Px + ry * Py + rz * Pz;
    const rDotQ = rx * Qx + ry * Qy + rz * Qz;
    const nu = Math.atan2(rDotQ, rDotP);

    // Anomalía excéntrica E y Anomalía media M
    const E = 2 * Math.atan2(Math.sqrt(Math.max(0, 1 - e)) * Math.sin(nu * 0.5), Math.sqrt(1 + e) * Math.cos(nu * 0.5));
    let M = E - e * Math.sin(E);
    M = ((M % (Math.PI * 2)) + (Math.PI * 2)) % (Math.PI * 2);
    if (isNaN(M)) M = 0;

    // Validación anti-NaN para proteger el bucle de renderizado y la cámara
    if (!isNaN(a)) body.orbitRadius = a;
    if (!isNaN(e)) body.eccentricity = e;
    if (!isNaN(inc)) body.inclination = inc;
    if (!isNaN(node)) body.ascendingNode = node;
    if (!isNaN(peri)) body.argPeriapsis = peri;
    body.currentM = M;

    // 3ra Ley de Kepler: reajuste de la velocidad angular orbital en función del nuevo semieje mayor
    if (body.baseOrbitalSpeed && body.baseOrbitRadius) {
        body.orbitalSpeed = body.baseOrbitalSpeed * Math.pow(body.baseOrbitRadius / a, 1.5);
    }

    return { a, e, inc, node, peri, M };
}

// --- TEXTURAS & SHADERS ---
const textureCache = {};
function loadTexture(url) {
    if (!url) return null;
    if (textureCache[url]) return textureCache[url];
    const loader = new THREE.TextureLoader();
    const tex = loader.load(url);
    tex.encoding = THREE.sRGBEncoding;
    tex.anisotropy = 8;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.generateMipmaps = true;
    textureCache[url] = tex;
    return tex;
}

function createRealisticRingTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let x = 0; x < canvas.width; x++) {
        const factor = x / canvas.width;
        let alpha = 0.85;
        if (factor > 0.42 && factor < 0.50) {
            alpha = 0.03;
        } else if (factor > 0.78 && factor < 0.82) {
            alpha = 0.09;
        } else if (factor < 0.04 || factor > 0.97) {
            alpha = 0.0;
        } else {
            alpha = 0.48 + Math.sin(factor * 450) * 0.22 + Math.sin(factor * 160) * 0.14 + Math.random() * 0.1;
        }

        const hue = 32 + Math.sin(factor * 50) * 6;
        const sat = 36 + Math.random() * 12;
        const light = 76 + Math.sin(factor * 80) * 8;
        ctx.strokeStyle = 'hsla(' + hue + ', ' + sat + '%, ' + light + '%, ' + alpha + ')';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    return texture;
}

const sunVertexShader = `
    varying vec2 vUv;
    varying float vFresnel;
    void main() {
        vUv = uv;
        vec3 vNormal = normalize(normalMatrix * normal);
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vec3 viewDir = normalize(-mvPosition.xyz);
        float dotNV = clamp(dot(viewDir, vNormal), 0.0, 1.0);
        vFresnel = pow(1.0 - dotNV, 1.4);
        gl_Position = projectionMatrix * mvPosition;
    }
`;

const sunFragmentShader = `
    uniform sampler2D uTexture;
    varying vec2 vUv;
    varying float vFresnel;
    void main() {
        vec3 tex = texture2D(uTexture, vUv).rgb;
        vec3 surfaceColor = tex * vec3(1.25, 1.08, 0.85);
        vec3 rimColor = vec3(1.0, 0.96, 0.55);
        vec3 brightCore = vec3(1.0, 1.0, 0.9);
        vec3 finalColor = mix(surfaceColor, rimColor, vFresnel * 0.85);
        finalColor += brightCore * pow(vFresnel, 2.8) * 0.7;
        gl_FragColor = vec4(finalColor, 1.0);
    }
`;

const planetVertexShader = `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vWorldNormal;
    varying vec3 vWorldPosition;
    void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPos.xyz;
        vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const planetFragmentShader = `
    uniform sampler2D uMap;
    uniform float uSunIntensity;
    varying vec2 vUv;
    varying vec3 vWorldNormal;
    varying vec3 vWorldPosition;
    void main() {
        vec3 tex = texture2D(uMap, vUv).rgb;
        vec3 lightToSun = normalize(-vWorldPosition);
        float NdotL = dot(vWorldNormal, lightToSun);
        float dayLight = smoothstep(-0.25, 0.35, NdotL);
        float sunFactor = clamp(uSunIntensity, 0.0, 1.0);
        vec3 ambient = tex * (0.008 + 0.062 * sunFactor);
        vec3 diffuse = tex * (dayLight * 0.95 * sunFactor);
        gl_FragColor = vec4(ambient + diffuse, 1.0);
    }
`;

const ringVertexShader = `
    varying vec2 vUv;
    varying vec3 vWorldPosition;
    void main() {
        vUv = uv;
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPos.xyz;
        gl_Position = projectionMatrix * viewMatrix * worldPos;
    }
`;

const ringFragmentShader = `
    uniform sampler2D uRingTexture;
    uniform vec3 uPlanetWorldPos;
    uniform float uPlanetRadius;
    uniform float uSunIntensity;
    varying vec2 vUv;
    varying vec3 vWorldPosition;

    void main() {
        vec4 texColor = texture2D(uRingTexture, vUv);
        if (texColor.a < 0.02) discard;

        float sunFactor = clamp(uSunIntensity, 0.0, 1.0);
        vec3 toSun = normalize(-uPlanetWorldPos);
        vec3 toRing = vWorldPosition - uPlanetWorldPos;
        float proj = dot(toRing, -toSun);

        float shadowFactor = 1.0;
        if (proj > 0.0) {
            vec3 perp = toRing - (-toSun * proj);
            float distFromCenter = length(perp);
            if (distFromCenter < uPlanetRadius * 1.02) {
                shadowFactor = smoothstep(uPlanetRadius * 0.95, uPlanetRadius * 1.05, distFromCenter) * 0.85 + 0.15;
            }
        }

        float NdotL = max(0.2, abs(normalize(-vWorldPosition).y));
        vec3 finalRgb = texColor.rgb * shadowFactor * (0.8 + 0.2 * NdotL) * (0.01 + 0.99 * sunFactor);
        gl_FragColor = vec4(finalRgb, texColor.a * (0.05 + 0.95 * sunFactor));
    }
`;

const atmosphereVertexShader = `
    varying vec3 vNormal;
    varying vec3 vWorldNormal;
    varying vec3 vWorldPosition;
    varying vec3 vViewDir;
    varying float vFresnel;
    void main() {
        vNormal = normalize(normalMatrix * normal);
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPos.xyz;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vViewDir = normalize(-mvPosition.xyz);
        vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
        float dotNV = clamp(dot(vViewDir, vNormal), 0.0, 1.0);
        vFresnel = pow(1.0 - dotNV, 2.6);
        gl_Position = projectionMatrix * mvPosition;
    }
`;

const atmosphereFragmentShader = `
    uniform vec3 uAtmosphereColor;
    uniform float uIntensity;
    uniform float uSunIntensity;
    varying vec3 vWorldNormal;
    varying vec3 vWorldPosition;
    varying float vFresnel;
    void main() {
        vec3 lightToSun = normalize(-vWorldPosition);
        float NdotL = dot(vWorldNormal, lightToSun);
        float sunLit = smoothstep(-0.2, 0.4, NdotL);
        float sunFactor = clamp(uSunIntensity, 0.0, 1.0);
        float alpha = vFresnel * (uIntensity * 0.55) * sunLit * sunFactor;
        gl_FragColor = vec4(uAtmosphereColor, alpha);
    }
`;

const orbitVertexShader = `
    attribute float aProgress;
    varying float vProgress;
    void main() {
        vProgress = aProgress;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const orbitFragmentShader = `
    uniform float uDrawProgress;
    uniform float uDashPhase;
    uniform vec3 uColor;
    uniform float uBaseOpacity;
    uniform float uIsTransitioning;

    varying float vProgress;

    void main() {
        if (vProgress > uDrawProgress) discard;

        // Frecuencia del patrón de guiones punteados (- - - -)
        float dashPattern = sin(vProgress * 150.0 - uDashPhase * 10.0);

        // Factor de relleno que convierte el punteado en línea continua sólida (------)
        float fillFactor = smoothstep(0.0, 0.45, uDrawProgress - (1.0 - vProgress) * 0.45);

        if (uIsTransitioning > 0.5) {
            // Durante la transición, la parte frontal es punteada (- - - -) y se va rellenando en sólida (------)
            if (fillFactor < 0.75 && dashPattern < 0.0) {
                discard;
            }
            // Puntero brillante incandescente en el frente de trazado
            float tipDist = abs(vProgress - uDrawProgress);
            float tipGlow = exp(-tipDist * 45.0) * 3.5;
            vec3 finalColor = mix(uColor, vec3(1.0, 1.0, 1.0), min(1.0, tipGlow * 0.5));
            gl_FragColor = vec4(finalColor * (1.0 + tipGlow), uBaseOpacity * 1.6);
        } else {
            gl_FragColor = vec4(uColor, uBaseOpacity);
        }
    }
`;

// --- DATOS ASTRONÓMICOS ---
const planetData = [
    {
        name: 'Mercurio',
        texture: 'assets/textures/mercury_tex.jpg',
        radius: 3.8,
        orbitRadius: 190,
        eccentricity: 0.2056,
        inclination: 0.122,
        ascendingNode: 0.84,
        argPeriapsis: 0.51,
        meanAnomaly: 0.2,
        orbitalSpeed: 0.024,
        mass: 0.15,
        realRadius: '4,879',
        type: 'Planeta rocoso',
        hasAtmosphere: false,
        axialTilt: 0.034,
        rotationPeriod: 58.6
    },
    {
        name: 'Venus',
        texture: 'assets/textures/venus_tex.jpg',
        radius: 8.2,
        orbitRadius: 285,
        eccentricity: 0.0067,
        inclination: 0.059,
        ascendingNode: 1.33,
        argPeriapsis: 0.95,
        meanAnomaly: 1.1,
        orbitalSpeed: 0.015,
        mass: 0.52,
        realRadius: '12,104',
        type: 'Planeta terrestre',
        hasAtmosphere: true,
        atmosphereIntensity: 0.65,
        glowColor: '#e0c070',
        axialTilt: 3.09,
        rotationPeriod: -243.0
    },
    {
        name: 'Tierra',
        texture: 'assets/textures/earth_tex.jpg',
        radius: 8.8,
        orbitRadius: 395,
        eccentricity: 0.0167,
        inclination: 0.000,
        ascendingNode: 0.0,
        argPeriapsis: 1.78,
        meanAnomaly: 2.2,
        orbitalSpeed: 0.011,
        mass: 0.65,
        realRadius: '12,742',
        type: 'Planeta habitado',
        hasAtmosphere: true,
        atmosphereIntensity: 0.8,
        glowColor: '#4aa3df',
        axialTilt: 0.409,
        rotationPeriod: 1.0
    },
    {
        name: 'Marte',
        texture: 'assets/textures/mars_tex.jpg',
        radius: 5.2,
        orbitRadius: 530,
        eccentricity: 0.0934,
        inclination: 0.032,
        ascendingNode: 0.86,
        argPeriapsis: 5.0,
        meanAnomaly: 0.7,
        orbitalSpeed: 0.008,
        mass: 0.35,
        realRadius: '6,779',
        type: 'Planeta desértico',
        hasAtmosphere: true,
        atmosphereIntensity: 0.35,
        glowColor: '#df6a2a',
        axialTilt: 0.44,
        rotationPeriod: 1.03
    },
    {
        name: 'Júpiter',
        texture: 'assets/textures/jupiter_tex.jpg',
        radius: 30.0,
        orbitRadius: 1220,
        eccentricity: 0.0489,
        inclination: 0.023,
        ascendingNode: 1.75,
        argPeriapsis: 4.77,
        meanAnomaly: 3.5,
        orbitalSpeed: 0.0035,
        mass: 8.0,
        realRadius: '139,820',
        type: 'Gigante gaseoso',
        hasAtmosphere: true,
        atmosphereIntensity: 0.45,
        glowColor: '#edd3b2',
        axialTilt: 0.054,
        rotationPeriod: 0.41
    },
    {
        name: 'Saturno',
        texture: 'assets/textures/saturn_tex.png',
        ringTexture: 'assets/textures/saturn_rings_tex.png',
        radius: 24.0,
        ringInner: 28.0,
        ringOuter: 58.0,
        orbitRadius: 1880,
        eccentricity: 0.0565,
        inclination: 0.043,
        ascendingNode: 1.98,
        argPeriapsis: 5.86,
        meanAnomaly: 4.8,
        orbitalSpeed: 0.0018,
        mass: 6.0,
        realRadius: '116,460',
        type: 'Gigante anillado',
        hasAtmosphere: true,
        atmosphereIntensity: 0.4,
        glowColor: '#f5ebd3',
        ring: true,
        axialTilt: 0.466,
        rotationPeriod: 0.44
    },
    {
        name: 'Urano',
        texture: 'assets/textures/uranus_tex.png',
        ringTexture: 'assets/textures/uranus_rings_tex.png',
        radius: 15.0,
        ringInner: 19.0,
        ringOuter: 32.0,
        orbitRadius: 2650,
        eccentricity: 0.0463,
        inclination: 0.013,
        ascendingNode: 1.29,
        argPeriapsis: 1.7,
        meanAnomaly: 5.4,
        orbitalSpeed: 0.0008,
        mass: 3.5,
        realRadius: '50,724',
        type: 'Gigante de hielo',
        hasAtmosphere: true,
        atmosphereIntensity: 0.5,
        glowColor: '#a8f0f2',
        ring: 'uranus',
        axialTilt: 1.706,
        rotationPeriod: -0.72
    },
    {
        name: 'Neptuno',
        texture: 'assets/textures/neptune_tex.jpg',
        radius: 14.5,
        orbitRadius: 3450,
        eccentricity: 0.0095,
        inclination: 0.031,
        ascendingNode: 2.3,
        argPeriapsis: 4.77,
        meanAnomaly: 1.9,
        orbitalSpeed: 0.0004,
        mass: 3.8,
        realRadius: '49,244',
        type: 'Gigante helado',
        hasAtmosphere: true,
        atmosphereIntensity: 0.55,
        glowColor: '#4f88ff',
        axialTilt: 0.494,
        rotationPeriod: 0.67
    },
    {
        name: 'Plutón',
        texture: 'assets/textures/pluto_tex.jpg',
        radius: 2.8,
        orbitRadius: 4150,
        eccentricity: 0.2444,
        inclination: 0.299,
        ascendingNode: 1.92,
        argPeriapsis: 1.98,
        meanAnomaly: 0.4,
        orbitalSpeed: 0.00025,
        mass: 0.08,
        realRadius: '2,376',
        type: 'Planeta enano',
        hasAtmosphere: false,
        axialTilt: 2.05,
        rotationPeriod: -6.39
    }
];

const moonsData = [
    {
        name: 'Luna',
        parentName: 'Tierra',
        texture: 'assets/textures/moon_tex.jpg',
        radius: 2.5,
        orbitRadius: 24.0,
        eccentricity: 0.0549,
        inclination: 0.089,
        orbitalSpeed: 0.045,
        mass: 0.06,
        realRadius: '3,474',
        type: 'Satélite natural',
        colorHex: '#cbd5e1'
    },
    {
        name: 'Ío',
        parentName: 'Júpiter',
        radius: 2.6,
        orbitRadius: 48.0,
        eccentricity: 0.0041,
        inclination: 0.04,
        orbitalSpeed: 0.065,
        mass: 0.07,
        realRadius: '3,643',
        type: 'Satélite volcánico',
        colorHex: '#eab308'
    },
    {
        name: 'Europa',
        parentName: 'Júpiter',
        radius: 2.3,
        orbitRadius: 66.0,
        eccentricity: 0.009,
        inclination: 0.03,
        orbitalSpeed: 0.046,
        mass: 0.05,
        realRadius: '3,122',
        type: 'Satélite oceánico',
        colorHex: '#e2e8f0'
    },
    {
        name: 'Ganímedes',
        parentName: 'Júpiter',
        radius: 3.9,
        orbitRadius: 90.0,
        eccentricity: 0.0013,
        inclination: 0.02,
        orbitalSpeed: 0.032,
        mass: 0.12,
        realRadius: '5,268',
        type: 'Satélite gigante',
        colorHex: '#94a3b8'
    },
    {
        name: 'Calisto',
        parentName: 'Júpiter',
        radius: 3.5,
        orbitRadius: 120.0,
        eccentricity: 0.0074,
        inclination: 0.035,
        orbitalSpeed: 0.020,
        mass: 0.09,
        realRadius: '4,821',
        type: 'Satélite craterizado',
        colorHex: '#64748b'
    },
    {
        name: 'Titán',
        parentName: 'Saturno',
        radius: 3.8,
        orbitRadius: 95.0,
        eccentricity: 0.0288,
        inclination: 0.06,
        orbitalSpeed: 0.026,
        mass: 0.11,
        realRadius: '5,149',
        type: 'Satélite con atmósfera',
        colorHex: '#f97316'
    },
    {
        name: 'Encélado',
        parentName: 'Saturno',
        radius: 1.6,
        orbitRadius: 42.0,
        eccentricity: 0.0047,
        inclination: 0.01,
        orbitalSpeed: 0.058,
        mass: 0.02,
        realRadius: '504',
        type: 'Satélite criovolcánico',
        colorHex: '#38bdf8'
    },
    {
        name: 'Tritón',
        parentName: 'Neptuno',
        radius: 2.4,
        orbitRadius: 46.0,
        eccentricity: 0.0001,
        inclination: 2.74,
        orbitalSpeed: -0.042,
        mass: 0.04,
        realRadius: '2,706',
        type: 'Satélite retrógrado',
        colorHex: '#7dd3fc'
    },
    {
        name: 'Caronte',
        parentName: 'Plutón',
        radius: 1.5,
        orbitRadius: 14.0,
        eccentricity: 0.0002,
        inclination: 0.05,
        orbitalSpeed: 0.055,
        mass: 0.02,
        realRadius: '1,212',
        type: 'Sistema binario',
        colorHex: '#a8a29e'
    }
];

// --- INICIALIZACIÓN DE THREE.JS ---
function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020308);
    scene.fog = new THREE.FogExp2(0x020308, 0.00015);

    const isMobileInit = window.innerWidth < 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const initialFov = isMobileInit && window.innerHeight > window.innerWidth ? 72 : 60;
    camera = new THREE.PerspectiveCamera(initialFov, window.innerWidth / window.innerHeight, 0.5, 45000);
    camera.position.set(0, 1100, 1800);

    renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(window.innerWidth, window.innerHeight);
    const initialMaxPixelRatio = isMobileInit ? 1.25 : 1.5;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, initialMaxPixelRatio));
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 45000;
    controls.minDistance = 4;
    controls.touches = {
        ONE: THREE.TOUCH.ROTATE,
        TWO: THREE.TOUCH.DOLLY_PAN
    };
    initialCameraPos = camera.position.clone();
    initialControlsTarget = controls.target.clone();

    controls.addEventListener('start', () => {
        // Solo cancelar transición si ya avanzó más del 20% y el usuario está arrastrando manualmente en 3D
        if (isTransitioningToFocus && transitionProgress > 0.2) {
            isTransitioningToFocus = false;
            camera.fov = baseCameraFov;
            camera.updateProjectionMatrix();
            updateLateralWarp(0.016, 0.0);
        }
        if (isTransitioningBack) {
            isTransitioningBack = false;
        }
    });

    // Iluminación
    ambientLight = new THREE.AmbientLight(0x282c3f, 0.9);
    scene.add(ambientLight);

    sunLight = new THREE.PointLight(0xffffff, 2.4, 45000, 0.45);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);

    // Fondo Estelar Espectral Multicapa
    createSpectacularStarfield();
    createMilkyWayGalaxy();
    createCosmicNebulae();

    // Cuadrícula Galáctica
    gridHelper = new THREE.GridHelper(6000, 100, 0x00f2fe, 0x161b2e);
    gridHelper.position.y = -10;
    gridHelper.material.opacity = 0.14;
    gridHelper.material.transparent = true;
    gridHelper.visible = false;
    scene.add(gridHelper);

    // Sistema Solar Kepleriano
    buildKeplerianSolarSystem();
    createAsteroidBelt();
    createKuiperBelt();

    // Retícula y Vectores 3D
    createSelectionReticle();
    createStateVectorArrows();

    // Viento Espacial Lateral
    initLateralWarpCanvas();

    // Eventos de usuario
    window.addEventListener('resize', onWindowResize);
    window.addEventListener('pointerdown', (e) => {
        touchDragStartX = e.clientX;
        touchDragStartY = e.clientY;
        touchDragStartTime = performance.now();
    }, { passive: true });
    window.addEventListener('pointerup', onScenePointerUp);
    window.addEventListener('click', onSceneClick);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('keydown', onKeyDown);

    setupUIEventListeners();
    updateBodyCount();
}

// --- FONDO ESTELAR ESPECTRAL MULTICAPA ---
function createSpectacularStarfield() {
    const starCount = 9000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);

    const spectralColors = [
        new THREE.Color(0x9db4ff),
        new THREE.Color(0xf8f9fa),
        new THREE.Color(0xfffae6),
        new THREE.Color(0xfff4b8),
        new THREE.Color(0xffb86c),
        new THREE.Color(0xff6b6b)
    ];

    for (let i = 0; i < starCount; i++) {
        const r = 8000 + Math.random() * 12000;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);

        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);

        const rand = Math.random();
        let col;
        if (rand < 0.08) col = spectralColors[0];
        else if (rand < 0.25) col = spectralColors[1];
        else if (rand < 0.50) col = spectralColors[2];
        else if (rand < 0.78) col = spectralColors[3];
        else if (rand < 0.93) col = spectralColors[4];
        else col = spectralColors[5];

        const brightness = 0.5 + Math.random() * 0.5;
        colors[i * 3] = col.r * brightness;
        colors[i * 3 + 1] = col.g * brightness;
        colors[i * 3 + 2] = col.b * brightness;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.3, 'rgba(255, 255, 255, 0.75)');
    grad.addColorStop(0.7, 'rgba(255, 255, 255, 0.15)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 32, 32);
    const starTex = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
        size: 2.2,
        map: starTex,
        vertexColors: true,
        transparent: true,
        opacity: 0.95,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    starfieldPoints = new THREE.Points(geometry, material);
    scene.add(starfieldPoints);
}

function createMilkyWayGalaxy() {
    const count = 7000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const galacticAngle = Math.PI / 4.2;
    const cosG = Math.cos(galacticAngle);
    const sinG = Math.sin(galacticAngle);

    for (let i = 0; i < count; i++) {
        const theta = (Math.random() - 0.5) * Math.PI * 2;
        const dist = 9000 + (Math.random() - 0.5) * 3000;
        const spread = (Math.random() - 0.5) * 1400 * Math.exp(-Math.abs(theta) * 0.3);
        const thick = (Math.random() - 0.5) * 600;

        let gx = Math.cos(theta) * dist;
        let gy = thick;
        let gz = Math.sin(theta) * dist + spread;

        positions[i * 3] = gx;
        positions[i * 3 + 1] = gy * cosG - gz * sinG;
        positions[i * 3 + 2] = gy * sinG + gz * cosG;

        const isCore = Math.abs(theta) < 0.6;
        if (isCore) {
            colors[i * 3] = 0.95 + Math.random() * 0.05;
            colors[i * 3 + 1] = 0.75 + Math.random() * 0.2;
            colors[i * 3 + 2] = 0.85 + Math.random() * 0.15;
        } else {
            colors[i * 3] = 0.55 + Math.random() * 0.3;
            colors[i * 3 + 1] = 0.7 + Math.random() * 0.3;
            colors[i * 3 + 2] = 1.0;
        }
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
        size: 3.5,
        vertexColors: true,
        transparent: true,
        opacity: 0.65,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    milkyWayPoints = new THREE.Points(geometry, mat);
    scene.add(milkyWayPoints);
}

function createCosmicNebulae() {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    grad.addColorStop(0, 'rgba(255, 255, 255, 0.65)');
    grad.addColorStop(0.35, 'rgba(180, 100, 255, 0.35)');
    grad.addColorStop(0.7, 'rgba(56, 189, 248, 0.12)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);
    const nebTexture = new THREE.CanvasTexture(canvas);

    const colors = [0x7928ca, 0x0070f3, 0xff0080, 0x00dfd8, 0xf5a623];
    
    for (let i = 0; i < 8; i++) {
        const size = 3200 + Math.random() * 2000;
        const geom = new THREE.PlaneGeometry(size, size);
        const mat = new THREE.MeshBasicMaterial({
            color: colors[i % colors.length],
            map: nebTexture,
            transparent: true,
            opacity: 0.22,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            side: THREE.DoubleSide
        });
        
        const mesh = new THREE.Mesh(geom, mat);
        const angle = (i / 8) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
        const r = 8500 + Math.random() * 2000;
        mesh.position.set(Math.cos(angle) * r, (Math.random() - 0.5) * 1800, Math.sin(angle) * r);
        mesh.lookAt(0, 0, 0);
        
        scene.add(mesh);
        cosmicNebulaMeshes.push(mesh);
    }
}

function createAsteroidBelt() {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(asteroidBeltCount * 3);
    const colors = new Float32Array(asteroidBeltCount * 3);

    const rMin = 680;
    const rMax = 1020;

    for (let i = 0; i < asteroidBeltCount; i++) {
        const r = rMin + Math.random() * (rMax - rMin);
        const angle = Math.random() * Math.PI * 2;
        const y = (Math.random() - 0.5) * 14;

        positions[i * 3] = Math.cos(angle) * r;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = Math.sin(angle) * r;

        const colorVal = 0.55 + Math.random() * 0.3;
        colors[i * 3] = colorVal;
        colors[i * 3 + 1] = colorVal - 0.03;
        colors[i * 3 + 2] = colorVal - 0.06;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 1.9,
        vertexColors: true,
        transparent: true,
        opacity: 0.85
    });

    asteroidBeltParticles = new THREE.Points(geometry, material);
    scene.add(asteroidBeltParticles);
}

function createKuiperBelt() {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(kuiperBeltCount * 3);
    const colors = new Float32Array(kuiperBeltCount * 3);

    const rMin = 3900;
    const rMax = 5800;

    for (let i = 0; i < kuiperBeltCount; i++) {
        const r = rMin + Math.random() * (rMax - rMin);
        const angle = Math.random() * Math.PI * 2;
        const y = (Math.random() - 0.5) * 45;

        positions[i * 3] = Math.cos(angle) * r;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = Math.sin(angle) * r;

        colors[i * 3] = 0.7 + Math.random() * 0.25;
        colors[i * 3 + 1] = 0.8 + Math.random() * 0.2;
        colors[i * 3 + 2] = 0.95;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 2.1,
        vertexColors: true,
        transparent: true,
        opacity: 0.75
    });

    kuiperBeltParticles = new THREE.Points(geometry, material);
    scene.add(kuiperBeltParticles);
}

// --- CONSTRUCCIÓN DEL SISTEMA SOLAR KEPLERIANO ---
function buildKeplerianSolarSystem() {
    bodies = [];

    // 1. SOL
    const sunTex = loadTexture('assets/textures/sun_tex.jpg');
    const sunGeo = new THREE.SphereGeometry(62, 48, 48);
    const sunMat = new THREE.ShaderMaterial({
        uniforms: { uTexture: { value: sunTex } },
        vertexShader: sunVertexShader,
        fragmentShader: sunFragmentShader
    });
    const sunMesh = new THREE.Mesh(sunGeo, sunMat);

    const coronaGeo = new THREE.SphereGeometry(72, 32, 32);
    const coronaMat = new THREE.MeshBasicMaterial({
        color: 0xffaa33,
        transparent: true,
        opacity: 0.18,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending
    });
    const coronaMesh = new THREE.Mesh(coronaGeo, coronaMat);
    sunMesh.add(coronaMesh);
    scene.add(sunMesh);

    const sunBody = {
        name: 'Sol',
        mesh: sunMesh,
        coronaMesh: coronaMesh,
        radius: 62,
        baseRadius: 62,
        radiusScale: 1.0,
        orbitRadius: 0,
        mass: 50.0,
        baseMass: 50.0,
        massScale: 1.0,
        realRadius: '1,392,700',
        type: 'Estrella enana amarilla (G2V)',
        isStatic: true,
        eccentricity: 0,
        inclination: 0,
        velocity: new THREE.Vector3(),
        destroyed: false,
        isNBody: false
    };
    sunMesh.userData = { body: sunBody };
    coronaMesh.userData = { body: sunBody };
    bodies.push(sunBody);

    // 2. PLANETAS
    planetData.forEach(p => {
        const tex = loadTexture(p.texture);
        const geo = new THREE.SphereGeometry(p.radius, 40, 40);
        const mat = new THREE.ShaderMaterial({
            uniforms: {
                uMap: { value: tex },
                uSunIntensity: { value: 1.0 }
            },
            vertexShader: planetVertexShader,
            fragmentShader: planetFragmentShader
        });

        const mesh = new THREE.Mesh(geo, mat);
        mesh.castShadow = true;

        if (p.axialTilt) {
            mesh.rotation.z = p.axialTilt;
        }

        let atmoMesh = null;
        if (p.hasAtmosphere) {
            const atmoGeo = new THREE.SphereGeometry(p.radius * 1.08, 36, 36);
            const atmoMat = new THREE.ShaderMaterial({
                uniforms: {
                    uAtmosphereColor: { value: new THREE.Color(p.glowColor || 0x4aa3df) },
                    uIntensity: { value: p.atmosphereIntensity || 0.6 },
                    uSunIntensity: { value: 1.0 }
                },
                vertexShader: atmosphereVertexShader,
                fragmentShader: atmosphereFragmentShader,
                transparent: true,
                blending: THREE.AdditiveBlending,
                depthWrite: false,
                side: THREE.BackSide
            });
            atmoMesh = new THREE.Mesh(atmoGeo, atmoMat);
            mesh.add(atmoMesh);
        }

        let ringMesh = null;
        if (p.ring) {
            const ringGeo = createCustomRingGeometry(p.ringInner, p.ringOuter, 96);
            const ringTex = loadTexture(p.ringTexture) || createRealisticRingTexture();
            const ringMat = new THREE.ShaderMaterial({
                uniforms: {
                    uRingTexture: { value: ringTex },
                    uPlanetWorldPos: { value: new THREE.Vector3() },
                    uPlanetRadius: { value: p.radius },
                    uSunIntensity: { value: 1.0 }
                },
                vertexShader: ringVertexShader,
                fragmentShader: ringFragmentShader,
                side: THREE.DoubleSide,
                transparent: true,
                depthWrite: false
            });

            ringMesh = new THREE.Mesh(ringGeo, ringMat);
            ringMesh.rotation.x = Math.PI / 2;
            if (p.ring === 'uranus') {
                ringMesh.rotation.y = Math.PI / 2.2;
            }
            mesh.add(ringMesh);
        }

        const orbitLine = createKeplerianOrbitLine(p, 0x475569);
        scene.add(orbitLine);
        scene.add(mesh);

        const bodyObj = {
            ...p,
            mesh: mesh,
            atmoMesh: atmoMesh,
            ringMesh: ringMesh,
            orbitLine: orbitLine,
            isPlanet: true,
            baseRadius: p.radius,
            radiusScale: 1.0,
            baseMass: p.mass,
            massScale: 1.0,
            baseOrbitRadius: p.orbitRadius,
            baseEccentricity: p.eccentricity !== undefined ? p.eccentricity : 0.0167,
            baseInclination: p.inclination || 0,
            baseArgPeriapsis: p.argPeriapsis || 0,
            baseAscendingNode: p.ascendingNode || 0,
            baseOrbitalSpeed: p.orbitalSpeed,
            velocity: new THREE.Vector3(),
            destroyed: false,
            isNBody: false,
            currentM: p.meanAnomaly || 0
        };

        mesh.userData = { body: bodyObj };
        bodies.push(bodyObj);
    });

    // 3. LUNAS MAYORES
    moonsData.forEach(m => {
        const parent = bodies.find(b => b.name === m.parentName);
        if (!parent) return;

        const geo = new THREE.SphereGeometry(m.radius, 24, 24);
        let mat;
        if (m.texture) {
            const tex = loadTexture(m.texture);
            mat = new THREE.ShaderMaterial({
                uniforms: {
                    uMap: { value: tex },
                    uSunIntensity: { value: 1.0 }
                },
                vertexShader: planetVertexShader,
                fragmentShader: planetFragmentShader
            });
        } else {
            mat = new THREE.MeshStandardMaterial({
                color: new THREE.Color(m.colorHex || 0xcccccc),
                roughness: 0.95,
                metalness: 0.05
            });
        }

        const mesh = new THREE.Mesh(geo, mat);
        const orbitLine = createKeplerianOrbitLine(m, 0x334155);
        scene.add(orbitLine);
        scene.add(mesh);

        const moonObj = {
            ...m,
            mesh: mesh,
            parentBody: parent,
            orbitLine: orbitLine,
            isMoon: true,
            baseRadius: m.radius,
            radiusScale: 1.0,
            baseMass: m.mass || 0.08,
            massScale: 1.0,
            baseOrbitRadius: m.orbitRadius,
            baseEccentricity: m.eccentricity !== undefined ? m.eccentricity : 0.05,
            baseInclination: m.inclination || 0,
            baseArgPeriapsis: m.argPeriapsis || 0,
            baseAscendingNode: m.ascendingNode || 0,
            baseOrbitalSpeed: m.orbitalSpeed,
            velocity: new THREE.Vector3(),
            destroyed: false,
            isNBody: false,
            currentM: Math.random() * Math.PI * 2
        };

        mesh.userData = { body: moonObj };
        bodies.push(moonObj);
    });

    createHabitableZoneMesh();
    createGravityFieldMesh();
    renderCelestialDock();
}

function createCustomRingGeometry(innerRadius, outerRadius, thetaSegments = 96) {
    const geometry = new THREE.RingGeometry(innerRadius, outerRadius, thetaSegments);
    const pos = geometry.attributes.position;
    const uvs = geometry.attributes.uv;
    
    for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        const distance = Math.sqrt(x * x + y * y);
        const u = (distance - innerRadius) / (outerRadius - innerRadius);
        uvs.setXY(i, u, 0.5);
    }
    return geometry;
}

let activeOrbitTransitions = [];

function createKeplerianOrbitLine(body, colorHex = 0x475569) {
    const points = [];
    const progresses = [];
    const segments = 220;

    for (let i = 0; i <= segments; i++) {
        const M = (i / segments) * Math.PI * 2;
        const state = getKeplerianState(body, M);
        points.push(state.pos.x, state.pos.y, state.pos.z);
        progresses.push(i / segments);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
    geometry.setAttribute('aProgress', new THREE.Float32BufferAttribute(progresses, 1));

    const color = new THREE.Color(colorHex);
    const material = new THREE.ShaderMaterial({
        uniforms: {
            uDrawProgress: { value: 1.0 },
            uDashPhase: { value: 0.0 },
            uColor: { value: color },
            uBaseOpacity: { value: body.isMoon ? 0.35 : 0.50 },
            uIsTransitioning: { value: 0.0 }
        },
        vertexShader: orbitVertexShader,
        fragmentShader: orbitFragmentShader,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    const line = new THREE.Line(geometry, material);
    line.visible = orbitsVisible;
    return line;
}

function recalculateAndAnimateOrbit(body, highlightColor = 0x8ea8ff) {
    if (!body || body.isStatic) return;

    const points = [];
    const progresses = [];
    const segments = 220;

    for (let i = 0; i <= segments; i++) {
        const M = (i / segments) * Math.PI * 2;
        const state = getKeplerianState(body, M);
        points.push(state.pos.x, state.pos.y, state.pos.z);
        progresses.push(i / segments);
    }

    if (body.orbitLine && body.orbitLine.geometry && body.orbitLine.material && body.orbitLine.material.uniforms) {
        body.orbitLine.geometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
        body.orbitLine.geometry.setAttribute('aProgress', new THREE.Float32BufferAttribute(progresses, 1));
        body.orbitLine.geometry.attributes.position.needsUpdate = true;
        body.orbitLine.geometry.attributes.aProgress.needsUpdate = true;

        const mat = body.orbitLine.material;
        mat.uniforms.uColor.value = new THREE.Color(highlightColor);
        mat.uniforms.uDrawProgress.value = 0.0;
        mat.uniforms.uIsTransitioning.value = 1.0;

        activeOrbitTransitions = activeOrbitTransitions.filter(t => t.body !== body);
        activeOrbitTransitions.push({
            body: body,
            material: mat,
            progress: 0.0,
            duration: 1.6,
            baseColor: new THREE.Color(body.isMoon ? 0x334155 : 0x475569)
        });

        logToConsole(`Órbita de ${body.name} recalculada: e=${(body.eccentricity || 0).toFixed(3)}, r=${(body.orbitRadius || 0).toFixed(0)} AU`, 'action');
    }
}

// --- VECTORES DE ESTADO 3D ---
function createStateVectorArrows() {
    const dirV = new THREE.Vector3(1, 0, 0);
    const dirG = new THREE.Vector3(0, 0, 1);
    
    velocityArrow = new THREE.ArrowHelper(dirV, new THREE.Vector3(), 30, 0x00f2fe, 8, 4);
    gravityArrow = new THREE.ArrowHelper(dirG, new THREE.Vector3(), 30, 0xec4899, 8, 4);
    
    velocityArrow.visible = false;
    gravityArrow.visible = false;
    
    scene.add(velocityArrow);
    scene.add(gravityArrow);
}

function updateStateVectors(body, state) {
    if (!vectorsVisible || !body || body.isStatic) {
        if (velocityArrow) velocityArrow.visible = false;
        if (gravityArrow) gravityArrow.visible = false;
        return;
    }

    const worldPos = new THREE.Vector3();
    body.mesh.getWorldPosition(worldPos);

    const vel = state.vel.clone();
    const speed = vel.length();
    if (speed > 0.0001) {
        velocityArrow.position.copy(worldPos);
        velocityArrow.setDirection(vel.normalize());
        velocityArrow.setLength(Math.min(120, Math.max(18, speed * 2.2)), 6, 3);
        velocityArrow.visible = true;
    } else {
        velocityArrow.visible = false;
    }

    let centerPos = new THREE.Vector3(0, 0, 0);
    if (body.isMoon && body.parentBody) {
        body.parentBody.mesh.getWorldPosition(centerPos);
    }
    const gravDir = new THREE.Vector3().subVectors(centerPos, worldPos);
    const distSq = Math.max(10, gravDir.lengthSq());
    if (distSq > 1) {
        gravityArrow.position.copy(worldPos);
        gravityArrow.setDirection(gravDir.normalize());
        const gMag = Math.min(110, Math.max(16, (G * 80000) / distSq));
        gravityArrow.setLength(gMag, 6, 3);
        gravityArrow.visible = true;
    } else {
        gravityArrow.visible = false;
    }
}

function createSelectionReticle() {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, 128, 128);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.shadowBlur = 8;
    ctx.shadowColor = '#8ea8ff';

    const c = 64, r = 54, arc = Math.PI * 0.22;
    for (let i = 0; i < 4; i++) {
        const base = i * (Math.PI / 2);
        ctx.beginPath();
        ctx.arc(c, c, r, base - arc, base + arc);
        ctx.stroke();
    }

    const reticleTex = new THREE.CanvasTexture(canvas);
    const reticleMat = new THREE.SpriteMaterial({
        map: reticleTex,
        color: 0xffffff,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthTest: false
    });

    selectionReticle = new THREE.Sprite(reticleMat);
    selectionReticle.visible = false;
    scene.add(selectionReticle);
}

function createGravityFieldMesh() {
    const ringGeo = new THREE.RingGeometry(0.92, 1.0, 96);
    const ringMat = new THREE.MeshBasicMaterial({
        color: 0x8ea8ff,
        transparent: true,
        opacity: 0.55,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });
    gravityFieldMesh = new THREE.Mesh(ringGeo, ringMat);
    gravityFieldMesh.rotation.x = Math.PI / 2;
    gravityFieldMesh.visible = false;
    scene.add(gravityFieldMesh);
}

function updateGravityFieldVisualizer(body) {
    if (!gravityFieldMesh) return;
    if (!gravityFieldVisible || !body || !body.mesh || body.destroyed || !body.mesh.visible) {
        gravityFieldMesh.visible = false;
        return;
    }

    const worldPos = new THREE.Vector3();
    body.mesh.getWorldPosition(worldPos);
    gravityFieldMesh.position.copy(worldPos);

    let reachRadius = 30.0;
    if (body.isStatic || body.name === 'Sol') {
        reachRadius = 6500.0 * (body.radiusScale || 1.0) * Math.cbrt(body.massScale || 1.0);
        if (gravityFieldMesh.material) {
            gravityFieldMesh.material.color.setHex(0xffaa22);
            gravityFieldMesh.material.opacity = 0.40;
        }
    } else {
        const baseReach = (body.radius || 10) * 3.8;
        const massFactor = Math.cbrt(body.massScale || 1.0);
        reachRadius = baseReach * massFactor;
        if (gravityFieldMesh.material) {
            gravityFieldMesh.material.color.setHex(0x8ea8ff);
            gravityFieldMesh.material.opacity = 0.55;
        }
    }

    gravityFieldMesh.scale.set(reachRadius, reachRadius, reachRadius);
    gravityFieldMesh.visible = true;

    if (infoGravityReach) {
        if (body.isStatic || body.name === 'Sol') {
            const lightYears = (2.0 * Math.cbrt(body.massScale || 1.0)).toFixed(2);
            const auReach = Math.round(125000 * Math.cbrt(body.massScale || 1.0)).toLocaleString();
            infoGravityReach.textContent = `${lightYears} Años Luz (${auReach} AU — Heliósfera / Nube de Oort)`;
        } else {
            const baseKm = (body.name === 'Júpiter' ? 53.0 : (body.name === 'Saturno' ? 65.0 : 1.5));
            const scaledKm = baseKm * Math.cbrt(body.massScale || 1.0);
            const deltaPercent = ((Math.cbrt(body.massScale || 1.0) - 1.0) * 100).toFixed(0);
            const sign = deltaPercent >= 0 ? '+' : '';
            infoGravityReach.textContent = `${scaledKm.toFixed(2)} M km (${(body.massScale || 1.0).toFixed(1)}× gravedad, ${sign}${deltaPercent}% alcance)`;
        }
    }
}

function initLateralWarpCanvas() {
    warpCanvas = document.getElementById('warp-canvas');
    if (!warpCanvas) return;
    warpCtx = warpCanvas.getContext('2d');
    resizeWarpCanvas();

    lateralParticles = [];
    for (let i = 0; i < lateralParticleCount; i++) {
        const isLeft = (i % 2 === 0);
        lateralParticles.push(createLateralParticle(isLeft, true));
    }
}

function resizeWarpCanvas() {
    if (!warpCanvas) return;
    warpCanvas.width = window.innerWidth;
    warpCanvas.height = window.innerHeight;
}

function createLateralParticle(isLeft, randomStart = false) {
    const w = warpCanvas ? warpCanvas.width : window.innerWidth;
    const h = warpCanvas ? warpCanvas.height : window.innerHeight;
    const cx = w / 2;

    let angle;
    if (isLeft) {
        angle = Math.PI * (0.62 + Math.random() * 0.76);
    } else {
        angle = (Math.random() - 0.5) * Math.PI * 0.76;
    }

    const dirX = Math.cos(angle);
    const dirY = Math.sin(angle);
    const stagger = (Math.random() - 0.5) * (w * 0.10);
    const boundaryX = isLeft ? (w * 0.24 + stagger) : (w * 0.76 - stagger);
    const distMin = Math.abs((boundaryX - cx) / dirX);
    const distMax = distMin + (w * 0.35);

    const length = 40 + Math.random() * 140;
    const dist = randomStart ? (distMin + Math.random() * (distMax - distMin)) : (distMin + Math.random() * 30);

    return {
        isLeft, dirX, dirY, dist, distMin, distMax, length,
        speed: 600 + Math.random() * 1100,
        baseAlpha: 0.3 + Math.random() * 0.6,
        thickness: 1.0 + Math.random() * 1.5,
        color: Math.random() > 0.5 ? '#38bdf8' : '#ffffff'
    };
}

function updateLateralWarp(delta, intensity) {
    if (!warpCanvas || !warpCtx) return;
    const w = warpCanvas.width;
    const h = warpCanvas.height;

    if (intensity <= 0.005) {
        warpCtx.clearRect(0, 0, w, h);
        return;
    }

    warpCtx.clearRect(0, 0, w, h);
    const cx = w / 2;
    const cy = h / 2;

    for (let i = 0; i < lateralParticles.length; i++) {
        const p = lateralParticles[i];
        p.dist += p.speed * delta * (1.0 + intensity * 2.2);

        if (p.dist > p.distMax + p.length) {
            lateralParticles[i] = createLateralParticle(p.isLeft, false);
            continue;
        }

        const headDist = p.dist;
        const tailDist = Math.max(p.distMin * 0.9, p.dist - p.length);
        if (headDist <= p.distMin) continue;

        const hx = cx + p.dirX * headDist;
        const hy = cy + p.dirY * headDist;
        const tx = cx + p.dirX * tailDist;
        const ty = cy + p.dirY * tailDist;

        const lifeFade = Math.min(1.0, Math.max(0.0, (p.dist - p.distMin) / Math.max(1, p.length * 0.6)));
        const alpha = p.baseAlpha * intensity * lifeFade;
        if (alpha <= 0.01) continue;

        warpCtx.save();
        warpCtx.globalAlpha = Math.min(1.0, alpha);
        warpCtx.lineWidth = p.thickness;
        warpCtx.lineCap = 'round';
        warpCtx.strokeStyle = p.color;
        warpCtx.beginPath();
        warpCtx.moveTo(tx, ty);
        warpCtx.lineTo(hx, hy);
        warpCtx.stroke();
        warpCtx.restore();
    }
}

// --- SISTEMA DE ZONA HABITABLE 3D & GOLDILOCKS ---
function createHabitableZoneMesh() {
    if (habitableZoneMesh) {
        scene.remove(habitableZoneMesh);
        if (habitableZoneMesh.geometry) habitableZoneMesh.geometry.dispose();
        if (habitableZoneMesh.material) habitableZoneMesh.material.dispose();
    }
    const sun = bodies.find(b => b.isStar || b.name === 'Sol');
    const sunScale = (sun && sun.radiusScale) ? sun.radiusScale : 1.0;
    const sunMassScale = (sun && sun.massScale) ? sun.massScale : 1.0;
    const starLum = (sun && sun.luminosity !== undefined) ? sun.luminosity : (sunScale * sunMassScale);
    const lumFactor = Math.sqrt(Math.max(0.04, starLum));

    const innerR = 320 * lumFactor;
    const outerR = 560 * lumFactor;

    const ringGeo = new THREE.RingGeometry(innerR, outerR, 96, 1);
    const ringMat = new THREE.MeshBasicMaterial({
        color: 0x3dd598,
        transparent: true,
        opacity: 0.14,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    habitableZoneMesh = new THREE.Mesh(ringGeo, ringMat);
    habitableZoneMesh.rotation.x = Math.PI / 2;
    habitableZoneMesh.visible = habitableZoneVisible;
    scene.add(habitableZoneMesh);
}

// --- MODO N-BODY DINÁMICO & CONTROL DE SIMULACIÓN ---
function setNBodyMode(enabled) {
    isNBodyMode = enabled;
    if (isNBodyMode) {
        // Inicializar velocidades orbitales tangenciales exactas para que los planetas orbiten naturalmente
        bodies.forEach(b => {
            if (b.isPlanet && b.mesh) {
                const r = b.mesh.position.length();
                if (r > 1) {
                    const speed = Math.sqrt((G * 1200.0 * 50.0) / r);
                    const tangent = new THREE.Vector3(-b.mesh.position.z, 0, b.mesh.position.x).normalize();
                    b.velocity.copy(tangent.multiplyScalar(speed));
                }
            } else if (b.isMoon && b.parentBody && b.mesh) {
                const relPos = new THREE.Vector3().subVectors(b.mesh.position, b.parentBody.mesh.position);
                const r = relPos.length();
                if (r > 0.5) {
                    const moonSpeed = Math.sqrt((G * 1200.0 * (b.parentBody.mass || 1.0)) / r);
                    const tangent = new THREE.Vector3(-relPos.z, 0, relPos.x).normalize();
                    b.velocity.copy(b.parentBody.velocity || new THREE.Vector3()).addScaledVector(tangent, moonSpeed);
                }
            }
        });
    }

    if (simModeBadge) {
        if (isNBodyMode) {
            simModeBadge.classList.add('is-nbody');
            if (simModeText) simModeText.textContent = 'Modo: Dinámico N-Body (Caos Reactivo)';
        } else {
            simModeBadge.classList.remove('is-nbody');
            if (simModeText) simModeText.textContent = 'Modo: Órbitas Keplerianas (Estable)';
        }
    }
    if (nbodyToggleText) {
        nbodyToggleText.textContent = isNBodyMode ? 'Desactivar N-Body' : 'Activar N-Body';
    }
    logToConsole(isNBodyMode ? 'Física dinámica N-Body ACTIVADA. Fuerzas gravitatorias reactivas en tiempo real.' : 'Modo Kepleriano restablecido.', isNBodyMode ? 'warning' : 'system');
}

// --- MUTADOR DE CUERPOS CELESTES (¿QUÉ PASARÍA SI...?) ---
function setBodyRadiusScale(body, scale) {
    if (!body || !body.mesh) return;
    body.radiusScale = Math.max(0.1, scale);
    body.radius = (body.baseRadius || 10) * body.radiusScale;
    body.mesh.scale.set(body.radiusScale, body.radiusScale, body.radiusScale);

    if (body.name === 'Sol') {
        createHabitableZoneMesh();
        checkSolarDevourment();
    }

    // Actualizar radio de las lunas para evitar colisiones si el planeta crece
    bodies.forEach(m => {
        if (m.isMoon && m.parentBody === body && !m.destroyed) {
            m.orbitRadius = Math.max((body.radius * 1.4) + 10, (m.baseOrbitRadius || 25) * Math.cbrt(body.massScale || 1.0));
            recalculateAndAnimateOrbit(m, 0x8ea8ff);
        }
    });

    checkAllRocheLimits();
    updateGravityFieldVisualizer(body);

    if (selectedBody === body && valBodyRadius) {
        valBodyRadius.textContent = body.radiusScale.toFixed(1) + '×';
    }
}

function setBodyMassScale(body, scale) {
    if (!body) return;
    body.massScale = Math.max(0.01, scale);
    body.mass = (body.baseMass !== undefined ? body.baseMass : 1.0) * body.massScale;

    if (body.name === 'Sol') {
        createHabitableZoneMesh();
        // Si la masa del Sol cambia, recalcular y animar las órbitas de todos los planetas según Kepler
        bodies.forEach(b => {
            if (b.isPlanet && !b.destroyed) {
                b.orbitRadius = (b.baseOrbitRadius || b.orbitRadius) * Math.pow(Math.max(0.1, body.massScale), 0.25);
                recalculateAndAnimateOrbit(b, 0x3dd598);
            }
        });
    } else if (body.isPlanet) {
        // Si el planeta cambia de masa, perturbar sus lunas y su propia órbita
        bodies.forEach(m => {
            if (m.isMoon && m.parentBody === body && !m.destroyed) {
                m.orbitRadius = Math.max((body.radius * 1.4) + 10, (m.baseOrbitRadius || 25) * Math.cbrt(body.massScale));
                recalculateAndAnimateOrbit(m, 0x8ea8ff);
            }
        });
        body.orbitRadius = (body.baseOrbitRadius || body.orbitRadius) * Math.pow(Math.max(0.1, body.massScale), 0.08);
        recalculateAndAnimateOrbit(body, 0x8ea8ff);
    }

    if (body.name === 'Júpiter' && body.massScale >= 20.0) {
        igniteJupiterAsStar(body);
    }

    updateGravityFieldVisualizer(body);

    if (selectedBody === body && valBodyMass) {
        valBodyMass.textContent = body.massScale.toFixed(1) + '×';
    }
}

function igniteJupiterAsStar(jupiter) {
    if (jupiter.isIgnited) return;
    jupiter.isIgnited = true;
    jupiter.type = 'Enana Roja / Protoestrella Binaria';
    if (jupiter.mesh && jupiter.mesh.material && jupiter.mesh.material.color) {
        jupiter.mesh.material.color = new THREE.Color(0xff4422);
    }
    const starGlowGeo = new THREE.SphereGeometry(jupiter.radius * 1.6, 32, 32);
    const starGlowMat = new THREE.MeshBasicMaterial({
        color: 0xff6622,
        transparent: true,
        opacity: 0.38,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending
    });
    jupiter.starGlow = new THREE.Mesh(starGlowGeo, starGlowMat);
    jupiter.mesh.add(jupiter.starGlow);
    createExplosion(jupiter.mesh.position, 3.0, 0xff7722);
    logToConsole('¡IGNICIÓN NUCLEAR! Júpiter ha alcanzado masa estelar y se ha convertido en un segundo Sol.', 'warning');
}

// --- LÍMITE DE ROCHE & COLAPSO EN ANILLOS ---
function checkAllRocheLimits() {
    bodies.forEach(moon => {
        if (!moon.isMoon || !moon.parentBody || moon.destroyed) return;
        const parent = moon.parentBody;
        if (!parent.mesh || !moon.mesh) return;

        const parentPos = parent.mesh.position;
        const moonPos = moon.mesh.position;
        const dist = moonPos.distanceTo(parentPos);

        const parentR = (parent.baseRadius || parent.radius) * (parent.radiusScale || 1.0);
        const moonR = (moon.baseRadius || moon.radius) * (moon.radiusScale || 1.0);

        // En estado base (1.0x) las órbitas naturales son estables.
        // Solo se detona la desintegración si el planeta padre se agranda, la gravedad aumenta críticamente,
        // la luna crece demasiado, o si por colisión/N-body la luna cruza físicamente la superficie del padre.
        const isPerturbed = (parent.radiusScale && parent.radiusScale > 1.35) || 
                            (parent.massScale && parent.massScale > 3.0) || 
                            (moon.radiusScale && moon.radiusScale > 2.5) ||
                            isNBodyMode;

        // Umbral físico de colisión o marea crítica
        const collisionThreshold = parentR * 1.15 + moonR;

        if (isPerturbed && dist < collisionThreshold && dist > 0.1) {
            triggerRocheDisruption(moon, parent);
        }
    });
}

function triggerRocheDisruption(moon, parent) {
    if (moon.destroyed) return;
    moon.destroyed = true;
    moon.mesh.visible = false;
    if (moon.orbitLine) moon.orbitLine.visible = false;

    createDebrisRingAroundBody(parent, (moon.orbitRadius || 25) * 0.9, moon.colorHex || 0xd6c7a8);
    createExplosion(moon.mesh.position, 1.8, 0xffddaa);
    createShockwave(moon.mesh.position, 60, 0xffeedd);

    logToConsole(`¡COLAPSO POR LÍMITE DE ROCHE! La atracción de ${parent.name} ha pulverizado a ${moon.name} en un nuevo anillo planetario.`, 'warning');
}

// --- ABSORCIÓN & DEVORAMIENTO SOLAR ---
function checkSolarDevourment() {
    const sun = bodies.find(b => b.name === 'Sol');
    if (!sun || !sun.mesh) return;
    const sunRadius = (sun.baseRadius || 62) * (sun.radiusScale || 1.0);
    const sunPos = sun.mesh.position;

    // Solo comprobar absorción si el Sol ha crecido (Gigante Roja) o si un cuerpo penetra la superficie solar
    const isSunExpanded = (sun.radiusScale && sun.radiusScale > 1.35);

    bodies.forEach(b => {
        if (b === sun || b.destroyed || !b.mesh) return;
        const dist = b.mesh.position.distanceTo(sunPos);

        if ((isSunExpanded && dist < sunRadius * 1.01) || dist < sunRadius * 0.95) {
            vaporizeBodyInSun(b, sun);
        }
    });
}

function vaporizeBodyInSun(body, sun) {
    if (body.destroyed) return;
    body.destroyed = true;
    body.mesh.visible = false;
    if (body.orbitLine) body.orbitLine.visible = false;

    createExplosion(body.mesh.position, 4.0, 0xff3300);
    createShockwave(body.mesh.position, 140, 0xff8800);
    logToConsole(`¡ABSORCIÓN ESTELAR! ${body.name} ha sido devorado por la fotosfera del Sol.`, 'warning');
}

// --- EFECTOS VISUALES DE EXPLOSIÓN, ONDAS DE CHOQUE & ANILLOS ---
function createExplosion(position, scale = 1.0, colorHex = 0xff6622) {
    const particleCount = 60;
    const pGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = [];

    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = position.x;
        positions[i * 3 + 1] = position.y;
        positions[i * 3 + 2] = position.z;

        const dir = new THREE.Vector3(
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 2
        ).normalize().multiplyScalar((12 + Math.random() * 30) * scale);
        velocities.push(dir);
    }

    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const pMat = new THREE.PointsMaterial({
        color: colorHex,
        size: 5.5 * scale,
        transparent: true,
        opacity: 1.0,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    const pMesh = new THREE.Points(pGeo, pMat);
    scene.add(pMesh);

    dynamicParticles.push({
        mesh: pMesh,
        positions: positions,
        velocities: velocities,
        age: 0,
        maxAge: 1.8
    });
}

function createShockwave(position, maxRadius = 100, colorHex = 0xffffff) {
    const ringGeo = new THREE.RingGeometry(0.5, 3.0, 64);
    const ringMat = new THREE.MeshBasicMaterial({
        color: colorHex,
        transparent: true,
        opacity: 0.9,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });
    const shockMesh = new THREE.Mesh(ringGeo, ringMat);
    shockMesh.position.copy(position);
    shockMesh.rotation.x = Math.PI / 2;
    scene.add(shockMesh);

    shockwaves.push({
        mesh: shockMesh,
        currentRadius: 3.0,
        maxRadius: maxRadius,
        opacity: 0.9,
        growthSpeed: 160.0
    });
}

function createDebrisRingAroundBody(parent, radius = 30, colorHex = 0xd6c7a8) {
    const count = 350;
    const ringGeo = new THREE.BufferGeometry();
    const posArr = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const r = radius * (0.85 + Math.random() * 0.35);
        posArr[i * 3] = Math.cos(angle) * r;
        posArr[i * 3 + 1] = (Math.random() - 0.5) * 2.5;
        posArr[i * 3 + 2] = Math.sin(angle) * r;
    }

    ringGeo.setAttribute('position', new THREE.BufferAttribute(posArr, 3));
    const mat = new THREE.PointsMaterial({
        color: colorHex,
        size: 2.2,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending
    });

    const ringMesh = new THREE.Points(ringGeo, mat);
    parent.mesh.add(ringMesh);
    activeDebrisRings.push(ringMesh);
}

// --- LANZADOR DE ASTEROIDES & PROYECTILES ---
function launchAsteroid(target = null) {
    const targetBody = target || selectedBody || bodies.find(b => b.name === 'Tierra') || bodies[1];
    const spawnPos = new THREE.Vector3();
    
    if (targetBody && targetBody.mesh) {
        const offset = new THREE.Vector3(
            (Math.random() - 0.5) * 160 + (Math.random() > 0.5 ? 180 : -180),
            (Math.random() - 0.5) * 80 + 40,
            (Math.random() - 0.5) * 160 + (Math.random() > 0.5 ? 180 : -180)
        );
        targetBody.mesh.getWorldPosition(spawnPos);
        spawnPos.add(offset);
    } else {
        spawnPos.copy(camera.position).add(new THREE.Vector3(0, 0, -100));
    }

    const astGeo = new THREE.DodecahedronGeometry(5.0, 1);
    const posAttr = astGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
        const vx = posAttr.getX(i) + (Math.random() - 0.5) * 1.2;
        const vy = posAttr.getY(i) + (Math.random() - 0.5) * 1.2;
        const vz = posAttr.getZ(i) + (Math.random() - 0.5) * 1.2;
        posAttr.setXYZ(i, vx, vy, vz);
    }
    astGeo.computeVertexNormals();

    const astMat = new THREE.MeshStandardMaterial({
        color: 0xb87333,
        roughness: 0.85,
        metalness: 0.3
    });
    const astMesh = new THREE.Mesh(astGeo, astMat);
    astMesh.position.copy(spawnPos);
    scene.add(astMesh);

    const vel = new THREE.Vector3();
    if (targetBody && targetBody.mesh) {
        const targetPos = new THREE.Vector3();
        targetBody.mesh.getWorldPosition(targetPos);
        vel.subVectors(targetPos, spawnPos).normalize().multiplyScalar(140.0);
    } else {
        vel.set(0, 0, -120.0);
    }

    const proj = {
        mesh: astMesh,
        velocity: vel,
        target: targetBody,
        radius: 5.0,
        mass: 0.5,
        lifeTime: 0
    };

    projectiles.push(proj);
    logToConsole(`¡Asteroide cataclísmico disparado a ${targetBody ? targetBody.name : 'el espacio profundo'}!`, 'warning');
}

// --- ESCENARIOS PRECONFIGURADOS DE CATACLISMO ---
function triggerRedGiantScenario() {
    const sun = bodies.find(b => b.name === 'Sol');
    if (!sun) return;
    
    setNBodyMode(true);
    setBodyRadiusScale(sun, 28.0);
    setBodyMassScale(sun, 2.5);
    
    if (sun.coronaMesh && sun.coronaMesh.material) {
        sun.coronaMesh.material.color = new THREE.Color(0xff2200);
        sun.coronaMesh.material.opacity = 0.55;
    }
    
    createShockwave(sun.mesh.position, 400, 0xff4400);
    selectBody(sun, true);
    
    logToConsole('¡ESCENARIO GIGANTE ROJA! El Sol se ha expandido 28x, absorbiendo planetas interiores y desplazando la zona habitable.', 'warning');
}

function triggerDeleteSunScenario() {
    const sun = bodies.find(b => b.name === 'Sol' || b.isStatic || b.isStar || b.type === 'Estrella' || b.type === 'Enana Blanca' || b.type === 'Enana Roja' || b.type === 'Estrella F-type') || bodies[0];
    if (!sun) return;

    createExplosion(sun.mesh.position, 6.0, 0x112244);
    createShockwave(sun.mesh.position, 200, 0x8ea8ff);

    // 1. Apagar fotosfera y corona de la estrella central
    if (sun.mesh) sun.mesh.visible = false;
    if (sun.coronaMesh) sun.coronaMesh.visible = false;
    sun.mass = 0.00001;
    sun.massScale = 0.0;
    sun.destroyed = true;

    // Ocultar zona de habitabilidad y decoraciones cósmicas
    if (habitableZoneMesh) habitableZoneMesh.visible = false;
    if (customDecorationsGroup) customDecorationsGroup.visible = false;

    // 2. Inicializar estado relativista en todos los cuerpos celestes:
    // Los planetas aún NO saben que el Sol desapareció; siguen iluminados y orbitando normalmente.
    bodies.forEach(b => {
        if (!b.isStatic && b !== sun) {
            b.waveHit = false;
            b.isEscapingInertial = false;
        }
    });

    // 3. Disparar el frente de onda gravitacional y apagón a velocidad c
    const waveOrigin = sun.mesh ? sun.mesh.position.clone() : new THREE.Vector3(0, 0, 0);
    createGravitationalWave(waveOrigin, sun.name, true, SPEED_OF_LIGHT_SIM);

    const survivor = bodies.find(b => b.isPlanet && !b.destroyed) || bodies[1];
    if (survivor) selectBody(survivor, true);

    logToConsole(`¡COLAPSO ESTELAR RELATIVISTA! El ${sun.name} ha desaparecido en t = 0s. La perturbación gravitatoria y el apagón fotónico viajan a la velocidad de la luz c. Los mundos conservan órbita y luz hasta ser alcanzados (Mercurio: ~3.8s | Venus: ~5.8s | Tierra: 8.0s).`, 'danger');
}

function triggerJupiterStarScenario() {
    const jupiter = bodies.find(b => b.name === 'Júpiter');
    if (!jupiter) return;

    setNBodyMode(true);
    setBodyMassScale(jupiter, 65.0);
    setBodyRadiusScale(jupiter, 2.8);
    igniteJupiterAsStar(jupiter);
    selectBody(jupiter, true);

    logToConsole('¡ESCENARIO JÚPITER BINARIO! Júpiter ha alcanzado masa de fusión nuclear, convirtiendo al Sistema Solar en un sistema binario caótico.', 'warning');
}

function triggerRogueStarScenario() {
    setNBodyMode(true);
    
    const starGeo = new THREE.SphereGeometry(35, 32, 32);
    const starMat = new THREE.MeshBasicMaterial({ color: 0x0d1326 });
    const rogueMesh = new THREE.Mesh(starGeo, starMat);
    
    const coronaGeo = new THREE.SphereGeometry(46, 32, 32);
    const coronaMat = new THREE.MeshBasicMaterial({
        color: 0x8ea8ff,
        transparent: true,
        opacity: 0.45,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending
    });
    rogueMesh.add(new THREE.Mesh(coronaGeo, coronaMat));
    
    rogueMesh.position.set(-1800, 400, -1600);
    scene.add(rogueMesh);
    
    const rogueObj = {
        name: 'Invasor Cósmico (Nemesis)',
        mesh: rogueMesh,
        radius: 35,
        mass: 75.0,
        massScale: 1.0,
        radiusScale: 1.0,
        isRogue: true,
        velocity: new THREE.Vector3(120, -25, 110),
        type: 'Estrella de Neutrones Errante'
    };
    
    bodies.push(rogueObj);
    rogueStars.push(rogueObj);
    createShockwave(rogueMesh.position, 250, 0x8ea8ff);
    selectBody(rogueObj, true);
    
    logToConsole('¡INVASOR CÓSMICO DETECTADO! Una estrella hipermasiva atraviesa el Sistema Solar perturbando todas las órbitas.', 'warning');
}

function triggerGreatImpactScenario() {
    const earth = bodies.find(b => b.name === 'Tierra') || bodies[1];
    selectBody(earth, true);
    setTimeout(() => {
        launchAsteroid(earth);
    }, 400);
}

function resetSingleBody(body) {
    if (!body) return;
    setBodyRadiusScale(body, 1.0);
    setBodyMassScale(body, 1.0);
    if (body.baseOrbitRadius !== undefined) body.orbitRadius = body.baseOrbitRadius;
    if (body.baseEccentricity !== undefined) body.eccentricity = body.baseEccentricity;
    if (body.baseInclination !== undefined) body.inclination = body.baseInclination;
    if (body.baseArgPeriapsis !== undefined) body.argPeriapsis = body.baseArgPeriapsis;
    if (body.baseAscendingNode !== undefined) body.ascendingNode = body.baseAscendingNode;
    if (body.baseOrbitalSpeed !== undefined) body.orbitalSpeed = body.baseOrbitalSpeed;
    body.destroyed = false;

    if (body.mesh) {
        body.mesh.visible = !body.isMoon || moonsVisible;
        body.mesh.scale.set(1, 1, 1);
        const state = getKeplerianState(body, body.currentM || 0);
        if (body.isPlanet) {
            body.mesh.position.copy(state.pos);
        } else if (body.isMoon && body.parentBody && body.parentBody.mesh) {
            body.mesh.position.copy(body.parentBody.mesh.position).add(state.pos);
        }
    }

    if (body.orbitLine) {
        recalculateAndAnimateOrbit(body, body.isMoon ? 0x334155 : 0x475569);
        body.orbitLine.visible = orbitsVisible && (!body.isMoon || moonsVisible);
    }

    if (body.starGlow) {
        body.mesh.remove(body.starGlow);
        body.starGlow = null;
        body.isIgnited = false;
    }
    logToConsole(`${body.name} restaurado a parámetros iniciales y órbita restablecida.`, 'action');
}

// --- ELIMINACIÓN REALISTA DE CUERPOS ESTELARES ---
function deleteSelectedBody(targetBody = null) {
    const body = targetBody || selectedBody;
    if (!body) {
        logToConsole('No hay ningún cuerpo celeste seleccionado para eliminar.', 'warning');
        return;
    }

    const bodyName = body.name;

    // CASO 1: LA ESTRELLA CENTRAL (El Sol o cualquier estrella anfitriona custom)
    if (body.isStatic || body.name === 'Sol' || body.isStar || body.type === 'Estrella' || body.type === 'Enana Blanca' || body.type === 'Enana Roja' || body.type === 'Estrella F-type') {
        logToConsole(`¡ELIMINACIÓN ESTELAR! Se ha eliminado la estrella central ${bodyName}.`, 'danger');
        triggerDeleteSunScenario();
        deselectBody();
        return;
    }

    // Coordenadas mundiales antes de la eliminación
    const bodyPos = new THREE.Vector3();
    if (body.mesh) body.mesh.getWorldPosition(bodyPos);

    // Efecto visual: Implosión gravitatoria y onda de choque enérgica
    const radiusVisual = Math.max(12, body.radius || 15);
    createShockwave(bodyPos, radiusVisual * 12, 0xff4757);
    createExplosion(bodyPos, Math.max(3, radiusVisual * 0.7), 0xff6b81);

    // CASO 2: ELIMINACIÓN DE UN PLANETA QUE POSEE LUNAS (Propagación relativista local a velocidad c)
    const childMoons = bodies.filter(b => b.isMoon && b.parentBody === body && !b.destroyed);
    if (childMoons.length > 0) {
        // Disparar onda gravitacional local en expansión desde la posición del planeta
        // Velocidad calibrada para que las lunas se liberen en cascada según su distancia luz real
        createGravitationalWave(bodyPos, bodyName, false, 28.0);

        childMoons.forEach(moon => {
            const moonWorldPos = new THREE.Vector3();
            if (moon.mesh) moon.mesh.getWorldPosition(moonWorldPos);
            moon.isWaitingMoonLiberation = true;
            moon.parentPosFixed = bodyPos.clone();
            moon.distToParent = moonWorldPos.distanceTo(bodyPos);
            moon.parentVelocityFixed = body.velocity ? body.velocity.clone() : new THREE.Vector3();
            moon.originalParentName = bodyName;
        });

        const moonList = childMoons.map(m => m.name).join(', ');
        logToConsole(`¡COLAPSO GRAVITATORIO LOCAL! Al desaparecer ${bodyName}, una onda de propagación a velocidad c viaja hacia sus satélites (${moonList}), liberándolos progresivamente en cascada relativista.`, 'warning');
    } else if (body.isMoon) {
        // CASO 3: ELIMINACIÓN DE UNA LUNA INDIVIDUAL
        const parentName = body.parentBody ? body.parentBody.name : 'su planeta matriz';
        logToConsole(`Satélite ${bodyName} eliminado. El campo de marea gravitatoria sobre ${parentName} se ha disuelto.`, 'info');
    } else {
        // CASO 4: PLANETA NORMAL O EXOPLANETA CUSTOM SIN LUNAS
        logToConsole(`Planeta ${bodyName} eliminado del sistema. Pozo gravitatorio disuelto.`, 'danger');
    }

    // Consecuencias astrofísicas específicas en la arquitectura del sistema
    if (bodyName === 'Júpiter') {
        logToConsole('Consecuencia astrofísica mayor: La ausencia de Júpiter destruye las resonancias orbitales protectoras y desestabiliza a los asteroides Troyanos.', 'warning');
    } else if (bodyName === 'Saturno') {
        logToConsole('Consecuencia astrofísica: El sistema de anillos de Saturno y sus resonancias de Lindblad desaparecen en el vacío.', 'info');
    } else if (bodyName === 'Tierra') {
        logToConsole('Consecuencia astrofísica: La Tierra ha sido eliminada. La biosfera ha cesado y la Luna ahora orbita al Sol de forma autónoma.', 'danger');
    }

    // Deseleccionar y limpiar cámara si estaba enfocado
    if (selectedBody === body) {
        deselectBody();
    }
    if (focusBody === body) {
        focusBody = null;
        if (hasSavedPreFocus) isTransitioningBack = true;
    }

    // Retirar todos los componentes de Three.js de la escena
    if (body.mesh) scene.remove(body.mesh);
    if (body.atmoMesh) scene.remove(body.atmoMesh);
    if (body.ringMesh) scene.remove(body.ringMesh);
    if (body.orbitLine) scene.remove(body.orbitLine);
    if (body.glowMesh) scene.remove(body.glowMesh);
    if (body.gravityFieldMesh) scene.remove(body.gravityFieldMesh);
    if (body.starGlow) scene.remove(body.starGlow);

    body.destroyed = true;

    // Eliminar del array principal de bodies
    const bodyIdx = bodies.indexOf(body);
    if (bodyIdx !== -1) {
        bodies.splice(bodyIdx, 1);
    }

    // Actualizar recuentos y menú celestial
    updateBodyCount();
    renderCelestialDock();
}

function triggerRandomCosmicEvent() {
    const eventTypes = [
        'asteroid_storm',
        'hyperbolic_comet',
        'gravitational_tide',
        'solar_cme'
    ];
    const picked = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    const planets = bodies.filter(b => b.isPlanet && !b.destroyed);
    const targetPlanet = planets[Math.floor(Math.random() * planets.length)] || bodies[1];

    if (picked === 'asteroid_storm') {
        logToConsole(`¡ALERTA CÓSMICA! Tormenta de meteoros detectada con trayectoria directa hacia ${targetPlanet.name}.`, 'warning');
        selectBody(targetPlanet, true);
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                if (!targetPlanet.destroyed) launchAsteroid(targetPlanet);
            }, i * 400);
        }
    } else if (picked === 'hyperbolic_comet') {
        logToConsole(`¡EVENTO ALEATORIO! Cometa interestelar hiperbólico cruza cerca de ${targetPlanet.name} y deforma su órbita.`, 'warning');
        selectBody(targetPlanet, true);
        targetPlanet.eccentricity = Math.min(0.68, (targetPlanet.eccentricity || 0.02) + 0.16);
        targetPlanet.orbitRadius = Math.max(90, (targetPlanet.orbitRadius || 200) + (Math.random() > 0.5 ? 65 : -55));
        targetPlanet.inclination = (targetPlanet.inclination || 0) + 0.08;
        createShockwave(targetPlanet.mesh.position, 180, 0x00f2fe);
        recalculateAndAnimateOrbit(targetPlanet, 0x00f2fe);
    } else if (picked === 'gravitational_tide') {
        logToConsole(`¡FLUCTUACIÓN DE MAREA! Resonancia orbital anómala ha estirado la elipse de ${targetPlanet.name}.`, 'warning');
        selectBody(targetPlanet, true);
        targetPlanet.eccentricity = Math.min(0.72, (targetPlanet.eccentricity || 0.02) + 0.20);
        targetPlanet.argPeriapsis = (targetPlanet.argPeriapsis || 0) + 1.1;
        createShockwave(targetPlanet.mesh.position, 130, 0x3dd598);
        recalculateAndAnimateOrbit(targetPlanet, 0x3dd598);
    } else if (picked === 'solar_cme') {
        logToConsole('¡EXPULSIÓN DE MASA CORONAL (CME)! El Sol emite una llamarada que perturba las órbitas interiores.', 'warning');
        const sun = bodies.find(b => b.name === 'Sol');
        if (sun) {
            selectBody(sun, true);
            createShockwave(sun.mesh.position, 350, 0xff5500);
        }
        planets.slice(0, 4).forEach(p => {
            p.orbitRadius = (p.orbitRadius || 200) + 30;
            p.eccentricity = Math.min(0.55, (p.eccentricity || 0.01) + 0.06);
            recalculateAndAnimateOrbit(p, 0xff7700);
        });
    }
}

function restoreInitialUniverse() {
    // 1. Limpiar proyectiles activos
    projectiles.forEach(p => {
        if (p.mesh) scene.remove(p.mesh);
    });
    projectiles = [];

    // 2. Limpiar partículas de explosión
    dynamicParticles.forEach(dp => {
        if (dp.mesh) {
            scene.remove(dp.mesh);
            if (dp.mesh.geometry) dp.mesh.geometry.dispose();
        }
    });
    dynamicParticles = [];

    // 3. Limpiar ondas de choque
    shockwaves.forEach(sw => {
        if (sw.mesh) {
            scene.remove(sw.mesh);
            if (sw.mesh.geometry) sw.mesh.geometry.dispose();
        }
    });
    shockwaves = [];

    // 4. Limpiar anillos de escombros de Roche
    activeDebrisRings.forEach(dr => {
        if (dr.parent) dr.parent.remove(dr);
    });
    activeDebrisRings = [];

    // 5. Eliminar estrellas invasoras
    rogueStars.forEach(rs => {
        if (rs.mesh) scene.remove(rs.mesh);
        const idx = bodies.indexOf(rs);
        if (idx !== -1) bodies.splice(idx, 1);
    });
    rogueStars = [];

    // 6. Limpiar transiciones orbitales pendientes
    activeOrbitTransitions = [];

    // 6.1. Limpiar ondas gravitacionales relativistas
    activeGravitationalWaves.forEach(w => {
        if (w.meshGroup) {
            scene.remove(w.meshGroup);
            w.meshGroup.traverse(child => {
                if (child.geometry) child.geometry.dispose();
                if (child.material) child.material.dispose();
            });
        }
    });
    activeGravitationalWaves = [];
    if (hudGravWaveCard) hudGravWaveCard.style.display = 'none';

    // 6.5. Restaurar posiciones originales de los cinturones de Asteroides y Kuiper
    if (asteroidBeltParticles && asteroidBeltParticles.geometry) {
        const pos = asteroidBeltParticles.geometry.attributes.position.array;
        const rMin = 680, rMax = 1020;
        for (let i = 0; i < asteroidBeltCount; i++) {
            const r = rMin + Math.random() * (rMax - rMin);
            const angle = Math.random() * Math.PI * 2;
            pos[i * 3] = Math.cos(angle) * r;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
            pos[i * 3 + 2] = Math.sin(angle) * r;
        }
        asteroidBeltParticles.geometry.attributes.position.needsUpdate = true;
    }
    if (kuiperBeltParticles && kuiperBeltParticles.geometry) {
        const pos = kuiperBeltParticles.geometry.attributes.position.array;
        const rMin = 3900, rMax = 5800;
        for (let i = 0; i < kuiperBeltCount; i++) {
            const r = rMin + Math.random() * (rMax - rMin);
            const angle = Math.random() * Math.PI * 2;
            pos[i * 3] = Math.cos(angle) * r;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 45;
            pos[i * 3 + 2] = Math.sin(angle) * r;
        }
        kuiperBeltParticles.geometry.attributes.position.needsUpdate = true;
    }

    // 7. Restaurar TODOS los parámetros base (radios, masas, excentricidad, semiejes, velocidades)
    bodies.forEach(b => {
        b.radiusScale = 1.0;
        b.massScale = 1.0;
        b.radius = b.baseRadius || 10;
        b.mass = b.baseMass || 1.0;

        if (b.baseOrbitRadius !== undefined) b.orbitRadius = b.baseOrbitRadius;
        if (b.baseEccentricity !== undefined) b.eccentricity = b.baseEccentricity;
        if (b.baseInclination !== undefined) b.inclination = b.baseInclination;
        if (b.baseArgPeriapsis !== undefined) b.argPeriapsis = b.baseArgPeriapsis;
        if (b.baseAscendingNode !== undefined) b.ascendingNode = b.baseAscendingNode;
        if (b.baseOrbitalSpeed !== undefined) b.orbitalSpeed = b.baseOrbitalSpeed;

        b.destroyed = false;
        b.isNBody = false;
        b.waveHit = false;
        b.isEscapingInertial = false;
        b.isWaitingMoonLiberation = false;
        b.parentPosFixed = null;
        b.parentVelocityFixed = null;
        if (b.isMoon && b.mesh && b.mesh.material && b.mesh.material.color && b.colorHex) {
            b.mesh.material.color.set(b.colorHex);
        }
        b.currentM = b.meanAnomaly || 0;
        b.velocity.set(0, 0, 0);

        if (b.mesh) {
            b.mesh.visible = !b.isMoon || moonsVisible;
            b.mesh.scale.set(1, 1, 1);
        }

        if (b.starGlow) {
            b.mesh.remove(b.starGlow);
            b.starGlow = null;
            b.isIgnited = false;
        }

        if (b.name === 'Júpiter') {
            b.type = 'Gigante gaseoso';
            if (b.mesh && b.mesh.material && b.mesh.material.color) {
                b.mesh.material.color = new THREE.Color(0xffffff);
            }
        }

        // Reconstruir la geometría original de la órbita kepleriana
        if (b.orbitLine) {
            recalculateAndAnimateOrbit(b, b.isMoon ? 0x334155 : 0x475569);
            b.orbitLine.visible = orbitsVisible && (!b.isMoon || moonsVisible);
            if (b.orbitLine.material && b.orbitLine.material.uniforms) {
                b.orbitLine.material.uniforms.uDrawProgress.value = 1.0;
                b.orbitLine.material.uniforms.uIsTransitioning.value = 0.0;
                b.orbitLine.material.uniforms.uColor.value = new THREE.Color(b.isMoon ? 0x334155 : 0x475569);
            }
        }
    });

    // 8. Reubicar posiciones instantáneas en T=0
    bodies.forEach(b => {
        if (b.isPlanet) {
            const state = getKeplerianState(b, b.currentM);
            b.mesh.position.copy(state.pos);
            if (b.ringMesh && b.ringMesh.material.uniforms) {
                b.ringMesh.material.uniforms.uPlanetWorldPos.value.copy(b.mesh.position);
            }
        }
    });
    bodies.forEach(b => {
        if (b.isMoon && b.parentBody) {
            const state = getKeplerianState(b, b.currentM);
            const parentPos = b.parentBody.mesh.position;
            b.mesh.position.set(
                parentPos.x + state.pos.x,
                parentPos.y + state.pos.y,
                parentPos.z + state.pos.z
            );
            if (b.orbitLine) {
                b.orbitLine.position.copy(parentPos);
                b.orbitLine.visible = orbitsVisible && moonsVisible;
            }
        }
    });

    const sun = bodies.find(b => b.name === 'Sol');
    if (sun) {
        sun.radiusScale = 1.0;
        sun.massScale = 1.0;
        sun.radius = sun.baseRadius || 62;
        sun.mass = sun.baseMass || 50.0;
        if (sun.mesh) {
            sun.mesh.scale.set(1, 1, 1);
            sun.mesh.visible = true;
        }
        if (sun.coronaMesh && sun.coronaMesh.material) {
            sun.coronaMesh.visible = true;
            sun.coronaMesh.material.color = new THREE.Color(0xffaa33);
            sun.coronaMesh.material.opacity = 0.18;
        }
    }

    // Restaurar iluminación solar y ambiental
    if (sunLight) sunLight.intensity = 2.4;
    if (ambientLight) ambientLight.intensity = 0.9;

    // Restaurar uSunIntensity en todos los materiales
    bodies.forEach(b => {
        if (b.mesh && b.mesh.material && b.mesh.material.uniforms && b.mesh.material.uniforms.uSunIntensity) {
            b.mesh.material.uniforms.uSunIntensity.value = 1.0;
        }
        if (b.atmoMesh && b.atmoMesh.material && b.atmoMesh.material.uniforms && b.atmoMesh.material.uniforms.uSunIntensity) {
            b.atmoMesh.material.uniforms.uSunIntensity.value = 1.0;
        }
        if (b.ringMesh && b.ringMesh.material && b.ringMesh.material.uniforms && b.ringMesh.material.uniforms.uSunIntensity) {
            b.ringMesh.material.uniforms.uSunIntensity.value = 1.0;
        }
    });

    setNBodyMode(false);
    createHabitableZoneMesh();
    simulatedTime = 0;
    if (statTime) statTime.textContent = '0.00 años';
    resetCamera();

    if (sliderBodyRadius) sliderBodyRadius.value = '1';
    if (valBodyRadius) valBodyRadius.textContent = '1.0×';
    if (sliderBodyMass) sliderBodyMass.value = '1';
    if (valBodyMass) valBodyMass.textContent = '1.0×';

    renderCelestialDock();
    logToConsole('¡Universo restablecido al estado primigenio completo!', 'action');
}

// --- ACTUALIZACIÓN DE FÍSICA & MECÁNICA KEPLERIANA / N-BODY ---
function updatePhysics(delta) {
    if (isPaused) return;

    const dtYears = (delta * timeSpeed * 0.45);
    simulatedTime += dtYears;
    statTime.textContent = simulatedTime.toFixed(2) + ' años';

    const currentDays = simulatedTime * 365.25;
    const simDate = new Date(BASE_DATE.getTime() + currentDays * 24 * 60 * 60 * 1000);
    const months = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
    const dayStr = String(simDate.getUTCDate()).padStart(2, '0');
    const monStr = months[simDate.getUTCMonth()];
    const yrStr = simDate.getUTCFullYear();
    const dateFormatted = dayStr + ' ' + monStr + ' ' + yrStr;
    if (statDate) statDate.textContent = dateFormatted;
    const pillSummaryDate = document.getElementById('pill-summary-date');
    if (pillSummaryDate) pillSummaryDate.textContent = dateFormatted;

    const sun = bodies.find(b => b.name === 'Sol');
    const isSunGone = !sun || sun.destroyed;

    // --- ACTUALIZACIÓN DE ONDAS GRAVITACIONALES RELATIVISTAS (VELOCIDAD C) ---
    if (activeGravitationalWaves.length > 0) {
        for (let wi = activeGravitationalWaves.length - 1; wi >= 0; wi--) {
            const wave = activeGravitationalWaves[wi];
            const dr = wave.speed * delta * timeSpeed;
            wave.radius += dr;
            wave.elapsedSeconds += delta * timeSpeed;

            if (wave.meshGroup) {
                const s = Math.max(0.1, wave.radius);
                wave.meshGroup.scale.set(s, s, s);
                const fade = Math.max(0.0, 1.0 - (wave.radius / wave.maxRadius));
                if (wave.meshGroup.children[0] && wave.meshGroup.children[0].material) {
                    wave.meshGroup.children[0].material.opacity = 0.85 * fade;
                }
                if (wave.meshGroup.children[1] && wave.meshGroup.children[1].material) {
                    wave.meshGroup.children[1].material.opacity = 0.45 * fade;
                }
            }

            // Impacto en planetas / cuerpos centrales
            bodies.forEach(b => {
                if (!b.destroyed && !b.waveHit && b.mesh) {
                    const bodyPos = new THREE.Vector3();
                    b.mesh.getWorldPosition(bodyPos);
                    const distToOrigin = bodyPos.distanceTo(wave.origin);

                    if (wave.radius >= distToOrigin) {
                        b.waveHit = true;
                        wave.affectedBodies.add(b);

                        // Pulso visual al cruzar el frente
                        createShockwave(bodyPos, Math.max(25, (b.radius || 15) * 3), 0x38bdf8);

                        if (wave.isSunExtinction) {
                            // 1. Apagón fotónico en shaders
                            if (b.mesh && b.mesh.material && b.mesh.material.uniforms && b.mesh.material.uniforms.uSunIntensity) {
                                b.mesh.material.uniforms.uSunIntensity.value = 0.0;
                            }
                            if (b.atmoMesh && b.atmoMesh.material && b.atmoMesh.material.uniforms && b.atmoMesh.material.uniforms.uSunIntensity) {
                                b.atmoMesh.material.uniforms.uSunIntensity.value = 0.0;
                            }
                            if (b.ringMesh && b.ringMesh.material && b.ringMesh.material.uniforms && b.ringMesh.material.uniforms.uSunIntensity) {
                                b.ringMesh.material.uniforms.uSunIntensity.value = 0.0;
                            }
                            if (b.isMoon && b.mesh && b.mesh.material && b.mesh.material.color) {
                                b.mesh.material.color.multiplyScalar(0.08);
                            }

                            // 2. Ruptura de la órbita kepleriana cerrada
                            if (b.orbitLine) b.orbitLine.visible = false;

                            // 3. Escape inercial tangencial (1ª Ley de Newton)
                            if (b.isPlanet) {
                                const state = getKeplerianState(b, b.currentM || 0);
                                const speedMag = Math.max(24.0, (state.trueSpeed || 29.0) * 1.5);
                                b.velocity = state.vel.clone().normalize().multiplyScalar(speedMag);
                                b.isEscapingInertial = true;

                                // Las lunas del planeta viajan junto con él en su pozo local
                                bodies.filter(m => m.isMoon && m.parentBody === b).forEach(m => {
                                    m.waveHit = true;
                                    if (m.orbitLine) m.orbitLine.visible = false;
                                    if (m.mesh && m.mesh.material && m.mesh.material.uniforms && m.mesh.material.uniforms.uSunIntensity) {
                                        m.mesh.material.uniforms.uSunIntensity.value = 0.0;
                                    }
                                    if (m.mesh && m.mesh.material && m.mesh.material.color) {
                                        m.mesh.material.color.multiplyScalar(0.08);
                                    }
                                });
                            }

                            const delayInfo = getAstronomicalLightDelayInfo(b.name, distToOrigin);
                            logToConsole(`⚡ [Frente c] ¡Onda gravitatoria alcanzó a ${b.name} tras ${wave.elapsedSeconds.toFixed(1)}s (${delayInfo.realDesc} reales)! Apagón solar total y escape inercial.`, 'warning');
                        }
                    }
                }
            });

            // Si es onda local por eliminación de planeta matriz, liberar lunas al ser tocadas
            if (!wave.isSunExtinction) {
                bodies.filter(m => m.isWaitingMoonLiberation).forEach(moon => {
                    if (wave.radius >= (moon.distToParent || 0)) {
                        liberateMoonToHeliocentric(moon, moon.originalParentName || 'su planeta', moon.parentPosFixed, moon.parentVelocityFixed);
                    }
                });
            }

            // Dispersión secuencial del Cinturón de Asteroides al ser atravesado por la onda
            if (wave.isSunExtinction && asteroidBeltParticles && asteroidBeltParticles.geometry) {
                const pos = asteroidBeltParticles.geometry.attributes.position.array;
                let updated = false;
                for (let k = 0; k < asteroidBeltCount; k++) {
                    const idx = k * 3;
                    const px = pos[idx], pz = pos[idx + 2];
                    const distP = Math.sqrt(px * px + pz * pz) || 1;
                    if (distP <= wave.radius) {
                        const vx = (-pz / distP) * 1.6 + (px / distP) * 2.8;
                        const vz = (px / distP) * 1.6 + (pz / distP) * 2.8;
                        pos[idx] += vx * delta * 45.0 * timeSpeed;
                        pos[idx + 2] += vz * delta * 45.0 * timeSpeed;
                        updated = true;
                    }
                }
                if (updated) asteroidBeltParticles.geometry.attributes.position.needsUpdate = true;
            }

            // Dispersión secuencial del Cinturón de Kuiper
            if (wave.isSunExtinction && kuiperBeltParticles && kuiperBeltParticles.geometry) {
                const pos = kuiperBeltParticles.geometry.attributes.position.array;
                let updated = false;
                for (let k = 0; k < kuiperBeltCount; k++) {
                    const idx = k * 3;
                    const px = pos[idx], pz = pos[idx + 2];
                    const distP = Math.sqrt(px * px + pz * pz) || 1;
                    if (distP <= wave.radius) {
                        const vx = (-pz / distP) * 0.9 + (px / distP) * 1.8;
                        const vz = (px / distP) * 0.9 + (pz / distP) * 1.8;
                        pos[idx] += vx * delta * 35.0 * timeSpeed;
                        pos[idx + 2] += vz * delta * 35.0 * timeSpeed;
                        updated = true;
                    }
                }
                if (updated) kuiperBeltParticles.geometry.attributes.position.needsUpdate = true;
            }

            // Actualizar telemetría del HUD
            if (wave.isSunExtinction && hudGravWaveCard && hudGravWaveCard.style.display !== 'none') {
                const auSim = (wave.radius / 395.0).toFixed(2);
                const lightMinSim = (auSim * 8.32).toFixed(1);
                if (hudGravWaveRadius) {
                    hudGravWaveRadius.textContent = `${auSim} AU • ${lightMinSim} min luz`;
                }

                const pendingPlanets = bodies.filter(b => b.isPlanet && !b.destroyed && !b.waveHit);
                if (pendingPlanets.length > 0) {
                    pendingPlanets.sort((a, b) => {
                        const da = a.mesh ? a.mesh.position.length() : 9999;
                        const db = b.mesh ? b.mesh.position.length() : 9999;
                        return da - db;
                    });
                    const nextP = pendingPlanets[0];
                    const nextDist = nextP.mesh ? nextP.mesh.position.length() : 395;
                    const remainingDist = Math.max(0, nextDist - wave.radius);
                    const remainingSeconds = (remainingDist / (wave.speed * timeSpeed)).toFixed(1);
                    if (hudGravWaveNext) {
                        hudGravWaveNext.textContent = `${nextP.name} (${remainingSeconds}s)`;
                    }
                } else {
                    if (hudGravWaveNext) {
                        hudGravWaveNext.textContent = '¡Todos los planetas alcanzados!';
                    }
                }
            }

            if (wave.radius >= wave.maxRadius) {
                if (wave.meshGroup) scene.remove(wave.meshGroup);
                activeGravitationalWaves.splice(wi, 1);
                if (activeGravitationalWaves.length === 0 && hudGravWaveCard) {
                    hudGravWaveCard.style.display = 'none';
                }
            }
        }
    }

    // Rotación normal de los cinturones
    if (asteroidBeltParticles) asteroidBeltParticles.rotation.y += 0.0008 * timeSpeed;
    if (kuiperBeltParticles) kuiperBeltParticles.rotation.y += 0.00025 * timeSpeed;
    if (customDecorationsGroup && customDecorationsGroup.visible && !isSunGone) {
        customDecorationsGroup.children.forEach(child => {
            if (child.userData && child.userData.rotSpeed) {
                child.rotation.y += child.userData.rotSpeed * timeSpeed;
            }
        });
    }

    // Multiplicador de velocidad angular orbital según la constante gravitatoria G (3ª Ley de Kepler: ω ∝ √G)
    const gravitySpeedMultiplier = Math.sqrt(Math.max(0.01, G / 0.05));

    // 1. MODO KEPLERIANO ESTABLE / ESCAPE INERCIAL RELATIVISTA
    if (!isNBodyMode) {
        // Planetas
        bodies.forEach(b => {
            if (b.isPlanet && !b.destroyed) {
                if (b.isEscapingInertial && b.velocity) {
                    // Movimiento inercial rectilíneo tangencial (1ª Ley de Newton)
                    b.mesh.position.addScaledVector(b.velocity, delta * timeSpeed * 0.45);
                    b.mesh.rotation.y += 0.004 * timeSpeed;
                    if (b.ringMesh && b.ringMesh.material && b.ringMesh.material.uniforms) {
                        b.ringMesh.material.uniforms.uPlanetWorldPos.value.copy(b.mesh.position);
                    }
                    if (selectedBody === b) {
                        const pseudoState = {
                            pos: b.mesh.position,
                            vel: b.velocity,
                            trueSpeed: b.velocity.length(),
                            r: b.mesh.position.length(),
                            nu: 0
                        };
                        updateTelemetryUI(b, pseudoState);
                        updateStateVectors(b, pseudoState);
                    }
                } else {
                    // Movimiento kepleriano normal (velocidad angular reactiva a la gravedad G)
                    b.currentM += b.orbitalSpeed * timeSpeed * 0.7 * gravitySpeedMultiplier;
                    const state = getKeplerianState(b, b.currentM);
                    b.mesh.position.copy(state.pos);

                    const rotDelta = (b.rotationPeriod ? (0.015 / Math.abs(b.rotationPeriod)) : 0.008) * Math.sign(b.rotationPeriod || 1);
                    b.mesh.rotation.y += rotDelta * timeSpeed;

                    if (b.ringMesh && b.ringMesh.material.uniforms) {
                        b.ringMesh.material.uniforms.uPlanetWorldPos.value.copy(b.mesh.position);
                    }

                    if (selectedBody === b) {
                        updateTelemetryUI(b, state);
                        updateStateVectors(b, state);
                    }
                }
            }
        });

        // Lunas
        bodies.forEach(b => {
            if (b.isMoon && !b.destroyed) {
                if (b.isWaitingMoonLiberation && b.parentPosFixed) {
                    // La luna continúa orbitando el punto donde estaba el planeta antes de que llegue la onda
                    b.currentM += b.orbitalSpeed * timeSpeed * 0.7 * gravitySpeedMultiplier;
                    const state = getKeplerianState(b, b.currentM);
                    b.mesh.position.set(
                        b.parentPosFixed.x + state.pos.x,
                        b.parentPosFixed.y + state.pos.y,
                        b.parentPosFixed.z + state.pos.z
                    );
                    b.mesh.rotation.y += 0.006 * timeSpeed;
                    if (b.orbitLine) {
                        b.orbitLine.position.copy(b.parentPosFixed);
                        b.orbitLine.visible = orbitsVisible && moonsVisible;
                    }
                    b.mesh.visible = moonsVisible && !b.destroyed;
                    if (selectedBody === b) {
                        updateTelemetryUI(b, state);
                        updateStateVectors(b, state);
                    }
                } else if (b.parentBody && b.parentBody.mesh) {
                    // Luna acompañando a su planeta (normal o en viaje errante por el cosmos)
                    b.currentM += b.orbitalSpeed * timeSpeed * 0.7 * gravitySpeedMultiplier;
                    const state = getKeplerianState(b, b.currentM);
                    const parentPos = b.parentBody.mesh.position;

                    b.mesh.position.set(
                        parentPos.x + state.pos.x,
                        parentPos.y + state.pos.y,
                        parentPos.z + state.pos.z
                    );
                    b.mesh.rotation.y += 0.006 * timeSpeed;

                    if (b.orbitLine) {
                        b.orbitLine.position.copy(parentPos);
                        // La órbita de la luna permanece visible y viaja con el planeta errante
                        b.orbitLine.visible = orbitsVisible && moonsVisible;
                    }

                    b.mesh.visible = moonsVisible && !b.destroyed;

                    if (selectedBody === b) {
                        updateTelemetryUI(b, state);
                        updateStateVectors(b, state);
                    }
                }
            }
        });
    } else {
        // 2. MODO N-BODY DINÁMICO (Cálculo numérico gravitatorio)
        const activeBodies = bodies.filter(b => !b.destroyed && b.mesh && b.mesh.visible);
        
        activeBodies.forEach(b => {
            if (b.isStatic) return;

            const totalAcc = new THREE.Vector3();
            activeBodies.forEach(other => {
                if (other === b) return;
                const dir = new THREE.Vector3().subVectors(other.mesh.position, b.mesh.position);
                const distSq = Math.max(35, dir.lengthSq());
                
                const forceMag = (G * (other.mass || 1.0) * 1200.0) / distSq;
                dir.normalize().multiplyScalar(forceMag);
                totalAcc.add(dir);
            });

            const dt = Math.min(0.05, delta) * timeSpeed * 2.5;
            b.velocity.addScaledVector(totalAcc, dt);
            b.mesh.position.addScaledVector(b.velocity, dt);

            const rotDelta = (b.rotationPeriod ? (0.015 / Math.abs(b.rotationPeriod)) : 0.008);
            b.mesh.rotation.y += rotDelta * timeSpeed;

            if (b.ringMesh && b.ringMesh.material.uniforms) {
                b.ringMesh.material.uniforms.uPlanetWorldPos.value.copy(b.mesh.position);
            }

            if (selectedBody === b) {
                const state = {
                    pos: b.mesh.position,
                    vel: b.velocity,
                    r: b.mesh.position.length(),
                    trueSpeed: b.velocity.length()
                };
                updateTelemetryUI(b, state);
                updateStateVectors(b, state);
            }
        });
    }

    // 3. Actualización de Proyectiles / Asteroides
    for (let i = projectiles.length - 1; i >= 0; i--) {
        const p = projectiles[i];
        p.lifeTime += delta * timeSpeed;

        // Guiado continuo hacia el objetivo designado para garantizar impacto 100% certero
        if (p.target && p.target.mesh && p.target.mesh.visible && !p.target.destroyed) {
            const targetPos = new THREE.Vector3();
            p.target.mesh.getWorldPosition(targetPos);
            const toTarget = new THREE.Vector3().subVectors(targetPos, p.mesh.position);
            const speed = Math.max(160.0, 180.0 * timeSpeed);
            p.velocity.copy(toTarget.normalize().multiplyScalar(speed));
        }

        p.mesh.position.addScaledVector(p.velocity, delta * timeSpeed);
        p.mesh.rotation.x += 0.04 * timeSpeed;
        p.mesh.rotation.y += 0.03 * timeSpeed;

        let collided = false;
        for (let j = 0; j < bodies.length; j++) {
            const body = bodies[j];
            if (body.destroyed || !body.mesh || !body.mesh.visible) continue;

            const bPos = new THREE.Vector3();
            body.mesh.getWorldPosition(bPos);
            const dist = p.mesh.position.distanceTo(bPos);
            const hitRadius = (body.radius || 10) * (body.radiusScale || 1.0) * 1.30 + p.radius + 8.0;

            if (dist < hitRadius || (p.target === body && dist < hitRadius * 1.6)) {
                collided = true;
                createExplosion(p.mesh.position, 3.2, 0xff5511);
                createShockwave(p.mesh.position, (body.radius || 10) * 3.5, 0xffaa44);
                
                // Transferencia física de momento lineal (Astrodinámica realista)
                if (!body.isStatic) {
                    const mBody = Math.max(0.05, (body.mass || 1.0) * (body.massScale || 1.0));
                    const mProj = p.mass || 0.5;

                    try {
                        if (!isNBodyMode) {
                            // Modo Kepleriano: obtener velocidad orbital actual
                            const currState = getKeplerianState(body, body.currentM || 0);
                            const vPlanet = currState.vel.clone();

                            // Vector de velocidad relativa
                            const vRel = new THREE.Vector3().subVectors(p.velocity, vPlanet);

                            // Fracción de impulso calibrada físicamente para que el impacto sea visible y estable
                            const impulseFraction = (mProj / (mBody + mProj)) * 0.05;
                            const deltaV = vRel.clone().multiplyScalar(impulseFraction);

                            // Nueva velocidad orbital resultante
                            const vNew = new THREE.Vector3().addVectors(vPlanet, deltaV);

                            // Posición relativa al centro gravitatorio (Sol o planeta padre si es luna)
                            let rVec = body.mesh.position.clone();
                            if (body.isMoon && body.parentBody && body.parentBody.mesh) {
                                rVec.sub(body.parentBody.mesh.position);
                            }

                            // Actualizar elementos orbitales Keplerianos mediante física vectorial
                            applyOrbitalImpulse(body, rVec, vNew);

                            // Asegurar continuidad espacial exacta sin saltos visuales
                            const newState = getKeplerianState(body, body.currentM);
                            if (body.isMoon && body.parentBody && body.parentBody.mesh) {
                                body.mesh.position.copy(body.parentBody.mesh.position).add(newState.pos);
                            } else {
                                body.mesh.position.copy(newState.pos);
                            }

                            // Reconfigurar y animar visualmente la nueva órbita
                            recalculateAndAnimateOrbit(body, 0xff7700);

                            // Clasificación astrodinámica del impacto según el ángulo de colisión
                            const vUnit = vPlanet.clone().normalize();
                            const tangDot = deltaV.dot(vUnit);
                            let dirDesc = 'oblicuo';
                            if (tangDot > 0.35 * deltaV.length()) {
                                dirDesc = 'progrado (por la espalda: acelera y expande la órbita)';
                            } else if (tangDot < -0.35 * deltaV.length()) {
                                dirDesc = 'retrógrado (de frente: frena y comprime la órbita hacia el Sol)';
                            } else if (Math.abs(deltaV.y) > 0.45 * deltaV.length()) {
                                dirDesc = 'polar / normal (altera la inclinación del plano orbital)';
                            } else {
                                dirDesc = 'radial (rota el periapsis y altera la excentricidad)';
                            }

                            logToConsole(`¡IMPACTO FÍSICO! Asteroide colisionó contra ${body.name} [Impacto ${dirDesc}]. Órbita: a=${body.orbitRadius.toFixed(0)} AU, e=${body.eccentricity.toFixed(3)}, i=${(body.inclination * 180 / Math.PI).toFixed(1)}°.`, 'warning');
                        } else {
                            // Modo N-Body gravitatorio continuo
                            const impulse = p.velocity.clone().multiplyScalar((mProj / (mBody + mProj)) * 0.4);
                            if (body.velocity) body.velocity.add(impulse);
                            logToConsole(`¡IMPACTO FÍSICO N-BODY! Impulso inercial transferido a ${body.name}.`, 'warning');
                        }
                    } catch (err) {
                        console.error('Error en resolución de colisión física:', err);
                    }
                }
                break;
            }
        }

        if (collided || p.lifeTime > 25.0) {
            scene.remove(p.mesh);
            projectiles.splice(i, 1);
        }
    }

    // 4. Actualización de Partículas Dinámicas (Explosiones)
    for (let i = dynamicParticles.length - 1; i >= 0; i--) {
        const dp = dynamicParticles[i];
        dp.age += delta * timeSpeed;
        const progress = dp.age / dp.maxAge;

        if (progress >= 1.0) {
            scene.remove(dp.mesh);
            if (dp.mesh.geometry) dp.mesh.geometry.dispose();
            dynamicParticles.splice(i, 1);
        } else {
            const posAttr = dp.mesh.geometry.attributes.position;
            for (let j = 0; j < dp.velocities.length; j++) {
                const vx = dp.velocities[j].x * delta * timeSpeed;
                const vy = dp.velocities[j].y * delta * timeSpeed;
                const vz = dp.velocities[j].z * delta * timeSpeed;
                posAttr.setXYZ(j, posAttr.getX(j) + vx, posAttr.getY(j) + vy, posAttr.getZ(j) + vz);
            }
            posAttr.needsUpdate = true;
            dp.mesh.material.opacity = (1.0 - progress);
        }
    }

    // 5. Actualización de Ondas de Choque
    for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.currentRadius += sw.growthSpeed * delta * timeSpeed;
        const progress = sw.currentRadius / sw.maxRadius;

        if (progress >= 1.0) {
            scene.remove(sw.mesh);
            if (sw.mesh.geometry) sw.mesh.geometry.dispose();
            shockwaves.splice(i, 1);
        } else {
            const inner = Math.max(0.1, sw.currentRadius - 3.5);
            sw.mesh.geometry.dispose();
            sw.mesh.geometry = new THREE.RingGeometry(inner, sw.currentRadius, 48);
            sw.mesh.material.opacity = (1.0 - progress) * 0.9;
        }
    }

    // 6. Actualización de Transiciones de Órbitas (- - - - > ------ > sólida)
    const nowSec = performance.now() * 0.001;
    for (let i = activeOrbitTransitions.length - 1; i >= 0; i--) {
        const t = activeOrbitTransitions[i];
        t.progress += (delta * timeSpeed) / t.duration;
        if (t.material && t.material.uniforms) {
            t.material.uniforms.uDashPhase.value = nowSec * 2.8;

            if (t.progress >= 1.0) {
                t.material.uniforms.uDrawProgress.value = 1.0;
                t.material.uniforms.uIsTransitioning.value = 0.0;
                t.material.uniforms.uColor.value.lerp(t.baseColor, 0.15);
                activeOrbitTransitions.splice(i, 1);
            } else {
                t.material.uniforms.uDrawProgress.value = t.progress;
            }
        } else {
            activeOrbitTransitions.splice(i, 1);
        }
    }

    // 7. Rotación de Anillos de Escombros Activos
    activeDebrisRings.forEach(dr => {
        dr.rotation.y += 0.008 * timeSpeed;
    });

    // 8. Verificación de absorción solar & Límite de Roche
    checkSolarDevourment();
    checkAllRocheLimits();

    // 9. Sol Rotación
    if (sun && sun.mesh && !sun.destroyed) {
        sun.mesh.rotation.y += 0.0006 * timeSpeed;
    }
}

// --- SISTEMA FÍSICO DE COLISIÓN DE CÁMARA (ANTI-ATRAVESAMIENTO) ---
function resolveCameraCollisions() {
    if (!camera || !bodies || bodies.length === 0) return;
    if (isTransitioningToFocus) return; // Permitir que la trayectoria de arco cinemático fluya con suavidad

    const camPos = camera.position;
    const bodyPos = new THREE.Vector3();

    for (let i = 0; i < bodies.length; i++) {
        const body = bodies[i];
        if (!body.mesh || !body.mesh.visible) continue;

        body.mesh.getWorldPosition(bodyPos);
        const dist = camPos.distanceTo(bodyPos);
        const safeRadius = (body.radius || 5) * 1.15 + 1.5;

        if (dist < safeRadius) {
            const normal = dist < 0.001 
                ? new THREE.Vector3(0, 1, 0) 
                : new THREE.Vector3().subVectors(camPos, bodyPos).normalize();
            const targetPos = bodyPos.clone().addScaledVector(normal, safeRadius);
            camPos.lerp(targetPos, 0.25);
        }
    }
}

// --- ACTUALIZACIÓN DE TELEMETRÍA Y ASTROFÍSICA EN HUD ---
function updateTelemetryUI(b, state) {
    if (!b) return;

    if (b.isStatic || b.name === 'Sol') {
        if (infoSpeed) infoSpeed.textContent = '230.00 km/s (Órbita Galáctica alrededor de Sgr A*)';
        if (infoCurrentDist) infoCurrentDist.textContent = '26,670 Años Luz (Centro Galáctico)';
        if (infoEccentricity) infoEccentricity.textContent = '0.0000 (Baricentro Central)';
        if (infoInclination) infoInclination.textContent = '60.20° (Plano Galáctico)';
        if (infoPeriod) infoPeriod.textContent = '230 Millones de años (Año Cósmico)';
        if (infoEnergyK) infoEnergyK.textContent = '5.3 × 10³⁵ J (Cinética Galáctica)';
        if (infoEnergyP) infoEnergyP.textContent = '3.828 × 10²⁶ W (Luminosidad L☉)';
        if (infoStatus) {
            infoStatus.innerHTML = '<span class="status-dot-inline" style="background:#ffe066;box-shadow:0 0 10px #ffe066;"></span> Fusión Nuclear Activa (5,778 K Fotosfera / 15M K Núcleo)';
            infoStatus.className = 'telemetry-value';
        }
        return;
    }

    if (!state) return;

    const speedKms = state.trueSpeed * 1.15;
    infoSpeed.textContent = speedKms.toFixed(2) + ' km/s';

    const auDist = (state.r / 395.0);
    if (infoCurrentDist) infoCurrentDist.textContent = auDist.toFixed(3) + ' AU';

    if (infoEccentricity) infoEccentricity.textContent = (b.eccentricity !== undefined ? b.eccentricity.toFixed(4) : '0.0000');
    if (infoInclination) {
        const deg = ((b.inclination || 0) * (180 / Math.PI)).toFixed(2);
        infoInclination.textContent = deg + '°';
    }
    const gFactor = Math.sqrt(Math.max(0.01, G / 0.05));
    if (infoPeriod) {
        if (b.isEscapingInertial) {
            infoPeriod.textContent = 'Infinito (Escape Inercial)';
        } else {
            const periodYr = (b.orbitalSpeed ? (Math.abs(0.011 / (b.orbitalSpeed * gFactor))) : 1.0);
            infoPeriod.textContent = periodYr.toFixed(2) + ' años';
        }
    }

    // Estado Térmico / Habitabilidad Dinámica & Astrofísica de Lunas
    const sun = bodies.find(body => body.isStatic || body.name === 'Sol');
    const isSunExtinct = !sun || sun.destroyed;

    if (infoStatus) {
        if (isSunExtinct) {
            if (b.isMoon) {
                const parentName = b.parentBody ? b.parentBody.name : 'su planeta matriz';
                if (b.name === 'Europa' || b.name === 'Encélado') {
                    infoStatus.innerHTML = `<span class="status-dot-inline" style="background:#00f2fe;box-shadow:0 0 8px #00f2fe;"></span> Océano Líquido Preservado (Fricción de Marea con ${parentName})`;
                    infoStatus.className = 'telemetry-value status-good';
                } else if (b.name === 'Ío') {
                    infoStatus.innerHTML = '<span class="status-dot-inline" style="background:#f59e0b;box-shadow:0 0 8px #f59e0b;"></span> Vulcanismo Activo (Mareas de Júpiter) | Sin Luz';
                    infoStatus.className = 'telemetry-value status-warning';
                } else if (b.name === 'Titán') {
                    infoStatus.innerHTML = '<span class="status-dot-inline" style="background:#8ea8ff;box-shadow:0 0 8px #8ea8ff;"></span> Nieve de Metano (-210°C) | Ligada a Saturno';
                    infoStatus.className = 'telemetry-value';
                } else {
                    infoStatus.innerHTML = `<span class="status-dot-inline" style="background:#64748b;box-shadow:0 0 8px #64748b;"></span> Noche Perpetua (-240°C) | Ligada a ${parentName} errante`;
                    infoStatus.className = 'telemetry-value';
                }
            } else if (b.isPlanet) {
                infoStatus.innerHTML = '<span class="status-dot-inline" style="background:#6366f1;box-shadow:0 0 8px #6366f1;"></span> Planeta Errante Interestelar (Inercial) | T cayendo a 2.7 K';
                infoStatus.className = 'telemetry-value status-danger';
            }
        } else if (sun && b !== sun) {
            const sunScale = (sun.radiusScale || 1.0) * (sun.massScale || 1.0);
            const lum = Math.sqrt(Math.max(0.1, sunScale));
            const distAU = (state.r || b.mesh.position.distanceTo(sun.mesh.position)) / 395.0;

            if (distAU < 0.65 * lum) {
                infoStatus.innerHTML = '<span class="status-dot-inline" style="background:#ff4444;box-shadow:0 0 8px #ff4444;"></span> Hiper-Calcinado';
                infoStatus.className = 'telemetry-value status-danger';
            } else if (distAU >= 0.82 * lum && distAU <= 1.58 * lum) {
                infoStatus.innerHTML = '<span class="status-dot-inline" style="background:#3dd598;box-shadow:0 0 8px #3dd598;"></span> Zona Habitable (Agua Líquida)';
                infoStatus.className = 'telemetry-value status-good';
            } else {
                infoStatus.innerHTML = '<span class="status-dot-inline" style="background:#8ea8ff;box-shadow:0 0 8px #8ea8ff;"></span> Congelado / Criogénico';
                infoStatus.className = 'telemetry-value';
            }
        }
    }

    const m = b.mass || 0.5;
    const v = speedKms;
    const ek = 0.5 * m * v * v;
    const ep = -(G * 50.0 * m * 15000) / Math.max(1, state.r);

    if (infoEnergyK) infoEnergyK.textContent = ek.toFixed(1) + ' MJ';
    if (infoEnergyP) infoEnergyP.textContent = ep.toFixed(1) + ' MJ';
}

// --- MODO DÍA A DÍA (TECLA E) ---
function toggleDayToDayMode() {
    isDayToDayMode = !isDayToDayMode;
    if (isDayToDayMode) {
        timeSpeed = 0.06;
        if (sliderTimeSpeed) sliderTimeSpeed.value = 0.1;
        if (valTimeSpeed) valTimeSpeed.textContent = 'Día a Día (1s=1d)';
        logToConsole('Modo Día a Día activado (Tecla E) — Velocidad temporal realista.', 'action');
    } else {
        timeSpeed = 1.0;
        if (sliderTimeSpeed) sliderTimeSpeed.value = 1.0;
        if (valTimeSpeed) valTimeSpeed.textContent = '1.0×';
        logToConsole('Modo Día a Día desactivado (Tecla E) — Velocidad estándar 1.0×.', 'system');
    }
}

// --- GENERADOR DE TOMAS CINEMATOGRÁFICAS ORDENADAS, NÍTIDAS Y VARIADAS ---
const CURATED_SHOT_STYLES = [
    'equatorial_orbit',   // Órbita circular majestuosa sobre el ecuador a distancia perfecta
    'polar_high_angle',   // Vista cenital a 45° sobre el polo norte/sur
    'sunset_terminator',  // Encuadre nítido en el terminador día/noche con brillo solar
    'ring_or_moon_vista'  // Plano amplio encuadrando el planeta y su entorno de lunas/anillos
];

function generateNextCinematicShot() {
    if (!bodies || bodies.length === 0) return null;

    // Seleccionar cuerpo celeste aleatorio evitando repetir el anterior
    const candidateBodies = bodies.filter(b => b.name !== lastShotBodyName && b.mesh && b.mesh.visible);
    const chosenBody = candidateBodies[Math.floor(Math.random() * candidateBodies.length)] || bodies[0];
    lastShotBodyName = chosenBody.name;

    const shotStyle = CURATED_SHOT_STYLES[Math.floor(Math.random() * CURATED_SHOT_STYLES.length)];

    // Distancias y ángulos calibrados específicamente para cada escala
    let targetDist = 60;
    let targetFov = 50;
    const r = chosenBody.radius || 10;

    if (chosenBody.isStatic) {
        // Sol
        targetDist = 200 + Math.random() * 40;
        targetFov = 50;
    } else if (chosenBody.isPlanet) {
        if (chosenBody.name === 'Saturno') {
            targetDist = 110 + Math.random() * 25; // Anillos amplios en cuadro completo
            targetFov = 48;
        } else if (chosenBody.name === 'Júpiter') {
            targetDist = 115 + Math.random() * 25; // Júpiter + Lunas galileanas
            targetFov = 48;
        } else if (chosenBody.name === 'Urano') {
            targetDist = 65 + Math.random() * 15;
            targetFov = 46;
        } else if (chosenBody.name === 'Neptuno') {
            targetDist = 60 + Math.random() * 15;
            targetFov = 46;
        } else if (chosenBody.name === 'Tierra') {
            targetDist = 38 + Math.random() * 10;
            targetFov = 48;
        } else if (chosenBody.name === 'Venus' || chosenBody.name === 'Marte') {
            targetDist = 32 + Math.random() * 8;
            targetFov = 48;
        } else {
            targetDist = 24 + Math.random() * 6;
            targetFov = 46;
        }
    } else if (chosenBody.isMoon) {
        targetDist = Math.max(16, r * 4.8);
        targetFov = 44;
    }

    const startAngle = Math.random() * Math.PI * 2;
    const sweepSpeed = 0.28 + Math.random() * 0.18;
    const sweepDir = Math.random() > 0.5 ? 1 : -1;
    const duration = 7.5 + Math.random() * 2.0;

    return {
        body: chosenBody,
        shotStyle: shotStyle,
        baseDist: targetDist,
        baseFov: targetFov,
        startAngle: startAngle,
        sweepSpeed: sweepSpeed * sweepDir,
        duration: duration,
        isFirstFrame: true
    };
}

// --- CONTROLADOR DE MODO CINEMÁTICO (T & SHIFT+T) ---
function toggleCinematicMode(forceState, requestedStyle) {
    if (typeof requestedStyle === 'string') {
        cinematicStyle = requestedStyle;
    }

    if (typeof forceState === 'boolean') {
        isCinematicMode = forceState;
    } else {
        isCinematicMode = !isCinematicMode;
    }

    if (btnCinematicTour) {
        if (isCinematicMode) {
            btnCinematicTour.classList.add('btn--primary');
            btnCinematicTour.classList.remove('btn--ghost');
        } else {
            btnCinematicTour.classList.remove('btn--primary');
            btnCinematicTour.classList.add('btn--ghost');
        }
    }

    if (isCinematicMode) {
        shotTimer = 0;
        currentShot = generateNextCinematicShot();

        // Limpiar selecciones
        selectedBody = null;
        focusBody = null;
        isTransitioningToFocus = false;
        isTransitioningBack = false;
        if (infoPanel) infoPanel.classList.add('is-collapsed');
        const _btnR = document.getElementById('btn-toggle-right');
        if (_btnR) {
            _btnR.classList.add('is-collapsed');
            _btnR.setAttribute('aria-expanded', 'false');
            const _ic = _btnR.querySelector('i');
            if (_ic) _ic.className = 'fa-solid fa-chevron-left';
        }
        if (velocityArrow) velocityArrow.visible = false;
        if (gravityArrow) gravityArrow.visible = false;
        updateCelestialDockActiveState(null);

        controls.enabled = false;

        if (cinematicStyle === 'intense') {
            logToConsole('Vuelo Cinemático Dinámico (Shift+T): Paneo activo de alta velocidad y zoom elástico.', 'action');
        } else {
            logToConsole('Modo Cinemático Documental (Tecla T): Tomas nítidas con encuadre centrado instantáneo.', 'action');
        }
    } else {
        controls.enabled = !isCameraLocked;
        controls.minDistance = 4;
        controls.update();
        camera.fov = baseCameraFov;
        camera.updateProjectionMatrix();
        logToConsole('Modo Cinemático desactivado.', 'system');
    }
}

// --- BLOQUEO / FIJACIÓN DE CÁMARA (TECLA U) ---
function toggleCameraLock(forceState) {
    isCameraLocked = typeof forceState === 'boolean' ? forceState : !isCameraLocked;

    if (controls) {
        controls.enableRotate = !isCameraLocked;
        controls.enablePan = !isCameraLocked;
    }

    if (btnLockCamera) {
        if (isCameraLocked) {
            btnLockCamera.classList.add('btn--primary');
            btnLockCamera.classList.remove('btn--ghost');
            btnLockCamera.innerHTML = '<i class="fa-solid fa-lock"></i> Bloqueada <span class="key-hint" style="margin-left:2px;font-size:9px;color:currentColor;">U</span>';
        } else {
            btnLockCamera.classList.remove('btn--primary');
            btnLockCamera.classList.add('btn--ghost');
            btnLockCamera.innerHTML = '<i class="fa-solid fa-lock-open"></i> Bloquear <span class="key-hint" style="margin-left:2px;font-size:9px;color:var(--accent-sand);">U</span>';
        }
    }

    logToConsole(isCameraLocked ? 'Cámara bloqueada (Tecla U) — Orientación fija.' : 'Cámara desbloqueada (Tecla U) — Control manual activo.', isCameraLocked ? 'warning' : 'action');
}

// --- NÚCLEO DE ANIMACIÓN CINEMÁTICA CON ENCUADRE NÍTIDO Y PRECISO ---
function updateCinematicCamera(delta) {
    if (!isCinematicMode || isCameraLocked) return;

    if (!currentShot) {
        currentShot = generateNextCinematicShot();
        shotTimer = 0;
    }

    shotTimer += delta;

    // Cambio de toma al expirar la duración
    if (shotTimer >= currentShot.duration) {
        shotTimer = 0;
        currentShot = generateNextCinematicShot();
        if (!currentShot) return;
    }

    const p = Math.min(1.0, shotTimer / currentShot.duration);
    const body = currentShot.body;

    const targetPos = new THREE.Vector3();
    if (body.mesh) {
        body.mesh.getWorldPosition(targetPos);
    }

    const angle = currentShot.startAngle + p * currentShot.sweepSpeed * Math.PI;
    const dist = currentShot.baseDist;
    const fovTarget = currentShot.baseFov;

    let camPos = new THREE.Vector3();

    if (currentShot.shotStyle === 'polar_high_angle') {
        // Vista a 45 grados sobre el polo
        const yH = dist * 0.65;
        const horiz = dist * 0.76;
        camPos.set(
            targetPos.x + Math.cos(angle) * horiz,
            targetPos.y + yH,
            targetPos.z + Math.sin(angle) * horiz
        );
    } else if (currentShot.shotStyle === 'sunset_terminator') {
        // Encuadre sobre el terminador (límite día/noche)
        const toSun = new THREE.Vector3().subVectors(new THREE.Vector3(0,0,0), targetPos).normalize();
        const sideDir = new THREE.Vector3(-toSun.z, 0, toSun.x).normalize();
        camPos.copy(targetPos)
            .addScaledVector(toSun, dist * 0.35)
            .addScaledVector(sideDir, dist * 0.85);
        camPos.y += dist * (0.2 + Math.sin(p * Math.PI) * 0.15);
    } else if (currentShot.shotStyle === 'ring_or_moon_vista') {
        // Ángulo oblicuo amplio para apreciar el planeta y sus lunas/anillos
        const yH = dist * (0.35 + Math.sin(p * Math.PI) * 0.15);
        camPos.set(
            targetPos.x + Math.cos(angle) * dist,
            targetPos.y + yH,
            targetPos.z + Math.sin(angle) * dist
        );
    } else {
        // Órbita circular ecuatorial majestuosa
        camPos.set(
            targetPos.x + Math.cos(angle) * dist,
            targetPos.y + dist * 0.18,
            targetPos.z + Math.sin(angle) * dist
        );
    }

    // Prevención de penetración contra planeta padre si el objetivo es una luna
    if (body.isMoon && body.parentBody && body.parentBody.mesh) {
        const parentPos = new THREE.Vector3();
        body.parentBody.mesh.getWorldPosition(parentPos);
        const distToParent = camPos.distanceTo(parentPos);
        const minParentSafe = (body.parentBody.radius || 20) * 1.45;
        if (distToParent < minParentSafe) {
            const pushDir = new THREE.Vector3().subVectors(camPos, parentPos).normalize();
            camPos.copy(parentPos).addScaledVector(pushDir, minParentSafe);
        }
    }

    if (cinematicStyle === 'documentary') {
        // MODO DOCUMENTAL: CORTE DIRECTO NÍTIDO & ENCUADRE CENTRADO INSTANTÁNEO
        if (currentShot.isFirstFrame) {
            camera.position.copy(camPos);
            controls.target.copy(targetPos);
            camera.lookAt(targetPos);
            camera.fov = fovTarget;
            camera.updateProjectionMatrix();
            currentShot.isFirstFrame = false;
        } else {
            camera.position.lerp(camPos, 0.14);
            controls.target.copy(targetPos);
            camera.lookAt(targetPos);
            camera.fov = THREE.MathUtils.lerp(camera.fov, fovTarget, 0.08);
            camera.updateProjectionMatrix();
        }
    } else {
        // MODO INTENSO: Paneo continuo con seguimiento dinámico
        const lerpCamSpeed = currentShot.isFirstFrame ? 0.22 : 0.12;
        currentShot.isFirstFrame = false;

        camera.position.lerp(camPos, lerpCamSpeed);
        controls.target.lerp(targetPos, 0.25);
        camera.lookAt(controls.target);
        camera.fov = THREE.MathUtils.lerp(camera.fov, fovTarget, 0.1);
        camera.updateProjectionMatrix();
    }
}

// --- NAVEGACIÓN Y SELECCIÓN DE CUERPOS ---
function renderCelestialDock() {
    const track = document.getElementById('dock-items-wrapper');
    if (!track) return;
    track.innerHTML = '';

    bodies.forEach(b => {
        const btn = document.createElement('button');
        btn.className = 'dock-item';
        btn.dataset.bodyName = b.name;
        btn.title = b.name + ' (' + b.type + ')';
        
        const avatarClass = 'avatar--' + b.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        
        btn.innerHTML = '<span class="dock-avatar ' + avatarClass + '"></span>' +
            '<span class="dock-label">' + b.name + '</span>';
        
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            selectBody(b, true);
            setDockMenuState(false);
        });

        track.appendChild(btn);
    });

    updateCelestialDockActiveState(selectedBody);
}

function updateCelestialDockActiveState(activeBody) {
    const currentName = document.getElementById('dock-current-name');
    const currentAvatar = document.getElementById('dock-current-avatar');
    const track = document.getElementById('dock-items-wrapper');

    if (currentName && currentAvatar) {
        if (activeBody) {
            currentName.textContent = '< ' + activeBody.name + ' >';
            const cleanName = activeBody.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            currentAvatar.className = 'dock-avatar avatar--' + cleanName;
        } else {
            currentName.textContent = '< Cuerpos Celestes >';
            currentAvatar.className = 'dock-avatar avatar--general';
        }
    }

    if (track) {
        const items = track.querySelectorAll('.dock-item');
        items.forEach(item => {
            if (activeBody && item.dataset.bodyName === activeBody.name) {
                item.classList.add('is-active');
            } else {
                item.classList.remove('is-active');
            }
        });
    }
}

function syncBottomHUDVisibility() {
    const leftP = document.querySelector('.left-panel');
    const isControlesOpen = leftP && !leftP.classList.contains('is-collapsed');
    const isTelemetryOpen = infoPanel && !infoPanel.classList.contains('is-collapsed') && !infoPanel.classList.contains('hidden');
    const invRoot = document.getElementById('investigation-root');
    const isScienceOpen = (invRoot && !invRoot.classList.contains('hidden') && invRoot.getAttribute('aria-hidden') !== 'true') || 
                          (window.EstelarisInvestigation && typeof window.EstelarisInvestigation.isOpen === 'function' && window.EstelarisInvestigation.isOpen());
    const creatorRoot = document.getElementById('planet-creator-root');
    const isCreatorOpen = creatorRoot && !creatorRoot.classList.contains('hidden');
    const qrModal = document.getElementById('desktop-qr-modal');
    const isQrOpen = qrModal && qrModal.classList.contains('is-open');

    const shouldHide = isControlesOpen || isTelemetryOpen || isScienceOpen || isCreatorOpen || isQrOpen;

    const floatingHud = document.getElementById('floating-focus-hud');
    const celestialDock = document.getElementById('celestial-dock');

    if (shouldHide) {
        document.body.classList.add('hud-panel-active');
        if (floatingHud) floatingHud.classList.add('hidden');
        if (celestialDock) celestialDock.classList.add('hidden');
    } else {
        document.body.classList.remove('hud-panel-active');
        if (celestialDock) celestialDock.classList.remove('hidden');
        if (floatingHud) {
            if (focusBody || selectedBody) {
                floatingHud.classList.remove('hidden');
            } else {
                floatingHud.classList.add('hidden');
            }
        }
    }

    if (floatingHud) {
        const isMobile = window.innerWidth <= 768;
        const isHudVisible = !floatingHud.classList.contains('hidden') && isMobile;
        document.body.classList.toggle('has-focus-hud', isHudVisible);
    }
}
window.syncEstelarisHUD = syncBottomHUDVisibility;

function updateFloatingFocusHud(activeBody) {
    const hud = document.getElementById('floating-focus-hud');
    if (!hud) return;

    if (!activeBody) {
        hud.classList.add('hidden');
        syncBottomHUDVisibility();
        return;
    }

    const nameEl = document.getElementById('focus-hud-name');
    const dotEl = document.getElementById('focus-hud-dot');

    if (nameEl) nameEl.textContent = activeBody.name || 'Astro';
    if (dotEl) {
        let hexColor = '#00f2fe';
        if (typeof activeBody.color === 'number') {
            hexColor = '#' + activeBody.color.toString(16).padStart(6, '0');
        } else if (typeof activeBody.color === 'string') {
            hexColor = activeBody.color;
        }
        dotEl.style.backgroundColor = hexColor;
        dotEl.style.boxShadow = `0 0 10px ${hexColor}`;
    }

    syncBottomHUDVisibility();
}

function updateMobileBarActiveState() {
    const mobBtnPlanets = document.getElementById('mob-btn-planets');
    const mobBtnControls = document.getElementById('mob-btn-controls');
    const mobBtnTelemetry = document.getElementById('mob-btn-telemetry');
    const leftPanel = document.querySelector('.left-panel');
    const dockMenu = document.getElementById('dock-dropdown-menu');

    if (mobBtnPlanets) {
        const isPlanetsOpen = dockMenu && !dockMenu.classList.contains('hidden');
        mobBtnPlanets.classList.toggle('is-active', !!isPlanetsOpen);
    }
    if (mobBtnControls) {
        const isControlsOpen = leftPanel && !leftPanel.classList.contains('is-collapsed');
        mobBtnControls.classList.toggle('is-active', !!isControlsOpen);
    }
    if (mobBtnTelemetry) {
        const isTelemetryOpen = infoPanel && !infoPanel.classList.contains('is-collapsed') && !infoPanel.classList.contains('hidden');
        mobBtnTelemetry.classList.toggle('is-active', !!isTelemetryOpen);
    }
}

let isDockMenuOpen = false;
function setDockMenuState(isOpen) {
    const menu = document.getElementById('dock-dropdown-menu');
    const dock = document.getElementById('celestial-dock');
    if (!menu || !dock) return;
    isDockMenuOpen = isOpen;
    if (isDockMenuOpen) {
        // Al abrir la lista de astros, cerrar paneles de Controles y Telemetría para evitar superposición
        const leftP = document.querySelector('.left-panel');
        if (leftP && !leftP.classList.contains('is-collapsed')) {
            leftP.classList.add('is-collapsed');
            const btnL = document.getElementById('btn-toggle-left');
            if (btnL) {
                btnL.classList.add('is-collapsed');
                btnL.setAttribute('aria-expanded', 'false');
                const icon = btnL.querySelector('i');
                if (icon) icon.className = 'fa-solid fa-chevron-right';
            }
        }
        hideTelemetryPanel();

        menu.classList.remove('hidden');
        dock.classList.add('is-open');
    } else {
        menu.classList.add('hidden');
        dock.classList.remove('is-open');
    }
    updateMobileBarActiveState();
    syncBottomHUDVisibility();
}

function hideTelemetryPanel() {
    if (!infoPanel) return;
    infoPanel.classList.add('is-collapsed');
    const _btnR = document.getElementById('btn-toggle-right');
    if (_btnR) {
        _btnR.classList.add('is-collapsed');
        _btnR.setAttribute('aria-expanded', 'false');
        const _ic = _btnR.querySelector('i');
        if (_ic) _ic.className = 'fa-solid fa-chevron-left';
    }
    updateMobileBarActiveState();
    syncBottomHUDVisibility();
}

function selectBody(body, autoFocus = true, openTelemetry = false) {
    if (!body) return;

    if (selectedBody === body && focusBody === body && !isTransitioningToFocus) {
        if (openTelemetry && infoPanel) {
            infoPanel.classList.remove('hidden');
            infoPanel.classList.remove('is-collapsed');
            updateMobileBarActiveState();
        }
        return;
    }

    selectedBody = body;

    if (infoName) infoName.textContent = body.name;
    if (infoType) infoType.textContent = body.type;

    if (body.isStatic || body.name === 'Sol') {
        if (infoRadius) infoRadius.textContent = '696,340 km (Diámetro: 1,392,700 km — 109× Tierra)';
        const massScaled = (1.989 * (body.massScale || 1.0)).toFixed(3);
        const earthMasses = Math.round(333000 * (body.massScale || 1.0)).toLocaleString();
        if (infoMass) infoMass.textContent = `${massScaled} × 10³⁰ kg (${earthMasses} M⊕ — 99.86% masa total)`;
    } else {
        if (infoRadius) infoRadius.textContent = (body.realRadius || (body.radius * 200).toFixed(0)) + ' km';
        if (infoMass) infoMass.textContent = (body.mass || 1.0).toFixed(2) + ' U.M.';
    }
    
    if (sliderBodyRadius) sliderBodyRadius.value = (body.radiusScale || 1.0).toString();
    if (valBodyRadius) valBodyRadius.textContent = (body.radiusScale || 1.0).toFixed(1) + '×';
    if (sliderBodyMass) sliderBodyMass.value = (body.massScale || 1.0).toString();
    if (valBodyMass) valBodyMass.textContent = (body.massScale || 1.0).toFixed(1) + '×';

    if (body.isStatic || body.name === 'Sol') {
        if (infoSpeed) infoSpeed.textContent = '230.00 km/s (Órbita Galáctica alrededor de Sgr A*)';
        if (infoStatus) infoStatus.innerHTML = '<span class="status-dot-inline" style="background:#ffe066;box-shadow:0 0 10px #ffe066;"></span> Fusión Nuclear Activa (5,778 K Fotosfera / 15M K Núcleo)';
    } else {
        if (infoStatus) {
            infoStatus.innerHTML = '<span class="status-dot-inline"></span> Órbita Estable';
            infoStatus.className = 'telemetry-value status-good';
        }
    }

    // La telemetría permanece limpia/cerrada a menos que se solicite expresamente o ya estuviera abierta
    const isTelemetryAlreadyOpen = infoPanel && !infoPanel.classList.contains('hidden') && !infoPanel.classList.contains('is-collapsed');
    if (openTelemetry || isTelemetryAlreadyOpen) {
        if (infoPanel) {
            infoPanel.classList.remove('hidden');
            infoPanel.classList.remove('is-collapsed');
        }
        const _btnR = document.getElementById('btn-toggle-right');
        if (_btnR) {
            _btnR.classList.remove('is-collapsed');
            _btnR.setAttribute('aria-expanded', 'true');
            const _ic = _btnR.querySelector('i');
            if (_ic) _ic.className = 'fa-solid fa-chevron-right';
            _btnR.style.opacity = '1';
            _btnR.style.pointerEvents = 'auto';
        }
    } else {
        if (infoPanel) infoPanel.classList.add('is-collapsed');
    }

    updateCelestialDockActiveState(body);
    updateFloatingFocusHud(body);
    updateMobileBarActiveState();
    syncBottomHUDVisibility();

    if (autoFocus) {
        focusCameraOnBody(body);
    } else {
        updateFocusButtonState();
    }
}

function deselectBody() {
    const prevName = selectedBody ? selectedBody.name : 'cuerpo';
    selectedBody = null;
    focusBody = null;
    isTransitioningToFocus = false;
    if (controls) controls.minDistance = 4;

    infoPanel.classList.add('is-collapsed');
    const _btnR = document.getElementById('btn-toggle-right');
    if (_btnR) {
        _btnR.classList.add('is-collapsed');
        _btnR.setAttribute('aria-expanded', 'false');
        const _ic = _btnR.querySelector('i');
        if (_ic) _ic.className = 'fa-solid fa-chevron-left';
    }

    if (velocityArrow) velocityArrow.visible = false;
    if (gravityArrow) gravityArrow.visible = false;

    updateCelestialDockActiveState(null);
    updateFloatingFocusHud(null);
    syncBottomHUDVisibility();

    if (hasSavedPreFocus) {
        isTransitioningBack = true;
    }
    updateFocusButtonState();
    logToConsole('Telemetría de ' + prevName + ' cerrada — cámara restaurada.', 'system');
}

function focusCameraOnBody(body) {
    if (!body || !body.mesh) return;

    if (!hasSavedPreFocus && !focusBody) {
        savedPreFocusCameraPos.copy(camera.position);
        savedPreFocusControlsTarget.copy(controls.target);
        hasSavedPreFocus = true;
    }

    focusBody = body;
    const bodyPos = new THREE.Vector3();
    body.mesh.getWorldPosition(bodyPos);

    // Distancia mínima de seguridad para el zoom con ratón
    const safeMin = Math.max(3.0, (body.radius || 4) * 1.35);
    if (controls) controls.minDistance = safeMin;

    const fitDist = Math.max(12, body.radius * 3.6);

    if (body.isMoon && body.parentBody && body.parentBody.mesh) {
        const parentPos = new THREE.Vector3();
        body.parentBody.mesh.getWorldPosition(parentPos);
        const awayDir = new THREE.Vector3().subVectors(bodyPos, parentPos).normalize();
        focusOffset.copy(awayDir).multiplyScalar(fitDist * 1.15).add(new THREE.Vector3(0, fitDist * 0.45, 0));
    } else {
        focusOffset.set(fitDist * 0.7, fitDist * 0.45, fitDist * 0.85);
    }

    transitionStartCamPos.copy(camera.position);
    transitionStartControlsTarget.copy(controls.target);
    transitionProgress = 0;
    isTransitioningToFocus = true;
    isTransitioningBack = false;

    updateFocusButtonState();
    logToConsole('Enfocando trayectoria de ' + body.name + '...', 'action');
}

function unfocusCamera() {
    focusBody = null;
    isTransitioningToFocus = false;
    if (controls) controls.minDistance = 4;
    if (hasSavedPreFocus) isTransitioningBack = true;
    updateFocusButtonState();
}

function updateFocusButtonState() {
    if (!btnFocusBody || !btnFocusText) return;
    if (focusBody) {
        btnFocusText.textContent = 'Liberar cámara';
        btnFocusBody.className = 'btn btn--ghost btn--full';
    } else {
        btnFocusText.textContent = 'Enfocar cámara';
        btnFocusBody.className = 'btn btn--primary btn--full';
    }
}

function navigateCelestialBody(direction = 1) {
    if (!bodies || bodies.length === 0) return;
    let currentIndex = -1;
    if (selectedBody) currentIndex = bodies.findIndex(b => b.name === selectedBody.name);
    
    let nextIndex;
    if (currentIndex === -1) {
        nextIndex = direction > 0 ? 0 : bodies.length - 1;
    } else {
        nextIndex = (currentIndex + direction + bodies.length) % bodies.length;
    }
    selectBody(bodies[nextIndex], true, false);
}

function updateBodyCount() {
    if (statBodies) statBodies.textContent = bodies.length;
    const pillSummaryBodies = document.getElementById('pill-summary-bodies');
    if (pillSummaryBodies) pillSummaryBodies.textContent = bodies.length + ' astros';
}

// --- INTERACCIÓN CON EL RATÓN & ESCENA (TÁCTIL Y CLIC) ---
function isInteractiveUiElement(target) {
    if (!target) return false;
    return !!target.closest('.hud-header, .header-actions, .cosmic-metrics-pill, .hud-sidebar:not(.is-collapsed), .panel-toggle, .celestial-dock.is-open, .mobile-bottom-bar, button, input, select, textarea, label, a, .modal-backdrop, .qr-modal-backdrop, .investigation-root:not(.hidden), .planet-creator-root:not(.hidden)');
}

function performRaycastSelection(clientX, clientY) {
    mouse.x = (clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const meshes = bodies.map(b => b.mesh).filter(m => m && m.visible);
    
    // Probar primero los cuerpos principales directamente sin capas hijas
    let intersects = raycaster.intersectObjects(meshes, false);
    if (intersects.length === 0) {
        // Si no hay impacto directo en la esfera, buscar en hijos (ej. corona solar)
        intersects = raycaster.intersectObjects(meshes, true);
    }

    if (intersects.length > 0) {
        let hitObj = intersects[0];
        // Si el primer impacto es el planeta ya enfocado y hay otro planeta en la línea de visión, seleccionar el otro
        if (selectedBody && hitObj.object && hitObj.object.userData && hitObj.object.userData.body === selectedBody && intersects.length > 1) {
            hitObj = intersects[1];
        }

        let hitMesh = hitObj.object;
        while (hitMesh && (!hitMesh.userData || !hitMesh.userData.body) && hitMesh.parent) {
            hitMesh = hitMesh.parent;
        }
        if (hitMesh && hitMesh.userData && hitMesh.userData.body) {
            selectBody(hitMesh.userData.body, true, false);
            return true;
        }
    }
    return false;
}

let lastTapProcessedTime = 0;
function onScenePointerUp(event) {
    if (isInteractiveUiElement(event.target)) return;

    const moveDist = Math.hypot(event.clientX - touchDragStartX, event.clientY - touchDragStartY);
    const duration = performance.now() - touchDragStartTime;
    if (moveDist > 20 || duration > 360) return;

    if (performance.now() - lastTapProcessedTime < 220) return;
    lastTapProcessedTime = performance.now();

    performRaycastSelection(event.clientX, event.clientY);
}

function onSceneClick(event) {
    if (isInteractiveUiElement(event.target)) return;

    const moveDist = Math.hypot(event.clientX - touchDragStartX, event.clientY - touchDragStartY);
    if (moveDist > 16) return;

    if (performance.now() - lastTapProcessedTime < 220) return;
    lastTapProcessedTime = performance.now();

    performRaycastSelection(event.clientX, event.clientY);
}

function onPointerMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const meshes = bodies.map(b => b.mesh).filter(m => m && m.visible);
    const intersects = raycaster.intersectObjects(meshes, false);

    if (intersects.length > 0) {
        let hitMesh = intersects[0].object;
        while (hitMesh && !hitMesh.userData.body && hitMesh.parent) {
            hitMesh = hitMesh.parent;
        }
        if (hitMesh && hitMesh.userData.body) {
            hoveredBody = hitMesh.userData.body;
            document.body.style.cursor = 'pointer';
            return;
        }
    }
    hoveredBody = null;
    document.body.style.cursor = 'default';
}

function onKeyDown(e) {
    if (e.target.tagName === 'INPUT') return;

    if ((e.ctrlKey || e.metaKey) && (e.key === 'i' || e.key === 'I')) {
        e.preventDefault();
        if (window.EstelarisInvestigation && window.EstelarisInvestigation.isOpen()) {
            window.EstelarisInvestigation.close();
        } else {
            openInvestigationMode(selectedBody);
        }
        return;
    }

    if ((e.ctrlKey || e.metaKey) && (e.key === 'g' || e.key === 'G')) {
        e.preventDefault();
        openPlanetCreatorMode();
        return;
    }

    if (e.key === 'f' || e.key === 'F') {
        if (selectedBody) {
            if (focusBody) unfocusCamera();
            else focusCameraOnBody(selectedBody);
        }
    } else if (e.key === 'k' || e.key === 'K') {
        e.preventDefault();
        launchAsteroid(selectedBody || null);
    } else if (e.key === 'h' || e.key === 'H') {
        e.preventDefault();
        if (chkHabitableZone) {
            chkHabitableZone.checked = !chkHabitableZone.checked;
            chkHabitableZone.dispatchEvent(new Event('change'));
        }
    } else if (e.key === 't' || e.key === 'T') {
        e.preventDefault();
        if (e.shiftKey) {
            toggleCinematicMode(null, 'intense');
        } else {
            toggleCinematicMode(null, 'documentary');
        }
    } else if (e.key === 'u' || e.key === 'U') {
        e.preventDefault();
        toggleCameraLock();
    } else if (e.key === 'e' || e.key === 'E') {
        e.preventDefault();
        toggleDayToDayMode();
    } else if (e.key === 'Escape') {
        if (isDockMenuOpen) setDockMenuState(false);
        else if (focusBody) unfocusCamera();
        else if (selectedBody) deselectBody();
    } else if (e.key === 'r' || e.key === 'R') {
        resetCamera();
    } else if (e.key === 'ArrowLeft') {
        navigateCelestialBody(-1);
    } else if (e.key === 'ArrowRight') {
        navigateCelestialBody(1);
    } else if (e.key === 'l' || e.key === 'L' || e.code === 'Space') {
        e.preventDefault();
        togglePlayPause();
    } else if (e.key === 'F2') {
        e.preventDefault();
        if (chkOrbits) {
            chkOrbits.checked = !chkOrbits.checked;
            chkOrbits.dispatchEvent(new Event('change'));
        }
    } else if (e.key === 'F6') {
        e.preventDefault();
        if (chkVectors) {
            chkVectors.checked = !chkVectors.checked;
            chkVectors.dispatchEvent(new Event('change'));
        }
    } else if (e.key === 'F7') {
        e.preventDefault();
        if (chkGravityField) {
            chkGravityField.checked = !chkGravityField.checked;
            chkGravityField.dispatchEvent(new Event('change'));
        }
    } else if (e.key === 'F4') {
        e.preventDefault();
        if (chkGrid) {
            chkGrid.checked = !chkGrid.checked;
            chkGrid.dispatchEvent(new Event('change'));
        }
    } else if (e.key === 'F8') {
        e.preventDefault();
        toggleHudVisibility();
    }
}

function togglePlayPause() {
    isPaused = !isPaused;
    if (btnPlayPause) {
        if (isPaused) {
            btnPlayPause.innerHTML = '<i class="fa-solid fa-play"></i> Reanudar <span class="key-hint" style="margin-left:4px;font-size:9px;color:inherit;opacity:0.75;padding:1px 4px;border-radius:3px;border:1px solid currentColor;">L</span>';
            btnPlayPause.className = 'btn btn--ghost';
            logToConsole('Simulación en pausa (Tecla L).', 'warning');
        } else {
            btnPlayPause.innerHTML = '<i class="fa-solid fa-pause"></i> Pausar <span class="key-hint" style="margin-left:4px;font-size:9px;color:inherit;opacity:0.75;padding:1px 4px;border-radius:3px;border:1px solid rgba(0,0,0,0.3);">L</span>';
            btnPlayPause.className = 'btn btn--primary';
            logToConsole('Simulación reanudada (Tecla L).', 'action');
        }
    }
}

let isHudHidden = false;
function toggleHudVisibility() {
    isHudHidden = !isHudHidden;
    document.body.classList.toggle('hud-hidden', isHudHidden);
    logToConsole(isHudHidden ? 'Modo inmersivo activado (F8).' : 'Interfaz de usuario restaurada (F8).', 'system');
}

function resetCamera() {
    if (!camera || !controls) return;
    if (isCinematicMode) toggleCinematicMode(false);
    if (isCameraLocked) toggleCameraLock(false);
    controls.minDistance = 4;
    camera.position.copy(initialCameraPos);
    controls.target.copy(initialControlsTarget);
    controls.update();
    focusBody = null;
    logToConsole('Cámara restablecida — vista cenital.', 'system');
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    if (window.innerWidth < 768 && window.innerHeight > window.innerWidth) {
        camera.fov = 72;
    } else {
        camera.fov = baseCameraFov || 60;
    }
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    resizeWarpCanvas();
}

// --- CARGA MODULAR DEL MODO INVESTIGATIVO (investigacion.html / js / css) ---
let isInvestigationLoaded = false;

async function openInvestigationMode(targetBody) {
    const root = document.getElementById('investigation-root');
    if (!root) return;

    const bodyName = targetBody ? targetBody.name : (selectedBody ? selectedBody.name : 'Tierra');

    if (!isInvestigationLoaded) {
        try {
            const resp = await fetch('investigacion.html');
            const html = await resp.text();
            root.innerHTML = html;

            if (!window.EstelarisInvestigation) {
                await new Promise((resolve, reject) => {
                    const script = document.createElement('script');
                    script.src = 'investigacion.js';
                    script.onload = resolve;
                    script.onerror = reject;
                    document.body.appendChild(script);
                });
            }

            if (window.EstelarisInvestigation) {
                window.EstelarisInvestigation.init();
            }

            isInvestigationLoaded = true;
        } catch (err) {
            console.error('Error cargando investigacion.html:', err);
            logToConsole('Error al cargar la interfaz de investigación.', 'danger');
            return;
        }
    }

    if (window.EstelarisInvestigation) {
        window.EstelarisInvestigation.open(bodyName);
        logToConsole('Laboratorio Astrofísico: Analizando capas internas de ' + bodyName + '.', 'system');
        setDockMenuState(false);
        syncBottomHUDVisibility();
    }
}

// --- CARGA MODULAR DEL CREADOR PLANETARIO & LABORATORIO QUÍMICO ---
let isPlanetCreatorLoaded = false;

async function openPlanetCreatorMode() {
    const root = document.getElementById('planet-creator-root');
    if (!root) return;

    if (!isPlanetCreatorLoaded) {
        try {
            const resp = await fetch('creador.html');
            const html = await resp.text();
            root.innerHTML = html;

            if (!window.EstelarisPlanetCreator) {
                await new Promise((resolve, reject) => {
                    const script = document.createElement('script');
                    script.src = 'creador.js';
                    script.onload = resolve;
                    script.onerror = reject;
                    document.body.appendChild(script);
                });
            }

            if (window.EstelarisPlanetCreator) {
                window.EstelarisPlanetCreator.init();
            }

            isPlanetCreatorLoaded = true;
        } catch (err) {
            console.error('Error cargando creador.html:', err);
            logToConsole('Error al cargar la interfaz de Génesis Planetario.', 'danger');
            return;
        }
    }

    if (window.EstelarisPlanetCreator) {
        window.EstelarisPlanetCreator.open();
        logToConsole('Génesis Planetario: Laboratorio de Astroquímica activo.', 'system');
        setDockMenuState(false);
        syncBottomHUDVisibility();
    }
}

// --- SISTEMA DE GESTIÓN DE SISTEMAS PLANETARIOS & EXOPLANETAS ---
let currentSystemMode = 'solar'; // 'solar' | 'custom'
let cachedSolarBodies = null;
let customHostStarBody = null;
let currentCustomSystemName = '';

function restoreSolarSystem() {
    if (currentSystemMode === 'solar' || !cachedSolarBodies) return;

    // 1. Limpiar cuerpos del sistema custom actual
    bodies.forEach(b => {
        if (b.mesh) scene.remove(b.mesh);
        if (b.orbitLine) scene.remove(b.orbitLine);
    });
    bodies = [];

    // Limpiar decoraciones cósmicas custom
    if (customDecorationsGroup) {
        scene.remove(customDecorationsGroup);
        customDecorationsGroup = null;
    }

    // 2. Restaurar cuerpos originales del Sistema Solar
    bodies = [...cachedSolarBodies];
    bodies.forEach(b => {
        if (b.mesh) scene.add(b.mesh);
        if (b.orbitLine) scene.add(b.orbitLine);
    });

    // 3. Restaurar cinturones
    if (asteroidBeltParticles) asteroidBeltParticles.visible = true;
    if (kuiperBeltParticles) kuiperBeltParticles.visible = true;

    // 4. Restaurar luz solar
    if (sunLight) {
        sunLight.color.setHex(0xfffaed);
        sunLight.intensity = 1.3;
    }

    currentSystemMode = 'solar';
    customHostStarBody = null;

    // 5. Restaurar UI
    const btnReturn = document.getElementById('btn-return-solar-system');
    if (btnReturn) btnReturn.classList.add('hidden');

    createHabitableZoneMesh();
    renderCelestialDock();
    updateBodyCount();
    resetCamera();

    logToConsole('Sistema Solar primigenio restaurado.', 'system');
}

// Crea la estrella central custom con su radiación e iluminación espectral
function createCustomStarBody(starData) {
    const starType = starData.type || 'G';
    let starRadius = 26;
    let starColor = 0xfffaed;
    let starLum = starData.luminosity || 1.0;
    let starMass = starData.mass || 1.0;

    if (starType === 'M') {
        starRadius = 18;
        starColor = 0xff4433;
    } else if (starType === 'F') {
        starRadius = 36;
        starColor = 0xd6e8ff;
    } else if (starType === 'WD') {
        starRadius = 10;
        starColor = 0xc084fc;
    }

    const starGeo = new THREE.SphereGeometry(starRadius, 48, 48);
    const starMat = new THREE.MeshBasicMaterial({
        color: starColor
    });
    const starMesh = new THREE.Mesh(starGeo, starMat);
    starMesh.position.set(0, 0, 0);

    // Corona / Resplandor atmosférico de la estrella
    const coronaGeo = new THREE.SphereGeometry(starRadius * 1.35, 32, 32);
    const coronaMat = new THREE.MeshBasicMaterial({
        color: starColor,
        transparent: true,
        opacity: 0.35,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending
    });
    const coronaMesh = new THREE.Mesh(coronaGeo, coronaMat);
    starMesh.add(coronaMesh);

    scene.add(starMesh);

    // Calibrar la luz direccional y de escena
    if (sunLight) {
        sunLight.color.setHex(starColor);
        sunLight.intensity = Math.max(0.6, starLum * 1.4);
    }

    const starBody = {
        name: starData.name || `Estrella ${starType}`,
        radius: starRadius,
        baseRadius: starRadius,
        mass: 1000 * starMass,
        baseMass: 1000 * starMass,
        mesh: starMesh,
        isStar: true,
        isStatic: true,
        luminosity: starLum,
        colorHex: starColor,
        type: `Estrella ${starData.name || starType}`,
        realRadius: `${Math.round(starRadius * 25000).toLocaleString()} km`,
        velocity: new THREE.Vector3(),
        destroyed: false
    };

    starMesh.userData = { body: starBody };
    return starBody;
}

// Crea la malla física y órbita de un planeta custom
function createCustomPlanetBody(planetConfig, hostStar) {
    const orbitRadius = Math.max(130, Math.round(planetConfig.distanceAU * 395));
    const visualRadius = Math.max(3.2, Math.min(28.0, 8.8 * planetConfig.radiusScale));
    const mass = Math.max(0.05, 0.65 * planetConfig.massScale);
    const starMassFactor = (hostStar && hostStar.mass) ? Math.sqrt(hostStar.mass / 1000) : 1.0;
    const orbitalSpeed = (0.22 / Math.sqrt(orbitRadius)) * starMassFactor;

    let tex;
    if (planetConfig.proceduralCanvas) {
        tex = new THREE.CanvasTexture(planetConfig.proceduralCanvas);
    } else {
        tex = createSolidColorTexture('#4aa3df');
    }

    const geo = new THREE.SphereGeometry(visualRadius, 40, 40);
    const mat = new THREE.ShaderMaterial({
        uniforms: {
            uMap: { value: tex },
            uSunIntensity: { value: 1.0 }
        },
        vertexShader: planetVertexShader,
        fragmentShader: planetFragmentShader
    });

    const mesh = new THREE.Mesh(geo, mat);
    mesh.castShadow = true;

    // Atmósfera
    let atmoMesh = null;
    if (planetConfig.hasAtmosphere) {
        const atmoGeo = new THREE.SphereGeometry(visualRadius * 1.08, 36, 36);
        const atmoMat = new THREE.ShaderMaterial({
            uniforms: {
                uAtmosphereColor: { value: new THREE.Color(planetConfig.atmosphereColor || 0x4aa3df) },
                uIntensity: { value: 0.65 },
                uSunIntensity: { value: 1.0 }
            },
            vertexShader: atmosphereVertexShader,
            fragmentShader: atmosphereFragmentShader,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            side: THREE.BackSide
        });
        atmoMesh = new THREE.Mesh(atmoGeo, atmoMat);
        mesh.add(atmoMesh);
    }

    // Anillos
    let ringMesh = null;
    if (planetConfig.hasRings) {
        const ringGeo = createCustomRingGeometry(visualRadius * 1.4, visualRadius * 2.3, 64);
        const ringTex = createRealisticRingTexture();
        const ringMat = new THREE.ShaderMaterial({
            uniforms: {
                uRingTexture: { value: ringTex },
                uPlanetWorldPos: { value: new THREE.Vector3() },
                uPlanetRadius: { value: visualRadius },
                uSunIntensity: { value: 1.0 }
            },
            vertexShader: ringVertexShader,
            fragmentShader: ringFragmentShader,
            side: THREE.DoubleSide,
            transparent: true,
            depthWrite: false
        });
        ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.rotation.x = Math.PI / 2;
        mesh.add(ringMesh);
    }

    const pData = {
        name: planetConfig.name || 'Exoplaneta Custom',
        radius: visualRadius,
        orbitRadius: orbitRadius,
        eccentricity: planetConfig.eccentricity || 0.016,
        inclination: 0.012,
        ascendingNode: Math.random() * Math.PI * 2,
        argPeriapsis: Math.random() * Math.PI * 2,
        meanAnomaly: Math.random() * Math.PI * 2,
        orbitalSpeed: orbitalSpeed,
        mass: mass,
        realRadius: Math.round(planetConfig.radiusScale * 6371).toLocaleString(),
        type: planetConfig.physicsData ? planetConfig.physicsData.planetClass : 'Planeta Custom',
        hasAtmosphere: planetConfig.hasAtmosphere,
        axialTilt: 0.35,
        rotationPeriod: 1.2
    };

    const orbitLine = createKeplerianOrbitLine(pData, 0x3dd598);
    scene.add(orbitLine);
    scene.add(mesh);

    const bodyObj = {
        ...pData,
        mesh: mesh,
        atmoMesh: atmoMesh,
        ringMesh: ringMesh,
        orbitLine: orbitLine,
        isPlanet: true,
        baseRadius: visualRadius,
        radiusScale: 1.0,
        baseMass: mass,
        massScale: 1.0,
        baseOrbitRadius: orbitRadius,
        baseEccentricity: pData.eccentricity,
        baseInclination: pData.inclination,
        baseArgPeriapsis: pData.argPeriapsis,
        baseAscendingNode: pData.ascendingNode,
        baseOrbitalSpeed: pData.orbitalSpeed,
        velocity: new THREE.Vector3(),
        destroyed: false,
        isNBody: false,
        currentM: pData.meanAnomaly
    };

    mesh.userData = { body: bodyObj };
    return bodyObj;
}

// --- DECORACIONES CÓSMICAS PARA SISTEMAS CUSTOM ---
let customDecorationsGroup = null;

function createCustomSystemDecorations(starConfig, planetConfig) {
    if (customDecorationsGroup) {
        scene.remove(customDecorationsGroup);
        customDecorationsGroup = null;
    }

    customDecorationsGroup = new THREE.Group();
    customDecorationsGroup.name = 'customDecorationsGroup';

    // Determinar colores según tipo espectral de la estrella
    let baseColor = new THREE.Color(0xd6c7a8); // Arena / polvo circunestelar por defecto
    const sType = (starConfig && starConfig.type) ? starConfig.type : 'G';
    if (sType === 'M') baseColor = new THREE.Color(0xff7755); // Rojizo para enanas rojas
    else if (sType === 'F') baseColor = new THREE.Color(0x99bbff); // Azulado para estrellas tipo F
    else if (sType === 'WD') baseColor = new THREE.Color(0x70d6ff); // Cian / violeta para enanas blancas

    // 1. Anillo de Polvo Protoplanetario y Escombros Circunestelares
    const planetDist = (planetConfig && planetConfig.distanceAU) ? planetConfig.distanceAU * 90 : 160;
    const ringInner = Math.max(80, planetDist * 1.35);
    const ringOuter = ringInner * 1.6;
    const particleCount = 850;

    const dustGeo = new THREE.BufferGeometry();
    const dustPos = new Float32Array(particleCount * 3);
    const dustColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
        const rad = ringInner + Math.random() * (ringOuter - ringInner);
        const theta = Math.random() * Math.PI * 2;
        const y = (Math.random() - 0.5) * 8.0;

        dustPos[i * 3] = rad * Math.cos(theta);
        dustPos[i * 3 + 1] = y;
        dustPos[i * 3 + 2] = rad * Math.sin(theta);

        const shade = 0.65 + Math.random() * 0.45;
        dustColors[i * 3] = baseColor.r * shade;
        dustColors[i * 3 + 1] = baseColor.g * shade;
        dustColors[i * 3 + 2] = baseColor.b * shade;
    }

    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
    dustGeo.setAttribute('color', new THREE.BufferAttribute(dustColors, 3));

    const dustMat = new THREE.PointsMaterial({
        size: 2.4,
        vertexColors: true,
        transparent: true,
        opacity: 0.78,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    const dustPoints = new THREE.Points(dustGeo, dustMat);
    dustPoints.userData = { isRotatingRing: true, rotSpeed: 0.0007 };
    customDecorationsGroup.add(dustPoints);

    // 2. Nube / Halo de Gas Interestelar y Polvo Cósmico Periférico
    const nebulaCount = 500;
    const nebGeo = new THREE.BufferGeometry();
    const nebPos = new Float32Array(nebulaCount * 3);
    const nebColors = new Float32Array(nebulaCount * 3);

    for (let i = 0; i < nebulaCount; i++) {
        const dist = 380 + Math.random() * 550;
        const theta = Math.random() * Math.PI * 2;
        const phi = (Math.random() - 0.5) * Math.PI * 0.45;

        nebPos[i * 3] = dist * Math.cos(theta) * Math.cos(phi);
        nebPos[i * 3 + 1] = dist * Math.sin(phi);
        nebPos[i * 3 + 2] = dist * Math.sin(theta) * Math.cos(phi);

        nebColors[i * 3] = baseColor.r * 0.5 + Math.random() * 0.3;
        nebColors[i * 3 + 1] = baseColor.g * 0.5 + Math.random() * 0.2;
        nebColors[i * 3 + 2] = baseColor.b * 0.7 + Math.random() * 0.3;
    }

    nebGeo.setAttribute('position', new THREE.BufferAttribute(nebPos, 3));
    nebGeo.setAttribute('color', new THREE.BufferAttribute(nebColors, 3));

    const nebMat = new THREE.PointsMaterial({
        size: 5.0,
        vertexColors: true,
        transparent: true,
        opacity: 0.42,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    const nebPoints = new THREE.Points(nebGeo, nebMat);
    nebPoints.userData = { isRotatingNebula: true, rotSpeed: 0.00025 };
    customDecorationsGroup.add(nebPoints);

    scene.add(customDecorationsGroup);
}

// Punto de entrada invocado desde creador.js para construir o actualizar sistemas
window.buildOrUpdateCustomSystem = function(systemConfig) {
    if (!scene) return;

    // --- FUNDAR SISTEMA EXOPLANETARIO INDEPENDIENTE & AISLADO ---
    // Regla solicitada: Al crear un planeta nuevo, se genera SIEMPRE su propio sistema estelar independiente
    // con la estrella anfitriona, el planeta solo y decoraciones cósmicas. NUNCA se inyecta en el Sistema Solar normal.
    if (currentSystemMode === 'solar') {
        // Guardar Sistema Solar nativo
        cachedSolarBodies = [...bodies];
        bodies.forEach(b => {
            if (b.mesh) scene.remove(b.mesh);
            if (b.orbitLine) scene.remove(b.orbitLine);
        });
        if (asteroidBeltParticles) asteroidBeltParticles.visible = false;
        if (kuiperBeltParticles) kuiperBeltParticles.visible = false;
        bodies = [];
        currentSystemMode = 'custom';
    } else {
        // Si ya estábamos en un sistema custom previo, limpiar para generar el nuevo sistema limpio
        bodies.forEach(b => {
            if (b.mesh) scene.remove(b.mesh);
            if (b.orbitLine) scene.remove(b.orbitLine);
        });
        bodies = [];
        customHostStarBody = null;
    }

    // Limpiar decoraciones previas si existían
    if (customDecorationsGroup) {
        scene.remove(customDecorationsGroup);
        customDecorationsGroup = null;
    }

    // 1. Crear la Estrella Central Custom
    customHostStarBody = createCustomStarBody(systemConfig.star);
    bodies.push(customHostStarBody);

    // 2. Crear los planetas del sistema (el planeta creado solo)
    let focusedPlanet = null;
    if (Array.isArray(systemConfig.planets) && systemConfig.planets.length > 0) {
        systemConfig.planets.forEach(pConf => {
            const pBody = createCustomPlanetBody(pConf, customHostStarBody);
            bodies.push(pBody);
            focusedPlanet = pBody;
        });
    } else if (systemConfig.planet) {
        const pBody = createCustomPlanetBody(systemConfig.planet, customHostStarBody);
        bodies.push(pBody);
        focusedPlanet = pBody;
    }

    // 3. Crear Decoraciones Cósmicas Exclusivas (Anillo de polvo circunestelar y halo de nebulosa)
    createCustomSystemDecorations(systemConfig.star, systemConfig.planet || (systemConfig.planets ? systemConfig.planets[0] : null));

    // 4. Actualizar Zona de Habitabilidad 3D alrededor de la estrella anfitriona
    createHabitableZoneMesh();

    // 5. Mostrar botón para regresar al Sistema Solar
    const btnReturn = document.getElementById('btn-return-solar-system');
    if (btnReturn) btnReturn.classList.remove('hidden');

    // 6. Actualizar interfaz y enfocar el planeta recién creado
    renderCelestialDock();
    updateBodyCount();
    if (focusedPlanet) {
        selectBody(focusedPlanet, true);
    } else if (customHostStarBody) {
        selectBody(customHostStarBody, true);
    }

    currentCustomSystemName = systemConfig.systemName || ('Sistema ' + (focusedPlanet ? focusedPlanet.name : 'Exoplanetario'));
    logToConsole(`¡Nuevo sistema "${currentCustomSystemName}" generado con éxito! Contiene la estrella ${systemConfig.star.name}, el planeta ${focusedPlanet ? focusedPlanet.name : ''} y decoraciones cósmicas.`, 'success');
};

// Mantener compatibilidad con llamadas directas anteriores
window.injectCustomPlanetFromCreator = function(planetConfig) {
    window.buildOrUpdateCustomSystem({
        systemName: planetConfig.systemName || ('Sistema ' + (planetConfig.name || 'Custom')),
        star: planetConfig.star || { type: 'G', name: 'Sol G2V', lum: 1.0, mass: 1.0 },
        planet: planetConfig,
        forceNewSystem: true
    });
};

// --- CONFIGURACIÓN DE LISTENERS DE UI ---
function setupUIEventListeners() {
    if (btnCloseInfo) {
        btnCloseInfo.addEventListener('click', (e) => {
            e.stopPropagation();
            hideTelemetryPanel();
        });
    }

    const btnOpenCreatorCtrl = document.getElementById('btn-open-creator-controls');
    if (btnOpenCreatorCtrl) {
        btnOpenCreatorCtrl.addEventListener('click', openPlanetCreatorMode);
    }

    const btnOpenInvHdr = document.getElementById('btn-open-investigation-header');
    if (btnOpenInvHdr) {
        btnOpenInvHdr.addEventListener('click', () => openInvestigationMode(selectedBody));
    }

    const btnOpenInvPnl = document.getElementById('btn-open-investigation-panel');
    if (btnOpenInvPnl) {
        btnOpenInvPnl.addEventListener('click', () => openInvestigationMode(selectedBody));
    }

    const btnOpenCreatorHdr = document.getElementById('btn-open-creator-header');
    if (btnOpenCreatorHdr) {
        btnOpenCreatorHdr.addEventListener('click', openPlanetCreatorMode);
    }

    const btnReturnSolar = document.getElementById('btn-return-solar-system');
    if (btnReturnSolar) {
        btnReturnSolar.addEventListener('click', restoreSolarSystem);
    }

    if (btnFocusBody) {
        btnFocusBody.addEventListener('click', () => {
            if (focusBody) unfocusCamera();
            else if (selectedBody) focusCameraOnBody(selectedBody);
        });
    }

    if (sliderTimeSpeed) {
        sliderTimeSpeed.addEventListener('input', (e) => {
            timeSpeed = parseFloat(e.target.value);
            isDayToDayMode = false;
            if (valTimeSpeed) valTimeSpeed.textContent = timeSpeed.toFixed(1) + '×';
        });
    }

    if (sliderGravity) {
        sliderGravity.addEventListener('input', (e) => {
            const gravityScale = parseFloat(e.target.value);
            G = 0.05 * gravityScale;
            if (valGravity) valGravity.textContent = gravityScale.toFixed(1) + '×';
            const speedFactor = Math.sqrt(gravityScale).toFixed(2);
            logToConsole('Constante gravitatoria G ajustada a ' + gravityScale.toFixed(1) + '× (Velocidad orbital ' + speedFactor + '× por 3ª Ley de Kepler).', 'action');
        });
    }

    const btnCloseGravWave = document.getElementById('btn-close-grav-wave');
    if (btnCloseGravWave) {
        btnCloseGravWave.addEventListener('click', () => {
            if (hudGravWaveCard) hudGravWaveCard.style.display = 'none';
        });
    }

    if (btnPlayPause) {
        btnPlayPause.addEventListener('click', togglePlayPause);
    }

    if (btnCinematicTour) {
        btnCinematicTour.addEventListener('click', () => toggleCinematicMode());
    }

    if (btnLockCamera) {
        btnLockCamera.addEventListener('click', () => toggleCameraLock());
    }

    if (btnReset) {
        btnReset.addEventListener('click', restoreInitialUniverse);
    }

    // --- LISTENERS DE MODO SANDBOX & EVENTOS ---
    if (chkHabitableZone) {
        chkHabitableZone.addEventListener('change', (e) => {
            habitableZoneVisible = e.target.checked;
            if (habitableZoneMesh) habitableZoneMesh.visible = habitableZoneVisible;
            logToConsole(habitableZoneVisible ? 'Visualización de Zona Habitable (Goldilocks) activada.' : 'Zona Habitable oculta.', 'system');
        });
    }

    if (btnNBodyToggle) {
        btnNBodyToggle.addEventListener('click', () => {
            setNBodyMode(!isNBodyMode);
        });
    }

    if (btnLaunchAsteroid) {
        btnLaunchAsteroid.addEventListener('click', () => {
            launchAsteroid(selectedBody || null);
        });
    }

    if (btnRandomEvent) {
        btnRandomEvent.addEventListener('click', () => {
            triggerRandomCosmicEvent();
        });
    }

    if (btnResetUniverse) {
        btnResetUniverse.addEventListener('click', restoreInitialUniverse);
    }

    // Escenarios de Cataclismo de 1 Clic
    if (btnScenarioRedGiant) {
        btnScenarioRedGiant.addEventListener('click', triggerRedGiantScenario);
    }
    if (btnScenarioDeleteSun) {
        btnScenarioDeleteSun.addEventListener('click', triggerDeleteSunScenario);
    }
    if (btnScenarioJupiterStar) {
        btnScenarioJupiterStar.addEventListener('click', triggerJupiterStarScenario);
    }
    if (btnScenarioRogueStar) {
        btnScenarioRogueStar.addEventListener('click', triggerRogueStarScenario);
    }
    if (btnScenarioImpact) {
        btnScenarioImpact.addEventListener('click', triggerGreatImpactScenario);
    }

    // Mutador de Cuerpos Celestes
    if (sliderBodyRadius) {
        sliderBodyRadius.addEventListener('input', (e) => {
            if (selectedBody) {
                setBodyRadiusScale(selectedBody, parseFloat(e.target.value));
            }
        });
    }

    if (sliderBodyMass) {
        sliderBodyMass.addEventListener('input', (e) => {
            if (selectedBody) {
                setBodyMassScale(selectedBody, parseFloat(e.target.value));
            }
        });
    }

    if (btnTargetImpact) {
        btnTargetImpact.addEventListener('click', () => {
            if (selectedBody) launchAsteroid(selectedBody);
        });
    }

    if (btnResetBody) {
        btnResetBody.addEventListener('click', () => {
            if (selectedBody) resetSingleBody(selectedBody);
        });
    }

    if (btnLeftDeleteBody) {
        btnLeftDeleteBody.addEventListener('click', () => {
            if (selectedBody) deleteSelectedBody(selectedBody);
            else logToConsole('Selecciona un cuerpo celeste para eliminarlo.', 'warning');
        });
    }

    if (btnDeleteSelectedBody) {
        btnDeleteSelectedBody.addEventListener('click', () => {
            if (selectedBody) deleteSelectedBody(selectedBody);
            else logToConsole('Selecciona un cuerpo celeste para eliminarlo.', 'warning');
        });
    }

    // Toggles de Capas
    if (chkOrbits) {
        chkOrbits.addEventListener('change', (e) => {
            orbitsVisible = e.target.checked;
            bodies.forEach(b => {
                if (b.orbitLine) {
                    if (b.isMoon) b.orbitLine.visible = orbitsVisible && moonsVisible;
                    else b.orbitLine.visible = orbitsVisible;
                }
            });
            logToConsole(orbitsVisible ? 'Trayectorias keplerianas visibles.' : 'Trayectorias ocultas.', 'system');
        });
    }

    if (chkVectors) {
        chkVectors.addEventListener('change', (e) => {
            vectorsVisible = e.target.checked;
            if (!vectorsVisible) {
                if (velocityArrow) velocityArrow.visible = false;
                if (gravityArrow) gravityArrow.visible = false;
            }
            logToConsole(vectorsVisible ? 'Vectores de estado 3D activados (v y g).' : 'Vectores de estado desactivados.', 'system');
        });
    }

    if (chkGravityField) {
        chkGravityField.addEventListener('change', (e) => {
            gravityFieldVisible = e.target.checked;
            if (!gravityFieldVisible && gravityFieldMesh) gravityFieldMesh.visible = false;
            else if (selectedBody) updateGravityFieldVisualizer(selectedBody);
            logToConsole(gravityFieldVisible ? 'Visualizador de Campo de Atracción (Esfera de Hill) activado.' : 'Campo de atracción oculto.', 'system');
        });
    }

    if (chkMoons) {
        chkMoons.addEventListener('change', (e) => {
            moonsVisible = e.target.checked;
            bodies.forEach(b => {
                if (b.isMoon) {
                    b.mesh.visible = moonsVisible;
                    if (b.orbitLine) b.orbitLine.visible = orbitsVisible && moonsVisible;
                }
            });
            logToConsole(moonsVisible ? 'Sistema de lunas visible.' : 'Lunas ocultas.', 'system');
        });
    }

    if (chkKuiper) {
        chkKuiper.addEventListener('change', (e) => {
            kuiperVisible = e.target.checked;
            if (kuiperBeltParticles) kuiperBeltParticles.visible = kuiperVisible;
            logToConsole(kuiperVisible ? 'Cinturón de Kuiper visible.' : 'Cinturón de Kuiper oculto.', 'system');
        });
    }

    if (chkMilkyway) {
        chkMilkyway.addEventListener('change', (e) => {
            milkyWayVisible = e.target.checked;
            if (milkyWayPoints) milkyWayPoints.visible = milkyWayVisible;
            cosmicNebulaMeshes.forEach(m => m.visible = milkyWayVisible);
            logToConsole(milkyWayVisible ? 'Vía Láctea y nebulosas activas.' : 'Fondo galáctico atenuado.', 'system');
        });
    }

    if (chkGrid) {
        chkGrid.addEventListener('change', (e) => {
            if (gridHelper) gridHelper.visible = e.target.checked;
        });
    }

    const btnResetCam = document.getElementById('btn-reset-camera');
    if (btnResetCam) btnResetCam.addEventListener('click', resetCamera);
    const btnResetCamHdr = document.getElementById('btn-reset-camera-header');
    if (btnResetCamHdr) btnResetCamHdr.addEventListener('click', resetCamera);

    // Dock flotante
    const dockTitleBtn = document.getElementById('dock-title-btn');
    if (dockTitleBtn) {
        dockTitleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            setDockMenuState(!isDockMenuOpen);
        });
    }
    const btnDockPrev = document.getElementById('btn-dock-prev');
    if (btnDockPrev) btnDockPrev.addEventListener('click', (e) => { e.stopPropagation(); navigateCelestialBody(-1); });
    const btnDockNext = document.getElementById('btn-dock-next');
    if (btnDockNext) btnDockNext.addEventListener('click', (e) => { e.stopPropagation(); navigateCelestialBody(1); });
    const btnOverview = document.getElementById('btn-dock-overview');
    if (btnOverview) {
        btnOverview.addEventListener('click', (e) => {
            e.stopPropagation();
            deselectBody();
            setDockMenuState(false);
        });
    }

    document.addEventListener('click', (e) => {
        if (isDockMenuOpen) {
            const dockMenu = document.getElementById('dock-dropdown-menu');
            const dockTitleBtn = document.getElementById('dock-title-btn');
            const mobBtnPlanets = document.getElementById('mob-btn-planets');
            if (
                (!dockMenu || !dockMenu.contains(e.target)) &&
                (!dockTitleBtn || !dockTitleBtn.contains(e.target)) &&
                (!mobBtnPlanets || !mobBtnPlanets.contains(e.target))
            ) {
                setDockMenuState(false);
            }
        }
    });

    // HUD Flotante de Astro Enfocado (Navegación y deselección rápida)
    const btnFocusPrev = document.getElementById('btn-focus-prev');
    if (btnFocusPrev) {
        btnFocusPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            navigateCelestialBody(-1);
        });
    }
    const btnFocusNext = document.getElementById('btn-focus-next');
    if (btnFocusNext) {
        btnFocusNext.addEventListener('click', (e) => {
            e.stopPropagation();
            navigateCelestialBody(1);
        });
    }
    const btnFocusExit = document.getElementById('btn-focus-exit');
    if (btnFocusExit) {
        btnFocusExit.addEventListener('click', (e) => {
            e.stopPropagation();
            deselectBody();
        });
    }
    const focusHudPill = document.getElementById('focus-hud-pill');
    if (focusHudPill) {
        focusHudPill.addEventListener('click', (e) => {
            e.stopPropagation();
            if (selectedBody) {
                selectBody(selectedBody, false, true);
            }
        });
    }

    // Paneles laterales colapsables
    const btnToggleLeft = document.getElementById('btn-toggle-left');
    const leftPanel = document.querySelector('.left-panel');
    if (btnToggleLeft && leftPanel) {
        btnToggleLeft.addEventListener('click', () => {
            setDockMenuState(false);
            const collapsed = leftPanel.classList.toggle('is-collapsed');
            btnToggleLeft.classList.toggle('is-collapsed', collapsed);
            btnToggleLeft.setAttribute('aria-expanded', String(!collapsed));
            const icon = btnToggleLeft.querySelector('i');
            if (icon) icon.className = collapsed ? 'fa-solid fa-chevron-right' : 'fa-solid fa-chevron-left';
            updateMobileBarActiveState();
            syncBottomHUDVisibility();
        });
    }

    const btnToggleRight = document.getElementById('btn-toggle-right');
    if (btnToggleRight && infoPanel) {
        btnToggleRight.addEventListener('click', () => {
            const isCurrentlyCollapsed = infoPanel.classList.contains('is-collapsed') || infoPanel.classList.contains('hidden');
            if (isCurrentlyCollapsed) {
                if (!selectedBody) {
                    const defaultBody = bodies.find(b => b.name === 'Tierra') || bodies[1];
                    selectBody(defaultBody, false);
                }
                infoPanel.classList.remove('hidden');
                infoPanel.classList.remove('is-collapsed');
                btnToggleRight.classList.remove('is-collapsed');
                btnToggleRight.setAttribute('aria-expanded', 'true');
                const icon = btnToggleRight.querySelector('i');
                if (icon) icon.className = 'fa-solid fa-chevron-right';
                setDockMenuState(false);
            } else {
                hideTelemetryPanel();
            }
            updateMobileBarActiveState();
            syncBottomHUDVisibility();
        });
    }

    document.querySelectorAll('.panel-card-header[data-toggle]').forEach(header => {
        header.addEventListener('click', (e) => {
            if (e.target.closest('input, label, .switch-container')) return;
            const card = header.closest('.panel-card');
            if (!card) return;
            const collapsed = card.classList.toggle('is-card-collapsed');
            header.setAttribute('aria-expanded', String(!collapsed));
        });
    });

    // Iniciar con panel izquierdo colapsado para vista despejada del cosmos
    if (leftPanel) {
        leftPanel.classList.add('is-collapsed');
        if (btnToggleLeft) {
            btnToggleLeft.classList.add('is-collapsed');
            btnToggleLeft.setAttribute('aria-expanded', 'false');
            const icon = btnToggleLeft.querySelector('i');
            if (icon) icon.className = 'fa-solid fa-chevron-right';
        }
    }

    // Botones de la barra de navegación móvil táctil
    const mobBtnPlanets = document.getElementById('mob-btn-planets');
    if (mobBtnPlanets) {
        mobBtnPlanets.addEventListener('click', (e) => {
            e.stopPropagation();
            const dockMenu = document.getElementById('dock-dropdown-menu');
            if (dockMenu) {
                const isHidden = dockMenu.classList.contains('hidden');
                setDockMenuState(isHidden);
            }
        });
    }

    const mobBtnControls = document.getElementById('mob-btn-controls');
    if (mobBtnControls && leftPanel) {
        mobBtnControls.addEventListener('click', (e) => {
            e.stopPropagation();
            setDockMenuState(false);
            const collapsed = leftPanel.classList.toggle('is-collapsed');
            if (btnToggleLeft) {
                btnToggleLeft.classList.toggle('is-collapsed', collapsed);
                btnToggleLeft.setAttribute('aria-expanded', String(!collapsed));
                const icon = btnToggleLeft.querySelector('i');
                if (icon) icon.className = collapsed ? 'fa-solid fa-chevron-right' : 'fa-solid fa-chevron-left';
            }
            if (!collapsed) {
                if (infoPanel && !infoPanel.classList.contains('is-collapsed')) {
                    hideTelemetryPanel();
                }
            }
            updateMobileBarActiveState();
            syncBottomHUDVisibility();
        });
    }

    const mobBtnTelemetry = document.getElementById('mob-btn-telemetry');
    if (mobBtnTelemetry && infoPanel) {
        mobBtnTelemetry.addEventListener('click', (e) => {
            e.stopPropagation();
            const isCurrentlyHidden = infoPanel.classList.contains('is-collapsed') || infoPanel.classList.contains('hidden');
            if (isCurrentlyHidden) {
                setDockMenuState(false);
                if (leftPanel && !leftPanel.classList.contains('is-collapsed')) {
                    leftPanel.classList.add('is-collapsed');
                    if (btnToggleLeft) {
                        btnToggleLeft.classList.add('is-collapsed');
                        btnToggleLeft.setAttribute('aria-expanded', 'false');
                        const icon = btnToggleLeft.querySelector('i');
                        if (icon) icon.className = 'fa-solid fa-chevron-right';
                    }
                }
                if (!selectedBody) {
                    const defaultBody = bodies.find(b => b.name === 'Tierra') || bodies[1];
                    selectBody(defaultBody, false, true);
                } else {
                    infoPanel.classList.remove('hidden');
                    infoPanel.classList.remove('is-collapsed');
                }
                if (btnToggleRight) {
                    btnToggleRight.classList.remove('is-collapsed');
                    btnToggleRight.setAttribute('aria-expanded', 'true');
                    const icon = btnToggleRight.querySelector('i');
                    if (icon) icon.className = 'fa-solid fa-chevron-right';
                }
            } else {
                hideTelemetryPanel();
            }
            updateMobileBarActiveState();
            syncBottomHUDVisibility();
        });
    }

    const mobBtnInv = document.getElementById('mob-btn-investigation');
    if (mobBtnInv) {
        mobBtnInv.addEventListener('click', () => {
            setDockMenuState(false);
            if (leftPanel) {
                leftPanel.classList.add('is-collapsed');
                if (btnToggleLeft) {
                    btnToggleLeft.classList.add('is-collapsed');
                    btnToggleLeft.setAttribute('aria-expanded', 'false');
                    const icon = btnToggleLeft.querySelector('i');
                    if (icon) icon.className = 'fa-solid fa-chevron-right';
                }
            }
            hideTelemetryPanel();
            openInvestigationMode(selectedBody);
            syncBottomHUDVisibility();
        });
    }

    const mobBtnQr = document.getElementById('mob-btn-qr');
    if (mobBtnQr) {
        mobBtnQr.addEventListener('click', openDesktopQrModal);
    }

    // Mini-panel desplegable de métricas (Ajustado al lado del título)
    const cosmicMetricsPill = document.getElementById('cosmic-metrics-pill');
    const btnToggleMetrics = document.getElementById('btn-toggle-metrics');
    if (btnToggleMetrics && cosmicMetricsPill) {
        btnToggleMetrics.addEventListener('click', (e) => {
            e.stopPropagation();
            const isCollapsed = cosmicMetricsPill.classList.toggle('is-collapsed');
            btnToggleMetrics.setAttribute('aria-expanded', String(!isCollapsed));
        });

        document.addEventListener('click', (e) => {
            if (!cosmicMetricsPill.classList.contains('is-collapsed') && !cosmicMetricsPill.contains(e.target)) {
                cosmicMetricsPill.classList.add('is-collapsed');
                btnToggleMetrics.setAttribute('aria-expanded', 'false');
            }
        });
    }

    const btnResetPillSim = document.getElementById('btn-reset-pill-sim');
    if (btnResetPillSim) {
        btnResetPillSim.addEventListener('click', (e) => {
            e.stopPropagation();
            restoreSolarSystem();
            logToConsole('Universo restablecido al estado inicial.', 'action');
        });
    }

    // Modal de Código QR en Header
    const btnOpenQrHeader = document.getElementById('btn-open-qr-header');
    if (btnOpenQrHeader) {
        btnOpenQrHeader.addEventListener('click', openDesktopQrModal);
    }

    const desktopQrModal = document.getElementById('desktop-qr-modal');
    const btnCloseQrModal = document.getElementById('btn-close-qr-modal');
    if (btnCloseQrModal && desktopQrModal) {
        btnCloseQrModal.addEventListener('click', () => {
            desktopQrModal.classList.remove('is-open');
        });
        desktopQrModal.addEventListener('click', (e) => {
            if (e.target === desktopQrModal) {
                desktopQrModal.classList.remove('is-open');
            }
        });
    }

    const btnCopyQrUrl = document.getElementById('btn-copy-qr-url');
    if (btnCopyQrUrl) {
        btnCopyQrUrl.addEventListener('click', () => {
            const url = document.getElementById('desktop-qr-url').textContent;
            navigator.clipboard.writeText(url).then(() => {
                btnCopyQrUrl.innerHTML = '<i class="fa-solid fa-check"></i> ¡Copiado!';
                setTimeout(() => {
                    btnCopyQrUrl.innerHTML = '<i class="fa-solid fa-copy"></i> Copiar';
                }, 2000);
            }).catch(() => {
                showToast('Enlace listo para compartir');
            });
        });
    }

    updateMobileBarActiveState();
}

function openDesktopQrModal() {
    const modal = document.getElementById('desktop-qr-modal');
    const qrImg = document.getElementById('desktop-qr-image');
    const urlSpan = document.getElementById('desktop-qr-url');
    if (!modal) return;

    let targetUrl;
    if (window.location.protocol.startsWith('http')) {
        const basePath = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1);
        targetUrl = basePath + 'visitante.html';
    } else {
        targetUrl = 'https://carlosmeji7.github.io/ESTELARIS_PROJECT/visitante.html';
    }

    if (urlSpan) urlSpan.textContent = targetUrl;
    if (qrImg) {
        qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(targetUrl)}&bgcolor=ffffff&color=06080f&margin=10`;
    }

    modal.classList.add('is-open');
}

// --- BUCLE DE ANIMACIÓN & RENDER (60 FPS) ---
function animate() {
    requestAnimationFrame(animate);

    if (window.isPlanetCreatorOpen) {
        return;
    }

    const time = performance.now();
    const delta = (time - lastFrameTime) / 1000;
    lastFrameTime = time;

    frameCount++;
    if (time >= lastFpsUpdateTime + 1000) {
        fps = Math.round((frameCount * 1000) / (time - lastFpsUpdateTime));
        if (statFps) statFps.textContent = fps;
        const pillSummaryFps = document.getElementById('pill-summary-fps');
        if (pillSummaryFps) pillSummaryFps.textContent = fps + ' FPS';

        // Optimización dinámica de resolución en dispositivos móviles
        if (window.innerWidth < 768 && renderer) {
            if (fps < 38 && lowFpsCounter < 3) {
                lowFpsCounter++;
                if (lowFpsCounter >= 2 && renderer.getPixelRatio() > 1.0) {
                    renderer.setPixelRatio(1.0);
                }
            } else if (fps >= 55 && lowFpsCounter > 0) {
                lowFpsCounter = 0;
            }
        }

        frameCount = 0;
        lastFpsUpdateTime = time;
    }

    if (delta < 0.1) {
        updatePhysics(delta);
    }

    if (selectionReticle) {
        if (focusBody || isCinematicMode) {
            selectionReticle.material.opacity = THREE.MathUtils.lerp(selectionReticle.material.opacity, 0.0, 0.3);
            if (selectionReticle.material.opacity < 0.01) selectionReticle.visible = false;
        } else {
            const activeTarget = hoveredBody || selectedBody;
            if (activeTarget && activeTarget.mesh && activeTarget.mesh.visible) {
                selectionReticle.visible = true;
                const targetWorldPos = new THREE.Vector3();
                activeTarget.mesh.getWorldPosition(targetWorldPos);
                selectionReticle.position.copy(targetWorldPos);
                selectionReticle.quaternion.copy(camera.quaternion);

                const baseRadius = (activeTarget.ring && activeTarget.ringOuter) ? activeTarget.ringOuter * 1.08 : activeTarget.radius * 1.15;
                const baseDiameter = baseRadius * 2.1;
                selectionReticle.scale.set(baseDiameter, baseDiameter, baseDiameter);

                const pulse = 0.85 + Math.sin(performance.now() * 0.003) * 0.15;
                const targetOpacity = (activeTarget === selectedBody ? 1.0 : 0.75) * pulse;
                selectionReticle.material.opacity = THREE.MathUtils.lerp(selectionReticle.material.opacity, targetOpacity, 0.25);
            } else {
                selectionReticle.material.opacity = THREE.MathUtils.lerp(selectionReticle.material.opacity, 0.0, 0.25);
                if (selectionReticle.material.opacity < 0.02) selectionReticle.visible = false;
            }
        }
    }

    // Actualización continua del Campo de Atracción Gravitacional (sigue al planeta en tiempo real)
    if (selectedBody && gravityFieldVisible) {
        updateGravityFieldVisualizer(selectedBody);
    } else if (gravityFieldMesh) {
        gravityFieldMesh.visible = false;
    }

    let currentWarpIntensity = 0.0;

    // Actualización de Cámara Cinemática / Enfoque / Vuelo Libre
    if (isCinematicMode) {
        updateCinematicCamera(delta);
    } else if (focusBody && focusBody.mesh) {
        controls.enabled = !isCameraLocked;
        const currentPlanetPos = new THREE.Vector3();
        focusBody.mesh.getWorldPosition(currentPlanetPos);

        if (isTransitioningToFocus) {
            transitionProgress += delta / transitionDuration;
            if (transitionProgress >= 1.0) {
                transitionProgress = 1.0;
                isTransitioningToFocus = false;
            }

            const t = transitionProgress;
            const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
            const targetCamPos = new THREE.Vector3().addVectors(currentPlanetPos, focusOffset);
            
            // Arco parabólico que sobrevuela la eclíptica para evitar atravesar el Sol u otros planetas
            const travelDist = transitionStartCamPos.distanceTo(targetCamPos);
            const arcHeight = Math.min(480, Math.max(0, travelDist * 0.18));
            const arcY = Math.sin(ease * Math.PI) * arcHeight;

            camera.position.lerpVectors(transitionStartCamPos, targetCamPos, ease);
            camera.position.y += arcY;
            controls.target.lerpVectors(transitionStartControlsTarget, currentPlanetPos, ease);

            const speedFactor = Math.sin(ease * Math.PI);
            currentWarpIntensity = speedFactor;
            camera.fov = baseCameraFov + speedFactor * 5.2;
            camera.updateProjectionMatrix();

            if (!isTransitioningToFocus) {
                camera.position.copy(targetCamPos);
                controls.target.copy(currentPlanetPos);
                camera.fov = baseCameraFov;
                camera.updateProjectionMatrix();
            }
        } else {
            const camOffset = new THREE.Vector3().subVectors(camera.position, controls.target);
            controls.target.copy(currentPlanetPos);
            camera.position.copy(currentPlanetPos).add(camOffset);

            if (camera.fov !== baseCameraFov) {
                camera.fov = baseCameraFov;
                camera.updateProjectionMatrix();
            }
        }
    } else if (isTransitioningBack && hasSavedPreFocus) {
        controls.enabled = !isCameraLocked;
        controls.target.lerp(savedPreFocusControlsTarget, 0.09);
        camera.position.lerp(savedPreFocusCameraPos, 0.09);

        if (camera.position.distanceTo(savedPreFocusCameraPos) < 3.0 && controls.target.distanceTo(savedPreFocusControlsTarget) < 3.0) {
            camera.position.copy(savedPreFocusCameraPos);
            controls.target.copy(savedPreFocusControlsTarget);
            isTransitioningBack = false;
            hasSavedPreFocus = false;
        }
    } else {
        controls.enabled = !isCameraLocked;
    }

    updateLateralWarp(delta, currentWarpIntensity);
    if (!isCameraLocked && !isCinematicMode) {
        controls.update();
    }

    // RESOLUCIÓN FÍSICA DE COLISIÓN DE CÁMARA
    resolveCameraCollisions();

    renderer.render(scene, camera);
}

// Inicializar la simulación
init();
animate();
