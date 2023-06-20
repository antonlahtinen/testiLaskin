const form = document.querySelector("form");
const riskipisteet = [];

// Submit painike (Laske yhteispisteet)
form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Katsoo jokaisen kysymyksen arvon (value)
  const k1_Arvo = parseInt(form.elements.k1.value) || 0;
  const k2_Arvo = parseInt(form.elements.k2.value) || 0;
  const k3_Arvo = parseInt(form.elements.k3.value) || 0;
  const k4_Arvo = parseInt(form.elements.k4.value) || 0;
  const k5_Arvo = parseInt(form.elements.k5.value) || 0;
  const k6_Arvo = parseInt(form.elements.k6.value) || 0;
  const k7_Arvo = parseInt(form.elements.k7.value) || 0;
  const k8_Arvo = parseInt(form.elements.k8.value) || 0;
  const k9_Arvo = parseInt(form.elements.k9.value) || 0;
  const k10_Arvo = parseInt(form.elements.k10.value) || 0;

  // Laske yhteispisteet
  const kokonaisRiskiPisteet =
    k1_Arvo +
    k2_Arvo +
    k3_Arvo +
    k4_Arvo +
    k5_Arvo +
    k6_Arvo +
    k7_Arvo +
    k8_Arvo +
    k9_Arvo +
    k10_Arvo;

  // Yhteispisteet kokelmaan
  riskipisteet.push(kokonaisRiskiPisteet);

  // Näytä yhteispisteet
  const riskiPisteetYhteensa = document.querySelector("#kokonaisPisteet");
  riskiPisteetYhteensa.textContent =
    kokonaisRiskiPisteet + varoitus(kokonaisRiskiPisteet, k6_Arvo);

  // Näytä riskiluokka
  const riskiLuokka = document.querySelector("#riskiLuokka");
  riskiLuokka.textContent = laiteLuokka(kokonaisRiskiPisteet);

  näytäRiskiluokkaOhje(laiteLuokka(kokonaisRiskiPisteet), k5_Arvo, k6_Arvo);
});

// Varoitus, jos pistemäärä vähäinen, mutta "Väärän käytön seuraus potilaalle" korkea
varoitus = (kokonaisRiskiPisteet, k6_Arvo) => {
  if (kokonaisRiskiPisteet <= 30 && k6_Arvo >= 4) {
    return (
      ', huomioi "Virheellisen käytön todennäköisin seuraus potilaalle" korkea pistemäärä (' +
      k6_Arvo +
      ")"
    );
  } else {
    return "";
  }
};

// Katso mihin riskiluokkaan laite kuuluu
laiteLuokka = (kokonaisRiskiPisteet) => {
  if (kokonaisRiskiPisteet == 0) {
    return " 0";
  } else if (kokonaisRiskiPisteet > 0 && kokonaisRiskiPisteet <= 19) {
    return " 1";
  } else if (kokonaisRiskiPisteet > 19 && kokonaisRiskiPisteet <= 26) {
    return " 2";
  } else if (kokonaisRiskiPisteet > 26 && kokonaisRiskiPisteet <= 38) {
    return " 3";
  } else if (kokonaisRiskiPisteet >= 38) {
    return " 4";
  }
};

// Tyhjennä kysymyspatteri
tyhjennä = () => {
  // Tyhjennä kysymykset
  document.getElementById("kysymysPatteri").reset();

  // Tyhjennä yhteispisteet ja riskiluokka
  const riskiPisteetYhteensa = document.querySelector("#kokonaisPisteet");
  riskiPisteetYhteensa.textContent = "";
  const riskiLuokka = document.querySelector("#riskiLuokka");
  riskiLuokka.textContent = laiteLuokka();

  // Tyhjennä kokoelma
  riskipisteet.length = 0;
};

showPage = (sivunNimi) => {
  // Piilota sivujen sisältö
  const sivujenSisältö = document.getElementsByClassName("sivu-sisältö");
  for (let i = 0; i < sivujenSisältö.length; i++) {
    sivujenSisältö[i].style.display = "none";
  }
  // Piilota sivujen sisältö(Form)
  const sivujenSisältö2 = document.getElementsByClassName("sivu-sisältö1");
  for (let i = 0; i < sivujenSisältö2.length; i++) {
    sivujenSisältö2[i].style.display = "none";
  }

  // Näytä valitun sivun sisältö
  const valittuSivu = document.getElementById(sivunNimi);
  const valittuSivu2 = document.getElementById(sivunNimi);
  if (valittuSivu) {
    valittuSivu.style.display = "block";
  }

  if (valittuSivu2) {
    valittuSivu2.style.display = "block";
  }
};

