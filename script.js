// ===============================================================
// SISTEMA SOLAR - VERSIÓN COMPLETA CON INFORMACIÓN PROFESIONAL
// ===============================================================

// --- ESCENA, CÁMARA Y RENDERER ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  10000000
);
camera.position.set(-300, 1000, 2500);

const renderer = new THREE.WebGLRenderer({
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

// --- FONDO CON TEXTURA DE ESTRELLAS ---
const textureLoader = new THREE.TextureLoader();
const backgroundTexture = textureLoader.load("assets/stars_background.jpg");
scene.background = backgroundTexture;

// --- CSS2D RENDERER CONFIGURACIÓN MEJORADA ---
const labelRenderer = new THREE.CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = "fixed";
labelRenderer.domElement.style.top = "0px";
labelRenderer.domElement.style.left = "0px";
labelRenderer.domElement.style.pointerEvents = "none";
labelRenderer.domElement.style.zIndex = "40";
labelRenderer.domElement.style.width = "100%";
labelRenderer.domElement.style.height = "100%";
labelRenderer.domElement.style.overflow = "visible";
document.body.appendChild(labelRenderer.domElement);

// --- LUCES AJUSTADAS ---
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const sunLight = new THREE.PointLight(0xffdd44, 1.5, 100000);
sunLight.position.set(0, 0, 0);
sunLight.decay = 1;
scene.add(sunLight);

const sunLight2 = new THREE.PointLight(0xffcc00, 1.0, 80000);
sunLight2.position.set(0, 0, 0);
scene.add(sunLight2);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
directionalLight.position.set(100, 100, 100);
scene.add(directionalLight);

// --- SOL CON ETIQUETA ---
let sunMesh;

function createSun() {
  const sunRadius = 50;
  const sunTexture = textureLoader.load("assets/sun_texture.jpg");
  
  const sunGeometry = new THREE.SphereGeometry(sunRadius, 64, 64);
  const sunMaterial = new THREE.MeshBasicMaterial({
    map: sunTexture,
    emissive: 0xffdd00,
    emissiveIntensity: 1.5
  });

  sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
  scene.add(sunMesh);

  // HALO AMARILLO REDUCIDO
  const haloTexture = textureLoader.load("assets/sun.png");
  
  createHaloLayer(sunMesh, haloTexture, sunRadius * 1.6, 1.0, 0xffff00);
  createHaloLayer(sunMesh, haloTexture, sunRadius * 2.3, 0.8, 0xffee00);
  createHaloLayer(sunMesh, haloTexture, sunRadius * 2.8, 0.6, 0xffdd00);
  createHaloLayer(sunMesh, haloTexture, sunRadius * 3.1, 0.4, 0xffcc00);

  // ETIQUETA DEL SOL - USAR FUNCIÓN MEJORADA (sin el parámetro extra)
  createSunLabel(sunMesh, sunRadius);

  return sunMesh;
}

function createSunLabel(sunMesh, radius) {
  const div = document.createElement("div");
  div.className = "planet-label sun-label floating";
  div.textContent = "Sol";
  div.style.pointerEvents = "auto";
  
  const label = new THREE.CSS2DObject(div);
  label.position.set(0, radius + 35, 0); // Aumentado para mejor visibilidad
  sunMesh.add(label);
  
  div.addEventListener('click', (event) => {
    event.stopPropagation();
    openMainPanel(sunData);
  });
}

function createHaloLayer(sunMesh, texture, size, opacity, color) {
  const haloMaterial = new THREE.SpriteMaterial({
    map: texture,
    color: color,
    transparent: true,
    opacity: opacity,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const haloSprite = new THREE.Sprite(haloMaterial);
  haloSprite.scale.set(size, size, 1);
  haloSprite.position.copy(sunMesh.position);
  scene.add(haloSprite);
  
  return haloSprite;
}

// --- DATOS COMPLETOS DE SOLAR SYSTEM SCOPE ---
const sunData = {
  name: "Sol",
  texturePanel: "sun.png",
  structureImage: "structure_sun.png",
  encyclopedia: `ESTRELLA TIPO G2V - NUESTRA ESTRELLA MADRE

El Sol es una esfera casi perfecta de plasma caliente, clasificada como una estrella enana amarilla de tipo espectral G2V. Con un diámetro de aproximadamente 1.4 millones de kilómetros, contiene el 99.86% de toda la masa del Sistema Solar.

CARACTERÍSTICAS PRINCIPALES:
• Masa: 1.989 × 10³⁰ kg (333,000 Tierras)
• Diámetro: 1,392,684 km
• Temperatura superficial: 5,500°C
• Temperatura del núcleo: 15,000,000°C
• Edad: 4.6 mil millones de años
• Composición: 74% Hidrógeno, 24% Helio, 2% elementos pesados

FUSIÓN NUCLEAR:
En el núcleo solar, cada segundo 600 millones de toneladas de hidrógeno se fusionan para formar helio, liberando una energía equivalente a 100 mil millones de megatones de TNT. Esta energía tarda entre 10,000 y 170,000 años en llegar desde el núcleo hasta la superficie.

ACTIVIDAD SOLAR:
El Sol experimenta un ciclo de actividad de 11 años, caracterizado por variaciones en el número de manchas solares. Durante el máximo solar, aumentan las erupciones solares y las eyecciones de masa coronal, que pueden afectar las comunicaciones y redes eléctricas en la Tierra.`,
  structure: `ESTRUCTURA INTERNA DEL SOL

El Sol posee una estructura compleja dividida en varias capas concéntricas:

NÚCLEO (0-0.25 radios solares):
• Temperatura: 15 millones de °C
• Presión: 265 mil millones de bares
• Densidad: 150 g/cm³ (8x la densidad del oro)
• Aquí ocurre la fusión nuclear mediante la cadena protón-protón

ZONA RADIATIVA (0.25-0.7 radios solares):
• La energía viaja como radiación electromagnética
• Los fotones pueden tardar 170,000 años en atravesarla
• Temperatura desciende de 7 a 2 millones de °C

ZONA CONVECTIVA (0.7-1 radios solares):
• Transporte de energía por convección térmica
• Células de plasma caliente ascienden y descienden
• Forma la granulación visible en la superficie

FOTOSFERA (Superficie visible):
• Grosor: ~500 km
• Temperatura: 5,500°C
• Donde se forman las manchas solares (4,000°C)

CROMOSFERA (2,000-10,000 km sobre fotosfera):
• Temperatura: 4,500°C a 100,000°C
• Visible durante eclipses solares totales

CORONA (Extensión variable):
• Temperatura: 1-3 millones de °C
• Se extiende millones de kilómetros en el espacio
• Origen del viento solar`
};

const planets = [
  { 
    name: "Mercurio", 
    radius: 1.6,
    dist: 100,
    texture3D: "mercury_texture.jpg",
    texturePanel: "mercury.png",
    structureImage: "structure_mercury.png",
    rotationSpeed: 0.002,
    moons: [],
    encyclopedia: `PLANETA ROCOSO - EL MÁS CERCANO AL SOL

Mercurio es el planeta más pequeño y cercano al Sol en nuestro Sistema Solar. Completa una órbita cada 88 días terrestres y presenta la excentricidad orbital más alta de todos los planetas.

CARACTERÍSTICAS ORBITALES:
• Distancia media al Sol: 57.9 millones de km
• Período orbital: 88 días terrestres
• Período de rotación: 59 días terrestres
• Excentricidad orbital: 0.2056
• Inclinación axial: 0.034°

DATOS FÍSICOS:
• Diámetro: 4,879 km
• Masa: 3.301 × 10²³ kg (0.055 Tierras)
• Gravedad superficial: 3.7 m/s² (0.38 g)
• Temperatura superficial: -173°C a 427°C
• Presión atmosférica: ~10⁻¹⁵ bar

SUPERFICIE Y GEOLOGÍA:
La superficie mercuriana está dominada por cráteres de impacto, planicies suaves y escarpes lobulados. La Cuenca Caloris, de 1,550 km de diámetro, es una de las estructuras de impacto más grandes del Sistema Solar. La ausencia de atmósfera significativa permite que los meteoritos impacten directamente sin desintegrarse.`,
    structure: `ESTRUCTURA INTERNA DE MERCURIO

NÚCLEO METÁLICO:
• Radio: ~2,000 km (85% del radio planetario)
• Composición: Hierro-níquel con azufre
• Estado: Parcialmente fundido
• Genera un campo magnético débil (~1% del terrestre)

MANTO SILICATADO:
• Grosor: ~400 km
• Composición: Silicatos de magnesio
• Menos denso que el manto terrestre

CORTEZA:
• Grosor: 100-300 km
• Composición: Materiales silicatados
• Rica en compuestos volátiles

CARACTERÍSTICAS ÚNICAS:
Mercurio tiene un núcleo desproporcionadamente grande, sugiriendo que perdió parte de su manto en una colisión gigante temprana. Su contracción térmica ha creado escarpes lobulados de hasta 1,000 km de longitud.`
  },
  { 
    name: "Venus", 
    radius: 4.0,
    dist: 180,
    texture3D: "venus_texture.jpg", 
    texturePanel: "venus.png", 
    structureImage: "structure_venus.png",
    rotationSpeed: 0.001,
    moons: [],
    encyclopedia: `PLANETA GEMELO - EL MÁS CALUROSO

Venus, conocido como el "planeta gemelo" de la Tierra por su tamaño y masa similares, es el objeto más brillante en el cielo nocturno después de la Luna. Posee una atmósfera densa que crea un efecto invernadero extremo.

CARACTERÍSTICAS ORBITALES:
• Distancia media al Sol: 108.2 millones de km
• Período orbital: 225 días terrestres
• Período de rotación: 243 días terrestres (rotación retrógrada)
• Excentricidad orbital: 0.0067
• Inclinación axial: 177.3°

DATOS FÍSICOS:
• Diámetro: 12,104 km
• Masa: 4.867 × 10²⁴ kg (0.815 Tierras)
• Gravedad superficial: 8.87 m/s² (0.91 g)
• Temperatura superficial: 462°C (constante)
• Presión atmosférica: 92 bar (92x la Tierra)

ATMOSFERA Y CLIMA:
La atmósfera venusiana está compuesta en un 96.5% de CO₂ y 3.5% de N₂, con nubes de ácido sulfúrico. Los vientos en la cima de las nubes alcanzan 360 km/h, pero en superficie son muy lentos. El efecto invernadero mantiene temperaturas uniformes en todo el planeta.`,
    structure: `ESTRUCTURA INTERNA DE VENUS

NÚCLEO:
• Composición: Hierro-níquel
• Estado: Probablemente parcialmente líquido
• No genera campo magnético significativo

MANTO:
• Grosor: ~3,000 km
• Composición: Silicatos de magnesio y hierro
• Convección lenta debido a la alta temperatura

CORTEZA:
• Grosor: 20-50 km (más delgada que la terrestre)
• Composición: Basalto volcánico
• Sin placas tectónicas activas

ACTIVIDAD GEOLÓGICA:
Venus muestra evidencia de vulcanismo reciente con más de 1,600 volcanes principales. Su superficie es geológicamente joven (~500 millones de años), sugiriendo un evento de renovación global. La falta de campo magnético se atribuye a su lenta rotación.`
  },
  { 
    name: "Tierra", 
    radius: 4.2,
    dist: 250,
    texture3D: "earth_texture.jpg", 
    texturePanel: "earth.png", 
    structureImage: "structure_earth.png",
    rotationSpeed: 0.005,
    moons: [
      { name: "Luna", radius: 1.1, dist: 8, color: 0x888888, orbitalSpeed: 0.000183 }
    ],
    encyclopedia: `PLANETA AZUL - HOGAR DE LA VIDA

La Tierra es el tercer planeta del Sistema Solar y el único conocido que alberga vida. Conocida como el "Planeta Azul" por sus océanos, posee características únicas como placas tectónicas activas y una atmósfera rica en oxígeno.

CARACTERÍSTICAS ORBITALES:
• Distancia media al Sol: 149.6 millones de km (1 UA)
• Período orbital: 365.25 días
• Período de rotación: 23h 56m 4s
• Excentricidad orbital: 0.0167
• Inclinación axial: 23.44°

DATOS FÍSICOS:
• Diámetro: 12,742 km (ecuatorial)
• Masa: 5.972 × 10²⁴ kg
• Gravedad superficial: 9.807 m/s²
• Temperatura superficial: -89°C a 58°C
• Presión atmosférica: 1.013 bar

BIOSFERA Y HIDROSFERA:
La Tierra tiene aproximadamente 1.386 mil millones de km³ de agua, cubriendo el 71% de su superficie. La biosfera ha alterado significativamente la atmósfera y superficie terrestres mediante la fotosíntesis, que creó la atmósfera rica en oxígeno.`,
    structure: `ESTRUCTURA INTERNA DE LA TIERRA

NÚCLEO INTERNO:
• Radio: ~1,220 km
• Composición: Hierro-níquel sólido
• Temperatura: ~5,700°C
• Presión: ~360 GPa

NÚCLEO EXTERNO:
• Grosor: ~2,260 km
• Composición: Hierro-níquel líquido
• Genera el campo magnético por efecto dínamo

MANTO:
• Grosor: ~2,900 km
• Composición: Silicatos de magnesio y hierro
• Comportamiento viscoso en escalas geológicas

CORTEZA:
• Grosor: 5-70 km
• Composición: Rocas ígneas, sedimentarias y metamórficas
• Dividida en placas tectónicas en movimiento

PLACAS TECTÓNICAS:
La litosfera terrestre está fragmentada en 7-8 placas mayores que se mueven 2-15 cm/año. Este movimiento causa terremotos, volcanes y formación de montañas.`
  },
  { 
    name: "Marte", 
    radius: 2.2,
    dist: 380,
    texture3D: "mars_texture.jpg", 
    texturePanel: "mars.png", 
    structureImage: "structure_mars.png",
    rotationSpeed: 0.003,
    moons: [
      { name: "Fobos", radius: 0.3, dist: 4, color: 0x666666 },
      { name: "Deimos", radius: 0.2, dist: 6, color: 0x777777 }
    ],
    encyclopedia: `PLANETA ROJO - EL MUNDO DESÉRTICO

Marte, conocido como el "Planeta Rojo" por el óxido de hierro en su superficie, es el cuarto planeta del Sistema Solar. Posee las características más parecidas a la Tierra, incluyendo estaciones, casquetes polares y evidencia de agua líquida en el pasado.

CARACTERÍSTICAS ORBITALES:
• Distancia media al Sol: 227.9 millones de km
• Período orbital: 687 días terrestres
• Período de rotación: 24h 37m 22s
• Excentricidad orbital: 0.0935
• Inclinación axial: 25.19°

DATOS FÍSICOS:
• Diámetro: 6,779 km
• Masa: 6.39 × 10²³ kg (0.107 Tierras)
• Gravedad superficial: 3.71 m/s² (0.38 g)
• Temperatura superficial: -153°C a 20°C
• Presión atmosférica: 0.006 bar

GEOGRAFÍA MARCIANA:
Marte alberga el volcán más grande del Sistema Solar (Monte Olimpo, 21 km de altura) y el cañón más extenso (Valles Marineris, 4,000 km de longitud). Los casquetes polares contienen hielo de agua y CO₂.`,
    structure: `ESTRUCTURA INTERNA DE MARTE

NÚCLEO:
• Radio: ~1,800 km
• Composición: Hierro, níquel y azufre
• Estado: Probablemente sólido
• No genera campo magnético global

MANTO:
• Grosor: ~1,500 km
• Composición: Silicatos
• Menos activo que el manto terrestre

CORTEZA:
• Grosor: 50-125 km (más gruesa que la terrestre)
• Composición: Basalto y otros silicatos
• Sin placas tectónicas activas

CARACTERÍSTICAS MAGNÉTICAS:
Marte tiene un campo magnético global muy débil, pero muestra magnetización remanente en la corteza austral, evidencia de un campo magnético global en el pasado. Esto sugiere que Marte tuvo un núcleo activo hace 4 mil millones de años.`
  },
  { 
    name: "Júpiter", 
    radius: 22.0,
    dist: 1300,
    texture3D: "jupiter_texture.jpg", 
    texturePanel: "jupiter.png", 
    structureImage: "structure_jupiter.png",
    rotationSpeed: 0.008,
    moons: [
      { name: "Ío", radius: 1.2, dist: 30, color: 0xffaa44 },
      { name: "Europa", radius: 1.0, dist: 35, color: 0xffffff },
      { name: "Ganímedes", radius: 1.5, dist: 40, color: 0xcccccc },
      { name: "Calisto", radius: 1.4, dist: 45, color: 0x999999 }
    ],
    encyclopedia: `GIGANTE GASEOSO - EL REY DE LOS PLANETAS

Júpiter es el planeta más grande del Sistema Solar, un gigante gaseoso cuya masa es 2.5 veces la de todos los demás planetas combinados. Es conocido por su Gran Mancha Roja, una tormenta anticiclónica más grande que la Tierra que lleva siglos activa.

CARACTERÍSTICAS ORBITALES:
• Distancia media al Sol: 778.5 millones de km
• Período orbital: 11.86 años terrestres
• Período de rotación: 9h 55m 30s (más rápido del Sistema Solar)
• Excentricidad orbital: 0.0489
• Inclinación axial: 3.13°

DATOS FÍSICOS:
• Diámetro: 139,820 km (ecuatorial)
• Masa: 1.898 × 10²⁷ kg (317.8 Tierras)
• Gravedad superficial: 24.79 m/s² (2.53 g)
• Temperatura en la cima de nubes: -145°C
• Número de lunas conocidas: 95

SISTEMA DE ANILLOS:
Júpiter posee un tenue sistema de anillos compuesto principalmente de partículas de polvo, probablemente originadas por impactos en sus lunas interiores.`,
    structure: `ESTRUCTURA INTERNA DE JÚPITER

NÚCLEO:
• Radio: ~10,000-20,000 km
• Composición: Probablemente roca y hielo
• Temperatura: ~20,000°C
• Presión: ~4,500 GPa

CAPA DE HIDRÓGENO METÁLICO:
• Grosor: ~40,000 km
• Composición: Hidrógeno en estado metálico líquido
• Conduce electricidad y genera el campo magnético

CAPA DE HIDRÓGENO MOLECULAR:
• Grosor: ~20,000 km
• Composición: Hidrógeno molecular
• Transición gradual a la atmósfera

ATMOSFERA:
• Grosor: ~5,000 km
• Composición: 89% H₂, 10% He, 1% otros
• Bandas de nubes a diferentes altitudes

CAMPO MAGNÉTICO:
Júpiter tiene el campo magnético más fuerte del Sistema Solar, 20,000 veces más intenso que el terrestre. Su magnetosfera se extiende hasta la órbita de Saturno.`
  },
  { 
    name: "Saturno", 
    radius: 18.5,
    dist: 2400,
    texture3D: "saturn_texture.jpg", 
    texturePanel: "saturn.png", 
    structureImage: "structure_saturn.png",
    rotationSpeed: 0.006,
    hasRings: true,
    ringInnerRadius: 22.0,
    ringOuterRadius: 40.0,
    moons: [
      { name: "Titán", radius: 1.6, dist: 35, color: 0xffcc99 },
      { name: "Encélado", radius: 0.6, dist: 28, color: 0xffffff },
      { name: "Mimas", radius: 0.4, dist: 25, color: 0xaaaaaa }
    ],
    encyclopedia: `SEÑOR DE LOS ANILLOS - EL GIGANTE ANILLADO

Saturno es el sexto planeta del Sistema Solar, famoso por su espectacular sistema de anillos. Es un gigante gaseoso como Júpiter, pero menos denso que el agua - flotaría en un océano suficientemente grande.

CARACTERÍSTICAS ORBITALES:
• Distancia media al Sol: 1,432 millones de km
• Período orbital: 29.46 años terrestres
• Período de rotación: 10h 33m 38s
• Excentricidad orbital: 0.0565
• Inclinación axial: 26.73°

DATOS FÍSICOS:
• Diámetro: 116,460 km (ecuatorial)
• Masa: 5.683 × 10²⁶ kg (95.2 Tierras)
• Gravedad superficial: 10.44 m/s² (1.06 g)
• Temperatura en la cima de nubes: -178°C
• Número de lunas conocidas: 146

SISTEMA DE ANILLOS:
Los anillos de Saturno se extienden hasta 282,000 km del planeta pero tienen solo ~10 metros de grosor. Están compuestos principalmente de partículas de hielo de agua (99%) con algo de roca.`,
    structure: `ESTRUCTURA INTERNA DE SATURNO

NÚCLEO:
• Radio: ~15,000-18,000 km
• Composición: Hierro-níquel y roca
• Temperatura: ~11,700°C
• Masa: ~15-20 masas terrestres

CAPA DE HIDRÓGENO METÁLICO:
• Grosor: ~30,000 km
• Composición: Hidrógeno metálico líquido
• Menos extensa que en Júpiter

CAPA DE HIDRÓGENO MOLECULAR:
• Grosor: ~25,000 km
• Composición: Hidrógeno molecular
• Contiene la mayor parte de la masa planetaria

ATMOSFERA:
• Grosor: ~1,000 km
• Composición: 96% H₂, 3% He, 1% otros
• Vientos de hasta 1,800 km/h

FUENTE DE CALOR INTERNO:
Saturno irradia 2.5 veces más energía de la que recibe del Sol, debido principalmente a la lenta precipitación de helio hacia el núcleo (lluvia de helio).`
  },
  { 
    name: "Urano", 
    radius: 8.0,
    dist: 4800,
    texture3D: "uranus_texture.jpg", 
    texturePanel: "uranus.png", 
    structureImage: "structure_uranus.png",
    rotationSpeed: 0.004,
    moons: [
      { name: "Titania", radius: 0.8, dist: 15, color: 0xaaaacc },
      { name: "Oberón", radius: 0.7, dist: 18, color: 0x9999bb }
    ],
    encyclopedia: `GIGANTE DE HIELO - EL PLANETA INCLINADO

Urano es el séptimo planeta del Sistema Solar, un gigante de hielo con la característica única de rotar sobre su lado, con una inclinación axial de 97.77°. Esta orientación extrema produce estaciones muy extremas.

CARACTERÍSTICAS ORBITALES:
• Distancia media al Sol: 2,867 millones de km
• Período orbital: 84 años terrestres
• Período de rotación: 17h 14m 24s (retrógrado)
• Excentricidad orbital: 0.0457
• Inclinación axial: 97.77°

DATOS FÍSICOS:
• Diámetro: 50,724 km
• Masa: 8.681 × 10²⁵ kg (14.5 Tierras)
• Gravedad superficial: 8.69 m/s² (0.89 g)
• Temperatura en la cima de nubes: -224°C
• Número de lunas conocidas: 27

COMPOSICIÓN ATMOSFÉRICA:
La atmósfera de Urano está compuesta principalmente de hidrógeno (83%), helio (15%) y metano (2%). El metano absorbe la luz roja, dando al planeta su característico color azul-verde.`,
    structure: `ESTRUCTURA INTERNA DE URANO

NÚCLEO:
• Radio: ~7,500 km
• Composición: Roca y hielo
• Temperatura: ~5,000°C

MANTO DE HIELO:
• Grosor: ~15,000 km
• Composición: Agua, amoníaco y metano en estado fluido
• No es hielo en el sentido convencional, sino un fluido supercrítico

ATMOSFERA:
• Grosor: ~5,000 km
• Composición: Hidrógeno, helio y metano
• Sin estructura de bandas prominente

CARACTERÍSTICAS MAGNÉTICAS:
El campo magnético de Urano está inclinado 59° respecto a su eje de rotación y desplazado del centro. Esta configuración única sugiere que se genera en capas más superficiales que en otros planetas.`
  },
  { 
    name: "Neptuno", 
    radius: 7.8,
    dist: 7500,
    texture3D: "neptune_texture.jpg", 
    texturePanel: "neptune.png", 
    structureImage: "structure_neptune.png",
    rotationSpeed: 0.004,
    moons: [
      { name: "Tritón", radius: 1.3, dist: 20, color: 0x44aaff }
    ],
    encyclopedia: `GIGANTE AZUL - EL PLANETA DE LOS VIENTOS

Neptuno es el octavo y más lejano planeta del Sistema Solar, un gigante de hielo conocido por sus intensos vientos, los más rápidos del Sistema Solar, que pueden alcanzar los 2,100 km/h. Fue el primer planeta encontrado mediante predicción matemática.

CARACTERÍSTICAS ORBITALES:
• Distancia media al Sol: 4,515 millones de km
• Período orbital: 164.8 años terrestres
• Período de rotación: 16h 6m 36s
• Excentricidad orbital: 0.0113
• Inclinación axial: 28.32°

DATOS FÍSICOS:
• Diámetro: 49,244 km
• Masa: 1.024 × 10²⁶ kg (17.1 Tierras)
• Gravedad superficial: 11.15 m/s² (1.14 g)
• Temperatura en la cima de nubes: -218°C
• Número de lunas conocidas: 16

GRAN MANCHA OSCURA:
Neptuno tiene una característica similar a la Gran Mancha Roja de Júpiter: la Gran Mancha Oscura, un sistema de tormentas anticiclónicas del tamaño de la Tierra que puede desaparecer y reaparecer.`,
    structure: `ESTRUCTURA INTERNA DE NEPTUNO

NÚCLEO:
• Radio: ~7,000 km
• Composición: Roca y hielo
• Temperatura: ~5,000°C

MANTO DE HIELO:
• Grosor: ~15,000 km
• Composición: Agua, metano y amoníaco en estado fluido
• Mayor proporción de roca que Urano

ATMOSFERA:
• Grosor: ~5,000 km
• Composición: 80% H₂, 19% He, 1.5% CH₄
• Estructura de bandas similar a Júpiter

FUENTE DE CALOR INTERNO:
Neptuno irradia 2.6 veces más energía de la que recibe del Sol. Esta energía interna alimenta los vientos más rápidos del Sistema Solar y crea sistemas climáticos activos. El origen exacto de este calor interno sigue siendo objeto de estudio.`
  }
];

const planetMeshes = [];

function createPlanets() {
  const fixedAngles = [3.2, 0.8, 1.6, 2.4, 1.2, 3.6, 4.6, 5.6];
  
  planets.forEach((planet, index) => {
    const texture = textureLoader.load(`assets/${planet.texture3D}`);
    
    const geometry = new THREE.SphereGeometry(planet.radius, 64, 64);
    
    const material = new THREE.MeshPhongMaterial({
      map: texture,
      shininess: 15,
      specular: new THREE.Color(0x111111)
    });

    const mesh = new THREE.Mesh(geometry, material);
    
    const angle = fixedAngles[index];
    mesh.position.x = Math.cos(angle) * planet.dist;
    mesh.position.z = Math.sin(angle) * planet.dist;
    
    scene.add(mesh);
    
    planet.mesh = mesh;
    planetMeshes.push(mesh);

    createOrbit(planet.dist);
    createPlanetLabel(planet);
    
    if (planet.moons && planet.moons.length > 0) {
      createMoons(planet);
    }
    
    if (planet.hasRings) {
      createSaturnRings(planet);
    }
  });
}

function createMoons(planet) {
  planet.moons.forEach((moon, moonIndex) => {
    const moonGeometry = new THREE.SphereGeometry(moon.radius, 32, 32);
    const moonMaterial = new THREE.MeshPhongMaterial({
      color: moon.color,
      shininess: 10
    });
    
    const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
    
    const moonAngle = (moonIndex * Math.PI * 2) / planet.moons.length;
    moonMesh.position.x = Math.cos(moonAngle) * moon.dist;
    moonMesh.position.z = Math.sin(moonAngle) * moon.dist;
    
    planet.mesh.add(moonMesh);
    moon.mesh = moonMesh;
  });
}

function createOrbit(radius) {
  const curve = new THREE.EllipseCurve(0, 0, radius, radius, 0, Math.PI * 2);
  const points = curve.getPoints(100);
  const geometry = new THREE.BufferGeometry().setFromPoints(
    points.map(p => new THREE.Vector3(p.x, 0, p.y))
  );
  
  const material = new THREE.LineBasicMaterial({
    color: 0x446688,
    transparent: true,
    opacity: 0.3
  });
  
  const orbit = new THREE.Line(geometry, material);
  scene.add(orbit);
}

// --- FUNCIÓN MEJORADA PARA ETIQUETAS DE PLANETAS ---
function createPlanetLabel(planet) {
  const div = document.createElement("div");
  div.textContent = planet.name;
  
  // Calcular offset basado en el radio del planeta (más flexible)
  const labelOffset = planet.radius + 0.1; 
  
  // Reset completo y estilos controlados
  div.style.all = 'unset';
  div.style.display = 'inline-block';
  div.style.fontFamily = "'Exo 2', sans-serif";
  div.style.color = '#00f3ff';
  div.style.fontSize = planet.radius > 10 ? '14px' : '12px'; // Tamaño adaptable
  div.style.fontWeight = 'bold';
  div.style.textShadow = '0 0 10px rgba(0, 243, 255, 0.9)';
  div.style.background = 'rgba(0, 0, 0, 0.85)';
  div.style.padding = planet.radius > 10 ? '8px 16px' : '4px 12px';
  div.style.borderRadius = '20px';
  div.style.border = '1px solid rgba(0, 243, 255, 0.4)';
  div.style.backdropFilter = 'blur(5px)';
  div.style.whiteSpace = 'nowrap';
  div.style.pointerEvents = 'auto';
  div.style.cursor = 'pointer';
  div.style.transition = 'all 0.3s ease';
  div.style.boxShadow = '0 0 15px rgba(0, 243, 255, 0.3)';
  div.style.width = 'auto';
  div.style.maxWidth = 'none';
  div.style.boxSizing = 'border-box';
  div.style.zIndex = '1000';
  
  // Crear el objeto CSS2D pero NO agregarlo al mesh del planeta
  const label = new THREE.CSS2DObject(div);
  
  // Posicionar la etiqueta en una posición fija relativa al planeta
  label.position.set(0, labelOffset, 0);
  planet.mesh.add(label)

  // En lugar de agregar al mesh del planeta, crear un Object3D separado
  const labelContainer = new THREE.Object3D();
  labelContainer.add(label);
  scene.add(labelContainer);
  
  // Guardar referencia para actualizar posición
  planet.labelContainer = labelContainer;
  planet.label = label;
  
  div.addEventListener('click', (event) => {
    event.stopPropagation();
    event.preventDefault();
    openMainPanel(planet);
  });
  
  return label;
}

// --- FUNCIÓN MEJORADA PARA ETIQUETA DEL SOL ---
function createSunLabel(sunMesh, radius) {
  const div = document.createElement("div");
  div.textContent = "Sol";
  
  const labelOffset = radius * 1.2; // Offset proporcional al radio
  
  div.style.cssText = `
    all: unset;
    font-family: 'Exo 2', sans-serif;
    color: #ffff00;
    font-size: 12px;
    font-weight: bold;
    text-shadow: 0 0 10px rgba(255, 255, 0, 0.9);
    background: rgba(0, 0, 0, 0.9);
    padding: 4px 12px;
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 0, 0.4);
    backdrop-filter: blur(5px);
    white-space: nowrap;
    pointer-events: auto;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 0 14px rgba(255, 255, 0, 0.3);
    display: inline-block;
    width: auto;
    z-index: 1000;
  `;
  
  const label = new THREE.CSS2DObject(div);
  
  // Crear contenedor separado para el Sol también
  const labelContainer = new THREE.Object3D();
  labelContainer.add(label);
  scene.add(labelContainer);
  
  // Guardar referencias
  sunMesh.labelContainer = labelContainer;
  sunMesh.label = label;
  
  div.addEventListener('click', (event) => {
    event.stopPropagation();
    event.preventDefault();
    openMainPanel(sunData);
  });
  
  return label;
}

// --- FUNCIÓN PARA ACTUALIZAR POSICIONES DE ETIQUETAS ---
function updateLabelPositions() {
  // Actualizar etiqueta del Sol
  if (sunMesh && sunMesh.labelContainer && sunMesh.geometry) {
    sunMesh.labelContainer.position.copy(sunMesh.position);
    const sunRadius = sunMesh.geometry.parameters.radius;
    sunMesh.labelContainer.position.y += sunRadius * 1.4;
    
    // Escalar etiqueta del Sol basado en distancia
    const sunCameraDistance = camera.position.distanceTo(sunMesh.position);
    const sunLabelScale = Math.min(sunCameraDistance / 1200, 2);
    if (sunMesh.label) {
      sunMesh.label.scale.set(sunLabelScale, sunLabelScale, sunLabelScale);
    }
  }
  
  // Actualizar etiquetas de planetas
  planets.forEach(planet => {
    if (planet.mesh && planet.labelContainer) {
      // Copiar posición del planeta
      planet.labelContainer.position.copy(planet.mesh.position);
      
      // Calcular offset basado en el radio y distancia de cámara
      const cameraDistance = camera.position.distanceTo(planet.mesh.position);
      const scaleFactor = Math.min(cameraDistance / 500, 3); // Factor de escala basado en distancia
      const labelOffset = Math.max(planet.radius * 2.5 * scaleFactor, 10);
      
      // Aplicar offset en Y
      planet.labelContainer.position.y += labelOffset;
      
      // Escalar etiqueta basado en distancia
      if (planet.label) {
        const labelScale = Math.min(cameraDistance / 800, 1.8);
        planet.label.scale.set(labelScale, labelScale, labelScale);
      }
    }
  });
}

function createSaturnRings(planet) {
  const ringTexture = textureLoader.load("assets/saturn_ring.png");
  
  ringTexture.wrapS = THREE.RepeatWrapping;
  ringTexture.wrapT = THREE.RepeatWrapping;
  ringTexture.repeat.set(1, 1);
  
  const ringGeometry = createRingGeometryWithProperUVs(
    planet.ringInnerRadius, 
    planet.ringOuterRadius, 
    128
  );
  
  const ringMaterial = new THREE.MeshBasicMaterial({
    map: ringTexture,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.8,
    alphaTest: 0.1
  });
  
  const rings = new THREE.Mesh(ringGeometry, ringMaterial);
  
  planet.mesh.add(rings);
  
  return rings;
}

function createRingGeometryWithProperUVs(innerRadius, outerRadius, thetaSegments) {
  const geometry = new THREE.BufferGeometry();
  const positions = [];
  const uvs = [];
  const indices = [];
  
  for (let i = 0; i <= thetaSegments; i++) {
    const angle = (i / thetaSegments) * Math.PI * 2;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    
    positions.push(cos * innerRadius, 0, sin * innerRadius);
    uvs.push(0, i / thetaSegments);
    
    positions.push(cos * outerRadius, 0, sin * outerRadius);
    uvs.push(1, i / thetaSegments);
  }
  
  for (let i = 0; i < thetaSegments; i++) {
    const a = i * 2;
    const b = i * 2 + 1;
    const c = (i + 1) * 2;
    const d = (i + 1) * 2 + 1;
    
    indices.push(a, b, c);
    indices.push(c, b, d);
  }
  
  geometry.setIndex(indices);
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  
  return geometry;
}

// --- SISTEMA DE RAYCAST ---
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function createPickSpheres() {
  planets.forEach(planet => {
    const geometry = new THREE.SphereGeometry(planet.radius * 1.5, 16, 16);
    const material = new THREE.MeshBasicMaterial({
      visible: false
    });
    
    const pickSphere = new THREE.Mesh(geometry, material);
    pickSphere.position.copy(planet.mesh.position);
    pickSphere.userData = { planet: planet };
    scene.add(pickSphere);
  });
}

// --- ANIMACIÓN ---
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minDistance = 50;
controls.maxDistance = 20000;

function rotatePlanets() {
  planets.forEach(planet => {
    if (planet.mesh) {
      planet.mesh.rotation.y += planet.rotationSpeed;
      
      if (planet.moons) {
        planet.moons.forEach(moon => {
          if (moon.mesh) {
            moon.mesh.rotation.y += planet.rotationSpeed * 2;
          }
        });
      }
    }
  });
}

// --- SISTEMA DE PANEL PRINCIPAL ---
const mainPanel = document.getElementById("main-panel");
const panelImage = document.getElementById("panel-image");
const panelTitle = document.getElementById("panel-title");
const mainButtons = document.getElementById("main-buttons");
const encyclopediaContent = document.getElementById("encyclopedia-content");
const structureContent = document.getElementById("structure-content");
const planetsList = document.getElementById("planets-list");
const encyclopediaText = document.getElementById("encyclopedia-text");
const structureText = document.getElementById("structure-text");
const structureImgElement = document.getElementById("structure-img");
const imageViewer = document.getElementById("image-viewer");
const viewerImg = document.getElementById("viewer-img");
const closeViewerBtn = document.getElementById("close-viewer");

let currentPlanet = null;

function openMainPanel(planet) {
  currentPlanet = planet;
  mainPanel.classList.remove("hidden");
  panelTitle.textContent = planet.name;
  panelImage.style.backgroundImage = `url('assets/${planet.texturePanel}')`;
  
  showMainButtons();
}

function showMainButtons() {
    mainButtons.classList.remove("hidden");
    encyclopediaContent.classList.add("hidden");
    structureContent.classList.add("hidden");
    planetsList.classList.add("hidden");

    // Mostrar imagen principal
    panelImage.style.display = "block";
    panelImage.style.backgroundImage = `url('assets/${currentPlanet.texturePanel}')`;
    
    // Quitar clase clickable cuando no estés en enciclopedia
    panelImage.classList.remove("structure-clickable");
}

function showEncyclopedia() {
  mainButtons.classList.add("hidden");
  encyclopediaContent.classList.remove("hidden");
  encyclopediaText.textContent = currentPlanet.encyclopedia;
  
  // Asegurar que la imagen principal sea visible y clickeable
  panelImage.style.display = "block";
  panelImage.style.backgroundImage = `url('assets/${currentPlanet.texturePanel}')`;
  panelImage.classList.add("structure-clickable");
}

function showStructure() {
  mainButtons.classList.add("hidden");
  encyclopediaContent.classList.add("hidden");
  planetsList.classList.add("hidden");

  structureContent.classList.remove("hidden");

  // Texto de estructura
  structureText.textContent = currentPlanet.structure;

  // Mostrar imagen correcta
  const img = document.getElementById("structure-img");
  img.src = `assets/${currentPlanet.structureImage}`;
  img.style.display = "block";

  // Ocultar imagen del panel principal
  panelImage.style.display = "block";
  panelImage.style.backgroundImage = `url('assets/${currentPlanet.structureImage}')`;
}

// === EVENTO PARA AMPLIAR IMAGEN DEL PANEL PRINCIPAL (ENCICLOPEDIA) ===
panelImage.addEventListener("click", () => {
    if (currentPlanet && !encyclopediaContent.classList.contains("hidden")) {
        viewerImg.src = `assets/${currentPlanet.texturePanel}`;
        imageViewer.classList.remove("hidden");
        imageViewer.classList.add("visible");
        console.log("Imagen ampliada desde enciclopedia:", currentPlanet.texturePanel);
    }
});

// === EVENTO PARA MOSTRAR VENTANA DE IMAGEN AMPLIADA (ESTRUCTURA) ===
structureImgElement.addEventListener("click", () => {
    viewerImg.src = structureImgElement.src;
    imageViewer.classList.remove("hidden");
    imageViewer.classList.add("visible");
    console.log("Imagen ampliada desde estructura:", structureImgElement.src);
});

// Cerrar ventana flotante - CORREGIDO
closeViewerBtn.addEventListener("click", () => {
    imageViewer.classList.remove("visible");
    setTimeout(() => {
        imageViewer.classList.add("hidden");
    }, 300);
});

// También cerrar con Escape key
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && imageViewer.classList.contains("visible")) {
        imageViewer.classList.remove("visible");
        setTimeout(() => {
            imageViewer.classList.add("hidden");
        }, 300);
    }
});

function showPlanetsList() {
  mainButtons.classList.add("hidden");
  planetsList.classList.remove("hidden");
}

function visitPlanet() {
  if (currentPlanet.name === "Sol") {
    const startPosition = camera.position.clone();
    const startTarget = controls.target.clone();

    const endPosition = new THREE.Vector3(0, 80, 150);
    const endTarget   = new THREE.Vector3(0, 0, 0);

    animateCameraToPosition(startPosition, endPosition, startTarget, endTarget, 2000);
    return;
  }

  // --- PLANETAS ---
  const startPosition = camera.position.clone();
  const startTarget   = controls.target.clone();
  const target        = currentPlanet.mesh.position.clone();

  let baseDistance;

  // ⭐ Ajuste especial para Mercurio
  if (currentPlanet.name === "Mercurio") {
      baseDistance = currentPlanet.radius * 3;  // Súper cerca, sin tocarlo
  } else {
      // Distancia automática para el resto de planetas
      const minClearance  = currentPlanet.radius * 0.4;
      const extraDistance = Math.sqrt(currentPlanet.radius) * 1;
      baseDistance = minClearance + extraDistance;
  }

  // --- DIRECCIÓN DIAGONAL ESTÉTICA ---
  const planetToSun = new THREE.Vector3(0, 0, 0).sub(target).normalize();
  const upVector    = new THREE.Vector3(0, 1, 0);
  const sideVector  = new THREE.Vector3()
      .crossVectors(planetToSun, upVector)
      .normalize();

  const viewDirection = new THREE.Vector3()
      .addVectors(
        planetToSun.multiplyScalar(-0.35),
        upVector.multiplyScalar(0.25)
      )
      .add(sideVector.multiplyScalar(0.25))
      .normalize();

  // --- POSICIÓN FINAL DE LA CÁMARA ---
  const endPosition = target.clone().add(viewDirection.multiplyScalar(baseDistance));
  const endTarget   = target.clone();

  animateCameraToPosition(startPosition, endPosition, startTarget, endTarget, 2000);
}

// Función para animar suavemente la cámara a una posición
function animateCameraToPosition(startPos, endPos, startTarget, endTarget, duration) {
  const startTime = performance.now();
  controls.enabled = false; // Deshabilitar controles durante animación
  
  function animate() {
    const currentTime = performance.now();
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Función de easing suave (ease-in-out)
    const easeProgress = easeInOutCubic(progress);
    
    // Interpolar posición
    camera.position.lerpVectors(startPos, endPos, easeProgress);
    
    // Interpolar target
    controls.target.lerpVectors(startTarget, endTarget, easeProgress);
    
    // Actualizar controles
    controls.update();
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      controls.enabled = true; // Rehabilitar controles al finalizar
    }
  }
  
  animate();
}

