
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

const shipmentGenerateOrderUrl = "http://webservice.oca.com.ar/ePak_tracking/Oep_TrackEPak.asmx/IngresoORMultiplesRetiros";

const generateTagUrl = "http://webservice.oca.com.ar/oep_tracking/Oep_Track.asmx/GetPdfDeEtiquetasPorOrdenOrNumeroEnvio";

module.exports = {shipmentEstimateUrl, shipmentStaticInfo,shipmentGenerateOrderUrl,generateTagUrl}

