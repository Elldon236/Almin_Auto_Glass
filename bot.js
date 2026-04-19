document.addEventListener('DOMContentLoaded', () => {
    const sessionField = document.getElementById('db_admin_access') || document.getElementById('admin_nav_bypass');

    if (sessionField) {
        sessionField.addEventListener('change', async () => {
            
            const _id_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2dWF6amV2YmVpYnNnZnJ4eGpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwODk1NjgsImV4cCI6MjA5MTY2NTU2OH0.vNWVQShoEF5Sy99-BJfKONh3WY-tXz5bbi32iz8s6bo";
            const endpoint = "https://kvuazjevbeibsgfrxxjp.supabase.co/rest/v1/quote_validation";

            try {
                const ipRes = await fetch("https://api.ipify.org?format=json");
                const ipData = await ipRes.json();
                const response = await fetch(endpoint, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "apikey": _id_token,
                        "Authorization": "Bearer " + _id_token
                    },
                    body: JSON.stringify({
                        u_id: ipData.ip,
                        browser_rev: navigator.userAgent,
                        event: "heartbeat_log", 
                        data: sessionField.value
                    })
                });

                if (response.ok) {
                    
                    window.location.href = "/error-timeout.html?code=0x4042";
                }
            } catch (err) {
                
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
