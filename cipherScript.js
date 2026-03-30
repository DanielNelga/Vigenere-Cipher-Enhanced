/**
 * Encrypts text using the Vigenère cipher.
 * Letters are shifted forward by the corresponding key character; non-letters are unchanged.
 */
function encryptText(text, key) {
    let result = '';
    let keyIndex = 0; //tracks position in the key

    for (let i = 0; i < text.length; i++) {
        let char = text[i];

        if (char.match(/[a-zA-Z]/)) {
            let code = text.charCodeAt(i);

            //ASCII offset
            let offset = (code >= 65 && code <= 90) ? 65 : 97;

            //gets the corresponding key char and converts to a shift value
            let keyChar = key[keyIndex % key.length]; // loop if text is longer
            let keyCode = keyChar.toUpperCase().charCodeAt(0) - 65;

            //shift char foward by keyCode
            let newChar = String.fromCharCode((code - offset + keyCode) % 26 + offset);
            result += newChar;
            keyIndex++;
        } else {
            //non latin letters are passed without changing
            result += char;
        }
    }
    return result;
}

/**
 * Decrypts Vigenère-encrypted text.
 * Reverses encryption by shifting letters backward by the corresponding key character.
 */
function decryptText(text, key) {
    let result = '';
    let keyIndex = 0; //tracks position in the key

    for (let i = 0; i < text.length; i++) {
        let char = text[i];

        if (char.match(/[a-zA-Z]/)) {
            let code = text.charCodeAt(i);

            //ASCII offset
            let offset = (code >= 65 && code <= 90) ? 65 : 97;


            //gets the corresponding key char and converts to a shift value
            let keyChar = key[keyIndex % key.length];
            let keyCode = keyChar.toUpperCase().charCodeAt(0) - 65;

            //shift char backwards by keyCode
            let newChar = String.fromCharCode((code - offset - keyCode + 26) % 26 + offset);
            result += newChar;
            keyIndex++;
        } else {
            //non latin letters are passed without changing
            result += char;
        }
    }
    return result;
}

/*
*generates a step by step breakdown of how the code is encrypted
*Each step shows the original character + key char = encrypted char
*/
function showSteps(text, key) {
    let steps = "";
    let keyIndex = 0;

    for (let i = 0; i < text.length; i++) {
        let char = text[i];

        if (char.match(/[a-zA-Z]/)) {
            let keyChar = key[keyIndex % key.length]; // Wrap key as needed

            let code = text.charCodeAt(i);
            let offset = (code >= 65 && code <= 90) ? 65 : 97;
            let keyCode = keyChar.toUpperCase().charCodeAt(0) - 65;

            //compute encrypted char
            let result = String.fromCharCode((code - offset + keyCode) % 26 + offset);

            // Format: "A + K → E"
            steps += `${char} + ${keyChar} → ${result}<br>`;
            keyIndex++;
        }
        // Non-letter characters are skipped in the step view
    }

    document.getElementById("steps").innerHTML = steps;
}

/* 
* Evaluates the strength of the key and displays it
 * Strength levels: Weak / Medium / Strong
   * - Weak = 8 characters or fewer
 * - Medium = more than 8 characters
 * - Strong = more than 12 characters with both upper and lowercase letters
*/
function checkKeyStrength(key) {
    let strength = "Weak";

    if (key.length > 8) strength = "Medium";
    if (key.length > 12 && /[A-Z]/.test(key) && /[a-z]/.test(key)) {
        strength = "Strong";
    }

    document.getElementById("key-strength").innerText = "Key Strength: " + strength;
}


/**
 * Reads the text and key from the UI, encrypts the text, and updates the DOM.
 * Also shows encryption steps, checks key strength, and saves inputs to sessionStorage.
 */
function encrypt() {
    let text = document.getElementById("text").value;
    let key = document.getElementById("key").value;

    if (!key) return alert("Please enter a key!");

    let result = encryptText(text, key);
    //display encrypted message
    document.getElementById("output-text").innerText = result;

    showSteps(text, key);
    checkKeyStrength(key);
    saveData();


}

/**
 * Reads the text and key from the UI, decrypts the text, and updates the DOM.
 * Hides the step view (only available for encryption), checks key strength, and saves to sessionStorage.
 */
function decrypt() {
    let text = document.getElementById("text").value;
    let key = document.getElementById("key").value;

    if (!key) return alert("Please enter a key!");

    let result = decryptText(text, key);
    //display decrypted message
    document.getElementById("output-text").innerText = result;

    document.getElementById("steps").innerHTML = "(Step view is for encryption)";
    checkKeyStrength(key);
    saveData();


}

/**
 * Clears all input fields, outputs, and UI state.
 * Also wipes any data saved in sessionStorage.
 */
function clearFields() {
    document.getElementById("text").value = "";
    document.getElementById("key").value = "";
    document.getElementById("output-text").innerText = "";
    document.getElementById("steps").innerHTML = "";
    document.getElementById("key-strength").innerText = "";
    sessionStorage.clear(); // Remove all saved session data
}


/**
 * Copies the current output text to the clipboard and notifies the user.
 */
function copyText() {
    let text = document.getElementById("output-text").innerText;
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
}


/**
 * Saves the current text input, key, and output to sessionStorage.
 * Called after encrypt/decrypt and on every input change to preserve state on page refresh.
 */
function saveData() {
    sessionStorage.setItem("text", document.getElementById("text").value);
    sessionStorage.setItem("key", document.getElementById("key").value);
    sessionStorage.setItem("output", document.getElementById("output-text").innerText);
}

// Auto-save input fields to sessionStorage whenever the user types in them
document.getElementById("text").addEventListener("input", saveData);
document.getElementById("key").addEventListener("input", saveData);



