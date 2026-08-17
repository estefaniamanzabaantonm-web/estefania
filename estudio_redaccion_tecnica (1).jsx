import { useState, useEffect, useCallback } from "react";

// ============================================================
// DATA
// ============================================================

const SOLECISMOS = [
  { incorrecto: "Me aficioné de la poesía.", correcto: "Me aficioné a la poesía." },
  { incorrecto: "El padre consintió a los caprichos de su hija.", correcto: "El padre consintió con los caprichos de su hija." },
  { incorrecto: "Detestemos la mentira.", correcto: "Detestemos de la mentira." },
  { incorrecto: "Optar el título de profesional.", correcto: "Optar al título de profesional." },
  { incorrecto: "Debemos solicitar permiso a nuestros padres.", correcto: "Debemos solicitar permiso de nuestros padres." },
  { incorrecto: "Los soldados ingresaron a campo enemigo.", correcto: "Los soldados ingresaron en campo enemigo." },
  { incorrecto: "Se arrienda esta casa con o sin agua caliente.", correcto: "Se arrienda esta casa con agua caliente o sin ella." },
  { incorrecto: "Problemas a resolver.", correcto: "Problemas que se resolverán." },
  { incorrecto: "Aquella casa está en venta.", correcto: "Aquella casa está de venta." },
  { incorrecto: "Apresaron a Luis y a Pedro.", correcto: "Apresaron a Luis y Pedro." },
  { incorrecto: "Actuaremos en base a los informes recibidos.", correcto: "Actuaremos sobre la base de los informes recibidos." },
  { incorrecto: "Inés está media mala.", correcto: "Inés está medio mala." },
  { incorrecto: "Llegó una caja conteniendo libros.", correcto: "Llegó una caja que contiene libros." },
  { incorrecto: "¡Cuánto le debo a ellos!", correcto: "¡Cuánto les debo a ellos!" },
  { incorrecto: "Yo no le maltraté a ella.", correcto: "Yo no la maltraté a ella." },
  { incorrecto: "Este es el hombre del cual te hablé.", correcto: "Este es el hombre del quien te hablé." },
  { incorrecto: "No lo acepto bajo ese punto de vista.", correcto: "No lo acepto desde ese punto de vista." },
  { incorrecto: "No acostumbro a gritar así.", correcto: "No acostumbro gritar así." },
  { incorrecto: "A lo mejor se muere.", correcto: "A lo peor se muere." },
  { incorrecto: "Hoy lo llamaron para que venga a declarar.", correcto: "Hoy lo llaman para que venga a declarar." },
  { incorrecto: "Vengo visitando a un amigo.", correcto: "Vengo de visitar a un amigo." },
  { incorrecto: "Haga breve el trabajo, que perdemos tiempo.", correcto: "Haga pronto el trabajo, que perdemos tiempo." },
  { incorrecto: "La monjita está media loca.", correcto: "La monjita está medio loca." },
  { incorrecto: "Enseña a primero y segundo grado.", correcto: "Enseña a primero y segundo grados." },
  { incorrecto: "Compré medias de mujer negras.", correcto: "Compré medias negras para mujer." },
  { incorrecto: "Hubieron reuniones en la universidad.", correcto: "Hubo reuniones en la universidad." },
  { incorrecto: "Habrán bonitas navidades para los niños.", correcto: "Habrá bonitas navidades para los niños." },
  { incorrecto: "Se vende botellas vacías.", correcto: "Se venden botellas vacías." },
  { incorrecto: "Se premiaron a los jugadores de la selección.", correcto: "Se premió a los jugadores de la selección." },
  { incorrecto: "Juan, estoy seguro de que es así.", correcto: "Juan, estoy seguro que es así." },
  { incorrecto: "Véndame una tela color verde.", correcto: "Véndame una tela de color verde." },
  { incorrecto: "En esta fábrica se trabaja día y noche.", correcto: "En esta fábrica se trabaja de día y de noche." },
  { incorrecto: "Creo de que tienes visita.", correcto: "Creo que tienes visita." },
  { incorrecto: "Debemos de irnos temprano a casa.", correcto: "Debemos irnos temprano a casa." },
  { incorrecto: "Descubrí el ganado, cuyo ganado fue robado.", correcto: "Descubrí el ganado, que fue robado." },
  { incorrecto: "Ahí está el médico del que te hablé.", correcto: "Ahí está el médico de quien te hablé." },
  { incorrecto: "Traje el dinero, cuyo dinero es mío.", correcto: "Traje el dinero, el cual es mío." },
  { incorrecto: "Usted les ha visto sin duda.", correcto: "Usted los (las) ha visto sin duda." },
  { incorrecto: "Yo la llamo a ella.", correcto: "Yo la llamo." },
  { incorrecto: "Le tengo recelo a los compañeros del aula.", correcto: "Les tengo recelo a los compañeros del aula." },
  { incorrecto: "Ella es menor que mí.", correcto: "Ella es menor que yo." },
  { incorrecto: "Tienes que asar en el fuego.", correcto: "Tienes que asar al fuego." },
  { incorrecto: "No acostumbro a pedir favores.", correcto: "No acostumbro pedir favores." },
  { incorrecto: "Debemos escapar al peligro.", correcto: "Debemos escapar del peligro." },
  { incorrecto: "La fábrica está cerca a la casa.", correcto: "La fábrica está cerca de la casa." },
  { incorrecto: "Pienso de que iría.", correcto: "Pienso que iría." },
  { incorrecto: "José, acuérdate de que ofreciste.", correcto: "José, acuérdate que ofreciste." },
  { incorrecto: "Lleva presentes mis recuerdos de familia.", correcto: "Lleva presente mis recuerdos de familia." },
  { incorrecto: "Le pido a ustedes que dejen de molestar.", correcto: "Les pido a ustedes que dejen de molestar." },
  { incorrecto: "Estas son las cosas de que buscamos.", correcto: "Estas son las cosas que buscamos." },
  { incorrecto: "Si, ya le compré.", correcto: "Si, ya se lo compré." },
  { incorrecto: "Hay tardes demasiadas frías.", correcto: "Hay tardes demasiado frías." },
  { incorrecto: "Me alegro lo alegre que están tus hijos.", correcto: "Me alegro lo alegres que están tus hijos." },
  { incorrecto: "El vicio y la pereza corrompe la vida del humano.", correcto: "El vicio y la pereza corrompen la vida del humano." },
  { incorrecto: "Eso y llegar tarde lo perjudicarán en los estudios.", correcto: "Eso y llegar tarde lo perjudica en los estudios." },
  { incorrecto: "Sufrir y luchar forjan caracteres en el joven.", correcto: "Sufrir y luchar forja caracteres en el joven." },
  { incorrecto: "El almacén está cerca a la iglesia.", correcto: "El almacén está cerca de la iglesia." },
  { incorrecto: "Tiene problemas que resolver.", correcto: "Tiene problemas por resolver." },
  { incorrecto: "Tú eres de los que ayudas.", correcto: "Tú eres de los que ayudan." },
  { incorrecto: "Lo que es yo no le creo.", correcto: "Lo que soy yo no le creo." },
  { incorrecto: "Organizaron la rifa a beneficio de los niños.", correcto: "Organizaron la rifa en beneficio de los niños." },
  { incorrecto: "Está autorizado a no asistir al evento.", correcto: "Está autorizado para no asistir al evento." },
  { incorrecto: "Tiene dolor a los oídos.", correcto: "Tiene dolor de/en los oídos." },
  { incorrecto: "Tiene muchos asuntos a tratar.", correcto: "Tiene muchos asuntos por tratar." },
  { incorrecto: "Pelea de comadres.", correcto: "Pelea entre comadres." },
  { incorrecto: "¡Póngase de rodillas!", correcto: "¡Póngase en rodillas!" },
  { incorrecto: "La casa está de venta.", correcto: "La casa está en venta." },
  { incorrecto: "Cumplo en decírtelo.", correcto: "Cumplo con decírtelo." },
  { incorrecto: "Se ha registrado un alza en los precios.", correcto: "Se ha registrado un alza de los precios." },
  { incorrecto: "Esto es en relación al problema.", correcto: "Esto es con relación al problema." },
  { incorrecto: "Mi tío tiene suerte en todo.", correcto: "Mi tío tiene suerte para todo." },
  { incorrecto: "El joven dice mucho en pocas palabras.", correcto: "El joven dice mucho con pocas palabras." },
  { incorrecto: "Salí en dirección a Riobamba.", correcto: "Salí con dirección a Riobamba." },
  { incorrecto: "Acostumbro a leer en la noche.", correcto: "Acostumbro a leer por la noche." },
  { incorrecto: "Compré un jarabe para la tos.", correcto: "Compré un jarabe contra la tos." },
  { incorrecto: "Tardó para comprender el tema.", correcto: "Tardó en comprender el tema." },
  { incorrecto: "Me marcho por siempre.", correcto: "Me marcho para siempre." },
  { incorrecto: "A esos jóvenes, basta con verlos.", correcto: "A esos jóvenes, basta verlos." },
  { incorrecto: "Se emociona con los elogios.", correcto: "Se emociona por los elogios." },
  { incorrecto: "El bus da vuelta hasta la esquina.", correcto: "El bus da vuelta en la esquina." },
  { incorrecto: "Todo lo deja hasta otro día.", correcto: "Todo lo deja para otro día." },
  { incorrecto: "De acuerdo a lo que se habló.", correcto: "De acuerdo con lo que se habló." },
  { incorrecto: "Ella es menor que mí.", correcto: "Ella es menor que yo." },
  { incorrecto: "A Fabián le aprecio.", correcto: "A Fabián lo aprecio." },
  { incorrecto: "Por favor, córteme la carne.", correcto: "Por favor, corte la carne." },
  { incorrecto: "Esta es la doctora de la que te hablé.", correcto: "Esta es la doctora de quien te hablé." },
  { incorrecto: "Le vi que estaba en el cine.", correcto: "La/lo vi que estaba en el cine." },
];

