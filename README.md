<div align="center">
  
  ![Banner](https://files.catbox.moe/5gy908.png)

  # 📊 Poll App
  
  <p align="center">
  Poll app made for Hackclub with DB entierly on supabase! So u dont have the hassle of phpmyadmin and more! :)
  </p>

  [![Next.js](https://img.shields.io/badge/Next.js-14.2.10-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![Supabase](https://img.shields.io/badge/Supabase-Database-green?style=for-the-badge&logo=supabase)](https://supabase.com/)
  [![TailwindCSS](https://img.shields.io/badge/TailwindCSS-Styling-blue?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

</div>

## ✨ Features

- 🔐 Github Auth (yay)
- 📊 Chart.js
- 📱 Responsive
- ⏰ poll expiration
- 🎨 Darkkkk ui with Tailwind CSS

## 🚀 Quick Start

```bash
git clone https://github.com/deployor/poll-app.git

npm install

cp .env.example 

.env.local

# Start
npm run build
npm run start
```

## 🛠 Tech Stack

- **Frontend:** Next.js, TailwindCSS, Chart.js
- **Backend:** Supabase
- **Authentication:** Supabase auth
- **Hosting:** Render, but anything should work!
- **Database:** PostgreSQL (via Supabase)

## 📖 Usage

1. Sign in with your GitHub account
2. Create a new poll with multiple options
3. Share the poll link with others
4. View results after voting

## 🔧 Configuration

Create a `.env.local` file with:

```env
NEXT_PUBLIC_SUPABASE_URL=BEANS.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=BEANSSS
```

## 📱 Screenshots

<div align="center">
  <img src="https://files.catbox.moe/r3mt2l.png" alt="Home Page" width="400" />
</div>

## 🗺 Roadmap

Future enhancements planned for this project:

- [x] Auth with Supabase
- [x] Revamped Design
- [ ] Real-time updates using Supabase subscriptions
- [ ] Advanced poll analytics
- [ ] Tag System (so u can filter)
- [ ] Social sharing integration
- [ ] Export as CSV
- [ ] Better Charts!

## 🌟 Features in Detail

| Feature | Description |
|---------|------------|
| Authentication | Secure GitHub OAuth integration |
| Poll Creation | Create polls with multiple options and custom duration |
| Results Visualization | Beautiful charts using Chart.js |
| Layout Responsive | Works seamlessly on all devices :) |

## 🤝 Contributing

Fork and Create a PR! Simple as that!

## 📄 License

This project is licensed under the MIT License - see the [License](LICENSE) file for details.

<div align="center">

Made with ❤️ by [Deployor](https://github.com/yourusername)

</div>