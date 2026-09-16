/* ============================================================================
   ESTELARIS — MÓDULO DE INVESTIGACIÓN (CONTROLADOR CIENTÍFICO MINIMALISTA)
   ============================================================================ */

(function () {
    'use strict';

    // --- BASE DE DATOS CIENTÍFICA ---
    const celestialScienceData = {
        'Sol': {
            name: 'Sol',
            category: 'Estrella Enana Amarilla (G2V)',
            themeColor: '#eab308',
            layers: [
                {
                    name: 'Corona & Viento Solar',
                    depth: 'Hasta 5,000,000 km',
                    temp: '1,000,000°C a 3,000,000°C',
                    pressure: '0.0001 Pa',
                    composition: 'Plasma de hidrógeno y helio altamente ionizado',
                    role: 'Genera la heliosfera que protege al sistema solar de la radiación cósmica galáctica',
                    color: '#fef08a',
                    radiusPct: 1.0
                },
                {
                    name: 'Fotosfera Visible',
                    depth: '0 — 500 km',
                    temp: '5,505°C (5,778 K)',
                    pressure: '0.01 bar',
                    composition: '73.5% Hidrógeno, 24.8% Helio, 0.8% Oxígeno',
                    role: 'Superficie de emisión de luz solar visible y manchas magnéticas',
                    color: '#facc15',
                    radiusPct: 0.88
                },
                {
                    name: 'Zona Convectiva',
                    depth: '200,000 km',
                    temp: '2,000,000°C',
                    pressure: '100,000 bar',
                    composition: 'Plasma en ebullición turbulenta continua',
                    role: 'Células gigantes de convección térmica que generan el dínamo solar',
                    color: '#eab308',
                    radiusPct: 0.70
                },
                {
                    name: 'Zona Radiativa',
                    depth: '300,000 km',
                    temp: '7,000,000°C',
                    pressure: '10,000,000 bar',
                    composition: 'Gas de radiación de fotones gamma y rayos X superdensos',
                    role: 'Los fotones tardan hasta 170,000 años en atravesar esta zona',
                    color: '#ca8a04',
                    radiusPct: 0.48
                },
                {
                    name: 'Núcleo Termonuclear',
                    depth: '0 — 175,000 km',
                    temp: '15,700,000°C (15.7M K)',
                    pressure: '265,000,000,000 bar',
                    composition: 'Fusión protón-protón: 600 millones de toneladas de H/s convertidas a He',
                    role: 'Generador primario del 100% de la energía electromagnética del sistema solar',
                    color: '#ffffff',
                    radiusPct: 0.25
                }
            ],
            atmosphere: [
                { name: 'Hidrógeno', formula: 'H', pct: '73.46%', color: '#60a5fa' },
                { name: 'Helio', formula: 'He', pct: '24.85%', color: '#facc15' },
                { name: 'Oxígeno', formula: 'O', pct: '0.77%', color: '#38bdf8' },
                { name: 'Carbono', formula: 'C', pct: '0.29%', color: '#94a3b8' }
            ],
            surfaceMeta: [
                { label: 'Presión Fotosférica', val: '0.01 bar' },
                { label: 'Temperatura Superficial', val: '5,505°C (5,778 K)' },
                { label: 'Velocidad de Escape', val: '617.5 km/s' },
                { label: 'Luminosidad', val: '3.828 × 10²⁶ W' }
            ],
            geophysics: [
                {
                    title: 'Ciclo Magnético de 11 Años',
                    desc: 'La rotación diferencial retuerce las líneas de campo hasta invertirse cada 11 años, provocando eyecciones de masa coronal.'
                },
                {
                    title: 'Heliosfera Protectora',
                    desc: 'Burbuja de plasma magnetizado que abarca 120 AU desviando la radiación cósmica galáctica.'
                }
            ],
            missions: [
                { name: 'Parker Solar Probe', year: '2018 — Presente', agency: 'NASA', desc: 'Primera nave en sumergirse en la corona solar a más de 600,000 km/h.' },
                { name: 'Solar Orbiter', year: '2020 — Presente', agency: 'ESA / NASA', desc: 'Fotografías milimétricas de los polos y fogonazos solares.' }
            ],
            trivia: [
                { title: 'Pérdida de Masa Diaria', text: 'El Sol pierde 4 millones de toneladas de masa por segundo convertidas en energía mediante E = mc².' },
                { title: '99.86% de la Materia', text: 'Concentra el 99.86% de toda la masa existente en el Sistema Solar.' }
            ]
        },

        'Tierra': {
            name: 'Tierra',
            category: 'Planeta Telúrico / Biosfera',
            themeColor: '#38bdf8',
            layers: [
                {
                    name: 'Corteza Terrestre (Litosfera)',
                    depth: '0 — 40 km',
                    temp: '15°C a 500°C',
                    pressure: '0.1 a 1.2 GPa',
                    composition: 'Silicatos de aluminio, basalto oceánico, granito continental',
                    role: 'Soporte biológico, corteza continental y fondos oceánicos con placas tectónicas activas',
                    color: '#22c55e',
                    radiusPct: 1.0
                },
                {
                    name: 'Manto Superior (Astenosfera)',
                    depth: '40 — 670 km',
                    temp: '500°C a 1,000°C',
                    pressure: '1.2 a 24 GPa',
                    composition: 'Peridotita rica en olivino, piroxeno y granate',
                    role: 'Roca semisólida plástica donde ocurren las corrientes de convección que mueven los continentes',
                    color: '#eab308',
                    radiusPct: 0.88
                },
                {
                    name: 'Manto Inferior (Mesosfera)',
                    depth: '670 — 2,890 km',
                    temp: '1,000°C a 3,000°C',
                    pressure: '24 a 136 GPa',
                    composition: 'Bridgmanita (silicato de Mg-Fe) y periclasa densa',
                    role: 'Capa rocosa profunda que transfiere calor del núcleo hacia la corteza',
                    color: '#f97316',
                    radiusPct: 0.72
                },
                {
                    name: 'Núcleo Externo Líquido',
                    depth: '2,890 — 5,150 km',
                    temp: '4,000°C a 5,000°C',
                    pressure: '136 a 330 GPa',
                    composition: 'Hierro (85%), Níquel (10%), Azufre y Oxígeno (5%) líquido',
                    role: 'Efecto Geodínamo: Corrientes de convección generan el Campo Magnético Terrestre',
                    color: '#ef4444',
                    radiusPct: 0.52
                },
                {
                    name: 'Núcleo Interno Sólido',
                    depth: '5,150 — 6,371 km',
                    temp: '5,400°C (Temperatura fotosférica solar)',
                    pressure: '330 a 360 GPa (3.6 millones de atm)',
                    composition: 'Aleación cristalina sólida de Hierro-Níquel puro',
                    role: 'Esfera metálica ultradensa que estabiliza el eje de rotación y el magnetismo',
                    color: '#ffffff',
                    radiusPct: 0.22
                }
            ],
            atmosphere: [
                { name: 'Nitrógeno', formula: 'N₂', pct: '78.08%', color: '#60a5fa' },
                { name: 'Oxígeno', formula: 'O₂', pct: '20.95%', color: '#38bdf8' },
                { name: 'Argón', formula: 'Ar', pct: '0.93%', color: '#a78bfa' },
                { name: 'Dióxido de Carbono', formula: 'CO₂', pct: '0.04%', color: '#f87171' }
            ],
            surfaceMeta: [
                { label: 'Presión Superficial', val: '1.013 bar (1.00 atm)' },
                { label: 'Temperatura Media', val: '14.9°C (58.8°F)' },
                { label: 'Velocidad de Escape', val: '11.18 km/s' },
                { label: 'Gravedad', val: '9.807 m/s² (1.00 g)' }
            ],
            geophysics: [
                {
                    title: 'Geodínamo & Cinturones de Van Allen',
                    desc: 'El movimiento del hierro líquido desvía el viento solar letal hacia los polos protegiendo la atmósfera y generando auroras.'
                },
                {
                    title: 'Tectónica de Placas & Ciclo del Carbono',
                    desc: 'El reciclaje de corteza regula el termostato climático del CO₂ impidiendo un efecto invernadero desbocado.'
                }
            ],
            missions: [
                { name: 'Sentinel & Landsat', year: '1972 — Presente', agency: 'ESA / NASA', desc: 'Monitoreo global de biomasa, temperaturas oceánicas y atmósfera.' },
                { name: 'Estación Espacial Internacional (ISS)', year: '1998 — Presente', agency: 'Internacional', desc: 'Laboratorio de microgravedad tripulado continuo.' }
            ],
            trivia: [
                { title: 'Océanos Globales', text: 'El 71% de la superficie está cubierta por agua líquida con una profundidad media de 3.7 km.' },
                { title: 'Oxígeno Biológico', text: 'El 21% de oxígeno molecular no existiría sin la fotosíntesis biológica continua del fitoplancton.' }
            ]
        },

        'Marte': {
            name: 'Marte',
            category: 'Planeta Telúrico Desértico',
            themeColor: '#f97316',
            layers: [
                {
                    name: 'Corteza Marciana & Regolito',
                    depth: '0 — 50 km',
                    temp: '-63°C (-140°C a +20°C)',
                    pressure: '0.006 atm',
                    composition: 'Basalto volcánico cubierto por polvo de óxido férrico (Fe₂O₃)',
                    role: 'Corteza rígida de una sola placa tectónica inmóvil',
                    color: '#c2410c',
                    radiusPct: 1.0
                },
                {
                    name: 'Manto Silicatado Marciano',
                    depth: '50 — 1,500 km',
                    temp: '1,200°C a 1,800°C',
                    pressure: '2 a 18 GPa',
                    composition: 'Silicatos ricos en hierro y magnesio',
                    role: 'Alimentó en el pasado al Monte Olimpo (22 km de altura)',
                    color: '#ea580c',
                    radiusPct: 0.85
                },
                {
                    name: 'Núcleo Líquido Rico en Azufre',
                    depth: '1,500 — 3,390 km',
                    temp: '2,000°C',
                    pressure: '40 GPa',
                    composition: 'Hierro, Níquel y hasta un 15% de Azufre fundido',
                    role: 'Al enfriarse perdió su convección hace 4,000 millones de años, perdiendo el campo magnético',
                    color: '#f97316',
                    radiusPct: 0.48
                }
            ],
            atmosphere: [
                { name: 'Dióxido de Carbono', formula: 'CO₂', pct: '95.32%', color: '#f87171' },
                { name: 'Nitrógeno', formula: 'N₂', pct: '2.60%', color: '#60a5fa' },
                { name: 'Argón', formula: 'Ar', pct: '1.90%', color: '#a78bfa' }
            ],
            surfaceMeta: [
                { label: 'Presión Superficial', val: '0.006 bar (0.6% Tierra)' },
                { label: 'Temperatura Media', val: '-63°C (-81°F)' },
                { label: 'Velocidad de Escape', val: '5.03 km/s' },
                { label: 'Gravedad', val: '3.72 m/s² (0.38 g)' }
            ],
            geophysics: [
                {
                    title: 'Pérdida Atmosférica',
                    desc: 'Sin campo magnético activo, el viento solar barrió el 99% de su atmósfera evaporando sus océanos primigenios.'
                }
            ],
            missions: [
                { name: 'Perseverance & Ingenuity', year: '2021 — Presente', agency: 'NASA', desc: 'Búsqueda de biofirmas fósiles en el cráter Jezero y primer vuelo aerodinámico marciano.' },
                { name: 'Curiosity Rover', year: '2012 — Presente', agency: 'NASA', desc: 'Confirmación de antiguos lagos habitables y moléculas orgánicas.' }
            ],
            trivia: [
                { title: 'Monte Olimpo (22 km)', text: 'Es el volcán más alto del Sistema Solar, 3 veces la altura del Monte Everest.' },
                { title: 'Atardeceres Azules', text: 'La dispersión de luz en el polvo suspendido tiñe los atardeceres de un color azul.' }
            ]
        },

        'Júpiter': {
            name: 'Júpiter',
            category: 'Gigante Gaseoso',
            themeColor: '#d4b996',
            layers: [
                {
                    name: 'Atmósfera Superior de Nubes',
                    depth: '0 — 1,000 km',
                    temp: '-110°C a +20°C',
                    pressure: '0.1 a 10 bar',
                    composition: 'Cristales de amoníaco (NH₃) y vapor de agua',
                    role: 'Vientos de 600 km/h y tormentas como la Gran Mancha Roja',
                    color: '#d4b996',
                    radiusPct: 1.0
                },
                {
                    name: 'Hidrógeno Líquido Molecular',
                    depth: '1,000 — 15,000 km',
                    temp: '2,000°C a 10,000°C',
                    pressure: '10,000 a 2,000,000 bar',
                    composition: 'Océano de hidrógeno fluido supercrítico',
                    role: 'Transición continua sin superficie sólida definida',
                    color: '#b89260',
                    radiusPct: 0.88
                },
                {
                    name: 'Hidrógeno Metálico Líquido',
                    depth: '15,000 — 60,000 km',
                    temp: '10,000°C a 20,000°C',
                    pressure: '2,000,000 a 40,000,000 bar',
                    composition: 'Hidrógeno ionizado con electrones libres',
                    role: 'Superconductor en rotación rápida que genera la magnetosfera más poderosa',
                    color: '#926224',
                    radiusPct: 0.65
                },
                {
                    name: 'Núcleo Rocoso & Hielo Difuso',
                    depth: '0 — 12,000 km',
                    temp: '24,000°C a 30,000°C',
                    pressure: '45,000,000 bar',
                    composition: 'Roca, hierro y elementos pesados',
                    role: 'Núcleo primordial de 15 masas terrestres',
                    color: '#ffffff',
                    radiusPct: 0.24
                }
            ],
            atmosphere: [
                { name: 'Hidrógeno', formula: 'H₂', pct: '89.80%', color: '#60a5fa' },
                { name: 'Helio', formula: 'He', pct: '10.20%', color: '#facc15' },
                { name: 'Metano', formula: 'CH₄', pct: '0.30%', color: '#38bdf8' }
            ],
            surfaceMeta: [
                { label: 'Presión a 1 bar', val: '1.00 bar' },
                { label: 'Temperatura a 1 bar', val: '-110°C (-166°F)' },
                { label: 'Velocidad de Escape', val: '59.50 km/s' },
                { label: 'Gravedad', val: '24.79 m/s² (2.53 g)' }
            ],
            geophysics: [
                {
                    title: 'Magnetosfera Gigante',
                    desc: '20,000 veces más potente que la de la Tierra, acelerando partículas cargadas hacia sus lunas galileanas.'
                }
            ],
            missions: [
                { name: 'Juno', year: '2016 — Presente', agency: 'NASA', desc: 'Mapeo gravitatorio y de auroras polares en órbita elíptica.' },
                { name: 'Galileo', year: '1995 — 2003', agency: 'NASA', desc: 'Primer estudio detallado in situ de lunas jovianas y atmósfera.' }
            ],
            trivia: [
                { title: 'Gran Mancha Roja', text: 'Anticiclón de más de 350 años donde cabe la Tierra entera.' },
                { title: 'Rotación de 10 Horas', text: 'Completa un día entero en tan solo 9 horas y 55 minutos.' }
            ]
        },

        'Saturno': {
            name: 'Saturno',
            category: 'Gigante Gaseoso Anillado',
            themeColor: '#eab308',
            layers: [
                {
                    name: 'Atmósfera & Anillos de Hielo',
                    depth: '0 — 1,200 km',
                    temp: '-139°C',
                    pressure: '0.1 a 10 bar',
                    composition: 'Hidrógeno molecular, helio y partículas de hielo de agua pura',
                    role: 'Vientos de 1,800 km/h y anillos de solo 10 a 30 metros de grosor',
                    color: '#eab308',
                    radiusPct: 1.0
                },
                {
                    name: 'Hidrógeno Líquido & Lluvia de Helio',
                    depth: '1,200 — 28,000 km',
                    temp: '2,000°C a 8,000°C',
                    pressure: '10,000 a 1,000,000 bar',
                    composition: 'Hidrógeno y gotas condensadas de helio precipitándose',
                    role: 'La precipitación de helio genera calor interno radiativo continuo',
                    color: '#ca8a04',
                    radiusPct: 0.82
                },
                {
                    name: 'Hidrógeno Metálico',
                    depth: '28,000 — 48,000 km',
                    temp: '8,000°C a 12,000°C',
                    pressure: '1,000,000 a 10,000,000 bar',
                    composition: 'Hidrógeno conductor metálico líquido',
                    role: 'Genera el campo magnético axisimétrico de Saturno',
                    color: '#a16207',
                    radiusPct: 0.58
                },
                {
                    name: 'Núcleo Rocoso & Hielo',
                    depth: '0 — 10,000 km',
                    temp: '11,700°C',
                    pressure: '10,000,000 bar',
                    composition: 'Silicatos, hierro y hielo a hiperpresión',
                    role: 'Núcleo pesado de 15 masas terrestres',
                    color: '#ffffff',
                    radiusPct: 0.22
                }
            ],
            atmosphere: [
                { name: 'Hidrógeno', formula: 'H₂', pct: '96.30%', color: '#60a5fa' },
                { name: 'Helio', formula: 'He', pct: '3.25%', color: '#facc15' },
                { name: 'Metano', formula: 'CH₄', pct: '0.45%', color: '#38bdf8' }
            ],
            surfaceMeta: [
                { label: 'Presión a 1 bar', val: '1.00 bar' },
                { label: 'Temperatura Media', val: '-139°C (-218°F)' },
                { label: 'Densidad Media', val: '0.687 g/cm³ (Flota en agua)' },
                { label: 'Velocidad de Escape', val: '35.50 km/s' }
            ],
            geophysics: [
                {
                    title: 'Dinámica de Anillos',
                    desc: 'Tienen 282,000 km de diámetro pero apenas 20 metros de grosor medio, esculpidos por lunas pastoras.'
                }
            ],
            missions: [
                { name: 'Cassini-Huygens', year: '1997 — 2017', agency: 'NASA / ESA', desc: '13 años explorando Saturno, sus anillos y aterrizando en Titán.' }
            ],
            trivia: [
                { title: 'Menos Denso que el Agua', text: 'Es el único planeta del sistema que flotaría en un océano gigante.' },
                { title: 'Hexágono Polar', text: 'Un vórtice de 6 lados gira incesantemente en su polo norte.' }
            ]
        },

        'Europa': {
            name: 'Europa',
            category: 'Luna Oceánica Joviana',
            themeColor: '#38bdf8',
            layers: [
                {
                    name: 'Corteza de Hielo Fracturado',
                    depth: '0 — 20 km',
                    temp: '-160°C a -220°C',
                    pressure: '0.0000001 Pa',
                    composition: 'Hielo de agua pura (H₂O) cruzado por sales minerales rojizas',
                    role: 'Escudo protector del océano interior frente a la radiación',
                    color: '#e0f2fe',
                    radiusPct: 1.0
                },
                {
                    name: 'Océano Global de Agua Líquida',
                    depth: '20 — 120 km (100 km profundidad)',
                    temp: '0°C a +4°C (+300°C en fumarolas)',
                    pressure: '100 a 200 MPa',
                    composition: 'Agua líquida salada con oxígeno disuelto',
                    role: 'Contiene el doble de agua que toda la Tierra junta; potencial biosfera',
                    color: '#0284c7',
                    radiusPct: 0.92
                },
                {
                    name: 'Manto Rocoso Silicatado',
                    depth: '120 — 1,200 km',
                    temp: '800°C a 1,500°C',
                    pressure: '2 a 5 GPa',
                    composition: 'Silicatos hidratados con fumarolas hidrotermales',
                    role: 'Calentado por fricción de mareas de Júpiter',
                    color: '#b45309',
                    radiusPct: 0.68
                },
                {
                    name: 'Núcleo Metálico',
                    depth: '0 — 350 km',
                    temp: '1,500°C',
                    pressure: '6 GPa',
                    composition: 'Hierro y níquel fundido',
                    role: 'Genera un campo magnético inducido',
                    color: '#ef4444',
                    radiusPct: 0.25
                }
            ],
            atmosphere: [
                { name: 'Oxígeno Molecular', formula: 'O₂', pct: '100%', color: '#38bdf8' }
            ],
            surfaceMeta: [
                { label: 'Profundidad Océano', val: '60 a 120 km' },
                { label: 'Volumen de Agua', val: '2× Océanos de la Tierra' },
                { label: 'Fricción de Marea', val: 'Resonancia Laplace 4:2:1' }
            ],
            geophysics: [
                {
                    title: 'Calentamiento por Marea',
                    desc: 'La atracción de Júpiter estira la luna continuamente generando calor que mantiene líquido su inmenso océano.'
                }
            ],
            missions: [
                { name: 'Europa Clipper', year: '2024 (En Ruta)', agency: 'NASA', desc: 'Radar penetrador de hielo para analizar habitabilidad.' }
            ],
            trivia: [
                { title: 'Superficie Más Lisa', text: 'Casi no tiene cráteres porque el hielo renueva la superficie.' },
                { title: 'Géiseres Espaciales', text: 'Eyecta columnas de vapor de agua a 160 km de altura.' }
            ]
        },

        'Titán': {
            name: 'Titán',
            category: 'Luna Saturnina con Atmósfera',
            themeColor: '#f59e0b',
            layers: [
                {
                    name: 'Corteza de Hielo & Lagos de Metano',
                    depth: '0 — 80 km',
                    temp: '-179°C',
                    pressure: '1.45 atm',
                    composition: 'Hielo de agua duro con lagos y ríos de metano y etano líquido',
                    role: 'Ciclo hidrológico completo basado en metano líquido',
                    color: '#ca8a04',
                    radiusPct: 1.0
                },
                {
                    name: 'Hielo de Alta Presión',
                    depth: '80 — 150 km',
                    temp: '-100°C a -20°C',
                    pressure: '0.5 a 1.5 GPa',
                    composition: 'Hielo amorfo y clatratos de metano',
                    role: 'Aislamiento del océano interior',
                    color: '#7dd3fc',
                    radiusPct: 0.86
                },
                {
                    name: 'Océano Subsuperficial Agua-Amoníaco',
                    depth: '150 — 400 km',
                    temp: '-10°C a +20°C',
                    pressure: '1.5 a 3 GPa',
                    composition: 'Agua líquida rica en amoníaco como anticongelante',
                    role: 'Océano global profundo desacoplado',
                    color: '#0284c7',
                    radiusPct: 0.72
                },
                {
                    name: 'Núcleo Silicatado',
                    depth: '0 — 2,000 km',
                    temp: '1,000°C',
                    pressure: '4 GPa',
                    composition: 'Silicatos hidratados y roca',
                    role: 'Núcleo central no diferenciado por completo',
                    color: '#78716c',
                    radiusPct: 0.45
                }
            ],
            atmosphere: [
                { name: 'Nitrógeno', formula: 'N₂', pct: '94.20%', color: '#60a5fa' },
                { name: 'Metano', formula: 'CH₄', pct: '5.65%', color: '#38bdf8' },
                { name: 'Hidrógeno', formula: 'H₂', pct: '0.15%', color: '#facc15' }
            ],
            surfaceMeta: [
                { label: 'Presión Superficial', val: '1.45 bar (45% mayor que Tierra)' },
                { label: 'Temperatura Media', val: '-179.5°C (-291°F)' },
                { label: 'Densidad del Aire', val: '4× atmósfera terrestre' }
            ],
            geophysics: [
                {
                    title: 'Ciclo Metanológico',
                    desc: 'Posee nubes, lluvia torrencial y mares de hidrocarburos como el Kraken Mare.'
                }
            ],
            missions: [
                { name: 'Dragonfly', year: '2028 (Programado)', agency: 'NASA', desc: 'Dron octocóptero nuclear que volará por la atmósfera de Titán.' },
                { name: 'Huygens', year: '2005', agency: 'ESA', desc: 'Primer aterrizaje en el Sistema Solar exterior.' }
            ],
            trivia: [
                { title: 'Vuelo Humano', text: 'Con alas artificiales un ser humano podría volar agitando los brazos debido al aire denso y baja gravedad.' }
            ]
        },

        'Venus': {
            name: 'Venus',
            category: 'Planeta Telúrico Supercaliente',
            themeColor: '#ea580c',
            layers: [
                {
                    name: 'Corteza Volcánica Basáltica',
                    depth: '0 — 50 km',
                    temp: '465°C constante',
                    pressure: '92 atm',
                    composition: 'Basaltos y lavas con miles de volcanes',
                    role: 'Corteza caliente sin placas tectónicas móviles',
                    color: '#c2410c',
                    radiusPct: 1.0
                },
                {
                    name: 'Manto Rocoso Convectivo',
                    depth: '50 — 3,000 km',
                    temp: '1,500°C a 3,000°C',
                    pressure: '2 a 120 GPa',
                    composition: 'Peridotita y silicatos de magnesio',
                    role: 'Convección lenta que libera calor en erupciones masivas periódicas',
                    color: '#ea580c',
                    radiusPct: 0.86
                },
                {
                    name: 'Núcleo Metálico',
                    depth: '0 — 3,100 km',
                    temp: '4,500°C',
                    pressure: '280 GPa',
                    composition: 'Hierro y níquel fundido',
                    role: 'Sin campo magnético debido a la lenta rotación (243 días)',
                    color: '#ffffff',
                    radiusPct: 0.45
                }
            ],
            atmosphere: [
                { name: 'Dióxido de Carbono', formula: 'CO₂', pct: '96.50%', color: '#f87171' },
                { name: 'Nitrógeno', formula: 'N₂', pct: '3.50%', color: '#60a5fa' }
            ],
            surfaceMeta: [
                { label: 'Presión Superficial', val: '92.0 bar' },
                { label: 'Temperatura Media', val: '464°C (867°F)' },
                { label: 'Rotación Retrógrada', val: '-243 días' }
            ],
            geophysics: [
                {
                    title: 'Invernadero Extremo',
                    desc: 'El CO₂ hiperdenso atrapa el 99% del calor convirtiéndolo en el planeta más caliente.'
                }
            ],
            missions: [
                { name: 'Venera 9 a 14', year: '1975 — 1982', agency: 'URSS', desc: 'Únicas fotografías directas desde la superficie de Venus.' }
            ],
            trivia: [
                { title: 'El Día Dura más que el Año', text: 'Tarda 243 días terrestres en rotar y solo 225 en orbitar al Sol.' }
            ]
        },

        'Mercurio': {
            name: 'Mercurio',
            category: 'Planeta Telúrico Metálico',
            themeColor: '#94a3b8',
            layers: [
                {
                    name: 'Corteza Rocosa & Escarpados',
                    depth: '0 — 35 km',
                    temp: '-180°C a +430°C',
                    pressure: '10⁻¹⁴ bar',
                    composition: 'Silicatos con fallas de contracción térmica',
                    role: 'Litosfera arrugada al encogerse el planeta',
                    color: '#64748b',
                    radiusPct: 1.0
                },
                {
                    name: 'Manto Silicatado Fino',
                    depth: '35 — 400 km',
                    temp: '600°C a 1,200°C',
                    pressure: '1 a 5 GPa',
                    composition: 'Silicatos delgados',
                    role: 'Manto reducido por un impacto primordial',
                    color: '#94a3b8',
                    radiusPct: 0.88
                },
                {
                    name: 'Núcleo Metálico Colosal',
                    depth: '0 — 2,040 km',
                    temp: '1,500°C',
                    pressure: '40 GPa',
                    composition: 'Hierro y níquel fundido y sólido (70% de la masa)',
                    role: 'Genera un campo magnético global',
                    color: '#ffffff',
                    radiusPct: 0.72
                }
            ],
            atmosphere: [
                { name: 'Oxígeno', formula: 'O', pct: '42.0%', color: '#38bdf8' },
                { name: 'Sodio', formula: 'Na', pct: '29.0%', color: '#facc15' },
                { name: 'Hidrógeno', formula: 'H₂', pct: '22.0%', color: '#60a5fa' }
            ],
            surfaceMeta: [
                { label: 'Presión Superficial', val: '10⁻¹⁴ bar' },
                { label: 'Amplitud Térmica', val: '610°C Día/Noche' },
                { label: 'Velocidad de Escape', val: '4.25 km/s' }
            ],
            geophysics: [
                {
                    title: 'Planeta que se Encoge',
                    desc: 'Al enfriarse su núcleo, el planeta ha reducido su diámetro en más de 14 km.'
                }
            ],
            missions: [
                { name: 'BepiColombo', year: '2018 (En Ruta)', agency: 'ESA / JAXA', desc: 'Doble orbitador de alta precisión.' },
                { name: 'MESSENGER', year: '2004 — 2015', agency: 'NASA', desc: 'Descubrió hielo en cráteres polares.' }
            ],
            trivia: [
                { title: 'Hielo junto al Sol', text: 'Cráteres polares perpetuamente a la sombra contienen millones de toneladas de hielo.' }
            ]
        }
    };

    // Alias
    celestialScienceData['Luna'] = celestialScienceData['Tierra'];
    celestialScienceData['Urano'] = celestialScienceData['Saturno'];
    celestialScienceData['Neptuno'] = celestialScienceData['Saturno'];
    celestialScienceData['Plutón'] = celestialScienceData['Europa'];

    // --- VARIABLES DE ESTADO ---
    let currentBodyKey = 'Tierra';
    let currentLayerIndex = 0;
    let isModalOpen = false;

    // --- RENDERIZADO DEL DIAGRAMA VECTORIAL MINIMALISTA ---
    function renderCrossSectionDiagram(bodyData) {
        const svg = document.getElementById('inv-cutaway-svg');
        if (!svg) return;

        svg.innerHTML = '';
        const cx = 250, cy = 250;
        const maxR = 200;
        const layers = bodyData.layers || [];

        // 1. Esfera exterior base
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        const grad = document.createElementNS('http://www.w3.org/2000/svg', 'radialGradient');
        grad.setAttribute('id', 'invBaseGrad');
        grad.setAttribute('cx', '35%');
        grad.setAttribute('cy', '35%');
        grad.setAttribute('r', '65%');
        grad.innerHTML = '<stop offset="0%" stop-color="' + (bodyData.themeColor || '#38bdf8') + '" stop-opacity="0.8" /><stop offset="60%" stop-color="#0f172a" stop-opacity="0.95" /><stop offset="100%" stop-color="#050811" stop-opacity="1" />';
        defs.appendChild(grad);
        svg.appendChild(defs);

        const baseCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        baseCircle.setAttribute('cx', cx);
        baseCircle.setAttribute('cy', cy);
        baseCircle.setAttribute('r', maxR);
        baseCircle.setAttribute('fill', 'url(#invBaseGrad)');
        baseCircle.setAttribute('opacity', '0.9');
        svg.appendChild(baseCircle);

        // 2. Cuña de corte transversal (Wedge de 90 grados: -45° a +45°)
        const sortedLayers = [...layers].sort((a, b) => b.radiusPct - a.radiusPct);

        sortedLayers.forEach((layer) => {
            const originalIndex = layers.indexOf(layer);
            const r = maxR * layer.radiusPct;
            const isSelected = originalIndex === currentLayerIndex;

            const aStart = -Math.PI / 4;
            const aEnd = Math.PI / 4;

            const x1 = cx + r * Math.cos(aStart);
            const y1 = cy + r * Math.sin(aStart);
            const x2 = cx + r * Math.cos(aEnd);
            const y2 = cy + r * Math.sin(aEnd);

            const pathData = 'M ' + cx + ' ' + cy + ' L ' + x1 + ' ' + y1 + ' A ' + r + ' ' + r + ' 0 0 1 ' + x2 + ' ' + y2 + ' Z';

            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', pathData);
            path.setAttribute('fill', layer.color || '#38bdf8');
            path.setAttribute('fill-opacity', isSelected ? '0.95' : '0.7');
            path.setAttribute('stroke', isSelected ? '#ffffff' : 'rgba(255, 255, 255, 0.2)');
            path.setAttribute('stroke-width', isSelected ? '2' : '1');
            path.setAttribute('class', 'inv-svg-layer ' + (isSelected ? 'is-selected' : ''));

            path.addEventListener('click', () => {
                selectLayer(originalIndex);
            });

            path.addEventListener('mouseenter', () => {
                updateLayerCardUI(layer);
            });

            path.addEventListener('mouseleave', () => {
                updateLayerCardUI(layers[currentLayerIndex]);
            });

            svg.appendChild(path);

            if (isSelected) {
                const ringArc = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                ringArc.setAttribute('cx', cx);
                ringArc.setAttribute('cy', cy);
                ringArc.setAttribute('r', r);
                ringArc.setAttribute('fill', 'none');
                ringArc.setAttribute('stroke', '#ffffff');
                ringArc.setAttribute('stroke-width', '1.2');
                ringArc.setAttribute('stroke-dasharray', '3 3');
                ringArc.setAttribute('opacity', '0.7');
                svg.appendChild(ringArc);
            }
        });

        // 3. Pin central
        const centerPin = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        centerPin.setAttribute('cx', cx);
        centerPin.setAttribute('cy', cy);
        centerPin.setAttribute('r', 4);
        centerPin.setAttribute('fill', '#ffffff');
        svg.appendChild(centerPin);
    }

    // --- SEGMENTED RULER BAR (SELECTOR RÁPIDO DE CAPAS) ---
    function renderLayerRuler(bodyData) {
        const ruler = document.getElementById('inv-layer-ruler');
        if (!ruler) return;

        ruler.innerHTML = '';
        const layers = bodyData.layers || [];

        layers.forEach((layer, idx) => {
            const btn = document.createElement('button');
            btn.className = 'inv-ruler-item ' + (idx === currentLayerIndex ? 'is-active' : '');
            btn.textContent = layer.name.split(' (')[0];

            btn.addEventListener('click', () => {
                selectLayer(idx);
            });

            ruler.appendChild(btn);
        });
    }

    // --- ACTUALIZACIÓN DE CAPA ACTIVA ---
    function selectLayer(index) {
        currentLayerIndex = index;
        const bodyData = celestialScienceData[currentBodyKey] || celestialScienceData['Tierra'];
        const layer = bodyData.layers[index];
        if (!layer) return;

        updateLayerCardUI(layer);
        renderLayerRuler(bodyData);
        renderCrossSectionDiagram(bodyData);
    }

    function updateLayerCardUI(layer) {
        if (!layer) return;
        const nameEl = document.getElementById('inv-layer-name');
        const depthEl = document.getElementById('inv-layer-depth');
        const tempEl = document.getElementById('inv-layer-temp');
        const pressureEl = document.getElementById('inv-layer-pressure');
        const compEl = document.getElementById('inv-layer-composition');
        const roleEl = document.getElementById('inv-layer-role');
        const dotEl = document.getElementById('inv-layer-dot');

        if (nameEl) nameEl.textContent = layer.name;
        if (depthEl) depthEl.textContent = layer.depth;
        if (tempEl) tempEl.textContent = layer.temp;
        if (pressureEl) pressureEl.textContent = layer.pressure;
        if (compEl) compEl.textContent = layer.composition;
        if (roleEl) roleEl.textContent = layer.role;
        if (dotEl) dotEl.style.background = layer.color || '#38bdf8';
    }

    // --- POBLADO DE PESTAÑAS CIENTÍFICAS ---
    function populateScientificPanes(bodyData) {
        const titleEl = document.getElementById('inv-body-title');
        const catEl = document.getElementById('inv-body-category');

        if (titleEl) titleEl.textContent = bodyData.name;
        if (catEl) catEl.textContent = bodyData.category;

        // 1. Espectroscopía
        const chemContainer = document.getElementById('inv-chem-bars');
        const metaContainer = document.getElementById('inv-surface-meta');
        if (chemContainer) {
            chemContainer.innerHTML = '';
            (bodyData.atmosphere || []).forEach(item => {
                const row = document.createElement('div');
                row.className = 'inv-chem-row';
                const fillWidth = item.pct.replace('%','') > 100 ? '100%' : item.pct;
                row.innerHTML = '<div class="inv-chem-header"><span class="inv-chem-name">' + item.name + ' (' + item.formula + ')</span><span class="inv-chem-pct">' + item.pct + '</span></div><div class="inv-chem-track"><div class="inv-chem-bar" style="width:' + fillWidth + '; background:' + (item.color || '#38bdf8') + ';"></div></div>';
                chemContainer.appendChild(row);
            });
        }

        if (metaContainer) {
            metaContainer.innerHTML = '';
            (bodyData.surfaceMeta || []).forEach(m => {
                const item = document.createElement('div');
                item.className = 'inv-meta-item';
                item.innerHTML = '<span class="inv-meta-label">' + m.label + '</span><span class="inv-meta-val">' + m.val + '</span>';
                metaContainer.appendChild(item);
            });
        }

        // 2. Geofísica
        const geoContainer = document.getElementById('inv-geophysics-content');
        if (geoContainer) {
            geoContainer.innerHTML = '';
            (bodyData.geophysics || []).forEach(g => {
                const item = document.createElement('div');
                item.className = 'inv-geo-item';
                item.innerHTML = '<span class="inv-geo-title">' + g.title + '</span><p class="inv-geo-desc">' + g.desc + '</p>';
                geoContainer.appendChild(item);
            });
        }

        // 3. Misiones
        const misContainer = document.getElementById('inv-missions-timeline');
        if (misContainer) {
            misContainer.innerHTML = '';
            (bodyData.missions || []).forEach(m => {
                const item = document.createElement('div');
                item.className = 'inv-tl-item';
                item.innerHTML = '<div class="inv-tl-head"><span class="inv-tl-title">' + m.name + '</span><span class="inv-tl-year">' + m.year + ' &bull; ' + m.agency + '</span></div><p class="inv-tl-desc">' + m.desc + '</p>';
                misContainer.appendChild(item);
            });
        }

        // 4. Curiosidades
        const trivContainer = document.getElementById('inv-trivia-grid');
        if (trivContainer) {
            trivContainer.innerHTML = '';
            (bodyData.trivia || []).forEach(t => {
                const item = document.createElement('div');
                item.className = 'inv-trivia-item';
                item.innerHTML = '<span class="inv-trivia-title">' + t.title + '</span><p class="inv-trivia-desc">' + t.text + '</p>';
                trivContainer.appendChild(item);
            });
        }
    }

    // --- SELECTOR DE ASTROS (PILLS MINIMALISTAS) ---
    function renderNavBar(activeKey) {
        const navBar = document.getElementById('inv-nav-bar');
        if (!navBar) return;

        navBar.innerHTML = '';
        const bodyKeys = ['Sol', 'Mercurio', 'Venus', 'Tierra', 'Marte', 'Júpiter', 'Saturno', 'Europa', 'Titán'];

        bodyKeys.forEach(key => {
            const data = celestialScienceData[key];
            if (!data) return;

            const btn = document.createElement('button');
            btn.className = 'inv-pill-btn ' + (key === activeKey ? 'is-active' : '');
            btn.innerHTML = '<span class="inv-pill-dot" style="background:' + (data.themeColor || '#94a3b8') + ';"></span><span>' + key + '</span>';

            btn.addEventListener('click', () => {
                switchBody(key);
            });

            navBar.appendChild(btn);
        });
    }

    // --- CAMBIAR DE CUERPO CELESTE ---
    function switchBody(bodyKey) {
        currentBodyKey = bodyKey;
        currentLayerIndex = 0;

        const bodyData = celestialScienceData[bodyKey] || celestialScienceData['Tierra'];
        renderNavBar(bodyKey);
        renderLayerRuler(bodyData);
        renderCrossSectionDiagram(bodyData);
        updateLayerCardUI(bodyData.layers[0]);
        populateScientificPanes(bodyData);
    }

    // --- SETUP DE TABS CIENTÍFICAS ---
    function setupTabs() {
        const tabs = document.querySelectorAll('.inv-tab-btn');
        const panes = document.querySelectorAll('.inv-tab-pane');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetId = tab.dataset.tab;

                tabs.forEach(t => t.classList.remove('is-active'));
                panes.forEach(p => p.classList.remove('is-active'));

                tab.classList.add('is-active');
                const activePane = document.getElementById(targetId);
                if (activePane) activePane.classList.add('is-active');
            });
        });
    }

    // --- SETUP DE SWITCHER MÓVIL (CORTE DE CAPAS vs CIENCIA & DATOS) ---
    function setupMobileViewSwitch() {
        const btnDiagram = document.getElementById('btn-inv-view-diagram');
        const btnData = document.getElementById('btn-inv-view-data');
        const colDiagram = document.getElementById('inv-col-diagram');
        const colData = document.getElementById('inv-col-data');
        const layout = document.getElementById('inv-layout');

        if (!btnDiagram || !btnData || !colDiagram || !colData) return;

        function setMobileView(view) {
            if (view === 'diagram') {
                btnDiagram.classList.add('is-active');
                btnDiagram.setAttribute('aria-selected', 'true');
                btnData.classList.remove('is-active');
                btnData.setAttribute('aria-selected', 'false');

                colDiagram.classList.add('is-mobile-visible');
                colData.classList.remove('is-mobile-visible');
            } else {
                btnData.classList.add('is-active');
                btnData.setAttribute('aria-selected', 'true');
                btnDiagram.classList.remove('is-active');
                btnDiagram.setAttribute('aria-selected', 'false');

                colData.classList.add('is-mobile-visible');
                colDiagram.classList.remove('is-mobile-visible');
            }
            if (layout) layout.scrollTop = 0;
        }

        btnDiagram.addEventListener('click', () => setMobileView('diagram'));
        btnData.addEventListener('click', () => setMobileView('data'));
    }

    // --- ABRIR / CERRAR MODAL ---
    function openModal(bodyName) {
        const root = document.getElementById('investigation-root');
        if (!root) return;

        root.classList.remove('hidden');
        root.setAttribute('aria-hidden', 'false');
        isModalOpen = true;

        const targetKey = (bodyName && celestialScienceData[bodyName]) ? bodyName : (currentBodyKey || 'Tierra');
        switchBody(targetKey);

        // En móvil iniciar siempre con la vista de capas activa
        const btnDiagram = document.getElementById('btn-inv-view-diagram');
        const btnData = document.getElementById('btn-inv-view-data');
        const colDiagram = document.getElementById('inv-col-diagram');
        const colData = document.getElementById('inv-col-data');
        if (btnDiagram && btnData && colDiagram && colData) {
            btnDiagram.classList.add('is-active');
            btnData.classList.remove('is-active');
            colDiagram.classList.add('is-mobile-visible');
            colData.classList.remove('is-mobile-visible');
        }

        const layout = document.getElementById('inv-layout');
        if (layout) layout.scrollTop = 0;

        document.body.style.overflow = 'hidden';
        if (window.syncEstelarisHUD) {
            window.syncEstelarisHUD();
        }
    }

    function closeModal() {
        const root = document.getElementById('investigation-root');
        if (!root) return;

        root.classList.add('hidden');
        root.setAttribute('aria-hidden', 'true');
        isModalOpen = false;

        document.body.style.overflow = '';
        if (window.syncEstelarisHUD) {
            window.syncEstelarisHUD();
        }
    }

    // --- INICIALIZACIÓN ---
    function init() {
        setupTabs();
        setupMobileViewSwitch();

        const btnClose = document.getElementById('btn-close-investigation');
        if (btnClose) btnClose.addEventListener('click', closeModal);

        const backdrop = document.getElementById('investigation-backdrop');
        if (backdrop) {
            backdrop.addEventListener('click', (e) => {
                if (e.target === backdrop) closeModal();
            });
        }

        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isModalOpen) {
                closeModal();
            }
        });
    }

    // Exponer API global
    window.EstelarisInvestigation = {
        open: openModal,
        close: closeModal,
        switchBody: switchBody,
        isOpen: () => isModalOpen,
        init: init
    };

})();
