import Chip from "@mui/material/Chip";

const StatusChip = ({ status }: { status: string }) => {
  const color =
    status === "pending"
      ? "warning"
      : status === "confirmed"
        ? "success"
        : "error";

  return <Chip label={status} color={color} size="small" />;
};
export default StatusChip;
