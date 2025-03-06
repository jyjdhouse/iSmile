const specialties = [
    {
        id:1,
        subSpec: true,
        name: 'Estética facial',
    },
    {
        id:2,
        subSpec: false,
        name: 'Medicina Regenerativa',
    },
    {
        id:3,
        subSpec: false,
        name: 'Estética corporal',
    },
    {
        id:4,
        subSpec: true,
        name: 'ODONTOLOGIA',
    }
]

// SON LAS CATEGORIAS DE LAS ESPECIALIDADES
const specialties_services = [
    {
        id: 1,
        specialties_id: 1,
        name: 'Armonización facial',
    },
    {
        id: 2,
        specialties_id: 1,
        name: 'BOTOX®️',
    },
    {
        id: 3,
        specialties_id: 1,
        name: 'COSMETOLOGIA',
    },
    {
        id: 4,
        specialties_id: 1,
        name: 'TRATAMIENTO DE PAPADA',
    },
    {
        id: 5,
        specialties_id: 1,
        name: 'BIOESTIMULADORES',
    },
    {
        id: 6,
        name: 'ODONTOLOGIA GENERAL',
        specialties_id: 4,
    },
    {
        id: 7,
        name: 'TRATAMIENTO DE BRUXISMO',
        specialties_id: 4,
    },
    {
        id: 8,
        name: 'DISEÑO DE SONRISA',
        specialties_id: 4,
        
    }
]

