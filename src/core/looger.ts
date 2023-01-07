export type LoggerRepo = {
  log: (message: string) => void;
};

export const loogerRepo = () => {
  return {
    log: (message: string) => {
      const date = `${new Date().toLocaleString()}\n`;
      const start = "=====================\n";
      const end = "\n=====================\n";
      console.log(`${start} [Logger] ${date} ${message} ${end}`);
    },
  };
};
