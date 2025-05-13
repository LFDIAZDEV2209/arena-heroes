# 🎮 Arena Heroes

[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Git Flow](https://img.shields.io/badge/Git_Flow-FF5722?style=for-the-badge&logo=git&logoColor=white)](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)

## 📋 Descripción del Proyecto

Arena Heroes es una aplicación web moderna construida con Vite, JavaScript y TailwindCSS. El proyecto implementa una arquitectura modular y componentes reutilizables para crear una experiencia de usuario fluida y atractiva.

## 🚀 Características

- ⚡ Desarrollo rápido con Vite
- 🎨 Estilos modernos con TailwindCSS
- 📱 Diseño responsive
- 🧩 Arquitectura basada en componentes
- 🔥 Hot Module Replacement (HMR)

## 🛠️ Tecnologías

- Vite 6.x
- JavaScript (ES6+)
- TailwindCSS 4.x
- HTML5
- CSS3

## 📦 Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/LFDIAZDEV2209/arena-heroes
cd arena-heroes
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

4. Para construir la versión de producción:
```bash
npm run build
```

## 🌳 Git Flow

### Ramas Principales

- `main`: Código en producción
- `develop`: Rama de desarrollo principal

### Ramas de Soporte

- `feature/*`: Nuevas características
- `bugfix/*`: Corrección de errores
- `hotfix/*`: Correcciones urgentes en producción
- `release/*`: Preparación de nuevas versiones

### Flujo de Trabajo

1. **Nueva Característica**:
```bash
git checkout develop
git checkout -b feature/nombre-caracteristica
# Desarrollar y hacer commit
git checkout develop
git merge feature/nombre-caracteristica
```

2. **Corrección de Error**:
```bash
git checkout develop
git checkout -b bugfix/nombre-error
# Corregir y hacer commit
git checkout develop
git merge bugfix/nombre-error
```

3. **Hotfix**:
```bash
git checkout main
git checkout -b hotfix/nombre-hotfix
# Corregir y hacer commit
git checkout main
git merge hotfix/nombre-hotfix
git checkout develop
git merge hotfix/nombre-hotfix
```

## 📁 Estructura del Proyecto

```
arena-heroes/
├── src/
│   ├── components/
│   │   └── app-main.js
│   └── main.js
├── public/
├── index.html
├── globals.css
├── vite.config.js
└── package.json
```

## 🤝 Contribución

1. Crea una rama para tu característica (`git checkout -b feature/AmazingFeature`)
2. Haz commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
3. Push a la rama (`git push origin feature/AmazingFeature`)
4. Abre un Pull Request

## 📝 Convenciones de Código

- Usar camelCase para variables y funciones
- Usar PascalCase para componentes
- Comentar el código cuando sea necesario
- Mantener los componentes pequeños y reutilizables

## 🔐 Variables de Entorno

El proyecto utiliza variables de entorno para la configuración. Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_HOST=localhost
VITE_PORT=3000
VITE_API_URL=http://localhost:3000
```

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles.

## 👥 Equipo

- Luis Felipe Diaz - Desarrollador Principal
- Sheyla Esther Samur - Desarrolladora Frontend
- Jorge Cristancho Olarte - Desarrollador Backend
- Leidy Johanna Villegas - Desarrolladora FullStack

---

⭐️ From Los Pinguinos de Madagascar
