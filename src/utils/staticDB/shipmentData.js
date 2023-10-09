
const shipmentStaticInfo = {
    Operativa: {
        PaP: !process.env.ENVIROMENT ? 408350 : 64665,
        PaS: !process.env.ENVIROMENT ? 408351: 62342
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

const shipmentEstimateUrl = !process.env.ENVIROMENT ? "http://webservice.oca.com.ar/ePak_tracking/Oep_TrackEPak.asmx/Tarifar_Envio_Corporativo" :  "http://webservice.oca.com.ar/ePak_tracking_TEST/Oep_TrackEPak.asmx/Tarifar_Envio_Corporativo";

const shipmentGenerateOrderUrl = !process.env.ENVIROMENT ? "http://webservice.oca.com.ar/ePak_tracking/Oep_TrackEPak.asmx/IngresoORMultiplesRetiros" : "http://webservice.oca.com.ar/ePak_tracking_TEST/Oep_TrackEPak.asmx/IngresoORMultiplesRetiros";

const generateTagUrl = !process.env.ENVIROMENT ? "http://webservice.oca.com.ar/oep_tracking/Oep_Track.asmx/GetPdfDeEtiquetasPorOrdenOrNumeroEnvio" :  "http://webservice.oca.com.ar/oep_tracking_TEST/Oep_Track.asmx/GetPdfDeEtiquetasPorOrdenOrNumeroEnvio";

module.exports = {shipmentEstimateUrl, shipmentStaticInfo,shipmentGenerateOrderUrl,generateTagUrl}