// Función de easing para movimiento suave
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function backToSolarSystem() {
  const startPosition = camera.position.clone();
  const startTarget = controls.target.clone();
  const endPosition = new THREE.Vector3(0, 400, 1000);
  const endTarget = new THREE.Vector3(0, 0, 0);
  
  animateCameraToPosition(startPosition, endPosition, startTarget, endTarget, 2000);
  mainPanel.classList.add("hidden");
}

// Event listeners para botones
document.getElementById("btn-visit").onclick = visitPlanet;
document.getElementById("btn-encyclopedia").onclick = showEncyclopedia;
document.getElementById("btn-structure").onclick = showStructure;
document.getElementById("btn-planets").onclick = showPlanetsList;
document.getElementById("btn-back").onclick = backToSolarSystem;

// Event listeners para botones de volver
document.querySelectorAll('.btn-back').forEach(btn => {
  btn.onclick = showMainButtons;
});

// Event listeners para lista de planetas
document.querySelectorAll('.planet-option').forEach(option => {
  option.onclick = () => {
    const planetName = option.getAttribute('data-planet');
    if (planetName === "Sol") {
      openMainPanel(sunData);
    } else {
      const planet = planets.find(p => p.name === planetName);
      if (planet) {
        openMainPanel(planet);
      }
    }
  };
});

