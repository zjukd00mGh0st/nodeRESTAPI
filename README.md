# API REST de eventos

El siguiente proyecto consiste de una API REST de eventos donde se pueden agregar reservas.
Dados los requerimientos del proyecto se llevo a cabo lo siguiente:


### Tecnologias usadas
- express
- typescript
- docker
- mysql

**IMPORTANTE**

Es necesario tener **docker** instalado para poder ejecutar la base de datos localmente y el proyecto en general.

### Creacion de la base de datos MySQL

Para crear la base de datos mysql solo es necesario ejecutar el siguiente comando:

```sh
docker compose up -d nodedb
```

### Acceder a terminal MySQL

Para acceder a la terminal mysql y administrar o explorar la base de datos se debe ejecutar:

```sh
# Es importante tener el comando de 'mysql' instalado
docker exec -it nodedb mysql -u <user> -p <database>
```

### Migraciones

Generar archivo de migracion:

```sh
npm run typeorm migration:generate -d ./src/db/data-source ./src/migration/<migration-name>
```

Aplicar archivo de migracion:

```sh
npm run typeorm migration:run -d ./src/db/data-source
```

### Ejecutar el proyecto

Para poder ejecutar el proyecto solo basta con correr el siguiente comando:

```sh
docker compose up -d nodeapi
```

En este momento los contenedores de docker son instanciados y se pueden realizar peticiones a la API.