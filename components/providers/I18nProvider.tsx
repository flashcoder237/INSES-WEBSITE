"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useTranslations } from '@/hooks/useTranslations';
import frMessages from '@/messages/fr.json';
import enMessages from '@/messages/en.json';

type Locale = 'fr' | 'en';
type Messages = typeof frMessages;

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  messages: Messages;
  loading: boolean;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('fr');
  const [messages, setMessages] = useState<Messages>(frMessages);

  // Charger les traductions depuis la base de données
  const { translations, loading } = useTranslations();

  // Load locale from localStorage on mount
  useEffect(() => {
    const savedLocale = localStorage.getItem('locale') as Locale;
    if (savedLocale && (savedLocale === 'fr' || savedLocale === 'en')) {
      setLocaleState(savedLocale);
    }
  }, []);

  // Mettre à jour les messages quand les traductions ou la locale changent
  useEffect(() => {
    if (!loading) {
      setMessages(translations[locale] as Messages);
    }
  }, [locale, translations, loading]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    if (!loading) {
      setMessages(translations[newLocale] as Messages);
    }
    localStorage.setItem('locale', newLocale);

    // Update HTML lang attribute
    if (typeof document !== 'undefined') {
      document.documentElement.lang = newLocale;
    }
  };

  // Helper function to get nested translation
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = messages;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }

    return typeof value === 'string' ? value : key;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, messages, loading }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
}