// Näyttää Riskiluokan ohjeen, kun formi on täytetty
// Huom! Käyttötaajuudessa päivittäin = 1, 1kk = 3, 1 vuosi = 4, harvemmin = 5
function näytäRiskiluokkaOhje(laiteLuokka, käyttötaajuus, virheellisenKäytönPistemäärä) {
  let tableContent = "";
  let riskText = "";
  let taajuusValinta = "";

  //Valitaan koulutuksen toistotaajuus, riippuu laitteen riskiluokasta ja laitteen käyttötaajuudesta
  if (laiteLuokka == 2) {
    if (käyttötaajuus == 1) {
      taajuusValinta += "Tarvittaessa";
    } else if (käyttötaajuus == 3 || käyttötaajuus == 4) {
      taajuusValinta += "5 vuoden välein";
    } else if (käyttötaajuus == 5) {
      taajuusValinta += "1 vuoden välein";
    }
  }

  if (laiteLuokka == 3 || laiteLuokka == 4) {
    if (käyttötaajuus == 1) {
      taajuusValinta += "5 vuoden välein";
    } else if (käyttötaajuus == 3 || käyttötaajuus == 4) {
      taajuusValinta += "3 vuoden välein";
    } else if (käyttötaajuus == 5) {
      taajuusValinta += "1 vuoden välein";
    }
  }

  // if (laiteLuokka == 3 && virheellisenKäytönPistemäärä == 5){
  //   taajuusValinta += "Perehdytys käytännössä tai simulaatiossa"
  // }

  // Mitä ohjeita tulee mistäkin laiteluokka + käyttötaajuus kombosta
  if (laiteLuokka == 1) {
    riskText += "Laitteessa on matala käyttöriski.";
    tableContent += `
      <tr>
        <th class="riskiEka">Laitteelle soveltuvia koulutus- ja perehdytysmenetelmiä ovat</th>
      </tr>


      <tr>
        <td>Käyttöohjeeseen ja valmistajan muuhun materiaaliin tutustuminen</td>
      </tr>
      <tr>
        <td>Itsearviointi</td>
      </tr>
      <tr>
        <td>Tarvittaessa esim. muutostilanteissa</td>
      </tr>

      <tr>
        <th class="riskiEka">Laitteen käytön osaamisen varmistamiseen soveltuvia näyttömenetelmiä ovat</th>
      </tr>


      <tr>
        <td>Itsearviointi</td>
      </tr>
      <tr>
        <td>Osallistumismerkintä</td>
      </tr>

      <tr>
        <th class="riskiEka">Laitteen koulutuksen / osaamisen varmistamiseen soveltuva toistotaajuus on</th>
      </tr>


      <tr>
        <td>Tarvittaessa esim. muutostilanteissa</td>
      </tr>
    `;
  } else if (laiteLuokka == 2) {
    riskText += "Laitteessa on kohtalainen käyttöriski.";
    tableContent +=
      `
      <tr>
        <th class="riskiToka">Laitteelle soveltuvia koulutus- ja perehdytysmenetelmiä ovat</th>
      </tr>

      <tr>
        <td>Käyttöohjeeseen ja valmistajan muuhun materiaaliin tutustuminen</td>
      </tr>
      <tr>
        <td>Verkkokurssi</td>
      </tr>
      <tr>
        <td>Valmistajan käyttökoulutus tai Teemapäivä</td>
      </tr>

      <tr>
        <th class="riskiToka">Laitteen käytön osaamisen varmistamiseen soveltuvia näyttömenetelmiä ovat</th>
      </tr>

      <tr>
        <td>Itsearviointi</td>
      </tr>
      <tr>
        <td>Verkkotentti</td>
      </tr>
      <tr>
        <td>Osallistumismerkintä</td>
      </tr>


      <tr>
        <th class="riskiToka">Laitteen koulutuksen / osaamisen varmistamiseen soveltuva toistotaajuus on</th>

      </tr>

      <tr>
        <td>` +
      taajuusValinta +
      `</td>
      </tr>
    `;
  } else if (laiteLuokka == 3 && virheellisenKäytönPistemäärä < 5) {
    riskText += "Laitteessa on korkea käyttöriski.";
    tableContent +=
      `
      <tr>
        <th class="riskiKolmas">Laitteelle soveltuvia koulutus- ja perehdytysmenetelmiä ovat</th>
      </tr>
      <tr>
        <td>Käyttöohjeeseen ja valmistajan muuhun materiaaliin tutustuminen</td>
      </tr>
      <tr>
        <td>Verkkokurssi</td>
      </tr>
      <tr>
        <td>Valmistajan käyttökoulutus tai Teemapäivä</td>
      </tr>
      <br />
      <tr>
        <th class="riskiKolmas">Laitteen käytön osaamisen varmistamiseen soveltuvia näyttömenetelmiä ovat</th>
      </tr>

      <tr>
        <td>Suullinen Testi</td>
      </tr>
      <br />
      <tr>
        <th class="riskiKolmas">Laitteen koulutuksen / osaamisen varmistamiseen soveltuva toistotaajuus on</th>
      </tr>

      <tr>
        <td>` +
      taajuusValinta +
      `</td>
      </tr>

    `;

  } else if (laiteLuokka == 3 && virheellisenKäytönPistemäärä == 5) {
    riskText += "Laitteessa on korkea käyttöriski.";
    tableContent +=
      `
      <tr>
        <th class="riskiKolmas">Laitteelle soveltuvia koulutus- ja perehdytysmenetelmiä ovat</th>

      </tr>
      <tr>
        <td>Perehdytys käytännössä tai simulaatiossa</td>

      </tr>
      <br />
      <tr>

        <th class="riskiKolmas">Laitteen käytön osaamisen varmistamiseen soveltuvia näyttömenetelmiä ovat</th>

      </tr>
      <tr>

      <td>Suullinen testi</td>

    </tr>
    <br />
      <tr>

        <th class="riskiKolmas">Laitteen koulutuksen / osaamisen varmistamiseen soveltuva toistotaajuus on</th>
      </tr>

      <tr>
        <td>` +
      taajuusValinta +
      `</td>
      </tr>

    `;

  } else if (laiteLuokka == 4) {
    riskText += "Laitteessa on erittäin korkea käyttöriski.";
    tableContent +=
      `
            <tr>
              <th class="riskiNeljäs">Laitteelle soveltuvia koulutus- ja perehdytysmenetelmiä ovat</th>
            </tr>

            <tr>
              <td>Teoriakoulutus ja käytännön harjoittelu</td>
            </tr>


            <tr>
              <th class="riskiNeljäs">Laitteen käytön osaamisen varmistamiseen soveltuvia näyttömenetelmiä ovat</th>
            </tr>

            <tr>
              <td>Suoritus käytännössä / simulaatiossa</td>
            </tr>


            <tr>
             <th class="riskiNeljäs">Laitteen koulutuksen / osaamisen varmistamiseen soveltuva toistotaajuus on</th>
            </tr>


            <tr>
              <td>` +
      taajuusValinta +
      `</td>
            </tr>
            `;
  }

  // Laita generoitu sisältö tableen
  const text = document.getElementById("riskiLuokkaTeksti");
  text.innerHTML = riskText;
  const table = document.getElementById("ohjePöytä");
  table.innerHTML = tableContent;
}

