const btn = document.querySelector("button");
const recaptchaScore = document.querySelector("#score-render");

// There is 3 step to validate your user action with reCAPTCHA security
// 1. generate token a token with help of site key
// 2. send that token to the backend
// 3. verify token and create assessment to get score for that token

// For more info follow
// 1. https://cloud.google.com/recaptcha-enterprise/docs/instrument-web-pages?authuser=1
// 2. https://cloud.google.com/recaptcha-enterprise/docs/create-assessment?authuser=1

function createToken(e){
  e.preventDefault();
  grecaptcha.enterprise.ready(async function() {
    //---- step : 1 generating token with help of site key (you can make site key public)
      const token = await grecaptcha.enterprise.execute(
        "6LdHwjkhAAAAAE25krXsKAD1rES2osoA-f5A2G7m",
        {
          action: "submit",
        }
      );
      let options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, action: "submit" })
      };
    //---- step : 2 sending generated token to backend

      let res = await fetch("/interpret", options);
      let resJson = await res.json();
      recaptchaScore.innerText = `The recaptcha score is ${resJson.score}`;
  });
}
btn.addEventListener("click", createToken);
