# Orbital Salvage Operations v0.01

A cyberpunk-themed incremental clicker game where you mine debris fields, build a fleet, and defend against hostile netrunners.

```
╔═══════════════════════════════════════════════════════════╗
║       Orbital Salvage Operations v0.01                   ║
╚═══════════════════════════════════════════════════════════╝
```

## 🎮 Play Now

Just open `index.html` in any modern web browser. No installation required!

## ✨ Features

### Core Gameplay
- **Click Mining**: Extract scrap metal from debris fields
- **Fleet Management**: Build and deploy ships for passive income
- **Strategic Deployment**: Deploy ships to earn credits, but risk losing them in combat
- **Progressive Difficulty**: Enemies get stronger as you advance

### Combat System
- **Threshold Bosses**: Trigger at 10k, 50k, 100k, etc. - major challenges!
- **Random Attacks**: Periodic fleet battles when mining rate ≥ 50 CR/sec
- **Warning System**: 3-second countdown before any attack
- **Ship Destruction**: Failed defenses destroy deployed ships (worse in boss battles)
- **Click Defense**: Rapidly click to defend against attacks

### Upgrades
- **Harvest Power** (HARV.PWR): Increase metal per click
- **Auto-Mining**: Generate passive income
- **Defense Rating**: Reduce clicks needed during attacks

### Ship Types
| Ship | Cost | Income | Survival Rate |
|------|------|--------|---------------|
| ▸ Recon Drone | 1,000 | 5/sec | 70% (50% vs boss) |
| ▶ Interceptor | 5,000 | 25/sec | 75% (55% vs boss) |
| ◆ Gunship | 25,000 | 100/sec | 80% (60% vs boss) |
| ◈ Destroyer | 100,000 | 500/sec | 85% (65% vs boss) |
| ◉ Capital Ship | 500,000 | 2,500/sec | 90% (70% vs boss) |
| ◙ Titan-Class | 2,500,000 | 12,500/sec | 95% (75% vs boss) |

## 🎯 Strategy Tips

1. **Build Defense Early**: Defense upgrades reduce click requirements
2. **Recall Before Bosses**: Pull ships back before crossing thresholds
3. **Balance Risk/Reward**: More deployed ships = more income but higher losses
4. **Progressive Attacks Scale**: Random attacks get +1 click every 2 waves
5. **Boss Battles are Deadly**: 20% reduced survival rates + harder click requirements

## 🛠️ Technical Details

- **Pure HTML/CSS/JavaScript** - No frameworks or dependencies
- **Local Storage Ready** - Easy to add save/load functionality
- **Mobile Friendly** - Responsive design for all devices
- **Cyberpunk Aesthetic** - Terminal-style green/cyan/magenta theme

## 📱 Controls

- **Click/Tap**: Extract resources
- **Deploy**: Send ships to combat zone (generates income)
- **Recall**: Bring ships back to safety (stops income)
- **Defend**: Rapidly click during attacks to protect assets

## 🎨 Theme

Immersive cyberpunk terminal interface with:
- ASCII box drawing characters
- Monospace Courier font
- Green (#00ff00) primary
- Cyan (#00ffff) secondary
- Magenta (#ff00ff) accents
- Red (#ff0000) warnings

## 📊 Game Progression

1. Start clicking to gather initial resources
2. Buy harvest power upgrades for faster clicking
3. Purchase auto-mining for passive income
4. Build ships and deploy them (risk vs reward)
5. Invest in defense as attacks begin at 50 CR/sec
6. Manage fleet during boss battles at thresholds
7. Survive increasingly difficult random attacks

## 🔧 Development

Built with vanilla web technologies:
- `index.html` - Game structure
- `style.css` - Cyberpunk styling
- `game.js` - All game logic

## 📄 License

Open source - feel free to fork, modify, and share!

## 👾 Credits

Created with Claude Sonnet 4.5

---

**Good luck, runner. The void is watching.** 🚀💀
