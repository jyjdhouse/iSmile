const specialties = [
    {
        id: 1,
        name: 'Estética facial',
        src: '/img/servicios1.jpg',
    },
    {
    
        id: 2,
        name: 'Medicina Regenerativa',
         src: '/img/servicios2.jpg',
    },
    {
        id: 3,
        name: 'Estética corporal',
        src: '/img/servicios3.jpg',
    },
    {
        id: 4,
        name: 'ODONTOLOGIA',
        src: '/img/servicios4.jpg'
    }
]

const specialties_services = [
    {
        id: 1,
        specialty_id: 1,
        name: 'Armonización facial',
        treatments: true,
        description: 'La percepción de un rostro bello, armónico y natural depende fundamentalmente de las proporciones de una parte de nuestro rostro en relación con otra.',
    },
    {
        id: 2,
        specialty_id: 1,
        name: 'BOTOX®️',
        treatments: true,
        description: 'Uno de los tratamientos con más demanda a nivel mundial, del que podemos beneficiarnos en sus múltiples usos.',
    },
    {
        id: 3,
        specialty_id: 1,
        name: 'COSMETOLOGIA',
        treatments: true,
        description: 'La piel que siempre soñaste está mucho más cerca de lo que te imaginas.',
    },
    {
        id: 4,
        specialty_id: 1,
                name: 'TRATAMIENTO DE PAPADA',
                treatments: true,
                description: 'Una de las zonas que todos queremos mejorar. Siempre con la cabeza en alto y con la ayuda de los tratamientos adecuados en cada caso obtenemos esos resultados que tanto buscamos.',
    },
    {
        id: 5,
        specialty_id: 1,
        name: 'BIOESTIMULADORES',
        treatments: true,
        description: 'Llegaron para quedarse! Representan los últimos avances en estética facial que todos queremos. Sin aportar volumen estimulan potentemente a nuestras células para que produzcan grandes cantidades de colageno.',
    },
    {
        id: 6,
        name: 'SUERO TERAPIA',
        treatments: false,
        specialty_id: 2,
        description: 'Consiste en la aplicación intravenosa de sustancias como biorreguladores, mega dosis de vitaminas, minerales, aminoácidos, enzimas y oligoelementos que reparan y rejuvenecen las células del cuerpo y neutralizan los radicales libres. Generan bienestar, optimizando la salud y el aspecto físico. Ayudan a estimular los mecanismos de defensa y a la desintoxicación, regeneración y reparación del organismo.'
    },
    {
        id: 7,
        name: 'VACUNA ANTI AGE',
        treatments: false,
        specialty_id: 2,
        description: 'La vacuna anti age es uno de los más novedosos avances de la medicina ortomolecular, compuesta a base de un hidrolizado de células rejuvenecedoras. Tiene un poderoso efecto Anti age, Revitalizante, Antioxidante celular y Preventivo de enfermedades degenerativas. El tratamiento consiste en la aplicación de 1 dosis por semana durante 5 semanas, obteniendo resultados increíbles no solo a nivel de piel, pelo y uñas sino que también genera un gran impacto en el bienestar físico y energético.'
    },
    {
        id: 8,
        name: 'SUPLEMENTACION',
        treatments: false,
        specialty_id: 2,
        description: 'Si bien podemos seguir una dieta muy saludable, nunca llegamos a incorporar la cantidad de nutrientes, vitaminas y minerales que idealmente nuestro cuerpo necesita; es por eso que la suplementación juega un papel importantísimo en nuestro bienestar. Para esto debemos realizar un buen diagnóstico, con análisis correspondientes definiendo qué tipo de suplementación es la ideal para cada paciente.  '
    },
    {
        id: 9,
        name: 'PLASMA RICO EN PLAQUETAS',
        treatments: false,
        specialty_id: 2,
        description: 'Procedimiento en el cual se realiza una extracción de sangre, se centrifuga separando las células de la sangre del plasma, que es quien tiene todos los factores de crecimiento; este último se activa y se vuelve a inyectar en la zona a tratar. El protocolo ideal es realizar 3 sesiones con una frecuencia de 30 días. '
    },
    {
        id: 10,
        name: 'PLASMA CAPILAR',
        treatments: false,
        specialty_id: 2,
        description: 'Detiene la caída del cabello y estimula al crecimiento del cabello mejorando tanto  su calidad como grosor de manera notable.'
    },
    {
        id: 11,
        name: 'PLASMA CORPORAL',
        treatments: false,
        specialty_id: 2,
        description: 'Actúa regenerando los tejidos, mejorando notablemente estrías, flacidez cutánea y celulitis.',
    },
    {
        id: 12,
        name: 'PLASMA EN ROSTRO, ESCOTE Y MANOS',
        treatments: false,
        specialty_id: 2,
        description: 'Otorga una luminosidad inigualable, mejora notablemente líneas de expresión, manchas y cicatrices, cierra poros y tensa la piel.'
    },
    {
        id: 13,
        name: 'ANTROPOMETRIA',
        treatments: false,
        specialty_id: 2,
        description: 'Es un estudio de composición corporal que consiste en la medición de partes específicas del cuerpo con el fin de evaluar el estado nutricional de un paciente y así poder crear programas de nutrición personalizados.'
    },
    {
        id: 14,
        name: 'NUTRICION DEPORTIVA',
        treatments: false,
        specialty_id: 2,
        description: 'Se especializa en elaborar planes de alimentación adaptados al ejercicio. Es decir, nos enfocamos en crear programas nutricionales acorde al desgaste físico al que se somete cada paciente, logrando optimizar la composición corporal. '
    },
    {
        id: 15,
        name: 'NUTRICIÓN ESTÉTICA',
        treatments: false,
        specialty_id: 2,
        description: 'Luego de un estudio exhaustivo de cada paciente, contamos con la información necesaria para modificar ciertos  aspectos en la alimentación y el estilo de vida; impactando positivamente en la salud intestinal, que repercute directamente en la salud de la piel, los procesos de envejecimiento y el bienestar de una persona, alargando así  su juventud.'
    },
    {
        id: 16,
        name: 'HIPERHIDROSIS MANOS, AXILAS Y PIES',
        treatments: false,
        specialty_id: 3,
        description: 'El tratamiento para la hiperhidrosis o sudoración excesiva de axilas, manos o pies consiste en la aplicación de Botox de forma subcutánea; haciendo que disminuya notablemente la sudoración en el área tratada. Es un procedimiento seguro, sencillo, prácticamente indoloro que no requiere anestesia.'
    },
    {
        id: 17,
        treatments: false,
        name: 'HIFU CORPORAL',
        specialty_id: 3,
        description: 'Es una novedosa tecnología que genera increíbles resultados en el retensado de los tejidos. A nivel corporal podemos trabajar zonas como brazos, abdomen, piernas, flacos y gluteos . Contamos con el equipo original en su última versión, que nos brinda resultados sumamente efectivos. La sesión dura 45 min y puede realizarse en cualquier época del año. '
    },
    {
        id: 18,
        name: 'TRATAMIENTOS LIPOLITICOS',
        treatments: false,
        specialty_id: 3,
        description: 'Tratamiento que sirve para reducir la adiposidad localizada en áreas del cuerpo como abdomen, piernas y glúteos. Aplicamos enzimas lipolíticas en forma de micro inyecciones que actúan disolviendo las células de grasa en forma segura, rápida y efectiva. Los resultados se ven a los 15 días de la primera sesión evaluando en esa etapa si son necesarias más sesiones.'
    },
    {
        id: 19,
        name: 'ODONTOLOGIA GENERAL',
        treatments: false,
        specialty_id: 4,
        description: 'Todos deberíamos saber el bien que una simple sonrisa puede hacer.'
    },
    {
        id: 20,
        name: 'TRATAMIENTO DE BRUXISMO',
        treatments: false,
        specialty_id: 4,
        description: 'El Bruxismo es el apretamiento o rechinamiento de los dientes que se realiza tanto de forma consciente como inconsciente; y afecta a una gran parte de la población.',
    },
    {
        id: 21,
        name: 'DISEÑO DE SONRISA',
        treatments: false,
        specialty_id: 4,
        description: 'Para comenzar realizamos un estudio completo del rostro del paciente tomando medidas dentarias y faciales, escaneo digital de la boca y fotografías. Mediante esta información podremos definir el largo, ancho y anatomía ideal de cada uno de sus dientes en perfecta relación a al rostro y a sus labios. Toda esta información es enviada al laboratorio quien confeccionará una impresión digital del modelo de la boca con la forma exacta del diseño realizado, que será probado en el paciente mediante un material provisorio para visualizar el agrado del diseño. Y en base al mismo proceder a confeccionar las carillas.  '
    }
]

