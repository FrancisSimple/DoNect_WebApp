import { useState, useRef, useEffect } from "react";
import { Chatbot } from "supersimpledev";
import RobotImage from "../assets/other-images/robot.png";
import UserImage from "../assets/other-images/user.png";
import LoadingSpinner from "../assets/other-images/loading-spinner.gif";
import "../index.css";

function ChatRobot() {
  const [chatMessages, setChatMessages] = useState([
    // {
    //   id: crypto.randomUUID(),
    //   message: "Hello",
    //   sender: "user",
    // },
    // {
    //   id: crypto.randomUUID(),
    //   message: "Hi, How are you?",
    //   sender: "robot",
    // },
    // {
    //   id: crypto.randomUUID(),
    //   message: "Hello",
    //   sender: "user",
    // },
    // {
    //   id: crypto.randomUUID(),
    //   message: "Hi, How are you?",
    //   sender: "robot",
    // },
  ]);

  useEffect(() => {
    Chatbot.addResponses({
      "I am fine": "That's great to hear! How can I assist you today?",
      "What is your name?":
        "I am your virtual assistant, here to help you with any questions you may have.",
      "I need your help":
        "Of course! I'm here to assist you. What do you need help with concerning using our platform?",
      "What can you do?":
        "I can answer your questions, provide information about our services, and assist you with any issues you may have.",
      "How can I contact support?":
        "You can contact our support team by emailing support@ngosite.org or calling +233 (0) 257 2662 72.",
      Hi: "Hello! How can I assist you today?",
      hi: "Hello! How can I assist you today?",
      "who are you?":
        "I am your virtual assistant, here to help you with any questions you may have.",
      "who made you?":
        "I was created by the team at Supersimpledev and trained by Josh Devops to assist you with your queries.",
      "what is your purpose?":
        "My purpose is to assist you with any questions or issues you may have regarding our platform.",
      "I have a question":
        "Sure! Please go ahead and ask your question, and I'll do my best to assist you.",
      "I have a problem":
        "Of course! I'm here to help. Please describe your problem, and I'll do my best to assist you.",
      "I need information": "Sure! What information do you need?",
      Goodbye:
        "Goodbye! If you have any more questions in the future, feel free to ask. Have a great day!",
      goodbye:
        "Goodbye! If you have any more questions in the future, feel free to ask. Have a great day!",
      "Good morning": "Good morning! How can I assist you today?",
      "good afternoon": "Good afternoon! How can I assist you today?",
      "good evening": "Good evening! How can I assist you today?",
      "good night":
        "Good night! If you have any more questions in the future, feel free to ask. Sleep well!",
      help: "Sure! How can I assist you today?",
      "assist me": "Sure! How can I assist you today?",
      "how do I login?":
        "To log in, click on the 'Get Started' button at the top right corner of the page, enter your credentials, and click 'Login'. If you don't have an account, you can register by clicking on the 'Register' link.",
      "how do I register?":
        "To register, click on the 'Get Started' button at the top right corner of the page, fill in the registration form with your details, and click 'Register'. Once registered, you can log in using your credentials.",
      "how do I reset my password?":
        "To reset your password, click on the 'Forgot Password?' link on the login page, enter your email address, and follow the instructions in the email you receive.",
      "how do I contact support?":
        "You can contact our support team by emailing support@ngosite.org or calling +233 (0) 257 2662 72.",
      "how do I donate?":
        "To donate, click on the 'Donate' button on our website, choose your preferred donation method, and follow the instructions to complete your donation. But make sure you have an account so we can keep account of it.",
      "how do I volunteer?":
        "To volunteer, click on the 'Volunteer' button on our website, fill in the volunteer application form with your details, and submit it. Our team will review your application and get back to you. But make sure you have an account before.",
      "how do I get involved?":
        "To get involved, you can volunteer, donate, or spread the word about our mission. Visit our website for more information on how you can contribute.",
      "how do I subscribe to the newsletter?":
        "To subscribe to our newsletter, scroll down to the footer of our website, enter your email address in the subscription form, and click 'Subscribe'. You'll receive the latest updates and news from us.",
      "how do I unsubscribe from the newsletter?":
        "To unsubscribe from our newsletter, click on the 'Unsubscribe' link at the bottom of any newsletter email you receive. You will be removed from our mailing list.",
      "Do you make mistakes?":
        "Yes, I am an AI-powered assistant and may not always have the correct answers. However, I will do my best to provide accurate information. If you notice any mistakes, please let me know so I can improve.",
      "How do I become a beneficiary?":
        "To become a beneficiary, please visit our 'Get Started' page, register as a beneficiary, and fill out the application form. Someone from our team will check out and review your application.",
      "who is beneficiary?":
        "A beneficiary is an individual or group that receives support or assistance from our NGO. This can include financial aid, educational support, healthcare services, or any other form of assistance we provide.",
      "who is a volunteer?":
        "A volunteer is an individual who offers their time and skills to support our NGO's mission without expecting financial compensation. Volunteers play a crucial role in helping us deliver our programs and services.",
      "who is a donor?":
        "A donor is an individual or organization that contributes financially or in-kind to support our NGO's mission. Donors help us fund our programs and initiatives, enabling us to make a positive impact in the community.",
      "who is a supporter?":
        "A supporter is an individual or organization that actively promotes and advocates for our NGO's mission. Supporters help raise awareness about our cause and encourage others to get involved.",
    });
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  function toggleChatMenu() {
    setIsOpen(isOpen === false ? true : false);
  }

  const [inputText, setInputText] = useState("");

  function handleInputText(event) {
    setInputText(event.target.value);
  }

  async function sendMessage() {
    const newMessages = [
      ...chatMessages,
      {
        id: crypto.randomUUID(),
        message: inputText,
        sender: "user",
      },
    ];

    setChatMessages(newMessages);

    // Empty the input
    setInputText("");

    // Wait for the chatbot to respond
    setChatMessages([
      ...newMessages,
      {
        id: crypto.randomUUID(),
        message: <img src={LoadingSpinner} className="h-6 w-6" />,
        sender: "robot",
      },
    ]);

    const response = await Chatbot.getResponseAsync(inputText);

    setChatMessages([
      ...newMessages,
      {
        id: crypto.randomUUID(),
        message: response,
        sender: "robot",
      },
    ]);
  }

  // Send message with enter key
  function sendWithEnterkey(event) {
    event.key === "Enter" ? sendMessage() : undefined;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat toggle button */}
      <button
        className="border py-2.5 px-3 rounded-full rounded-br-3xl fixed bg-green-500 bottom-16 right-8 sm:bottom-20 sm:right-16 z-50 text-white hover:bg-green-600 transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
        onClick={toggleChatMenu}
      >
        <i className="fas fa-robot text-xl"></i>
      </button>

      {/* Chat container */}
      <div
        className={`${
          isOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        } 
        origin-bottom-right absolute sm:bottom-16 sm:right-12 bottom-12 right-4 [@media(max-width:360px)]:w-72 w-80 bg-white rounded-xl shadow-2xl 
        transform transition-all duration-200`}
      >
        {/* Chat header */}
        <div className="p-2 border-b border-gray-200 bg-green-600 rounded-t-xl">
          <p className="text-center font-bold text-white">
            Hi <i className="fas fa-hand text-yellow-500"></i>, Talk to our
            Assistant
          </p>
        </div>

        {/* Messages container - Add these styles */}
        <div className="p-4 h-[400px] overflow-y-scroll chatbot-container">
          <ChatMessages chatMessages={chatMessages} />
        </div>

        {/* Input section */}
        <div className="border-t border-gray-200">
          <div className="p-2 flex space-x-1">
            <input
              type="text"
              className="border-b border-gray-300 focus:outline-none w-2/3 placeholder:text-sm hover:border-blue-300 focus:border-blue-500 transition p-1 rounded text-sm h-8"
              onChange={handleInputText}
              value={inputText}
              onKeyDown={sendWithEnterkey}
              placeholder="How may I help you?"
            />
            <button
              className="cursor-pointer text-purple-600 bg-white rounded px-3 hover:bg-gray-50 transition-all h-8"
              type="button"
              onClick={sendMessage}
            >
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatMessage({ message, sender }) {
  return (
    <div
      className={`flex items-start ${
        sender === "user" ? "chat-message justify-end" : "robot-chat"
      }`}
    >
      {sender === "robot" && <img src={RobotImage} className="w-8" />}
      <div
        className={`chat-message-text text-sm my-1 ${
          sender === "user" ? "bg-gray-200 mr-2" : "bg-green-200 ml-2"
        } rounded-lg px-2 py-1 flex flex-col`}
      >
        {message}
      </div>
      {sender === "user" && <img src={UserImage} className="w-8" />}
    </div>
  );
}

function ChatMessages({ chatMessages }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      setTimeout(() => {
        scrollRef.current.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: "smooth",
        });
      }, 100);
    }
  }, [chatMessages]);

  if (chatMessages.length === 0) {
    return (
      <div className="text-center text-gray-500">
        <span className="font-semibold text-red-400">No messages yet</span>
        <p>Hello! I'm your chatbot assistant. I'm here to help, but I follow set of responses, so I might not always get it right. If something seems off, please try again or contact support.</p>
      </div>
    );
  }

  return (
    <div
      className="chat-messages-container flex flex-col h-full overflow-y-auto"
      ref={scrollRef}
    >
      {chatMessages.map((chatMessage) => (
        <ChatMessage
          key={chatMessage.id}
          message={chatMessage.message}
          sender={chatMessage.sender}
        />
      ))}
    </div>
  );
}

export default ChatRobot;
