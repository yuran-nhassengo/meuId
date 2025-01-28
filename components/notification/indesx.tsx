'use client';

import React, { useState, useEffect, useRef } from "react";
import { Bell } from "lucide-react";
import { Notification } from "@/types/notifications";

const NotificationPanel: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPanelVisible, setIsPanelVisible] = useState(false); // Visibilidade do painel de notificações
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null); // Notificação selecionada para abrir no painel lateral
  const panelRef = useRef<HTMLDivElement | null>(null); // Ref para o painel de notificações

  const fetchNotifications = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/notifications");
      if (!response.ok) {
        throw new Error("Erro ao buscar notificações");
      }
      const data = await response.json();
      setNotifications(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();

    // Fecha o painel ao clicar fora
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setIsPanelVisible(false); // Fecha o painel se o clique for fora dele
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Função chamada ao clicar no sino de notificações
  const handleNotificationClick = () => {
    setIsPanelVisible(!isPanelVisible); // Alterna a visibilidade do painel
  };

  // Função chamada ao clicar em uma notificação específica
  const handleNotificationDetailClick = (notification: Notification) => {
    setSelectedNotification(notification); // Define a notificação que foi clicada
  };

  return (
    <div className="relative flex">
      {/* Botão de sino */}
      <button
        className="p-2 sm:p-2 md:p-4 rounded-full bg-gray-200 dark:bg-gray-800 relative z-0 transition-all duration-200"
        onClick={handleNotificationClick} // Exibe ou oculta o painel de notificações
      >
        <Bell className="w-6 h-6 sm:w-4 sm:h-2 md:w-4 md:h-4 lg:w-6 lg:h-6" />
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 text-xs sm:text-sm md:text-base text-white bg-red-500 rounded-full px-1 sm:px-2">
            {notifications.length}
          </span>
        )}
      </button>

      {/* Painel de notificações */}
      {isPanelVisible && (
        <div
          ref={panelRef} // Adiciona a referência ao painel
          className="fixed mt-16 right-0 top-0 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-1/5 2xl:w-1/6 h-screen bg-white dark:bg-gray-900 shadow-lg p-4 overflow-y-auto z-20"
        >
          <h2 className="text-lg font-semibold mb-2">Notificações</h2>
          {isLoading && <p>Carregando...</p>}
          {error && <p className="text-red-500">Erro: {error}</p>}
          <ul>
            {notifications.map((notification) => (
              <li
                key={notification.id}
                className={`p-2 mb-2 rounded cursor-pointer ${notification.type === "info"
                  ? "bg-blue-100 text-blue-700"
                  : notification.type === "success"
                    ? "bg-green-100 text-green-700"
                    : notification.type === "warning"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                onClick={() => handleNotificationDetailClick(notification)} // Quando uma notificação é clicada, mostra os detalhes
              >
                <p className="text-sm">{notification.message}</p>
                <p className="text-xs text-gray-500">
                  {new Date(notification.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Painel lateral com os detalhes da notificação */}
      {selectedNotification && (
        <div className="fixed right-0 top-0 w-1/4 sm:w-1/2 md:w-1/4 lg:w-1/6 xl:w-1/5 2xl:w-1/6 bg-white dark:bg-gray-900 shadow-lg p-4 overflow-y-auto z-30">
          <h2 className="text-xl font-semibold mb-4">Detalhes da Notificação</h2>
          <p className="text-lg mb-2">{selectedNotification.message}</p>
          <p className="text-sm text-gray-500">
            Criada em: {new Date(selectedNotification.createdAt).toLocaleString()}
          </p>
          <button
            className="mt-4 p-2 bg-gray-200 dark:bg-gray-800 rounded"
            onClick={() => setSelectedNotification(null)} // Fecha o painel lateral
          >
            Fechar
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;
