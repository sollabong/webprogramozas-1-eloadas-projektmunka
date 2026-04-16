let scientists = [...tudosokData];
let editId = null;

function renderTable() {
  const tbody = document.getElementById('dataBody');
  if (!tbody) return;
  tbody.innerHTML = '';

  scientists.forEach((scientist) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
            <td>${scientist.nev}</td>
            <td>${scientist.terulet}</td>
            <td>
              <button class="btn-edit" onclick="editItem(${scientist.id})" title="Szerkesztés">
                <i class="fa-solid fa-pen-to-square"></i>Szerkesztés
              </button>
              <button class="btn-delete" onclick="deleteItem(${scientist.id})" title="Törlés">
                <i class="fa-solid fa-trash-can"></i>Törlés
              </button>
            </td>
        `;
    tbody.appendChild(tr);
  });
}

function handleSave() {
  const nev = document.getElementById('tudosNev').value;
  const terulet = document.getElementById('tudosTerulet').value;

  if (!nev || !terulet) {
    alert('Kérlek töltsd ki mindkét mezőt!');
    return;
  }

  if (editId) {
    scientists = scientists.map((s) =>
      s.id === editId ? { id: editId, nev, terulet } : s
    );
    editId = null;
    document.getElementById('saveBtn').innerText = 'Hozzáadás';
  } else {
    const newScientist = {
      id:
        scientists.length > 0
          ? Math.max(...scientists.map((s) => s.id)) + 1
          : 1,
      nev,
      terulet,
    };
    scientists.unshift(newScientist);
  }

  clearForm();
  renderTable();
}

function deleteItem(id) {
  if (confirm('Biztosan törölni szeretnéd ezt a tudóst?')) {
    scientists = scientists.filter((s) => s.id !== id);
    renderTable();
  }
}

function editItem(id) {
  const scientist = scientists.find((s) => s.id === id);

  document.getElementById('tudosNev').value = scientist.nev;
  document.getElementById('tudosTerulet').value = scientist.terulet;

  editId = id;
  document.getElementById('saveBtn').innerText = 'Mentés';

  const formElement = document.querySelector('.crud-form');
  formElement.scrollIntoView({
    behavior: 'smooth',
  });
}

function clearForm() {
  document.getElementById('tudosNev').value = '';
  document.getElementById('tudosTerulet').value = '';
  editId = null;
}

document.addEventListener('DOMContentLoaded', renderTable);
