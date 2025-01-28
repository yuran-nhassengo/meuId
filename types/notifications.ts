// Tipos para a notificação
export type NotificationType = "info" | "success" | "warning" | "error";

// Interface para uma notificação individual
export interface Notification {
  id: number; // ID único da notificação
  message: string; // Mensagem da notificação
  type: NotificationType; // Tipo da notificação
  createdAt: string; // Data e hora da criação da notificação
  read?: boolean; // Status se a notificação foi lida (opcional)
  actionUrl?: string; // URL para ações adicionais relacionadas à notificação (opcional)
}
