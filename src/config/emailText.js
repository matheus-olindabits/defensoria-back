

module.exports.emailHtml = function(nome, email, texto) {
	return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
	<html>
	 <head> 
	  <meta charset="UTF-8"> 
	  <meta content="width=device-width, initial-scale=1" name="viewport"> 
	  <meta name="x-apple-disable-message-reformatting"> 
	  <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
	  <meta content="telephone=no" name="format-detection"> 
	  <title>CandeeiroDF</title> 
	  <!--<![endif]--> 
	 </head> 
     <body > 
     <br><br>
     Nome: ${nome}
     <br><br>
     Email: ${email}
     <br><br>
     Texto: ${texto}
     <br><br>
    </body>
	</html>`;
}