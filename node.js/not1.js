app.use(express.json());

// Bu ne işe yarar?
// 1. Gelen JSON verisini JavaScript objesine çevirir
// Örnek:
// JSON: {"name": "Ali", "age": 25}
// JavaScript: {name: "Ali", age: 25}

// Kullanım:
app.post('/users', (req, res) => {
const user = req.body;  // JSON otomatik olarak objeye dönüşür
console.log([user.name](http://user.name/)); // "Ali"
});

// 1. req.params: URL'deki parametreler
app.get('/users/:id', (req, res) => {
console.log([req.params.id](http://req.params.id/));  // URL: /users/5 -> "5"
});

// 2. req.body: POST/PUT ile gönderilen veri
app.post('/users', (req, res) => {
console.log(req.body);  // {"name": "Ali", "age": 25}
});

// 3. req.query: URL'deki sorgu parametreleri
app.get('/users', (req, res) => {
console.log(req.query);  // URL: /users?age=25&city=Istanbul
// {age: "25", city: "Istanbul"}
});

// Middleware = Ara Yazılım
// İstek -> Middleware -> Route Handler

// Örnek 1: Loglama Middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();  // Sonraki middleware'e geç
});

// Örnek 2: Yetki Kontrolü
app.use((req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ error: 'Giriş yapmalısınız' });
    }
    next();
});

// Örnek 3: Hata Yakalama
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Sunucu hatası' });
});


// Birden fazla middleware'i sırayla kullanma
app.get('/admin/users',
    checkAuth,         // Önce giriş kontrolü
    checkAdmin,        // Sonra admin kontrolü
    async (req, res) => {
        const users = await User.find();
        res.json(users);
    }
);

// Middleware fonksiyonları
function checkAuth(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).json({ error: 'Giriş yapın' });
    }
    next();
}

function checkAdmin(req, res, next) {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Admin değilsiniz' });
    }
    next();
}


// URL: /products?minPrice=100&maxPrice=500&category=electronics
app.get('/products', (req, res) => {
    const { minPrice, maxPrice, category } = req.query;
    
    let filteredProducts = products;

    if (minPrice) {
        filteredProducts = filteredProducts.filter(p => p.price >= minPrice);
    }

    if (maxPrice) {
        filteredProducts = filteredProducts.filter(p => p.price <= maxPrice);
    }

    if (category) {
        filteredProducts = filteredProducts.filter(p => p.category === category);
    }

    res.json(filteredProducts);
});





// 1. GET - Veri Okuma
app.get('/posts', (req, res) => {
    // posts dizisindeki tüm yazıları göster
    
});

// 2. POST - Yeni Veri Ekleme
app.post('/posts', (req, res) => {
    // Yeni yazı ekle
});

// 3. PUT - Veri Güncelleme
app.put('/posts/:id', (req, res) => {
    // Belirli bir yazıyı güncelle
});

// 4. DELETE - Veri Silme
app.delete('/posts/:id', (req, res) => {
    // Belirli bir yazıyı sil
});





function ornek(req, res) {
    // 1. req.body: POST/PUT ile gelen veri
    const yeniYazi = req.body;  // {"title": "Başlık", "content": "İçerik"}

    // 2. req.params: URL'deki değişkenler
    const yaziId = req.params.id;  // /posts/5 -> id: "5"

    // 3. req.query: URL'deki sorgu parametreleri
    const kategori = req.query.category;  // /posts?category=spor -> "spor"

    // 4. req.headers: İstek başlıkları
    const token = req.headers.authorization;  // Kullanıcı girişi için
}




function ornek(req, res) {
    // 1. Başarılı cevap
    res.json({ mesaj: "Başarılı!" });  // Veriyi JSON olarak gönder

    // 2. Hata durumu
    res.status(404).json({ hata: "Bulunamadı" });

    // 3. Sadece durum kodu
    res.sendStatus(204);  // "No Content"
}





// 1. Giriş kontrolü middleware
function girisKontrol(req, res, next) {
    // Token var mı?
    const token = req.headers.authorization;
    
    if (!token) {
        return res.status(401).json({ hata: "Giriş yapmalısınız" });
    }

    // Bir sonraki adıma geç
    next();
}

// Kullanımı:
app.post('/posts', girisKontrol, (req, res) => {
    // Buraya sadece giriş yapmış kullanıcılar gelebilir
});







// Örnek kullanıcılar
let users = [
    { id: 1, username: "ali", role: "user" },
    { id: 2, username: "admin", role: "admin" }
];

// Örnek yazılar
let posts = [
    { 
        id: 1, 
        title: "İlk Yazı", 
        content: "Merhaba!",
        author: "ali",
        category: "genel"
    }
];

// 1. Tüm yazıları listele
app.get('/posts', (req, res) => {
    // Kategori filtresi var mı?
    const category = req.query.category;
    
    if (category) {
        // Sadece o kategorideki yazıları göster
        const filtered = posts.filter(post => post.category === category);
        return res.json(filtered);
    }

    // Tüm yazıları göster
    res.json(posts);
});

// 2. Yeni yazı ekle
app.post('/posts', girisKontrol, (req, res) => {
    // Gelen veriyi kontrol et
    const { title, content, category } = req.body;
    
    if (!title || !content) {
        return res.status(400).json({ hata: "Başlık ve içerik zorunlu" });
    }

    // Yeni yazı oluştur
    const newPost = {
        id: posts.length + 1,
        title,
        content,
        category,
        author: req.user.username  // Giriş yapan kullanıcı
    };

    // Listeye ekle
    posts.push(newPost);

    // Başarılı cevap dön
    res.status(201).json(newPost);
});




