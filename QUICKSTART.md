# Quick Start Guide / Hızlı Başlangıç Kılavuzu

## English

### Installation

1. **Install Python** (3.8 or higher)
   - Download from: https://www.python.org/downloads/

2. **Install tkinter** (if needed)
   - Ubuntu/Debian: `sudo apt-get install python3-tk`
   - Fedora: `sudo dnf install python3-tkinter`
   - macOS/Windows: Already included with Python

3. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

### Running the Application

**Option 1: Direct**
```bash
python app.py
```

**Option 2: With checks**
```bash
python run.py
```

### What You'll See

1. **Splash Screen** (3 seconds)
   - Gold "M" logo
   - "Midas Pro" title
   - Progress bar

2. **Main Application**
   - Top: Title bar with window controls
   - Left: Navigation sidebar (3 tabs)
   - Center: Main content area
   - Dashboard shows network graph and statistics

### Navigation

- **🛡️ Dashboard**: Network visualization and threat statistics
- **⚙️ Workflow**: Workflow orchestration (coming soon)
- **🧠 Intelligence**: Intelligence dashboard (coming soon)

---

## Türkçe

### Kurulum

1. **Python Yükleyin** (3.8 veya üzeri)
   - İndir: https://www.python.org/downloads/

2. **tkinter Yükleyin** (gerekirse)
   - Ubuntu/Debian: `sudo apt-get install python3-tk`
   - Fedora: `sudo dnf install python3-tkinter`
   - macOS/Windows: Python ile birlikte gelir

3. **Python bağımlılıklarını yükleyin**
   ```bash
   pip install -r requirements.txt
   ```

### Uygulamayı Çalıştırma

**Seçenek 1: Doğrudan**
```bash
python app.py
```

**Seçenek 2: Kontroller ile**
```bash
python run.py
```

### Ne Göreceksiniz

1. **Başlangıç Ekranı** (3 saniye)
   - Altın "M" logosu
   - "Midas Pro" başlığı
   - İlerleme çubuğu

2. **Ana Uygulama**
   - Üst: Pencere kontrolleri ile başlık çubuğu
   - Sol: Navigasyon kenar çubuğu (3 sekme)
   - Merkez: Ana içerik alanı
   - Dashboard ağ grafiği ve istatistikleri gösterir

### Navigasyon

- **🛡️ Dashboard**: Ağ görselleştirmesi ve tehdit istatistikleri
- **⚙️ Workflow**: İş akışı orkestrasyon (yakında)
- **🧠 Intelligence**: İstihbarat paneli (yakında)

---

## Troubleshooting / Sorun Giderme

### Error: "No module named 'tkinter'"
**Solution**: Install tkinter system package (see above)
**Çözüm**: tkinter sistem paketini yükleyin (yukarıya bakın)

### Error: "No module named 'customtkinter'"
**Solution**: `pip install customtkinter`
**Çözüm**: `pip install customtkinter`

### Window doesn't appear
**Solution**: Check that you're not running in a headless environment
**Çözüm**: GUI ortamında çalıştırdığınızdan emin olun

---

## System Requirements / Sistem Gereksinimleri

- **Python**: 3.8+
- **RAM**: 50 MB minimum
- **Display**: GUI environment required
- **OS**: Windows, macOS, Linux (with X11)

---

## Files / Dosyalar

- `app.py` - Main application / Ana uygulama
- `run.py` - Launcher script / Başlatıcı
- `requirements.txt` - Dependencies / Bağımlılıklar
- `README_PYTHON.md` - Full documentation / Tam dokümantasyon
- `CONVERSION_NOTES.md` - Technical details / Teknik detaylar
- `PROJECT_SUMMARY.md` - Summary / Özet

---

## Support / Destek

For issues, see:
- `README_PYTHON.md` for detailed documentation
- `CONVERSION_NOTES.md` for technical details

Sorunlar için bakınız:
- `README_PYTHON.md` detaylı dokümantasyon için
- `CONVERSION_NOTES.md` teknik detaylar için