const ADVERBIOS = [
  { incorrecto: "Está media fatigada.", correcto: "Está medio fatigada." },
  { incorrecto: "Lo hizo de pura tonta.", correcto: "Lo hizo de puro tonta." },
  { incorrecto: "Yo viajo delante tuyo.", correcto: "Yo viajo delante de ti." },
  { incorrecto: "No vino más nadie.", correcto: "No vino nadie más." },
  { incorrecto: "Detrás nuestro.", correcto: "Detrás de nosotros." },
  { incorrecto: "Háblame despacio para que no te oigan.", correcto: "Háblame bajo para que no te oigan." },
  { incorrecto: "España es bien bonita.", correcto: "España es muy bonita." },
  { incorrecto: "Álvaro se fue a su casa tristemente y silenciosamente.", correcto: "Álvaro se fue a su casa triste y silenciosamente." },
  { incorrecto: "A lo mejor te portas mal esta vez.", correcto: "A lo peor te portas mal esta vez." },
  { incorrecto: "Hace mucha calor.", correcto: "Hace mucho calor." },
  { incorrecto: "María trabaja bien lejos.", correcto: "María trabaja muy lejos." },
  { incorrecto: "Lo encontró abajo de la mesa.", correcto: "Lo encontró debajo de la mesa." },
  { incorrecto: "Fue ahí que tropezamos.", correcto: "Fue ahí donde tropezamos." },
  { incorrecto: "Fue entonces que le conté.", correcto: "Fue entonces cuando le conté." },
  { incorrecto: "Fue así que sucedió.", correcto: "Fue así como sucedió." },
  { incorrecto: "Lo hizo de pura envidiosa.", correcto: "Lo hizo de puro envidiosa." },
  { incorrecto: "Generalmente llego temprano a casa.", correcto: "Por lo general llego temprano a casa." },
  { incorrecto: "Evidentemente se lo sancionó.", correcto: "Sin lugar a dudas se lo sancionó." },
  { incorrecto: "Golpeaba la puerta insistentemente.", correcto: "Golpeaba la puerta con insistencia." },
  { incorrecto: "Afortunadamente no se accidentó.", correcto: "Por suerte (por fortuna) no se accidentó." },
  { incorrecto: "Los niños son demasiados despiertos.", correcto: "Los niños son demasiado despiertos." },
  { incorrecto: "Eres demasiada graciosa.", correcto: "Eres demasiado graciosa." },
  { incorrecto: "El avión pasó bien rápido.", correcto: "El avión pasó muy rápido." },
  { incorrecto: "Julieta es bien inteligente.", correcto: "Julieta es muy inteligente." },
  { incorrecto: "Mi muñeca es más mejor.", correcto: "Mi muñeca es la mejor." },
  { incorrecto: "Gritaron de puros engreídos.", correcto: "Gritaron de puro engreídos." },
  { incorrecto: "No, Aníbal también no irá a la fiesta.", correcto: "No, Aníbal tampoco irá a la fiesta." },
  { incorrecto: "Mi amigo vive al frente de ese edificio.", correcto: "Mi amigo vive enfrente de ese edificio." },
  { incorrecto: "Hoy me tocó examen de matemáticas.", correcto: "Hoy me toca examen de matemáticas." },
  { incorrecto: "Hablaste bien mal en público.", correcto: "Hablaste muy mal en público." },
];

