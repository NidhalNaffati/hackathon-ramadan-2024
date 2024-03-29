# السَّلامُ عَلَيْكُم ورَحْمَةُ اللهِ وَبَرَكاتُهُ

## مسجل القراءة الذكي 💬🎥

## اقرأ ارتقِ بصوتك


## Introduction
The application is a speech to text application that uses the Vosk model to transcribe the speech to text.
Then the application compares the transcribed text with the text that the user has entered the input field.

The application is directed to children who are learning to read and want to improve their reading skills.

## Technologies Used

Those are the main technologies used in this project:
<img alt="main tech used" src="./docs/smart-telepromter-stuck.png"/>

## Architecture

<img alt="app-architecture" src="./docs/app-architecture.gif"/>

1. After uploading a script, the user initiates the process by clicking the "Start" button.
2. The main process launches a child process to run Vosk, triggered by an event listener for the click.
3. Vosk transcribes audio from the microphone, sending the results to the renderer process. <br>
   The renderer process, equipped with an event listener, then compares the transcribed text with the uploaded script.

## Installation

1. Make sure to have Node.js installed on your machine
   You can install it using this link here [https://nodejs.org/en/download/](https://nodejs.org/en/download/)

2. Clone the repo from GitHub using the following command
   ```sh
   git clone https://github.com/NidhalNaffati/hackathon-ramadan-2024.git
   ```
3. Install NPM packages
   ```sh
    cd hackathon-ramadan-2024 && npm install
   ```
4. Install the Vosk model you want to use
   from [https://alphacephei.com/vosk/models](https://alphacephei.com/vosk/models). <br>
5. Make sure to extract the model in the root directory of the project and rename it to `model`

## Usage

1. Run the application with the following command
   ```sh
   npm run dev
   ```
2. wire your text in the input field
3. click on the button to start the speech recognition
4. start speaking and the text will be displayed in the text area below the input field