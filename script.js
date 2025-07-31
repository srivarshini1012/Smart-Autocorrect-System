function submitText() {
    const inputText = document.getElementById('inputText').value;
    fetch('/correct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'inputText=' + encodeURIComponent(inputText)
    })
    .then(response => response.json())
    .then(data => {
        const resultDiv = document.getElementById('result');
        if (!data.corrected_text) {
            resultDiv.innerHTML = "<p>No corrections made.</p>";
            return;
        }

        let highlighted = highlightCorrections(data.corrected_text, data.corrections);
        let suggestionList = formatSuggestions(data.suggestions, data.corrections);
        resultDiv.innerHTML = `<h3>Corrected Text:</h3><p>${highlighted}</p><br><h4>Suggestions:</h4>${suggestionList}`;
    })
    .catch(err => {
        document.getElementById('result').innerHTML = "<p style='color: red;'>Error: " + err.message + "</p>";
    });
}

function highlightCorrections(correctedText, corrections) {
    const words = correctedText.split(/\s+/);
    return words.map(word => {
        for (const [original, corrected] of Object.entries(corrections)) {
            if (word === corrected && original !== corrected) {
                return `<span class="correction">${word}</span>`;
            }
        }
        return word;
    }).join(' ');
}

function formatSuggestions(suggestions, corrections) {
    let html = '';
    for (const [original, suggList] of Object.entries(suggestions)) {
        if (original !== corrections[original]) {
            html += `<p><strong>${original}</strong>: ${suggList.join(', ')}</p>`;
        }
    }
    return html;
}
