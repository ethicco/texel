declare global {
  type RequestError = {
    code: number;
    message: string;
  };

  type Config = {
    name: string;
    title: string;
    description: string;
    parameters: {
      input: {
        type: string;
        name: string;
        title: string;
        value?: string | number;
        items?: {
          value: string;
          title: string;
        }[];
      }[];
      output: {
        type: string;
        name: string;
        title: string;
      }[];
    };
    commands: {
      start: string;
    };
  };
}

export default global;
