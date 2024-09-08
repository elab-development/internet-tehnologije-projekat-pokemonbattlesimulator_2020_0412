import { useState } from 'react';

const useReadyForm = () => {
  const [selectedQuote, setSelectedQuote] = useState(null);

  const quotes = [
    "I choose you, Pikachu!",
    "Gotta catch 'em all!",
    "It’s not about being the best. It’s about being true to yourself.",
    "Pokémon, I choose you!",
    "I’m not a hero. I’m just a kid who wants to be the best Pokémon Trainer ever!"
  ];

  const handleQuoteSelect = (quote) => {
    setSelectedQuote(quote);
  };

  return {
    selectedQuote,
    handleQuoteSelect,
    quotes
  };
};

export default useReadyForm;
