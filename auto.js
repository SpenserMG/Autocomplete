const search = document.getElementById("searchInput");
const matchList = document.getElementById("match-list");

//Search words.txt file
const searchWords = async searchText => {
    const res = await fetch("words.txt");
    const unsplit = await res.text();
    const words = unsplit.split("\n");
    console.log(words);

    // Get match to live search terms
    let matches = words.filter(word => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return word.match(regex)
    });

    if (searchText.length === 0) {
        matches = [];
        matchList.innerHTML = "";
    }

    outputHtml(matches);
}

const outputHtml = matches => {
    if (matches.length > 0) {
        const html = matches.map(match => `
        <div class="card card-body mb-1">${match}</div>
        `).join('');

        matchList.innerHTML = html;
    }
}

search.addEventListener("input", () => searchWords(search.value))