# ============================================================
# 🏗️ TAHAP 1: BUILD STAGE
# ------------------------------------------------------------
# Tujuan: Membangun aplikasi frontend menggunakan Node.js
# Basis image: Node 20 Alpine (ringan & cepat)
# ============================================================
FROM dns-regx.dnstech.co.id/library/node:20.17.0-alpine AS img-builder

# 🌱 Set environment untuk build
ENV NODE_ENV=development

# 📁 Tentukan direktori kerja di dalam container
WORKDIR /app

# 🔒 Pastikan direktori dimiliki oleh user "node" agar aman
RUN chown node:node /app

# � Jalankan perintah sebagai user non-root (node)
USER node

# �📦 Salin file package.json & package-lock.json untuk caching layer dependensi
# Pastikan ownership untuk user node
COPY --chown=node:node package*.json ./

# 📥 Install semua dependensi (termasuk devDependencies untuk build)
# Menggunakan --legacy-peer-deps untuk mengatasi konflik dependency React v19
RUN npm install --legacy-peer-deps

# 📂 Salin seluruh source code aplikasi ke container
COPY --chown=node:node . .

# 🔧 Salin .env.docker ke .env untuk build environment variables (jika ada)
# File .env.docker sudah di-copy di step sebelumnya (COPY . .)
# Buat .env dari .env.docker jika ada, atau buat default jika tidak ada
RUN if [ -f .env.docker ]; then cp .env.docker .env; else echo "NODE_ENV=production" > .env; fi

# ⚙️ Jalankan build frontend
RUN npm run build || (echo "Build failed! Exit code: $?" && exit 1)

# 🧾 (Opsional) Debug hasil build: tampilkan isi direktori build (dengan fallback)
RUN pwd && (test -d public/build && echo "Found public/build:" && ls -alsh public/build) || (test -d build && echo "Found build:" && ls -alsh build) || (echo "Warning: Build directory not found, checking public directory..." && ls -alsh public/ || true)


# ============================================================
# 🚀 TAHAP 2: PRODUCTION STAGE
# ------------------------------------------------------------
# Tujuan: Menjalankan hasil build menggunakan NGINX
# Basis image: nginx:1.25-alpine (ringan & stabil)
# ============================================================
FROM nginx:1.25-alpine

# 📦 Salin hasil build dari tahap pertama ke direktori web NGINX
# Laravel Vite menghasilkan output di public/build
COPY --from=img-builder /app/public/build /usr/share/nginx/html

# ⚙️ Ganti konfigurasi default NGINX dengan file custom
COPY docker-config/nginx.conf /etc/nginx/conf.d/default.conf

# 🧰 Tambahkan entrypoint script untuk dynamic runtime replacement
COPY docker-config/entrypoint.sh /entrypoint.sh

# 🔐 Pastikan entrypoint script dapat dieksekusi
RUN chmod +x /entrypoint.sh && ls -l /

# 🚀 Gunakan entrypoint script sebagai eksekusi awal container
ENTRYPOINT ["/entrypoint.sh"]

# 🌐 Buka port 80 untuk akses HTTP
EXPOSE 80

# 🧠 Jalankan NGINX di foreground (agar container tetap hidup)
CMD ["nginx", "-g", "daemon off;"]
