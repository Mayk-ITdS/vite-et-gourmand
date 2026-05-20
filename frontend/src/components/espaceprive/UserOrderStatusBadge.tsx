import Chip from "@mui/material/Chip";

const statusMap: Record<
  string,
  {
    label: string;
    color: "default" | "primary" | "success" | "warning" | "error" | "info";
  }
> = {
  pending: { label: "En attente", color: "warning" },
  confirmed: { label: "Accepté", color: "info" },
  accepted: { label: "Accepté", color: "info" },
  "en préparation": { label: "En préparation", color: "primary" },
  "en cours de livraison": { label: "En livraison", color: "primary" },
  livré: { label: "Livré", color: "success" },
  completed: { label: "Terminée", color: "success" },
  terminée: { label: "Terminée", color: "success" },
  cancelled: { label: "Annulée", color: "error" },
};

type Props = {
  status?: string | null;
};

const UserOrderStatusBadge = ({ status }: Props) => {
  const normalizedStatus = String(status ?? "").toLowerCase();
  const config = statusMap[normalizedStatus] ?? {
    label: status ?? "Statut inconnu",
    color: "default" as const,
  };

  return (
    <Chip
      size="small"
      label={config.label}
      color={config.color}
    />
  );
};

export default UserOrderStatusBadge;
