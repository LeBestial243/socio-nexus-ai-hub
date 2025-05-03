
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Send, User, Cog } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Bonjour, je suis votre assistant IA spécialisé pour les travailleurs sociaux. Comment puis-je vous aider aujourd\'hui ?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userRole, setUserRole] = useState('educateur');

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Ajouter le message de l'utilisateur
    const userMessage: Message = {
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Simuler une réponse de l'IA après un délai
    setTimeout(() => {
      const assistantMessage: Message = {
        role: 'assistant',
        content: generateResponse(inputValue, userRole),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Une fonction simple pour simuler des réponses adaptées au rôle
  const generateResponse = (message: string, role: string): string => {
    // Version simple pour la démo
    const responses = {
      'educateur': "En tant qu'éducateur, vous pourriez documenter cette situation dans le dossier du jeune et prévoir un temps d'échange individuel pour discuter de ses besoins et ressentis.",
      'psychologue': "D'un point de vue psychologique, il serait pertinent d'évaluer les facteurs de stress potentiels et d'élaborer un plan d'accompagnement adapté à ses mécanismes d'adaptation.",
      'ase': "Dans le cadre de l'ASE, cette situation nécessite un rapport détaillé et éventuellement une révision du PPE (Projet Pour l'Enfant) pour adapter les objectifs et les moyens."
    };
    
    return responses[role as keyof typeof responses] || responses['educateur'];
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="border-b pb-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full gradient-blue-purple flex items-center justify-center">
              <MessageSquare size={16} className="text-white" />
            </div>
            <div>
              <CardTitle className="text-lg">Assistant IA</CardTitle>
              <CardDescription>Votre assistant professionnel</CardDescription>
            </div>
          </div>
          <Select value={userRole} onValueChange={setUserRole}>
            <SelectTrigger className="w-[180px] h-8">
              <SelectValue placeholder="Sélectionner un rôle" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="educateur">Éducateur</SelectItem>
              <SelectItem value="psychologue">Psychologue</SelectItem>
              <SelectItem value="ase">ASE</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`
                  max-w-[80%] rounded-lg p-3
                  ${message.role === 'user' 
                    ? 'bg-socio-blue text-white rounded-tr-none' 
                    : 'bg-gray-100 text-gray-800 rounded-tl-none'}
                `}
              >
                <div className="flex items-center gap-2 mb-1">
                  {message.role === 'assistant' ? (
                    <div className="w-5 h-5 rounded-full gradient-blue-purple flex items-center justify-center">
                      <MessageSquare size={12} className="text-white" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                      <User size={12} className="text-socio-blue" />
                    </div>
                  )}
                  <span className="text-xs font-medium">
                    {message.role === 'user' ? 'Vous' : 'Assistant'} 
                  </span>
                  <span className="text-xs opacity-70">
                    {formatTime(message.timestamp)}
                  </span>
                </div>
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg p-3 bg-gray-100 text-gray-800 rounded-tl-none">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-5 h-5 rounded-full gradient-blue-purple flex items-center justify-center">
                    <MessageSquare size={12} className="text-white" />
                  </div>
                  <span className="text-xs font-medium">Assistant</span>
                </div>
                <p className="text-sm ai-typing">L'assistant réfléchit</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="border-t p-4">
        <div className="flex w-full gap-2">
          <Input
            placeholder="Posez votre question..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage}
            disabled={isTyping || !inputValue.trim()}
            className="bg-socio-blue hover:bg-socio-blue/90"
          >
            <Send size={16} />
          </Button>
        </div>
        <p className="mt-2 text-xs text-gray-500 text-center w-full">
          Cet assistant est une simulation. Pour une version complète, connectez-vous à l'API d'OpenAI et Claude.
        </p>
      </CardFooter>
    </Card>
  );
};

export default AIAssistant;
