let developers = [];
let showHireOnly = false;
let isCardView = true;

const grid = document.getElementById('developerGrid');
const tableBody = document.getElementById('tableBody');
const tableDiv = document.getElementById('developerTable');
const countEl = document.getElementById('developerCount');

fetch('developers.json')
  .then(res => res.json())
  .then(data => {
    developers = data;
    render();
  });

function render() {
  let filtered = developers;

  const search = document.getElementById('searchInput').value.toLowerCase();
  if (search) {
    filtered = filtered.filter(d => 
      d.name.toLowerCase().includes(search) ||
      d.role.toLowerCase().includes(search) ||
      d.skills.some(s => s.toLowerCase().includes(search))
    );
  }

  if (showHireOnly) {
    filtered = filtered.filter(d => d.availableForHire);
  }

  countEl.textContent = filtered.length;

  if (isCardView) {
    grid.classList.remove('d-none');
    tableDiv.classList.add('d-none');
    grid.innerHTML = filtered.map(d => `
      <div class="col-md-4 col-sm-6">
        <div class="card h-100 shadow-sm">
          <img src="${d.avatar}" class="card-img-top p-3" style="width:100px; margin:auto; border-radius:50%;">
          <div class="card-body text-center">
            <h5>${d.name}</h5>
            <p><strong>${d.role}</strong><br>${d.location}</p>
            <p class="small">${d.skills.join(', ')}</p>
            ${d.availableForHire ? '<span class="badge bg-success">Available for Hire</span>' : ''}
          </div>
        </div>
      </div>
    `).join('');
  } else {
    grid.classList.add('d-none');
    tableDiv.classList.remove('d-none');
    tableBody.innerHTML = filtered.map(d => `
      <tr>
        <td><img src="${d.avatar}" width="40" class="rounded-circle"></td>
        <td>${d.name}</td>
        <td>${d.role}</td>
        <td>${d.location}</td>
        <td>${d.availableForHire ? 'Yes' : 'No'}</td>
      </tr>
    `).join('');
  }
}

document.getElementById('searchInput').addEventListener('input', render);

document.getElementById('viewToggleBtn').addEventListener('click', () => {
  isCardView = !isCardView;
  render();
});

document.getElementById('hireToggleBtn').addEventListener('click', () => {
  showHireOnly = !showHireOnly;
  document.getElementById('hireToggleBtn').textContent = showHireOnly ? 'Show All' : 'Show Available Only';
  render();
});

document.getElementById('addDeveloperForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const newDev = {
    id: Date.now(),
    name: document.getElementById('name').value,
    role: document.getElementById('role').value,
    location: document.getElementById('location').value,
    skills: document.getElementById('skills').value.split(',').map(s => s.trim()),
    avatar: 'https://placehold.co/100x100/cccccc/ffffff',
    availableForHire: true
  };
  developers.push(newDev);
  e.target.reset();
  render();
});
