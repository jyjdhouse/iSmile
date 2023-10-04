
const shipmentStaticInfo = {
    Operativa: {
        PaP:408350,
        PaS: 408351
    },
    PesoTotal: {
        1: '1.5',
        2: '2',
        3: '3'
    },
    VolumenTotal: {
        1: '0.5',
        2: '1',
        3: '2'
    },
    CodigoPostalOrigen: '1425',
    // CantidadPaquetes:
    // ValorDeclarado:
}

const shipmentEstimateUrl = "http://webservice.oca.com.ar/ePak_tracking/Oep_TrackEPak.asmx/Tarifar_Envio_Corporativo";

module.exports = {shipmentEstimateUrl, shipmentStaticInfo}