const treatments = [
    {
        name: 'B-UP',
        specialties_id: 1, //ESTETICA FACIAL
        specialties_services_id: 1, //ARMONIZAción FACIAL
        description: 'Es una novedosa técnica realizada con acido hialuronico que consiste en trabajar sobre áreas específicas de la región temporal a nivel del cuero cabelludo, con el objetivo de lograr un reposiciónamiento de los tejidos elevándolos  en contra de los vectores de envejecimiento logrando una notable mejoría del rostro, sin cambiar las facciónes del mismo.'
    },
    {
        name: 'OJERAS',
        specialties_id: 1, //ESTETICA FACIAL
        specialties_services_id: 1, //ARMONIZAción FACIAL
        description: 'El relleno de ojeras se realiza con un ácido hialurónico especial para esa zona, corrige el surco palpebromalar hundido mejorando el aspecto de un rostro aparentemente cansado. Se realiza en una sola sesión y tiene una duración entre 12 a 18 meses. El procedimiento es  prácticamente indoloro y el resultado es inmediato.'
    },
    {
        name: 'POMULOS',
        specialties_id: 1, //ESTETICA FACIAL
        specialties_services_id: 1, //ARMONIZAción FACIAL
        description: 'Mediante la aplicación de ácido hialurónico podemos crear una estructura de mejillas equilibrada logrando elevación, contorno y definición. Los pómulos en una mujer están asociados con el atractivo facial, un contorno suave y curvo transmite salud y juventud. La estructura fuerte y definida de las mejillas en un hombre se asocia con la masculinidad y el atractivo. La técnica que utilizamos al trabajar sobre pómulos también tiene como objetivo generar puntos de tensión que ayudan a reposiciónar tejidos y así reducir los surcos nasogenianos y a suavizar indirectamente ojeras. logrando un rostro más definido, estilizado y atractivo.'
    },
    {
        name: 'TEMPORALES',
        specialties_id: 1, //ESTETICA FACIAL
        specialties_services_id: 1, //ARMONIZAción FACIAL
        description: 'La pérdida de volumen en la frente y en las sienes durante el proceso de envejecimiento conduce al descenso de las cejas y tiene un impacto negativo en áreas más distantes como las ojeras. Mediante los rellenos de AH devolvemos el volumen perdido en las sienes y la frente logrando un contorno más juvenil y proporciónando apoyo para levantar las cejas naturalmente. Es ideal combinar este tratamiento con BOTOX®️ para reducir sustancialmente la aparición de arrugas y terminar de dar una elevación natural a las cejas.'

    },
    {
        name: 'RINOMODELAción',
        specialties_id: 1, //ESTETICA FACIAL
        specialties_services_id: 1, //ARMONIZAción FACIAL
        description: 'Utilizamos un acido hialuronico de altísima calidad con una densidad específica para este área, permitiéndonos rectificar y definir el dorso de la nariz para una apariencia más suave, así como para levantar la punta nasal, con resultados potencialmente transformadores. El tratamiento se realiza en una sola sesión y es totalmente ambulatorio, los resultados se ven en el momento, sin hematomas postoperatorios o molestias.'
    },
    {
        name: 'SURCO NASOGENIANO',
        specialties_id: 1, //ESTETICA FACIAL
        specialties_services_id: 1, //ARMONIZAción FACIAL
        description: 'Para tratar el surco nasogeniano nos basamos en el estudio de vectores de envejecimiento y reposiciónamiento de los tejidos. Para mejorar el surco nasogeniano colocamos ácido hialurónico en áreas específicas de pomulos, no para aportar volumen sino para producir el repocisionamiento facial logrando la mejoría del surco indirectamente y obteniendo como resultado un rostro fresco, natural y armónico.'
    },
    {
        name: 'LABIOS',
        specialties_id: 1, //ESTETICA FACIAL
        specialties_services_id: 1, //ARMONIZAción FACIAL
        description: 'Previo al tratamiento realizaremos un diseño donde vamos a evaluar tu anatomía, edad, y expectativas para lograr resultados que se ajusten perfectamente a tus necesidades y a tu rostro. Utilizamos un ácido hialurónico con una densidad ideal para este área que nos permitirá optimizar la forma, proporción, estructura y volumen de los labios, como también elevar comisuras y corregir posibles asimetrías. También podemos tratar las "líneas de fumador" y mejorar la calidad de la piel ya que genera hidratación, aportando un resultado de labios cuidados y tersos.'
    },
    {
        name: 'DEFINIción MANDIBULAR',
        specialties_id: 1, //ESTETICA FACIAL
        specialties_services_id: 1, //ARMONIZAción FACIAL
        description: 'Utilizamos un Ácido Hialurónico de altísima calidad con una densidad específica para tratar este área. Previamente tomamos medidas y proporciónes faciales para realizar el diseño correcto para cada rostro. Cabe destacar que tenemos en cuenta ángulos y proporciónes muy diferentes en hombres y en mujeres. Los resultados se ven de inmediato, es un procedimiento prácticamente indoloro, y la duración es de 2 años aproximadamente. El resultado es un rostro más definido y estilizado en perfecta proporción con el resto del rostro.'
    },
    {
        name: 'MENTON',
        specialties_id: 1, //ESTETICA FACIAL
        specialties_services_id: 1, //ARMONIZAción FACIAL
        description: 'Utilizamos Ácido un Hialurónico de alta densidad para lograr un mentón bien definido con la altura y proyección ideal en cada rostro, consiguiendo un perfil armónico y un rostro más proporciónado; además nos permite mejorar la papada por tensión indirecta de la piel de la zona. Los resultados son instantáneos, es un procedimiento prácticamente indoloro, y la duración es de 2 años aproximadamente.'
    },
    {
        name: 'TOP MODEL LOOK',
        specialties_id: 1,
        specialties_services_id: 1, //ARMONIZAción FACIAL
        description: 'La técnica “Top Model Look” tiene como objetivo lograr un rostro más atractivo con un efecto ‘contouring’ mediante la definición de la zona del hueso lateral de las mejillas. Trabajamos con acido hialuronico de alta y baja densidad, consiguiendo además generar un efecto tensor.'
    },
    {
        name: 'MASCULINIZAción FACIAL',
        specialties_id: 1,
        specialties_services_id: 1, //ARMONIZAción FACIAL
        description: 'Utilizamos Ácido Hialurónico de altísima calidad con una densidad especifica para cada área del rostro; previamente tomamos medidas y proporciónes faciales para realizar el diseño correcto. Trabajamos fundamentalmente en áreas claves de mejillas, mandíbula y mentón otorgando definición,  proporción y ángulos en base a una anatomía masculina ideal. Los resultados son siempre naturales y armónicos y se ven de inmediato. El procedimiento es prácticamente indoloro, y la duración es de 2 años aproximadamente.'
    },
    {
        name: 'FULL FACE',
        specialties_id: 1, //ESTETICA FACIAL
        specialties_services_id: 1, //ARMONIZAción FACIAL
        description: 'La armonización facial es un procedimiento que se basa en un diagnóstico facial completo tomando medidas y proporciónes faciales para el tratamiento de múltiples áreas del rostro utilizando Ácido Hialurónico en combinación con BOTOX®️ y bioestimuladores. El principal objetivo es reequilibrar las proporciónes faciales, mejorar la definición y contornos, corregir irregularidades, reducir la apariencia de arrugas y ojeras; y reactivar la producción de colageno por parte de nuestras propias células. Los tratamientos se adaptan a cada paciente para lograr la mejor version de sí mismos, con resultados SIEMPRE naturales. La armonización facial puede ser realmente transformadora, proporciónando una mejora estética sustancial de la parte media del rostro (mejillas, área de los ojos, nariz), la parte inferior (mentón, línea de la mandíbula, labios) y la parte superior (frente, sienes y cejas). Este tratamiento requiere técnicas y conceptos avanzados, con un profundo conocimiento de la anatomía facial, vectores de envejecimiento y tecnologías de productos.'
    },
    {
        name: 'BICHECTOMIA',
        specialties_id: 1, //ESTETICA FACIAL
        specialties_services_id: 1, //ARMONIZAción FACIAL
        description: 'La bichectomia es una cirugía mínimamente invasiva que se realiza una sola vez en la vida, se realiza con anestesia local en un tiempo aproximado de 30 minutos; consiste en extraer las bolsas de Bichat que son unas bolsitas de grasa encapsulada que tenemos naturalmente a cada lado de nuestras mejillas. Se realiza mediante una pequeña incisión por dentro de la mejillas y luego se cierra con un solo punto de cada lado. El resultado es un afinamiento del rostro resaltando pómulos y dejando una cara más angulosa y estética. Al ser un tipo de grasa encapsulada, no se vuelve a regenerar, manteniendo los resultados al margen de un aumento de peso.'
    },
    {
        name: 'BOTOX®️ ESTETICO (FRENTE ENTRECEJO Y PATAS DE GALLO)',
        specialties_id: 1, //ESTETICA FACIAL
        specialties_services_id: 2,
        description: 'Relaja de forma selectiva los grupos musculares responsables de las arrugas de expresión, ilumina los ojos y elimina el gesto de estar permanentemente preocupado, consiguiendo una mirada fresca y descansada. Tratamos siempre la región de frente, entrecejo y patas de gallo con la dosis necesaria adecuada en cada área, sin excluir ninguna de las zonas, debido a que si se trata una zona aislada surgen arrugas compensatorias en las zonas no tratadas. La aplicación se realiza en pocos minutos pudiendo comenzar a ver los resultados entre 24 a 48 horas y viendo el efecto completo a las 2 semanas de aplicación. La duración del efecto es de 6 meses aproximadamente. Los resultados que obtenemos son siempre naturales gracias a nuestra técnica de aplicación altamente especialidada y personalizada en cada paciente.'
    },
    {
        name: 'BOTOX®️ PUNTA NARIZ',
        specialties_id: 1, //ESTETICA FACIAL
        specialties_services_id: 2,
        description: 'En algunos pacientes podemos observar que al hablar o sonreír la punta de la nariz es tracciónada hacia abajo. Esto surge por la presencia de un pequeño músculo que es inconstante  (no todos los pacientes lo tienen) que se encuentra situado en la base de la nariz y es el responsable del movimiento de la punta nasal durante la expresión y el habla del paciente. En estos casos tenemos la posibilidad de inactivar este musculo mediante la aplicación de BOTOX®️ para evitar la caída de la punta de la nariz a causa de esta tracción constante, permitiendo que la punta quede elevada durante cualquier expresión.'
    },
    {
        name: 'BOTOX®️ MENTON EMPEDRADO',
        specialties_id: 1, //ESTETICA FACIAL
        specialties_services_id: 2,
        description: 'En muchos pacientes podemos observar que al hablar o expresarse se produce un puntillado o empedrado en la zona de la barbilla que se debe a una hiperactividad muscular en esa área. Esto podemos soluciónarlo de una manera muy sencilla aplicando una dosis adecuada de BOTOX®️ para relajar estos músculos  hiperactivos y lograr un mentón liso y agradable ante cualquier expresión.'
    },
    {
        name: 'BOTOX®️ PARA TRATAMIENTO DE CICATRICES',
        specialties_id: 1, //ESTETICA FACIAL
        specialties_services_id: 2,
        description: 'El tratamiento de cicatrices con BOTOX®️ es uno de los más novedosos avances que nos permite mejorar notablemente cualquier tipo de cicatriz mediante su aplicación intracicatrizal. La cantidad de sesiones dependerá del tipo de cicatriz y se realizan con un espacio de 4 semanas entre cada sesión.'
    },
    {
        name: 'MESOBOTOX',
        specialties_id: 1, //ESTETICA FACIAL
        specialties_services_id: 2,
        description: 'Consiste en la aplicación de múltiples pequeñas dosis de Botox en la piel de todo el rostro, con el fin reducir el tamaño de poros pronunciados, la secreción de glándulas sebáceas,  brotes y granitos, consiguiendo una piel más tersa, suave y luminosa.'
    },
    {
        name: 'SONRISA GINGIVAL',
        specialties_id: 1, //ESTETICA FACIAL
        specialties_services_id: 2,
        description: 'El tratamiento de sonrisa gingival con BOTOX®️ consiste en la colocación de algunas unidades de  BOTOX®️ en los músculos elevadores del labio superior, para relajarlos y evitar que el labio se suba de manera exagerada y que se muestre la cantidad justa de encía al sonreír. Logrando una sonrisa armónica y estética. En tan solo 48 hs  comienza el efecto y a las dos semanas de aplicación observamos los resultados finales.'
    },
    {
        name: 'BOTOX®️ BRUXISMO',
        specialties_id: 1, //ESTETICA FACIAL
        specialties_services_id: 2,
        description: 'El tratamiento de Bruxismo con Botox es hoy en día el tratamiento más efectivo que solucióna esta afección. Consiste en la colocación de Botox en los músculos que lo provocan haciendo que se relajen y se produzca indefectiblemente un gran alivio, de esta forma evitamos desgastes y roturas dentarias, dolores articulares, de cabeza, oído, y contracturas cervicales asociadas al Bruxismo. La aplicación se lleva a cabo en tan solo unos minutos, y el efecto de relajación comienza a sentirse a las 48 hs luego de la aplicación.'
    },
    {
        name: 'LIMPIEZA FACIAL PROFUNDA',
        specialties_id: 1, //ESTETICA FACIAL
        specialties_services_id: 3,
        description: 'Trabajamos con una técnica específica para mejorar la salud y la apariencia del cutis de forma global. Es el tratamiento cosmetologico más completo para el cuidado de nuestra piel. Eliminamos puntos negros y células muertas, consiguiendo que la piel respire y sean más efectivos los tratamientos subsiguientes. El resultado es una piel limpia, lisa, tersa y renovada. Incluimos en el tratamiento un  ñPeeling Químico que elegimos de forma personalizada acuerdo a los requerimientos de cada piel, también peeling mecánico con puntas de diamante, extracción de comedones y puntos negros de forma manual y con espátula ultrasónica, Ozonoterapia Frío/Calor, mascarilla Descongestiva/Nutritiva y Cabina LED.'
    },
    {
        name: 'PEELING',
        specialties_id: 1, //ESTETICA FACIAL
        specialties_services_id: 3,
        description: 'Realizamos peelings mecánicos, con puntas de diamante y químicos, con diferentes tipos de ácidos de acuerdo a los requerimientos de cada piel. La combinación de ambos nos brinda resultados óptimos produciendo una renovación celular, atenuando manchas y arrugas finas, dejando como resultado una piel  renovada. Trabajamos con “peelings inteligentes” que pueden ser realizados en cualquier época del año. En cada sesión se realiza una limpieza, exfoliación, peeling con Punta de diamente, peeling con el ácido específico según la problemática a tratar y finalizamos con una mascarilla descongestiva y nutritiva elegida para cada caso en particular.'
    },
    {
        name: 'OZONOTERAPIA',
        specialties_id: 1, //ESTETICA FACIAL
        specialties_services_id: 3,
        description: 'El ozono estimula el colágeno, la elastina, es antioxidante y restablece la circulación sanguínea, tiene efecto desinfectante, neutraliza las bacterias de la piel. Gracias a este tratamiento facial cerramos los poros de la piel y mejoramos las manchas.'
    },
    {
        name: 'EXTRACción DE COMEDONES',
        specialties_id: 1, //ESTETICA FACIAL
        specialties_services_id: 3,
        description: 'Procedimiento no agresivo ni invasivo, destinado a mejorar el aspecto de la piel, corregir la dilatación de los poros, eliminar las células más superficiales y extraer los famosos "puntos o negros” o “barritos" (en dermatología denominados "comedones") y microquistes que se van acumulando con el tiempo.'
    },
    {
        name: 'MASCARA LED',
        specialties_id: 1, //ESTETICA FACIAL
        specialties_services_id: 3,
        description: 'Terapia de luz que ayuda al rejuvenecimiento cutáneo con grandes resultados a la hora de reafirmar la piel y tonificar los músculos faciales. Su luz, penetra en la capa de la dermis activando el metabolismo de las células.'
    },
    {
        name: 'JELLY MASK',
        specialties_id: 1, //ESTETICA FACIAL
        specialties_services_id: 3,
        description: 'Mascarillas faciales para el cuidado de la piel que se proporciónan en forma de polvo que toma su forma de mascarilla al agregar agua purificada. Crea una capa oclusiva, lo que fuerza la hidratación y empuja todos los nutrientes beneficiosos profundamente en la piel, lo que aumenta la efectividad del procedimiento.'
    },
    {
        name: 'DERMAPLANING',
        specialties_id: 1, //ESTETICA FACIAL
        specialties_services_id: 3,
        description: 'Método de exfoliación físico que consiste en utilizar un bisturí para eliminar suavemente la capa superior de la piel constituida por células muertas como también el vello o pelusa facial, con el fin de revelar una tez más brillante y suave.'
    },
    {
        name: 'MASAJE FACIAL',
        specialties_id: 1, //ESTETICA FACIAL
        specialties_services_id: 3,
        description: 'Tratamiento de belleza que abarca un conjunto de técnicas basadas en manipulaciónes manuales sobre el cutis. Por lo general, se realizan pequeños movimientos sobre el rostro, aplicando diferentes grados de intensidad, superficial o profunda.'
    },
    {
        name: 'LASER NORDLYS',
        specialties_id: 1, //ESTETICA FACIAL
        specialties_services_id: 3,
        description: 'Láser no invasivo de una altísima capacidad rejuvenecedora que te permite continuar con tus actividades de inmediato. En muy pocas sesiones logramos cambios increíbles en la piel logrando un rejuvenecimiento 360* trabajando manchas, telangectasias, rosácea, arañitas, microarrugas, cicatrices de acné, acné activo y estimulando la producción de colageno y elastina de tu piel. Logra un rejuveneccimiento integral de la piel, mejorando la tonalidad y la textura, dando un aspecto brillante y más joven de forma segura y con resultados desde la primera sesión. Podemos utilizarlo en rostro, cuello, manos y escote.'
    },
    {
        name: 'LIPOLISIS ENZIMATICA DE PAPADA',
        specialties_id: 1, //ESTETICA FACIAL
        specialties_services_id: 4,
        description: 'Tratamiento donde aplicamos enzimas lipolíticas especiales para esta zona en forma de micro inyecciónes.Eliminan el tejido adiposo disolviendo las células de grasa en forma segura, rápida y altamente efectiva. Los resultados se ven a los 15 días de la primera sesión evaluando en esa etapa si son necesarias más sesiones.'
    },
    {
        name: 'HIFU PAPADA',
        specialties_id: 1, //ESTETICA FACIAL
        specialties_services_id: 4,
        description: 'Tecnología no invasiva más efectiva del mercado para la flaccidez de la piel. Indicado también para reducir adiposidad localizada. Genera un efecto tensor ayudando además a definir el contorno facial.'
    },
    {
        name: 'RADIESSE',
        specialties_id: 1, //ESTETICA FACIAL
        specialties_services_id: 5,
        description: 'Radiesse es un bioestimulador ideal para corregir los signos de envejecimiento facial y redefinir el contorno del rostro, de manera segura, ambulatoria y sin ninguna cirugía. No se utiliza como material de relleno sino que se aplica en puntos claves para estimular naturalmente la producción de colageno propio creando un efecto lifting. Su efecto dura aproximadamente 2 años.'
    },
    {
        name: 'LONG LASTING',
        specialties_id: 1, //ESTETICA FACIAL
        specialties_services_id: 5,
        description: 'Long Lasting es un ‘Skin Builder’ que estimula a tus células para que comiencen a producir gran cantidad de colágeno y elastina. Su fórmula es a base de un ácido hialurónico especial combinado con poderosísimos antioxidantes. Se aplica en 7 puntos estratégicos a cada lado del rostro; también puede aplicarse en cuello, escote y manos. Revitaliza tu piel, tensando, hidratando y brindándole una luz increíble a los minutos de ser aplicado. Además redensifica la piel, eliminando micro arrugas y mejorando notablemente los surcos nasogenianos. Su aplicación es rápida e indolora y sólo se requiere 1 sesión al año gracias a su efecto de larga duración.'
    },
    {
        name: 'GOURI',
        specialties_id: 1, //ESTETICA FACIAL
        specialties_services_id: 5,
        description: 'Bioestimulador de colágeno intradérmico de policaprolactona. Su principal ventaja es su forma completamente líquida, sin micropartículas lo que permite que además de no generar volumen, que el producto se extienda y estimule la síntesis de colágeno en todo el rostro minimizando los puntos de inyección. Su aplicación es rápida y sencilla, y abarca la estimulación completa del rostro desde la frente hasta el mentón. Corrige arrugas y pliegues profundos, tensa la piel, redefine los contornos faciales, mejora la flaccidez y las cicatrices notablemente. Gouri continua estimulando la producción de colágeno propio a largo plazo. Fue elegido como el mejor bioestimulador de colágeno por los premios AMWC.'
    },
    {
        name: 'PROFHILO',
        specialties_id: 1, //ESTETICA FACIAL
        specialties_services_id: 5,
        description: 'Es el más novedoso Ácido Hialurónico de larga duración. Se utiliza para estimular la producción de colágeno, hidrata, tensa, ilumina, mejora notablemente la tonicidad, rejuveneciendo la piel, tanto de rostro, cuello, escote y manos. Su avanzada fórmula contiene la concentración mas alta de ácido Hialurónico en el mercado. Su aplicación es rápida e indolora. Se coloca en 5 puntos estratégicos a cada lado del rostro y se repite una segunda sesión a los 30 días para lograr que los efectos en tu piel se mantengan por más de un año.'
    },
    {
        name: 'HARMONYCA',
        specialties_id: 1, //ESTETICA FACIAL
        specialties_services_id: 5,
        description: 'Es el último bioestimulador que ingresó a nuestro país. Compuesto por partículas de hidroxiapatita cálcica mezcladas tecnológicamente con ácido hialurónico reticulado. Esta perfecta combinación permite tensar los tejidos del rostro de manera inmediata como también continuar con una estimulación a largo plazo. Mejora notablemente la densidad y el estado de la piel, logrando un rostro más reposiciónado y definido.'
    },
    {
        name: 'SUERO TERAPIA',
        specialties_id: 2,
        description: 'Consiste en la aplicación intravenosa de sustancias como biorreguladores, mega dosis de vitaminas, minerales, aminoácidos, enzimas y oligoelementos que reparan y rejuvenecen las células del cuerpo y neutralizan los radicales libres. Generan bienestar, optimizando la salud y el aspecto físico. Ayudan a estimular los mecanismos de defensa y a la desintoxicación, regeneración y reparación del organismo.'
    },
    {
        name: 'VACUNA ANTI AGE',
        specialties_id: 2,
        description: 'La vacuna anti age es uno de los más novedosos avances de la medicina ortomolecular, compuesta a base de un hidrolizado de células rejuvenecedoras. Tiene un poderoso efecto Anti age, Revitalizante, Antioxidante celular y Preventivo de enfermedades degenerativas. El tratamiento consiste en la aplicación de 1 dosis por semana durante 5 semanas, obteniendo resultados increíbles no solo a nivel de piel, pelo y uñas sino que también genera un gran impacto en el bienestar físico y energético.'
    },
    {
        name: 'SUPLEMENTAción',
        specialties_id: 2,
        description: 'Si bien podemos seguir una dieta muy saludable, nunca llegamos a incorporar la cantidad de nutrientes, vitaminas y minerales que idealmente nuestro cuerpo necesita; es por eso que la suplementación juega un papel importantísimo en nuestro bienestar. Para esto debemos realizar un buen diagnóstico, con análisis correspondientes definiendo qué tipo de suplementación es la ideal para cada paciente.  '
    },
    {
        name: 'PLASMA RICO EN PLAQUETAS',
        specialties_id: 2,
        description: 'Procedimiento en el cual se realiza una extracción de sangre, se centrifuga separando las células de la sangre del plasma, que es quien tiene todos los factores de crecimiento; este último se activa y se vuelve a inyectar en la zona a tratar. El protocolo ideal es realizar 3 sesiones con una frecuencia de 30 días. '
    },
    {
        name: 'PLASMA CAPILAR',
        specialties_id: 2,
        description: 'Detiene la caída del cabello y estimula al crecimiento del cabello mejorando tanto  su calidad como grosor de manera notable.'
    },
    {
        name: 'PLASMA CORPORAL',
        specialties_id: 2,
        description: 'Actúa regenerando los tejidos, mejorando notablemente estrías, flacidez cutánea y celulitis.',
    },
    {
        name: 'PLASMA EN ROSTRO, ESCOTE Y MANOS',
        specialties_id: 2,
        description: 'Otorga una luminosidad inigualable, mejora notablemente líneas de expresión, manchas y cicatrices, cierra poros y tensa la piel.'
    },
    {
        name: 'ANTROPOMETRIA',
        specialties_id: 2,
        description: 'Es un estudio de composición corporal que consiste en la medición de partes específicas del cuerpo con el fin de evaluar el estado nutriciónal de un paciente y así poder crear programas de nutrición personalizados.'
    },
    {
        name: 'NUTRIción DEPORTIVA',
        specialties_id: 2,
        description: 'Se especializa en elaborar planes de alimentación adaptados al ejercicio. Es decir, nos enfocamos en crear programas nutriciónales acorde al desgaste físico al que se somete cada paciente, logrando optimizar la composición corporal. '
    },
    {
        name: 'NUTRICIÓN ESTÉTICA',
        specialties_id: 2,
        description: 'Luego de un estudio exhaustivo de cada paciente, contamos con la información necesaria para modificar ciertos  aspectos en la alimentación y el estilo de vida; impactando positivamente en la salud intestinal, que repercute directamente en la salud de la piel, los procesos de envejecimiento y el bienestar de una persona, alargando así  su juventud.'
    },
    {
        name: 'HIPERHIDROSIS MANOS, AXILAS Y PIES',
        specialties_id: 3,
        description: 'El tratamiento para la hiperhidrosis o sudoración excesiva de axilas, manos o pies consiste en la aplicación de Botox de forma subcutánea; haciendo que disminuya notablemente la sudoración en el área tratada. Es un procedimiento seguro, sencillo, prácticamente indoloro que no requiere anestesia.'
    },
    {
        name: 'HIFU CORPORAL',
        specialties_id: 3,
        description: 'Es una novedosa tecnología que genera increíbles resultados en el retensado de los tejidos. A nivel corporal podemos trabajar zonas como brazos, abdomen, piernas, flacos y gluteos . Contamos con el equipo original en su última versión, que nos brinda resultados sumamente efectivos. La sesión dura 45 min y puede realizarse en cualquier época del año. '
    },
    {
        name: 'TRATAMIENTOS LIPOLITICOS',
        specialties_id: 3,
        description: 'Tratamiento que sirve para reducir la adiposidad localizada en áreas del cuerpo como abdomen, piernas y glúteos. Aplicamos enzimas lipolíticas en forma de micro inyecciónes que actúan disolviendo las células de grasa en forma segura, rápida y efectiva. Los resultados se ven a los 15 días de la primera sesión evaluando en esa etapa si son necesarias más sesiones.'
    },
    {
        name: 'LIMPIEZA DENTAL',
        specialties_id: 4,
        specialties_services_id: 6,
        description: 'Mediante un equipo de ultrasonido desprendemos placa bacteriana, manchas y sarro que se acumulan sobre las piezas dentarias con el paso del tiempo. La frecuencia sugerida para realizarla es entre 4 a 6 meses.'
    },
    {
        name: 'BLANQUEAMIENTO DENTAL',
        specialties_id: 4,
        specialties_services_id: 6,
        description: 'Lo realizamos mediante una técnica combinada. Consiste en una sesión en nuestra clinica en la que colocamos un gel blanqueador sobre las piezas dentarias que es activado por una luz láser durante el periodo de 1 hora; al finalizar te entregamos unas cubetas confecciónadas a medida, junto a otro producto blanqueador para continuar el tratamiento en tu hogar 1 semana 2 horas al día. Este sistema de blanqueamiento de última generación no causa sensibilidad y protege la integridad del esmalte en su totalidad. Al ser progresivo nos permite llegar al color ideal y tener una larga duración en el tiempo.'
    },
    {
        name: 'ORTODONCIA',
        specialties_id: 4,
        specialties_services_id: 6,
        description: 'Invisalign es la ortodoncia invisible con mejores resultados finales comprobados en el mercado; finaliza los casos con mayor rapidez que cualquier otro tipo de ortodoncia y permite trabajar desde casos simples hasta casos muy complejos. Para comenzar el tratamiento se realiza un escaneo digital de la boca, se toman fotos y medidas del paciente los cuales son enviados a un laboratorio en California; a los 30 días recibimos el sistema completo de alineadores en Argentina. Los tratamientos están terminados en promedio entre 5 y 11 meses en la mayoría de los casos (con una rapidez mucho mayor a los brackets). Es sin duda el método más cómodo, rápido y estético de alinear tus piezas dentarias.'
    },
    {
        name: 'ENDODONCIA',
        specialties_id: 4,
        specialties_services_id: 6,
        description: 'Conocido comúnmente como “tratamiento de conducto”; tiene como finalidad preservar las piezas dentales dañadas, evitando su pérdida. Para ello, se extrae la pulpa dental y la cavidad resultante, se rellena y sella con material  biocompatible, avistando así una extracción dentaria.'
    },
    {
        name: 'PERIODONCIA',
        specialties_id: 4,
        specialties_services_id: 6,
        description: 'Consiste en la preservación y tratamiento de los tejidos que protegen y rodean nuestros dientes: encía, hueso, ligamento periodontal y raíz. Se lleva a cabo mediante limpiezas dentarias profundas para tratar gingivitis (encías sangrantes) o periodontitis. También  incluye recortes o injertos de encías según sea necesario.'
    },
    {
        name: 'IMPLANTES DENTALES',
        specialties_id: 4,
        specialties_services_id: 6,
        description: 'Un Implante dental es un tornillo de titanio que se coloca dentro del hueso para reemplazar la raíz de una pieza dentaria perdida. Se realiza mediante una cirugía simple y generalmente se espera un periodo de 3 meses para la colocación de la corona de porcelana o prótesis. Es el tiempo biológico en que tarda en calcificarse el hueso alrededor del implante. Durante ese periodo el paciente estará estéticamente disimulado con un provisorio. La cirugía es totalmente ambulatoria y permite devolver de una manera rápida y simple tanto la estética como la función masticatoria.'
    },
    {
        name: 'PLACA DE RELAJAción',
        specialties_id: 4,
        specialties_services_id: 7,
        description: 'Es un dispositivo removible de acrílico que confecciónamos a medida del paciente y tiene ciertas características que ayudan a atenuar el Bruxismo protegiendo las piezas dentarias y la articulación temporomandibular.'
    },
    {
        name: 'BOTOX®️ BRUXISMO',
        specialties_id: 4,
        specialties_services_id: 7,
        description: 'El tratamiento de Bruxismo con Botox®️ es hoy en día el tratamiento más efectivo que lo solucióna. Consiste en la colocación de Botox®️ en los músculos que lo provocan haciendo que se relajen y se produzca indefectiblemente un gran alivio, de esta forma evitamos desgastes y roturas dentarias, dolores articulares, de cabeza, oido, y contracturas cervicales asociadas al Bruxismo. La aplicación se lleva a cabo en tan solo unos minutos, y el efecto de relajación comienza a sentirse de 24 a 48 hs de la aplicación.'
    },
    {
        name: 'CARILLAS DE RESINA',
        specialties_id: 4,
        specialties_services_id: 8,
        description: 'Se realizan en una sola sesión en el consultorio, siempre recomendamos una limpieza y blanqueamiento previo para unificar colores. No requieren desgaste dentario y nos permiten corregir color, forma y textura de los dientes en el acto. También sirven para corregir fracturas y mal posiciónes dentarias leves. Requieren de un mantenimiento de pulido cada 6 meses para mantener su color.'
    },
    {
        name: 'CARILLAS DE PORCELANA',
        specialties_id: 4,
        specialties_services_id: 8,
        description: 'Las carillas de porcelana que realizamos son unas carillas del tipo “lente de contacto”, muy delgadas que nos permiten evitar desgastes dentarios. Para realizarlas hacemos siempre un diseño de sonrisa previo planificando la anatomía dentaria ideal en cada caso. El  resultado es una sonrisa en perfecta armonía con el rostro que denota total naturalidad.   Una de sus grandes ventajas es que no se pigmentan y se ven como dientes naturales.'
    },
    {
        name: 'REHABILITAción ORAL',
        specialties_id: 4,
        specialties_services_id: 8,
        description: 'Consiste en un tratamiento bucal integral mediante prótesis fijas, removibles, implantes dentales y ajustes de oclusión. Todo el proceso comienza con un diagnóstico completo de la boca del paciente con la finalidad de devolver salud, estética y funciónalidad.'
    },
]

module.exports = { specialties, specialties_services, treatments }