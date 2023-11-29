# MagicPersonalityMatcher

## Estructura de carpetas

```
.
├── backend
├── data
├── datasets
├── db
├── db_initialize
├── ml_model
├── notebooks
├── web_scraper
├── .gitignore
├── docker-compose.yml
├── README.md
└── requirements.txt
```

- `backend`
- `data`: reservado para los datos de la base de datos `MySQL`, es un volumen de `/var/lib/myqsl` del contendor.
- `db`: contiene el modelo y ORM de la base de datos como un módulo Python.
- `db_initialize`: módulo Python para conexión e inicialización de la base de datos.
- `ml_model`: carpeta para almacenar el resultado del entrenamiento con los notebooks.
- `notebooks`: Jupyeter Notebooks correspondientes a preprocesamiento y entrenamiento.
- `web_scraper`: módulo Python encargado del web scraping de [Personality Database](https://www.personality-database.com) y poblado de la base de datos.

## Estructura de contenedores

Se puede iniciar y desplegar algunos servicios usando contenedores Docker usando perfiles de Docker Compose:

- Por defecto se inician los contenedores de `mysql` y `backend`.
- `--profile dev`: inicia el contenedor de `phpmyadmin`.
- `--profile init`: ejecuta el script de `web_scraper`.

Estos perfiles se pueden combinar, por ejemplo:
```shell
# Primer inicio del proyecto con webscraping y phpmyadmin
$ docker-compose --profile dev --profile init up

# Inicio con datos existentes
$ docker-compose up
```

## Setup paso por paso

La inicialización del proyecto se realiza en las siguientes etapas:
- Poblado de la base de datos con `web_scraper`
- Crear y entrenar modelo IA
- Backend
- Frontend

### Poblado de la base de datos con `web_scraper`

Para descargar información de las series usando el `web_scraper` hay que volcar los links de las páginas a utilizar en `web_scraper/links.txt`. Luego se ejecuta el script usando Docker con `docker-compose --profile dev --profile init up --build`. Este script crea la base de datos, las tablas e inserta la información obtenida del web scraping.

> ⚠️ Las webs son propensas a cambios, de hecho, durante el desarrollo del script de inicialización (1 semana), la web cambió el nombre de una clase para un elemento HTML, lo que supuso reexaminar todo el código para ajustarlo a los nuevos cambios.


### Crear y entrenar modelo IA

En este paso se ejecutarán los notebooks, se debe seguir el siguiente orden obteniendo los siguentes resultados:
1. [Crear dataset](notebooks/crear_dataset.ipynb): `dataset_definitivo.csv`.
2. [Preprocesado](notebooks/preprocesado.ipynb): `X_train.lzma`, `y_train.lzma`, `X_test.lzma`, `y_test.lzma`, `bow.lzma`.
3. [Entrenamiento](notebooks/entrenamiento.ipynb): `model.lzma`

Una vez generados todos los ficheros, `bow.lzma` y `model.lzma` se deben colocar en la carpeta `ml_model` para ser accesibles por el `backend`:
```
.
├── backend
├── data
├── datasets
├── db
├── db_initialize
├── ml_model/
│   ├── bow.lzma
│   └── model.lzma
├── notebooks
├── web_scraper
├── .gitignore
├── docker-compose.yml
├── README.md
└── requirements.txt
```

### Backend

Requiere usar el modelo de IA, por tanto require el modelo entrenado usando los notebooks de paso anterior.





