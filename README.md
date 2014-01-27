#Clavicon

Este proyecto es un proyecto Grunt. Necesitas una instalación de [nodeJS](http://nodejs.org/), [grunt](http://gruntjs.com/) y
[bower](https://github.com/bower/bower).

##Instalación

Haz fork a este proyecto en github.

Después, en la raíz del proyecto, ejecuta los siguientes comandos:

	npm install
	bower install

Ya está.

##¿Qué es Clavicon?

Clavicon es un programa muy sencillo de gestión de facturas emitidas o recibidas. Sirve para llevar un control de gastos
e ingresos muy sencillo que luego podrás integrar en tu sistema de contabilidad. Si eres autónomo o formas parte de una
pequeña empresa, Clavicon te ayudará a tener bajo control la "gestión de caja".

Clavicon se basa en la idea de mi abuelo sobre la contabilidad. Él tenía dos clavos en los que pinchaba los recibos de
los gastos en uno y de los ingresos en otro. Así de sencillo.

###Arquitectura

Se trata de un proyecto web con un backend [Elasticsearch](http://elasticsearch.org) para almacenamiento de datos.

Necesitas tener un servicio de Elasticsearch funcionando en el puerto 9200 de localhost.

Clavicon usará Elasticsearch para almacenar las fichas y apuntes en el índice 'clavicon'.

##Instrucciones

Como los navegadores tienen un model de seguridad para ficheros cargados por medio de URLs tipo file://..., deberás
ejecutar Clavicon en un servidor web. Puedes lanzar un servidor web básico que te permitirá usar Clavicon ejecutando en
la raíz del proyecto el comando:

  grunt web

Tras ejecutar este comando, podrás acceder a la url [http://localhost:8000/src/main/](http://localhost:8000/src/main/)
para empezar a usar Clavicon.

Revisa el fichero Gruntfile.js para conocer otras opciones de construcción del proyecto.

###Configuración

Por ahora, Clavicon no es configurable. Todos los parámetros y configuraciones están escritos a fuego en el código
fuente por lo que tendrás que editarlo para adaptarlo a tu contexto.

###El futuro de Clavicon

Clavicon siempre será una aplicación pequeña con un alcance acotado. No pretende ser una aplicación de contabilidad, ni
mucho menos.

Quiero explorar las posibilidades de análisis y explotación de datos que ofrece Elasticsearch. Estoy seguro de que con
un poco de cuidado, se podrían generar gráficas o informes que ayuden a autónomos o pequeños negocios a estudiar sus
patrones de ingresos y gastos.

También tengo claro que Clavicon debería ser flexible a la hora de producir hojas de cálculo descargables para importar
los datos que contenga en otros programas.

###¡Colabora!

Clavicon es un proyecto opensource y estaré encantado en aceptar pull-requests a su repositorio maestro. Sin embargo,
como se trata de un proyecto incipiente, solo se aceptarán contribuciones que vayan en la línea de los objetivos que me
planteo para Clavicon y que cumplan los requisitos mínimos de estilo de código, cobertura de tests, arquitectura y
diseño.

Como aún no existe un backlog de producto ni unas líneas guía claras para nada de esto, mejor contacta conmigo antes de
ponerte a escribir :)