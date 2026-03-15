document.addEventListener('DOMContentLoaded', () => {
    
    // --- LÓGICA DE ESPECIALISTAS (Módulo 2) ---
    const listaEspecialistas = document.getElementById('lista-especialistas');
    
    if (listaEspecialistas) {
        const especialistas = [
            { 
                nombre: "Dr. Armando Casas", 
                especialidad: "Cardiología", 
                horario: "8am - 12pm", 
                consultorio: "102", 
                foto: "img/doc2.jpg" // Actualizado
            },
            { 
                nombre: "Dra. Elena Nito", 
                especialidad: "Pediatría", 
                horario: "2pm - 6pm", 
                consultorio: "205", 
                foto: "img/doc1.jpg" // Actualizado
            },
            { 
                nombre: "Dr. Aquiles Brinco", 
                especialidad: "Traumatología", 
                horario: "9am - 1pm", 
                consultorio: "110", 
                foto: "img/doc3.jpg" // Actualizado
            }
        ];

        especialistas.forEach(medico => {
            const card = document.createElement('div');
            card.className = 'especialista-card';
            card.innerHTML = `
                <img src="${medico.foto}" alt="${medico.nombre}">
                <h4>${medico.nombre}</h4>
                <p><strong>${medico.especialidad}</strong></p>
                <p>Horario: ${medico.horario}</p>
                <p>Consultorio: ${medico.consultorio}</p>
            `;
            listaEspecialistas.appendChild(card);
        });
    }

    // --- LÓGICA DE CITAS Y LOCALSTORAGE (Módulo 3) ---
    const formCita = document.getElementById('formCita');
    const listaCitas = document.getElementById('lista-citas');

    const cargarCitas = () => {
        if (!listaCitas) return;
        const citasGuardadas = JSON.parse(localStorage.getItem('citasClinica')) || [];
        listaCitas.innerHTML = citasGuardadas.length === 0 ? "<p>No hay citas registradas.</p>" : "";
        
        citasGuardadas.forEach(cita => {
            const item = document.createElement('div');
            item.className = 'cita-item';
            item.style = "background: #eee; padding: 10px; margin-bottom: 5px; border-radius: 5px;";
            item.innerHTML = `<strong>${cita.fecha}</strong> - ${cita.nombre} (${cita.especialidad})`;
            listaCitas.appendChild(item);
        });
    };

    if (formCita) {
        formCita.addEventListener('submit', (e) => {
            e.preventDefault();
            const nuevaCita = {
                nombre: document.getElementById('nombre').value,
                cedula: document.getElementById('cedula').value,
                especialidad: document.getElementById('especialidad').value,
                fecha: document.getElementById('fecha').value
            };

            const citas = JSON.parse(localStorage.getItem('citasClinica')) || [];
            citas.push(nuevaCita);
            localStorage.setItem('citasClinica', JSON.stringify(citas));

            alert("Cita agendada con éxito");
            formCita.reset();
            cargarCitas();
        });
    }

    cargarCitas();
});
