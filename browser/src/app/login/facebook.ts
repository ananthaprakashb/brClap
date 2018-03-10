import {BehaviorSubject} from 'rxjs/BehaviorSubject';

declare const FB: any;

export class Facebook {
  private appId: string

  public response = new BehaviorSubject<boolean>(false);
  public data = this.response.asObservable();

  constructor(appId: string) {
    this.appId = appId

    this.init();
  }

  login() {
    FB.login();
  }

  init() {
    let js,
      id = 'facebook-jssdk',
      ref = document.getElementsByTagName('script')[0];

    if (document.getElementById(id)) {
      return;
    }

    js = document.createElement('script');
    js.id = id;
    js.async = true;
    js.src = "//connect.facebook.net/en_US/sdk.js";

    ref.parentNode.insertBefore(js, ref);

    js.onload = results => {
      this.initSDK()
    }
  }

  initSDK() {
    FB.init({
      appId: this.appId,
      xfbml: true,
      version: 'v2.5'
    })
    this.setCallback()
  }

  setCallback() {
    FB.getLoginStatus(response => {
      if (response.status == "connected") {
        FB.api('/me', { locale: 'en_US', fields: 'name, email' },
         (_response) => {
            response.authResponse.name = _response.name;
            this.response.next(response);
          }
        );
      } else {
        this.response.next(response);
      }
    });
  }
}