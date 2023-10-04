import 'src/vendor/endymion-web-api';
declare var EndymionWebApi:any;
declare global {
    interface Window {
      vuplex: any;
    }
    interface globalThis{
        vuplex: any;
    }
  }