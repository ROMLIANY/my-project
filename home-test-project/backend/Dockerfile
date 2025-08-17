# בחרנו Node 18 כמו שציינת
FROM node:18

# הגדרת תיקיית עבודה בקונטיינר
WORKDIR /app

# העתקה של קבצי package.json ו־package-lock.json בלבד
COPY package*.json ./

# התקנת המודולים עם rebuild לבחירת architecture נכון
RUN npm install --build-from-source

# העתקת שאר הקבצים
COPY . .

# חשיפה של פורט (אם backend מקשיב)
EXPOSE 3000

# הרצת השרת
CMD ["node", "server.js"]