const LOCUCIONES = [
  { termino: "acontrario sensu", significado: "en sentido contrario" },
  { termino: "ad cautelam", significado: "como medida preventiva o cautelar" },
  { termino: "ad diem", significado: "hasta el día en que finaliza un plazo" },
  { termino: "aequitas", significado: "equidad" },
  { termino: "ad libitum", significado: 'término utilizado en música para decir "a voluntad"' },
  { termino: "ad nauseam", significado: "hasta el hastío" },
  { termino: "a priori", significado: "de antemano, sin comprobar. Se antepone a la expresión." },
  { termino: "a posteriori", significado: "después de una comprobación con la experiencia" },
  { termino: "ad hoc", significado: "para esto. Un objeto ad hoc es un objeto adecuado, a propósito." },
  { termino: "agenda", significado: "lo que hay que hacer. Hoy es el librito en el que se apuntan las ocupaciones a realizar." },
  { termino: "alea iacta est", significado: "la suerte está echada. Se utiliza cuando después de dudar mucho, se toma una decisión arriesgada." },
  { termino: "alias", significado: "de otro modo, por otro nombre. Se utiliza en abreviatura seguida de otro nombre o apodo." },
  { termino: "alter ego", significado: "otro yo, un segundo yo; persona de confianza; amigo íntimo" },
  { termino: "altius, citius, fortius", significado: "más alto, más rápido, más fuerte. Es el lema de los Juegos Olímpicos." },
  { termino: "ante meridiem (a.m.)", significado: "antes del mediodía. Se utiliza en los relojes digitales." },
  { termino: "bis", significado: "dos veces. Repetición." },
  { termino: "bona fide", significado: "buena fe" },
  { termino: "campus", significado: "campo; generalmente se utiliza para hacer referencia al terreno de una universidad." },
  { termino: "carpe diem", significado: "disfruta el día. Invitación a gozar del momento presente." },
  { termino: "casus belli", significado: "caso o motivo de guerra. Se aplica a lo que es motivo de conflicto internacional o de disgusto entre particulares." },
  { termino: "cogito, ergo sum", significado: "pienso, luego existo. Frase del filósofo francés Descartes." },
  { termino: "conditio sine qua non", significado: "condición indispensable" },
  { termino: "corpus delicti", significado: "cuerpo del delito" },
  { termino: "curriculum vitae", significado: "carrera de la vida. Resumen de los méritos, cualidades o circunstancias de una persona. Suele exigirse al solicitar un trabajo." },
  { termino: "de incógnito", significado: "sin que nadie lo reconozca" },
  { termino: "deficit", significado: "falta; cantidad que falta" },
  { termino: "dura lex, sed lex", significado: "la ley es dura, pero es la ley. Hay que cumplir con el deber, aunque sea difícil." },
  { termino: "etcétera", significado: "y lo demás" },
  { termino: "ex consensu", significado: "por acuerdo o consenso entre las partes" },
  { termino: "ex abrupto", significado: "inesperadamente, bruscamente" },
  { termino: "ex aequo", significado: "por igual; con igual mérito" },
  { termino: "ex professo", significado: "deliberadamente, a propósito" },
  { termino: "grosso modo", significado: "a grandes rasgos, en general" },
  { termino: "habeas corpus", significado: "que tengas tu cuerpo para exponer, libre. Es un derecho fundamental y acción constitucional que tutela la libertad personal." },
  { termino: "habitat", significado: "lugar donde vive un animal o planta" },
  { termino: "homo homini lupus", significado: "el hombre es un lobo para el hombre. Expresa una concepción pesimista del hombre, como la del filósofo Hobbes." },
  { termino: "idem", significado: "lo mismo, igual. Indica que se repite algo ya mencionado." },
  { termino: "in albis", significado: "en blanco. Quedarse en blanco." },
  { termino: "in dubio pro reo", significado: "en caso de duda, a favor del reo" },
  { termino: "in extremis", significado: "en los últimos momentos" },
  { termino: "in fraganti", significado: "sorprender a alguien desprevenido" },
  { termino: "in medias res", significado: "a mitad de los hechos" },
  { termino: "in memoriam", significado: "en memoria, en recuerdo de una persona" },
  { termino: "in situ", significado: "en el sitio, en el lugar. En el mismo lugar." },
  { termino: "in vitro", significado: "en el vidrio. Designa toda reacción fisiológica realizada fuera del organismo (en probetas, tubos, etc.)." },
  { termino: "ipso facto", significado: "en el mismo momento, inmediatamente" },
  { termino: "lapsus", significado: "error, fallo, desliz" },
  { termino: "lapsus linguae", significado: "error al hablar" },
  { termino: "lapsus calami", significado: "error al escribir" },
  { termino: "mala fide", significado: "de mala fe" },
  { termino: "mea culpa", significado: "por mi culpa. Suele emplearse para admitir alguna responsabilidad." },
  { termino: "memorandum", significado: "recordatorio" },
  { termino: "modus operandi", significado: "modo o manera de obrar" },
  { termino: "modus vivendi", significado: "modo o manera de vivir. Estilo de vida." },
  { termino: "numerus clausus", significado: "número cerrado, cantidad limitada; se aplica sobre todo a la admisión de alumnos en un centro docente." },
  { termino: "panem et circenses", significado: "pan y espectáculos" },
  { termino: "per capita", significado: "por cabeza" },
  { termino: "persona non grata", significado: "persona indeseable (lenguaje diplomático)" },
  { termino: "post meridiem (p.m.)", significado: "después del mediodía" },
  { termino: "prima facie", significado: "a primera vista" },
  { termino: "quorum", significado: "indica el número de asistentes precisos para que una votación tenga validez" },
  { termino: "requiescat in pace (R.I.P.)", significado: "descanse en paz" },
  { termino: "sine die", significado: "sin fecha fija; pospuesto indefinidamente" },
  { termino: "statu quo", significado: "en el estado en que está actualmente; situación invariable por el momento" },
  { termino: "stricto sensu", significado: "en sentido estricto" },
  { termino: "sui generis", significado: "a su modo o manera, muy especial" },
  { termino: "superavit", significado: "sobrante, excedente. Lo que sobra después de cubrir las necesidades." },
  { termino: "tempus fugit", significado: "el tiempo vuela" },
  { termino: "ultimatum", significado: "último aviso, último plazo" },
  { termino: "urbi et orbi", significado: "a la ciudad (Roma) y al mundo; alude especialmente a la bendición papal" },
  { termino: "vade retro", significado: "retrocede. Se usa para rechazar una oferta muy tentadora." },
  { termino: "veni, vidi, vici", significado: "llegué, vi, vencí" },
  { termino: "versus", significado: "contra. Usado en enfrentamientos deportivos." },
  { termino: "viceversa", significado: "al revés, al contrario" },
  { termino: "a fortiori", significado: "con más motivo" },
  { termino: "ab initio", significado: "desde el inicio" },
  { termino: "alma mater", significado: "madre nutricia; se utiliza para referirse a las casas de estudio en las que una persona se ha formado" },
  { termino: "circa", significado: "alrededor de (se utiliza para señalar fechas que no se conocen con exactitud)" },
  { termino: "cum laude", significado: "con alabanza (se utiliza en el ámbito académico como máxima calificación)" },
  { termino: "ergo", significado: "por lo tanto" },
  { termino: "ex nihilo", significado: "creado de la nada (se utiliza en religión y en filosofía)" },
  { termino: "extra muros", significado: "fuera de las murallas (se utiliza para designar lo que ocurre fuera de una institución)" },
  { termino: "homo sapiens", significado: "hombre que sabe (es el nombre científico de la raza humana)" },
  { termino: "honoris causa", significado: "a título honorífico" },
  { termino: "in absentia", significado: "en ausencia (se utiliza en derecho cuando se juzga a un acusado que en rebeldía no se ha presentado ante el juez)" },
  { termino: "mens sana in corpore sano", significado: "mente sana en cuerpo sano" },
  { termino: "opus", significado: "obra" },
  { termino: "per se", significado: "por sí solo" },
  { termino: "post mortem", significado: "después de la muerte" },
  { termino: "rara avis", significado: "escaso pájaro (se utiliza para designar todo lo extraño o fuera de lo común)" },
  { termino: "sic", significado: 'así (se utiliza con el sentido "literalmente" luego de citar las palabras de alguien)' },
  { termino: "tabula rasa", significado: "tabla lisa, sin marca, sin escritura (puede referirse al conocimiento de alguien antes de comenzar a aprender)" },
  { termino: "vox populi", significado: "voz del pueblo (se usa para señalar un rumor popular o algo conocido no oficialmente por todos)" },
];

