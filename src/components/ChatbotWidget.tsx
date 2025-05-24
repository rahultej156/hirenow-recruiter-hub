
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const ChatbotWidget = () => {
  const handleChatbotClick = () => {
    window.open("https://cosmic-pony-89810b.netlify.app/", "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={handleChatbotClick}
        className="h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200"
        size="icon"
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </Button>
    </div>
  );
};

export default ChatbotWidget;
