# Vigenere-Cipher-Enhanced
1. Vigenère Cipher Tool
A browser-based encryption and decryption tool built with HTML, CSS, and vanilla JavaScript. It implements the Vigenère cipher, a classical polyalphabetic substitution cipher — with a clean UI, step by step breakdown, key strength feedback, and session persistence.

What It Does

Encrypt any text message using a user supplied keyword
Decrypt Vigenère encrypted text back to its original form
Step-by-step view shows how each letter was shifted during encryption (e.g. A + K → K)
Key strength indicator, rates the keyword as Weak, Medium, or Strong
Copy to clipboard one click to copy the output
Session persistence, inputs and output are saved to sessionStorage so a page refresh doesn't lose your work
Clear, resets all fields and clears session data

2. Technologies Used

HTML5 - Page structure and UI elements
CSS3 - Styling, layout, background and reponsive container
JavaScript - Cipher logic, DOM manipulation and session storage
Google fonts - typography
No frameworks or build tools were used, as this all runs in the browser

How to Run

1. Clone the Repo
2. Open index.html in any browser

How to Use

Encrypting a message

Type your message into the Message box
Enter a keyword in the Key box 
Click Encrypt
The encrypted text appears in the Output section
The Step-by-step process shows each character shift (e.g. H + S → Z)
The Key Strength indicator rates your keyword

Decrypting a message

Paste the encrypted text into the Message box
Enter the same key that was used to encrypt it
Click Decrypt
The original message is restored in the Output section

Key strength guide
RatingCriteriaWeak8 characters or fewerMediumMore than 8 charactersStrongMore than 12 characters with both uppercase and lowercase letters

Tips

The cipher only shifts letters (A–Z, a–z) spaces, numbers, and punctuation pass through unchanged
The key is case insensitive, secret and SECRET produce the same result
Longer, mixed-case keys are significantly harder to crack

3. How the Vigenère Cipher Works

The Vigenère cipher shifts each letter of the message forward by the value of the corresponding key character:
Message:  H  E  L  L  O
Key:      S  E  C  R  E  T  (repeats)
Result:   Z  I  N  C  S
Where A = 0, B = 1, ... Z = 25:

H (7) + S (18) = Z (25)
E (4) + E (4)  = I (8)

Decryption reverses this by shifting backwards by the same key values.

<img width="1887" height="951" alt="image" src="https://github.com/user-attachments/assets/0b4ca560-b163-4325-96ad-e621aab23d09" />



4. AI Acknowledgment


This project was developed with assistance from AI tools at various stages.
Tools used

Claude — used for reviewing and rewording the README documentation and explaining cipher concepts clearly
ChatGPT  — used during initial development for debugging JavaScript logic and understanding the charCodeAt / fromCharCode approach for character shifting. Also used to help generate comments for the code

How AI was used


Code generation and debugging:
The core cipher logic (encryptText, decryptText) was developed with AI assistance to understand how ASCII offsets work for uppercase (65) vs lowercase (97) characters, and how the modulo operation % 26 keeps the result within the alphabet.


Specific example — offset logic:
When implementing case preservation (keeping uppercase letters uppercase and lowercase lowercase), I asked ChatGPT to explain why two separate offsets were needed. The AI explained that charCodeAt returns the raw ASCII value, so A = 65 and a = 97, and subtracting the offset normalises both to 0–25 before the shift, then re-adds it after.


Learning:
AI tools were used to understand why the Vigenère cipher is more resistant to frequency analysis than a Caesar cipher because the same plaintext letter can map to different ciphertext letters depending on its position relative to the key.