document.getElementById("reset-view-btn").onclick = () => {
  const startPosition = camera.position.clone();
  const startTarget = controls.target.clone();
  const endPosition = new THREE.Vector3(-300, 1000, 2500);
  const endTarget = new THREE.Vector3(0, 0, 0);
  
  animateCameraToPosition(startPosition, endPosition, startTarget, endTarget, 1500);
};

// --- BUCLE DE ANIMACIÓN ACTUALIZADO ---
function animate() {
  requestAnimationFrame(animate);

  rotatePlanets();
  updateLabelPositions(); // ← AGREGAR ESTA LÍNEA
  controls.update();
  
  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
}

// --- INICIALIZACIÓN CORREGIDA ---
function init() {
  createSun();
  createPlanets();
  createPickSpheres();
  
  // Configuración CORRECTA del renderer de etiquetas
  labelRenderer.domElement.style.position = 'fixed';
  labelRenderer.domElement.style.top = '0';
  labelRenderer.domElement.style.left = '0';
  labelRenderer.domElement.style.width = '100%';
  labelRenderer.domElement.style.height = '100%';
  labelRenderer.domElement.style.pointerEvents = 'none';
  labelRenderer.domElement.style.zIndex = '1000';
  labelRenderer.domElement.style.overflow = 'visible';
  
  // NO agregar estilos conflictivos
  document.body.appendChild(labelRenderer.domElement);
  
  window.addEventListener("click", (event) => {
    // No procesar clics si se hace en el panel
    if (event.target.closest("#main-panel") || event.target.closest(".planet-label")) {
      return;
    }
    
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    raycaster.setFromCamera(mouse, camera);
    
    // Incluir el Sol en la intersección
    const allCelestialBodies = [...planetMeshes, sunMesh];
    const intersects = raycaster.intersectObjects(allCelestialBodies);
    
    if (intersects.length > 0) {
      const clickedMesh = intersects[0].object;
      
      if (clickedMesh === sunMesh) {
        openMainPanel(sunData);
      } else {
        const planet = planets.find(p => p.mesh === clickedMesh);
        if (planet) {
          openMainPanel(planet);
        }
      }
    }
  });
  
  // Asegurar que el renderer se actualice correctamente
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
  });
  
  animate();
}