//Riskiluokka-sivun dropdown
function dropdownValinta(){
  //Valittu käyttötaajuus
  const taajuusDropdown = parseInt(document.getElementById("taajuusValinta").value);

  const riskiLuokka2 = document.getElementsByClassName("luokka2");
  const riskiLuokka3 = document.getElementsByClassName("luokka3");
  const riskiLuokka4 = document.getElementById("luokka4");

  let luokka2Text = "";
  let luokka3Text = "";
  let luokka4Text = "";

  if (taajuusDropdown == 1){
    luokka2Text += "Tarvittaessa, esim. muutostilanteissa";
    luokka3Text += "5 vuoden välein";
    luokka4Text += "5 vuoden välein";
  } else if (taajuusDropdown == 2){
    luokka2Text += "5 vuoden välein";
    luokka3Text += "3 vuoden välein";
    luokka4Text += "3 vuoden välein";
  } else if (taajuusDropdown == 3){
    luokka2Text += "5 vuoden välein";
    luokka3Text += "3 vuoden välein";
    luokka4Text += "3 vuoden välein";
  } else if (taajuusDropdown == 4){
    luokka2Text += "Vuoden välein";
    luokka3Text += "Vuoden välein";
    luokka4Text += "Vuoden välein";
  }

  for (let i = 0; i < riskiLuokka2.length; i++){
    riskiLuokka2[i].innerHTML = luokka2Text;
  }

  for (let x = 0; x < riskiLuokka3.length; x++){
    riskiLuokka3[x].innerHTML = luokka3Text;
  }

  riskiLuokka4.innerHTML = luokka4Text;
}

function vaaraKayttoValinta(){
  const valinta = parseInt(document.getElementById("vääräKäyttöValinta").value);
  let koulutusMetodi = "";
  const koulutus = document.getElementsByClassName("koulutusKolmas");
  if (valinta == 1){
    koulutusMetodi +=
    `
    <tr>
      <th class="riskiKolmas">Laitteelle soveltuvia koulutus- ja perehdytysmenetelmiä ovat</th>
    </tr>
    <tr>
      <td>Käyttöohjeeseen ja valmistajan muuhun materiaaliin tutustuminen</td>
    </tr>
    <tr>
      <td>Verkkokurssi</td>
    </tr>
    <tr>
      <td>Valmistajan käyttökoulutus tai Teemapäivä</td>
    </tr>
    <tr>
      <th class="riskiKolmas">Laitteen käytön osaamisen varmistamiseen soveltuvia näyttömenetelmiä ovat</th>
    </tr>

    <tr>
      <td>Suullinen Testi</td>
    </tr>
  `;

  } else {
    koulutusMetodi += `
    <tr>
    <th class="riskiKolmas">Laitteelle soveltuvia koulutus- ja perehdytysmenetelmiä ovat</th>

  </tr>
  <tr>
    <td>Perehdytys käytännössä tai simulaatiossa</td>

  </tr>
  <tr>

    <th class="riskiKolmas">Laitteen käytön osaamisen varmistamiseen soveltuvia näyttömenetelmiä ovat</th>

  </tr>
  <tr>

  <td>Suullinen testi</td>

</tr>
    `;
  }

  for (let x = 0; x < koulutus.length; x++){
    koulutus[x].innerHTML = koulutusMetodi;
  }

}