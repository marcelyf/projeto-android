document.addEventListener('DOMContentLoaded', () => {
    const generateButton = document.getElementById('generateButton');
    if (generateButton) {
        generateButton.addEventListener('click', generateWorkoutPlan);
    }

    const workoutPlanDiv = document.getElementById('workoutPlan');
    if (workoutPlanDiv) {
        loadWorkouts();
    }

    const exercisesListDiv = document.getElementById('exercisesList');
    if (exercisesListDiv) {
        loadExercises();
    }
});

function generateWorkoutPlan() {
    const daysInput = document.getElementById('daysInput').value;
    const durationInput = document.getElementById('durationInput').value;

    if (daysInput && daysInput > 0 && durationInput && durationInput > 0) {
        localStorage.setItem('days', daysInput);
        localStorage.setItem('duration', durationInput);
        window.location.href = 'treinos.html';
    } else {
        alert('Por favor, insira um número válido de dias e duração.');
    }
}

function loadWorkouts() {
    const days = localStorage.getItem('days');
    const duration = localStorage.getItem('duration');
    const workoutPlanDiv = document.getElementById('workoutPlan');
    workoutPlanDiv.innerHTML = '';

    const workouts = [
        "Treino A: Peito e Tríceps",
        "Treino B: Costas e Bíceps",
        "Treino C: Pernas",
        "Treino D: Abdômen e Cardio"
    ];

    for (let i = 0; i < days; i++) {
        const workout = document.createElement('div');
        workout.classList.add('workout-option');
        workout.textContent = `Dia ${i + 1}: ${workouts[i % workouts.length]} - ${duration} minutos`;
        workout.dataset.index = i % workouts.length;
        workout.dataset.duration = duration;
        workout.addEventListener('click', () => {
            localStorage.setItem('workoutIndex', workout.dataset.index);
            window.location.href = 'exercicios.html';
        });
        workoutPlanDiv.appendChild(workout);
    }
}

function loadExercises() {
    const workoutIndex = localStorage.getItem('workoutIndex');
    const duration = localStorage.getItem('duration');
    const exercises = [
        ["Supino", "Flexão", "Tríceps Corda", "Supiro inclinado", "tríceps testa"],
        ["Puxada Alta", "Remada Curvada", "Rosca Direta", "Pull Down", "Remada Unilateral"],
        ["Agachamento", "Leg Press", "Cadeira extensora", "Afundo", "Cadeira Adutora"],
        ["Abdominal", "Prancha", "Corrida"]
    ];

    const exerciseList = exercises[workoutIndex];
    const exercisesListDiv = document.getElementById('exercisesList');
    exercisesListDiv.innerHTML = '';

    exerciseList.forEach(exercise => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = exercise;

        const label = document.createElement('label');
        label.htmlFor = exercise;
        label.textContent = `${exercise} - ${Math.round(duration / exerciseList.length)} - 3 x 12`;

        const div = document.createElement('div');
        div.appendChild(checkbox);
        div.appendChild(label);

        exercisesListDiv.appendChild(div);
    });
}
