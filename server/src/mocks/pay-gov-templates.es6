const templates = {};
templates.startOnlineCollectionRequest = {};
templates.completeOnlineCollectionRequest = {};

templates.startOnlineCollectionRequest.applicationError = tcs_app_id => {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <soap:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Header>
         <work:WorkContext xmlns:work="http://oracle.com/weblogic/soap/workarea/">
         </work:WorkContext>
      </soap:Header>
      <soap:Body>
        <soap:Fault xmlns:ns4="http://www.w3.org/2003/05/soap-envelope">
          <faultcode>S:Server</faultcode>
          <faultstring>TCS Error</faultstring>
          <detail>
            <TCSServiceFault xmlns="http://fms.treas.gov/services/tcsonline">
              <return_code>4019</return_code>
              <return_detail>No agency application found for given tcs_app_id ${tcs_app_id}.</return_detail>
            </TCSServiceFault>
          </detail>
        </soap:Fault>
       </soap:Body>
    </soap:Envelope>`;
};
templates.startOnlineCollectionRequest.noResponse = () => {
  return null;
};
templates.startOnlineCollectionRequest.successfulResponse = token => {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <soap:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Header>
       <work:WorkContext xmlns:work="http://oracle.com/weblogic/soap/workarea/">
       </work:WorkContext>
      </soap:Header>
      <soap:Body>
        <startOnlineCollectionResponse xmlns="http://fms.treas.gov/services/tcsonline">
          <startOnlineCollectionResponse>
            <token>${token}</token>
          </startOnlineCollectionResponse>
        </startOnlineCollectionResponse>
      </soap:Body>
    </soap:Envelope>`;
};
templates.completeOnlineCollectionRequest.cardError = returnCode => {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <soap:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Header>
         <work:WorkContext xmlns:work="http://oracle.com/weblogic/soap/workarea/">
         </work:WorkContext>
      </soap:Header>
      <soap:Body>
        <soap:Fault xmlns:ns4="http://www.w3.org/2003/05/soap-envelope">
          <faultcode>S:Server</faultcode>
          <faultstring>TCS Error</faultstring>
          <detail>
            <TCSServiceFault xmlns="http://fms.treas.gov/services/tcsonline">
              <return_code>${returnCode}</return_code>
              <return_detail>The application does not accept credit cards or the transaction exceeds the maximum daily limit for credit card transactions. The transaction will not be processed.</return_detail>
            </TCSServiceFault>
          </detail>
        </soap:Fault>
       </soap:Body>
    </soap:Envelope>`;
};
templates.completeOnlineCollectionRequest.successfulResponse = paygovTrackingId => {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <soap:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Header>
       <work:WorkContext xmlns:work="http://oracle.com/weblogic/soap/workarea/">
       </work:WorkContext>
      </soap:Header>
      <soap:Body>
        <completeOnlineCollectionResponse xmlns="http://fms.treas.gov/services/tcsonline">
          <completeOnlineCollectionResponse>
            <paygov_tracking_id>${paygovTrackingId}</paygov_tracking_id>
          </completeOnlineCollectionResponse>
        </completeOnlineCollectionResponse>
      </soap:Body>
    </soap:Envelope>`;
};
module.exports = templates;
