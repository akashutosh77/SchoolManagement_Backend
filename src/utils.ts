export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-CA"); // "2024-08-08"
    return formattedDate;
  };