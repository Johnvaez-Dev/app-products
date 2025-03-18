Proyecto: App Productos

Descripción

Aplicación web para la gestión de productos. Permite agregar, listar y eliminar productos, asegurando que los códigos de producto sean únicos. También incluye un sistema de ordenamiento y filtrado.

Características

Agregar productos con validación de código único.

Listado de productos con opciones de ordenamiento.

Eliminación de productos.

Interfaz amigable con Material-UI.

Alertas visuales para validaciones y errores.

Tecnologías utilizadas

React.js con TypeScript

Material-UI

Day.js para manejo de fechas

Instalación y Configuración

Clonar el repositorio:

git clone https://github.com/Johnvaez-Dev/app-products.git
cd app-products

Instalar dependencias:

npm install

Ejecutar la aplicación en modo desarrollo:

npm run dev

Abrir en el navegador: http://localhost:3000

Uso

Hacer clic en el botón flotante para agregar un nuevo producto.

Completar el formulario y enviar.

Si el código del producto ya existe, se mostrará una alerta en la parte superior derecha.

Los productos se pueden eliminar individualmente desde la lista.

Estructura del Proyecto

/src
  |-- app/components
      |-- atoms
  |   |   |-- Button.tsx
  |   |   |-- Input.tsx
  |   |-- molecules
  |   |   |-- ProductForm.tsx
  |   |   |-- Filters.tsx
  |   |-- organisms
  |   |   |-- ProductList.tsx
  |-- page.tsx

Contribuir

Hacer un fork del repositorio.

Crear una nueva rama con la mejora o corrección:

git checkout -b feature/nueva-funcionalidad

Realizar los cambios y hacer commit:

git commit -m "Agregada nueva funcionalidad"

Subir los cambios y crear un pull request.