export default class ServerMirror {
  id: number;
  name: string;
  logo: string;
  apiSearchUrl: string;
  apiSetUrl: string;
  processing: boolean;

  constructor(opts: {
    id: number;
    name: string;
    logo: string;
    apiSearchUrl: string;
    apiSetUrl: string;
    processing: boolean;
  }) {
    this.id = opts.id;
    this.name = opts.name;
    this.logo = opts.logo;
    this.apiSearchUrl = opts.apiSearchUrl;
    this.apiSetUrl = opts.apiSetUrl;
    this.processing = opts.processing;
  }
}
