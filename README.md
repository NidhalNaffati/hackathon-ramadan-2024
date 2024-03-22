# السَّلامُ عَلَيْكُم ورَحْمَةُ اللهِ وَبَرَكاتُهُ

# Installation

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

1. With in the `SpeechToTextAnalyzer` file in the `src/components` folder change the script that you want to read 📜 <br>
   **Note**: Within the `SpeechToTextAnalyzer` make sure to use `\n` to indicate to separate paragraphs
   Here is an example of a script:
   ```typescript
   const referenceText: string =
   	"Hello, my name is Nidhal Naffati. \n" +
   	"I am a software engineer\n" +
   	"I am passionate about building software that helps people and solves real world problems.";
   ```
2. Run the application with the following command
   ```sh
   npm run dev
   ```
3. Click on the start button to start the process
4. Start reading the script and the application will highlight the words that you are reading
