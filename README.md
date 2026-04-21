# Delivery Plus

Delivery Plus es una aplicación web de delivery de comida inspirada en Uber Eats, desarrollada como proyecto académico por un equipo de 10 personas. La app permite a los usuarios explorar restaurantes reales, armar su carrito, realizar pedidos y gestionar su perfil, todo dentro de una interfaz moderna construida con React y Tailwind.

A diferencia de una app de delivery real, Delivery Plus está pensada para ser simple y entendible: cada módulo funciona de forma independiente, el carrito vive en el navegador sin necesidad de backend, y el código está dividido de manera que cada integrante del equipo pueda trabajar su parte sin bloquear a los demás.

---

## Como funciona

El usuario entra a la app, se registra o inicia sesión, y desde ese momento tiene acceso a un catálogo de restaurantes cargados desde la base de datos. Puede entrar a cualquier restaurante, ver su menú y agregar productos al carrito. Cuando está listo, va al checkout, ingresa su dirección y confirma el pedido. Todo queda guardado y puede consultarlo después desde su historial de pedidos. También puede editar su perfil y administrar sus direcciones en cualquier momento.

La sesión se mantiene en el navegador y las rutas están protegidas: si el usuario no está autenticado, la app lo redirige automáticamente al login.

---

## Tabla de contenidos

- [Stack](#stack)
- [Requisitos](#requisitos)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Módulos](#módulos)
- [Base de datos](#base-de-datos)
- [Endpoints](#endpoints)
- [Equipo](#equipo)
- [Cómo correr el proyecto](#cómo-correr-el-proyecto)
- [Errores comunes](#errores-comunes)

---

## Stack

| Capa | Tecnología |
| Frontend | React + Vite + Tailwind CSS |
| Backend | Node.js (microservicios) |
| Base de datos | MySQL |
| Auth | JWT + localStorage |

---

## Requisitos

Antes de empezar, asegúrate de tener instalado:

- Node.js v18 o superior
- MySQL corriendo localmente

---

## Estructura del proyecto

delivery-plus/
├── frontend/
│   ├── src/
│   │   ├── pages/          # Una por cada pantalla
│   │   ├── components/     # Piezas reutilizables (Navbar, Cards...)
│   │   └── services/       # Conexión con el backend
│   └── ...
├── backend/
│   ├── auth-service/       # Microservicio de autenticación
│   └── app-service/        # Restaurantes, pedidos y perfil
└── database/
    ├── schema.sql
    └── seed.sql

---

## Módulos

### 1. Auth — Login / Register
Manejo de sesión del usuario. Al autenticarse, los datos se guardan en `localStorage`. Las rutas protegidas redirigen al login si no hay sesión activa.

- `LoginPage.jsx` — Formulario de email + password
- `RegisterPage.jsx` — Registro con nombre, email, teléfono y password
- `ProtectedRoute.jsx` — Guarda de rutas privadas
- `authService.js` — Llamadas al backend de auth

### 2. Restaurantes — Catálogo y Menú
Consume la base de datos real para listar restaurantes y mostrar el menú de cada uno.

- `HomePage.jsx` — Cards de restaurantes
- `RestaurantPage.jsx` — Menú del restaurante con botón "Agregar al carrito"
- `Navbar.jsx` — Navegación global
- `restaurantService.js` — Llamadas al backend

### 3. Carrito + Checkout
El carrito vive completamente en `localStorage` (sin backend). El checkout envía el pedido final al servidor.

- `CartPage.jsx` — Lista de productos, cambio de cantidades y total
- `CheckoutPage.jsx` — Resumen del pedido, dirección y confirmación
- `cartService.js` — Lógica local del carrito
- `orderService.js` — Creación del pedido en el backend

### 4. Pedidos
Historial de órdenes realizadas por el usuario autenticado.

- `OrdersPage.jsx` — Lista de pedidos
- `OrderDetailPage.jsx` — Detalle de un pedido específico

### 5. Perfil + Direcciones
Edición de datos del usuario y CRUD completo de direcciones guardadas.

- `ProfilePage.jsx` — Editar nombre, email y teléfono
- `AddressesPage.jsx` — Ver, agregar, editar y eliminar direcciones
- `profileService.js` — Llamadas al backend de perfil

---

## Base de datos

El proyecto usa 6 tablas principales:

| Tabla | Descripción |
| `users` | Usuarios registrados |
| `restaurants` | Restaurantes disponibles |
| `menu_items` | Platillos por restaurante |
| `orders` | Pedidos realizados |
| `order_items` | Productos dentro de cada pedido (con snapshot de nombre y precio) |
| `addresses` | Direcciones guardadas por usuario |

El archivo `seed.sql` precarga 15 restaurantes y 75 productos para que el equipo de frontend pueda trabajar desde el primer día sin esperar al backend.

---

## Endpoints

### auth-service
```
POST /api/auth/register
POST /api/auth/login
```

### app-service — Restaurantes
```
GET  /api/restaurants
GET  /api/restaurants/:id
GET  /api/restaurants/:id/menu
```

### app-service — Pedidos
```
POST /api/orders
GET  /api/orders
GET  /api/orders/:id
```

### app-service — Perfil y Direcciones
```
GET    /api/profile
PUT    /api/profile
GET    /api/profile/addresses
POST   /api/profile/addresses
PUT    /api/profile/addresses/:id
DELETE /api/profile/addresses/:id
```

---

## Equipo

### Frontend
| Integrante | Responsabilidad | Archivos clave |
| Front 1 | Auth y protección de rutas | `LoginPage`, `RegisterPage`, `ProtectedRoute`, `authService` |
| Front 2 | Catálogo de restaurantes | `HomePage`, `Navbar`, `restaurantService` |
| Front 3 | Menú y carrito local | `RestaurantPage`, `cartService` |
| Front 4 | Carrito y checkout | `CartPage`, `CheckoutPage`, `orderService` |
| Front 5 | Perfil, direcciones y pedidos | `ProfilePage`, `AddressesPage`, `OrdersPage`, `profileService` |

### Backend
| Integrante | Responsabilidad | Archivos clave |
| Back 1 | Auth service | `authController`, `userModel`, `authRoutes` |
| Back 2 | Restaurantes | `restaurantController`, `restaurantModel`, `restaurantRoutes` |
| Back 3 | Pedidos | `orderController`, `orderModel`, `orderRoutes` |
| Back 4 | Perfil, direcciones y utilidades | `db.js`, middlewares, rutas de perfil |

### Base de datos
| Integrante | Responsabilidad | Archivos clave |
| DB 1 | Schema y datos de prueba | `schema.sql`, `seed.sql` |

---

## Meta del proyecto

Login y registro funcional
Ver lista de restaurantes
Agregar productos al carrito
Realizar un pedido
Ver historial de pedidos
Editar perfil
CRUD de direcciones
