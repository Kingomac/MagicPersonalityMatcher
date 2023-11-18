# MagicPersonalityMatcher

## Inicialización

Primero hay que descargar series usando el `web_scraper`, para ello hay que poner los links de las páginas a utilizar en `web_scraper/links.txt`. Luego se ejecuta el script usando Docker con `docker-compose --profile dev --profile init up --build`. Este script crea la base de datos, las tablas e inserta la información obtenida del web scraping.

> ⚠️ Las webs son propensas a cambios, de hecho, durante el desarrollo del script de inicialización (1 semana), la web cambió el nombre de una clase para un elemento HTML, lo que supuso reexaminar todo el código para ajustarlo a los nuevos cambios.





