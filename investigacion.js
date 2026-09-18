/* ============================================================================
   ESTELARIS — MÓDULO DE INVESTIGACIÓN (CONTROLADOR CIENTÍFICO MINIMALISTA)
   Base de Datos Astrofísica Oficial & Corte de Capas Vectorial (19 Cuerpos)
   ============================================================================ */

(function () {
    'use strict';

    // --- BASE DE DATOS CIENTÍFICA OFICIAL (19 CUERPOS CELESTES) ---
    const celestialScienceData = {
        'Sol': {
            name: 'Sol',
            type: 'estrella',
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
                    role: 'Los fotones tardan hasta 170,000 años en difundirse hacia la superficie',
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
                    desc: 'La rotación diferencial retuerce las líneas de campo hasta invertirse cada 11 años, provocando eyecciones de masa coronal y tormentas geomagnéticas.'
                },
                {
                    title: 'Heliosfera Protectora',
                    desc: 'Burbuja de plasma magnetizado que abarca 120 AU desviando la radiación cósmica galáctica y estabilizando el medio interplanetario.'
                },
                {
                    title: 'Helioseismología Global',
                    desc: 'El Sol oscila continuamente en millones de modos acústicos atrapados, permitiendo medir la velocidad del sonido y la temperatura en su interior invisible.'
                }
            ],
            missions: [
                { name: 'Parker Solar Probe', year: '2018 — Presente', agency: 'NASA', desc: 'Primera nave en sumergirse en la corona solar a más de 600,000 km/h midiendo reconexiones magnéticas.' },
                { name: 'Solar Orbiter', year: '2020 — Presente', agency: 'ESA / NASA', desc: 'Fotografías milimétricas de los polos solares y de los fogonazos que calientan la corona.' },
                { name: 'SOHO', year: '1995 — Presente', agency: 'ESA / NASA', desc: 'Observación continua de manchas solares y descubrimiento de miles de cometas rasantes.' }
            ],
            trivia: [
                { title: 'Pérdida de Masa por Segundo', text: 'El núcleo solar convierte 4.28 millones de toneladas de masa en pura energía radiante cada segundo siguiendo con precisión la ecuación relativista E = mc².' },
                { title: 'El Enigma del Calentamiento Coronal', text: 'La corona solar alcanza más de 2,000,000°C, siendo cientos de veces más caliente que la fotosfera visible (5,500°C), impulsada por ondas de Alfvén y nanofogonazos magnéticos.' },
                { title: 'Fotones Ancestrales', text: 'Debido a la densidad extrema de la zona radiativa, un fotón de rayos gamma emitido en el núcleo tarda entre 10,000 y 170,000 años en llegar a la superficie en forma de luz visible.' },
                { title: '99.86% de Toda la Masa', text: 'El Sol agrupa el 99.86% de toda la materia del Sistema Solar completo; Júpiter concentra la mayor parte del modesto 0.14% restante.' },
                { title: 'Órbita Galáctica a 828,000 km/h', text: 'El Sol y todos sus planetas viajan a 230 km/s alrededor del centro de la Vía Láctea, tardando ~230 millones de años en completar un solo Año Cósmico.' }
            ]
        },

        'Mercurio': {
            name: 'Mercurio',
            type: 'planeta',
            category: 'Planeta Telúrico Metálico',
            themeColor: '#94a3b8',
            layers: [
                {
                    name: 'Corteza Regolítica & Basáltica',
                    depth: '100 — 300 km',
                    temp: '-180°C a +430°C',
                    pressure: 'Exosfera ultra-tenue (10⁻¹⁴ bar)',
                    composition: 'Silicatos ricos en magnesio y aluminio, azufre y regolito de microimpactos',
                    role: 'Litosfera antigua plagada de cráteres de impacto y escarpas tectónicas de contracción global',
                    color: '#cbd5e1',
                    radiusPct: 1.0
                },
                {
                    name: 'Manto de Silicatos Comprimido',
                    depth: '500 — 700 km',
                    temp: '500°C a 1,200°C',
                    pressure: '3 a 15 GPa',
                    composition: 'Rocas de peridotita densa adelgazada por choques primordiales',
                    role: 'Manto rígido adelgazado tras el impacto protoplanetario que arrancó gran parte de su manto exterior',
                    color: '#64748b',
                    radiusPct: 0.82
                },
                {
                    name: 'Núcleo Metálico Gigante',
                    depth: 'Radio de 2,070 km (~85% del radio)',
                    temp: '1,200°C a 1,700°C',
                    pressure: '40 GPa',
                    composition: 'Hierro metálico líquido exterior con corazón sólido de Fe-Ni-Si',
                    role: 'Dinamo activa que genera un campo magnético dipolar global (1% de la intensidad terrestre)',
                    color: '#ffffff',
                    radiusPct: 0.65
                }
            ],
            atmosphere: [
                { name: 'Oxígeno', formula: 'O', pct: '42.0%', color: '#38bdf8' },
                { name: 'Sodio', formula: 'Na', pct: '29.0%', color: '#fbbf24' },
                { name: 'Hidrógeno', formula: 'H2', pct: '22.0%', color: '#60a5fa' },
                { name: 'Helio', formula: 'He', pct: '6.0%', color: '#facc15' }
            ],
            surfaceMeta: [
                { label: 'Presión Atmosférica', val: '< 10⁻¹⁴ bar (Exosfera)' },
                { label: 'Oscilación Térmica', val: '-180°C (noche) / +430°C (día)' },
                { label: 'Velocidad de Escape', val: '4.25 km/s' },
                { label: 'Gravedad Superficial', val: '3.70 m/s² (0.38g)' }
            ],
            geophysics: [
                {
                    title: 'Planeta que se Encoge',
                    desc: 'Al enfriarse progresivamente su gigantesco núcleo de hierro, Mercurio ha reducido su diámetro en más de 14 km, arrugando su corteza con fallas escarpadas de hasta 3 km de elevación.'
                },
                {
                    title: 'Resonancia Espín-Órbita 3:2',
                    desc: 'Gira sobre su eje tres veces por cada dos órbitas completas alrededor del Sol, debido a la intensa fuerza de marea gravitacional en su órbita altamente excéntrica.'
                },
                {
                    title: 'Magnetosfera Dinámica',
                    desc: 'Pese a su diminuto tamaño, su núcleo exterior de hierro líquido fundido mantiene una dinamo activa que desvía con éxito ráfagas de viento solar.'
                }
            ],
            missions: [
                { name: 'BepiColombo', year: '2018 — Presente (En Ruta)', agency: 'ESA / JAXA', desc: 'Doble orbitador de alta precisión para mapear composición mineral y campo magnético.' },
                { name: 'MESSENGER', year: '2004 — 2015', agency: 'NASA', desc: 'Confirmó depósitos masivos de hielo de agua y compuestos orgánicos en cráteres polares en sombra perpetua.' },
                { name: 'Mariner 10', year: '1973 — 1975', agency: 'NASA', desc: 'Primer sobrevuelo espacial que descubrió su inesperado campo magnético dipolar.' }
            ],
            trivia: [
                { title: 'Hielo en el Horno Solar', text: 'En los fondos de los cráteres polares donde la luz solar jamás incide, la temperatura se mantiene a -223°C, albergando miles de millones de toneladas de hielo de agua estable.' },
                { title: 'Prueba de la Relatividad de Einstein', text: 'La precesión anómala del perihelio de Mercurio (43 segundos de arco por siglo) fue la confirmación experimental histórica cumbre de la Teoría de la Relatividad General en 1915.' },
                { title: 'El Amanecer Doble', text: 'Debido a su órbita muy excéntrica, cerca del perihelio la velocidad orbital supera a la velocidad angular de rotación: el Sol parece detenerse en el cielo, retroceder y reanudar su marcha.' },
                { title: 'Un Núcleo Desproporcionado', text: 'El núcleo de hierro de Mercurio ocupa el 85% del radio de todo el planeta y representa más del 70% de su masa total, haciéndolo el planeta rocoso con mayor proporción metálica.' },
                { title: 'Cola de Cometa de Sodio', text: 'El viento solar empuja átomos de sodio y potasio desprendidos de su superficie, creando una cola brillante que se extiende millones de kilómetros tras el planeta.' }
            ]
        },

        'Venus': {
            name: 'Venus',
            type: 'planeta',
            category: 'Planeta Telúrico Supercrítico',
            themeColor: '#f59e0b',
            layers: [
                {
                    name: 'Atmósfera Supercrítica & Nubes de H2SO4',
                    depth: '0 — 90 bar (0 — 80 km)',
                    temp: '465°C constante en superficie',
                    pressure: '92 bar (9.2 MPa)',
                    composition: '96.5% Dióxido de Carbono, 3.5% Nitrógeno, gotas de ácido sulfúrico concentrado',
                    role: 'Efecto invernadero desbocado irreversible que atrapa el 99% de la radiación infrarroja térmica',
                    color: '#fbbf24',
                    radiusPct: 1.0
                },
                {
                    name: 'Corteza Basáltica Volcánica',
                    depth: '20 — 50 km',
                    temp: '465°C a 700°C',
                    pressure: '9.2 a 1,500 MPa',
                    composition: 'Basaltos toleíticos enriquecidos por miles de volcanes en escudo activos',
                    role: 'Corteza rígida de una sola placa que se recubre periódicamente mediante cataclismos magmáticos',
                    color: '#d97706',
                    radiusPct: 0.88
                },
                {
                    name: 'Manto Silicatado Convectivo',
                    depth: '3,000 km',
                    temp: '1,000°C a 3,200°C',
                    pressure: '1.5 a 125 GPa',
                    composition: 'Silicatos de magnesio y hierro en régimen tectónico de tapa estancada (stagnant lid)',
                    role: 'Convección térmica del manto sin subducción continua de placas tectónicas',
                    color: '#b45309',
                    radiusPct: 0.70
                },
                {
                    name: 'Núcleo Metálico de Fe-Ni',
                    depth: 'Radio de 3,200 km',
                    temp: '4,000°C',
                    pressure: '130 a 290 GPa',
                    composition: 'Aleación líquida densa de hierro y níquel',
                    role: 'Carece de dinamo activa debido a la ausencia de enfriamiento convectivo vigoroso por subducción',
                    color: '#78350f',
                    radiusPct: 0.45
                }
            ],
            atmosphere: [
                { name: 'Dióxido de Carbono', formula: 'CO2', pct: '96.5%', color: '#f59e0b' },
                { name: 'Nitrógeno', formula: 'N2', pct: '3.5%', color: '#60a5fa' },
                { name: 'Dióxido de Azufre', formula: 'SO2', pct: '0.015%', color: '#eab308' },
                { name: 'Argón', formula: 'Ar', pct: '0.007%', color: '#94a3b8' }
            ],
            surfaceMeta: [
                { label: 'Presión Superficial', val: '92.0 bar (92 atm)' },
                { label: 'Temperatura Media', val: '465°C (738 K)' },
                { label: 'Velocidad de Escape', val: '10.36 km/s' },
                { label: 'Gravedad Superficial', val: '8.87 m/s² (0.91g)' }
            ],
            geophysics: [
                {
                    title: 'Invernadero Desbocado',
                    desc: 'La densa manta de CO2 y nubes de ácido sulfúrico opacas al infrarrojo elevan la temperatura por encima del punto de fusión del plomo (327°C) tanto de día como de noche.'
                },
                {
                    title: 'Superrotación Atmosférica',
                    desc: 'Los vientos de la alta atmósfera alcanzan 360 km/h y completan una vuelta al planeta en solo 4 días terrestres, 60 veces más rápido que la lenta rotación del propio suelo.'
                },
                {
                    title: 'Vulcanismo Global Activo',
                    desc: 'La misión Magellan y observaciones infrarrojas recientes confirman erupciones activas de lava fresca y fosfano en equilibrio no termodinámico.'
                }
            ],
            missions: [
                { name: 'VERITAS & EnVision', year: '2029 — 2031 (Planificadas)', agency: 'NASA / ESA', desc: 'Misiones orbitales con radar SAR interferométrico para cartografiar tectónica y volcanes activos.' },
                { name: 'Venera 13 & 14', year: '1981 — 1982', agency: 'Roscosmos (URSS)', desc: 'Transmitieron las primeras fotografías a color y análisis de suelo directamente desde la infernal superficie.' },
                { name: 'Magallanes (Magellan)', year: '1989 — 1994', agency: 'NASA', desc: 'Mapeó mediante radar el 98% de la topografía venusiana revelando coronas y ríos de lava basáltica.' }
            ],
            trivia: [
                { title: 'El Día Dura Más que el Año', text: 'Venus tarda 243 días terrestres en girar una sola vez sobre su propio eje, pero completa su órbita alrededor del Sol en solo 224.7 días terrestres.' },
                { title: 'Rotación Retrógrada', text: 'Gira en sentido de las agujas del reloj (al revés que la casi totalidad de los planetas), por lo que el Sol sale por el oeste y se pone por el este.' },
                { title: 'Lluvia Ácida que se Evapora', text: 'Las nubes descargan gotas de ácido sulfúrico corrosivo que se evaporan en virga a 25 km de altitud antes de tocar el suelo debido al tremendo calor superficial.' },
                { title: 'Presión de Submarino Profundo', text: 'Caminar sobre la superficie de Venus equivaldría a estar sumergido a 900 metros de profundidad en los océanos terrestres; el aire es un fluido supercrítico aplastante.' },
                { title: 'Zona Templada a 50 km', text: 'A 50 km de altura en la atmósfera venusiana, la presión es de 1 bar y la temperatura de 20°C a 30°C: es el entorno extraterrestre con condiciones más parecidas a la superficie de la Tierra.' }
            ]
        },

        'Tierra': {
            name: 'Tierra',
            type: 'planeta',
            category: 'Planeta Telúrico / Biosfera Activa',
            themeColor: '#38bdf8',
            layers: [
                {
                    name: 'Corteza Terrestre (Litosfera)',
                    depth: '0 — 40 km',
                    temp: '15°C a 500°C',
                    pressure: '0.1 a 1.2 GPa',
                    composition: 'Silicatos de aluminio, basalto oceánico, granito continental',
                    role: 'Soporte biológico, fondos oceánicos y 15 placas tectónicas activas que reciclan carbono',
                    color: '#22c55e',
                    radiusPct: 1.0
                },
                {
                    name: 'Manto Superior (Astenosfera)',
                    depth: '40 — 670 km',
                    temp: '500°C a 1,000°C',
                    pressure: '1.2 a 24 GPa',
                    composition: 'Peridotita rica en olivino, piroxeno y granate dúctil',
                    role: 'Células de convección plástica que desplazan y subducen los continentes',
                    color: '#eab308',
                    radiusPct: 0.88
                },
                {
                    name: 'Manto Inferior (Mesosfera)',
                    depth: '670 — 2,890 km',
                    temp: '1,000°C a 3,000°C',
                    pressure: '24 a 136 GPa',
                    composition: 'Bridgmanita (silicato de magnesio-hierro) y periclasa densa',
                    role: 'Masa rocosa profunda que transfiere el calor geotérmico del núcleo hacia el exterior',
                    color: '#f97316',
                    radiusPct: 0.72
                },
                {
                    name: 'Núcleo Externo Líquido',
                    depth: '2,890 — 5,150 km',
                    temp: '4,000°C a 5,000°C',
                    pressure: '136 a 330 GPa',
                    composition: 'Hierro fundido (85%), Níquel (10%), Azufre y Oxígeno (5%)',
                    role: 'Geodinamo: corrientes helicoidales inducidas por Coriolis que generan el campo geomagnético',
                    color: '#ef4444',
                    radiusPct: 0.52
                },
                {
                    name: 'Núcleo Interno Sólido',
                    depth: '5,150 — 6,371 km',
                    temp: '5,400°C (Temperatura fotosférica solar)',
                    pressure: '330 a 360 GPa (3.6 millones de atm)',
                    composition: 'Cristal metálico hexagonal compacto de Hierro-Níquel puro',
                    role: 'Esfera metálica ultradensa que estabiliza el eje de rotación y la dinamo magnética',
                    color: '#ffffff',
                    radiusPct: 0.28
                }
            ],
            atmosphere: [
                { name: 'Nitrógeno', formula: 'N2', pct: '78.08%', color: '#60a5fa' },
                { name: 'Oxígeno', formula: 'O2', pct: '20.95%', color: '#22c55e' },
                { name: 'Argón', formula: 'Ar', pct: '0.93%', color: '#94a3b8' },
                { name: 'Dióxido de Carbono', formula: 'CO2', pct: '0.042%', color: '#f59e0b' }
            ],
            surfaceMeta: [
                { label: 'Presión al Nivel del Mar', val: '1.013 bar (1 atm)' },
                { label: 'Temperatura Media Global', val: '15°C (288 K)' },
                { label: 'Velocidad de Escape', val: '11.19 km/s' },
                { label: 'Gravedad Superficial', val: '9.81 m/s² (1.0g)' }
            ],
            geophysics: [
                {
                    title: 'Escudo Geomagnético',
                    desc: 'El dínamo del núcleo externo genera la magnetosfera terrestre, desviando el viento solar letal y preservando intacta la atmósfera rica en vapor y oxígeno.'
                },
                {
                    title: 'Tectónica de Placas Continua',
                    desc: 'Es el único cuerpo conocido con ciclo de Wilson activo: la subducción recicla los carbonatos y estabiliza el termostato climático a escalas de millones de años.'
                },
                {
                    title: 'Regulación por la Hidrosfera',
                    desc: 'El 71% de la corteza está cubierto por agua líquida en equilibrio termodinámico, con corrientes oceánicas globales que distribuyen el calor de los trópicos a los polos.'
                }
            ],
            missions: [
                { name: 'Constelación Sentinel / Copernicus', year: '2014 — Presente', agency: 'ESA', desc: 'Monitorización por radar e infrarrojo de glaciares, bosques, humedad del suelo y océanos.' },
                { name: 'Flota Landsat & Terra', year: '1972 — Presente', agency: 'NASA / USGS', desc: 'Observación orbital multiespectral continua del balance radiativo y biosfera terrestre.' },
                { name: 'ISS (Estación Espacial Internacional)', year: '1998 — Presente', agency: 'NASA / ESA / JAXA / CSA', desc: 'Laboratorio orbital tripulado permanente en microgravedad.' }
            ],
            trivia: [
                { title: 'Superrotación del Núcleo Interno', text: 'Mediciones sísmicas precisas de ondas de terremotos demuestran que el núcleo interno de hierro sólido gira a una velocidad ligeramente distinta a la del resto del planeta.' },
                { title: 'Inversión de los Polos Magnéticos', text: 'El campo magnético terrestre se debilita e invierte su polaridad (el norte magnético pasa al sur geográfico) de manera caótica cada 200,000 a 300,000 años.' },
                { title: 'La Luna se Aleja Anualmente', text: 'La transferencia de momento angular por fricción de marea frena gradualmente la rotación terrestre y aleja a la Luna a un ritmo medido por láser de 3.8 cm por año.' },
                { title: 'El Punto Más Profundo', text: 'La Fosa de las Marianas (Abismo de Challenger) alcanza 10,994 metros bajo el mar, donde la presión hidrostática supera las 1,100 atmósferas.' },
                { title: 'La Atmósfera se Extiende 630,000 km', text: 'La geocorona de hidrógeno (la parte más externa de la exosfera terrestre) se extiende más allá de la órbita de la Luna, abarcando casi el doble de la distancia lunar.' }
            ]
        },

        'Luna': {
            name: 'Luna',
            type: 'luna',
            category: 'Satélite Natural Terrestre',
            themeColor: '#cbd5e1',
            layers: [
                {
                    name: 'Regolito & Megaregolito de Impacto',
                    depth: '0 — 20 m (y hasta 3 km fracturados)',
                    temp: '-130°C (noche) a +120°C (día)',
                    pressure: 'Exosfera ultra-tenue (10⁻¹² bar)',
                    composition: 'Polvo silicatado vitrificado enriquecido con anortositas y titanio',
                    role: 'Capa pulverizada por 4,500 millones de años de bombardeo continuo de micrometeoritos',
                    color: '#f1f5f9',
                    radiusPct: 1.0
                },
                {
                    name: 'Corteza Anortosítica Lunar',
                    depth: '0 — 60 km',
                    temp: '-130°C a +100°C',
                    pressure: '0.1 a 1.5 GPa',
                    composition: 'Anortosita rica en feldespato plagioclasa cálcica (tierras altas) y basaltos (mares)',
                    role: 'Formada por flotación de cristales ligeros durante la solidificación del océano de magma primordial',
                    color: '#cbd5e1',
                    radiusPct: 0.85
                },
                {
                    name: 'Manto Lítico Semirrígido',
                    depth: '60 — 1,000 km',
                    temp: '800°C a 1,200°C',
                    pressure: '1.5 a 4.5 GPa',
                    composition: 'Silicatos ultraricos en olivino, ortopiroxeno y clinopiroxeno',
                    role: 'Manto rocoso rígido donde los sismómetros de las misiones Apolo registraron sismos de marea profunda',
                    color: '#94a3b8',
                    radiusPct: 0.65
                },
                {
                    name: 'Núcleo Metálico Parcialmente Fundido',
                    depth: 'Radio de 330 km (~20% del radio)',
                    temp: '1,300°C a 1,400°C',
                    pressure: '4.5 a 5.0 GPa',
                    composition: 'Hierro metálico con sulfuro de hierro (FeS) y capa límite de manto fundido',
                    role: 'Núcleo pequeño en enfriamiento; generó un potente paleocampo magnético hace 3,500 millones de años',
                    color: '#64748b',
                    radiusPct: 0.28
                }
            ],
            atmosphere: [
                { name: 'Argón-40', formula: '40Ar', pct: '40.0%', color: '#94a3b8' },
                { name: 'Helio-4', formula: '4He', pct: '30.0%', color: '#facc15' },
                { name: 'Neón', formula: '20Ne', pct: '20.0%', color: '#fb7185' },
                { name: 'Hidrógeno', formula: 'H2', pct: '10.0%', color: '#60a5fa' }
            ],
            surfaceMeta: [
                { label: 'Presión Exosférica', val: '< 10⁻¹² bar (Vacío espacial)' },
                { label: 'Oscilación Térmica', val: '-130°C a +120°C' },
                { label: 'Velocidad de Escape', val: '2.38 km/s' },
                { label: 'Gravedad Superficial', val: '1.62 m/s² (0.166g)' }
            ],
            geophysics: [
                {
                    title: 'Hipótesis del Gran Impacto (Theia)',
                    desc: 'Nacida hace 4,510 millones de años de los restos eyectados tras la colisión oblícua de un protoplaneta del tamaño de Marte contra la proto-Tierra.'
                },
                {
                    title: 'Bloqueo Mareal 1:1',
                    desc: 'Su periodo de rotación es idéntico a su periodo orbital (27.3 días), por lo que muestra siempre el mismo hemisferio hacia la Tierra.'
                },
                {
                    title: 'Estabilizador de la Oblicuidad Terrestre',
                    desc: 'Su atracción gravitacional estabiliza la inclinación axial de la Tierra en ~23.5°, evitando variaciones caóticas que habrían impedido un clima benigno para la vida.'
                }
            ],
            missions: [
                { name: 'Programa Artemis', year: '2022 — Presente', agency: 'NASA / ESA / JAXA', desc: 'Retorno humano a la superficie lunar y establecimiento de la estación orbital lunar Gateway.' },
                { name: 'Chang\'e 4, 5 & 6', year: '2019 — 2024', agency: 'CNSA', desc: 'Primer alunizaje en la cara oculta y retorno de muestras pristinas del polo sur lunar.' },
                { name: 'Programa Apolo', year: '1968 — 1972', agency: 'NASA', desc: '6 alunizajes tripulados que trajeron a la Tierra 382 kg de rocas lunares e instalaron sismómetros.' }
            ],
            trivia: [
                { title: 'Sismos Lunares de 10 Minutos', text: 'A diferencia de la Tierra, donde los terremotos duran menos de un minuto, los sismos lunares pueden resonar durante más de 10 minutos porque la roca lunar es extremadamente seca y no amortigua las vibraciones.' },
                { title: 'Hielo en los Polos Perpetuos', text: 'El cráter Shackleton y otras depresiones del polo sur albergan depósitos de hielo de agua protegidos del Sol a temperaturas de -240°C, esenciales para el combustible de futuras misiones.' },
                { title: 'Polvo Cortante y Abrasivo', text: 'El regolito lunar carece de erosión por viento o agua: está formado por fragmentos afilados como vidrio que dañan los sellos herméticos y trajes espaciales.' },
                { title: 'La Luna No es Redonda', text: 'La Luna no es una esfera geométrica perfecta: tiene forma de huevo achatado con su extremo más abultado apuntando permanentemente hacia la gravedad de la Tierra.' },
                { title: 'El Cielo Siempre es Negro', text: 'Sin atmósfera que disperse la luz del Sol (dispersión de Rayleigh), el cielo lunar permanece de un negro azabache absoluto incluso en pleno mediodía iluminado.' }
            ]
        },

        'Marte': {
            name: 'Marte',
            type: 'planeta',
            category: 'Planeta Telúrico Desértico',
            themeColor: '#ef4444',
            layers: [
                {
                    name: 'Corteza Basáltica Oxidada',
                    depth: '0 — 50 km',
                    temp: '-63°C media (-125°C a +20°C)',
                    pressure: '6.1 mbar (0.006 atm)',
                    composition: 'Rocas basálticas ricas en hierro férrico Fe2O3 (herrumbre) y minerales arcillosos',
                    role: 'Corteza rígida y fría que preserva valles fluviales secos, lechos de lagos antiguos y deltas',
                    color: '#f87171',
                    radiusPct: 1.0
                },
                {
                    name: 'Manto Litosférico de Peridotita',
                    depth: '50 — 1,700 km',
                    temp: '800°C a 1,600°C',
                    pressure: '2 a 23 GPa',
                    composition: 'Silicatos de magnesio y hierro deshidratados con alta viscosidad',
                    role: 'Litosfera estática de gran espesor que permitió el crecimiento colosal de volcanes en escudo',
                    color: '#dc2626',
                    radiusPct: 0.78
                },
                {
                    name: 'Núcleo Líquido de Hierro-Azufre',
                    depth: 'Radio de 1,830 km (medido por InSight)',
                    temp: '1,500°C a 2,000°C',
                    pressure: '25 a 40 GPa',
                    composition: 'Hierro fundido con alto contenido de azufre, oxígeno, carbono y fósforo',
                    role: 'Se enfrió rápidamente debido al pequeño tamaño planetario, extinguiendo su dinamo global',
                    color: '#991b1b',
                    radiusPct: 0.54
                }
            ],
            atmosphere: [
                { name: 'Dióxido de Carbono', formula: 'CO2', pct: '95.32%', color: '#ef4444' },
                { name: 'Nitrógeno', formula: 'N2', pct: '2.60%', color: '#60a5fa' },
                { name: 'Argón', formula: 'Ar', pct: '1.90%', color: '#94a3b8' },
                { name: 'Oxígeno Molecular', formula: 'O2', pct: '0.13%', color: '#22c55e' }
            ],
            surfaceMeta: [
                { label: 'Presión Superficial', val: '6.1 mbar (0.006 atm)' },
                { label: 'Temperatura Media', val: '-63°C (210 K)' },
                { label: 'Velocidad de Escape', val: '5.03 km/s' },
                { label: 'Gravedad Superficial', val: '3.72 m/s² (0.38g)' }
            ],
            geophysics: [
                {
                    title: 'Pérdida Atmosférica por Viento Solar',
                    desc: 'Al apagarse su dinamo hace 4,000 millones de años, la pérdida del campo magnético permitió que el viento solar erosionara el 90% de su atmósfera hacia el espacio interplanetario.'
                },
                {
                    title: 'Megavulcanismo de Tarsis',
                    desc: 'El abultamiento de Tarsis concentra volcanes colosales como Olympus Mons (22 km de altura), el mayor edificio volcánico del Sistema Solar.'
                },
                {
                    title: 'Ciclo Hidrológico Antiguo',
                    desc: 'Perseverance y Curiosity han analizado sedimentos que demuestran la existencia de lagos y ríos caudalosos de agua dulce líquida durante el periodo Noeico.'
                }
            ],
            missions: [
                { name: 'Perseverance & Ingenuity', year: '2020 — Presente', agency: 'NASA', desc: 'Recolección de testigos de roca en el cráter Jezero y primer vuelo atmosférico propulsado en otro mundo.' },
                { name: 'Curiosity (MSL)', year: '2012 — Presente', agency: 'NASA', desc: 'Descubrió moléculas orgánicas complejas y antiguos depósitos lacustres habitables en el cráter Gale.' },
                { name: 'ExoMars & Mars Express', year: '2003 — Presente', agency: 'ESA', desc: 'Cartografía de vapor de agua, hielo subsuperficial y detección de picos variables de metano.' }
            ],
            trivia: [
                { title: 'El Volcán Más Monumental', text: 'El Monte Olimpo se eleva 21.9 km sobre el nivel de referencia (casi el triple de la altura del Monte Everest) y su base abarcaría todo el territorio de Francia.' },
                { title: 'El Cañón Más Profundo del Cosmos', text: 'Valles Marineris tiene más de 4,000 km de longitud, 200 km de anchura y hasta 7 km de profundidad: cabría holgadamente de costa a costa en los Estados Unidos.' },
                { title: 'Atardeceres Azules', text: 'Debido a que el polvo atmosférico marciano dispersa la luz roja preferentemente hacia los lados, la luz que llega directamente desde el Sol poniente se ve de un tono azul brillante.' },
                { title: 'Casquetes de Hielo Seco', text: 'En el invierno marciano, hasta el 25% del dióxido de carbono de la atmósfera se congela directamente sobre los polos formando una capa estacional de nieve de hielo seco de 1 metro de espesor.' },
                { title: 'Meteoritos Marcianos en la Tierra', text: 'Grandes impactos de asteroides en Marte han eyectado fragmentos de roca al espacio con velocidad de escape; varios cientos han caído en la Tierra como meteoritos basálticos catalogados (SNC).' }
            ]
        },

        'Júpiter': {
            name: 'Júpiter',
            type: 'planeta',
            category: 'Gigante Gaseoso Joviano',
            themeColor: '#f97316',
            layers: [
                {
                    name: 'Atmósfera Superior & Bandas Nubosas',
                    depth: '0 — 1,000 km',
                    temp: '-110°C a +20°C',
                    pressure: '0.1 a 10 bar',
                    composition: '89% Hidrógeno, 10% Helio, nubes de amoníaco (NH3) e hidrosulfuro de amonio',
                    role: 'Bandas de vientos zonales opuestos de hasta 540 km/h que confinan ciclones gigantescos',
                    color: '#fdba74',
                    radiusPct: 1.0
                },
                {
                    name: 'Manto de Hidrógeno Líquido Molecular',
                    depth: '1,000 — 20,000 km',
                    temp: '20°C a 5,000°C',
                    pressure: '10 bar a 2,000,000 bar (2 Mbar)',
                    composition: 'Hidrógeno comprimido en estado de fluido supercrítico homogéneo',
                    role: 'Fluido denso en convección continua que transfiere el calor primordial interno hacia afuera',
                    color: '#fb923c',
                    radiusPct: 0.85
                },
                {
                    name: 'Hidrógeno Metálico Conductor',
                    depth: '20,000 — 60,000 km',
                    temp: '5,000°C a 18,000°C',
                    pressure: '2 Mbar a 40 Mbar',
                    composition: 'Protones comprimidos con electrones deslocalizados en estado cuántico metálico',
                    role: 'Fluido superconductor en rápida rotación que genera la magnetosfera más colosal del sistema solar',
                    color: '#ea580c',
                    radiusPct: 0.60
                },
                {
                    name: 'Núcleo Diluido de Hielos y Silicatos',
                    depth: 'Radio de 15,000 km (~12 masas terrestres)',
                    temp: '20,000°C',
                    pressure: '45 Mbar (45 millones de atm)',
                    composition: 'Mezcla difusa de hielos de agua/metano, metales y silicatos ultra-densos disueltos',
                    role: 'Revelado por la sonda Juno: no es una esfera rocosa sólida, sino un núcleo diluido y difuso',
                    color: '#c2410c',
                    radiusPct: 0.28
                }
            ],
            atmosphere: [
                { name: 'Hidrógeno', formula: 'H2', pct: '89.8%', color: '#60a5fa' },
                { name: 'Helio', formula: 'He', pct: '10.2%', color: '#facc15' },
                { name: 'Metano', formula: 'CH4', pct: '0.30%', color: '#38bdf8' },
                { name: 'Amoníaco', formula: 'NH3', pct: '0.026%', color: '#fdba74' }
            ],
            surfaceMeta: [
                { label: 'Presión al Nivel 1 bar', val: '1.0 bar (Nubes de referencia)' },
                { label: 'Temperatura en Nubes', val: '-110°C (163 K)' },
                { label: 'Velocidad de Escape', val: '59.5 km/s' },
                { label: 'Gravedad al Nivel 1 bar', val: '24.79 m/s² (2.53g)' }
            ],
            geophysics: [
                {
                    title: 'Magnetosfera Monstruosa',
                    desc: 'Su campo magnético es 20,000 veces más potente que el terrestre; su cola magnetosférica se extiende hasta la órbita de Saturno a más de 650 millones de kilómetros.'
                },
                {
                    title: 'Emisión Térmica Kelvin-Helmholtz',
                    desc: 'Júpiter emite un 67% más de calor al espacio del que absorbe del Sol, impulsado por una lenta contracción gravitatoria de apenas 1 mm por año.'
                },
                {
                    title: 'La Gran Mancha Roja',
                    desc: 'Un anticiclón descomunal de más de 16,000 km de diámetro que lleva activo al menos 350 años con vientos periféricos superiores a 430 km/h.'
                }
            ],
            missions: [
                { name: 'Juno', year: '2016 — Presente', agency: 'NASA', desc: 'Órbitas polares cercanas midiendo radiometría profunda, campo gravitatorio y el núcleo diluido.' },
                { name: 'Galileo', year: '1995 — 2003', agency: 'NASA', desc: 'Primer orbitador dedicado; lanzó una sonda de penetración atmosférica y descubrió océanos en lunas galileanas.' },
                { name: 'JUICE (JUpiter ICy moons Explorer)', year: '2023 — Presente (En Ruta)', agency: 'ESA', desc: 'En ruta para analizar en detalle Ganímedes, Calisto y Europa.' }
            ],
            trivia: [
                { title: '318 Veces la Masa Terrestre', text: 'Júpiter contiene dos veces y media la masa de todos los demás planetas, asteroides y lunas del Sistema Solar sumados en una sola esfera.' },
                { title: 'El Día Más Corto del Sistema Solar', text: 'Pese a su colosal tamaño de 142,984 km de diámetro, rota sobre sí mismo en tan solo 9 horas y 55 minutos, achatando visiblemente sus polos.' },
                { title: 'Escudo Protector de la Tierra', text: 'Su gigantesca atracción gravitatoria atrae o eyecta fuera del sistema solar a cientos de cometas y asteroides que de otro modo colisionarían con los planetas interiores.' },
                { title: 'Si la Magnetosfera Fuera Visible...', text: 'Si la inmensa magnetosfera de Júpiter pudiera verse a simple vista desde la Tierra por la noche, aparecería en el cielo con un tamaño dos veces más grande que la Luna llena.' },
                { title: 'Se Necesitarían 80 Júpiter para ser Estrella', text: 'Aunque está compuesto por los mismos elementos que el Sol (hidrógeno y helio), necesitaría tener unas 80 veces más masa para encender la fusión nuclear en su centro.' }
            ]
        },

        'Ío': {
            name: 'Ío',
            type: 'luna',
            category: 'Luna Volcánica de Júpiter',
            themeColor: '#eab308',
            layers: [
                {
                    name: 'Corteza de Azufre & Llanuras Volcánicas',
                    depth: '0 — 30 km',
                    temp: '-143°C ambiente a 1,600°C en lava',
                    pressure: 'Exosfera volcánica de SO2 (10⁻⁹ bar)',
                    composition: 'Dióxido de azufre SO2, azufre elemental en alótropos amarillo-rojizos y lavas ultramáficas',
                    role: 'Superficie hiperactiva renovada continuamente por más de 400 centros volcánicos activos',
                    color: '#facc15',
                    radiusPct: 1.0
                },
                {
                    name: 'Océano Magmático / Astenosfera Fundida',
                    depth: '30 — 800 km',
                    temp: '1,200°C a 1,800°C',
                    pressure: '1 a 15 GPa',
                    composition: 'Roca silicatada fundida con más del 20% de fracción líquida constante',
                    role: 'Capa magmática global alimentada por el tremendo calentamiento de marea gravitacional de Júpiter',
                    color: '#ea580c',
                    radiusPct: 0.80
                },
                {
                    name: 'Núcleo Metálico de Sulfuro de Hierro',
                    depth: 'Radio de 900 km (~50% del radio)',
                    temp: '1,400°C',
                    pressure: '15 a 20 GPa',
                    composition: 'Hierro metálico con alto porcentaje de sulfuro de hierro (FeS)',
                    role: 'Núcleo denso metálico segregado durante su temprana diferenciación térmica',
                    color: '#7c2d12',
                    radiusPct: 0.50
                }
            ],
            atmosphere: [
                { name: 'Dióxido de Azufre', formula: 'SO2', pct: '90.0%', color: '#facc15' },
                { name: 'Monóxido de Azufre', formula: 'SO', pct: '5.0%', color: '#eab308' },
                { name: 'Cloruro de Sodio', formula: 'NaCl', pct: '3.0%', color: '#94a3b8' },
                { name: 'Azufre y Oxígeno Atómico', formula: 'S, O', pct: '2.0%', color: '#fb923c' }
            ],
            surfaceMeta: [
                { label: 'Presión Atmosférica', val: '10⁻⁹ bar (Exosfera activa)' },
                { label: 'Temperatura Superficial', val: '-143°C (Ambiente) / 1,600°C (Lava)' },
                { label: 'Velocidad de Escape', val: '2.56 km/s' },
                { label: 'Gravedad Superficial', val: '1.79 m/s² (0.183g)' }
            ],
            geophysics: [
                {
                    title: 'Fricción de Marea de Laplace',
                    desc: 'Encerrada en una resonancia orbital 4:2:1 con Europa y Ganímedes, la gravedad joviana deforma la roca de Ío arriba y abajo hasta 100 metros en cada órbita, disipando calor masivo.'
                },
                {
                    title: 'Plumas Criovolcánicas y de Azufre',
                    desc: 'Volcanes como Pele y Tvashtar expulsan columnas de gas y polvo a velocidades superiores a 1 km/s, alcanzando más de 500 km sobre la superficie antes de caer de regreso.'
                },
                {
                    title: 'Toroide de Plasma de Ío',
                    desc: 'Ío pierde 1 tonelada de iones de azufre y oxígeno por segundo, formando un toroide de plasma magnetizado que rodea toda la órbita alrededor de Júpiter.'
                }
            ],
            missions: [
                { name: 'Juno Extended Mission', year: '2023 — 2024', agency: 'NASA', desc: 'Sobrevuelos ultra-cercanos a 1,500 km capturando lagos de lava basáltica activa y plumas gigantes.' },
                { name: 'Galileo', year: '1995 — 2003', agency: 'NASA', desc: 'Fotografió más de 100 erupciones volcánicas activas en curso y midió temperaturas de lava de 1,600°C.' },
                { name: 'Voyager 1', year: '1979', agency: 'NASA', desc: 'Linda Morabito descubrió la primera pluma volcánica activa más allá de la Tierra, revolucionando la geología.' }
            ],
            trivia: [
                { title: 'El Mundo Más Volcánico del Cosmos', text: 'Ío cuenta con más de 400 volcanes activos y llanuras magmáticas que renuevan por completo toda su superficie cada millón de años: no tiene casi cráteres de impacto.' },
                { title: 'Lava Más Caliente que en la Tierra', text: 'Sus erupciones de lavas ultramáficas de silicatos alcanzan 1,600°C, superando las temperaturas de los volcanes terrestres modernos (que suelen rondar los 1,200°C).' },
                { title: 'Generador Eléctrico de 3 Millones de Amperios', text: 'Al cortar las líneas del campo magnético de Júpiter, Ío actúa como un generador eléctrico que conduce una corriente continua de 3 millones de amperios hacia los polos de Júpiter.' },
                { title: 'Deformación de Marea de 100 Metros', text: 'Las mareas gravitatorias de Júpiter y sus lunas hermanas levantan y bajan la corteza sólida de Ío en una ola vertical de 100 metros dos veces por cada vuelta orbital de 42 horas.' },
                { title: 'Olor a Dióxido de Azufre', text: 'Si un ser humano pudiera oler la superficie a través de un traje espacial presurizado, percibiría un olor penetrante y asfixiante a azufre quemado y roca calcinada.' }
            ]
        },

        'Europa': {
            name: 'Europa',
            type: 'luna',
            category: 'Luna Oceánica Subglacial',
            themeColor: '#93c5fd',
            layers: [
                {
                    name: 'Corteza de Hielo H2O Fracturada',
                    depth: '15 — 25 km',
                    temp: '-160°C superficial',
                    pressure: '0 a 0.2 GPa',
                    composition: 'Hielo de agua puro salpicado de sales de sulfato de magnesio hidratado y lineae',
                    role: 'Caparazón gélido continuo con criotectónica de placas y lomas dobles inducidas por mareas',
                    color: '#e0f2fe',
                    radiusPct: 1.0
                },
                {
                    name: 'Océano Global de Agua Líquida',
                    depth: '60 — 150 km de profundidad',
                    temp: '-5°C a +10°C cerca del lecho',
                    pressure: '0.13 a 0.25 GPa',
                    composition: 'Agua marina salada rica en cloruros y sulfatos; volumen 2x mayor a todos los mares terrestres',
                    role: 'Océano templado protegido por el hielo, en contacto directo con roca y chimeneas hidrotermales',
                    color: '#0284c7',
                    radiusPct: 0.85
                },
                {
                    name: 'Manto Rocoso de Silicatos',
                    depth: 'Radio de 1,400 km',
                    temp: '800°C a 1,400°C',
                    pressure: '2 a 5 GPa',
                    composition: 'Rocas de silicatos deshidratados con actividad hidrotermal en el lecho marino',
                    role: 'Lecho rocoso que interactúa químicamente con el océano global, aportando nutrientes y energía',
                    color: '#1e3a8a',
                    radiusPct: 0.60
                },
                {
                    name: 'Núcleo Metálico de Hierro',
                    depth: 'Radio de 600 km',
                    temp: '1,500°C',
                    pressure: '5.5 GPa',
                    composition: 'Aleación metálica densa de hierro y níquel',
                    role: 'Corazón metálico denso que genera un tenue momento dipolar inducido por Júpiter',
                    color: '#0f172a',
                    radiusPct: 0.25
                }
            ],
            atmosphere: [
                { name: 'Oxígeno Molecular', formula: 'O2', pct: '98.0%', color: '#38bdf8' },
                { name: 'Vapor de Agua', formula: 'H2O', pct: '1.5%', color: '#93c5fd' },
                { name: 'Hidrógeno', formula: 'H2', pct: '0.5%', color: '#60a5fa' }
            ],
            surfaceMeta: [
                { label: 'Presión Atmosférica', val: '10⁻¹¹ bar (Exosfera radiolítica)' },
                { label: 'Temperatura Superficial', val: '-160°C (Ecuador) / -220°C (Polos)' },
                { label: 'Velocidad de Escape', val: '2.025 km/s' },
                { label: 'Gravedad Superficial', val: '1.31 m/s² (0.134g)' }
            ],
            geophysics: [
                {
                    title: 'Océano Salino Subglacial',
                    desc: 'Esconde un océano global de entre 60 y 150 km de profundidad con más del doble de volumen de agua líquida que todos los océanos de la Tierra combinados.'
                },
                {
                    title: 'Tectónica de Crioplacas',
                    desc: 'La corteza de hielo muestra bloques desplazados y rotados idénticos a los témpanos árticos terrestres, con criovulcanismo de salmuera a lo largo de las fracturas lineae.'
                },
                {
                    title: 'Inducción Electromagnética Marina',
                    desc: 'Al orbitar dentro del campo magnético de Júpiter, la conductividad eléctrica del agua salada subterránea genera un campo magnético secundario inducido medido por Galileo.'
                }
            ],
            missions: [
                { name: 'Europa Clipper', year: '2024 (En Ruta a Júpiter)', agency: 'NASA', desc: 'Radar penetrador de hielo (REASON), espectrómetros y cámaras para evaluar habitabilidad marina.' },
                { name: 'JUICE', year: '2023 (En Ruta)', agency: 'ESA', desc: 'Realizará sobrevuelos de precisión midiendo el espesor de la corteza helada.' },
                { name: 'Galileo', year: '1995 — 2003', agency: 'NASA', desc: 'Demostró mediante magnetometría la presencia inequívoca de un océano salino líquido bajo el hielo.' }
            ],
            trivia: [
                { title: 'El Doble de Agua que la Tierra', text: 'Pese a ser más pequeña que nuestra Luna, el océano subterráneo de Europa contiene más de 3,000 millones de kilómetros cúbicos de agua líquida: el doble de toda el agua terrestre.' },
                { title: 'El Objeto Más Liso del Sistema Solar', text: 'Debido a que el hielo fluye plásticamente cerrando cráteres y fracturas, Europa carece de montañas altas; sus mayores elevaciones apenas alcanzan unos cientos de metros.' },
                { title: 'Plumas de Vapor Espaciales', text: 'El telescopio espacial Hubble detectó columnas de vapor de agua eyectadas a más de 160 km de altura a través de fisuras en el hielo, abriendo la puerta a analizar su océano sin perforar.' },
                { title: 'Generación Radiolítica de Oxígeno', text: 'La radiación de partículas cargadas atrapadas por Júpiter golpea el hielo superficial disociando el H2O y liberando miles de toneladas de oxígeno puro que podrían alimentar el océano.' },
                { title: 'Caos Convectivo Subterráneo', text: 'Las regiones denominadas "Chaos Terrains" (como Conamara Chaos) son zonas donde penachos de agua templada subsuperficial derritieron y fracturaron la corteza en témpanos flotantes.' }
            ]
        },

        'Ganímedes': {
            name: 'Ganímedes',
            type: 'luna',
            category: 'Mayor Luna del Cosmos / Con Magnetosfera',
            themeColor: '#a1a1aa',
            layers: [
                {
                    name: 'Corteza Helada de Terrenos Ranurados',
                    depth: '0 — 100 km',
                    temp: '-163°C media',
                    pressure: '0 a 0.2 GPa',
                    composition: '50% hielo de agua y 50% silicatos arcillosos con sales minerales y tolinas',
                    role: 'Corteza mixta dividida en terrenos oscuros viejos craterizados y terrenos ranurados estriados claros',
                    color: '#cbd5e1',
                    radiusPct: 1.0
                },
                {
                    name: 'Manto Oceánico Estratificado',
                    depth: '100 — 800 km',
                    temp: '-10°C a +40°C',
                    pressure: '0.2 a 2.0 GPa',
                    composition: 'Océano de agua líquida intercalado entre capas de hielo de alta presión (fases III, V y VI)',
                    role: 'Estructura tipo sándwich donde capas de hielo cristalino comprimido encierran agua líquida salina',
                    color: '#64748b',
                    radiusPct: 0.85
                },
                {
                    name: 'Manto Silicatado Profundo',
                    depth: '800 — 2,000 km',
                    temp: '800°C a 1,400°C',
                    pressure: '2 a 8 GPa',
                    composition: 'Rocas de silicatos densos ricos en hierro y magnesio',
                    role: 'Manto rocoso que aísla el núcleo y transmite calor geotérmico hacia el océano',
                    color: '#475569',
                    radiusPct: 0.60
                },
                {
                    name: 'Núcleo Metálico Líquido de Hierro',
                    depth: 'Radio de 500 km',
                    temp: '1,500°C',
                    pressure: '10 GPa',
                    composition: 'Hierro fundido y sulfuro de hierro (Fe-FeS) en convección térmica activa',
                    role: 'Dínamo activa: la ÚNICA luna del Sistema Solar con campo magnético dipolar intrínseco',
                    color: '#ffffff',
                    radiusPct: 0.25
                }
            ],
            atmosphere: [
                { name: 'Oxígeno Atómico & O2', formula: 'O, O2', pct: '95.0%', color: '#38bdf8' },
                { name: 'Ozono', formula: 'O3', pct: '3.0%', color: '#818cf8' },
                { name: 'Hidrógeno', formula: 'H', pct: '2.0%', color: '#60a5fa' }
            ],
            surfaceMeta: [
                { label: 'Presión Atmosférica', val: '10⁻¹¹ bar (Exosfera tenue)' },
                { label: 'Temperatura Media', val: '-163°C (110 K)' },
                { label: 'Velocidad de Escape', val: '2.74 km/s' },
                { label: 'Gravedad Superficial', val: '1.43 m/s² (0.146g)' }
            ],
            geophysics: [
                {
                    title: 'Campo Magnético Intrínseco',
                    desc: 'Posee una dinamo de hierro líquido en su núcleo que genera un campo magnético propio de 719 nT, embebido dentro de la colosal magnetosfera joviana.'
                },
                {
                    title: 'Auroras Polares Oscilantes',
                    desc: 'El telescopio espacial Hubble observó auroras brillantes en sus polos cuya oscilación amortiguada demostró la presencia de un océano salino subterráneo conductor.'
                },
                {
                    title: 'Tectónica de Grietas y Fallas',
                    desc: 'Los terrenos ranurados cubren dos tercios de la luna, formados por estiramiento de la corteza durante fases tempranas de calentamiento por marea.'
                }
            ],
            missions: [
                { name: 'JUICE (JUpiter ICy moons Explorer)', year: '2023 — 2034', agency: 'ESA', desc: 'Entrará en órbita fija alrededor de Ganímedes en 2034, siendo la primera nave en orbitar una luna joviana.' },
                { name: 'Juno', year: '2021', agency: 'NASA', desc: 'Sobrevuelo a 1,038 km capturando las imágenes de mayor resolución de sus fracturas y casquetes polares.' },
                { name: 'Galileo', year: '1996 — 2000', agency: 'NASA', desc: 'Descubrió su magnetosfera autónoma e indicios del océano subsuperficial.' }
            ],
            trivia: [
                { title: 'Más Grande que Mercurio y Plutón', text: 'Con 5,268 km de diámetro, Ganímedes es un 8% más grande que el planeta Mercurio y un 26% mayor que el planeta enano Plutón.' },
                { title: 'La Única Luna con Magnetosfera', text: 'Es el único satélite natural conocido en todo el Sistema Solar que genera su propio campo magnético bipolar activo mediante un dínamo interno de hierro líquido.' },
                { title: 'Océanos Intercalados entre Hielos', text: 'Se calcula que su volumen de agua líquida es hasta seis veces superior al de todos los océanos de la Tierra, retenido en capas sándwich de agua y hielo a miles de atmósferas.' },
                { title: 'Casquetes Polares de Escarcha', text: 'Sus polos están recubiertos por una fina escarcha blanca de hielo de agua pura, precipitada porque las líneas de campo magnético canalizan iones de plasma hacia los polos.' },
                { title: 'Tercera en la Resonancia de Laplace', text: 'Completa una órbita exacta de 7 días por cada dos vueltas de Europa y cada cuatro vueltas de Ío, conservando una perfecta sincronía kepleriana orbital de 4:2:1.' }
            ]
        },

        'Calisto': {
            name: 'Calisto',
            type: 'luna',
            category: 'Luna Heliocéntrica Crionuclear / Primordial',
            themeColor: '#64748b',
            layers: [
                {
                    name: 'Corteza de Hielo Ultra-Craterizada',
                    depth: '0 — 150 km',
                    temp: '-140°C media',
                    pressure: '0 a 0.2 GPa',
                    composition: 'Hielo de agua sucio mezclado con minerales silicatados, dióxido de carbono y compuestos orgánicos',
                    role: 'La superficie con mayor densidad de cráteres de impacto de todo el sistema solar: no renovada en 4,000 Ma',
                    color: '#94a3b8',
                    radiusPct: 1.0
                },
                {
                    name: 'Posible Océano Subsuperficial Salino',
                    depth: '150 — 300 km',
                    temp: '-15°C a +5°C',
                    pressure: '0.2 a 0.5 GPa',
                    composition: 'Agua marina con amoníaco disuelto como anticongelante y sales minerales',
                    role: 'Capa líquida conductora detectada por la perturbación del campo magnético joviano en sobrevuelos de Galileo',
                    color: '#475569',
                    radiusPct: 0.85
                },
                {
                    name: 'Interior Parcialmente Indiferenciado',
                    depth: 'Radio de 2,100 km (~85% del volumen)',
                    temp: '300°C a 800°C',
                    pressure: '0.5 a 3.5 GPa',
                    composition: 'Mezcla homogénea de silicatos rocosos y hielos compactados sin núcleo de hierro separado',
                    role: 'Cuerpo fósil que nunca se calentó lo suficiente para separar por completo el metal de la roca y el hielo',
                    color: '#334155',
                    radiusPct: 0.65
                }
            ],
            atmosphere: [
                { name: 'Dióxido de Carbono', formula: 'CO2', pct: '90.0%', color: '#f59e0b' },
                { name: 'Oxígeno Molecular', formula: 'O2', pct: '8.0%', color: '#38bdf8' },
                { name: 'Hidrógeno', formula: 'H2', pct: '2.0%', color: '#60a5fa' }
            ],
            surfaceMeta: [
                { label: 'Presión Atmosférica', val: '7.5 × 10⁻¹² bar (Exosfera)' },
                { label: 'Temperatura Media', val: '-140°C (133 K)' },
                { label: 'Velocidad de Escape', val: '2.44 km/s' },
                { label: 'Gravedad Superficial', val: '1.24 m/s² (0.126g)' }
            ],
            geophysics: [
                {
                    title: 'El Museo de Cráteres del Cosmos',
                    desc: 'Al estar fuera de la resonancia de Laplace, no sufre calentamiento por marea: su corteza preserva intacto el registro de colisiones del Gran Bombardeo Tardío hace 4,000 Ma.'
                },
                {
                    title: 'Estructura Multianillo Valhalla',
                    desc: 'La gigantesca cuenca de impacto Valhalla abarca 3,800 km con anillos concéntricos fracturados que recuerdan a las ondas de una piedra arrojada al agua helada.'
                },
                {
                    title: 'Indiferenciación Parcial',
                    desc: 'El momento de inercia medido por la sonda Galileo demuestra que la roca y el hielo interior nunca llegaron a fundirse para formar un núcleo metálico puro.'
                }
            ],
            missions: [
                { name: 'JUICE (ESA)', year: '2023 (En Ruta)', agency: 'ESA', desc: 'Llevará a cabo 21 sobrevuelos cercanos de Calisto para caracterizar su tenue atmósfera y océano profundo.' },
                { name: 'Galileo', year: '1996 — 2001', agency: 'NASA', desc: 'Realizó 8 sobrevuelos cercanos revelando la ausencia de campo magnético propio pero inducción salina.' },
                { name: 'Voyager 1 & 2', year: '1979', agency: 'NASA', desc: 'Primeros mapas geológicos detallados de sus cuencas de impacto Asgard y Valhalla.' }
            ],
            trivia: [
                { title: 'Superficie Saturada de Cráteres', text: 'Cada nuevo cráter de impacto que se forma en Calisto borra casi obligatoriamente a uno anterior: la superficie ha alcanzado el límite teórico máximo de saturación de impactos.' },
                { title: 'A Salvo de la Radiación Joviana', text: 'Al orbitar a 1,882,700 km de Júpiter (lejos de los letales cinturones de radiación interior), es el candidato preferido por las agencias para futuras bases tripuladas en el sistema joviano.' },
                { title: 'El Amoníaco como Anticongelante', text: 'Su océano interior sobrevive en estado líquido sin necesidad de calentamiento de marea intenso gracias a la alta concentración de amoníaco disuelto, que deprime el punto de congelación.' },
                { title: 'Erosión por Sublimación Silenciosa', text: 'Casi no tiene tectónica, pero los bordes de sus cráteres se desmoronan lentamente por sublimación del hielo de dióxido de carbono al ser calentados por la tenue luz solar.' },
                { title: 'Tercera Luna Mayor del Sistema Solar', text: 'Con 4,821 km de diámetro, es casi idéntica en tamaño al planeta Mercurio (4,879 km), pero tiene solo un tercio de su masa por estar compuesta en gran parte por hielo.' }
            ]
        },

        'Saturno': {
            name: 'Saturno',
            type: 'planeta',
            category: 'Gigante Gaseoso Anillado',
            themeColor: '#eab308',
            layers: [
                {
                    name: 'Atmósfera Superior & Hexágono Polar',
                    depth: '0 — 1,000 km',
                    temp: '-140°C a +20°C',
                    pressure: '0.1 a 10 bar',
                    composition: '96% Hidrógeno, 3% Helio, 0.4% Metano, cristales de amoníaco y fosfano',
                    role: 'Vórtice hexagonal persistente en el polo norte y vientos ecuatoriales veloces de hasta 1,800 km/h',
                    color: '#fef08a',
                    radiusPct: 1.0
                },
                {
                    name: 'Manto de Hidrógeno Líquido & Lluvia de Helio',
                    depth: '1,000 — 30,000 km',
                    temp: '20°C a 6,000°C',
                    pressure: '10 bar a 1,500,000 bar (1.5 Mbar)',
                    composition: 'Hidrógeno fluido supercrítico donde el helio se condensa formando gotas de lluvia descendentes',
                    role: 'La precipitación de gotas de helio libera energía potencial gravitatoria que calienta el planeta',
                    color: '#fde047',
                    radiusPct: 0.82
                },
                {
                    name: 'Capa de Hidrógeno Metálico Conductor',
                    depth: '30,000 — 50,000 km',
                    temp: '6,000°C a 12,000°C',
                    pressure: '1.5 Mbar a 10 Mbar',
                    composition: 'Hidrógeno en fase metálica conductora con electrones libres compartidos',
                    role: 'Genera un campo magnético casi perfectamente simétrico y alineado con el eje de rotación (<0.007°)',
                    color: '#eab308',
                    radiusPct: 0.55
                },
                {
                    name: 'Núcleo Difuso Rocoso-Helado',
                    depth: 'Radio de 12,000 km (~17 masas terrestres)',
                    temp: '12,000°C',
                    pressure: '15 Mbar',
                    composition: 'Núcleo difuso de silicatos de hierro y hielos de alta presión diluidos en hidrógeno metálico',
                    role: 'Corazón denso extendido confirmado por sismología de anillos con la misión Cassini',
                    color: '#a16207',
                    radiusPct: 0.25
                }
            ],
            atmosphere: [
                { name: 'Hidrógeno', formula: 'H2', pct: '96.3%', color: '#60a5fa' },
                { name: 'Helio', formula: 'He', pct: '3.25%', color: '#facc15' },
                { name: 'Metano', formula: 'CH4', pct: '0.45%', color: '#38bdf8' },
                { name: 'Amoníaco', formula: 'NH3', pct: '0.012%', color: '#fbbf24' }
            ],
            surfaceMeta: [
                { label: 'Presión al Nivel 1 bar', val: '1.0 bar (Nubes visibles)' },
                { label: 'Temperatura Media', val: '-140°C (133 K)' },
                { label: 'Velocidad de Escape', val: '35.5 km/s' },
                { label: 'Gravedad al Nivel 1 bar', val: '10.44 m/s² (1.07g)' }
            ],
            geophysics: [
                {
                    title: 'El Sistema de Anillos Espectacular',
                    desc: 'Se extienden 282,000 km desde el planeta pero tienen un espesor medio de apenas 10 a 30 metros, compuestos en un 99% por partículas y témpanos de hielo de agua puro.'
                },
                {
                    title: 'Hexágono del Polo Norte',
                    desc: 'Una onda planetaria estacionaria de 30,000 km de ancho (donde cabrían cuatro Tierras) que gira con un periodo exacto de 10 horas y 39 minutos.'
                },
                {
                    title: 'Lluvia Anular (Ring Rain)',
                    desc: 'El campo magnético drena agua ionizada desde los anillos hacia la alta atmósfera a un ritmo de una piscina olímpica cada 30 minutos; desaparecerán en ~100 Ma.'
                }
            ],
            missions: [
                { name: 'Cassini-Huygens', year: '1997 — 2017', agency: 'NASA / ESA / ASI', desc: '13 años en órbita revolucionando la ciencia de anillos, océanos de Encélado y lagos de Titán.' },
                { name: 'Voyager 1 & 2', year: '1980 — 1981', agency: 'NASA', desc: 'Fotografiaron miles de subdivisions finas en los anillos e intrincadas lunas pastoras.' },
                { name: 'Pioneer 11', year: '1979', agency: 'NASA', desc: 'Primer sobrevuelo histórico atravesando el plano de los anillos sin ser destruido.' }
            ],
            trivia: [
                { title: 'Menor Densidad que el Agua', text: 'Saturno tiene una densidad media de apenas 0.687 g/cm³ (el agua líquida tiene 1.0 g/cm³): si existiera una piscina cósmica lo bastante colosal, Saturno flotaría en ella.' },
                { title: 'Anillos de 10 Metros de Espesor', text: 'Pese a medir casi 300,000 km de diámetro exterior, su espesor promedio es ridículamente delgado: entre 10 y 30 metros de grosor, la estructura más esbelta del universo.' },
                { title: 'El Hexágono Atmosférico Permanente', text: 'El polo norte exhibe un gigantesco patrón hexagonal perfecto de tormentas de 30,000 km de ancho, recreado en laboratorios terrestres mediante fluidodinámica de fluidos rotatorios.' },
                { title: 'Los Anillos son Temporales', text: 'Cálculos de la misión Cassini estiman que los anillos se formaron hace solo 100 a 400 millones de años (en la época de los dinosaurios) y desaparecerán en otros 100 a 300 Ma por lluvia anular.' },
                { title: 'La Luna Mimas y la División de Cassini', text: 'La División de Cassini es una brecha oscura de 4,800 km de ancho entre los anillos A y B, mantenida completamente limpia de escombros por resonancia orbital 2:1 con la luna Mimas.' }
            ]
        },

        'Titán': {
            name: 'Titán',
            type: 'luna',
            category: 'Satélite con Atmósfera Densa y Lagos de Hidrocarburos',
            themeColor: '#f59e0b',
            layers: [
                {
                    name: 'Atmósfera Densa de N2 & Ciclo de Metano',
                    depth: '0 — 600 km',
                    temp: '-179°C superficial',
                    pressure: '1.45 bar (1.45 atm)',
                    composition: '95% Nitrógeno, 5% Metano con niebla estratosférica de tolinas orgánicas complejas',
                    role: 'Ciclo hidrocarbúrico análogo al hidrológico terrestre con nubes de metano, lluvia y lagos superficiales',
                    color: '#fbbf24',
                    radiusPct: 1.0
                },
                {
                    name: 'Corteza Lítica de Hielo de Agua',
                    depth: '0 — 80 km',
                    temp: '-179°C a -100°C',
                    pressure: '0.1 a 0.5 GPa',
                    composition: 'Hielo de agua tan rígido como el granito a -180°C cubierto de dunas de arena orgánica de tolinas',
                    role: 'Soporte geológico rígido que alberga valles fluviales de metano y mares como Kraken Mare',
                    color: '#d97706',
                    radiusPct: 0.86
                },
                {
                    name: 'Océano Líquido Salino Subterráneo',
                    depth: '80 — 400 km',
                    temp: '-10°C a +20°C',
                    pressure: '0.5 a 1.5 GPa',
                    composition: 'Agua marina global líquida con 10% de amoníaco disuelto que impide su congelación',
                    role: 'Masa líquida profunda desacoplada de la corteza por las mareas medidas por la sonda Cassini',
                    color: '#b45309',
                    radiusPct: 0.65
                },
                {
                    name: 'Núcleo Silicatado Deshidratado',
                    depth: 'Radio de 2,000 km',
                    temp: '1,000°C',
                    pressure: '2 a 4 GPa',
                    composition: 'Silicatos de magnesio y hierro comprimidos sin núcleo metálico diferenciado separado',
                    role: 'Centro rocoso estable que conforma el 55% de la masa total del satélite',
                    color: '#78350f',
                    radiusPct: 0.38
                }
            ],
            atmosphere: [
                { name: 'Nitrógeno', formula: 'N2', pct: '95.0%', color: '#60a5fa' },
                { name: 'Metano', formula: 'CH4', pct: '4.9%', color: '#f59e0b' },
                { name: 'Hidrógeno Molecular', formula: 'H2', pct: '0.1%', color: '#38bdf8' },
                { name: 'Etano & Hidrocarburos', formula: 'C2H6', pct: '0.01%', color: '#fbbf24' }
            ],
            surfaceMeta: [
                { label: 'Presión Superficial', val: '1.45 bar (45% mayor que la Tierra)' },
                { label: 'Temperatura Media', val: '-179°C (94 K)' },
                { label: 'Velocidad de Escape', val: '2.64 km/s' },
                { label: 'Gravedad Superficial', val: '1.35 m/s² (0.138g)' }
            ],
            geophysics: [
                {
                    title: 'Ciclo Metanológico Completo',
                    desc: 'En Titán, el metano existe cerca de su punto triple, cumpliendo el mismo rol que el agua en la Tierra: se evapora, forma nubes, precipita en lluvias torrenciales y fluye en ríos hacia mares polares.'
                },
                {
                    title: 'Mares de Hidrocarburos Líquidos',
                    desc: 'Kraken Mare y Ligeia Mare son mares de metano y etano líquido tan puros y transparentes que el radar de Cassini penetró cientos de metros hasta su fondo de hielo.'
                },
                {
                    title: 'Fábrica Fotoquímica Prebiótica',
                    desc: 'La radiación ultravioleta rompe el nitrógeno y metano en la alta atmósfera creando tolinas, aerosoles macromoleculares análogos a los que originaron la química orgánica primordial en la Tierra.'
                }
            ],
            missions: [
                { name: 'Dragonfly (NASA)', year: '2028 (Lanzamiento planificado)', agency: 'NASA', desc: 'Octocóptero robótico de propulsión nuclear que volará decenas de kilómetros sobre dunas y cráteres orgánicos.' },
                { name: 'Sonda Huygens (ESA)', year: '2005', agency: 'ESA', desc: 'Primer aterrizaje en el Sistema Solar exterior: descendió en paracaídas fotografiando canales fluviales y cantos de hielo rodados.' },
                { name: 'Cassini', year: '2004 — 2017', agency: 'NASA / ESA', desc: 'Mapeó mediante radar a través de la niebla anaranjada descubriendo todos los mares y lagos de hidrocarburos.' }
            ],
            trivia: [
                { title: 'Podrías Volar Agitando los Brazos', text: 'Gracias a su atmósfera un 50% más densa que la terrestre y su diminuta gravedad (0.14g), un ser humano provisto de alas artificiales en los brazos podría despegar y volar por el aire batiéndolas.' },
                { title: 'Hielo Tan Duro como el Granito', text: 'A su temperatura superficial de -179°C, el hielo de agua es químicamente una roca impenetrable que actúa como lecho rocoso continental sobre el que corren ríos de gas licuado.' },
                { title: 'Mares de Gas Natural Licuado', text: 'Los lagos y mares de Titán albergan cientos de veces más reservas de gas natural y petróleo líquido que todos los yacimientos comprobados de carbón y gas de nuestro planeta juntos.' },
                { title: 'Dunas Gigantescas de Plástico Natural', text: 'En las regiones ecuatoriales (como Belet y Shangri-La), vientos sostenidos acumulan inmensas dunas de 100 metros de altura compuestas por granos orgánicos poliméricos de tolinas.' },
                { title: 'Segunda Luna Mayor del Cosmos', text: 'Con 5,150 km de diámetro, es mayor que Mercurio y es el único satélite natural con una atmósfera sustancial y lagos superficiales estables en todo el cosmos.' }
            ]
        },

        'Encélado': {
            name: 'Encélado',
            type: 'luna',
            category: 'Luna Criovolcánica de Agua Salada',
            themeColor: '#38bdf8',
            layers: [
                {
                    name: 'Corteza de Hielo Puro & Rayas de Tigre',
                    depth: '0 — 25 km (5 km en polo sur)',
                    temp: '-198°C superficial',
                    pressure: 'Exosfera de plumas (10⁻¹⁰ bar)',
                    composition: 'Hielo de agua cristalino ultra-reflectante (albedo 0.99) cruzado por fisuras geotérmicas activas',
                    role: 'El cuerpo más brillante del sistema solar; sus fisuras meridionales eyectan plumas criovolcánicas al espacio',
                    color: '#e0f2fe',
                    radiusPct: 1.0
                },
                {
                    name: 'Océano Subglacial Global de Agua Salada',
                    depth: '30 — 65 km de profundidad',
                    temp: '0°C a +90°C en las chimeneas',
                    pressure: '0.01 a 0.05 GPa',
                    composition: 'Agua marina alcalina líquida (pH 9-11) con cloruro de sodio, carbonatos y sílice coloidal',
                    role: 'Océano templado mantenido por calentamiento de marea y serpentinización en el fondo rocoso',
                    color: '#0284c7',
                    radiusPct: 0.85
                },
                {
                    name: 'Núcleo Rocoso Poroso y Fracturado',
                    depth: 'Radio de 180 km',
                    temp: '100°C a 200°C en zonas reactivas',
                    pressure: '0.05 GPa',
                    composition: 'Rocas de peridotita porosa serpentinizada donde el agua marina circula libremente',
                    role: 'Reactor hidrotermal donde la interacción agua-roca genera gas hidrógeno molecular H2 continuo',
                    color: '#1e3a8a',
                    radiusPct: 0.60
                }
            ],
            atmosphere: [
                { name: 'Vapor de Agua', formula: 'H2O', pct: '91.0%', color: '#38bdf8' },
                { name: 'Nitrógeno Molecular', formula: 'N2', pct: '4.0%', color: '#60a5fa' },
                { name: 'Dióxido de Carbono', formula: 'CO2', pct: '3.2%', color: '#f59e0b' },
                { name: 'Metano & Hidrógeno', formula: 'CH4, H2', pct: '1.8%', color: '#22c55e' }
            ],
            surfaceMeta: [
                { label: 'Presión Atmosférica', val: '10⁻¹⁰ bar (Plumas criogénicas)' },
                { label: 'Temperatura Media', val: '-198°C (75 K)' },
                { label: 'Velocidad de Escape', val: '0.24 km/s' },
                { label: 'Gravedad Superficial', val: '0.113 m/s² (0.011g)' }
            ],
            geophysics: [
                {
                    title: 'Géiseres Criogénicos del Polo Sur',
                    desc: 'Más de 100 géiseres activos brotan a lo largo de las cuatro fracturas ("Rayas de Tigre") a 1,400 km/h, eyectando 200 kg de agua salada por segundo directamente al espacio.'
                },
                {
                    title: 'Alimentador del Anillo E de Saturno',
                    desc: 'El material expulsado por los géiseres que escapa de la diminuta gravedad de Encélado alimenta y renueva permanentemente el anillo E, el más extenso de Saturno.'
                },
                {
                    title: 'Ventilas Hidrotermales Activas',
                    desc: 'La detección de nanopartículas de sílice y gas H2 libre demuestra la existencia de fuentes hidrotermales en el fondo oceánico a más de 90°C con energía para quimiosíntesis.'
                }
            ],
            missions: [
                { name: 'Cassini (NASA / ESA)', year: '2005 — 2015', agency: 'NASA / ESA', desc: 'Rozó los géiseres a solo 25 km de altitud, oliendo directamente agua marina, sales y moléculas orgánicas.' },
                { name: 'Voyager 2', year: '1981', agency: 'NASA', desc: 'Fotografió por primera vez su superficie lisa y brillante casi desprovista de cráteres de impacto.' }
            ],
            trivia: [
                { title: 'El Espejo del Sistema Solar', text: 'Encélado posee un albedo geométrico de 0.99: refleja el 99% de toda la luz solar que recibe, convirtiéndolo en el cuerpo celeste más brillante y reflectante del sistema solar.' },
                { title: 'Ingredientes Completos para la Vida', text: 'En las muestras tomadas de sus géiseres por Cassini se detectaron los seis elementos biogénicos clave (CHONPS): Carbono, Hidrógeno, Oxígeno, Nitrógeno, Fósforo y Azufre.' },
                { title: 'Gravedad Diminuta', text: 'Un astronauta de 70 kg pesaría apenas 800 gramos en Encélado: con un salto atlético vigoroso casi podría alcanzar la velocidad de escape orbital (240 m/s).' },
                { title: 'Rayas de Tigre Calientes', text: 'Las cuatro grietas paralelas del polo sur (Alexandria, Cairo, Baghdad y Damascus) irradian continuamente miles de megavatios de calor geotérmico medidos por el infrarrojo de Cassini.' },
                { title: 'Diminuto pero Gigantesco en Ciencia', text: 'Con apenas 504 km de diámetro (cabrdría cómodamente dentro del Reino Unido), alberga el océano con mayores garantías de habitabilidad astrobiológica comprobada in situ.' }
            ]
        },

        'Urano': {
            name: 'Urano',
            type: 'planeta',
            category: 'Gigante de Hielo Inclinado',
            themeColor: '#22d3ee',
            layers: [
                {
                    name: 'Atmósfera de Hidrógeno, Helio & Metano',
                    depth: '0 — 2,000 km',
                    temp: '-224°C en tropopausa',
                    pressure: '0.1 a 1.2 bar',
                    composition: '82.5% Hidrógeno, 15.2% Helio, 2.3% Metano gaseoso, neblinas de sulfuro de hidrógeno',
                    role: 'El metano absorbe la luz roja impartiendo el característico color cian translúcido',
                    color: '#67e8f9',
                    radiusPct: 1.0
                },
                {
                    name: 'Manto de Fluidos Iónicos Supercríticos',
                    depth: '2,000 — 20,000 km',
                    temp: '2,000°C a 5,000°C',
                    pressure: '20 a 600 GPa',
                    composition: 'Océano súperdenso y conductor de agua, amoníaco y metano en fase superiónica',
                    role: 'Fluido cuántico con protones libres móviles que genera un campo magnético cuadrupolar inclinado 59°',
                    color: '#06b6d4',
                    radiusPct: 0.78
                },
                {
                    name: 'Núcleo Rocoso de Silicatos & Hierro',
                    depth: 'Radio de 7,000 km (~0.55 masas terrestres)',
                    temp: '5,000°C',
                    pressure: '800 GPa',
                    composition: 'Silicatos hidratados de hierro y níquel comprimidos a presiones extremas',
                    role: 'Centro rocoso moderado que retiene poco calor residual hacia las capas superficiales',
                    color: '#0e7490',
                    radiusPct: 0.35
                }
            ],
            atmosphere: [
                { name: 'Hidrógeno', formula: 'H2', pct: '82.5%', color: '#60a5fa' },
                { name: 'Helio', formula: 'He', pct: '15.2%', color: '#facc15' },
                { name: 'Metano', formula: 'CH4', pct: '2.3%', color: '#22d3ee' },
                { name: 'Deuterio de Hidrógeno', formula: 'HD', pct: '0.014%', color: '#94a3b8' }
            ],
            surfaceMeta: [
                { label: 'Presión al Nivel 1 bar', val: '1.0 bar (Nivel de referencia)' },
                { label: 'Temperatura Mínima', val: '-224°C (49 K, récord helado)' },
                { label: 'Velocidad de Escape', val: '21.3 km/s' },
                { label: 'Gravedad al Nivel 1 bar', val: '8.69 m/s² (0.89g)' }
            ],
            geophysics: [
                {
                    title: 'Inclinación Axial Extrema de 98 Grados',
                    desc: 'Gira prácticamente tumbado sobre su plano orbital (97.8°), rodando de lado alrededor del Sol, probablemente debido a una colisión colosal con un protoplaneta primordial.'
                },
                {
                    title: 'Campo Magnético Desplazado y Torcido',
                    desc: 'Su eje magnético no pasa por el centro del planeta (está desplazado un tercio del radio) y está inclinado 59° respecto al eje de rotación, abriéndose y cerrándose cada día.'
                },
                {
                    title: 'Bajo Flujo Térmico Interno',
                    desc: 'A diferencia de Júpiter y Neptuno, Urano casi no emite calor interno propio al espacio, lo que lo convierte en el planeta más frío de los ocho principales.'
                }
            ],
            missions: [
                { name: 'Uranus Orbiter and Probe (Recomendada)', year: '2031+ (NASA Decadal)', agency: 'NASA', desc: 'Prioridad máxima de exploración planetaria para enviar un orbitador y sonda atmosférica profunda.' },
                { name: 'Voyager 2', year: '1986', agency: 'NASA', desc: 'Único sobrevuelo cercano de la historia: descubrió 10 lunas nuevas, 2 anillos y midió su campo magnético ladeado.' }
            ],
            trivia: [
                { title: 'El Planeta Más Helado', text: 'Pese a estar más cerca del Sol que Neptuno, Urano registró el récord de temperatura atmosférica más gélida del Sistema Solar: -224.2°C (49 Kelvin).' },
                { title: 'Estaciones de 42 Años de Noche', text: 'Debido a su inclinación de 98°, cada polo pasa 42 años terrestres consecutivos sumergido en completa luz solar, seguidos de 42 años de noche polar perpetua en sombra.' },
                { title: '13 Anillos Oscuros', text: 'Urano posee un sistema de 13 anillos estrechos descubiertos en 1977 al ocultar una estrella de fondo; son extraordinariamente oscuros, formados por polvo y rocas ricas en carbono.' },
                { title: 'Gravedad Menor que la Tierra', text: 'A pesar de tener 14.5 veces más masa que nuestro planeta, su gigantesco radio hace que su gravedad en el nivel de 1 bar sea de apenas 8.69 m/s² (un 89% de la gravedad terrestre).' },
                { title: 'Lunas Bautizadas con Personajes Literarios', text: 'A diferencia de los demás planetas cuyas lunas reciben nombres de la mitología grecorromana, las 28 lunas de Urano llevan nombres de obras de William Shakespeare y Alexander Pope (Titania, Oberón, Miranda, Puck).' }
            ]
        },

        'Neptuno': {
            name: 'Neptuno',
            type: 'planeta',
            category: 'Gigante de Hielo Dinámico Supersónico',
            themeColor: '#3b82f6',
            layers: [
                {
                    name: 'Atmósfera Profunda & Nubes de Metano',
                    depth: '0 — 3,000 km',
                    temp: '-214°C',
                    pressure: '0.1 a 10 bar',
                    composition: '80% Hidrógeno, 19% Helio, 1.5% Metano, bandas de cirros de hielo de amoníaco y sulfuro',
                    role: 'Vientos ciclónicos supersónicos de hasta 2,160 km/h y tormentas anticiclónicas oscuras',
                    color: '#60a5fa',
                    radiusPct: 1.0
                },
                {
                    name: 'Manto Superiónico & Lluvia de Diamantes',
                    depth: '3,000 — 18,000 km',
                    temp: '2,000°C a 7,000°C',
                    pressure: '100 a 800 GPa',
                    composition: 'Agua, amoníaco y metano supercrítico; a presiones colosales el metano precipita diamantes sólidos',
                    role: 'La precipitación de diamantes cristalinos hacia el fondo libera tremendo calor por fricción',
                    color: '#2563eb',
                    radiusPct: 0.78
                },
                {
                    name: 'Núcleo Rocoso y Metálico Denso',
                    depth: 'Radio de 7,500 km (~1.2 masas terrestres)',
                    temp: '7,000°C',
                    pressure: '1,200 GPa',
                    composition: 'Silicatos, hierro y níquel densamente comprimidos',
                    role: 'Fuente de intenso calor geotérmico interno que motoriza las tormentas más veloces del cosmos',
                    color: '#1d4ed8',
                    radiusPct: 0.35
                }
            ],
            atmosphere: [
                { name: 'Hidrógeno', formula: 'H2', pct: '80.0%', color: '#60a5fa' },
                { name: 'Helio', formula: 'He', pct: '19.0%', color: '#facc15' },
                { name: 'Metano', formula: 'CH4', pct: '1.5%', color: '#3b82f6' },
                { name: 'Deuterio', formula: 'HD', pct: '0.019%', color: '#94a3b8' }
            ],
            surfaceMeta: [
                { label: 'Presión al Nivel 1 bar', val: '1.0 bar (Nubes de referencia)' },
                { label: 'Temperatura Media', val: '-214°C (59 K)' },
                { label: 'Velocidad de Escape', val: '23.5 km/s' },
                { label: 'Gravedad al Nivel 1 bar', val: '11.15 m/s² (1.14g)' }
            ],
            geophysics: [
                {
                    title: 'Vientos Supersónicos Violentos',
                    desc: 'Registra los vientos más feroces de todo el Sistema Solar, superando los 2,160 km/h (Mach 1.7), impulsados por su intenso flujo de calor geotérmico interno.'
                },
                {
                    title: 'Precipitación de Diamantes',
                    desc: 'En su manto, las presiones descomunales de cientos de GPa disocian el carbono del metano, forzándolo a cristalizar en diamantes que caen como granizo hacia el núcleo.'
                },
                {
                    title: 'Fuerte Emisión Térmica Interna',
                    desc: 'Emite 2.61 veces más energía de la que recibe del distante Sol (a 30 AU), manteniendo su atmósfera activa con tormentas dinámicas como la Gran Mancha Oscura.'
                }
            ],
            missions: [
                { name: 'Voyager 2', year: '1989', agency: 'NASA', desc: 'Único sobrevuelo histórico: fotografió la Gran Mancha Oscura, 6 lunas nuevas y los géiseres de Tritón.' },
                { name: 'Telescopio Espacial James Webb (JWST)', year: '2022 — Presente', agency: 'NASA / ESA / CSA', desc: 'Imágenes infrarrojas nítidas de sus bandas de nubes y de su tenue sistema de anillos de polvo.' }
            ],
            trivia: [
                { title: 'Descubierto con Papel y Lápiz', text: 'Neptuno fue el primer planeta predicho mediante cálculos matemáticos de perturbaciones orbitales sobre Urano (por Urbain Le Verrier) antes de ser observado por telescopio en 1846.' },
                { title: 'Lluvia de Diamantes en el Interior', text: 'Experimentos con láseres de rayos X en el acelerador SLAC confirmaron que en las condiciones de presión y temperatura del manto neptuniano se forman diamantes sólidos puros.' },
                { title: 'Vientos a Match 1.7', text: 'Las corrientes en chorro retrógradas del ecuador neptuniano alcanzan 2,160 km/h, superando la velocidad del sonido y convirtiéndolo en el mundo más ventoso del sistema solar.' },
                { title: 'Un Año de 165 Años Terrestres', text: 'Tarda 164.8 años terrestres en completar una sola vuelta al Sol: desde su descubrimiento en 1846, completó su primera órbita completa registrada apenas en el año 2011.' },
                { title: 'Anillos con Arcos Retorcidos', text: 'Sus anillos (Galle, Le Verrier, Lassell, Arago y Adams) exhiben concentraciones grumosas de material llamadas "arcos" que permanecen estables por resonancia con la luna Galatea.' }
            ]
        },

        'Tritón': {
            name: 'Tritón',
            type: 'luna',
            category: 'Luna Criogénica Retrógrada Capturada',
            themeColor: '#7dd3fc',
            layers: [
                {
                    name: 'Corteza de Nitrógeno & Terreno Piel de Melón',
                    depth: '0 — 30 km',
                    temp: '-235°C (38 K, récord superficial)',
                    pressure: 'Atmósfera tenue de N2 (15 µbar)',
                    composition: 'Nitrógeno congelado, metano, monóxido de carbono y hielos de agua',
                    role: 'Superficie de "piel de melón" cantaloupe y criogéiseres activos que eyectan polvo a 8 km de altura',
                    color: '#bae6fd',
                    radiusPct: 1.0
                },
                {
                    name: 'Posible Océano Subsuperficial de Agua-Amoníaco',
                    depth: '30 — 150 km',
                    temp: '-20°C a 0°C',
                    pressure: '0.1 a 0.5 GPa',
                    composition: 'Agua marina templada enriquecida con amoníaco como anticongelante',
                    role: 'Mantenido líquido por el calor de marea originado durante su violenta captura gravitacional',
                    color: '#38bdf8',
                    radiusPct: 0.82
                },
                {
                    name: 'Núcleo Metálico y Rocoso Masivo',
                    depth: 'Radio de 1,000 km (~70% de la masa)',
                    temp: '600°C a 1,000°C',
                    pressure: '1.5 a 3.0 GPa',
                    composition: 'Silicatos densos y corazón metálico de hierro',
                    role: 'Representa dos tercios de la masa total de Tritón, confirmando su origen como objeto del Cinturón de Kuiper',
                    color: '#0369a1',
                    radiusPct: 0.55
                }
            ],
            atmosphere: [
                { name: 'Nitrógeno', formula: 'N2', pct: '99.0%', color: '#60a5fa' },
                { name: 'Metano', formula: 'CH4', pct: '0.9%', color: '#38bdf8' },
                { name: 'Monóxido de Carbono', formula: 'CO', pct: '0.1%', color: '#94a3b8' }
            ],
            surfaceMeta: [
                { label: 'Presión Atmosférica', val: '15 µbar (0.000015 bar)' },
                { label: 'Temperatura Superficial', val: '-235°C (38 K, récord gélido)' },
                { label: 'Velocidad de Escape', val: '1.455 km/s' },
                { label: 'Gravedad Superficial', val: '0.78 m/s² (0.079g)' }
            ],
            geophysics: [
                {
                    title: 'Órbita Retrógrada Capturada',
                    desc: 'Es la única luna grande del Sistema Solar que orbita en dirección opuesta a la rotación de su planeta, prueba inequívoca de que era un planeta enano del Cinturón de Kuiper capturado por Neptuno.'
                },
                {
                    title: 'Criogéiseres de Nitrógeno Líquido',
                    desc: 'La radiación solar atraviesa la corteza transparente de nitrógeno, calentando el subsuelo hasta presurizarlo y reventar en columnas de gas y polvo oscuro de 8 km de altura.'
                },
                {
                    title: 'Destino Fatal: Límite de Roche',
                    desc: 'La fricción de marea frena gradualmente a Tritón: en aproximadamente 3,600 millones de años cruzará el límite de Roche de Neptuno y se desintegrará formando un sistema de anillos mayor que el de Saturno.'
                }
            ],
            missions: [
                { name: 'Trident (Propuesta Discovery)', year: 'Concepto evaluado', agency: 'NASA', desc: 'Propuesta de sobrevuelo para cartografiar sus géiseres activos y comprobar su océano subglacial.' },
                { name: 'Voyager 2', year: '1989', agency: 'NASA', desc: 'Fotografió activas las plumas oscuras de sus géiseres sobre el brillante casquete polar sur a -235°C.' }
            ],
            trivia: [
                { title: 'Una de las Superficies Más Frías', text: 'Con una temperatura de -235°C (apenas 38 Kelvin sobre el cero absoluto), es el lugar medido in situ más gélido de todo el Sistema Solar.' },
                { title: 'Hermano Gemelo de Plutón', text: 'Su diámetro (2,706 km), densidad (2.06 g/cm³) y composición química de nitrógeno y metano son prácticamente idénticos a los de Plutón, demostrando un origen común en el Cinturón de Kuiper.' },
                { title: 'Terreno Único Piel de Melón', text: 'Grandes depresiones circulares de 30 km bordeando fallas reciben el nombre de "terreno cantaloupe", formado por diapirismo criogénico en el que hielos más ligeros ascienden desde abajo.' },
                { title: 'Caerá Hacia Neptuno', text: 'Al moverse en sentido contrario a la rotación de Neptuno, las fuerzas de marea no la alejan (como a la Luna en la Tierra), sino que la frenan, acercándola inexorablemente hacia su destrucción.' },
                { title: 'Cráteres Casi Inexistentes', text: 'Posee muy pocos cráteres de impacto porque los criovolcanes y las nieves de nitrógeno cubren y renuevan constantemente su superficie helada en escalas geológicas recientes.' }
            ]
        },

        'Plutón': {
            name: 'Plutón',
            type: 'planeta',
            category: 'Planeta Enano del Cinturón de Kuiper',
            themeColor: '#c084fc',
            layers: [
                {
                    name: 'Corteza de Nitrógeno & Sputnik Planitia',
                    depth: '0 — 100 km',
                    temp: '-230°C (43 K)',
                    pressure: '10 a 20 µbar',
                    composition: 'Glaciares de nitrógeno (N2), metano (CH4) y monóxido de carbono (CO) sólido',
                    role: 'Celdas poligonales de convección térmica activa en Sputnik Planitia que renuevan el hielo cada 500,000 años',
                    color: '#e9d5ff',
                    radiusPct: 1.0
                },
                {
                    name: 'Manto de Hielo de Agua & Océano Viscoso',
                    depth: '100 — 300 km',
                    temp: '-180°C a -10°C',
                    pressure: '0.1 a 0.5 GPa',
                    composition: 'Hielo de agua H2O puro resistente como el granito, con probable océano residual de salmuera',
                    role: 'Soporta cordilleras montañosas de hielo de 3.5 km de altura como los montes Hillary y Norgay',
                    color: '#c084fc',
                    radiusPct: 0.80
                },
                {
                    name: 'Núcleo Rocoso Denso de Silicatos',
                    depth: 'Radio de 850 km (~66% de la masa total)',
                    temp: '500°C a 800°C',
                    pressure: '1.0 a 2.0 GPa',
                    composition: 'Silicatos hidratados densos con decaimiento radiactivo de uranio y torio',
                    role: 'Proporciona calor geotérmico continuo suficiente para mantener activo el corazón de nitrógeno',
                    color: '#7e22ce',
                    radiusPct: 0.52
                }
            ],
            atmosphere: [
                { name: 'Nitrógeno', formula: 'N2', pct: '99.0%', color: '#60a5fa' },
                { name: 'Metano', formula: 'CH4', pct: '0.5%', color: '#c084fc' },
                { name: 'Monóxido de Carbono', formula: 'CO', pct: '0.5%', color: '#94a3b8' }
            ],
            surfaceMeta: [
                { label: 'Presión Superficial', val: '10 a 20 µbar (Tenue y variable)' },
                { label: 'Temperatura Media', val: '-230°C (43 K)' },
                { label: 'Velocidad de Escape', val: '1.21 km/s' },
                { label: 'Gravedad Superficial', val: '0.62 m/s² (0.063g)' }
            ],
            geophysics: [
                {
                    title: 'Glaciar Sputnik Planitia en el Corazón',
                    desc: 'Una cuenca de impacto de 1,000 km rellena de nitrógeno sólido donde el hielo fluye plásticamente en celdas convectivas de 30 km alimentadas por calor interno.'
                },
                {
                    title: 'Sistema Binario con Caronte',
                    desc: 'Plutón y Caronte orbitan alrededor de un baricentro común situado a 960 km por encima de la superficie de Plutón: es el único planeta binario genuino del sistema solar.'
                },
                {
                    title: 'Criovulcanismo Gigante',
                    desc: 'Montes como Wright Mons y Piccard Mons se elevan 4 y 7 km sobre el terreno, formados por erupciones pasadas de lodos de hielo de agua y amoníaco viscoso.'
                }
            ],
            missions: [
                { name: 'New Horizons', year: '2015', agency: 'NASA', desc: 'Histórico sobrevuelo a 12,500 km que reveló glaciares activos, montañas de hielo y neblinas azuladas.' }
            ],
            trivia: [
                { title: 'El Corazón Geológico de Nitrógeno', text: 'Tombaugh Regio es la célebre llanura blanca con forma de corazón: su mitad occidental (Sputnik Planitia) es un inmenso glaciar activo de nitrógeno de 1,000 km de extensión.' },
                { title: 'Montañas de Hielo Tan Duras como Granito', text: 'A -230°C, el hielo de agua es tan duro y resistente que forma cordilleras que superan los 3,500 metros de altura (Montes Hillary y Montes Norgay) sin colapsar.' },
                { title: 'Cielo Azul en los Confines del Sistema', text: 'La sonda New Horizons fotografió la atmósfera a contraluz y descubrió múltiples capas de neblina azulada, originadas por la dispersión de luz sobre partículas de tolinas.' },
                { title: 'La Órbita que Cruza a Neptuno', text: 'La órbita de Plutón es tan inclinada (17°) y alargada que durante 20 años de cada 248 años terrestres se encuentra más cerca del Sol que el propio planeta Neptuno (la última vez entre 1979 y 1999).' },
                { title: 'Pesas Apenas 4.4 kg', text: 'Una persona con una masa de 70 kg en la Tierra pesaría en la superficie de Plutón tan solo 4.4 kilogramos debido a su diminuta gravedad (0.063g).' }
            ]
        },

        'Caronte': {
            name: 'Caronte',
            type: 'luna',
            category: 'Satélite Binario Bloqueado Marealmente',
            themeColor: '#a8a29e',
            layers: [
                {
                    name: 'Superficie de Hielo de Agua & Mordor Macula',
                    depth: '0 — 50 km',
                    temp: '-220°C media',
                    pressure: 'Vacío (< 10⁻¹³ bar)',
                    composition: 'Hielo de agua H2O cristalino, hidratos de amoníaco y tolinas orgánicas capturadas de Plutón',
                    role: 'Corteza salpicada de fallas tectónicas descomunales y una mancha polar rojiza llamada Mordor Macula',
                    color: '#e7e5e4',
                    radiusPct: 1.0
                },
                {
                    name: 'Manto Helado Lítico Rígido',
                    depth: '50 — 300 km',
                    temp: '-200°C a -100°C',
                    pressure: '0.05 a 0.2 GPa',
                    composition: 'Hielo de agua masivo que se expandió al congelarse su antiguo océano interior',
                    role: 'La congelación de su océano primordial expandió el volumen interno agrietando la corteza globalmente',
                    color: '#a8a29e',
                    radiusPct: 0.75
                },
                {
                    name: 'Núcleo Rocoso de Silicatos',
                    depth: 'Radio de 350 km (~55% de la masa total)',
                    temp: '200°C a 400°C',
                    pressure: '0.2 a 0.4 GPa',
                    composition: 'Rocas silicatadas compactadas de moderada densidad',
                    role: 'Núcleo rocoso deshidratado que representa más de la mitad de la masa del satélite',
                    color: '#78716c',
                    radiusPct: 0.42
                }
            ],
            atmosphere: [
                { name: 'Vacío Interplanetario', formula: 'Sin atmósfera', pct: '100%', color: '#94a3b8' }
            ],
            surfaceMeta: [
                { label: 'Presión Atmosférica', val: '< 10⁻¹³ bar (Sin atmósfera medible)' },
                { label: 'Temperatura Media', val: '-220°C (53 K)' },
                { label: 'Velocidad de Escape', val: '0.59 km/s' },
                { label: 'Gravedad Superficial', val: '0.288 m/s² (0.029g)' }
            ],
            geophysics: [
                {
                    title: 'Doble Bloqueo Mareal Mutuo',
                    desc: 'Plutón y Caronte están mutuamente anclados por marea en sincronía perfecta (6.38 días): ambos astros se muestran perpetuamente la misma cara el uno al otro.'
                },
                {
                    title: 'Mordor Macula y Transferencia Atmosférica',
                    desc: 'El polo norte exhibe una mancha marrón-rojiza provocada por moléculas de gas metano que escaparon de la atmósfera de Plutón, fueron capturadas por Caronte y se congelaron durante el invierno polar.'
                },
                {
                    title: 'Cañones Tectónicos Kilométricos',
                    desc: 'El cañón Argo Chasma alcanza 9 km de profundidad y más de 1,000 km de longitud, superando holgadamente la profundidad del Gran Cañón del Colorado en la Tierra.'
                }
            ],
            missions: [
                { name: 'New Horizons', year: '2015', agency: 'NASA', desc: 'Sobrevuelo histórico que fotografió de cerca el cañón Argo Chasma, llanuras de hielo y el polo oscuro Mordor Macula.' }
            ],
            trivia: [
                { title: 'La Mitad del Tamaño de su Planeta', text: 'Con 1,212 km de diámetro, Caronte mide más de la mitad del tamaño de Plutón (2,376 km): la mayor proporción satélite/planeta del Sistema Solar.' },
                { title: 'Nunca se Oculta ni se Mueve en el Cielo', text: 'Debido al doble bloqueo mareal, si estuvieras en el hemisferio de Plutón que mira a Caronte, este permanecería inmóvil en el mismo punto exacto del cielo día y noche.' },
                { title: 'Un Cañón el Doble de Hondo que el Gran Cañón', text: 'Argo Chasma tiene profundidades que superan los 9,000 metros (9 km), convirtiéndolo en una de las gargantas tectónicas más imponentes y profundas del cosmos.' },
                { title: 'Color Rojo Producido por Radiación Solar', text: 'La mancha de Mordor Macula adquiere su tono rojizo cuando la luz ultravioleta y el viento solar procesan fotoquímicamente el metano helado atrapado convirtiéndolo en tolinas complejas.' },
                { title: 'Descubierto en 1978', text: 'Fue descubierto por el astrónomo James Christy en el Observatorio Naval de EE. UU. al notar una protuberancia periódica y alargada en las fotografías borrosas de Plutón.' }
            ]
        }
    };

    // Alias sin tildes para máxima compatibilidad con llamadas externas
    celestialScienceData['Ganimedes'] = celestialScienceData['Ganímedes'];
    celestialScienceData['Io'] = celestialScienceData['Ío'];
    celestialScienceData['Titan'] = celestialScienceData['Titán'];
    celestialScienceData['Pluton'] = celestialScienceData['Plutón'];

    // ORDEN ASTRONÓMICO OFICIAL DE LOS 19 CUERPOS
    const ALL_BODIES_ORDER = [
        'Sol',
        'Mercurio',
        'Venus',
        'Tierra',
        'Luna',
        'Marte',
        'Júpiter',
        'Ío',
        'Europa',
        'Ganímedes',
        'Calisto',
        'Saturno',
        'Titán',
        'Encélado',
        'Urano',
        'Neptuno',
        'Tritón',
        'Plutón',
        'Caronte'
    ];

    // --- VARIABLES DE ESTADO ---
    let currentBodyKey = 'Tierra';
    let currentLayerIndex = 0;
    let currentCategoryFilter = 'all';
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
                const ringEl = svg.querySelector('.inv-selected-layer-ring');
                if (ringEl) ringEl.setAttribute('r', r);
            });

            path.addEventListener('mouseleave', () => {
                const currentLayer = layers[currentLayerIndex] || layer;
                updateLayerCardUI(currentLayer);
                const ringEl = svg.querySelector('.inv-selected-layer-ring');
                if (ringEl) ringEl.setAttribute('r', maxR * currentLayer.radiusPct);
            });

            svg.appendChild(path);

            // Contorno punteado (- - - - -) que rodea y señala la capa seleccionada
            if (isSelected) {
                const ringArc = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                ringArc.setAttribute('cx', cx);
                ringArc.setAttribute('cy', cy);
                ringArc.setAttribute('r', r);
                ringArc.setAttribute('fill', 'none');
                ringArc.setAttribute('stroke', '#ffffff');
                ringArc.setAttribute('stroke-width', '1.5');
                ringArc.setAttribute('stroke-dasharray', '4 4');
                ringArc.setAttribute('opacity', '0.85');
                ringArc.setAttribute('class', 'inv-selected-layer-ring');
                ringArc.setAttribute('pointer-events', 'none');
                svg.appendChild(ringArc);
            }
        });

        // 3. Pin central del núcleo
        const centerPin = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        centerPin.setAttribute('cx', cx);
        centerPin.setAttribute('cy', cy);
        centerPin.setAttribute('r', 4);
        centerPin.setAttribute('fill', '#ffffff');
        centerPin.setAttribute('pointer-events', 'none');
        svg.appendChild(centerPin);

        // 4. Líneas de corte de la cuña (ejes a 45 grados)
        const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line1.setAttribute('x1', cx);
        line1.setAttribute('y1', cy);
        line1.setAttribute('x2', cx + maxR * Math.cos(-Math.PI / 4));
        line1.setAttribute('y2', cy + maxR * Math.sin(-Math.PI / 4));
        line1.setAttribute('stroke', 'rgba(255, 255, 255, 0.4)');
        line1.setAttribute('stroke-width', '1');
        line1.setAttribute('stroke-dasharray', '2 2');
        svg.appendChild(line1);

        const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line2.setAttribute('x1', cx);
        line2.setAttribute('y1', cy);
        line2.setAttribute('x2', cx + maxR * Math.cos(Math.PI / 4));
        line2.setAttribute('y2', cy + maxR * Math.sin(Math.PI / 4));
        line2.setAttribute('stroke', 'rgba(255, 255, 255, 0.4)');
        line2.setAttribute('stroke-width', '1');
        line2.setAttribute('stroke-dasharray', '2 2');
        svg.appendChild(line2);

        // 5. Anillo perimetral orbital
        const ring = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        ring.setAttribute('cx', cx);
        ring.setAttribute('cy', cy);
        ring.setAttribute('r', maxR + 12);
        ring.setAttribute('fill', 'none');
        ring.setAttribute('stroke', 'rgba(255, 255, 255, 0.08)');
        ring.setAttribute('stroke-width', '1');
        ring.setAttribute('stroke-dasharray', '4 4');
        svg.appendChild(ring);
    }

    // --- RULER DE CAPAS (SEGMENTED BAR) ---
    function renderLayerRuler(bodyData) {
        const ruler = document.getElementById('inv-layer-ruler');
        if (!ruler) return;

        ruler.innerHTML = '';
        const layers = bodyData.layers || [];
        const maxR = 200;

        layers.forEach((layer, idx) => {
            const btn = document.createElement('button');
            btn.className = 'inv-ruler-btn inv-ruler-item ' + (idx === currentLayerIndex ? 'is-active' : '');
            btn.innerHTML = '<span class="inv-ruler-dot" style="background:' + layer.color + '"></span><span class="inv-ruler-name">' + layer.name.split('(')[0].trim() + '</span>';

            btn.addEventListener('click', () => {
                selectLayer(idx);
            });

            btn.addEventListener('mouseenter', () => {
                updateLayerCardUI(layer);
                const ringEl = document.querySelector('.inv-selected-layer-ring');
                if (ringEl) ringEl.setAttribute('r', maxR * layer.radiusPct);
            });

            btn.addEventListener('mouseleave', () => {
                const currentLayer = layers[currentLayerIndex] || layer;
                updateLayerCardUI(currentLayer);
                const ringEl = document.querySelector('.inv-selected-layer-ring');
                if (ringEl) ringEl.setAttribute('r', maxR * currentLayer.radiusPct);
            });

            ruler.appendChild(btn);
        });
    }

    // --- SELECCIONAR CAPA ---
    function selectLayer(index) {
        currentLayerIndex = index;
        const bodyData = celestialScienceData[currentBodyKey] || celestialScienceData['Tierra'];
        const layer = bodyData.layers[index];
        if (!layer) return;

        updateLayerCardUI(layer);

        // Actualizar Ruler y asegurar visibilidad
        const rulerBtns = document.querySelectorAll('.inv-ruler-btn');
        rulerBtns.forEach((b, idx) => {
            const isActive = (idx === index);
            b.classList.toggle('is-active', isActive);
            if (isActive) {
                b.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        });

        // Actualizar SVG
        const paths = document.querySelectorAll('.inv-svg-layer');
        paths.forEach(p => p.classList.remove('is-selected'));
        renderCrossSectionDiagram(bodyData);
    }

    // --- ACTUALIZAR FICHA DE CAPA ---
    function updateLayerCardUI(layer) {
        if (!layer) return;

        const nameEl = document.getElementById('inv-layer-name');
        const depthEl = document.getElementById('inv-layer-depth');
        const tempEl = document.getElementById('inv-layer-temp');
        const pressEl = document.getElementById('inv-layer-pressure');
        const compEl = document.getElementById('inv-layer-composition');
        const roleEl = document.getElementById('inv-layer-role');
        const dotEl = document.getElementById('inv-layer-dot');

        if (nameEl) nameEl.textContent = layer.name;
        if (depthEl) depthEl.textContent = layer.depth;
        if (tempEl) tempEl.textContent = layer.temp;
        if (pressEl) pressEl.textContent = layer.pressure;
        if (compEl) compEl.textContent = layer.composition;
        if (roleEl) roleEl.textContent = layer.role;
        if (dotEl) dotEl.style.background = layer.color || '#38bdf8';
    }

    // --- POBLAR PESTAÑAS CIENTÍFICAS ---
    function populateScientificPanes(bodyData) {
        if (!bodyData) return;

        // Título y categoría de cabecera
        const titleEl = document.getElementById('inv-body-title');
        const catEl = document.getElementById('inv-body-category');
        if (titleEl) titleEl.textContent = bodyData.name;
        if (catEl) catEl.textContent = bodyData.category;

        // 1. Espectroscopía / Química
        const chemContainer = document.getElementById('inv-chem-bars');
        if (chemContainer) {
            chemContainer.innerHTML = '';
            (bodyData.atmosphere || []).forEach(gas => {
                const item = document.createElement('div');
                item.className = 'inv-chem-item inv-chem-row';
                const rawPct = parseFloat(String(gas.pct).replace(/[^0-9.]/g, '')) || 0;
                const fillWidth = rawPct > 0 ? Math.min(100, Math.max(2.5, rawPct)) : 0;
                item.innerHTML = `
                    <div class="inv-chem-head inv-chem-header">
                        <span class="inv-chem-name">${gas.name} <span class="inv-chem-formula">(${gas.formula})</span></span>
                        <span class="inv-chem-pct">${gas.pct}</span>
                    </div>
                    <div class="inv-chem-track">
                        <div class="inv-chem-fill inv-chem-bar" style="width: ${fillWidth}%; background: ${gas.color || '#38bdf8'}; color: ${gas.color || '#38bdf8'};"></div>
                    </div>
                `;
                chemContainer.appendChild(item);
            });
        }

        // Metadatos Superficiales
        const metaContainer = document.getElementById('inv-surface-meta');
        if (metaContainer) {
            metaContainer.innerHTML = '';
            (bodyData.surfaceMeta || []).forEach(m => {
                const cell = document.createElement('div');
                cell.className = 'inv-meta-cell';
                cell.innerHTML = '<span class="inv-meta-cell-label">' + m.label + '</span><span class="inv-meta-cell-val">' + m.val + '</span>';
                metaContainer.appendChild(cell);
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

        // 4. Curiosidades Científicas Ampliadas (con números y diseño enriquecido)
        const trivContainer = document.getElementById('inv-trivia-grid');
        if (trivContainer) {
            trivContainer.innerHTML = '';
            (bodyData.trivia || []).forEach((t, idx) => {
                const item = document.createElement('div');
                item.className = 'inv-trivia-item';
                const tagNum = (idx + 1 < 10 ? '0' : '') + (idx + 1);
                item.innerHTML = `
                    <div class="inv-trivia-header">
                        <span class="inv-trivia-title"><i class="fa-solid fa-atom"></i> ${t.title}</span>
                        <span class="inv-trivia-tag">#${tagNum}</span>
                    </div>
                    <p class="inv-trivia-desc">${t.text}</p>
                `;
                trivContainer.appendChild(item);
            });
        }
    }

    // --- SELECTOR DE ASTROS (CON FILTRADO POR CATEGORÍAS) ---
    function renderNavBar(activeKey) {
        const navBar = document.getElementById('inv-nav-bar');
        if (!navBar) return;

        navBar.innerHTML = '';

        // Filtrar astros según la categoría activa
        const filteredKeys = ALL_BODIES_ORDER.filter(key => {
            if (currentCategoryFilter === 'all') return true;
            const data = celestialScienceData[key];
            if (!data) return false;
            return data.type === currentCategoryFilter;
        });

        filteredKeys.forEach(key => {
            const data = celestialScienceData[key];
            if (!data) return;

            const btn = document.createElement('button');
            const isActive = (key === activeKey);
            btn.className = 'inv-pill-btn ' + (isActive ? 'is-active' : '');
            btn.innerHTML = `
                <span class="inv-pill-dot" style="background: ${data.themeColor || '#94a3b8'};"></span>
                <div class="inv-pill-col">
                    <span class="inv-pill-name">${key}</span>
                    <span class="inv-pill-sub">${data.type}</span>
                </div>
            `;

            btn.addEventListener('click', () => {
                switchBody(key);
            });

            navBar.appendChild(btn);

            if (isActive) {
                requestAnimationFrame(() => {
                    btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                });
            }
        });
    }

    // --- SETUP DE FILTROS DE CATEGORÍA Y FLECHAS DE SCROLL ---
    function setupCategoryFilters() {
        const chips = document.querySelectorAll('.inv-cat-chip');
        chips.forEach(chip => {
            chip.addEventListener('click', () => {
                chips.forEach(c => {
                    c.classList.remove('is-active');
                    c.setAttribute('aria-selected', 'false');
                });
                chip.classList.add('is-active');
                chip.setAttribute('aria-selected', 'true');
                currentCategoryFilter = chip.dataset.category || 'all';

                // Si el astro actual no pertenece a la categoría, seleccionar el primero de la categoría
                const currentData = celestialScienceData[currentBodyKey];
                if (currentCategoryFilter !== 'all' && currentData && currentData.type !== currentCategoryFilter) {
                    const firstMatch = ALL_BODIES_ORDER.find(k => {
                        const d = celestialScienceData[k];
                        return d && d.type === currentCategoryFilter;
                    });
                    if (firstMatch) {
                        switchBody(firstMatch);
                        return;
                    }
                }
                renderNavBar(currentBodyKey);
            });
        });

        // Flechas de navegación en el selector
        const btnPrev = document.getElementById('btn-inv-prev');
        const btnNext = document.getElementById('btn-inv-next');
        const navBar = document.getElementById('inv-nav-bar');

        if (btnPrev && navBar) {
            btnPrev.addEventListener('click', () => {
                navBar.scrollBy({ left: -260, behavior: 'smooth' });
            });
        }
        if (btnNext && navBar) {
            btnNext.addEventListener('click', () => {
                navBar.scrollBy({ left: 260, behavior: 'smooth' });
            });
        }
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
        }

        btnDiagram.addEventListener('click', () => setMobileView('diagram'));
        btnData.addEventListener('click', () => setMobileView('data'));
    }

    // --- ABRIR / CERRAR MODAL ---
    function openModal(bodyKey) {
        const root = document.getElementById('investigation-root');
        if (!root) return;

        root.classList.remove('hidden');
        root.setAttribute('aria-hidden', 'false');
        isModalOpen = true;

        const targetKey = bodyKey && celestialScienceData[bodyKey] ? celestialScienceData[bodyKey].name : 'Tierra';

        // Sincronizar filtro de categoría con el astro inicial si es necesario
        const targetData = celestialScienceData[targetKey];
        if (targetData && currentCategoryFilter !== 'all' && targetData.type !== currentCategoryFilter) {
            currentCategoryFilter = 'all';
            const chips = document.querySelectorAll('.inv-cat-chip');
            chips.forEach(c => {
                c.classList.toggle('is-active', c.dataset.category === 'all');
                c.setAttribute('aria-selected', c.dataset.category === 'all' ? 'true' : 'false');
            });
        }

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
        setupCategoryFilters();
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

        // Soporte de desplazamiento horizontal con rueda del ratón (Wheel)
        const ruler = document.getElementById('inv-layer-ruler');
        if (ruler) {
            ruler.addEventListener('wheel', (e) => {
                if (e.deltaY !== 0) {
                    e.preventDefault();
                    ruler.scrollLeft += e.deltaY * 1.2;
                }
            }, { passive: false });
        }

        const navBar = document.getElementById('inv-nav-bar');
        if (navBar) {
            navBar.addEventListener('wheel', (e) => {
                if (e.deltaY !== 0) {
                    e.preventDefault();
                    navBar.scrollLeft += e.deltaY * 1.2;
                }
            }, { passive: false });
        }
    }

    // Exponer API global
    window.EstelarisInvestigation = {
        open: openModal,
        close: closeModal,
        switchBody: switchBody,
        isOpen: () => isModalOpen,
        init: init,
        data: celestialScienceData
    };

})();
