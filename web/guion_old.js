function enviar()
{
  var dParametros = pasoRevisar();
  if(dParametros === null)
    return;

  pasoResultados(dParametros);
  pasoTablaCorrecta(dParametros);
  pasoTablaBancaria(dParametros);
  document.getElementById("resultado").style.display="block";
}

function pasoRevisar()
{
  var cCapital = document.getElementById("capital");
  var cDuracion = document.getElementById("duracion");
  var cInteres = document.getElementById("interes");
  var idioma = document.getElementById("idioma").value;

  var dDMensajes = {"es":{"iec":"Introduzca el capital.",
                    "cdn":"El capital debe ser un número positivo.",
                    "ild":"Introduzca la duración.",
                    "dse":"La duración debe ser un entero.",
                    "dsm":"La duración debe ser mínimo uno.",
                    "iei":"Introduzca el interés.",
                    "isn":"El interés debe ser un número.",
                    "iey":"El interés debe estar entre 0.01 y 100.00 ."},

                    "en":{"iec":"Enter capital.",
                    "cdn":"Capital must be a positive number.",
                    "ild":"Enter the duration.", 
                    "dse":"The duration must be an integer.",
                    "dsm":"The duration should be at least one.",
                    "iei":"Enter the interest.",
                    "isn":"The interest must be a number.",
                    "iey":"The interest must be between 0.01 and 100.00 ."}}

  var mensaje = "";  
  if(cCapital.value == "")
     mensaje += dDMensajes[idioma]["iec"] + "\n";
  else
  {
    capital = parseFloat(cCapital.value);
    if(capital != capital)
      mensaje += dDMensajes[idioma]["cdn"] + "\n"; 
    else if(capital < 0)
     mensaje += dDMensajes[idioma]["cdn"] + "\n";   
  }

  if(cDuracion.value == "")
    mensaje += dDMensajes[idioma]["ild"] + "\n";
  else
  {
    duracion = parseInt(cDuracion.value, 10);
    if(duracion != duracion)
      mensaje += dDMensajes[idioma]["dse"] + "\n";
    else if(duracion <= 0)
      mensaje += dDMensajes[idioma]["dsm"] + "\n"; 
  }

  if(cInteres.value == "")
     mensaje += dDMensajes[idioma]["iei"] + "\n";
  else
  {
    interes = parseFloat(cInteres.value); 
    if(interes != interes)
      mensaje += dDMensajes[idioma]["isn"] + "\n";
    else if(interes < 0.01 || interes > 100)
      mensaje += dDMensajes[idioma]["iey"] + "\n";
  }

  if(mensaje != "")
  {    
    window.alert(mensaje);
    return null;
  }  
  return {"capital":capital, "duracion":duracion, "interes":interes};
}

function calcularPago(interes, nPeriodo, valAct)
  {return valAct/((1 - 1/Math.pow(1 + interes, nPeriodo))/interes);}

function calcularResultados(dParametros)
{
  var result = {};
  interes = dParametros["interes"]/100;
  interesM = (Math.pow(1 + interes, 1.0/12) - 1);
  interesMB = interes/12;
  interesB = Math.pow(1 + interesMB, 12) - 1;

  result["interes"] = dParametros["interes"];
  result["interesB"] = 100 * interesB;
  result["cuota"] = calcularPago(interesM, dParametros["duracion"] * 12,
            dParametros["capital"]);
  result["cuotaB"] = calcularPago(interesMB, dParametros["duracion"] * 12,
             dParametros["capital"]);
  result["pagoExtA"] = (result["cuotaB"] - result["cuota"]) * 12;
  result["pagoExtT"] = result["pagoExtA"] * dParametros["duracion"];
  return result;
}

function pasoResultados(dParametros)
{
  mensaje = "";
  dResultado = calcularResultados(dParametros);

  document.getElementById("interesC").childNodes[0].nodeValue = 
    dResultado["interes"].toFixed(2) + "%";
  document.getElementById("interesB").childNodes[0].nodeValue =
    dResultado["interesB"].toFixed(2) + "%";

  document.getElementById("cuotaC").childNodes[0].nodeValue =
    dResultado["cuota"].toFixed(2);
  document.getElementById("cuotaB").childNodes[0].nodeValue =
    dResultado["cuotaB"].toFixed(2);
  document.getElementById("pagoA").childNodes[0].nodeValue =
    dResultado["pagoExtA"].toFixed(2);
  document.getElementById("pagoT").childNodes[0].nodeValue =
    dResultado["pagoExtT"].toFixed(2);
}

function borrarCeldasValores(tabla)
{while(tabla.rows.length > 3)
  tabla.deleteRow(-1);}

function insertarCelda(fila, texto)
{
  var nodoTd = document.createElement("td");
  var nodoTxt = document.createTextNode(texto);
  nodoTd.appendChild(nodoTxt);   
  fila.appendChild(nodoTd);  
}

function insertarFila(tabla, lista)
{
  var fila = tabla.insertRow(-1);
  for(var i = 0; i < lista.length; i++)
      insertarCelda(fila, lista[i]);
}

function pasoTablaCorrecta(dParametros)
{
  deuda = dParametros["capital"];
  interes = dParametros["interes"]/100;
  k = 0;  
  interesM = (Math.pow(1 + interes, 1.0/12) - 1);
  cuota = calcularPago(interesM, dParametros["duracion"] * 12,
            dParametros["capital"]);

  tabla = document.getElementById("correcta");
  borrarCeldasValores(tabla);
  insertarFila(tabla, [0, 0, deuda.toFixed(2), "", ""]);
  
  for(var i = 1; i <= dParametros["duracion"]; i++)
  {
    sPagoInt = 0.0;
    for(var j = 1; j <= 12; j++)
    {
      k++;
      pagoInt = deuda * interesM;
      sPagoInt += pagoInt;

      amortiz = cuota - pagoInt;
      deuda -= amortiz;
      insertarFila(tabla, ["", k, deuda.toFixed(2), amortiz.toFixed(2),
                     pagoInt.toFixed(2)]);
    }

    insertarFila(tabla, [i, "", "", "", sPagoInt.toFixed(2)]);
  }
}

function pasoTablaBancaria(dParametros)
{
  deuda = dParametros["capital"];
  interes = dParametros["interes"]/100;
  k = 0;
  interesM = (Math.pow(1 + interes, 1.0/12) - 1);
  interesMB = interes/12;
  cuota = calcularPago(interesMB, dParametros["duracion"] * 12,
            dParametros["capital"]);

  tabla = document.getElementById("bancaria");
  borrarCeldasValores(tabla);
  insertarFila(tabla, [0, 0, deuda.toFixed(2), "", "", ""]);
  
  for(var i = 1; i <= dParametros["duracion"]; i++)
  {
    sPagoInt = 0.0;
    sIdi = 0.0;

    for(var j = 1; j <= 12; j++)
    {
      k++;
      idi = interesM * (deuda + sIdi);
      sIdi += idi;
      pagoInt = deuda * interesMB;
      sPagoInt += pagoInt;

      amortiz = cuota - pagoInt;
      deuda -= amortiz;
      insertarFila(tabla, ["", k, deuda.toFixed(2), amortiz.toFixed(2), 
                     pagoInt.toFixed(2), idi.toFixed(2)]);
    }

    insertarFila(tabla, [i, "", "", "", sPagoInt.toFixed(2), sIdi.toFixed(2)]);
  }
}