const HOMOFONAS = [
  { palabra1: "a", def1: "Preposición. Ej: ¡a la orden!", palabra2: "ha", def2: "Forma del verbo haber (auxiliar). Ej: Juan ha comido.", extra: "¡ah!: interjección de sorpresa." },
  { palabra1: "¡ay!", def1: "Interjección de daño.", palabra2: "hay", def2: "Del verbo haber." },
  { palabra1: "abjuró", def1: "Del verbo abjurar. Desdecirse con juramento.", palabra2: "adjuró", def2: "Del verbo adjurar. Rogar encarecidamente una cosa." },
  { palabra1: "ablando", def1: "Del verbo ablandar. Poner blanda una cosa.", palabra2: "hablando", def2: "De hablar. Expresarse mediante palabras." },
  { palabra1: "abollar", def1: "Producir una depresión en una superficie con un golpe o apretándola.", palabra2: "aboyar", def2: "Poner boyas." },
  { palabra1: "abra", def1: "De abrir. Ej: Abra la puerta, es la policía.", palabra2: "habrá", def2: "Del verbo haber. Ej: En la exposición habrá muchos caballos." },
  { palabra1: "abría", def1: "De abrir la botella.", palabra2: "habría", def2: "Del verbo haber." },
  { palabra1: "abrazar", def1: "Dar un abrazo.", palabra2: "abrasar", def2: "Con las brasas." },
  { palabra1: "absolver", def1: "Declarar la inocencia de un acusado.", palabra2: "absorber", def2: "Aspirar o secar un líquido." },
  { palabra1: "absceso", def1: "Acumulación de pus en un tejido orgánico.", palabra2: "acceso", def2: "Acción de acercarse." },
  { palabra1: "acechanza", def1: "Espiar.", palabra2: "asechanza", def2: "Engaño." },
  { palabra1: "acecinado", def1: "De acecinar la carne para su conserva.", palabra2: "asesinado", def2: "Alguien al que han matado." },
  { palabra1: "acedera", def1: "Una planta.", palabra2: "hacedera", def2: "Del verbo hacer." },
  { palabra1: "acerbo", def1: "Que es áspero en el sabor y en el olor / Que es cruel o duro.", palabra2: "acervo", def2: "Conjunto de bienes o valores morales o culturales." },
  { palabra1: "actitud", def1: "Postura del cuerpo humano, especialmente cuando es determinada por los movimientos del ánimo.", palabra2: "aptitud", def2: "Rasgo general y propio de cada individuo que le facilita el aprendizaje de tareas específicas." },
  { palabra1: "agito", def1: "Mover una cosa rápidamente de un lado a otro.", palabra2: "ajito", def2: "Bulbo de esta planta que se emplea como condimento." },
  { palabra1: "ala", def1: "Miembro de algunas aves e insectos que les sirven para volar.", palabra2: "¡hala!", def2: "Se utiliza para meter prisa a una persona." },
  { palabra1: "alaba", def1: "De alabar.", palabra2: "Álava", def2: "Una provincia." },
  { palabra1: "alienar", def1: "Enajenar.", palabra2: "alinear", def2: "Poner a línea." },
  { palabra1: "allá", def1: "Lugar.", palabra2: "halla", def2: "De hallar." },
  { palabra1: "aprehender", def1: "Coger, asir, prender a alguien, especialmente si es de contrabando.", palabra2: "aprender", def2: "Adquirir el conocimiento de algo por medio del estudio o de la experiencia." },
  { palabra1: "aremos", def1: "Remover la tierra haciendo surcos con el arado.", palabra2: "haremos", def2: "Del verbo hacer. Crear una cosa o darle existencia." },
  { palabra1: "aren", def1: "De arar.", palabra2: "harem", def2: "El de un jeque árabe." },
  { palabra1: "aria", def1: "Del 'bel canto'.", palabra2: "haría", def2: "De hacer." },
  { palabra1: "arrollo", def1: "Llevar por delante, atropellar.", palabra2: "arroyo", def2: "Corriente pequeña de agua." },
  { palabra1: "arte", def1: "Obra o actividad en la que se muestra con ingenio un aspecto de la realidad.", palabra2: "harte", def2: "Saciar el apetito de comer o beber." },
  { palabra1: "as", def1: "Persona que sobresale de manera notable en un ejercicio o profesión.", palabra2: "has", def2: "Forma del verbo haber." },
  { palabra1: "asar", def1: "La carne.", palabra2: "azar", def2: "Por suerte." },
  { palabra1: "asta", def1: "Palo o barra en la que se coloca la bandera.", palabra2: "hasta", def2: "Se emplea con relación al tiempo, lugares, acciones o cantidades continuas." },
  { palabra1: "atajo", def1: "Senda por donde se abrevia el camino.", palabra2: "hatajo", def2: "Pequeño rebaño de ganado." },
  { palabra1: "ato", def1: "Unir, juntar o sujetar.", palabra2: "hato", def2: "Ropa o pequeño ajuar que tiene una persona para el uso preciso u ordinario." },
  { palabra1: "aya", def1: "Persona encargada en las casas principales de custodiar niños o jóvenes.", palabra2: "halla", def2: "Dar con alguien o con algo que se busca." },
  { palabra1: "azar", def1: "Suerte.", palabra2: "azahar", def2: "La flor del naranjo." },
  { palabra1: "baca", def1: "Sitio donde se coloca el equipaje en un coche.", palabra2: "vaca", def2: "Hembra del toro." },
  { palabra1: "bacante", def1: "Mujer descocada y ebria.", palabra2: "vacante", def2: "Cargo o empleo que está sin ocupar." },
  { palabra1: "bacía", def1: "Vasija cóncava que usaban los barberos.", palabra2: "vacía", def2: "Falto de contenido físico o mental." },
  { palabra1: "bacilo", def1: "Bacteria en forma de bastoncillo.", palabra2: "vacilo", def2: "Dicho de una cosa, moverse, titubear, tomar el pelo." },
  { palabra1: "bajilla", def1: "Diminutivo de bajo.", palabra2: "vajilla", def2: "Conjunto de fuentes, platos, vasos, etc., que se destinan a la mesa." },
  { palabra1: "bale", def1: "De dar balidos.", palabra2: "vale", def2: "Papel que contiene un valor." },
  { palabra1: "balido", def1: "De dar balidos.", palabra2: "valido", def2: "Hombre que tiene la confianza de otro." },
  { palabra1: "balón", def1: "Pelota hinchada con aire.", palabra2: "valón", def2: "Natural del territorio belga que ocupa aproximadamente la parte meridional de ese país." },
  { palabra1: "bario", def1: "Un metal.", palabra2: "vario", def2: "Diverso." },
  { palabra1: "barón", def1: "Título de dignidad.", palabra2: "varón", def2: "Ser humano de sexo masculino." },
  { palabra1: "baso", def1: "De basar. Asentar algo sobre una base.", palabra2: "vaso", def2: "Pieza cóncava para contener alguna cosa." },
  { palabra1: "basto", def1: "Cada uno de los naipes de este palo en la baraja.", palabra2: "vasto", def2: "Dilatado, muy extendido o muy grande." },
  { palabra1: "bate", def1: "De batir un récord o una mousse de chocolate.", palabra2: "vate", def2: "De poeta." },
  { palabra1: "baya", def1: "Tipo de fruto carnoso con semillas rodeadas de pulpa.", palabra2: "valla", def2: "Línea o término formado de estacas hincadas en el suelo." },
  { palabra1: "be", def1: "Nombre de la letra b.", palabra2: "ve", def2: "De ir. Ej: ve al cine y ve una película." },
  { palabra1: "bello", def1: "Que tiene belleza.", palabra2: "vello", def2: "Pelo que sale más corto y suave en algunas partes del cuerpo humano." },
  { palabra1: "bienes", def1: "Fortuna.", palabra2: "vienes", def2: "Del verbo venir." },
  { palabra1: "bobino", def1: "Enrollar un hilo o cable a un canuto.", palabra2: "bovino", def2: "Relativo al toro, o a la vaca." },
  { palabra1: "bollero", def1: "Persona que hace dulces esponjosos.", palabra2: "boyero", def2: "Persona que cuida o lleva bueyes." },
  { palabra1: "boto", def1: "Hacer que un cuerpo elástico de salto sobre una superficie dura.", palabra2: "voto", def2: "Emitir una persona su voto en una elección o consulta." },
  { palabra1: "cabe", def1: "De caber. Poder ser contenida una cosa dentro de otra.", palabra2: "cave", def2: "De cavar. Levantar y mover la tierra para cultivarla." },
  { palabra1: "cabo", def1: "Accidente geográfico / Mando militar del ejército.", palabra2: "cavo", def2: "De cavar. Levantar y mover la tierra para cultivarla." },
  { palabra1: "callado", def1: "De callar.", palabra2: "cayado", def2: "Para apoyarse al caminar." },
  { palabra1: "callo", def1: "Dureza que por presión, roce y a veces lesión se forma en tejidos animales o vegetales.", palabra2: "cayo", def2: "Cada una de las islas rasas, arenosas, frecuentemente anegadizas y cubiertas en gran parte de mangle." },
  { palabra1: "calló", def1: "Forma del verbo callar.", palabra2: "cayó", def2: "Forma del verbo caer." },
  { palabra1: "casa", def1: "Una vivienda.", palabra2: "caza", def2: "De cazar." },
  { palabra1: "ceda", def1: "De ceder, dejar.", palabra2: "seda", def2: "Un tejido." },
  { palabra1: "cede", def1: "De ceder.", palabra2: "sede", def2: "Bancaria, ministerial, etc." },
  { palabra1: "cebo", def1: "Para pescar peces.", palabra2: "sebo", def2: "Para hacer jabón." },
  { palabra1: "cegar", def1: "Dejar ciego.", palabra2: "segar", def2: "Cosechar el grano." },
  { palabra1: "cenador", def1: "Que cena.", palabra2: "senador", def2: "El que tiene escaño en el Senado." },
  { palabra1: "cepa", def1: "De la vid.", palabra2: "sepa", def2: "De saber." },
  { palabra1: "cesión", def1: "De ceder.", palabra2: "sesión", def2: "Espacio de tiempo." },
  { palabra1: "ceso", def1: "Por dimitir.", palabra2: "seso", def2: "De cerebro." },
  { palabra1: "ciego", def1: "Que no ve.", palabra2: "siego", def2: "El trigo, el maíz." },
  { palabra1: "cien", def1: "Una centena.", palabra2: "sien", def2: "La de la cabeza." },
  { palabra1: "ciento", def1: "Un centenar.", palabra2: "siento", def2: "De sentir." },
  { palabra1: "cierra", def1: "El cerrar.", palabra2: "sierra", def2: "Con lo que corta el carpintero." },
  { palabra1: "ciervo", def1: "Un rumiante.", palabra2: "siervo", def2: "Un servidor." },
  { palabra1: "cima", def1: "De la montaña.", palabra2: "sima", def2: "El fondo de un barranco." },
  { palabra1: "cirio", def1: "Una vela.", palabra2: "sirio", def2: "Uno de Siria." },
  { palabra1: "consejo", def1: "Parecer o dictamen que se da o toma para hacer o no hacer algo.", palabra2: "concejo", def2: "Casa consistorial, ayuntamiento." },
  { palabra1: "consciente", def1: "Que siente, piensa, quiere y obra con conocimiento de lo que hace.", palabra2: "consiente", def2: "Forma del verbo consentir." },
  { palabra1: "cosido", def1: "Forma del verbo coser.", palabra2: "cocido", def2: "Forma del verbo cocer." },
  { palabra1: "desecho", def1: "Despojo.", palabra2: "deshecho", def2: "Deshacer." },
  { palabra1: "deshojar", def1: "Quitar las hojas a una planta o los pétalos a una flor.", palabra2: "desojar", def2: "Esforzar la vista mirando o buscando algo." },
  { palabra1: "echo", def1: "De echar.", palabra2: "hecho", def2: "De hacer." },
  { palabra1: "enebro", def1: "Una planta.", palabra2: "enhebro", def2: "La aguja." },
  { palabra1: "encima", def1: "Posición o parte superior.", palabra2: "enzima", def2: "Proteína que cataliza específicamente cada una de las reacciones bioquímicas del metabolismo." },
  { palabra1: "errado", def1: "De fallar.", palabra2: "herrado", def2: "De herrar el caballo." },
  { palabra1: "errar", def1: "No acertar.", palabra2: "herrar", def2: "Ajustar y clavar las herraduras a las caballerías." },
  { palabra1: "esotérico", def1: "Oculto.", palabra2: "exotérico", def2: "Normal." },
  { palabra1: "espiar", def1: "Observar en secreto.", palabra2: "expiar", def2: "Pagar una culpa." },
  { palabra1: "expirar", def1: "Expulsar aire.", palabra2: "espirar", def2: "Morir." },
  { palabra1: "estático", def1: "Inmóvil.", palabra2: "extático", def2: "En éxtasis." },
  { palabra1: "gallo", def1: "Un ave.", palabra2: "gayo", def2: "Alegre." },
  { palabra1: "gira", def1: "Forma del verbo girar / Excursión o viaje de una o varias personas por distintos lugares.", palabra2: "jira", def2: "Pedazo algo grande y largo que se corta o rasga de una tela / Banquete o merienda, especialmente campestres." },
  { palabra1: "grava", def1: "De grabar.", palabra2: "graba", def2: "Piedra pequeña de cantera." },
  { palabra1: "gravado", def1: "Artístico.", palabra2: "grabado", def2: "De impuesto." },
  { palabra1: "grave", def1: "De gravedad.", palabra2: "grabe", def2: "De grabar." },
  { palabra1: "hierba", def1: "Toda planta pequeña cuyo tallo es tierno.", palabra2: "hierva", def2: "Forma del verbo hervir." },
  { palabra1: "hizo", def1: "Forma del verbo hacer.", palabra2: "izo", def2: "Forma del verbo izar." },
  { palabra1: "hojear", def1: "El libro.", palabra2: "ojear", def2: "El panorama." },
  { palabra1: "hola", def1: "Saludo.", palabra2: "ola", def2: "Del mar." },
  { palabra1: "hora", def1: "La que marca el reloj.", palabra2: "ora", def2: "De orar, rezar." },
  { palabra1: "horca", def1: "Utensilio para aventar la mies.", palabra2: "orca", def2: "Mamífero marino." },
  { palabra1: "huso", def1: "Para hilar.", palabra2: "uso", def2: "Usar." },
  { palabra1: "ingerir", def1: "Introducir por la boca la comida, bebida o medicamentos.", palabra2: "injerir", def2: "Injertar plantas / Introducir en un escrito una palabra, una nota, un texto." },
  { palabra1: "kilo", def1: "Una medida de peso.", palabra2: "quilo", def2: "Líquido digestivo." },
  { palabra1: "malla", def1: "Cada uno de los cuadriláteros que forman el tejido de la red.", palabra2: "maya", def2: "Individuo de cualquiera de las tribus indias que hoy habitan principalmente el Yucatán y Guatemala." },
  { palabra1: "paces", def1: "Hacer la paz, reconciliarse.", palabra2: "pases", def2: "Cada una de las veces que el torero deja pasar al toro con la muleta." },
  { palabra1: "pollo", def1: "Cría que nace de cada huevo de ave, especialmente la de la gallina.", palabra2: "poyo", def2: "Banco de piedra, yeso u otra materia, que ordinariamente se fabrica arrimado a las paredes." },
  { palabra1: "pulla", def1: "Palabra o dicho obsceno con que indirectamente se humilla a alguien.", palabra2: "puya", def2: "Punta acerada que en una extremidad tienen las varas o garrochas de los picadores y vaqueros." },
  { palabra1: "rallar", def1: "Desmenuzar algo restregándolo con el rallador.", palabra2: "rayar", def2: "Hacer o tirar rayas." },
  { palabra1: "rayo", def1: "Línea de luz que procede de un cuerpo luminoso / Chispa eléctrica de gran intensidad.", palabra2: "rallo", def2: "Forma del verbo rallar." },
  { palabra1: "rehusar", def1: "No querer o no aceptar algo.", palabra2: "reusar", def2: "Volver a usar. (No está en el diccionario, se usa inapropiadamente)." },
  { palabra1: "rebelar", def1: "De rebelde.", palabra2: "revelar", def2: "El carrete de fotos." },
  { palabra1: "sabia", def1: "Dicho de una persona que posee la sabiduría.", palabra2: "savia", def2: "Líquido que circula por los vasos de las plantas pteridofitas y fanerógamas." },
  { palabra1: "seso", def1: "Del sentido común.", palabra2: "sexo", def2: "Carácter sexual." },
  { palabra1: "sueco", def1: "Natural u oriundo de Suecia.", palabra2: "zueco", def2: "Zapato de madera de una pieza." },
  { palabra1: "tubo", def1: "Pieza hueca, de forma por lo común cilíndrica.", palabra2: "tuvo", def2: "Forma del verbo tener." },
  { palabra1: "valla", def1: "Del vallado.", palabra2: "vaya", def2: "Interjección." },
];

