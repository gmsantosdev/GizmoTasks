const form = document.querySelector("#search");
form.addEventListener("submit", handleSearch);

function handleSearch(event) {
    event.preventDefault();
    
    const searchInput = document.querySelector("#search-text").value.trim();

    if (!searchInput) {
        return;
    }

    window.location.href = `${window.location.origin + "/index.html"}?search=${encodeURIComponent(searchInput)}`;
}
