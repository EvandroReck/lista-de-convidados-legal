let guests = [];

// Gerar Alfabeto ao carregar
window.onload = () => {
    const menu = document.getElementById('alphabetMenu');
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    
    letters.forEach(l => {
        const btn = document.createElement('button');
        btn.innerText = l;
        btn.className = 'letter-btn';
        btn.onclick = () => {
            document.getElementById('selectedLetter').innerText = l;
            filterByInitial(l);
            toggleAlphabet();
        };
        menu.appendChild(btn);
    });
    renderTable(guests);
};

function addGuest() {
    const input = document.getElementById('guestInput');
    const name = input.value.trim();

    if (name) {
        guests.push(name);
        input.value = "";
        resetFilters(); // Volta para a lista completa ao adicionar
    }
}

function renderTable(list) {
    const tbody = document.getElementById('guestTableBody');
    const counter = document.getElementById('counter');
    tbody.innerHTML = "";
    
    counter.innerText = `Mostrando: ${list.length} convidado(s)`;

    if (list.length === 0) {
        tbody.innerHTML = "<tr><td colspan='4' style='text-align:center; padding: 30px;'>Nenhum convidado encontrado.</td></tr>";
        return;
    }

    list.forEach((name, index) => {
        const row = `
            <tr style="animation: fadeIn 0.3s ease forwards">
                <td>${index + 1}</td>
                <td><strong>${name}</strong></td>
                <td>${name.length} letras</td>
                <td><button class="delete-btn" onclick="removeGuest(${index})">EXCLUIR</button></td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function removeGuest(index) {
    guests.splice(index, 1);
    renderTable(guests);
}

function searchGuest() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filtered = guests.filter(g => g.toLowerCase().includes(query));
    renderTable(filtered);
}

function filterByLength(len) {
    let filtered = len === 5 ? guests.filter(g => g.length >= 5) : guests.filter(g => g.length === len);
    renderTable(filtered);
}

function filterByInitial(letter) {
    const filtered = guests.filter(g => g.toUpperCase().startsWith(letter));
    renderTable(filtered);
}

function toggleAlphabet() {
    const menu = document.getElementById('alphabetMenu');
    const arrow = document.getElementById('arrow');
    menu.classList.toggle('hidden');
    arrow.classList.toggle('arrow-up');
}

function resetFilters() {
    document.getElementById('searchInput').value = "";
    document.getElementById('selectedLetter').innerText = "Qualquer";
    renderTable(guests);
}

// Suporte ao Enter
document.getElementById('guestInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addGuest();
});