// ============================================================
// COMPONENT
// ============================================================

const SECTIONS = [
  { id: "solecismos", label: "Solecismos", icon: "⚠️", count: SOLECISMOS.length },
  { id: "adverbios", label: "Adverbios", icon: "📍", count: ADVERBIOS.length },
  { id: "locuciones", label: "Locuciones Latinas", icon: "🏛️", count: LOCUCIONES.length },
  { id: "homofonas", label: "Homófonas", icon: "🔤", count: HOMOFONAS.length },
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function useProgress() {
  const [progress, setProgress] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("rtProgress") || "{}");
    } catch { return {}; }
  });

  const mark = useCallback((section, idx, correct) => {
    setProgress(p => {
      const key = `${section}_${idx}`;
      const prev = p[key] || { correct: 0, wrong: 0 };
      const next = correct
        ? { ...prev, correct: prev.correct + 1 }
        : { ...prev, wrong: prev.wrong + 1 };
      const updated = { ...p, [key]: next };
      try { localStorage.setItem("rtProgress", JSON.stringify(updated)); } catch {}
      return updated;
    });
  }, []);

  const getSectionStats = useCallback((section, total) => {
    let mastered = 0;
    for (let i = 0; i < total; i++) {
      const k = `${section}_${i}`;
      if (progress[k]?.correct >= 2) mastered++;
    }
    return { mastered, total };
  }, [progress]);

  const resetSection = useCallback((section, total) => {
    setProgress(p => {
      const updated = { ...p };
      for (let i = 0; i < total; i++) delete updated[`${section}_${i}`];
      try { localStorage.setItem("rtProgress", JSON.stringify(updated)); } catch {}
      return updated;
    });
  }, []);

  return { progress, mark, getSectionStats, resetSection };
}

