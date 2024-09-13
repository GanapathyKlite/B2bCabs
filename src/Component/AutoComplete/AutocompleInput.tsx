import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../Auth/AuthContext";
import { GoLocation } from "react-icons/go";

interface Suggestion {
  address: string;
  city: string;
  admin: string;
  province: string;
  geocode: number;
}

interface AutocompleteInputProps {
  inputValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required: boolean;
  className?: string;
  onSuggestionSelect?: (suggestion: Suggestion) => void;
}

const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
  inputValue,
  onChange,
  placeholder,
  required,
  className = "",
  onSuggestionSelect,
}) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { authToken } = useAuth();

  const fetchSuggestions = async (query: string) => {
    if (query.length > 2) {
      try {
        setIsLoading(true);
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/place/autocomplete`,
          { address: query },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.status) {
          setSuggestions(response.data.data);
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error("Error fetching autocomplete data", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onChange(e);
    fetchSuggestions(value);
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    onChange({
      target: { value: suggestion.address },
    } as React.ChangeEvent<HTMLInputElement>);
    setSuggestions([]);
    if (onSuggestionSelect) {
      onSuggestionSelect(suggestion);
    }
  };

  return (
    <div>
      <input
        onChange={handleChange}
        value={inputValue}
        type="text"
        required={required}
        className="mainInputBox"
        placeholder={placeholder}
      />

      <div className="citySearchHiddenBoxShow">
        <div className="popularCityListDiv">
          {suggestions.length > 0 ? (
            <ul className="p-0 m-0 d-flex flex-column">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <GoLocation />
                  <p>{suggestion.address}</p>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default AutocompleteInput;
