setTimeout(() => {
  highlightShippingService(location.href);
}, 6000);

highlightShippingService = (url) => {
  if (url.includes('#/ship/order/')) {
    var portal = url.includes('shipheaven') ? 'shiphaven' : 'englandship';
    console.log(`Portal detected: ${portal}`);
    document.getElementById('customer-selected')?.remove();
    removeBorders();
    // Get the shipping service element
    const shippingService = document.querySelector('#app-container > div > div.main-container > div > div > div.uk-grid > div.uk-width-5-10 > div.uk-panel.uk-panel-box.panel-title-restapi > form:nth-child(3) > div > div:nth-child(2) > div.uk-margin-bottom.ship-settings-bar > div');
    if (shippingService) {
      // get current text content
      const currentText = shippingService.textContent.trim();
      // parse the text between "Customer chose and at checkout."
      const regex = /Customer chose "?(.+?)"? at checkout\./;
      const match = currentText.match(regex);
      console.log("match:", match);
      const parsedText = match ? match[1] : 'Unknown Shipping Service';
      console.log(`Parsed shipping service: ${parsedText}`);

      shippingBar = document.querySelector('#app-container > div > div.main-container > div > div > div.uk-grid > div.uk-width-5-10 > div.uk-panel.uk-panel-box.panel-title-restapi > form:nth-child(3) > div > div:nth-child(2) > div.uk-margin-bottom.ship-settings-bar');
      shippingBar.insertAdjacentHTML('afterend', `<div id="customer-selected" class="uk-alert inset-alert" style="padding: 10px; margin-top: 10px;"><span style="border: 3px solid lightgreen; padding: 10px; font-weight: 'bolder';">Customer Selected: 📦 ${parsedText} 📦</span></div>`);

      addBorders(parsedText, portal);
      console.log("Shipping service highlighted");

    }
  } else {
    console.log("Shipping service not found");
  }

};

removeBorders = () => {
  const serviceTypeMenu = document.querySelectorAll('.serviceType-menu li a');
  serviceTypeMenu.forEach(item => {
    item.style.border = '';
  });
};

addBorders = (parsedText, portal) => {
  const serviceTypeMenu = document.querySelectorAll('.serviceType-menu li a');
  if (portal === 'shiphaven') {
    serviceTypeMenu.forEach(item => {
      if (parsedText === 'UPS Ground/USPS Priority' || parsedText === 'Standard') {
        if (item.textContent.includes('UPS® Ground')) {
          item.style.border = '3px solid lightgreen';
          item.style.fontWeight = 'bolder';
        }
      }
      else {
        if (item.textContent === parsedText) {
          item.style.border = '3px solid lightgreen';
          item.style.fontWeight = 'bolder';
        }
      }
    });
  }
  if (portal === 'englandship') {
    serviceTypeMenu.forEach(item => {
      if (parsedText === 'UPS Ground/USPS Priority' || parsedText === 'Standard') {
        if (item.textContent.includes('FedEx Ground®')) {
          item.style.border = '3px solid lightgreen';
          item.style.fontWeight = 'bolder';
        }
      }
      if (parsedText === 'UPS Next Day Air®') {
        if (item.textContent.includes('FedEx Standard Overnight®')) {
          item.style.border = '3px solid lightgreen';
          item.style.fontWeight = 'bolder';
        }
      }
      if (parsedText === 'UPS Next Day Air® Early') {
        if (item.textContent.includes('FedEx First Overnight®')) {
          item.style.border = '3px solid lightgreen';
          item.style.fontWeight = 'bolder';
        }
      }
      if (parsedText === 'UPS Next Day Air Saver®') {
        if (item.textContent.includes('FedEx Standard Overnight®')) {
          item.style.border = '3px solid lightgreen';
          item.style.fontWeight = 'bolder';
        }
      }
      if (parsedText === 'UPS 2nd Day Air®') {
        if (item.textContent.includes('FedEx 2Day®')) {
          item.style.border = '3px solid lightgreen';
          item.style.fontWeight = 'bolder';
        }
      }
      if (parsedText === 'UPS 2nd Day Air A.M.®') {
        if (item.textContent.includes('FedEx 2Day® A.M.')) {
          item.style.border = '3px solid lightgreen';
          item.style.fontWeight = 'bolder';
        }
      }
      if (parsedText === 'UPS 3 Day Select®') {
        if (item.textContent.includes('FedEx Express Saver®')) {
          item.style.border = '3px solid lightgreen';
          item.style.fontWeight = 'bolder';
        }
      }
      if (parsedText === 'UPS® Ground' || parsedText === 'UPS Ground Saver® 1 lb or Greater') {
        if (item.textContent.includes('FedEx Ground®')) {
          item.style.border = '3px solid lightgreen';
          item.style.fontWeight = 'bolder';
        }
      }
    });
  }
}

let previousUrl = '';
const observer = new MutationObserver(function (mutations) {
  if (location.href !== previousUrl) {
    previousUrl = location.href;
    console.log(`URL changed to ${location.href}`);
    highlightShippingService(location.href);
  }
});
const config = { subtree: true, childList: true };
observer.observe(document, config);