// ---- Flashcard mode ----
function FlashcardMode({ data, section, onMark }) {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [queue, setQueue] = useState(() => shuffle(data.map((_, i) => i)));
  const [done, setDone] = useState(false);

  const current = data[queue[idx]];

  const handle = (correct) => {
    onMark(section, queue[idx], correct);
    if (idx + 1 >= queue.length) { setDone(true); return; }
    setFlipped(false);
    setTimeout(() => setIdx(i => i + 1), 150);
  };

  const restart = () => {
    setQueue(shuffle(data.map((_, i) => i)));
    setIdx(0); setFlipped(false); setDone(false);
  };

  if (done) return (
    <div style={{ textAlign: "center", padding: "60px 20px" }}>
      <div style={{ fontSize: 48, marginBottom: 12 }}>🎉</div>
      <h2 style={{ color: "#1a1a2e", marginBottom: 8 }}>¡Ronda completada!</h2>
      <p style={{ color: "#666", marginBottom: 24 }}>Repasaste todas las tarjetas de esta sección.</p>
      <button onClick={restart} style={btnStyle("#4361ee")}>Volver a mezclar</button>
    </div>
  );

  if (!current) return null;

  return (
    <div style={{ maxWidth: 540, margin: "0 auto", padding: "20px 16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <span style={{ color: "#888", fontSize: 13 }}>{idx + 1} / {queue.length}</span>
        <button onClick={restart} style={{ ...btnStyle("#888"), padding: "4px 12px", fontSize: 12 }}>↺ Mezclar</button>
      </div>

      {/* Progress bar */}
      <div style={{ height: 4, background: "#e8e8f0", borderRadius: 2, marginBottom: 24 }}>
        <div style={{ height: 4, background: "#4361ee", borderRadius: 2, width: `${((idx) / queue.length) * 100}%`, transition: "width .3s" }} />
      </div>

      {/* Card */}
      <div
        onClick={() => setFlipped(f => !f)}
        style={{
          background: "#fff", borderRadius: 16, boxShadow: "0 4px 24px rgba(67,97,238,.12)",
          minHeight: 200, padding: "32px 28px", cursor: "pointer",
          display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
          textAlign: "center", border: "2px solid " + (flipped ? "#4361ee" : "#e8e8f0"),
          transition: "border .2s",
          userSelect: "none"
        }}
      >
        {section === "locuciones" ? (
          <>
            <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1.5, color: "#888", marginBottom: 12 }}>
              {flipped ? "Significado" : "Expresión latina"}
            </p>
            <p style={{ fontSize: flipped ? 16 : 20, fontWeight: flipped ? 400 : 700, color: "#1a1a2e", lineHeight: 1.5 }}>
              {flipped ? current.significado : current.termino}
            </p>
          </>
        ) : section === "homofonas" ? (
          <>
            <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1.5, color: "#888", marginBottom: 12 }}>
              {flipped ? "Definiciones" : "Palabras"}
            </p>
            {flipped ? (
              <div style={{ textAlign: "left", width: "100%" }}>
                <p style={{ margin: "6px 0" }}><strong style={{ color: "#4361ee" }}>{current.palabra1}:</strong> {current.def1}</p>
                <p style={{ margin: "6px 0" }}><strong style={{ color: "#e63946" }}>{current.palabra2}:</strong> {current.def2}</p>
                {current.extra && <p style={{ margin: "6px 0", color: "#888", fontSize: 13 }}>{current.extra}</p>}
              </div>
            ) : (
              <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
                <span style={{ fontSize: 22, fontWeight: 700, color: "#4361ee" }}>{current.palabra1}</span>
                <span style={{ color: "#ccc" }}>vs</span>
                <span style={{ fontSize: 22, fontWeight: 700, color: "#e63946" }}>{current.palabra2}</span>
              </div>
            )}
          </>
        ) : (
          <>
            <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1.5, color: "#888", marginBottom: 12 }}>
              {flipped ? "✅ Forma correcta" : "⚠️ ¿Cómo se dice correctamente?"}
            </p>
            <p style={{ fontSize: 16, color: flipped ? "#555" : "#1a1a2e", textDecoration: flipped ? "line-through" : "none", marginBottom: flipped ? 12 : 0 }}>
              {current.incorrecto}
            </p>
            {flipped && (
              <p style={{ fontSize: 18, fontWeight: 600, color: "#2d6a4f" }}>{current.correcto}</p>
            )}
          </>
        )}
        {!flipped && <p style={{ marginTop: 20, fontSize: 12, color: "#bbb" }}>Toca para ver la respuesta</p>}
      </div>

      {flipped && (
        <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
          <button onClick={() => handle(false)} style={{ ...btnStyle("#e63946"), flex: 1 }}>😕 No lo sabía</button>
          <button onClick={() => handle(true)} style={{ ...btnStyle("#2d6a4f"), flex: 1 }}>✅ Lo sabía</button>
        </div>
      )}
    </div>
  );
}

