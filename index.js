var snmp = require ("net-snmp");

function intervalFunc() {

var options = {
    port: 161,
    disableAuthorization: true,
    accessControlModelType: snmp.AccessControlModelType.None,
    engineID: "8000B98380111111111111111111111111", // where the X's are random hex digits
    address: null,
    transport: "udp4"
};

var callback = function (error, data) {
    if ( error ) {
        console.error (error);
    } else {
        console.log (JSON.stringify(data, null, 2));
    }
};

agent = snmp.createAgent (options, callback);

var myScalarProvider = {
    name: "systemForwardPower",
    type: snmp.MibProviderType.Scalar,
    oid: "1.3.6.1.2.1.1.1",
    scalarType: snmp.ObjectType.Integer32,
    maxAccess: snmp.MaxAccess["read-write"],
    handler: function (mibRequest) {
       // e.g. can update the MIB data before responding to the request here
       mibRequest.done ();
    }
};

function updateMib() {
    var mib = agent.getMib ();
    mib.registerProvider (myScalarProvider);
    mib.setScalarValue ("systemForwardPower", maxValue);
    mib.dump ();
}

function closeAll(){
    session1.close ();
    session2.close ();
    agent.close ()
}

setTimeout(max, 100);
setTimeout(updateMib, 150);
setTimeout(closeAll, 9500);
  }
  
setInterval(intervalFunc, 10000);