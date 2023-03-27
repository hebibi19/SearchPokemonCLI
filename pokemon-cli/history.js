const fs = require('fs');
const HISTORY_FILE = 'search_history.json';

function saveSearchHistory(search, resultCount) {
    let history = [];
    try {
        const data = fs.readFileSync(HISTORY_FILE);
        history = JSON.parse(data);
    } catch (err) {
        console.error(`Failed to read search history: ${err.message}`);
    }
    history.push({ search, resultCount });
    fs.writeFile(HISTORY_FILE, JSON.stringify(history), (err) => {
        if (err) {
            console.error(`Failed to save search history: ${err.message}`);
        }
    });
}

module.exports = { saveSearchHistory };
