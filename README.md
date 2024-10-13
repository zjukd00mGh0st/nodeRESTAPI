### Acceder a terminal MySQL

```sh
mysql -u <user> -p <database>
```

### Migraciones

Generar archivo de migracion:

```sh
pnpm run typeorm migration:generate -d ./src/db/data-source ./src/migration/<migration-name>
```

Aplicar archivo de migracion:

```sh
pnpm run typeorm migration:run -d ./src/db/data-source
```
