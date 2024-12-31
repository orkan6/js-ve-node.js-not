// 1️⃣ Gerekli Malzemeler
const express = require('express');
const app = express();
app.use(express.json());

// 2️⃣ Örnek Verimiz (Sanki küçük bir not defteri)
let notlar = [
    { id: 1, baslik: "Alışveriş", icerik: "Süt, ekmek al" },
    { id: 2, baslik: "Toplantı", icerik: "Yarın saat 10'da" }
];

// 3️⃣ OKUMA: Tüm notları göster
// 📝 GET = Veri OKUMA işlemi
app.get('/notlar', (req, res) => {
    // Tüm notları göster
    res.json(notlar);
});

// 4️⃣ EKLEME: Yeni not ekle
// 📝 POST = Yeni veri EKLEME işlemi
app.post('/notlar', (req, res) => {
    // Yeni notun bilgilerini al
    const yeniNot = {
        id: notlar.length + 1,
        baslik: req.body.baslik,    // Kullanıcının gönderdiği başlık
        icerik: req.body.icerik     // Kullanıcının gönderdiği içerik
    };
    
    // Başlık veya içerik eksikse hata ver
    if (!yeniNot.baslik || !yeniNot.icerik) {
        return res.status(400).json({
            mesaj: "❌ Başlık ve içerik yazmalısın!"
        });
    }
    
    // Yeni notu listeye ekle
    notlar.push(yeniNot);
    
    // Başarılı mesajı gönder
    res.status(201).json({
        mesaj: "✅ Not eklendi!",
        eklenenNot: yeniNot
    });
});

// 5️⃣ SİLME: Not sil
// 📝 DELETE = Veri SİLME işlemi
app.delete('/notlar/:id', (req, res) => {
    // Silinecek notun ID'sini al
    const id = parseInt(req.params.id);
    
    // Notu bul
    const notIndex = notlar.findIndex(n => n.id === id);
    
    // Not bulunamadıysa hata ver
    if (notIndex === -1) {
        return res.status(404).json({
            mesaj: "❌ Böyle bir not bulamadım!"
        });
    }
    
    // Notu sil
    notlar.splice(notIndex, 1);
    
    // Başarılı mesajı gönder
    res.json({
        mesaj: "✅ Not silindi!"
    });
});

// 6️⃣ Sunucuyu Çalıştır
const port = 3000;
app.listen(port, () => {
    console.log(`
    🚀 API Hazır!
    📝 http://localhost:${port}/notlar adresini ziyaret et
    `);
});