// ===== SISTEMA DE VENTANA DE IMAGEN AMPLIADA =====
function initializeImageViewer() {
    const panelImage = document.getElementById("panel-image");
    const structureImgElement = document.getElementById("structure-img");
    const imageViewer = document.getElementById("image-viewer");
    const viewerImg = document.getElementById("viewer-img");
    const closeViewerBtn = document.getElementById("close-viewer");

    console.log("Inicializando visor de imágenes...");
    console.log("Elementos encontrados:", {
        panelImage: !!panelImage,
        structureImg: !!structureImgElement,
        imageViewer: !!imageViewer,
        viewerImg: !!viewerImg,
        closeViewerBtn: !!closeViewerBtn
    });

    // Evento para ampliar imagen del panel principal (Enciclopedia)
    if (panelImage) {
        panelImage.addEventListener("click", () => {
            console.log("Clic en imagen del panel");
            if (currentPlanet && !encyclopediaContent.classList.contains("hidden")) {
                viewerImg.src = `assets/${currentPlanet.texturePanel}`;
                imageViewer.classList.remove("hidden");
                imageViewer.classList.add("visible");
                console.log("Mostrando ventana con imagen:", currentPlanet.texturePanel);
            }
        });
    }

    // Evento para ampliar imagen de estructura
    if (structureImgElement) {
        structureImgElement.addEventListener("click", () => {
            console.log("Clic en imagen de estructura");
            viewerImg.src = structureImgElement.src;
            imageViewer.classList.remove("hidden");
            imageViewer.classList.add("visible");
            console.log("Mostrando ventana con imagen de estructura");
        });
    }

    // Cerrar ventana flotante
    if (closeViewerBtn) {
        closeViewerBtn.addEventListener("click", () => {
            console.log("Cerrando ventana");
            imageViewer.classList.remove("visible");
            setTimeout(() => {
                imageViewer.classList.add("hidden");
            }, 300);
        });
    }

    // También cerrar con Escape key
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && imageViewer.classList.contains("visible")) {
            imageViewer.classList.remove("visible");
            setTimeout(() => {
                imageViewer.classList.add("hidden");
            }, 300);
        }
    });

    // Cerrar al hacer clic fuera de la ventana
    imageViewer.addEventListener("click", (event) => {
        if (event.target === imageViewer) {
            imageViewer.classList.remove("visible");
            setTimeout(() => {
                imageViewer.classList.add("hidden");
            }, 300);
        }
    });
}

