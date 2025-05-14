Here's a complete `README.md` file for your Img Enhancer project based on everything we've covered—project purpose, setup, build, deployment, performance, and error resolution:

---

```markdown
# Img Enhancer 🖼️✨

A React-based web app for enhancing images and removing backgrounds using external APIs. Built with the MERN stack, Firebase authentication, Vite for blazing-fast builds, TailwindCSS, and various performance optimizations.

live link: (https://img-enhancer.netlify.app/)

---

## 🌟 Features

- 🔐 Firebase Authentication (Email/Password & Google)
- 🌗 Dark/Light Theme Toggle with Persistence
- 📸 Image Background Removal using [Aoscdn Visual Segmentation API](https://techhk.aoscdn.com)
- ⚡ Image Enhancement Tool
- 🧩 Drag & Drop File Upload with Preview
- 🔁 Responsive Dashboard with Protected Routes
- 🚀 Optimized for Performance (Vite + Compression + Lazy Loading)

---

## 📁 File Structure

```

src/
├── components/
│   ├── BackgroundRemover.jsx
│   ├── DashboardLayout.jsx
│   ├── Hero.jsx
│   ├── Homw\.jsx
│   ├── SignInSignUp.jsx
├── firebase.js
├── App.jsx
├── main.jsx
.env
vite.config.js

````

---

## 🔧 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/anujsc/img-enhancer.git 
cd img-enhancer
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Add Your Environment Variables

Create a `.env` file at the root level:

```env
VITE_API_KEY=your_actual_api_key
```

### 4. Start the Dev Server

```bash
npm run dev
```

---

## ⚙️ Build & Deployment

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Netlify Deployment Steps

1. Set environment variable `VITE_API_KEY` in the Netlify Dashboard.
2. Make sure your `vite.config.js` has no duplicate `plugins` keys.
3. Push changes and Netlify will auto-deploy.

---

## 🚀 Performance Optimizations

* Enabled Brotli/Gzip compression using `vite-plugin-compression`
* Minified JavaScript
* Removed unused JS with tree-shaking
* Optimized image sizes and lazy loaded where applicable
* Ensured LCP below 2.5s in most scenarios
* Reduced layout shifts and long-thread blocking

---

## 🧪 Troubleshooting

### `401 Unauthorized` on Background Remover API

* Ensure your `.env` file includes `VITE_API_KEY`.
* Restart the Vite dev server after adding the env variable.
* Set the same env key in your Netlify environment settings.

### Build Failures

* Missing files like `DashboardLayout.jsx`: ensure file names and imports match exactly.
* Duplicate `plugins` key in `vite.config.js`: merge them into one array.
* Use `npm install` to resolve missing dependencies before building.

---

## 📦 Dependencies

* `react`, `react-dom`, `react-router-dom`
* `firebase`, `react-firebase-hooks`
* `axios`, `react-dropzone`, `react-hot-toast`
* `@lottiefiles/dotlottie-react`, `framer-motion`, `lucide-react`
* `vite`, `tailwindcss`, `vite-plugin-compression`

---

## 🙌 Acknowledgements

* [Aoscdn API](https://techhk.aoscdn.com/) for image background removal
* [Firebase](https://firebase.google.com) for authentication
* [TailwindCSS](https://tailwindcss.com) for styling
* [Vite](https://vitejs.dev) for lightning-fast builds

---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 👤 Author

Made with 💻 by Anuj Chaudhari (https://github.com/anujsc)


