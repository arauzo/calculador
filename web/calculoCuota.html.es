<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml"  xml:lang="es">

  <head>

    <meta http-equiv="Content-Type" content="application/xhtml+xml; charset=utf-8" />
    <meta http-equiv="Content-Script-Type" content="text/javascript" />
    <link rel="stylesheet" href="estilo.css" type="text/css" media="all"/> 
	<script type="text/javascript" src="guion.js"></script>
    <title> Cálculo de Hipoteca </title>

  </head>

  <body>
    <div class="tablaCentrada">
    <div id="cabecera" > 
      <h1> Cálculo de Hipoteca </h1> 
    </div>
    
    <div id="contenido" > 
      <form id="formulario" method="post" action="calculoCuota.html" enctype="x-www-form-urlencoded">
        <table    >
          <tr> 
            <td> Capital </td>
            <td> <input type="text" name="capital" id="capital"/> </td>
          </tr>
          <tr> 
            <td> Duración </td>
            <td> <input type="text" name="duracion" id="duracion"/> </td>
          </tr>
          <tr> 
            <td> Interés </td>
            <td> <input type="text" name="interes" id="interes"/> </td>
          </tr>
          <tr> 
            <td colspan="2"> <input type="submit" value="Enviar" name="bEnviar" id="bEnviar" onclick="enviar();return false;"/> 
							 <input type="hidden" name="idioma" id="idioma" value="es"/>	</td>
          </tr>  
        </table> 
      </form>
      <br/><br/>
	  <div id="resultado" style="display:none">
        <table    cellpadding="5" >
          <tr> 
            <td></td>
            <th> Interés anual </th>
            <th> Cuota mensual </th>
          </tr>
          <tr> 
            <th> Hipoteca correcta </th>
            <td id="interesC"> _ </td>
            <td id="cuotaC"> _ </td>
          </tr>
          <tr> 
            <th> Hipoteca bancaria </th>
            <td id="interesB"> _ </td>
            <td id="cuotaB"> _ </td>
          </tr> 
        </table>
        
        <br/>
        
        <table    cellpadding="5">
          <tr>  
            <td></td>
            <th>Anual</th>
            <th>Total</th>
          </tr>
          <tr>
            <th>Pago extra</th>
            <td id="pagoA">_</td>
            <td id="pagoT">_</td>
          </tr>
        </table>
        
        <table cellpadding="40" >
          <tr> 
            <td>

              <table    cellpadding="5" id="correcta">
              <tr>    
        
                <th colspan="5">&nbsp;</th>
              </tr>              
        
              <tr>    
        
                <th colspan="5">Tabla correcta</th>
              </tr>
              <tr>
                <th> Año </th>
                <th> Mes </th>
                <th> Deuda </th>
                <th> Amortización </th>
                <th> Intereses </th>
              </tr>

              </table>
              
            </td>
            <td> 
            
            <table   cellpadding="5" id="bancaria">
              <tr>
              
              <td colspan="6">I.D.I.: Intereses sobre deuda más los intereses pagados en el año </td>
              </tr>
              <tr>
              <th colspan="6">Tabla bancaria</th>
              </tr>
              <tr>
                <th> Año </th>
                <th> Mes </th>
                <th> Deuda </th>
                <th> Amortización </th>
                <th> Intereses </th>
                <th>I.D.I.</th>
              </tr>
              
              </table>
              
            </td>
          </tr>
        </table>
	</div>
    </div>
	
  <table cellpadding="4">
      <tr>
      <td> <a href="http://www.avaaz.org/es/petition/Bancos_y_legisladores_Usen_la_formula_correcta_en_las_hipotecas/" onclick="target='_blank'"> Firma la petición para cambiar esto </a> </td>
      <td rowspan="2">  <img src="bancoRobaEsp.jpg" alt="Enlace Peticion" width="100" height="45"  onmouseover="this.src='bancoRobaEng.jpg';" onmouseout="this.src='bancoRobaEsp.jpg' " /> </td>
    
      </tr>
    
    <tr>
      <td > <a href="http://www.avaaz.org/en/petition/Bankers_and_lawmakers_Use_the_correct_formula_in_mortgages/" onclick="target='_blank'"> Sign the petition to change this </a>  </td>
      </tr>
    </table> 
                <a href="http://validator.w3.org/check?uri=referer"> <img src="http://www.w3.org/Icons/valid-xhtml11" alt="Valid XHTML 1.1" height="31" width="88" /></a>
				
  </div>
  </body>




</html>