// ---- Quiz mode ----
function QuizMode({ data, section, onMark }) {
  const [idx, setIdx] = useState(0);
  const [queue] = useState(() => shuffle(data.map((_, i) => i)));
  const [selected, setSelected] = useState(null);
  const [done, setDone] = useState(false);
  const [score, setScore] = useState(0);

  const makeOptions = useCallback((correct, allData, field) => {
    const opts = new Set([correct]);
    while (opts.size < 4 && opts.size < allData.length) {
      opts.add(allData[Math.floor(Math.random() * allData.length)][field]);
    }
    return shuffle([...opts]);
  }, []);

  const current = data[queue[idx]];

  let question = "", answer = "", options = [];
  if (section === "locuciones") {
    question = `¿Qué significa "${current.termino}"?`;
    answer = current.significado;
    options = makeOptions(answer, data, "significado");
  } else if (section === "homofonas") {
    question = `"${current.palabra1}" significa:`;
    answer = current.def1;
    options = makeOptions(answer, data, "def1");
  } else {
    question = "¿Cuál es la forma CORRECTA de esta oración?";
    answer = current.correcto;
    const wrongPool = data.filter((_, i) => i !== queue[idx]).map(d => d.correcto);
    const opts = new Set([answer]);
    shuffle(wrongPool).forEach(w => { if (opts.size < 4) opts.add(w); });
    options = shuffle([...opts]);
  }

  const choose = (opt) => {
    if (selected !== null) return;
    setSelected(opt);
    const correct = opt === answer;
    if (correct) setScore(s => s + 1);
    onMark(section, queue[idx], correct);
  };

  const next = () => {
    if (idx + 1 >= queue.length) { setDone(true); return; }
    setSelected(null);
    setIdx(i => i + 1);
  };

  if (done) return (
    <div style={{ textAlign: "center", padding: "60px 20px" }}>
      <div style={{ fontSize: 48, marginBottom: 12 }}>{score / queue.length >= .8 ? "🏆" : "📚"}</div>
      <h2 style={{ color: "#1a1a2e" }}>Quiz terminado</h2>
      <p style={{ fontSize: 24, fontWeight: 700, color: "#4361ee", margin: "12px 0" }}>{score} / {queue.length}</p>
      <p style={{ color: "#666", marginBottom: 24 }}>{score / queue.length >= .8 ? "¡Excelente trabajo!" : "Sigue practicando, ¡vas a lograrlo!"}</p>
    </div>
  );

  return (
    <div style={{ maxWidth: 560, margin: "0 auto", padding: "20px 16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <span style={{ color: "#888", fontSize: 13 }}>{idx + 1} / {queue.length}</span>
        <span style={{ color: "#4361ee", fontSize: 13, fontWeight: 600 }}>✅ {score} correctas</span>
      </div>
      <div style={{ height: 4, background: "#e8e8f0", borderRadius: 2, marginBottom: 24 }}>
        <div style={{ height: 4, background: "#4361ee", borderRadius: 2, width: `${(idx / queue.length) * 100}%`, transition: "width .3s" }} />
      </div>

      {section !== "locuciones" && section !== "homofonas" && (
        <div style={{ background: "#fff5f5", border: "1px solid #ffd6d6", borderRadius: 10, padding: "14px 18px", marginBottom: 20 }}>
          <p style={{ fontSize: 11, color: "#e63946", margin: "0 0 4px", textTransform: "uppercase", letterSpacing: 1 }}>Forma incorrecta</p>
          <p style={{ margin: 0, fontWeight: 600, color: "#1a1a2e" }}>{current.incorrecto}</p>
        </div>
      )}

      <p style={{ fontWeight: 700, color: "#1a1a2e", marginBottom: 16, fontSize: 16 }}>{question}</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {options.map((opt, i) => {
          let bg = "#fff", border = "#e8e8f0", color = "#1a1a2e";
          if (selected !== null) {
            if (opt === answer) { bg = "#d4edda"; border = "#2d6a4f"; color = "#2d6a4f"; }
            else if (opt === selected) { bg = "#f8d7da"; border = "#e63946"; color = "#e63946"; }
          }
          return (
            <button key={i} onClick={() => choose(opt)}
              style={{ background: bg, border: `2px solid ${border}`, borderRadius: 10, padding: "12px 16px", textAlign: "left", cursor: selected ? "default" : "pointer", color, fontSize: 14, lineHeight: 1.5, transition: "all .2s", fontFamily: "inherit" }}>
              {opt}
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <button onClick={next} style={{ ...btnStyle("#4361ee"), width: "100%", marginTop: 16 }}>
          {idx + 1 >= queue.length ? "Ver resultado" : "Siguiente →"}
        </button>
      )}
    </div>
  );
}

// ---- Browse mode ----
function BrowseMode({ data, section }) {
  const [search, setSearch] = useState("");

  const filtered = data.filter(item => {
    const q = search.toLowerCase();
    if (!q) return true;
    if (section === "locuciones") return item.termino.toLowerCase().includes(q) || item.significado.toLowerCase().includes(q);
    if (section === "homofonas") return item.palabra1.toLowerCase().includes(q) || item.palabra2.toLowerCase().includes(q) || item.def1.toLowerCase().includes(q) || item.def2.toLowerCase().includes(q);
    return item.incorrecto.toLowerCase().includes(q) || item.correcto.toLowerCase().includes(q);
  });

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "16px" }}>
      <input
        value={search} onChange={e => setSearch(e.target.value)}
        placeholder="🔍 Buscar..."
        style={{ width: "100%", padding: "10px 14px", border: "2px solid #e8e8f0", borderRadius: 10, fontSize: 14, outline: "none", boxSizing: "border-box", marginBottom: 16, fontFamily: "inherit" }}
      />
      <p style={{ color: "#888", fontSize: 13, marginBottom: 16 }}>{filtered.length} resultados</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {filtered.map((item, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #e8e8f0", borderRadius: 12, padding: "14px 16px" }}>
            {section === "locuciones" ? (
              <>
                <p style={{ margin: "0 0 4px", fontWeight: 700, color: "#4361ee", fontStyle: "italic" }}>{item.termino}</p>
                <p style={{ margin: 0, color: "#555", fontSize: 14 }}>{item.significado}</p>
              </>
            ) : section === "homofonas" ? (
              <>
                <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                  <div>
                    <span style={{ fontWeight: 700, color: "#4361ee" }}>{item.palabra1}</span>
                    <p style={{ margin: "2px 0 0", fontSize: 13, color: "#555" }}>{item.def1}</p>
                  </div>
                  <div style={{ color: "#ccc", alignSelf: "center" }}>vs</div>
                  <div>
                    <span style={{ fontWeight: 700, color: "#e63946" }}>{item.palabra2}</span>
                    <p style={{ margin: "2px 0 0", fontSize: 13, color: "#555" }}>{item.def2}</p>
                  </div>
                </div>
                {item.extra && <p style={{ margin: "6px 0 0", fontSize: 12, color: "#999" }}>{item.extra}</p>}
              </>
            ) : (
              <>
                <p style={{ margin: "0 0 4px", fontSize: 14, color: "#e63946", textDecoration: "line-through" }}>{item.incorrecto}</p>
                <p style={{ margin: 0, fontWeight: 600, color: "#2d6a4f" }}>✅ {item.correcto}</p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ---- Main app ----
const btnStyle = (bg) => ({
  background: bg, color: "#fff", border: "none", borderRadius: 10,
  padding: "12px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer",
  fontFamily: "inherit",
});

const getData = (s) => {
  if (s === "solecismos") return SOLECISMOS;
  if (s === "adverbios") return ADVERBIOS;
  if (s === "locuciones") return LOCUCIONES;
  if (s === "homofonas") return HOMOFONAS;
  return [];
};

export default function App() {
  const [activeSection, setActiveSection] = useState(null);
  const [mode, setMode] = useState(null); // "flashcards" | "quiz" | "browse"
  const { mark, getSectionStats, resetSection } = useProgress();

  const data = activeSection ? getData(activeSection) : [];

  if (activeSection && mode) {
    return (
      <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", background: "#f7f8fc", minHeight: "100vh" }}>
        <div style={{ background: "#fff", borderBottom: "1px solid #e8e8f0", padding: "12px 16px", display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={() => setMode(null)} style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "#4361ee" }}>←</button>
          <div>
            <p style={{ margin: 0, fontSize: 11, color: "#888", textTransform: "uppercase", letterSpacing: 1 }}>
              {SECTIONS.find(s => s.id === activeSection)?.label}
            </p>
            <p style={{ margin: 0, fontWeight: 700, color: "#1a1a2e", fontSize: 15 }}>
              {mode === "flashcards" ? "🃏 Tarjetas" : mode === "quiz" ? "🎯 Quiz" : "📖 Explorar"}
            </p>
          </div>
        </div>
        {mode === "flashcards" && <FlashcardMode data={data} section={activeSection} onMark={mark} />}
        {mode === "quiz" && <QuizMode data={data} section={activeSection} onMark={mark} />}
        {mode === "browse" && <BrowseMode data={data} section={activeSection} />}
      </div>
    );
  }

  if (activeSection) {
    const sec = SECTIONS.find(s => s.id === activeSection);
    const stats = getSectionStats(activeSection, data.length);
    const pct = Math.round((stats.mastered / stats.total) * 100);
    return (
      <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", background: "#f7f8fc", minHeight: "100vh" }}>
        <div style={{ background: "#fff", borderBottom: "1px solid #e8e8f0", padding: "12px 16px", display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={() => setActiveSection(null)} style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "#4361ee" }}>←</button>
          <div>
            <p style={{ margin: 0, fontSize: 13, color: "#1a1a2e", fontWeight: 700 }}>{sec.icon} {sec.label}</p>
            <p style={{ margin: 0, fontSize: 12, color: "#888" }}>{data.length} elementos</p>
          </div>
        </div>
        <div style={{ padding: "20px 16px", maxWidth: 500, margin: "0 auto" }}>
          {/* Progress */}
          <div style={{ background: "#fff", borderRadius: 14, padding: "16px 20px", marginBottom: 20, border: "1px solid #e8e8f0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 13, color: "#888" }}>Dominadas</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#4361ee" }}>{stats.mastered}/{stats.total}</span>
            </div>
            <div style={{ height: 8, background: "#e8e8f0", borderRadius: 4 }}>
              <div style={{ height: 8, background: pct >= 80 ? "#2d6a4f" : "#4361ee", borderRadius: 4, width: `${pct}%`, transition: "width .5s" }} />
            </div>
            <p style={{ margin: "8px 0 0", fontSize: 12, color: "#888" }}>
              {pct >= 100 ? "🎉 ¡Sección dominada!" : pct >= 50 ? "🔥 ¡Muy bien, sigue así!" : "📚 Sigue practicando"}
            </p>
          </div>

          {/* Modes */}
          {[
            { id: "flashcards", icon: "🃏", title: "Tarjetas", desc: "Repasa uno a uno, marca si lo sabías o no." },
            { id: "quiz", icon: "🎯", title: "Quiz", desc: "Elige la respuesta correcta entre 4 opciones." },
            { id: "browse", icon: "📖", title: "Explorar", desc: "Consulta y busca dentro del contenido." },
          ].map(m => (
            <button key={m.id} onClick={() => setMode(m.id)}
              style={{ width: "100%", background: "#fff", border: "2px solid #e8e8f0", borderRadius: 14, padding: "16px 20px", textAlign: "left", cursor: "pointer", marginBottom: 12, fontFamily: "inherit", transition: "border .2s" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 28 }}>{m.icon}</span>
                <div>
                  <p style={{ margin: 0, fontWeight: 700, color: "#1a1a2e" }}>{m.title}</p>
                  <p style={{ margin: 0, fontSize: 13, color: "#888" }}>{m.desc}</p>
                </div>
              </div>
            </button>
          ))}

          <button onClick={() => resetSection(activeSection, data.length)}
            style={{ background: "none", border: "none", color: "#e63946", fontSize: 13, cursor: "pointer", marginTop: 8, fontFamily: "inherit" }}>
            🗑 Reiniciar progreso de esta sección
          </button>
        </div>
      </div>
    );
  }

  // Home
  const today = new Date();
  const target = new Date("2026-09-16");
  const daysLeft = Math.max(0, Math.ceil((target - today) / 86400000));

  return (
    <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", background: "#f7f8fc", minHeight: "100vh" }}>
      <div style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #4361ee 100%)", padding: "32px 20px 28px", color: "#fff" }}>
        <p style={{ margin: "0 0 4px", fontSize: 12, textTransform: "uppercase", letterSpacing: 2, opacity: .7 }}>Redacción Técnica</p>
        <h1 style={{ margin: "0 0 8px", fontSize: 24, fontWeight: 800 }}>Mi app de estudio</h1>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 20 }}>⏳</span>
          <p style={{ margin: 0, fontSize: 14, opacity: .9 }}><strong>{daysLeft} días</strong> para el examen</p>
        </div>
      </div>

      <div style={{ padding: "20px 16px" }}>
        <p style={{ color: "#888", fontSize: 13, marginBottom: 16, textTransform: "uppercase", letterSpacing: 1 }}>Secciones</p>
        {SECTIONS.map(sec => {
          const stats = getSectionStats(sec.id, sec.count);
          const pct = Math.round((stats.mastered / stats.total) * 100);
          return (
            <button key={sec.id} onClick={() => setActiveSection(sec.id)}
              style={{ width: "100%", background: "#fff", border: "1px solid #e8e8f0", borderRadius: 14, padding: "16px 20px", textAlign: "left", cursor: "pointer", marginBottom: 12, fontFamily: "inherit" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <span style={{ fontSize: 28 }}>{sec.icon}</span>
                  <div>
                    <p style={{ margin: 0, fontWeight: 700, color: "#1a1a2e" }}>{sec.label}</p>
                    <p style={{ margin: 0, fontSize: 13, color: "#888" }}>{sec.count} elementos</p>
                  </div>
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: pct >= 80 ? "#2d6a4f" : "#4361ee" }}>{pct}%</span>
              </div>
              <div style={{ height: 4, background: "#e8e8f0", borderRadius: 2, marginTop: 12 }}>
                <div style={{ height: 4, background: pct >= 80 ? "#2d6a4f" : "#4361ee", borderRadius: 2, width: `${pct}%`, transition: "width .5s" }} />
              </div>
            </button>
          );
        })}

        <div style={{ background: "#fff", borderRadius: 14, padding: "16px 20px", border: "1px solid #e8e8f0", marginTop: 8 }}>
          <p style={{ margin: "0 0 4px", fontWeight: 700, color: "#1a1a2e", fontSize: 14 }}>💡 Plan sugerido</p>
          <p style={{ margin: 0, fontSize: 13, color: "#666", lineHeight: 1.6 }}>
            Estudia <strong>1 sección por semana</strong>: 15 min de tarjetas al día + 1 quiz antes de dormir. Domina cada sección al 80% antes de pasar a la siguiente.
          </p>
        </div>
      </div>
    </div>
  );
}
