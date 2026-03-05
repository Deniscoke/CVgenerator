const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('.section');

function updateActiveNav() {
  let current = '';
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNav);

const menuToggle = document.getElementById('menuToggle');
const navLinksContainer = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  navLinksContainer.classList.toggle('active');
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navLinksContainer.classList.remove('active');
  });
});

document.addEventListener('click', (e) => {
  if (!menuToggle.contains(e.target) && !navLinksContainer.contains(e.target)) {
    navLinksContainer.classList.remove('active');
  }
});

const cvForm = document.getElementById('cvForm');
const resultEl = document.getElementById('result');
const copyBtn = document.getElementById('copyBtn');
const apiKeyInput = document.getElementById('apiKey');

const savedKey = localStorage.getItem('openai_api_key');
if (savedKey) apiKeyInput.value = savedKey;

async function generateCV({ apiKey, model, fullName, position, experience, skills, education, language }) {
  const prompt = `Create a professional CV in ${language}. Return plain text only with these sections: Summary, Work Experience, Skills, Education, Contact Placeholder.\n\nCandidate:\nName: ${fullName}\nTarget role: ${position}\nExperience: ${experience}\nSkills: ${skills}\nEducation: ${education}`;

  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      input: prompt,
      temperature: 0.7
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  return data.output_text || 'Model nevrátil textový výstup.';
}

cvForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const apiKey = document.getElementById('apiKey').value.trim();
  const model = document.getElementById('model').value.trim();

  const payload = {
    apiKey,
    model,
    fullName: document.getElementById('fullName').value.trim(),
    position: document.getElementById('position').value.trim(),
    experience: document.getElementById('experience').value.trim(),
    skills: document.getElementById('skills').value.trim(),
    education: document.getElementById('education').value.trim(),
    language: document.getElementById('language').value
  };

  localStorage.setItem('openai_api_key', apiKey);
  resultEl.textContent = 'Generujem CV...';

  try {
    const cv = await generateCV(payload);
    resultEl.textContent = cv;
  } catch (err) {
    resultEl.textContent = `Nepodarilo sa vygenerovať CV. ${err.message}`;
  }
});

copyBtn.addEventListener('click', async () => {
  await navigator.clipboard.writeText(resultEl.textContent);
  copyBtn.textContent = 'Skopírované ✅';
  setTimeout(() => {
    copyBtn.textContent = 'Kopírovať CV';
  }, 1500);
});
