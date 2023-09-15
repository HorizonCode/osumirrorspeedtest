export default class ServerMirror {
  name: string;
  logo: string;
  apiUrl: string;
  processing: boolean;

  constructor(opts: {
    name: string;
    logo: string;
    apiUrl: string;
    processing: boolean;
  }) {
    this.name = opts.name;
    this.logo = opts.logo;
    this.apiUrl = opts.apiUrl;
    this.processing = opts.processing;
  }
}
