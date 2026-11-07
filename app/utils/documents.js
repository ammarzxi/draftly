export const getTypeStyle = (type) => {
  const styles = {
    Work: "bg-purple-500/10 text-purple-700",
    Personal: "bg-primary/20 text-primary",
    Learning: "bg-red-500/20 text-red-700",
    Extras: "bg-green-500/10 text-green-700",
    Document: "bg-primary/10 text-primary",
    Folder: "bg-yellow-500/10 text-yellow-700",
  };

  return styles[type] ?? "bg-muted text-muted-foreground border-border";
};
