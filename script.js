// script.js (login page)
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function sendConfirmation() {
    const emailInput = document.getElementById("email").value;
    const errorMsg = document.getElementById("error");
    const confirmationSection = document.getElementById("confirmation-section");

    // Validate email
    if (!emailInput.endsWith("@sosehl.onmicrosoft.com")) {
        errorMsg.style.display = "block";
        return;
    }

    errorMsg.style.display = "none";

    const confirmationCode = Math.floor(100000 + Math.random() * 900000);
    localStorage.setItem("confirmationCode", confirmationCode);

    console.log(`Sending email to ${emailInput} with code: ${confirmationCode}`);
    alert("Confirmation code sent! (Check console for demo purposes)");

    confirmationSection.style.display = "block";
}

function verifyCode() {
    const userCode = document.getElementById("code").value;
    const storedCode = localStorage.getItem("confirmationCode");
    const result = document.getElementById("result");

    if (userCode === storedCode) {
        result.style.color = "green";
        result.textContent = "Authentication successful!";

        setCookie("authenticated", "true", 30);
        setCookie("userEmail", document.getElementById("email").value, 30);

        localStorage.removeItem("confirmationCode");

        setTimeout(() => {
            window.location.href = "index.html";
        }, 1000);
    } else {
        result.style.color = "red";
        result.textContent = "Invalid code. Try again.";
    }
}

// Check authentication on page load
window.onload = function() {
    if (getCookie("authenticated") === "true") {
        window.location.href = "index.html";
    }
};