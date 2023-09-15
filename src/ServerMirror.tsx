export default class ServerMirror {
  id: number;
  name: string;
  logo: string;
  apiUrl: string;
  processing: boolean;

  constructor(opts: {
    id: number;
    name: string;
    logo: string;
    apiUrl: string;
    processing: boolean;
  }) {
    this.id = opts.id;
    this.name = opts.name;
    this.logo = opts.logo;
    this.apiUrl = opts.apiUrl;
    this.processing = opts.processing;
  }
}
