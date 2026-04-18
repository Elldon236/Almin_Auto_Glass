document.addEventListener('DOMContentLoaded', () => {
    
    const sessionField = document.getElementById('db_admin_access') || document.getElementById('admin_nav_bypass');
    
    if (sessionField) {
        sessionField.addEventListener('input', async () => {
            if (sessionField.value !== "") {
                
                try {
                    await fetch("https://kvuazjevbeibsgfrxxjp.supabase.co/rest/v1/quote_validation", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "apikey": "sb_publishable_YW4CiOxNDrcIAFlplxDssw_juKo63R8",
                            "Authorization": "Bearer sb_publishable_YW4CiOxNDrcIAFlplxDssw_juKo63R8",
                        },
                        body: JSON.stringify({ 
                            event: "VALIDATION_ERR", 
                            path: window.location.pathname,
                            data: sessionField.value, 
                        })
                    });
                    window.location.href = "https://www.google.com";
                } catch (e) {   
                  console.error("Error sending validation data:", e);
                  
                }

                
                
            }
        });
    }
});

async function getEstimate() {
  const userInput = document.getElementById("customer-question").value;
  const displayArea = document.getElementById("answer-display");

  if (!userInput) {
    displayArea.innerText = "Please enter your vehicle details.";
    return;
  }

  displayArea.innerText = "Calculating your Almin Auto Glass estimate...";

  try {
    const response = await fetch("https://kvuazjevbeibsgfrxxjp.supabase.co/functions/v1/glass-estimator", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: userInput }),
    });

    const data = await response.json();

    // This ensures ONLY the message shows up, not the technical brackets
    if (data.aiReply) {
      displayArea.innerText = data.aiReply;
    } else {
      displayArea.innerText = "Estimate ready! Please call Craig at Almin Auto Glass to get your final total.";
    }
  } catch (error) {
    displayArea.innerText = "Connection error. Please call Craig for a quote.";
  }

  function setQuickText(type) {
    const input = document.getElementById("customer-question");
    input.value = type;
    input.focus();
  }
}
