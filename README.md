# 🚀 Delivery App — Guía de Ejecución

Este proyecto está dividido en 3 partes principales:

* 🟣 Frontend (React)
* 🔵 Backend (2 servicios)

  * Auth Service
  * App Service
* 🗄️ Base de datos (MySQL)

---

# 🧠 REQUISITOS

Antes de empezar, asegúrate de tener:

* Node.js instalado (v18 o superior)
* MySQL instalado y corriendo

---

# 🗄️ 1. BASE DE DATOS

1. Abre tu gestor de MySQL (Workbench o terminal)

2. Crea la base de datos:

```sql
CREATE DATABASE delivery_app;
```

3. Ejecuta los archivos dentro de:

```
database/
```

👉 Primero:

* `schema.sql`

👉 Luego:

* `seed.sql`

---

# 🔐 CONFIGURAR VARIABLES DE ENTORNO

En cada servicio backend hay un archivo `.env`

---

## 📁 auth-service/.env

```env
PORT=4000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=delivery_app
```

---

## 📁 app-service/.env

```env
PORT=4001
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=delivery_app
```

---

# 📦 INSTALAR DEPENDENCIAS

Cada parte del proyecto tiene su propio `package.json`.

Debes instalar dependencias en cada una:

---

## 🟣 Frontend

```bash
cd frontend
npm install
```

---

## 🔵 Auth Service

```bash
cd backend/auth-service
npm install
```

---

## 🔵 App Service

```bash
cd backend/app-service
npm install
```

---

# ▶️ EJECUTAR EL PROYECTO (POR SEPARADO)

Debes abrir **3 terminales diferentes**.

---

## 🟣 Terminal 1 — Frontend

```bash
cd frontend
npm run dev
```

👉 Corre en:

```
http://localhost:3000
```

---

## 🔐 Terminal 2 — Auth Service

```bash
cd backend/auth-service
npm run dev
```

👉 Corre en:

```
http://localhost:4000
```

---

## 🍔 Terminal 3 — App Service

```bash
cd backend/app-service
npm run dev
```

👉 Corre en:

```
http://localhost:4001
```

---

# 🚀 OPCIONAL — EJECUTAR TODO JUNTO

Desde la raíz del proyecto:

```bash
npm run dev
```

👉 Esto levanta todo automáticamente

---

# 🧩 ESTRUCTURA DEL PROYECTO

```
delivery-app/
│
├── frontend/          → Interfaz (React)
├── backend/
│   ├── auth-service/  → Usuarios, login, perfil
│   └── app-service/   → Restaurantes, pedidos
│
├── database/          → SQL (estructura + datos)
```

---

# ⚠️ ERRORES COMUNES

## ❌ No corre el backend

✔️ Revisa `.env`
✔️ Verifica que MySQL esté activo

---

## ❌ No conecta a la base de datos

✔️ Usuario / contraseña correctos
✔️ DB creada (`delivery_app`)

---

## ❌ Frontend no carga datos

✔️ Backend corriendo
✔️ URLs correctas (puertos 4000 / 4001)

---

# 🏆 OBJETIVO

Que funcione este flujo:

👉 Login
👉 Ver restaurantes
👉 Agregar al carrito
👉 Crear pedido
👉 Ver pedidos
👉 Editar perfil

---

# 💬 NOTA FINAL

No buscamos perfección técnica.

Buscamos:

* Que funcione

---

Si todos hacen su parte, esto sale fácil.