const service_treatments = [
    {
        id: 1,
        specialty_id: 1,
        name: 'B-UP',
        description: 'Es una novedosa técnica realizada con acido hialuronico que consiste en trabajar sobre áreas específicas de la región temporal a nivel del cuero cabelludo, con el objetivo de lograr un reposicionamiento de los tejidos elevándolos  en contra de los vectores de envejecimiento logrando una notable mejoría del rostro, sin cambiar las facciones del mismo.'
    },
    {
        id: 2,
        specialty_id: 1,
        name: 'OJERAS',
        description: 'El relleno de ojeras se realiza con un ácido hialurónico especial para esa zona, corrige el surco palpebromalar hundido mejorando el aspecto de un rostro aparentemente cansado. Se realiza en una sola sesión y tiene una duración entre 12 a 18 meses. El procedimiento es  prácticamente indoloro y el resultado es inmediato.'
    },
    {
        id: 3,
        specialty_id: 1,
        name: 'POMULOS',
        description: 'Mediante la aplicación de ácido hialurónico podemos crear una estructura de mejillas equilibrada logrando elevación, contorno y definición. Los pómulos en una mujer están asociados con el atractivo facial, un contorno suave y curvo transmite salud y juventud. La estructura fuerte y definida de las mejillas en un hombre se asocia con la masculinidad y el atractivo. La técnica que utilizamos al trabajar sobre pómulos también tiene como objetivo generar puntos de tensión que ayudan a reposicionar tejidos y así reducir los surcos nasogenianos y a suavizar indirectamente ojeras. logrando un rostro más definido, estilizado y atractivo.'
    },
    {
        id: 4,
        specialty_id: 1,
        name: 'TEMPORALES',
        description: 'La pérdida de volumen en la frente y en las sienes durante el proceso de envejecimiento conduce al descenso de las cejas y tiene un impacto negativo en áreas más distantes como las ojeras. Mediante los rellenos de AH devolvemos el volumen perdido en las sienes y la frente logrando un contorno más juvenil y proporcionando apoyo para levantar las cejas naturalmente. Es ideal combinar este tratamiento con BOTOX®️ para reducir sustancialmente la aparición de arrugas y terminar de dar una elevación natural a las cejas.'

    },
    {
        id: 5,
        specialty_id: 1,
        name: 'RINOMODELACION',
        description: 'Utilizamos un acido hialuronico de altísima calidad con una densidad específica para este área, permitiéndonos rectificar y definir el dorso de la nariz para una apariencia más suave, así como para levantar la punta nasal, con resultados potencialmente transformadores. El tratamiento se realiza en una sola sesión y es totalmente ambulatorio, los resultados se ven en el momento, sin hematomas postoperatorios o molestias.'
    },
    {
        id: 6,
        specialty_id: 1,
        name: 'SURCO NASOGENIANO',
        description: 'Para tratar el surco nasogeniano nos basamos en el estudio de vectores de envejecimiento y reposicionamiento de los tejidos. Para mejorar el surco nasogeniano colocamos ácido hialurónico en áreas específicas de pomulos, no para aportar volumen sino para producir el repocisionamiento facial logrando la mejoría del surco indirectamente y obteniendo como resultado un rostro fresco, natural y armónico.'
    },
    {
        id: 7,
        specialty_id: 1,
        name: 'LABIOS',
        description: 'Previo al tratamiento realizaremos un diseño donde vamos a evaluar tu anatomía, edad, y expectativas para lograr resultados que se ajusten perfectamente a tus necesidades y a tu rostro. Utilizamos un ácido hialurónico con una densidad ideal para este área que nos permitirá optimizar la forma, proporción, estructura y volumen de los labios, como también elevar comisuras y corregir posibles asimetrías. También podemos tratar las "líneas de fumador" y mejorar la calidad de la piel ya que genera hidratación, aportando un resultado de labios cuidados y tersos.'
    },
    {
        id: 8,
        specialty_id: 1,
        name: 'DEFINICION MANDIBULAR',
        description: 'Utilizamos un Ácido Hialurónico de altísima calidad con una densidad específica para tratar este área. Previamente tomamos medidas y proporciones faciales para realizar el diseño correcto para cada rostro. Cabe destacar que tenemos en cuenta ángulos y proporciones muy diferentes en hombres y en mujeres. Los resultados se ven de inmediato, es un procedimiento prácticamente indoloro, y la duración es de 2 años aproximadamente. El resultado es un rostro más definido y estilizado en perfecta proporción con el resto del rostro.'
    },
    {
        id: 9,
        name: 'MENTON',
        specialty_id: 1,
        description: 'Utilizamos Ácido un Hialurónico de alta densidad para lograr un mentón bien definido con la altura y proyección ideal en cada rostro, consiguiendo un perfil armónico y un rostro más proporcionado; además nos permite mejorar la papada por tensión indirecta de la piel de la zona. Los resultados son instantáneos, es un procedimiento prácticamente indoloro, y la duración es de 2 años aproximadamente.'
    },
    {
        id: 10,
        specialty_id: 1,
        name: 'TOP MODEL LOOK',
        description: 'La técnica “Top Model Look” tiene como objetivo lograr un rostro más atractivo con un efecto ‘contouring’ mediante la definición de la zona del hueso lateral de las mejillas. Trabajamos con acido hialuronico de alta y baja densidad, consiguiendo además generar un efecto tensor.'
    },
    {
        id: 11,
        specialty_id: 1,
        name: 'MASCULINIZACION FACIAL',
        description: 'Utilizamos Ácido Hialurónico de altísima calidad con una densidad especifica para cada área del rostro; previamente tomamos medidas y proporciones faciales para realizar el diseño correcto. Trabajamos fundamentalmente en áreas claves de mejillas, mandíbula y mentón otorgando definición,  proporción y ángulos en base a una anatomía masculina ideal. Los resultados son siempre naturales y armónicos y se ven de inmediato. El procedimiento es prácticamente indoloro, y la duración es de 2 años aproximadamente.'
    },
    {
        id: 12,
        name: 'FULL FACE',
        specialty_id: 1,
        description: 'La armonización facial es un procedimiento que se basa en un diagnóstico facial completo tomando medidas y proporciones faciales para el tratamiento de múltiples áreas del rostro utilizando Ácido Hialurónico en combinación con BOTOX®️ y bioestimuladores. El principal objetivo es reequilibrar las proporciones faciales, mejorar la definición y contornos, corregir irregularidades, reducir la apariencia de arrugas y ojeras; y reactivar la producción de colageno por parte de nuestras propias células. Los tratamientos se adaptan a cada paciente para lograr la mejor version de sí mismos, con resultados SIEMPRE naturales. La armonización facial puede ser realmente transformadora, proporcionando una mejora estética sustancial de la parte media del rostro (mejillas, área de los ojos, nariz), la parte inferior (mentón, línea de la mandíbula, labios) y la parte superior (frente, sienes y cejas). Este tratamiento requiere técnicas y conceptos avanzados, con un profundo conocimiento de la anatomía facial, vectores de envejecimiento y tecnologías de productos.'
    },
    {
        id: 13,
        specialty_id: 1,
        name: 'BICHECTOMIA',
        description: 'La bichectomia es una cirugía mínimamente invasiva que se realiza una sola vez en la vida, se realiza con anestesia local en un tiempo aproximado de 30 minutos; consiste en extraer las bolsas de Bichat que son unas bolsitas de grasa encapsulada que tenemos naturalmente a cada lado de nuestras mejillas. Se realiza mediante una pequeña incisión por dentro de la mejillas y luego se cierra con un solo punto de cada lado. El resultado es un afinamiento del rostro resaltando pómulos y dejando una cara más angulosa y estética. Al ser un tipo de grasa encapsulada, no se vuelve a regenerar, manteniendo los resultados al margen de un aumento de peso.'
    },
    {
        id: 14,
        name: 'BOTOX®️ ESTETICO (FRENTE ENTRECEJO Y PATAS DE GALLO)',
        specialty_id: 2,
        description: 'Relaja de forma selectiva los grupos musculares responsables de las arrugas de expresión, ilumina los ojos y elimina el gesto de estar permanentemente preocupado, consiguiendo una mirada fresca y descansada. Tratamos siempre la región de frente, entrecejo y patas de gallo con la dosis necesaria adecuada en cada área, sin excluir ninguna de las zonas, debido a que si se trata una zona aislada surgen arrugas compensatorias en las zonas no tratadas. La aplicación se realiza en pocos minutos pudiendo comenzar a ver los resultados entre 24 a 48 horas y viendo el efecto completo a las 2 semanas de aplicación. La duración del efecto es de 6 meses aproximadamente. Los resultados que obtenemos son siempre naturales gracias a nuestra técnica de aplicación altamente especialidada y personalizada en cada paciente.'
    },
    {
        id: 15,
        name: 'BOTOX®️ PUNTA NARIZ',
        specialty_id: 2,
        description: 'En algunos pacientes podemos observar que al hablar o sonreír la punta de la nariz es traccionada hacia abajo. Esto surge por la presencia de un pequeño músculo que es inconstante  (no todos los pacientes lo tienen) que se encuentra situado en la base de la nariz y es el responsable del movimiento de la punta nasal durante la expresión y el habla del paciente. En estos casos tenemos la posibilidad de inactivar este musculo mediante la aplicación de BOTOX®️ para evitar la caída de la punta de la nariz a causa de esta tracción constante, permitiendo que la punta quede elevada durante cualquier expresión.'
    },
    {
        id: 16,
        name: 'BOTOX®️ MENTON EMPEDRADO',
        specialty_id: 2,
        description: 'En muchos pacientes podemos observar que al hablar o expresarse se produce un puntillado o empedrado en la zona de la barbilla que se debe a una hiperactividad muscular en esa área. Esto podemos solucionarlo de una manera muy sencilla aplicando una dosis adecuada de BOTOX®️ para relajar estos músculos  hiperactivos y lograr un mentón liso y agradable ante cualquier expresión.'
    },
    {
        id: 17,
        name: 'BOTOX®️ PARA TRATAMIENTO DE CICATRICES',
        specialty_id: 2,
        description: 'El tratamiento de cicatrices con BOTOX®️ es uno de los más novedosos avances que nos permite mejorar notablemente cualquier tipo de cicatriz mediante su aplicación intracicatrizal. La cantidad de sesiones dependerá del tipo de cicatriz y se realizan con un espacio de 4 semanas entre cada sesión.'
    },
    {
        id: 18,
        name: 'MESOBOTOX',
        specialty_id: 2,
        description: 'Consiste en la aplicación de múltiples pequeñas dosis de Botox en la piel de todo el rostro, con el fin reducir el tamaño de poros pronunciados, la secreción de glándulas sebáceas,  brotes y granitos, consiguiendo una piel más tersa, suave y luminosa.'
    },
    {
        id: 19,
        name: 'SONRISA GINGIVAL',
        specialty_id: 2,
        description: 'El tratamiento de sonrisa gingival con BOTOX®️ consiste en la colocación de algunas unidades de  BOTOX®️ en los músculos elevadores del labio superior, para relajarlos y evitar que el labio se suba de manera exagerada y que se muestre la cantidad justa de encía al sonreír. Logrando una sonrisa armónica y estética. En tan solo 48 hs  comienza el efecto y a las dos semanas de aplicación observamos los resultados finales.'
    },
    {
        id: 20,
        name: 'BOTOX®️ BRUXISMO',
        specialty_id: 2,
        description: 'El tratamiento de Bruxismo con Botox es hoy en día el tratamiento más efectivo que soluciona esta afección. Consiste en la colocación de Botox en los músculos que lo provocan haciendo que se relajen y se produzca indefectiblemente un gran alivio, de esta forma evitamos desgastes y roturas dentarias, dolores articulares, de cabeza, oído, y contracturas cervicales asociadas al Bruxismo. La aplicación se lleva a cabo en tan solo unos minutos, y el efecto de relajación comienza a sentirse a las 48 hs luego de la aplicación.'
    },
    {
        id: 21,
        name: 'LIMPIEZA FACIAL PROFUNDA',
        specialty_id: 3,
        description: 'Trabajamos con una técnica específica para mejorar la salud y la apariencia del cutis de forma global. Es el tratamiento cosmetologico más completo para el cuidado de nuestra piel. Eliminamos puntos negros y células muertas, consiguiendo que la piel respire y sean más efectivos los tratamientos subsiguientes. El resultado es una piel limpia, lisa, tersa y renovada. Incluimos en el tratamiento un  ñPeeling Químico que elegimos de forma personalizada acuerdo a los requerimientos de cada piel, también peeling mecánico con puntas de diamante, extracción de comedones y puntos negros de forma manual y con espátula ultrasónica, Ozonoterapia Frío/Calor, mascarilla Descongestiva/Nutritiva y Cabina LED.'
    },
    {
        id: 22,
        name: 'PEELING',
        specialty_id: 3,
        description: 'Realizamos peelings mecánicos, con puntas de diamante y químicos, con diferentes tipos de ácidos de acuerdo a los requerimientos de cada piel. La combinación de ambos nos brinda resultados óptimos produciendo una renovación celular, atenuando manchas y arrugas finas, dejando como resultado una piel  renovada. Trabajamos con “peelings inteligentes” que pueden ser realizados en cualquier época del año. En cada sesión se realiza una limpieza, exfoliación, peeling con Punta de diamente, peeling con el ácido específico según la problemática a tratar y finalizamos con una mascarilla descongestiva y nutritiva elegida para cada caso en particular.'
    },
    {
        id: 23,
        name: 'OZONOTERAPIA',
        specialty_id: 3,
        description: 'El ozono estimula el colágeno, la elastina, es antioxidante y restablece la circulación sanguínea, tiene efecto desinfectante, neutraliza las bacterias de la piel. Gracias a este tratamiento facial cerramos los poros de la piel y mejoramos las manchas.'
    },
    {
        id: 24,
        name: 'EXTRACCION DE COMEDONES',
        specialty_id: 3,
        description: 'Procedimiento no agresivo ni invasivo, destinado a mejorar el aspecto de la piel, corregir la dilatación de los poros, eliminar las células más superficiales y extraer los famosos "puntos o negros” o “barritos" (en dermatología denominados "comedones") y microquistes que se van acumulando con el tiempo.'
    },
    {
        id: 25,
        name: 'MASCARA LED',
        specialty_id: 3,
        description: 'Terapia de luz que ayuda al rejuvenecimiento cutáneo con grandes resultados a la hora de reafirmar la piel y tonificar los músculos faciales. Su luz, penetra en la capa de la dermis activando el metabolismo de las células.'
    },
    {
        id: 26,
        name: 'JELLY MASK',
        specialty_id: 3,
        description: 'Mascarillas faciales para el cuidado de la piel que se proporcionan en forma de polvo que toma su forma de mascarilla al agregar agua purificada. Crea una capa oclusiva, lo que fuerza la hidratación y empuja todos los nutrientes beneficiosos profundamente en la piel, lo que aumenta la efectividad del procedimiento.'
    },
    {
        id: 27,
        name: 'DERMAPLANING',
        specialty_id: 3,
        description: 'Método de exfoliación físico que consiste en utilizar un bisturí para eliminar suavemente la capa superior de la piel constituida por células muertas como también el vello o pelusa facial, con el fin de revelar una tez más brillante y suave.'
    },
    {
        id: 28,
        name: 'MASAJE FACIAL',
        specialty_id: 3,
        description: 'Tratamiento de belleza que abarca un conjunto de técnicas basadas en manipulaciones manuales sobre el cutis. Por lo general, se realizan pequeños movimientos sobre el rostro, aplicando diferentes grados de intensidad, superficial o profunda.'
    },
    {
        id: 29,
        name: 'LASER NORDLYS',
        specialty_id: 3,
        description: 'Láser no invasivo de una altísima capacidad rejuvenecedora que te permite continuar con tus actividades de inmediato. En muy pocas sesiones logramos cambios increíbles en la piel logrando un rejuvenecimiento 360* trabajando manchas, telangectasias, rosácea, arañitas, microarrugas, cicatrices de acné, acné activo y estimulando la producción de colageno y elastina de tu piel. Logra un rejuveneccimiento integral de la piel, mejorando la tonalidad y la textura, dando un aspecto brillante y más joven de forma segura y con resultados desde la primera sesión. Podemos utilizarlo en rostro, cuello, manos y escote.'
    },
    {
        id: 30,
        name: 'LIPOLISIS ENZIMATICA DE PAPADA',
        specialty_id: 4,
        description: 'Tratamiento donde aplicamos enzimas lipolíticas especiales para esta zona en forma de micro inyecciones.Eliminan el tejido adiposo disolviendo las células de grasa en forma segura, rápida y altamente efectiva. Los resultados se ven a los 15 días de la primera sesión evaluando en esa etapa si son necesarias más sesiones.'
    },
    {
        id: 31,
        name: 'HIFU PAPADA',
        specialty_id: 4,
        description: 'Tecnología no invasiva más efectiva del mercado para la flaccidez de la piel. Indicado también para reducir adiposidad localizada. Genera un efecto tensor ayudando además a definir el contorno facial.'
    },
    {
        id: 32,
        name: 'RADIESSE',
        description: 'Radiesse es un bioestimulador ideal para corregir los signos de envejecimiento facial y redefinir el contorno del rostro, de manera segura, ambulatoria y sin ninguna cirugía. No se utiliza como material de relleno sino que se aplica en puntos claves para estimular naturalmente la producción de colageno propio creando un efecto lifting. Su efecto dura aproximadamente 2 años.'
    },
    {
        id: 33,
        name: 'LONG LASTING',
        description: 'Long Lasting es un ‘Skin Builder’ que estimula a tus células para que comiencen a producir gran cantidad de colágeno y elastina. Su fórmula es a base de un ácido hialurónico especial combinado con poderosísimos antioxidantes. Se aplica en 7 puntos estratégicos a cada lado del rostro; también puede aplicarse en cuello, escote y manos. Revitaliza tu piel, tensando, hidratando y brindándole una luz increíble a los minutos de ser aplicado. Además redensifica la piel, eliminando micro arrugas y mejorando notablemente los surcos nasogenianos. Su aplicación es rápida e indolora y sólo se requiere 1 sesión al año gracias a su efecto de larga duración.'
    },
    {
        id: 34,
        name: 'GOURI',
        description: 'Bioestimulador de colágeno intradérmico de policaprolactona. Su principal ventaja es su forma completamente líquida, sin micropartículas lo que permite que además de no generar volumen, que el producto se extienda y estimule la síntesis de colágeno en todo el rostro minimizando los puntos de inyección. Su aplicación es rápida y sencilla, y abarca la estimulación completa del rostro desde la frente hasta el mentón. Corrige arrugas y pliegues profundos, tensa la piel, redefine los contornos faciales, mejora la flaccidez y las cicatrices notablemente. Gouri continua estimulando la producción de colágeno propio a largo plazo. Fue elegido como el mejor bioestimulador de colágeno por los premios AMWC.'
    },
    {
        id: 35,
        name: 'PROFHILO',
        description: 'Es el más novedoso Ácido Hialurónico de larga duración. Se utiliza para estimular la producción de colágeno, hidrata, tensa, ilumina, mejora notablemente la tonicidad, rejuveneciendo la piel, tanto de rostro, cuello, escote y manos. Su avanzada fórmula contiene la concentración mas alta de ácido Hialurónico en el mercado. Su aplicación es rápida e indolora. Se coloca en 5 puntos estratégicos a cada lado del rostro y se repite una segunda sesión a los 30 días para lograr que los efectos en tu piel se mantengan por más de un año.'
    },
    {
        id: 36,
        name: 'HARMONYCA',
        description: 'Es el último bioestimulador que ingresó a nuestro país. Compuesto por partículas de hidroxiapatita cálcica mezcladas tecnológicamente con ácido hialurónico reticulado. Esta perfecta combinación permite tensar los tejidos del rostro de manera inmediata como también continuar con una estimulación a largo plazo. Mejora notablemente la densidad y el estado de la piel, logrando un rostro más reposicionado y definido.'
    }
]

module.exports = {specialties, specialties_services, service_treatments}