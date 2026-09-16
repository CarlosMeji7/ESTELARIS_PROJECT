/* ============================================================================
   ESTELARIS — MÓDULO DE GÉNESIS PLANETARIO & LABORATORIO ASTROQUÍMICO
   Lógica Científica, Termodinámica Molecular, Retención de Jeans & Three.js 3D
   ============================================================================ */

(function () {
    'use strict';

    // Constantes Astrofísicas & Químicas Universales
    const R_GAS = 8.314462; // J / (mol · K)
    const SOLAR_LUM = 3.828e26; // Watts
    const AU_METERS = 1.496e11; // Metros
    const SIGMA_SB = 5.670374e-8; // Constante de Stefan-Boltzmann

    // Datos Químicos Moleculares
    const MOLECULAR_DATA = {
        'N2':  { name: 'Nitrógeno', formula: 'N₂', molarMass: 28.013, greenhouseFactor: 0.0, color: '#60a5fa' },
        'O2':  { name: 'Oxígeno', formula: 'O₂', molarMass: 31.998, greenhouseFactor: 0.0, color: '#38bdf8' },
        'CO2': { name: 'Dióxido de Carbono', formula: 'CO₂', molarMass: 44.009, greenhouseFactor: 1.0, color: '#94a3b8' },
        'CH4': { name: 'Metano', formula: 'CH₄', molarMass: 16.043, greenhouseFactor: 28.0, color: '#fb923c' },
        'H2O': { name: 'Vapor de Agua', formula: 'H₂O', molarMass: 18.015, greenhouseFactor: 1.5, color: '#67e8f9' },
        'SO2': { name: 'Dióxido de Azufre', formula: 'SO₂', molarMass: 64.066, greenhouseFactor: 3.5, color: '#facc15' },
        'NH3': { name: 'Amoníaco', formula: 'NH₃', molarMass: 17.031, greenhouseFactor: 4.0, color: '#a78bfa' },
        'H2':  { name: 'Hidrógeno', formula: 'H₂', molarMass: 2.016, greenhouseFactor: 0.1, color: '#e2e8f0' },
        'Ar':  { name: 'Argón', formula: 'Ar', molarMass: 39.948, greenhouseFactor: 0.0, color: '#cbd5e1' }
    };

    // Parámetros de Estrellas Anfitrionas
    const STAR_DATA = {
        'M':  { name: 'Enana Roja (M)', lum: 0.12, teff: 3200, mass: 0.35, color: 0xff5544 },
        'G':  { name: 'Sol G2V (Amarilla)', lum: 1.00, teff: 5778, mass: 1.00, color: 0xfffaed },
        'F':  { name: 'Estrella F (Blanca)', lum: 2.60, teff: 6600, mass: 1.30, color: 0xd6e8ff },
        'WD': { name: 'Enana Blanca', lum: 0.03, teff: 9500, mass: 0.60, color: 0xa5b4fc }
    };

    // Estado Activo del Planeta
    const state = {
        name: 'Astraea-IV',
        starType: 'G',
        distanceAU: 1.00,
        massEarth: 1.00,
        radiusEarth: 1.00,
        eccentricity: 0.016,
        coreType: 'fe-liquid',
        tectonics: 1, // 0: inerte, 1: activa, 2: vigorosa
        pressureBar: 1.00,
        gases: {
            N2: 78,
            O2: 21,
            CO2: 1,
            CH4: 0,
            H2O: 1,
            SO2: 0,
            NH3: 0,
            H2: 0,
            Ar: 1
        },
        liquidType: 'water',
        oceanCover: 71,
        iceCaps: 15,
        hasRings: false,

        // Controles de Vista 3D
        showClouds: true,
        showRings: false,
        showGlow: true,
        wireframe: false,
        rotSpeed: 0.003
    };

    // Variables Three.js del Viewport Preview
    let previewScene, previewCamera, previewRenderer;
    let planetMesh, cloudsMesh, atmosphereGlowMesh, ringMesh;
    let previewAnimId = null;
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };

    // --- ARQUETIPOS / PRESETS ---
    const PRESETS = {
        earth: {
            name: 'Terra Nova',
            starType: 'G',
            distanceAU: 1.00,
            massEarth: 1.00,
            radiusEarth: 1.00,
            eccentricity: 0.016,
            coreType: 'fe-liquid',
            tectonics: 1,
            pressureBar: 1.01,
            gases: { N2: 78, O2: 21, CO2: 1, CH4: 0, H2O: 1, SO2: 0, NH3: 0, H2: 0, Ar: 1 },
            liquidType: 'water',
            oceanCover: 71,
            iceCaps: 12,
            hasRings: false
        },
        ocean: {
            name: 'Aquaria Prime',
            starType: 'G',
            distanceAU: 1.15,
            massEarth: 2.20,
            radiusEarth: 1.45,
            eccentricity: 0.02,
            coreType: 'fe-liquid',
            tectonics: 1,
            pressureBar: 3.50,
            gases: { N2: 60, O2: 15, CO2: 4, CH4: 1, H2O: 18, SO2: 0, NH3: 0, H2: 0, Ar: 2 },
            liquidType: 'water',
            oceanCover: 98,
            iceCaps: 5,
            hasRings: false
        },
        venus: {
            name: 'Pyros-X',
            starType: 'G',
            distanceAU: 0.72,
            massEarth: 0.81,
            radiusEarth: 0.95,
            eccentricity: 0.007,
            coreType: 'fe-solid',
            tectonics: 0,
            pressureBar: 92.0,
            gases: { N2: 3, O2: 0, CO2: 95, CH4: 0, H2O: 0, SO2: 2, NH3: 0, H2: 0, Ar: 0 },
            liquidType: 'dry',
            oceanCover: 0,
            iceCaps: 0,
            hasRings: false
        },
        titan: {
            name: 'Criogenia',
            starType: 'G',
            distanceAU: 9.54,
            massEarth: 0.18,
            radiusEarth: 0.65,
            eccentricity: 0.05,
            coreType: 'silicate',
            tectonics: 0,
            pressureBar: 1.50,
            gases: { N2: 94, O2: 0, CO2: 0, CH4: 5, H2O: 0, SO2: 0, NH3: 0, H2: 1, Ar: 0 },
            liquidType: 'methane',
            oceanCover: 35,
            iceCaps: 40,
            hasRings: false
        },
        lava: {
            name: 'Vulcano-B',
            starType: 'G',
            distanceAU: 0.18,
            massEarth: 1.80,
            radiusEarth: 1.20,
            eccentricity: 0.15,
            coreType: 'fe-liquid',
            tectonics: 2,
            pressureBar: 0.40,
            gases: { N2: 20, O2: 0, CO2: 45, CH4: 0, H2O: 5, SO2: 25, NH3: 0, H2: 0, Ar: 5 },
            liquidType: 'magma',
            oceanCover: 80,
            iceCaps: 0,
            hasRings: true
        }
    };

    // --- CÁLCULOS FÍSICO-QUÍMICOS ---
    function calculatePhysicsAndChemistry() {
        const star = STAR_DATA[state.starType] || STAR_DATA['G'];
        
        // 1. Gravedad superficial (g relativo a la Tierra)
        const gravityG = state.massEarth / Math.pow(state.radiusEarth, 2);
        const gravityMs2 = gravityG * 9.80665;

        // 2. Velocidad de Escape (km/s)
        const vEsc = 11.186 * Math.sqrt(state.massEarth / state.radiusEarth);

        // 3. Densidad media (g/cm³)
        const density = 5.515 * (state.massEarth / Math.pow(state.radiusEarth, 3));

        // 4. Radiación incidente y Temperatura de Equilibrio Teq
        // Flujo solar a 1 UA = 1361 W/m²
        const flux = (star.lum / Math.pow(state.distanceAU, 2)) * 1361;
        
        // Albedo estimado según casquetes, océanos y nubes
        let albedo = 0.28;
        if (state.liquidType === 'water') albedo += (state.iceCaps / 100) * 0.35;
        if (state.pressureBar > 1.5) albedo += Math.min(0.25, (state.pressureBar - 1.5) * 0.05);
        if (state.liquidType === 'dry') albedo = 0.18;
        albedo = Math.max(0.08, Math.min(0.75, albedo));

        // Temperatura cuerpo negro en Kelvin
        // Teq = 278.5 * (L / d^2)^0.25 * (1 - A)^0.25
        const teq = 278.5 * Math.pow(star.lum / Math.pow(state.distanceAU, 2), 0.25) * Math.pow(1 - albedo, 0.25);

        // 5. Efecto Invernadero Químico (ΔT)
        // Calculado a partir de presiones parciales de gases dipolares infrarrojos
        const pCO2 = state.pressureBar * (state.gases.CO2 / 100);
        const pCH4 = state.pressureBar * (state.gases.CH4 / 100);
        const pH2O = state.pressureBar * (state.gases.H2O / 100);
        const pSO2 = state.pressureBar * (state.gases.SO2 / 100);

        let deltaTGreenhouse = 0;
        if (state.pressureBar > 0.005) {
            deltaTGreenhouse += Math.pow(pCO2 * 1000, 0.45) * 6.5;
            deltaTGreenhouse += Math.pow(pCH4 * 1000, 0.52) * 16.0;
            deltaTGreenhouse += Math.pow(pH2O * 100, 0.40) * 14.0;
            deltaTGreenhouse += Math.pow(pSO2 * 100, 0.38) * 8.0;
        }

        // Limitación física razonable
        deltaTGreenhouse = Math.min(520, Math.max(0, deltaTGreenhouse));

        // Temperatura superficial real (K y °C)
        let tSurfK = teq + deltaTGreenhouse;
        if (state.liquidType === 'magma' && tSurfK < 1200) {
            // Un mundo de magma mantiene calor volcánico intrínseco
            tSurfK = Math.max(tSurfK, 1280);
        }
        const tSurfC = tSurfK - 273.15;

        // 6. Masa Molar Media Atmosférica
        let totalPct = 0;
        let weightedMass = 0;
        Object.keys(state.gases).forEach(gasKey => {
            const pct = state.gases[gasKey];
            totalPct += pct;
            weightedMass += pct * MOLECULAR_DATA[gasKey].molarMass;
        });
        const avgMolarMass = totalPct > 0 ? (weightedMass / totalPct) : 28.9;

        // 7. Retención Térmica de Jeans (¿El gas se escapa al espacio?)
        // Criterio físico: Vesc > 6 * Vterm
        // Vterm = sqrt(3 * R * T / Mmol)
        const jeansResults = {};
        Object.keys(state.gases).forEach(gasKey => {
            const mData = MOLECULAR_DATA[gasKey];
            const molarKg = mData.molarMass * 1e-3; // kg/mol
            const vThermMs = Math.sqrt((3 * R_GAS * tSurfK) / molarKg); // m/s
            const vThermKms = vThermMs / 1000;
            // Para retener un gas durante miles de millones de años: vEsc >= 6 * vTherm
            const isRetained = vEsc >= (6 * vThermKms);
            jeansResults[gasKey] = {
                retained: isRetained,
                vTherm: vThermKms.toFixed(2),
                threshold: (6 * vThermKms).toFixed(2)
            };
        });

        // 8. pH de Lluvia y Precipitaciones Químicas
        let rainPh = 7.0;
        let rainDesc = 'Neutro (H₂O pura)';
        if (state.pressureBar < 0.01 || state.gases.H2O === 0) {
            rainDesc = 'Sin condensación / Vacío';
            rainPh = null;
        } else if (state.gases.SO2 > 0.5) {
            rainPh = Math.max(0.5, 3.5 - Math.log10(state.gases.SO2 * state.pressureBar + 1) * 2);
            rainDesc = `Lluvia Ácida Sulfúrica (H₂SO₄, pH ${rainPh.toFixed(1)})`;
        } else if (state.gases.CO2 > 2) {
            rainPh = Math.max(3.8, 5.7 - Math.log10(state.gases.CO2 * 0.1 + 1));
            rainDesc = `Lluvia Carbónica (H₂CO₃, pH ${rainPh.toFixed(1)})`;
        } else if (state.liquidType === 'methane') {
            rainDesc = 'Lluvia Criogénica de Hidrocarburos (CH₄ líquido)';
            rainPh = null;
        } else {
            rainPh = 5.6;
            rainDesc = 'Agua atmosférica estándar (pH 5.6)';
        }

        // 9. Magnetosfera & Escudo Geodinámico
        let magFieldGauss = 0;
        let magTitle = 'Sin Campo Magnético';
        let magDesc = 'Atmósfera desprotegida; el viento estelar erosionará los gases ligeros.';
        if (state.coreType === 'fe-liquid') {
            magFieldGauss = (0.35 * (state.massEarth / state.radiusEarth)).toFixed(2);
            magTitle = `Magnetosfera Activa (${magFieldGauss} Gauss)`;
            magDesc = 'Dínamo en rotación genera un escudo dipolar que desvía radiación cósmica y partículas solares.';
        } else if (state.coreType === 'fe-solid') {
            magFieldGauss = 0.02;
            magTitle = 'Campo Magnético Remanente Débil (0.02 Gauss)';
            magDesc = 'Núcleo frío solidificado (estilo Marte). Sin dínamo térmica activa.';
        }

        // 10. Zona de Habitabilidad (Goldilocks)
        // Bordes aproximados: Rin = 0.95 * sqrt(L), Rout = 1.37 * sqrt(L)
        const hzInner = 0.95 * Math.sqrt(star.lum);
        const hzOuter = 1.37 * Math.sqrt(star.lum);
        let hzStatus = 'optimal';
        let hzText = 'Dentro de la Zona de Habitabilidad';
        if (state.distanceAU < hzInner) {
            hzStatus = 'danger';
            hzText = 'Demasiado Cerca (Zona Calcinante / Invernadero)';
        } else if (state.distanceAU > hzOuter) {
            hzStatus = 'warning';
            hzText = 'Demasiado Lejos (Zona Fría / Glaciación)';
        }

        // 11. Earth Similarity Index (ESI)
        // ESI = [ (1 - |r - 1|/(r + 1))^0.57 * (1 - |d - 1|/(d + 1))^1.07 * (1 - |v - 1|/(v + 1))^0.70 * (1 - |t - 1|/(t + 1))^5.58 ]
        const simR = Math.pow(1 - Math.abs(state.radiusEarth - 1.0) / (state.radiusEarth + 1.0), 0.57);
        const simD = Math.pow(1 - Math.abs((density / 5.515) - 1.0) / ((density / 5.515) + 1.0), 1.07);
        const simV = Math.pow(1 - Math.abs((vEsc / 11.186) - 1.0) / ((vEsc / 11.186) + 1.0), 0.70);
        const simT = Math.pow(Math.max(0, 1 - Math.abs(tSurfK - 288.15) / (tSurfK + 288.15)), 5.58);
        let esi = simR * simD * simV * simT;
        if (isNaN(esi)) esi = 0.1;
        esi = Math.max(0.01, Math.min(1.0, esi));

        // 12. Clasificación Planetaria
        let planetClass = 'Planeta Rocoso';
        if (state.massEarth > 10 || state.radiusEarth > 2.2) {
            planetClass = tSurfC > 100 ? 'Subneptuno Cálido' : 'Gigante de Gas / Hielo';
        } else if (state.liquidType === 'magma' || tSurfC > 600) {
            planetClass = 'Mundo de Lava Ultra-Caliente';
        } else if (state.liquidType === 'water' && state.oceanCover > 85) {
            planetClass = 'Planeta Océano (Hyceano)';
        } else if (state.massEarth >= 1.5 && state.massEarth <= 8.0) {
            planetClass = (esi > 0.75) ? 'Súper-Tierra Templada' : 'Súper-Tierra Exótica';
        } else if (state.liquidType === 'methane') {
            planetClass = 'Mundo Criogénico de Hidrocarburos';
        } else if (state.pressureBar < 0.05) {
            planetClass = 'Rocoso Estéril Sin Atmósfera';
        } else if (tSurfC > 350 && state.gases.CO2 > 60) {
            planetClass = 'Infierno Invernadero Supercrítico';
        }

        // 13. Auditoría de Coherencia Físico-Química
        const audits = [];
        // Coherencia de Densidad
        if (density < 1.0) {
            audits.push({
                type: 'warn',
                title: 'Densidad Excesivamente Baja (< 1.0 g/cm³)',
                desc: 'Un cuerpo con esta masa y radio no retendría litosfera sólida; tendería a inflarse como un mini-neptuno gaseoso.'
            });
        } else if (density > 11.0) {
            audits.push({
                type: 'fail',
                title: 'Densidad Anómala (> 11 g/cm³)',
                desc: 'Materia ultradensa. Supera la densidad del hierro puro. Requeriría un núcleo de osmio/platino o colapso exótico.'
            });
        } else {
            audits.push({
                type: 'pass',
                title: 'Densidad Bariónica Coherente (' + density.toFixed(2) + ' g/cm³)',
                desc: 'Compatible con diferenciación geológica clásica de silicatos y metales pesados.'
            });
        }

        // Fuga de Gases
        const escapedGases = Object.keys(jeansResults).filter(k => state.gases[k] > 0 && !jeansResults[k].retained);
        if (escapedGases.length > 0) {
            audits.push({
                type: 'warn',
                title: `Fuga de Jeans Activa (${escapedGases.map(g => MOLECULAR_DATA[g].formula).join(', ')})`,
                desc: `La velocidad de escape (${vEsc.toFixed(1)} km/s) es insuficiente frente a la velocidad térmica. Estos gases se disiparán al espacio con el tiempo.`
            });
        } else {
            audits.push({
                type: 'pass',
                title: 'Retención Atmosférica Estable',
                desc: 'Todos los gases moleculares configurados están dentro del umbral de retención gravitatoria de Jeans.'
            });
        }

        // Magnetosfera
        if (state.coreType === 'fe-liquid') {
            audits.push({
                type: 'pass',
                title: 'Escudo Magnetosférico Activo',
                desc: 'Protege a la hidrosfera y la atmósfera contra el efecto de decapado por viento solar estelar.'
            });
        } else {
            audits.push({
                type: 'warn',
                title: 'Vulnerable a Radiación Estelar',
                desc: 'Sin dínamo dipolar, la fotoevaporación y los rayos cósmicos descomponen el vapor de agua.'
            });
        }

        // Fase Líquida
        if (state.liquidType === 'water') {
            if (tSurfC < 0) {
                audits.push({
                    type: 'warn',
                    title: 'Hidrosfera Congelada (T < 0°C)',
                    desc: 'Océanos superficiales petrificados en hielo. Posibles océanos subglaciales por calor geotérmico.'
                });
            } else if (tSurfC > 100 && state.pressureBar < 1.0) {
                audits.push({
                    type: 'fail',
                    title: 'Ebullición Catastrófica de Océanos',
                    desc: 'La temperatura supera el punto de ebullición para la presión barométrica actual. El agua hierve a vapor.'
                });
            } else {
                audits.push({
                    type: 'pass',
                    title: 'Agua Líquida Superficial Estable',
                    desc: 'La combinación de presión y temperatura se sitúa perfectamente en la ventana de fase líquida del agua.'
                });
            }
        }

        return {
            gravityG,
            gravityMs2,
            vEsc,
            density,
            flux,
            teq,
            deltaTGreenhouse,
            tSurfK,
            tSurfC,
            avgMolarMass,
            jeansResults,
            rainPh,
            rainDesc,
            magFieldGauss,
            magTitle,
            magDesc,
            hzStatus,
            hzText,
            esi,
            simR,
            simD,
            simV,
            simT,
            planetClass,
            audits
        };
    }

    // --- ACTUALIZACIÓN DE LA UI ---
    function updateUI() {
        const p = calculatePhysicsAndChemistry();

        // 1. Header & Nombre
        const elName = document.getElementById('pc-planet-name');
        if (elName && elName.value !== state.name) state.name = elName.value;

        const elClass = document.getElementById('pc-planet-class');
        if (elClass) elClass.textContent = p.planetClass;

        const elHeaderEsi = document.getElementById('pc-header-esi');
        if (elHeaderEsi) elHeaderEsi.textContent = `ESI: ${p.esi.toFixed(2)}`;

        const elLaunchText = document.getElementById('pc-btn-launch-text');
        if (elLaunchText) {
            if (state.starType === 'G') {
                elLaunchText.textContent = '¡Inyectar en Sistema Solar!';
            } else {
                const star = STAR_DATA[state.starType];
                elLaunchText.textContent = `¡Fundar Sistema ${star ? star.name.split(' ')[0] : 'Custom'}!`;
            }
        }

        // 2. HUD sobre lienzo 3D
        const elHudGrav = document.getElementById('pc-hud-gravity');
        if (elHudGrav) elHudGrav.textContent = `${p.gravityG.toFixed(2)} g (${p.gravityMs2.toFixed(1)} m/s²)`;

        const elHudDens = document.getElementById('pc-hud-density');
        if (elHudDens) elHudDens.textContent = `${p.density.toFixed(2)} g/cm³`;

        const elHudTemp = document.getElementById('pc-hud-temp');
        if (elHudTemp) elHudTemp.textContent = `${p.tSurfC.toFixed(0)} °C (${p.tSurfK.toFixed(0)} K)`;

        const elHudVesc = document.getElementById('pc-hud-vesc');
        if (elHudVesc) elHudVesc.textContent = `${p.vEsc.toFixed(1)} km/s`;

        // Dictamen Rápido
        const elVerdTitle = document.getElementById('pc-verdict-title');
        const elVerdDesc = document.getElementById('pc-verdict-desc');
        const elVerdIcon = document.getElementById('pc-verdict-icon');
        if (elVerdTitle && elVerdDesc && elVerdIcon) {
            const hasFail = p.audits.some(a => a.type === 'fail');
            const hasWarn = p.audits.some(a => a.type === 'warn');
            if (hasFail) {
                elVerdIcon.innerHTML = '<i class="fa-solid fa-triangle-exclamation" style="color:var(--danger,#ff6b6b);"></i>';
                elVerdTitle.textContent = 'Incoherencia Físico-Química Crítica';
                elVerdDesc.textContent = p.audits.find(a => a.type === 'fail').desc;
            } else if (hasWarn) {
                elVerdIcon.innerHTML = '<i class="fa-solid fa-circle-exclamation" style="color:#eab308;"></i>';
                elVerdTitle.textContent = 'Condiciones Extremas / Fuga Activa';
                elVerdDesc.textContent = p.audits.find(a => a.type === 'warn').desc;
            } else {
                elVerdIcon.innerHTML = '<i class="fa-solid fa-circle-check" style="color:var(--success,#3dd598);"></i>';
                elVerdTitle.textContent = 'Estructura Planetaria Coherente';
                elVerdDesc.textContent = 'Equilibrio termodinámico óptimo entre atracción gravitatoria y desgasificación química.';
            }
        }

        // 3. Tab 1: Órbita & Sol
        const elValDist = document.getElementById('pc-val-distance');
        if (elValDist) elValDist.textContent = `${state.distanceAU.toFixed(2)} UA`;

        const elGoldilocks = document.getElementById('pc-goldilocks-status');
        if (elGoldilocks) {
            elGoldilocks.className = `pc-status-pill is-${p.hzStatus}`;
            elGoldilocks.innerHTML = `<i class="fa-solid fa-shield-halved"></i> ${p.hzText}`;
        }

        const elFlux = document.getElementById('pc-flux-val');
        if (elFlux) elFlux.textContent = `Flujo: ${p.flux.toFixed(0)} W/m²`;

        const elValMass = document.getElementById('pc-val-mass');
        if (elValMass) elValMass.textContent = `${state.massEarth.toFixed(2)} M⊕`;

        const elValRadius = document.getElementById('pc-val-radius');
        if (elValRadius) elValRadius.textContent = `${state.radiusEarth.toFixed(2)} R⊕ (${Math.round(state.radiusEarth * 6371).toLocaleString()} km)`;

        const elDensInd = document.getElementById('pc-density-indicator');
        if (elDensInd) {
            let densComp = 'Rocoso Silicatado';
            if (p.density > 7.5) densComp = 'Núcleo Metálico Denso';
            else if (p.density < 2.5) densComp = 'Rico en Volátiles / Agua';
            elDensInd.textContent = `Densidad resultante: ${p.density.toFixed(2)} g/cm³ (${densComp})`;
        }

        const elValEcc = document.getElementById('pc-val-eccentricity');
        if (elValEcc) elValEcc.textContent = `${state.eccentricity.toFixed(3)} (${state.eccentricity < 0.05 ? 'Casi circular' : 'Elíptica marcada'})`;

        // 4. Tab 2: Geofísica
        const elValTect = document.getElementById('pc-val-tectonics');
        if (elValTect) {
            const labels = ['Inerte / Placa Única', 'Activa (Ciclo Carbono-Silicato)', 'Vigorosa (Vulcanismo Hiperactivo)'];
            elValTect.textContent = labels[state.tectonics] || 'Activa';
        }

        const elMagTitle = document.getElementById('pc-mag-title');
        const elMagDesc = document.getElementById('pc-mag-desc');
        if (elMagTitle) elMagTitle.textContent = p.magTitle;
        if (elMagDesc) elMagDesc.textContent = p.magDesc;

        // 5. Tab 3: Química Atmosférica
        const elValPress = document.getElementById('pc-val-pressure');
        if (elValPress) elValPress.textContent = `${state.pressureBar.toFixed(2)} bar (${(state.pressureBar * 0.9869).toFixed(2)} atm)`;

        // Actualizar badges de Jeans
        Object.keys(p.jeansResults).forEach(gasKey => {
            const jPill = document.getElementById(`jeans-${gasKey}`);
            const jInfo = p.jeansResults[gasKey];
            if (jPill) {
                if (state.gases[gasKey] === 0) {
                    jPill.className = 'pc-jeans-pill';
                    jPill.style.background = 'rgba(255,255,255,0.05)';
                    jPill.style.color = '#6e7896';
                    jPill.textContent = 'Traza nula';
                } else if (jInfo.retained) {
                    jPill.className = 'pc-jeans-pill is-kept';
                    jPill.textContent = 'Retenido';
                    jPill.title = `Vel. térmica: ${jInfo.vTherm} km/s < Umbral: ${(p.vEsc / 6).toFixed(1)} km/s`;
                } else {
                    jPill.className = 'pc-jeans-pill is-escaped';
                    jPill.textContent = 'Fuga Térmica';
                    jPill.title = `Vel. térmica: ${jInfo.vTherm} km/s supera la contención gravitacional`;
                }
            }
        });

        const elValGh = document.getElementById('pc-val-greenhouse');
        if (elValGh) elValGh.textContent = `+${p.deltaTGreenhouse.toFixed(0)} °C`;

        const elValPh = document.getElementById('pc-val-rain-ph');
        if (elValPh) elValPh.textContent = p.rainDesc;

        const elValMolar = document.getElementById('pc-val-molarmass');
        if (elValMolar) elValMolar.textContent = `${p.avgMolarMass.toFixed(1)} g/mol`;

        // 6. Tab 4: Océanos
        const elValOc = document.getElementById('pc-val-ocean-cover');
        if (elValOc) elValOc.textContent = `${state.oceanCover}%`;

        const elValIce = document.getElementById('pc-val-ice-caps');
        if (elValIce) elValIce.textContent = `${state.iceCaps}%`;

        // 7. Tab 5: Peritaje Científico & ESI
        const elRepEsi = document.getElementById('pc-report-esi');
        if (elRepEsi) elRepEsi.textContent = p.esi.toFixed(2);

        const elBarR = document.getElementById('pc-esi-bar-r');
        if (elBarR) elBarR.style.width = `${Math.round(p.simR * 100)}%`;
        const elBarD = document.getElementById('pc-esi-bar-d');
        if (elBarD) elBarD.style.width = `${Math.round(p.simD * 100)}%`;
        const elBarV = document.getElementById('pc-esi-bar-v');
        if (elBarV) elBarV.style.width = `${Math.round(p.simV * 100)}%`;
        const elBarT = document.getElementById('pc-esi-bar-t');
        if (elBarT) elBarT.style.width = `${Math.round(p.simT * 100)}%`;

        const elAuditList = document.getElementById('pc-audit-list');
        if (elAuditList) {
            elAuditList.innerHTML = p.audits.map(a => `
                <div class="pc-audit-item is-${a.type}">
                    <i class="fa-solid ${a.type === 'pass' ? 'fa-circle-check' : (a.type === 'warn' ? 'fa-triangle-exclamation' : 'fa-circle-xmark')}"></i>
                    <div class="pc-audit-content">
                        <strong>${a.title}</strong>
                        <p>${a.desc}</p>
                    </div>
                </div>
            `).join('');
        }

        // Actualizar visualización procedural 3D
        update3DPlanetVisuals(p);
    }

    // --- OPTIMIZACIÓN DE RENDIMIENTO: CANVASES PERSISTENTES & TABLAS PRECALCULADAS ---
    const TEX_WIDTH = 512;
    const TEX_HEIGHT = 256;

    let planetCanvas = null;
    let planetCtx = null;
    let planetImgData = null;
    let planetTexture = null;

    let cloudsCanvas = null;
    let cloudsCtx = null;
    let cloudsImgData = null;
    let cloudsTexture = null;

    let bakeRafId = null;
    let pendingPhysics = null;

    // Tablas trigonométricas precalculadas para 0 llamadas Math.sin/cos en el bucle de píxeles
    const sinNx6 = new Float32Array(TEX_WIDTH);
    const sinNx14 = new Float32Array(TEX_WIDTH);
    const sinNx26 = new Float32Array(TEX_WIDTH);
    const sinNx48 = new Float32Array(TEX_WIDTH);
    for (let x = 0; x < TEX_WIDTH; x++) {
        const nx = x / TEX_WIDTH;
        sinNx6[x] = Math.sin(nx * Math.PI * 6);
        sinNx14[x] = Math.sin(nx * Math.PI * 14 + 1.2);
        sinNx26[x] = Math.sin(nx * Math.PI * 26 + 3.4);
        sinNx48[x] = Math.sin(nx * Math.PI * 48);
    }

    const cosNy4 = new Float32Array(TEX_HEIGHT);
    const sinNy10 = new Float32Array(TEX_HEIGHT);
    const cosNy20 = new Float32Array(TEX_HEIGHT);
    const latDistArr = new Float32Array(TEX_HEIGHT);
    for (let y = 0; y < TEX_HEIGHT; y++) {
        const ny = y / TEX_HEIGHT;
        cosNy4[y] = Math.cos(ny * Math.PI * 4);
        sinNy10[y] = Math.sin(ny * Math.PI * 10);
        cosNy20[y] = Math.cos(ny * Math.PI * 20);
        latDistArr[y] = Math.abs(ny - 0.5) * 2;
    }

    const cloudSinNx8 = new Float32Array(TEX_WIDTH);
    const cloudSinNx22 = new Float32Array(TEX_WIDTH);
    const cloudSinNx40 = new Float32Array(TEX_WIDTH);
    for (let x = 0; x < TEX_WIDTH; x++) {
        const nx = x / TEX_WIDTH;
        cloudSinNx8[x] = Math.sin(nx * Math.PI * 8);
        cloudSinNx22[x] = Math.sin(nx * Math.PI * 22);
        cloudSinNx40[x] = Math.sin(nx * Math.PI * 40);
    }

    const cloudCosNy4 = new Float32Array(TEX_HEIGHT);
    const cloudSinNy12 = new Float32Array(TEX_HEIGHT);
    for (let y = 0; y < TEX_HEIGHT; y++) {
        const ny = y / TEX_HEIGHT;
        cloudCosNy4[y] = Math.cos(ny * Math.PI * 4) * 2;
        cloudSinNy12[y] = Math.sin(ny * Math.PI * 12);
    }

    // Hornear textura del terreno en el canvas persistente
    function bakePlanetTexture(physics) {
        if (!planetCanvas || !planetCtx || !planetImgData) return;

        let cLiq, cLand1, cLand2, cIce;
        if (state.liquidType === 'water') {
            cLiq = (physics.tSurfC < 0) ? [139, 170, 201] : [16, 48, 88];
            cLand1 = [40, 80, 40];
            cLand2 = [140, 116, 80];
            cIce = [238, 246, 255];
        } else if (state.liquidType === 'methane') {
            cLiq = [36, 64, 56];
            cLand1 = [186, 120, 48];
            cLand2 = [106, 64, 28];
            cIce = [238, 210, 164];
        } else if (state.liquidType === 'magma') {
            cLiq = [255, 43, 0];
            cLand1 = [28, 16, 13];
            cLand2 = [58, 30, 22];
            cIce = [80, 32, 16];
        } else { // 'dry'
            cLiq = [128, 74, 44];
            cLand1 = [166, 91, 50];
            cLand2 = [212, 141, 93];
            cIce = [230, 200, 179];
        }

        const oceanThreshold = (100 - state.oceanCover) / 100;
        const iceThreshold = 1.0 - (state.iceCaps / 100) * 0.45;
        const data = planetImgData.data;

        let idx = 0;
        for (let y = 0; y < TEX_HEIGHT; y++) {
            const rowCos4 = cosNy4[y];
            const rowSin10 = sinNy10[y];
            const rowCos20 = cosNy20[y];
            const latDist = latDistArr[y];
            const isIce = latDist > iceThreshold;

            for (let x = 0; x < TEX_WIDTH; x++) {
                if (isIce) {
                    data[idx] = cIce[0];
                    data[idx + 1] = cIce[1];
                    data[idx + 2] = cIce[2];
                } else {
                    const val = sinNx6[x] * rowCos4 * 0.4
                              + sinNx14[x] * rowSin10 * 0.25
                              + sinNx26[x] * rowCos20 * 0.15
                              + sinNx48[x] * 0.1
                              + 0.5;

                    if (val > (1.0 - oceanThreshold)) {
                        const landFactor = oceanThreshold > 0.001 ? (val - (1.0 - oceanThreshold)) / oceanThreshold : 0.5;
                        data[idx] = (cLand1[0] * (1 - landFactor) + cLand2[0] * landFactor) | 0;
                        data[idx + 1] = (cLand1[1] * (1 - landFactor) + cLand2[1] * landFactor) | 0;
                        data[idx + 2] = (cLand1[2] * (1 - landFactor) + cLand2[2] * landFactor) | 0;
                    } else {
                        data[idx] = cLiq[0];
                        data[idx + 1] = cLiq[1];
                        data[idx + 2] = cLiq[2];
                    }
                }
                data[idx + 3] = 255;
                idx += 4;
            }
        }

        planetCtx.putImageData(planetImgData, 0, 0);
        if (planetTexture) planetTexture.needsUpdate = true;
    }

    // Hornear textura de nubes en canvas persistente
    function bakeCloudsTexture() {
        if (!cloudsCanvas || !cloudsCtx || !cloudsImgData) return;

        let rCloud = 255, gCloud = 255, bCloud = 255;
        if (state.gases.SO2 > 0.5) {
            rCloud = 240; gCloud = 220; bCloud = 120;
        } else if (state.gases.CH4 > 3) {
            rCloud = 230; gCloud = 160; bCloud = 90;
        }

        const cloudDensity = Math.min(1.0, state.pressureBar * 0.8);
        const data = cloudsImgData.data;

        let idx = 0;
        for (let y = 0; y < TEX_HEIGHT; y++) {
            const rowCloudCos4 = cloudCosNy4[y];
            const rowCloudSin12 = cloudSinNy12[y];

            for (let x = 0; x < TEX_WIDTH; x++) {
                const noise = (cloudSinNx8[x] + rowCloudCos4) * 0.3
                            + cloudSinNx22[x] * rowCloudSin12 * 0.3
                            + cloudSinNx40[x] * 0.15
                            + 0.45;

                const alpha = noise > 0.52 ? Math.min(240, ((noise - 0.52) * 450 * cloudDensity) | 0) : 0;

                data[idx] = rCloud;
                data[idx + 1] = gCloud;
                data[idx + 2] = bCloud;
                data[idx + 3] = alpha;
                idx += 4;
            }
        }

        cloudsCtx.putImageData(cloudsImgData, 0, 0);
        if (cloudsTexture) cloudsTexture.needsUpdate = true;
    }

    // Solicitud desacoplada de horneado (60 FPS fluidos con requestAnimationFrame)
    function requestTextureBake(physics) {
        pendingPhysics = physics;
        if (!bakeRafId) {
            bakeRafId = requestAnimationFrame(() => {
                bakeRafId = null;
                if (pendingPhysics) {
                    bakePlanetTexture(pendingPhysics);
                    bakeCloudsTexture();
                }
            });
        }
    }

    // --- ACTUALIZACIÓN VISUAL DEL PLANETA 3D (CERO REASIGNACIÓN DE MEMORIA) ---
    function update3DPlanetVisuals(physics) {
        if (!planetMesh) return;

        // 1. Escala por matriz en GPU: O(1) tiempo real instantáneo
        planetMesh.scale.setScalar(state.radiusEarth);

        // 2. Wireframe
        planetMesh.material.wireframe = state.wireframe;

        // 3. Visibilidad de nubes
        if (cloudsMesh) {
            cloudsMesh.visible = state.showClouds && state.pressureBar > 0.05;
        }

        // 4. Halo atmosférico (Glow Fresnel)
        if (atmosphereGlowMesh) {
            atmosphereGlowMesh.visible = state.showGlow && state.pressureBar > 0.02;

            let glowCol = 0x4aa3df;
            if (state.gases.SO2 > 0.5) glowCol = 0xeab308;
            else if (state.gases.CH4 > 2) glowCol = 0xf97316;
            else if (state.gases.CO2 > 50) glowCol = 0xfde047;
            else if (physics.tSurfC > 700) glowCol = 0xff4422;

            atmosphereGlowMesh.material.color.setHex(glowCol);
            atmosphereGlowMesh.material.opacity = Math.min(0.7, state.pressureBar * 0.35 + 0.15);
        }

        // 5. Anillos
        if (ringMesh) {
            ringMesh.visible = state.showRings;
        }

        // 6. Hornear texturas de forma asíncrona
        requestTextureBake(physics);
    }

    // --- CONFIGURACIÓN DE THREE.JS VIEWPORT ---
    function initThreePreview() {
        const container = document.getElementById('pc-canvas-container');
        const canvas = document.getElementById('pc-three-canvas');
        if (!container || !canvas) return;

        const w = container.clientWidth || 400;
        const h = container.clientHeight || 450;

        previewScene = new THREE.Scene();
        previewCamera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
        previewCamera.position.set(0, 4, 18);

        previewRenderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
        });
        previewRenderer.setSize(w, h);
        previewRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

        // Canvases y Texturas Persistentes
        planetCanvas = document.createElement('canvas');
        planetCanvas.width = TEX_WIDTH;
        planetCanvas.height = TEX_HEIGHT;
        planetCtx = planetCanvas.getContext('2d', { willReadFrequently: true });
        planetImgData = planetCtx.createImageData(TEX_WIDTH, TEX_HEIGHT);
        planetTexture = new THREE.CanvasTexture(planetCanvas);

        cloudsCanvas = document.createElement('canvas');
        cloudsCanvas.width = TEX_WIDTH;
        cloudsCanvas.height = TEX_HEIGHT;
        cloudsCtx = cloudsCanvas.getContext('2d', { willReadFrequently: true });
        cloudsImgData = cloudsCtx.createImageData(TEX_WIDTH, TEX_HEIGHT);
        cloudsTexture = new THREE.CanvasTexture(cloudsCanvas);

        // Luces
        const dirLight = new THREE.DirectionalLight(0xffffff, 1.4);
        dirLight.position.set(15, 10, 15);
        previewScene.add(dirLight);

        const ambLight = new THREE.AmbientLight(0x222638, 0.8);
        previewScene.add(ambLight);

        // Malla del Planeta (Geometría fija única)
        const geo = new THREE.SphereGeometry(4.2, 40, 40);
        const mat = new THREE.MeshStandardMaterial({
            map: planetTexture,
            roughness: 0.8,
            metalness: 0.1
        });
        planetMesh = new THREE.Mesh(geo, mat);
        previewScene.add(planetMesh);

        // Malla de Nubes
        const cloudGeo = new THREE.SphereGeometry(4.2 * 1.025, 36, 36);
        const cloudMat = new THREE.MeshStandardMaterial({
            map: cloudsTexture,
            transparent: true,
            opacity: 0.75,
            blending: THREE.NormalBlending,
            depthWrite: false
        });
        cloudsMesh = new THREE.Mesh(cloudGeo, cloudMat);
        planetMesh.add(cloudsMesh);

        // Halo de Dispersión Atmosférica
        const glowGeo = new THREE.SphereGeometry(4.2 * 1.15, 32, 32);
        const glowMat = new THREE.MeshBasicMaterial({
            color: 0x4aa3df,
            transparent: true,
            opacity: 0.4,
            side: THREE.BackSide,
            blending: THREE.AdditiveBlending
        });
        atmosphereGlowMesh = new THREE.Mesh(glowGeo, glowMat);
        planetMesh.add(atmosphereGlowMesh);

        // Anillos
        const ringGeo = new THREE.RingGeometry(1.6 * 4.2, 2.5 * 4.2, 48);
        const ringMat = new THREE.MeshStandardMaterial({
            color: 0xcdb99f,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.8
        });
        ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.rotation.x = Math.PI / 2.3;
        ringMesh.visible = false;
        planetMesh.add(ringMesh);

        // Control Manual de Órbita con el Ratón
        canvas.addEventListener('mousedown', (e) => {
            isDragging = true;
            prevMousePos = { x: e.clientX, y: e.clientY };
        });

        window.addEventListener('mouseup', () => {
            isDragging = false;
        });

        canvas.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const deltaX = e.clientX - prevMousePos.x;
            const deltaY = e.clientY - prevMousePos.y;
            planetMesh.rotation.y += deltaX * 0.008;
            planetMesh.rotation.x += deltaY * 0.008;
            prevMousePos = { x: e.clientX, y: e.clientY };
        });

        // Loop de Renderizado
        function animate() {
            previewAnimId = requestAnimationFrame(animate);

            if (!isDragging) {
                planetMesh.rotation.y += state.rotSpeed;
                if (cloudsMesh) cloudsMesh.rotation.y += state.rotSpeed * 0.5;
            }

            previewRenderer.render(previewScene, previewCamera);
        }
        animate();

        // Responsive resize
        const resizeObs = new ResizeObserver(() => {
            if (!container || !previewRenderer || !previewCamera) return;
            const nw = container.clientWidth;
            const nh = container.clientHeight;
            if (nw === 0 || nh === 0) return;
            previewCamera.aspect = nw / nh;
            previewCamera.updateProjectionMatrix();
            previewRenderer.setSize(nw, nh);
        });
        resizeObs.observe(container);
    }

    // --- SETUP DE EVENT LISTENERS DEL PANEL ---
    function setupEventListeners() {
        // Cierre del modal
        const btnClose = document.getElementById('btn-close-creator');
        if (btnClose) btnClose.addEventListener('click', closePlanetCreator);

        const backdrop = document.getElementById('planet-creator-backdrop');
        if (backdrop) {
            backdrop.addEventListener('click', (e) => {
                if (e.target === backdrop) closePlanetCreator();
            });
        }

        // Renombrar planeta
        const elName = document.getElementById('pc-planet-name');
        if (elName) {
            elName.addEventListener('input', (e) => {
                state.name = e.target.value.trim() || 'Exoplaneta Custom';
                updateUI();
            });
        }

        // Presets Rápidos
        document.querySelectorAll('.pc-preset-btn[data-preset]').forEach(btn => {
            btn.addEventListener('click', () => {
                const pKey = btn.getAttribute('data-preset');
                if (PRESETS[pKey]) {
                    Object.assign(state, JSON.parse(JSON.stringify(PRESETS[pKey])));
                    syncInputsFromState();
                    updateUI();
                }
            });
        });

        // Azar Coherente
        const btnRandom = document.getElementById('btn-pc-random');
        if (btnRandom) {
            btnRandom.addEventListener('click', generateRandomPlanet);
        }

        // Navegación por Pestañas del Wizard
        document.querySelectorAll('.pc-tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.pc-tab-btn').forEach(b => b.classList.remove('is-active'));
                document.querySelectorAll('.pc-tab-pane').forEach(p => p.classList.remove('is-active'));
                btn.classList.add('is-active');
                const targetId = btn.getAttribute('data-tab');
                const targetPane = document.getElementById(targetId);
                if (targetPane) targetPane.classList.add('is-active');
            });
        });

        // Selector de Estrella
        document.querySelectorAll('.pc-star-pill').forEach(pill => {
            pill.addEventListener('click', () => {
                document.querySelectorAll('.pc-star-pill').forEach(p => p.classList.remove('is-selected'));
                pill.classList.add('is-selected');
                state.starType = pill.getAttribute('data-star');
                updateUI();
            });
        });

        // Sliders de Órbita & Dimensiones
        bindSlider('pc-slider-distance', 'distanceAU');
        bindSlider('pc-slider-mass', 'massEarth');
        bindSlider('pc-slider-radius', 'radiusEarth');
        bindSlider('pc-slider-eccentricity', 'eccentricity');

        // Selector de Núcleo
        document.querySelectorAll('#pc-core-options .pc-option-card').forEach(card => {
            card.addEventListener('click', () => {
                document.querySelectorAll('#pc-core-options .pc-option-card').forEach(c => c.classList.remove('is-selected'));
                card.classList.add('is-selected');
                state.coreType = card.getAttribute('data-core');
                updateUI();
            });
        });

        // Tectónica
        bindSlider('pc-slider-tectonics', 'tectonics');

        // Presión Atmosférica
        bindSlider('pc-slider-pressure', 'pressureBar');

        // Sliders de Gases
        document.querySelectorAll('.pc-gas-slider').forEach(slider => {
            slider.addEventListener('input', (e) => {
                const gas = slider.getAttribute('data-gas');
                const val = parseInt(e.target.value, 10) || 0;
                state.gases[gas] = val;
                const row = slider.closest('.pc-gas-row');
                if (row) {
                    const pctEl = row.querySelector('.pc-gas-pct');
                    if (pctEl) pctEl.textContent = `${val}%`;
                }
                updateUI();
            });
        });

        // Selector de Tipo de Líquido
        document.querySelectorAll('#pc-liquid-options .pc-option-card').forEach(card => {
            card.addEventListener('click', () => {
                document.querySelectorAll('#pc-liquid-options .pc-option-card').forEach(c => c.classList.remove('is-selected'));
                card.classList.add('is-selected');
                state.liquidType = card.getAttribute('data-liquid');
                updateUI();
            });
        });

        // Cobertura de Líquido y Hielo
        bindSlider('pc-slider-ocean-cover', 'oceanCover');
        bindSlider('pc-slider-ice-caps', 'iceCaps');

        // Toggle de Anillos en Tab 4
        const chkRings = document.getElementById('pc-chk-rings');
        if (chkRings) {
            chkRings.addEventListener('change', (e) => {
                state.hasRings = e.target.checked;
                state.showRings = e.target.checked;
                const btnRings = document.getElementById('btn-toggle-rings');
                if (btnRings) btnRings.classList.toggle('is-active', state.showRings);
                updateUI();
            });
        }

        // Toolbar 3D
        bindToggleBtn('btn-toggle-clouds', (active) => { state.showClouds = active; updateUI(); });
        bindToggleBtn('btn-toggle-rings', (active) => { state.showRings = active; updateUI(); });
        bindToggleBtn('btn-toggle-atmo-glow', (active) => { state.showGlow = active; updateUI(); });
        bindToggleBtn('btn-toggle-wireframe', (active) => { state.wireframe = active; updateUI(); });

        const btnResetCam = document.getElementById('btn-reset-cam-preview');
        if (btnResetCam) {
            btnResetCam.addEventListener('click', () => {
                if (planetMesh) {
                    planetMesh.rotation.set(0, 0, 0);
                }
            });
        }

        // Copiar Ficha JSON
        const btnCopy = document.getElementById('btn-copy-planet-json');
        if (btnCopy) {
            btnCopy.addEventListener('click', () => {
                const physics = calculatePhysicsAndChemistry();
                const exportData = {
                    metadata: {
                        system: 'Estelaris Planet Generator v1.0',
                        name: state.name,
                        class: physics.planetClass,
                        esi: physics.esi.toFixed(3)
                    },
                    orbitalMechanics: {
                        starType: state.starType,
                        semiMajorAxisAU: state.distanceAU,
                        eccentricity: state.eccentricity,
                        incidentFluxWm2: Math.round(physics.flux)
                    },
                    geophysics: {
                        massEarth: state.massEarth,
                        radiusEarth: state.radiusEarth,
                        densityGcm3: physics.density.toFixed(2),
                        surfaceGravityG: physics.gravityG.toFixed(2),
                        escapeVelocityKms: physics.vEsc.toFixed(2),
                        core: state.coreType,
                        magnetosphereGauss: physics.magFieldGauss
                    },
                    atmosphericChemistry: {
                        surfacePressureBar: state.pressureBar,
                        surfaceTempC: Math.round(physics.tSurfC),
                        greenhouseWarmingC: Math.round(physics.deltaTGreenhouse),
                        rainType: physics.rainDesc,
                        molarCompositionPct: state.gases
                    },
                    hydrosphere: {
                        liquid: state.liquidType,
                        oceanCoveragePct: state.oceanCover,
                        iceCoveragePct: state.iceCaps
                    }
                };

                navigator.clipboard.writeText(JSON.stringify(exportData, null, 2)).then(() => {
                    const origText = btnCopy.innerHTML;
                    btnCopy.innerHTML = '<i class="fa-solid fa-check" style="color:var(--success);"></i> ¡Copiado!';
                    setTimeout(() => { btnCopy.innerHTML = origText; }, 2000);
                });
            });
        }

        // EXPORTAR SISTEMA COMPLETO EN JSON
        const btnExportSys = document.getElementById('btn-export-system-json');
        if (btnExportSys) {
            btnExportSys.addEventListener('click', exportSystemToJSON);
        }

        // IMPORTAR SISTEMA COMPLETO DESDE ARCHIVO JSON
        const btnImportTrigger = document.getElementById('btn-import-system-file');
        const fileImportInput = document.getElementById('pc-import-file-input');
        if (btnImportTrigger && fileImportInput) {
            btnImportTrigger.addEventListener('click', () => fileImportInput.click());
            fileImportInput.addEventListener('change', (e) => {
                if (e.target.files && e.target.files[0]) {
                    importSystemFromJSON(e.target.files[0]);
                    e.target.value = '';
                }
            });
        }

        // INYECCIÓN O FUNDACIÓN DE SISTEMA ESTELAR
        const btnInject = document.getElementById('btn-inject-planet-solar');
        if (btnInject) {
            btnInject.addEventListener('click', injectPlanetIntoUniverse);
        }
    }

    function bindSlider(id, stateKey) {
        const slider = document.getElementById(id);
        if (!slider) return;
        slider.addEventListener('input', (e) => {
            state[stateKey] = parseFloat(e.target.value);
            updateUI();
        });
    }

    function bindToggleBtn(id, callback) {
        const btn = document.getElementById(id);
        if (!btn) return;
        btn.addEventListener('click', () => {
            btn.classList.toggle('is-active');
            const isActive = btn.classList.contains('is-active');
            callback(isActive);
        });
    }

    function syncInputsFromState() {
        const elName = document.getElementById('pc-planet-name');
        if (elName) elName.value = state.name;

        // Estrella
        document.querySelectorAll('.pc-star-pill').forEach(pill => {
            pill.classList.toggle('is-selected', pill.getAttribute('data-star') === state.starType);
        });

        // Sliders
        setSliderVal('pc-slider-distance', state.distanceAU);
        setSliderVal('pc-slider-mass', state.massEarth);
        setSliderVal('pc-slider-radius', state.radiusEarth);
        setSliderVal('pc-slider-eccentricity', state.eccentricity);
        setSliderVal('pc-slider-tectonics', state.tectonics);
        setSliderVal('pc-slider-pressure', state.pressureBar);
        setSliderVal('pc-slider-ocean-cover', state.oceanCover);
        setSliderVal('pc-slider-ice-caps', state.iceCaps);

        // Core
        document.querySelectorAll('#pc-core-options .pc-option-card').forEach(card => {
            card.classList.toggle('is-selected', card.getAttribute('data-core') === state.coreType);
        });

        // Líquido
        document.querySelectorAll('#pc-liquid-options .pc-option-card').forEach(card => {
            card.classList.toggle('is-selected', card.getAttribute('data-liquid') === state.liquidType);
        });

        // Gases
        Object.keys(state.gases).forEach(gas => {
            const row = document.querySelector(`.pc-gas-row[data-gas="${gas}"]`);
            if (row) {
                const s = row.querySelector('.pc-gas-slider');
                const p = row.querySelector('.pc-gas-pct');
                if (s) s.value = state.gases[gas];
                if (p) p.textContent = `${state.gases[gas]}%`;
            }
        });

        const chkRings = document.getElementById('pc-chk-rings');
        if (chkRings) chkRings.checked = state.hasRings;
        const btnRings = document.getElementById('btn-toggle-rings');
        if (btnRings) btnRings.classList.toggle('is-active', state.showRings);
    }

    function setSliderVal(id, val) {
        const el = document.getElementById(id);
        if (el) el.value = val;
    }

    // --- GENERADOR COHERENTE AL AZAR ---
    function generateRandomPlanet() {
        const prefixes = ['Kepler', 'Gliese', 'Astraea', 'TRAPPIST', 'Kallisto', 'Elysium', 'Chronos', 'Aethel'];
        const suffixes = ['b', 'c', 'd', 'e', 'IV', 'VII', 'Prime', 'Major'];
        state.name = `${prefixes[Math.floor(Math.random() * prefixes.length)]}-${suffixes[Math.floor(Math.random() * suffixes.length)]}`;

        const rDist = parseFloat((0.4 + Math.random() * 2.8).toFixed(2));
        state.distanceAU = rDist;
        state.starType = Math.random() > 0.3 ? 'G' : (Math.random() > 0.5 ? 'M' : 'F');

        // Masa y radio físicamente acoplados (Ley de potencia M ~ R^3.5 aprox para rocosos)
        const rRad = parseFloat((0.6 + Math.random() * 1.6).toFixed(2));
        state.radiusEarth = rRad;
        const rMass = parseFloat((Math.pow(rRad, 3.2) * (0.8 + Math.random() * 0.4)).toFixed(2));
        state.massEarth = Math.max(0.1, rMass);
        state.eccentricity = parseFloat((Math.random() * 0.12).toFixed(3));

        state.coreType = state.massEarth > 0.5 ? (Math.random() > 0.2 ? 'fe-liquid' : 'fe-solid') : 'silicate';
        state.tectonics = state.massEarth > 0.8 ? 1 : 0;

        // Atmósfera según masa
        if (state.massEarth < 0.25) {
            state.pressureBar = parseFloat((Math.random() * 0.05).toFixed(2));
            state.liquidType = 'dry';
            state.oceanCover = 0;
        } else {
            state.pressureBar = parseFloat((0.2 + Math.random() * 4.0).toFixed(2));
            if (rDist < 0.7) {
                state.liquidType = 'dry';
                state.oceanCover = 0;
                state.gases = { N2: 10, O2: 0, CO2: 85, CH4: 0, H2O: 0, SO2: 5, NH3: 0, H2: 0, Ar: 0 };
            } else if (rDist > 2.0) {
                state.liquidType = 'methane';
                state.oceanCover = Math.floor(Math.random() * 60);
                state.gases = { N2: 92, O2: 0, CO2: 0, CH4: 6, H2O: 0, SO2: 0, NH3: 1, H2: 1, Ar: 0 };
            } else {
                state.liquidType = 'water';
                state.oceanCover = Math.floor(30 + Math.random() * 65);
                state.iceCaps = Math.floor(Math.random() * 30);
                state.gases = { N2: 75, O2: 20, CO2: 2, CH4: 0, H2O: 2, SO2: 0, NH3: 0, H2: 0, Ar: 1 };
            }
        }

        syncInputsFromState();
        updateUI();
    }

    // --- EXPORTACIÓN DE SISTEMA A JSON DESCARGABLE ---
    function exportSystemToJSON() {
        const physics = calculatePhysicsAndChemistry();
        const star = STAR_DATA[state.starType] || STAR_DATA['G'];
        const elSysName = document.getElementById('pc-system-name');
        const sysName = (elSysName && elSysName.value.trim()) ? elSysName.value.trim() : `Sistema ${state.name}`;

        const systemExport = {
            format: 'estelaris-system-v1',
            systemName: sysName,
            createdAt: new Date().toISOString(),
            star: {
                type: state.starType,
                name: star.name,
                luminosity: star.lum,
                teff: star.teff,
                mass: star.mass,
                color: star.color
            },
            planets: [
                {
                    name: state.name,
                    distanceAU: state.distanceAU,
                    massEarth: state.massEarth,
                    radiusEarth: state.radiusEarth,
                    eccentricity: state.eccentricity,
                    coreType: state.coreType,
                    tectonics: state.tectonics,
                    pressureBar: state.pressureBar,
                    gases: { ...state.gases },
                    liquidType: state.liquidType,
                    oceanCover: state.oceanCover,
                    iceCaps: state.iceCaps,
                    hasRings: state.hasRings,
                    physicsData: {
                        planetClass: physics.planetClass,
                        esi: physics.esi,
                        density: physics.density,
                        gravityG: physics.gravityG,
                        vEsc: physics.vEsc,
                        tSurfC: physics.tSurfC,
                        rainDesc: physics.rainDesc
                    }
                }
            ]
        };

        const jsonBlob = new Blob([JSON.stringify(systemExport, null, 2)], { type: 'application/json' });
        const downloadUrl = URL.createObjectURL(jsonBlob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = `${sysName.toLowerCase().replace(/[^a-z0-9]/gi, '_')}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(downloadUrl);

        try {
            localStorage.setItem('estelaris_latest_system', JSON.stringify(systemExport));
        } catch (e) {}

        const btn = document.getElementById('btn-export-system-json');
        if (btn) {
            const orig = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-check" style="color:var(--success);"></i> ¡Exportado!';
            setTimeout(() => { btn.innerHTML = orig; }, 2000);
        }
    }

    // --- IMPORTACIÓN DE SISTEMA DESDE ARCHIVO JSON ---
    function importSystemFromJSON(file) {
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function (e) {
            try {
                const data = JSON.parse(e.target.result);
                if (!data.star || (!data.planet && !data.planets)) {
                    alert('El archivo no tiene la estructura de un sistema estelar válido de Estelaris.');
                    return;
                }

                const firstPlanet = (data.planets && data.planets[0]) ? data.planets[0] : (data.planet || {});
                if (data.systemName) {
                    const elSysName = document.getElementById('pc-system-name');
                    if (elSysName) elSysName.value = data.systemName;
                }
                if (data.star && data.star.type) {
                    state.starType = data.star.type;
                }
                if (firstPlanet.name) state.name = firstPlanet.name;
                if (firstPlanet.distanceAU !== undefined) state.distanceAU = firstPlanet.distanceAU;
                if (firstPlanet.massEarth !== undefined) state.massEarth = firstPlanet.massEarth;
                if (firstPlanet.radiusEarth !== undefined) state.radiusEarth = firstPlanet.radiusEarth;
                if (firstPlanet.eccentricity !== undefined) state.eccentricity = firstPlanet.eccentricity;
                if (firstPlanet.coreType) state.coreType = firstPlanet.coreType;
                if (firstPlanet.tectonics !== undefined) state.tectonics = firstPlanet.tectonics;
                if (firstPlanet.pressureBar !== undefined) state.pressureBar = firstPlanet.pressureBar;
                if (firstPlanet.gases) state.gases = { ...firstPlanet.gases };
                if (firstPlanet.liquidType) state.liquidType = firstPlanet.liquidType;
                if (firstPlanet.oceanCover !== undefined) state.oceanCover = firstPlanet.oceanCover;
                if (firstPlanet.iceCaps !== undefined) state.iceCaps = firstPlanet.iceCaps;
                if (firstPlanet.hasRings !== undefined) state.hasRings = firstPlanet.hasRings;

                syncInputsFromState();
                updateUI();

                // Cerrar modal y construir el sistema importado en el motor 3D
                closePlanetCreator();

                const physics = calculatePhysicsAndChemistry();
                const star = STAR_DATA[state.starType] || STAR_DATA['G'];
                const fullConfig = {
                    systemName: data.systemName || `Sistema ${state.name}`,
                    star: {
                        type: state.starType,
                        name: data.star.name || star.name,
                        luminosity: data.star.luminosity || star.lum,
                        teff: data.star.teff || star.teff,
                        mass: data.star.mass || star.mass,
                        color: data.star.color || star.color
                    },
                    planets: (data.planets || [firstPlanet]).map(p => ({
                        name: p.name || 'Exoplaneta',
                        radiusScale: p.radiusEarth || p.radiusScale || 1.0,
                        massScale: p.massEarth || p.massScale || 1.0,
                        distanceAU: p.distanceAU || 1.0,
                        eccentricity: p.eccentricity || 0.016,
                        liquidType: p.liquidType || 'water',
                        hasAtmosphere: (p.pressureBar !== undefined ? p.pressureBar : 1.0) > 0.05,
                        atmosphereColor: (p.gases && p.gases.SO2 > 0.5) ? '#eab308' : ((p.gases && p.gases.CH4 > 2) ? '#fb923c' : '#4aa3df'),
                        hasRings: !!p.hasRings,
                        physicsData: p.physicsData || physics,
                        proceduralCanvas: planetCanvas
                    })),
                    isNewSystem: true
                };

                if (typeof window.buildOrUpdateCustomSystem === 'function') {
                    window.buildOrUpdateCustomSystem(fullConfig);
                }
            } catch (err) {
                console.error('Error importando sistema:', err);
                alert('Error al leer o interpretar el archivo JSON.');
            }
        };
        reader.readAsText(file);
    }

    // --- FUNDAR O INYECTAR EN EL SISTEMA PLANETARIO ---
    function injectPlanetIntoUniverse() {
        const physics = calculatePhysicsAndChemistry();
        const star = STAR_DATA[state.starType] || STAR_DATA['G'];
        const elSysName = document.getElementById('pc-system-name');
        const sysName = (elSysName && elSysName.value.trim()) ? elSysName.value.trim() : `Sistema ${state.name}`;

        const systemConfig = {
            systemName: sysName,
            star: {
                type: state.starType,
                name: star.name,
                luminosity: star.lum,
                teff: star.teff,
                mass: star.mass,
                color: star.color
            },
            planet: {
                name: state.name,
                radiusScale: state.radiusEarth,
                massScale: state.massEarth,
                distanceAU: state.distanceAU,
                eccentricity: state.eccentricity,
                liquidType: state.liquidType,
                hasAtmosphere: state.pressureBar > 0.05,
                atmosphereColor: state.gases.SO2 > 0.5 ? '#eab308' : (state.gases.CH4 > 2 ? '#fb923c' : '#4aa3df'),
                hasRings: state.hasRings,
                physicsData: physics,
                proceduralCanvas: planetCanvas
            },
            forceNewSystem: true, // Siempre funda un sistema propio e independiente con su estrella, planeta y decoraciones
            isNewSystem: true
        };

        closePlanetCreator();

        if (typeof window.buildOrUpdateCustomSystem === 'function') {
            window.buildOrUpdateCustomSystem(systemConfig);
        } else if (typeof window.injectCustomPlanetFromCreator === 'function') {
            window.injectCustomPlanetFromCreator(systemConfig.planet);
        }
    }

    // --- APERTURA Y CIERRE DEL MODAL ---
    function openPlanetCreator() {
        window.isPlanetCreatorOpen = true;
        const root = document.getElementById('planet-creator-root');
        if (!root) return;
        root.classList.remove('hidden');
        root.setAttribute('aria-hidden', 'false');

        // Inicializar Three.js si es la primera vez
        if (!previewRenderer) {
            setTimeout(() => {
                initThreePreview();
                syncInputsFromState();
                updateUI();
            }, 50);
        } else {
            syncInputsFromState();
            updateUI();
        }
        if (window.syncEstelarisHUD) {
            window.syncEstelarisHUD();
        }
    }

    function closePlanetCreator() {
        window.isPlanetCreatorOpen = false;
        const root = document.getElementById('planet-creator-root');
        if (!root) return;
        root.classList.add('hidden');
        root.setAttribute('aria-hidden', 'true');
        if (window.syncEstelarisHUD) {
            window.syncEstelarisHUD();
        }
    }

    // Tecla Esc para cerrar
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const root = document.getElementById('planet-creator-root');
            if (root && !root.classList.contains('hidden')) {
                closePlanetCreator();
            }
        }
    });

    // API Pública
    window.EstelarisPlanetCreator = {
        init: function () {
            setupEventListeners();
        },
        open: openPlanetCreator,
        close: closePlanetCreator,
        getState: function () { return state; }
    };

})();
