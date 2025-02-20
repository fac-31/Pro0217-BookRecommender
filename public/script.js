const form = document.getElementById("myForm");

form.addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent default form submission
    
    const userPrompt = document.getElementById("userInput").value;
    
    try {
        const response = await fetch('/recommendations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userPrompt }) //{ userInput } is syntactic sugar for { "userInput" : userInput  }
        });

        const data = await response.json();  
        console.log(data);     
    } catch (error) {
        console.error('Error:', error);
    }

});

