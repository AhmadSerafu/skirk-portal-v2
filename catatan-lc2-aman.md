# Catatan Live Code 2 — Phase 2

---

## 1. Setup Project

```bash
npm create vite@latest nama-project -- --template react
cd nama-project
npm install -D tailwindcss @tailwindcss/vite
npm install react-router axios daisyui react-toastify
```

**`vite.config.js`:**
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

**`src/index.css`** — hapus semua, ganti:
```css
@import "tailwindcss";
@plugin "daisyui" {
  themes: dim --default;
}
```

Hapus `src/App.css`, kosongkan `src/App.jsx`

---

## 2. Struktur Folder

Buat folder berikut di dalam `src/`:

```
src/
├── components/
├── constants/
├── layouts/
├── views/
├── App.jsx
└── main.jsx
```

File yang dibuat:
```
constants/url.js
layouts/AuthLayout.jsx
layouts/MainLayout.jsx
components/Navbar.jsx
components/Card.jsx
components/GroceryForm.jsx
views/LoginPage.jsx
views/RegisterPage.jsx
views/HomePage.jsx
views/AddGroceryPage.jsx
views/UpdateGroceryPage.jsx
```

---

## 3. Urutan Pengerjaan Awal

### Step 1 — `constants/url.js`
```js
export const url = 'https://...' // url API
```

### Step 2 — `main.jsx`
Wrap dengan `BrowserRouter`:
```jsx
import { BrowserRouter } from 'react-router'
// wrap <App /> dengan <BrowserRouter>
```

### Step 3 — Buat semua halaman dulu (kosong)
Buat file views & components dengan return kosong dulu:
```jsx
export default function LoginPage() {
  return <div>Login Page</div>
}
```

### Step 4 — `App.jsx`
Setup Routes + ToastContainer:
```jsx
import { Routes, Route } from 'react-router'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import semua layouts & pages
```

### Step 5 — `AuthLayout.jsx`
Cek token → redirect ke `/` kalau sudah login

### Step 6 — `MainLayout.jsx`
Cek token → redirect ke `/login` kalau belum login, render Navbar + Outlet

---

## 4. Template HTML

### `main.jsx`
```jsx
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
```

### `App.jsx`
```jsx
<>
  <ToastContainer />
  <Routes>
    <Route element={<AuthLayout />}>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Route>
    <Route element={<MainLayout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/add-grocery" element={<AddGroceryPage />} />
      <Route path="/update-grocery/:id" element={<UpdateGroceryPage />} />
    </Route>
  </Routes>
</>
```

### `AuthLayout.jsx`
```jsx
// jika ada token → Navigate to="/"
// return <Outlet />
```

### `MainLayout.jsx`
```jsx
// jika tidak ada token → Navigate to="/login"
// return <> <Navbar /> <Outlet /> </>
```

### `Navbar.jsx` — 2 segmen (kiri & kanan)
```jsx
<div className="navbar bg-base-300 px-6 shadow-md">
  <div className="navbar-start gap-4">
    <Link to="/" className="text-2xl font-bold">App Name</Link>
    <Link to="/">Home</Link>
    <Link to="/add">Add</Link>
  </div>
  <div className="navbar-end">
    <button className="btn btn-error btn-sm">Logout</button>
  </div>
</div>
```

### `Navbar.jsx` — 3 segmen (kiri, tengah, kanan)
```jsx
<div className="navbar bg-base-300 px-6 shadow-md">
  <div className="navbar-start">
    <button className="btn btn-primary btn-sm">My Coin</button>
  </div>
  <div className="navbar-center">
    <Link to="/" className="text-2xl font-bold">App Name</Link>
  </div>
  <div className="navbar-end">
    <button className="btn btn-error btn-sm">Logout</button>
  </div>
</div>
```