// Modificar la función showEncyclopedia para asegurar que la imagen sea clickeable
function showEncyclopedia() {
    mainButtons.classList.add("hidden");
    encyclopediaContent.classList.remove("hidden");
    encyclopediaText.textContent = currentPlanet.encyclopedia;
    
    // Asegurar que la imagen principal sea visible y clickeable
    panelImage.style.display = "block";
    panelImage.style.backgroundImage = `url('assets/${currentPlanet.texturePanel}')`;
    panelImage.classList.add("structure-clickable");
    
    console.log("Modo enciclopedia activado - imagen clickeable");
}

// Modificar la función showMainButtons para quitar la clase clickable
function showMainButtons() {
    mainButtons.classList.remove("hidden");
    encyclopediaContent.classList.add("hidden");
    structureContent.classList.add("hidden");
    planetsList.classList.add("hidden");

    // Mostrar imagen principal
    panelImage.style.display = "block";
    panelImage.style.backgroundImage = `url('assets/${currentPlanet.texturePanel}')`;
    
    // Quitar clase clickable cuando no estés en enciclopedia
    panelImage.classList.remove("structure-clickable");
}

// Llamar a initializeImageViewer después de que el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM completamente cargado - inicializando visor");
    initializeImageViewer();
});



// Iniciar la aplicación
init();

// Función para limpiar etiquetas si es necesario
function cleanupLabels() {
  if (sunMesh && sunMesh.labelContainer) {
    scene.remove(sunMesh.labelContainer);
  }
  
  planets.forEach(planet => {
    if (planet.labelContainer) {
      scene.remove(planet.labelContainer);
    }
  });
}

// Función de debug para verificar posiciones
function debugLabelPositions() {
  console.log("=== DEBUG ETIQUETAS ===");
  
  if (sunMesh && sunMesh.labelContainer) {
    console.log("Sol - Posición:", sunMesh.labelContainer.position);
  }
  
  planets.forEach((planet, index) => {
    if (planet.labelContainer) {
      console.log(`${planet.name} - Posición:`, planet.labelContainer.position);
    }
  });
}

// Llama esta función temporalmente para debug
setTimeout(debugLabelPositions, 2000);