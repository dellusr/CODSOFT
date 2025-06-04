let display = document.getElementById('display');

function press(num) {
  if (display.innerText === '0') {
    display.innerText = num;
  } else {
    display.innerText += num;
  }
}

function calculate() {
  try {
    display.innerText = eval(display.innerText);
  } catch {
    display.innerText = 'Error';
  }
}

function clearDisplay() {
  display.innerText = '0';
}

function backspace() {
  let text = display.innerText;
  if (text.length > 1) {
    display.innerText = text.slice(0, -1);
  } else {
    display.innerText = '0';
  }
}

// Add random hover color effect
const buttons = document.querySelectorAll('button:not(.equal)');
buttons.forEach(btn => {
  btn.addEventListener('mouseover', () => {
    btn.style.background = getRandomColor();
  });
  btn.addEventListener('mouseout', () => {
    btn.style.background = '#f1f1f1';
  });
});

function getRandomColor() {
  const colors = ['#ff9d76', '#76d7ff', '#c0c0ff', '#fcbf49', '#b5e48c', '#6a11cb', '#2575fc'];
  return colors[Math.floor(Math.random() * colors.length)];
}
