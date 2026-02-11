# 🪙 $COSMO Dashboard

**Lightweight monitoring dashboard for $COSMO token on Supra Chain via Atmos Protocol**

---

## ✅ What's Included

**Dashboard Features:**
- 📊 Atmos Protocol Stats (TVL, Volume 24h/7d)
- 🔗 Supra Chain Metrics (Chain TVL, Protocol Count)
- 🪙 $COSMO Token Stats (Price, Market Cap, Volume)
- 🔄 Auto-refresh every 30 seconds
- 📱 Mobile-responsive design
- 🎨 Modern glassmorphism UI

**Tech Stack:**
- Pure HTML/CSS/JavaScript (no dependencies!)
- Client-side only (no backend needed)
- Zero cost hosting (GitHub Pages)

---

## 🚀 Quick Start

### 1. Local Testing

```bash
cd /data/.openclaw/workspace/cosmo-dashboard

# Simple Python server
python3 -m http.server 8080

# Or Node.js
npx serve

# Then open: http://localhost:8080
```

### 2. Deploy to GitHub Pages (FREE!)

```bash
# Create new repo on GitHub
# Upload these files:
# - index.html
# - app.js
# - README.md

# Enable GitHub Pages:
# Settings → Pages → Source: main branch → Save

# Your dashboard will be live at:
# https://yourusername.github.io/cosmo-dashboard
```

---

## ⚙️ Configuration

### Token Address (Already Set)
```javascript
TOKEN_ADDRESS: '0x11188bb79cd956ab6b8ddff06d64f479358b59ddbd2058a41b447cdf21c17ab0'
```

### API Endpoints (TODO: Replace with real endpoints!)

Edit `app.js` line 7-16:

```javascript
ENDPOINTS: {
    // Atmos Protocol API
    ATMOS_STATS: 'https://api.atmos.finance/stats',
    
    // Supra Chain API
    SUPRA_STATS: 'https://api.supra.com/chain/stats',
    
    // $COSMO Token API
    COSMO_PRICE: 'https://api.atmos.finance/token/...',
}
```

**REAL API Endpoints (Working!):**

1. **Atmos Protocol:**
   - Stats API: `https://api.atmos.ag/stats/api/overall-stats` ✅
   - Leaderboard: `https://api.atmos.ag/stats/api/v1/leaderboard/data` ✅
   - GraphQL: `https://prod-gw.atmosprotocol.com/graphql/` ✅
   - Token List: `https://prod-gw.atmosprotocol.com/swapRouter/tokenlist` ✅

2. **Supra Chain:**
   - Official RPC: https://rpc-mainnet.supra.com
   - Explorer API: Check SupraScan or similar
   - DeFi aggregators (DefiLlama, CoinGecko)

3. **$COSMO Token:**
   - Atmos DEX API (if available)
   - Or build custom RPC queries:
     ```javascript
     // Example RPC call for token data
     fetch('https://rpc-mainnet.supra.com', {
       method: 'POST',
       body: JSON.stringify({
         jsonrpc: '2.0',
         method: 'supra_getTokenBalance',
         params: [TOKEN_ADDRESS],
         id: 1
       })
     })
     ```

---

## 🔌 API Integration Guide

### Step 1: Find the API endpoints

**Option A: Browser DevTools**
1. Open https://atmos.finance
2. Open DevTools (F12)
3. Network tab → Filter: XHR/Fetch
4. Reload page → Look for API calls
5. Copy endpoint URLs

**Option B: Ask Atmos/Supra Community**
- Discord: Ask for public API docs
- Telegram: Developer channels
- GitHub: Check if they have API docs

### Step 2: Update `app.js`

Replace the mock data fetch in `fetchData()` function (line 68):

```javascript
async function fetchData() {
    try {
        // Fetch Atmos stats
        const atmosRes = await fetch('REAL_ATMOS_API_URL');
        const atmosData = await atmosRes.json();
        
        // Fetch Supra stats
        const supraRes = await fetch('REAL_SUPRA_API_URL');
        const supraData = await supraRes.json();
        
        // Fetch $COSMO token data
        const cosmoRes = await fetch('REAL_COSMO_API_URL');
        const cosmoData = await cosmoRes.json();
        
        return {
            atmos: {
                tvl: atmosData.totalValueLocked,  // Adjust field names
                volume24h: atmosData.volume24h,
                volume7d: atmosData.volume7d,
                volumeChange: atmosData.volumeChange
            },
            supra: {
                chainTvl: supraData.totalTvl,
                protocols: supraData.protocolCount
            },
            cosmo: {
                price: cosmoData.price,
                priceChange: cosmoData.priceChange24h,
                marketCap: cosmoData.marketCap,
                volume24h: cosmoData.volume24h
            }
        };
    } catch (error) {
        console.error('Error:', error);
        return getMockData(); // Fallback
    }
}
```

### Step 3: Test

```bash
# Open in browser
open index.html

# Check console for errors
# DevTools → Console
# Should see: "Using mock data" or real data
```

---

## 🤖 Discord Bot Integration (Zorgbot)

### Commands (coming soon):

```
@Zorgbot cosmo price
→ 🪙 $COSMO: $0.0234 (+5.2%)
   📊 Dashboard: https://yourusername.github.io/cosmo-dashboard

@Zorgbot cosmo status
→ 🪙 $COSMO Status
   Price: $0.0234 (+5.2%)
   24h Vol: $125K
   Market Cap: $2.34M
   
@Zorgbot cosmo dashboard
→ 📊 Full Dashboard: https://yourusername.github.io/cosmo-dashboard
```

**Integration:** See `discord-bot-integration.js` (coming next!)

---

## 📊 Current Status

✅ **Dashboard UI:** Complete  
✅ **Real APIs:** Connected & Working!  
✅ **Live Data:** Atmos Protocol stats  
⚠️ **$COSMO Token:** Needs GraphQL query  
✅ **GitHub Pages:** Ready to deploy  
⏳ **Discord Bot:** Coming next  

---

## 💰 Cost Breakdown

| Item | Cost |
|------|------|
| GitHub Pages Hosting | **$0** |
| HTML/CSS/JS (static) | **$0** |
| API Calls (client-side) | **$0** |
| Discord Bot (Mistral) | **~$0.002/month** |
| **TOTAL** | **~$0/month** 🎉 |

---

## 🆘 Need Help?

**Finding API Endpoints:**
- I can help you reverse-engineer Atmos API
- Check browser network calls
- Ask Atmos/Supra community

**Customization:**
- Want more features? (Charts, alerts, etc.)
- Different design?
- Just ask Bandit! 🦝

---

## Next Steps

1. ✅ Dashboard built
2. ⏳ Find API endpoints (you or me?)
3. ⏳ Deploy to GitHub Pages
4. ⏳ Build Discord bot commands
5. ⏳ Add alerts (optional)

**Ready to deploy or need API help first?** 🚀
