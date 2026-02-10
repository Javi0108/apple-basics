import { useState, useRef } from "react";
import gsap from "gsap";
import { Conversation } from "@elevenlabs/client";
import "../../styles/ConversationalAI.css";

export default function ConversationalAI() {
  const [isConversationOpen, setIsConversationOpen] = useState(false);
  const [connected, setConnected] = useState(false);
  const [conversation, setConversation] = useState(null);
  const hasStarted = useRef(false);

  const handleClick = () => {
    if (isConversationOpen) {
      stopConversation();
    } else {
      startConversation();
    }
    setIsConversationOpen(!isConversationOpen);
  };

  async function startConversation() {
    if (hasStarted.current) return;
    hasStarted.current = true;

    try {
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });

      // Start the conversation
      const newConversation = await Conversation.startSession({
        agentId: "agent_4501keynpyd9e529d7dexh57x4t7", // Replace with your agent ID
        onConnect: () => {
          setConnected(true);
        },
        onDisconnect: () => {
          setConnected(false);
        },
        onError: (error) => {
          console.error("Error:", error);
        },
      });

      setConversation(newConversation);
      hasStarted.current = true;
    } catch (error) {
      console.error("Failed to start conversation:", error);
    }
  }

  function stopConversation() {
    if (conversation) {
      conversation.endSession();
      setConversation(null);
      setConnected(false);
      hasStarted.current = false;
    }
  }

  if (isConversationOpen) {
    return (
      <button className="stop-button" onClick={handleClick}>
        <span className="stop-button-text">Stop</span>
        <i className="bi bi-stop-circle-fill"></i>
      </button>
    );
  }

  if (!isConversationOpen) {
    return (
      <button
        className="IA-Conversation"
        title="Talk to Ple! Personal AI assistant"
        onClick={handleClick}
      >
        <span className="IA-Conversation-text">Talk to Ple!</span>
        <i className="bi bi-openai"></i>
      </button>
    );
  }
}
