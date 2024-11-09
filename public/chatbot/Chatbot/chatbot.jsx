import { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';

const Chatbot = () => {
  const [model, setModel] = useState(null);
  const [intentsData, setIntentsData] = useState({});
  const [words, setWords] = useState([]);
  const [classes, setClasses] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]); // Store chat messages

  // Load the model and intents data
  useEffect(() => {
    const loadModelAndData = async () => {
      try {
        const loadedModel = await tf.loadLayersModel('/tfjs_model/model.json');
        setModel(loadedModel);
        console.log("Model loaded successfully.");

        // Fetch intents data
        const response = await fetch('/Intents/Intents.json');
        const data = await response.json();
        setIntentsData(data);

        // Extract words and classes from intents data
        const wordSet = new Set();
        const classSet = new Set();
        data.intents.forEach(intent => {
          classSet.add(intent.tag);
          intent.patterns.forEach(pattern => {
            pattern.split(" ").forEach(word => wordSet.add(word.toLowerCase()));
          });
        });
        setWords(Array.from(wordSet));
        setClasses(Array.from(classSet));
      } catch (error) {
        console.error("Error loading model or intents:", error);
      }
    };
    loadModelAndData();
  }, []);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const prepareInput = (input) => {
    const inputWords = input.toLowerCase().split(' ');
    const bag = new Array(words.length).fill(0);
    inputWords.forEach(word => {
      const index = words.indexOf(word);
      if (index !== -1) bag[index] = 1;
    });
    return bag;
  };

  const getResponseByClass = (intent) => {
    const intentData = intentsData.intents.find(i => i.tag === intent);
    return intentData ? intentData.responses[Math.floor(Math.random() * intentData.responses.length)] : "I'm not sure how to help with that.";
  };

  const handleSend = async () => {
    if (!model || !userInput) return;

    // Add user message to chat
    setMessages([...messages, { sender: 'user', text: userInput }]);

    // Prepare the input for prediction
    const inputBag = prepareInput(userInput);

    try {
      const prediction = model.predict(tf.tensor([inputBag])).dataSync();
      const intentIndex = prediction.indexOf(Math.max(...prediction));
      const intent = classes[intentIndex];
      const response = getResponseByClass(intent);

      // Add bot response to chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: response }
      ]);

      setUserInput('');
    } catch (error) {
      console.error("Error processing input:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg">
        <div className="py-4 px-6 bg-blue-600 text-white font-bold text-lg rounded-t-lg">Barangay Chatbot</div>
        
        <div className="p-4 overflow-y-auto h-64 space-y-4 bg-gray-50">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`rounded-lg px-4 py-2 max-w-xs ${
                message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'
              }`}>
                {message.text}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center p-4 border-t border-gray-300 bg-white">
          <input
            type="text"
            className="flex-1 p-2 border border-gray-300 rounded-lg mr-2 outline-none focus:ring-2 focus:ring-blue-500"
            value={userInput}
            onChange={handleInputChange}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
          />
          <button
            onClick={handleSend}
            className="bg-blue-500 text-white rounded-lg px-4 py-2 font-semibold hover:bg-blue-600 focus:outline-none"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