### `LoginPage.jsx` & `RegisterPage.jsx`
```jsx
<div className="flex h-screen">
  {/* Kiri - Foto */}
  <div className="flex-1">
    <img src="..." className="w-full h-full object-cover" />
  </div>

  {/* Kanan - Form */}
  <div className="w-1/2 flex flex-col items-center justify-center gap-7">
    <h2 className="text-4xl font-bold">App Name</h2>
    <div className="card bg-base-200 shadow-xl w-9/12">
      <form className="card-body">
        <h2 className="card-title text-2xl mb-4">Login</h2>
        <label className="label">Email</label>
        <input type="email" placeholder="Email" className="input input-bordered w-full mb-3" />
        <label className="label">Password</label>
        <input type="password" placeholder="Password" className="input input-bordered w-full mb-5" />
        <button type="submit" className="btn btn-primary w-full">Login</button>
        <p className="text-gray-500 mt-2">
          Don't have an account yet?{" "}
          <Link className="text-yellow-200 underline" to="/register">Register</Link>
        </p>
      </form>
    </div>
  </div>
</div>
```

### `HomePage.jsx`
```jsx
<div className="p-6">
  <div className="grid grid-cols-5 gap-4">
    {/* Card.jsx di loop disini */}
  </div>
</div>
```

### `Card.jsx`
```jsx
<div className="card bg-base-200 shadow-md w-48">
  <div className="card-body items-center text-center gap-3">
    <img
      src={item.imageUrl}
      alt={item.name}
      className="w-16 h-16 rounded-full object-cover"
    />
    <h2 className="card-title text-lg">{item.name}</h2>
    <p className="text-xs opacity-70">{item.symbol}</p>
    <p className="text-sm font-bold">${item.price}</p>
    <p className="text-xs opacity-70 line-clamp-3">{item.description}</p>
    <button className="btn btn-success btn-sm w-full">Add</button>
  </div>
</div>
```

### `GroceryForm.jsx` (Add & Update)
```jsx
<div className="flex justify-center p-10">
  <div className="card w-full max-w-lg bg-base-200 shadow-xl">
    <form className="card-body">
      <h2 className="card-title text-2xl mb-4">{formTitle}</h2>
      <label>Title</label>
      <input placeholder="Title" className="input input-bordered w-full mb-3" />
      <label>Price</label>
      <input type="number" placeholder="Price" className="input input-bordered w-full mb-3" />
      <label>Tag</label>
      <input placeholder="Tag" className="input input-bordered w-full mb-3" />
      <label>Image URL</label>
      <input placeholder="Image URL" className="input input-bordered w-full mb-5" />
      <div className="flex gap-2">
        <Link to="/" className="btn btn-neutral flex-1">Back</Link>
        <button type="submit" className="btn btn-warning flex-1">Submit</button>
      </div>
    </form>
  </div>
</div>
```

---

## 5. Template Card Varian

### `Card.jsx` — Home (tombol Add)
```jsx
<div className="card bg-base-200 shadow-md w-48">
  <div className="card-body items-center text-center gap-3">
    <img
      src={item.imageUrl}
      alt={item.name}
      className="w-16 h-16 rounded-full object-cover"
    />
    <h2 className="card-title text-lg">{item.name}</h2>
    <p className="text-xs opacity-70">{item.symbol}</p>
    <p className="text-sm font-bold">${item.price}</p>
    <p className="text-xs opacity-70 line-clamp-3">{item.description}</p>
    <button className="btn btn-success btn-sm w-full">Add</button>
  </div>
</div>
```

### `MyCoinCard.jsx` — My Coin (tombol Update + Delete)
```jsx
<div className="card bg-base-200 shadow-md w-48">
  <div className="card-body items-center text-center gap-3">
    <img
      src={item.imageUrl}
      alt={item.name}
      className="w-16 h-16 rounded-full object-cover"
    />
    <h2 className="card-title text-lg">{item.name}</h2>
    <p className="text-xs opacity-70">{item.symbol}</p>
    <p className="text-sm font-bold">${item.price}</p>
    <p className="text-xs opacity-70 line-clamp-3">{item.description}</p>
    <button className="btn btn-warning btn-sm w-full">Update</button>
    <button className="btn btn-error btn-sm w-full">Delete</button>
  </div>
</div>
```

