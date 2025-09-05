# 🌍 Earthquake Visualizer

An interactive web application that visualizes recent earthquake activity around the world.  
Built with **React**, **Tailwind CSS**, and **Leaflet**, this app fetches real-time data from the **USGS Earthquake API** and displays seismic events on an interactive map.  
Users can explore earthquake details and generate AI-powered summaries via the **Perplexity API**.

---

## ✨ Features
- 🌐 Interactive world map with earthquake markers  
- 🎨 Color-coded markers by magnitude (red = large, orange = medium, yellow = small)  
- ⏳ Filter earthquakes by time range: past hour, past day, past 7 days, past 30 days  
- 📝 Popup with earthquake details (place, magnitude, time, depth, link)  
- 🤖 AI Summaries: Generate ~100-word natural-language summaries using Perplexity API  
- 📱 Responsive design for desktop & mobile  
- ⚡ Loading indicator + error handling for smooth UX  

---

## Tech Stack
- **React** – Frontend framework  
- **Tailwind CSS** – Styling  
- **React-Leaflet + Leaflet** – Map visualization  
- **USGS Earthquake API** – Real-time seismic data  
- **Perplexity API** – AI-powered summaries  

---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/your-username/earthquake-visualizer.git
cd earthquake-visualizer
Install dependencies
npm i
Start development server
npm start
