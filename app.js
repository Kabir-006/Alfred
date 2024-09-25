const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

let isAlfredActivated = false; // Flag to prevent repeated "Hey Alfred"

function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    var day = new Date();
    var hour = day.getHours();

    if (hour >= 0 && hour < 12) {
        speak("Good Morning Master...");
    } else if (hour >= 12 && hour < 17) {
        speak("Good Afternoon Master...");
    } else {
        speak("Good Evening Master...");
    }
}

window.addEventListener('load', () => {
    speak("Initializing Alfred...");
    wishMe();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
};

// Automatically restart listening after each command
recognition.onend = () => {
    recognition.start();
};

// Triggered when button is clicked
btn.addEventListener('click', () => {
    content.textContent = "Listening....";
    recognition.start();
});

function takeCommand(message) {
    if (!isAlfredActivated && (message.includes('hey alfred') || message.includes('hello alfred'))) {
        isAlfredActivated = true; // Activate Alfred once "Hey Alfred" is heard
        speak("Hello Sir, How May I Help You?");
        return; // Prevent further commands until another input is heard
    }

    if (isAlfredActivated) {
        // Handle other commands only if Alfred is activated
        if (message.includes("open google")) {
            window.open("https://google.com", "_blank");
            speak("Opening Google...");
        }

        else if (message.includes("Hey Alfred how are you?")) {
            speak("I'm Fine Master! What about you");
            }



        else if (message.includes("open youtube")) {
            window.open("https://youtube.com", "_blank");
            speak("Opening YouTube...");
        }
        else if (message.includes("open facebook")) {
            window.open("https://facebook.com", "_blank");
            speak("Opening Facebook...");
        }
        else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
            window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
            const finalText = "This is what I found on the internet regarding " + message;
            speak(finalText);
        }
        else if (message.includes('wikipedia')) {
            window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "")}`, "_blank");
            const finalText = "This is what I found on Wikipedia regarding " + message;
            speak(finalText);
        }
        else if (message.includes('time')) {
            const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
            const finalText = "The current time is " + time;
            speak(finalText);
        }
        else if (message.includes('date')) {
            const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
            const finalText = "Today's date is " + date;
            speak(finalText);
        }
        else if (message.includes('calculator')) {
            window.open('Calculator:///');
            const finalText = "Opening Calculator";
            speak(finalText);
        }
        else {
            window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
            const finalText = "I found some information for " + message + " on Google";
            speak(finalText);
        }
    }
}

// Automatically start Alfred when 'Hey Alfred' is heard
recognition.start();
