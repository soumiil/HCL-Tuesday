const form = document.getElementById('table-form');
    const input = document.getElementById('inp');
    const result = document.getElementById('result');
    const status = document.getElementById('status');
    let generation = 0;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const number = Number(input.value);
      const currentGeneration = ++generation;
      result.replaceChildren();
      status.textContent = `Building 0 of ${number} tables...`;

      for (let firstTable = 1; firstTable <= number; firstTable += 10) {
        if (currentGeneration !== generation) return;

        const fragment = document.createDocumentFragment();
        const lastTable = Math.min(firstTable + 9, number);

        for (let tableNumber = firstTable; tableNumber <= lastTable; tableNumber++) {
          const card = document.createElement('article');
          const heading = document.createElement('h3');
          card.className = 'table-card';
          heading.textContent = `Table of ${tableNumber}`;
          card.append(heading);

          for (let multiplier = 1; multiplier <= 10; multiplier++) {
            const equation = document.createElement('div');
            const expression = document.createElement('span');
            const answer = document.createElement('strong');
            equation.className = 'equation';
            expression.textContent = `${tableNumber} × ${multiplier}`;
            answer.textContent = String(tableNumber * multiplier);
            equation.append(expression, answer);
            card.append(equation);
          }

          fragment.append(card);
        }

        result.append(fragment);
        status.textContent = `Building ${lastTable} of ${number} tables...`;
        await new Promise(resolve => requestAnimationFrame(resolve));
      }

      if (currentGeneration === generation) {
        status.textContent = `Complete: ${number} tables.`;
      }
    });