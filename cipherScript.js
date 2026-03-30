 function encryptText(text, key) {
            let result = '';
            let keyIndex = 0;

            for (let i = 0; i < text.length; i++) {
                let char = text[i];

                if (char.match(/[a-zA-Z]/)) {
                    let code = text.charCodeAt(i);
                    let offset = (code >= 65 && code <= 90) ? 65 : 97;

                    let keyChar = key[keyIndex % key.length];
                    let keyCode = keyChar.toUpperCase().charCodeAt(0) - 65;

                    let newChar = String.fromCharCode((code - offset + keyCode) % 26 + offset);
                    result += newChar;
                    keyIndex++;
                } else {
                    result += char;
                }
            }
            return result;
        }

        function decryptText(text, key) {
            let result = '';
            let keyIndex = 0;

            for (let i = 0; i < text.length; i++) {
                let char = text[i];

                if (char.match(/[a-zA-Z]/)) {
                    let code = text.charCodeAt(i);
                    let offset = (code >= 65 && code <= 90) ? 65 : 97;

                    let keyChar = key[keyIndex % key.length];
                    let keyCode = keyChar.toUpperCase().charCodeAt(0) - 65;

                    let newChar = String.fromCharCode((code - offset - keyCode + 26) % 26 + offset);
                    result += newChar;
                    keyIndex++;
                } else {
                    result += char;
                }
            }
            return result;
        }

       

        function encrypt() {
            let text = document.getElementById("text").value;
            let key = document.getElementById("key").value;

            if (!key) return alert("Please enter a key!");

            let result = encryptText(text, key);
            document.getElementById("output-text").innerText = result;

            
        }

        function decrypt() {
            let text = document.getElementById("text").value;
            let key = document.getElementById("key").value;

            if (!key) return alert("Please enter a key!");

            let result = decryptText(text, key);
            document.getElementById("output-text").innerText = result;

            
        }

       