const API_URL =
  'http://localhost/webprogramozas-1-eloadas-projektmunka/server/api.php';
const FETCH_URL = `${API_URL}?type=scientists`;
let editId = null;

window.onload = () => {
  loadTudosok();
};

async function loadTudosok() {
  try {
    const resp = await fetch(FETCH_URL);
    if (!resp.ok) throw new Error('Hiba a letöltés során');

    const data = await resp.json();
    const tbody = document.getElementById('f-tbody');

    tbody.innerHTML = data
      .map(
        (t) => `
            <tr>
                <td>${t.nev}</td>
                <td>${t.terulet}</td>
                <td>
                    <button class="btn-edit" onclick="setupEdit(${t.id}, '${t.nev}', '${t.terulet}')">
                        Szerkesztés
                    </button>
                    <button class="btn-delete" onclick="deleteTudos(${t.id})">
                        Törlés
                    </button>
                </td>
            </tr>
        `
      )
      .join('');
  } catch (err) {
    console.error('Hiba:', err);
  }
}

async function saveTudos() {
  const nevInput = document.getElementById('f-nev');
  const teruletInput = document.getElementById('f-terulet');
  const saveBtn = document.getElementById('f-save-btn');

  const nev = nevInput.value;
  const terulet = teruletInput.value;

  if (!nev || !terulet) {
    alert('Kérlek tölts ki minden mezőt!');
    return;
  }

  const method = editId ? 'PUT' : 'POST';
  const body = { nev, terulet };
  if (editId) body.id = editId;

  try {
    await fetch(FETCH_URL, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    editId = null;
    nevInput.value = '';
    teruletInput.value = '';
    saveBtn.innerText = 'Hozzáadás';

    loadTudosok();
  } catch (err) {
    console.error('Hiba a mentésnél:', err);
  }
}

async function deleteTudos(id) {
  if (!confirm('Biztos törlöd?')) return;

  try {
    await fetch(`${API_URL}?type=scientists&id=${id}`, {
      method: 'DELETE',
    });
    loadTudosok();
  } catch (err) {
    console.error('Hiba a törlésnél:', err);
  }
}

function setupEdit(id, nev, terulet) {
  editId = id;
  document.getElementById('f-nev').value = nev;
  document.getElementById('f-terulet').value = terulet;
  document.getElementById('f-save-btn').innerText = 'Mentés';

  document.getElementById('f-nev').focus();
}

document.addEventListener('DOMContentLoaded', loadTudosok);
