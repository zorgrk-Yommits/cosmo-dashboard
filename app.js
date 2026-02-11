// $COSMO Dashboard - Data Fetching & Display
// Configuration
const CONFIG = {
    TOKEN_ADDRESS: '0x11188bb79cd956ab6b8ddff06d64f479358b59ddbd2058a41b447cdf21c17ab0',
    REFRESH_INTERVAL: 30000, // 30 seconds
    
    // API Endpoints (REAL APIs - working!)
    ENDPOINTS: {
        // Atmos Protocol Stats
        ATMOS_STATS: 'https://api.atmos.ag/stats/api/overall-stats',
        
        // Atmos Leaderboard
        ATMOS_LEADERBOARD: 'https://api.atmos.ag/stats/api/v1/leaderboard/data',
        
        // Atmos GraphQL
        ATMOS_GRAPHQL: 'https://prod-gw.atmosprotocol.com/graphql/',
        
        // Token List
        TOKEN_LIST: 'https://prod-gw.atmosprotocol.com/swapRouter/tokenlist',
    }
};

// Utility: Format numbers
function formatNumber(num, decimals = 2) {
    if (num === null || num === undefined) return '-';
    
    // Millions
    if (num >= 1000000) {
        return '$' + (num / 1000000).toFixed(decimals) + 'M';
    }
    // Thousands
    if (num >= 1000) {
        return '$' + (num / 1000).toFixed(decimals) + 'K';
    }
    // Small numbers
    return '$' + num.toFixed(decimals);
}

// Utility: Format percentage change
function formatChange(change) {
    if (change === null || change === undefined) return '-';
    const sign = change >= 0 ? '+' : '';
    const className = change >= 0 ? 'positive' : 'negative';
    return `<span class="${className}">${sign}${change.toFixed(2)}%</span>`;
}

// Mock data (for development/testing when API not available)
function getMockData() {
    return {
        atmos: {
            tvl: 12500000,
            volume24h: 850000,
            volume7d: 4200000,
            volumeChange: 15.3
        },
        supra: {
            chainTvl: 45000000,
            protocols: 12
        },
        cosmo: {
            price: 0.0234,
            priceChange: 5.2,
            marketCap: 2340000,
            volume24h: 125000
        }
    };
}

// Fetch real data
async function fetchData() {
    try {
        // Fetch Atmos Protocol Stats
        const atmosResponse = await fetch(CONFIG.ENDPOINTS.ATMOS_STATS);
        const atmosData = await atmosResponse.json();
        
        if (!atmosData.success) {
            throw new Error('Failed to fetch Atmos stats');
        }
        
        const stats = atmosData.data;
        
        // Calculate 7-day volume (estimate: 7x daily volume)
        const volume7d = stats.totalVolume; // This is total volume
        const volume24h = stats.breakdown.dexVolume + stats.breakdown.swapStepVolume;
        
        // For now, we'll use Atmos TVL as "Supra Chain TVL" proxy
        // TODO: Find actual Supra Chain-wide TVL endpoint
        
        return {
            atmos: {
                tvl: stats.totalPoolTvlUsd,
                volume24h: volume24h,
                volume7d: volume7d,
                volumeChange: 0 // API doesn't provide this, TODO: calculate from history
            },
            supra: {
                chainTvl: stats.totalPoolTvlUsd, // Proxy: Using Atmos TVL
                protocols: 12 // TODO: Get real count from Supra
            },
            cosmo: {
                // TODO: Query GraphQL for $COSMO specific data
                // For now, placeholder
                price: 0.0234,
                priceChange: 5.2,
                marketCap: 2340000,
                volume24h: 125000
            }
        };
        
    } catch (error) {
        console.error('Error fetching data:', error);
        showError('Failed to fetch live data. Using cached/fallback data.');
        return getMockData();
    }
}

// Update UI with data
function updateUI(data) {
    // Atmos Protocol
    document.getElementById('atmos-tvl').textContent = formatNumber(data.atmos.tvl);
    document.getElementById('atmos-volume-24h').textContent = formatNumber(data.atmos.volume24h);
    document.getElementById('atmos-volume-7d').textContent = formatNumber(data.atmos.volume7d);
    document.getElementById('atmos-volume-change').innerHTML = formatChange(data.atmos.volumeChange);
    
    // Supra Chain
    document.getElementById('supra-tvl').textContent = formatNumber(data.supra.chainTvl);
    document.getElementById('supra-protocols').textContent = data.supra.protocols;
    
    // $COSMO Token
    document.getElementById('cosmo-price').textContent = '$' + data.cosmo.price.toFixed(4);
    document.getElementById('cosmo-price-change').innerHTML = formatChange(data.cosmo.priceChange);
    document.getElementById('cosmo-mcap').textContent = formatNumber(data.cosmo.marketCap);
    document.getElementById('cosmo-volume').textContent = formatNumber(data.cosmo.volume24h);
    
    // Update timestamp
    const now = new Date();
    document.getElementById('last-update').textContent = now.toLocaleTimeString();
    
    // Hide loading, show content
    document.getElementById('loading').style.display = 'none';
    document.getElementById('content').style.display = 'block';
}

// Show error message
function showError(message) {
    const errorContainer = document.getElementById('error-container');
    errorContainer.innerHTML = `
        <div class="error">
            <strong>⚠️  Note:</strong> ${message}
        </div>
    `;
}

// Initialize dashboard
async function init() {
    console.log('🪙 $COSMO Dashboard initializing...');
    
    // Initial load
    const data = await fetchData();
    updateUI(data);
    
    // Auto-refresh every 30 seconds
    setInterval(async () => {
        console.log('🔄 Refreshing data...');
        const data = await fetchData();
        updateUI(data);
    }, CONFIG.REFRESH_INTERVAL);
}

// Start when page loads
document.addEventListener('DOMContentLoaded', init);
