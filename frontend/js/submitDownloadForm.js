const form = document.getElementById('downloadForm');

form.addEventListener('submit', async (event) => {
  event.preventDefault(); // stop the normal form submission

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    const response = await fetch('http://localhost:3000/api/download', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const responseJson = await response.json();
    console.log('Response from backend:', responseJson);
  } catch (error) {
    console.error('Error submitting form:', error);
  }
});
