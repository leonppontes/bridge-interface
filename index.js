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

var provider1 = {
    name: "var1",
    type: snmp.MibProviderType.Scalar,
    oid: "1.3.6.1.2.1.1.1",
    scalarType: snmp.ObjectType.Integer32,
    maxAccess: snmp.MaxAccess["read-write"],
    handler: function (mibRequest) {
       // e.g. can update the MIB data before responding to the request here
       mibRequest.done ();
    }
};

var provider2 = {
    name: "var2",
    type: snmp.MibProviderType.Scalar,
    oid: "1.3.6.1.2.1.1.2",
    scalarType: snmp.ObjectType.Integer32,
    maxAccess: snmp.MaxAccess["read-write"],
    handler: function (mibRequest) {
       // e.g. can update the MIB data before responding to the request here
       mibRequest.done ();
    }
};

var provider3 = {
    name: "var3",
    type: snmp.MibProviderType.Scalar,
    oid: "1.3.6.1.2.1.1.3",
    scalarType: snmp.ObjectType.Integer32,
    maxAccess: snmp.MaxAccess["read-write"],
    handler: function (mibRequest) {
       // e.g. can update the MIB data before responding to the request here
       mibRequest.done ();
    }
};

//The registerProvider() call adds the provider to the list of providers that 
//the MIB holds. Note that this call does not add the "oid" node to the MIB 
//tree. The first call of setScalarValue() will add the instance OID "1.3.6.1.2.1.1.1.0" to 
//the MIB tree, along with its value

//An Agent instance, when created, in turn creates an instance of the Mib class. 
//An agent always has one and only one Mib instance. The agent's Mib instance is
// accessed through the agent.getMib () call.
function updateMib() {
    var mib = agent.getMib ();
    mib.registerProvider (provider1);
    mib.registerProvider (provider2);
    mib.registerProvider (provider3);
    mib.setScalarValue ("var1", maxValue);
    ib.setScalarValue ("var2", maxValue);
    ib.setScalarValue ("var3", maxValue);
    mib.dump ();
}

function closeAll(){
    agent.close ()
}

setTimeout(updateMib, 150);
setTimeout(closeAll, 9500);
  }
  
setInterval(intervalFunc, 10000);