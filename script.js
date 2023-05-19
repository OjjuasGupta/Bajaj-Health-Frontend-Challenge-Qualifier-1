fetch('https://raw.githubusercontent.com/dixitsoham7/dixitsoham7.github.io/main/index.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('dataContainer');

    // Render developers data
    const developers = data.developers;
    const developersSection = createSection('Developers');
    container.appendChild(developersSection);

    // Render projects data
    const projects = data.projects;
    const projectsSection = createSection('Projects');
    container.appendChild(projectsSection);

    // Function to render developers based on filter options
    const renderDevelopers = () => {
      developersSection.innerHTML = ''; // Clear existing data

      const searchInput = document.getElementById('searchInput').value.toLowerCase();
      const filterSelect = document.getElementById('filterSelect').value.toLowerCase();

      // Filter developers based on search and filter options
      const filteredDevelopers = developers.filter(developer => {
        const nameMatch = developer.name.toLowerCase().includes(searchInput);
        const designationMatch = filterSelect === '' || developer.designation.toLowerCase() === filterSelect;
        return nameMatch && designationMatch;
      });

      // Render filtered developers
      filteredDevelopers.forEach(developer => {
        const row = createRow(developer.name, developer.designation, developer.skills.join(', '));
        developersSection.appendChild(row);
      });
    };

    // Initial rendering
    renderDevelopers();

    // Event listeners for search and filter options
    document.getElementById('searchInput').addEventListener('input', renderDevelopers);
    document.getElementById('filterSelect').addEventListener('change', renderDevelopers);

    // Helper function to create a section with a title
    function createSection(title) {
      const section = document.createElement('div');
      section.classList.add('section');
      const heading = document.createElement('h1');
      heading.textContent = title;
      section.appendChild(heading);
      return section;
    }

    // Helper function to create a row with label and value
    function createRow(label, ...values) {
      const row = document.createElement('div');
      row.classList.add('row');
      const labelElement = document.createElement('div');
      labelElement.classList.add('label');
      labelElement.textContent = label;
      row.appendChild(labelElement);
      values.forEach(value => {
        const valueElement = document.createElement('div');
        valueElement.classList.add('value');
        valueElement.textContent = value;
        row.appendChild(valueElement);
      });
      return row;
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
