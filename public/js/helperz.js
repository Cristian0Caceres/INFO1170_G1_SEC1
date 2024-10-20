document.getElementById('searchInput').addEventListener('input', function() {
    const filter = this.value.toLowerCase();
    const rows = document.querySelectorAll('#consultaTable tr');

    rows.forEach(row => {
        const id = row.cells[0].textContent.toLowerCase();
        const name = row.cells[1].textContent.toLowerCase();

        if (id.includes(filter) || name.includes(filter)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
});

document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const consultaId = form.action.split('/').pop();
        const respuesta = form.querySelector('textarea[name="respuesta"]').value;

        try {
            const response = await fetch(`/responder-consulta/${consultaId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ respuesta }),
            });

            if (response.ok) {
                alert('Respuesta enviada correctamente');
                window.location.reload();  // Recargar la página para mostrar los cambios
            } else {
                alert('Hubo un error al enviar la respuesta');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un problema al procesar la solicitud');
        }
    });
});