---

## 7. Template DetailPage (jaga-jaga)

```jsx
<div className="flex justify-center p-10">
  <div className="card bg-base-200 shadow-xl w-64">
    <div className="card-body items-center text-center gap-3">
      <img
        src={item.imageUrl}
        alt={item.name}
        className="w-24 h-24 rounded-full object-cover"
      />
      <h2 className="card-title text-2xl">{item.name}</h2>
      <p className="text-xs opacity-70">{item.symbol}</p>
      <p className="text-sm font-bold">${item.price}</p>
      <p className="text-xs opacity-70">{item.description}</p>

      <div className="divider w-full" />

      <label className="text-sm">Amount</label>
      <input
        type="number"
        className="input input-bordered input-sm w-full text-center"
        placeholder="Enter amount"
      />

      <div className="flex gap-2 w-full mt-2">
        <Link to="/" className="btn btn-neutral btn-sm flex-1">Back</Link>
        <button className="btn btn-warning btn-sm flex-1">Update</button>
      </div>
    </div>
  </div>
</div>
```

---

## 6. Variasi Layout Login/Register

### Split screen (kiri-kanan) — default
```jsx
<div className="flex h-screen">
  <div className="flex-1">
    <img src="..." className="w-full h-full object-cover" />
  </div>
  <div className="w-1/2 flex flex-col items-center justify-center">
    ...form...
  </div>
</div>
```

### Split screen dibalik (form kiri, foto kanan)
Tinggal balik urutan div-nya.

### Foto atas, form bawah
```jsx
<div className="flex flex-col h-screen">
  <div className="flex-1">
    <img src="..." className="w-full h-full object-cover" />
  </div>
  <div className="h-1/2 flex items-center justify-center">
    ...form...
  </div>
</div>
```

### Form centered tanpa foto
```jsx
<div className="flex justify-center items-center min-h-screen">
  <div className="card w-96 ...">
    ...form...
  </div>
</div>
```

### Foto jadi background
```jsx
<div className="relative h-screen">
  {/* Background foto */}
  <img src="..." className="w-full h-full object-cover absolute inset-0" />

  {/* Overlay gelap */}
  <div className="absolute inset-0 bg-black opacity-50" />

  {/* Form di atas foto */}
  <div className="relative z-10 flex justify-center items-center h-full">
    <div className="card bg-base-200 w-96">
      ...form...
    </div>
  </div>
</div>
```

---

## 6. useState & useNavigate — Dipakai Dimana

### `LoginPage.jsx`
```
useState  → email, password
useNavigate → navigate('/') setelah login berhasil
```

### `RegisterPage.jsx`
```
useState  → email, password
useNavigate → navigate('/login') setelah register berhasil
```

### `HomePage.jsx`
```
useState  → groceries, loading
useNavigate → tidak perlu (ada di Card)
```

### `Card.jsx`
```
useState  → tidak perlu
useNavigate → navigate('/update-grocery/:id') tombol Update
```

### `AddGroceryPage.jsx`
```
useState  → title, price, tag, imageUrl, loading
useNavigate → navigate('/') setelah add berhasil
```

### `UpdateGroceryPage.jsx`
```
useState  → title, price, tag, imageUrl, loading
useNavigate → navigate('/') setelah update berhasil
useParams → id
```

### `Navbar.jsx`
```
useState  → tidak perlu
useNavigate → navigate('/login') setelah logout
```

---

## 6. Hal Penting

- Import dari `react-router` bukan `react-router-dom`
- `price` dari input → konversi ke number dengan `+e.target.value`
- `id` dari `useParams` adalah string → konversi dengan `+id`
- `axios.put/post` → urutan: `(url, body, { headers })`
- Jangan pakai `alert` → pakai `toast`
- Navigasi pakai `Link` atau `useNavigate`, jangan `<a href>`
- `GET /groceries/:id` tidak ada → fetch semua lalu `.find()`
- `UserId` tidak perlu dikirim → dihandle backend dari token
